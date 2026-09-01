import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Lock, 
  FolderPlus, 
  RefreshCw, 
  Trash2, 
  ExternalLink, 
  Plus, 
  Film, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  Settings, 
  Database, 
  Image as ImageIcon,
  FolderOpen,
  Eye,
  Check,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  fetchEvents, 
  createEvent, 
  deleteEvent, 
  fetchHomepageReels, 
  createHomepageReel, 
  deleteHomepageReel,
  verifyAdminCredentials,
  isSupabaseConfigured,
  saveConnectionConfig,
  getStoredAppsScriptUrl,
  saveStoredAppsScriptUrl,
  saveSyncedPhotos
} from "@/lib/supabase";
import { extractDriveId, getDriveThumbnail, syncFolderWithAppsScript } from "@/lib/drive";

const CATEGORIES = ["Fests", "Cultural", "Sports", "Tech & Workshops", "Photowalks", "Campus Life"];

export function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("jbmedia_admin_auth") === "true";
  });
  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tab navigation
  const [activeTab, setActiveTab] = useState("events"); // 'events', 'reels', 'settings'

  // Data states
  const [events, setEvents] = useState([]);
  const [reels, setReels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [syncingEventId, setSyncingEventId] = useState(null);
  const [actionNotice, setActionNotice] = useState(null);

  // New Event Form
  const [showEventModal, setShowEventModal] = useState(false);
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [modalError, setModalError] = useState("");
  const [eventForm, setEventForm] = useState({
    title: "",
    category: "Fests",
    event_date: new Date().toISOString().split("T")[0],
    drive_folder_id: "",
    description: ""
  });

  // New Reel Form
  const [showReelModal, setShowReelModal] = useState(false);
  const [reelForm, setReelForm] = useState({
    title: "",
    category: "Highlight",
    instagram_url: "",
    thumbnail_url: "",
    duration: "0:30"
  });

  // Settings state
  const [scriptUrl, setScriptUrl] = useState(getStoredAppsScriptUrl());
  const [supabaseUrl, setSupabaseUrl] = useState(import.meta.env.VITE_SUPABASE_URL || localStorage.getItem("jbmedia_supabase_url") || "");
  const [supabaseKey, setSupabaseKey] = useState(import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem("jbmedia_supabase_anon_key") || "");

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [eventsData, reelsData] = await Promise.all([
        fetchEvents(),
        fetchHomepageReels()
      ]);
      setEvents(eventsData || []);
      setReels(reelsData || []);
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError("");

    try {
      const isValid = await verifyAdminCredentials(username, passcode);
      if (isValid) {
        setIsAuthenticated(true);
        sessionStorage.setItem("jbmedia_admin_auth", "true");
      } else {
        setAuthError("Invalid admin username or passcode. Default is admin / jbmedia2026");
      }
    } catch (err) {
      setAuthError("Authentication error. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("jbmedia_admin_auth");
  };

  const notify = (msg, type = "success") => {
    setActionNotice({ msg, type });
    setTimeout(() => setActionNotice(null), 7000);
  };

  // Create Event Handler
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!eventForm.title.trim()) return;

    setIsSubmittingEvent(true);
    setModalError("");

    try {
      const cleanFolderId = extractDriveId(eventForm.drive_folder_id);
      const created = await createEvent({
        ...eventForm,
        drive_folder_id: cleanFolderId
      });

      setEvents([created, ...events]);
      setShowEventModal(false);
      setEventForm({
        title: "",
        category: "Fests",
        event_date: new Date().toISOString().split("T")[0],
        drive_folder_id: "",
        description: ""
      });
      notify(`Event "${created.title}" created successfully!`);

      // If folder ID provided and script URL configured, auto-trigger first sync
      if (cleanFolderId && scriptUrl) {
        handleSyncEventPhotos(created.id, cleanFolderId, created.title);
      }
    } catch (err) {
      console.error("Event creation error:", err);
      setModalError(err.message || "Failed to create event. Please check database connection.");
      notify("Failed to create event: " + err.message, "error");
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  // Delete Event Handler
  const handleDeleteEvent = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}" and all its photos?`)) return;
    try {
      await deleteEvent(id);
      setEvents(events.filter(e => e.id !== id));
      notify(`Event "${title}" deleted.`);
    } catch (err) {
      notify("Failed to delete event: " + err.message, "error");
    }
  };

  // Sync Photos from Google Drive via Apps Script Webhook
  const handleSyncEventPhotos = async (eventId, folderId, eventTitle) => {
    if (!folderId) {
      notify("No Google Drive folder ID configured for this event.", "error");
      return;
    }
    if (!scriptUrl) {
      setActiveTab("settings");
      notify("Please configure your Google Apps Script Webhook URL in Settings first.", "error");
      return;
    }

    setSyncingEventId(eventId);
    try {
      const syncResult = await syncFolderWithAppsScript(scriptUrl, folderId);
      if (syncResult.photos && syncResult.photos.length > 0) {
        await saveSyncedPhotos(eventId, syncResult.photos);
        notify(`✅ Synced ${syncResult.photos.length} photos for "${eventTitle}"!`);
        await loadDashboardData();
      } else {
        notify("No photos found in Google Drive folder. Check folder permissions.", "error");
      }
    } catch (err) {
      console.error(err);
      notify("Drive Sync Error: " + err.message, "error");
    } finally {
      setSyncingEventId(null);
    }
  };

  // Create Reel Handler
  const handleCreateReel = async (e) => {
    e.preventDefault();
    if (!reelForm.title.trim() || !reelForm.instagram_url.trim()) return;

    try {
      const cleanThumbnail = extractDriveId(reelForm.thumbnail_url);
      const created = await createHomepageReel({
        ...reelForm,
        thumbnail_url: cleanThumbnail || reelForm.thumbnail_url
      });
      setReels([created, ...reels]);
      setShowReelModal(false);
      setReelForm({
        title: "",
        category: "Highlight",
        instagram_url: "",
        thumbnail_url: "",
        duration: "0:30"
      });
      notify(`Reel "${created.title}" added to Homepage!`);
    } catch (err) {
      notify("Failed to add reel: " + err.message, "error");
    }
  };

  // Delete Reel Handler
  const handleDeleteReel = async (id, title) => {
    if (!window.confirm(`Delete reel "${title}"?`)) return;
    try {
      await deleteHomepageReel(id);
      setReels(reels.filter(r => r.id !== id));
      notify(`Reel deleted.`);
    } catch (err) {
      notify("Failed to delete reel: " + err.message, "error");
    }
  };

  // Save Settings Handlers
  const handleSaveScriptUrl = (e) => {
    e.preventDefault();
    saveStoredAppsScriptUrl(scriptUrl);
    notify("Google Apps Script Webhook URL saved!");
  };

  const handleSaveDatabaseConfig = (e) => {
    e.preventDefault();
    saveConnectionConfig(supabaseUrl, supabaseKey);
    notify("Supabase connection saved! Reloading...");
  };

  /* ==========================================================
     LOGIN SCREEN IF NOT AUTHENTICATED
     ========================================================== */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-base flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md p-8 bg-dark-card/90 border border-gold-500/30 shadow-2xl backdrop-blur-md rounded-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col items-center text-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl border border-gold-500/40 bg-gold-500/10 flex items-center justify-center text-gold-400 mb-1">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="font-anton text-3xl tracking-wide uppercase text-foreground">
              JB MEDIA ADMIN
            </h1>
            <p className="font-barlow text-xs text-foreground/60">
              Enter your team credentials to access the gallery & content manager.
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-400 font-barlow">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-barlow-condensed tracking-wider uppercase text-gold-400 mb-1.5 font-semibold">
                Admin Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-gold-500/25 text-foreground placeholder:text-foreground/30 text-sm focus:outline-none focus:border-gold-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-barlow-condensed tracking-wider uppercase text-gold-400 mb-1.5 font-semibold">
                Secret Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-gold-500/25 text-foreground placeholder:text-foreground/30 text-sm focus:outline-none focus:border-gold-400 transition-colors"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoggingIn}
              className="w-full mt-3 py-5 font-barlow-condensed font-semibold tracking-wider uppercase text-sm"
            >
              {isLoggingIn ? "Verifying Access..." : "Enter Control Center"}
            </Button>
          </form>

          <div className="mt-8 pt-4 border-t border-gold-500/15 text-center">
            <span className="text-[11px] font-barlow text-foreground/40">
              Default credentials: <code className="text-gold-300">admin</code> / <code className="text-gold-300">jbmedia2026</code>
            </span>
          </div>
        </Card>
      </div>
    );
  }

  /* ==========================================================
     AUTHENTICATED ADMIN DASHBOARD
     ========================================================== */
  return (
    <div className="min-h-screen bg-dark-base text-foreground pt-32 pb-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Top Header & Status Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-dark-card/60 border border-gold-500/20 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-anton text-2xl sm:text-3xl tracking-wide uppercase text-foreground">
                  JB Media Control Center
                </h1>
                <Badge variant="outline" className="text-[10px] uppercase border-gold-400/40 text-gold-300">
                  Admin Active
                </Badge>
              </div>
              <p className="font-barlow text-xs text-foreground/70 mt-0.5">
                Manage dynamic event galleries, Google Drive syncing, and Instagram reels.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-gold-500/20 text-xs font-barlow">
              <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured() ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" : "bg-amber-400"}`} />
              <span className="text-foreground/80">
                {isSupabaseConfigured() ? "Supabase Connected" : "Local Mode (Mock DB)"}
              </span>
            </div>

            <Button size="sm" variant="ghost" onClick={handleLogout} className="gap-1.5 text-xs text-red-400 hover:text-red-300">
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Global Action Notification */}
        {actionNotice && (
          <div className={`p-4 rounded-xl border text-xs font-barlow flex items-center justify-between gap-3 animate-in fade-in duration-300 ${
            actionNotice.type === "error" 
              ? "bg-red-500/10 border-red-500/30 text-red-300" 
              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
          }`}>
            <div className="flex items-center gap-2.5">
              {actionNotice.type === "error" ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>{actionNotice.msg}</span>
            </div>
            <button onClick={() => setActionNotice(null)} className="opacity-60 hover:opacity-100">✕</button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gold-500/20 pb-4">
          <button
            onClick={() => setActiveTab("events")}
            className={`px-5 py-2.5 rounded-xl font-barlow-condensed font-semibold uppercase text-xs tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "events"
                ? "bg-gold-500 text-black shadow-lg shadow-gold-500/20"
                : "bg-dark-card/50 text-foreground/70 hover:text-foreground border border-gold-500/15"
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>Event Galleries ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("reels")}
            className={`px-5 py-2.5 rounded-xl font-barlow-condensed font-semibold uppercase text-xs tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "reels"
                ? "bg-gold-500 text-black shadow-lg shadow-gold-500/20"
                : "bg-dark-card/50 text-foreground/70 hover:text-foreground border border-gold-500/15"
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Homepage Reels ({reels.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-5 py-2.5 rounded-xl font-barlow-condensed font-semibold uppercase text-xs tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "settings"
                ? "bg-gold-500 text-black shadow-lg shadow-gold-500/20"
                : "bg-dark-card/50 text-foreground/70 hover:text-foreground border border-gold-500/15"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Integrations & Setup</span>
          </button>
        </div>

        {/* ==========================================================
            TAB 1: EVENT GALLERIES & GOOGLE DRIVE SYNC
            ========================================================== */}
        {activeTab === "events" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-anton text-xl tracking-wide uppercase text-foreground">
                  Covered Events & Albums
                </h2>
                <p className="font-barlow text-xs text-foreground/60">
                  Each event connects to a Google Drive folder. Click "Sync" to ingest newest photos.
                </p>
              </div>

              <Button 
                onClick={() => {
                  setModalError("");
                  setEventForm({
                    title: "",
                    category: "Fests",
                    event_date: new Date().toISOString().split("T")[0],
                    drive_folder_id: "",
                    description: ""
                  });
                  setShowEventModal(true);
                }} 
                className="gap-2 text-xs font-barlow-condensed uppercase font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>New Event</span>
              </Button>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((ev) => (
                <Card key={ev.id} className="p-5 bg-dark-card/80 border border-gold-500/20 rounded-2xl flex flex-col justify-between hover:border-gold-400/40 transition-all group">
                  <div>
                    {/* Event Cover Image or Placeholder */}
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/60 border border-gold-500/15 mb-4">
                      {ev.cover_image_id ? (
                        <img
                          src={getDriveThumbnail(ev.cover_image_id, "w800")}
                          alt={ev.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const current = e.target.src;
                            const cleanId = ev.cover_image_id;
                            if (!cleanId) return;
                            if (current.includes("drive.google.com/thumbnail")) {
                              e.target.src = `https://lh3.googleusercontent.com/d/${cleanId}`;
                            } else if (current.includes("googleusercontent.com")) {
                              e.target.src = `https://drive.google.com/uc?export=view&id=${cleanId}`;
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-foreground/30 gap-2">
                          <ImageIcon className="w-8 h-8" />
                          <span className="text-[11px] font-barlow">No cover selected</span>
                        </div>
                      )}

                      <div className="absolute top-2.5 left-2.5">
                        <Badge variant="default" className="text-[10px] font-semibold">
                          {ev.category}
                        </Badge>
                      </div>

                      <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-gold-500/20 text-[10px] font-barlow text-gold-300">
                        {ev.photoCount || 0} Photos
                      </div>
                    </div>

                    <h3 className="font-anton text-lg tracking-wide uppercase text-foreground group-hover:text-gold-300 transition-colors">
                      {ev.title}
                    </h3>
                    <p className="font-barlow text-xs text-foreground/60 mt-1 line-clamp-2">
                      {ev.description || "No description provided."}
                    </p>

                    <div className="mt-3 text-[11px] font-barlow text-gold-400/80">
                      Date: <span className="text-foreground/80">{ev.event_date}</span>
                    </div>

                    {ev.drive_folder_id && (
                      <div className="mt-1 text-[11px] font-barlow text-foreground/40 font-mono truncate">
                        Drive ID: {ev.drive_folder_id}
                      </div>
                    )}
                  </div>

                  {/* Actions Toolbar */}
                  <div className="pt-5 mt-4 border-t border-gold-500/15 flex items-center justify-between gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={syncingEventId === ev.id || !ev.drive_folder_id}
                      onClick={() => handleSyncEventPhotos(ev.id, ev.drive_folder_id, ev.title)}
                      className="gap-1.5 text-xs font-barlow-condensed uppercase flex-1 justify-center"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${syncingEventId === ev.id ? "animate-spin text-gold-400" : ""}`} />
                      <span>{syncingEventId === ev.id ? "Syncing..." : "Sync Photos"}</span>
                    </Button>

                    {ev.drive_folder_id && (
                      <a
                        href={`https://drive.google.com/drive/folders/${ev.drive_folder_id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg border border-gold-500/20 bg-black/40 hover:bg-gold-500/10 text-foreground/70 hover:text-gold-300 transition-colors"
                        title="Open Google Drive Folder"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      onClick={() => handleDeleteEvent(ev.id, ev.title)}
                      className="p-2 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/20 text-red-400 transition-colors"
                      title="Delete Event"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================================
            TAB 2: HOMEPAGE REELS MANAGER
            ========================================================== */}
        {activeTab === "reels" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-anton text-xl tracking-wide uppercase text-foreground">
                  Homepage Video Reels
                </h2>
                <p className="font-barlow text-xs text-foreground/60">
                  Featured video cards that deep-link directly to native Instagram app on tap.
                </p>
              </div>

              <Button onClick={() => setShowReelModal(true)} className="gap-2 text-xs font-barlow-condensed uppercase font-semibold">
                <Plus className="w-4 h-4" />
                <span>New Reel</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {reels.map((reel) => (
                <Card key={reel.id} className="p-4 bg-dark-card/80 border border-gold-500/20 rounded-2xl flex flex-col justify-between group">
                  <div>
                    <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden bg-black border border-gold-500/15 mb-3 flex items-center justify-center">
                      <img
                        src={getDriveThumbnail(reel.thumbnail_url || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop", "w800")}
                        alt={reel.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      
                      <div className="absolute top-2.5 left-2.5">
                        <Badge variant="outline" className="text-[9px] uppercase border-gold-400/40 bg-black/60 text-gold-300">
                          {reel.category}
                        </Badge>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="font-anton text-sm uppercase text-foreground leading-tight">
                          {reel.title}
                        </h4>
                        <span className="text-[10px] font-barlow text-gold-300/80">
                          Duration: {reel.duration || "0:30"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gold-500/15 flex items-center justify-between gap-2">
                    <a
                      href={reel.instagram_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-barlow-condensed uppercase text-gold-300 hover:text-gold-100"
                    >
                      <span>Test Link</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => handleDeleteReel(reel.id, reel.title)}
                      className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================================
            TAB 3: INTEGRATIONS & SETUP
            ========================================================== */}
        {activeTab === "settings" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Google Apps Script Webhook */}
            <Card className="p-6 bg-dark-card/80 border border-gold-500/20 rounded-2xl flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-anton text-lg tracking-wide uppercase text-foreground">
                    Google Apps Script Webhook URL
                  </h3>
                  <p className="font-barlow text-xs text-foreground/60">
                    Required for 1-click sync from Google Drive folders.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveScriptUrl} className="flex flex-col gap-3">
                <input
                  type="url"
                  value={scriptUrl}
                  onChange={(e) => setScriptUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-gold-500/25 text-foreground placeholder:text-foreground/30 text-xs font-mono focus:outline-none focus:border-gold-400"
                />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-barlow text-foreground/40">
                    See <code className="text-gold-300">google_apps_script.js</code> in project root.
                  </span>
                  <Button type="submit" size="sm" className="text-xs font-barlow-condensed uppercase">
                    Save Webhook URL
                  </Button>
                </div>
              </form>
            </Card>

            {/* Supabase Database Connection */}
            <Card className="p-6 bg-dark-card/80 border border-gold-500/20 rounded-2xl flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-anton text-lg tracking-wide uppercase text-foreground">
                    Supabase Database Keys
                  </h3>
                  <p className="font-barlow text-xs text-foreground/60">
                    Connect your free cloud database (supabase.com).
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveDatabaseConfig} className="flex flex-col gap-3">
                <div>
                  <label className="block text-[11px] font-barlow uppercase text-gold-400 mb-1">Project URL</label>
                  <input
                    type="url"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="https://xyz.supabase.co"
                    className="w-full px-4 py-2 rounded-lg bg-black/60 border border-gold-500/25 text-foreground text-xs font-mono focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-barlow uppercase text-gold-400 mb-1">Anon Public Key</label>
                  <input
                    type="password"
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                    placeholder="eyJhbGciOi..."
                    className="w-full px-4 py-2 rounded-lg bg-black/60 border border-gold-500/25 text-foreground text-xs font-mono focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-barlow text-foreground/40">
                    See <code className="text-gold-300">supabase_schema.sql</code> for database tables.
                  </span>
                  <Button type="submit" size="sm" className="text-xs font-barlow-condensed uppercase">
                    Connect Supabase
                  </Button>
                </div>
              </form>
            </Card>

          </div>
        )}

      </div>

      {/* ==========================================================
          MODAL: ADD NEW EVENT
          ========================================================== */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-lg p-6 bg-dark-card border border-gold-500/40 rounded-2xl shadow-2xl relative">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-anton text-xl tracking-wide uppercase text-foreground">
                Add New Covered Event
              </h3>
              <button onClick={() => setShowEventModal(false)} className="text-foreground/50 hover:text-foreground">✕</button>
            </div>

            {modalError && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300 font-barlow">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 leading-relaxed">
                  <strong>Could not create event:</strong>
                  <p className="mt-0.5">{modalError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleCreateEvent} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-barlow uppercase text-gold-400 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="e.g. Orientation Day"
                  className="w-full px-4 py-2 rounded-lg bg-black/60 border border-gold-500/25 text-foreground text-sm focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-barlow uppercase text-gold-400 mb-1">Category</label>
                  <select
                    value={eventForm.category}
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-gold-500/25 text-foreground text-xs focus:outline-none focus:border-gold-400"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c} className="bg-dark-base">{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-barlow uppercase text-gold-400 mb-1">Event Date</label>
                  <input
                    type="date"
                    value={eventForm.event_date}
                    onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-gold-500/25 text-foreground text-xs focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-barlow uppercase text-gold-400 mb-1">Google Drive Folder Link / ID</label>
                <input
                  type="text"
                  value={eventForm.drive_folder_id}
                  onChange={(e) => setEventForm({ ...eventForm, drive_folder_id: e.target.value })}
                  placeholder="https://drive.google.com/drive/folders/1abc... or 1abc..."
                  className="w-full px-4 py-2 rounded-lg bg-black/60 border border-gold-500/25 text-foreground text-xs font-mono focus:outline-none focus:border-gold-400"
                />
                <span className="text-[10px] text-foreground/40 mt-1 block">
                  Paste the full Google Drive folder link or folder ID. Ensure sharing is set to "Anyone with link can view".
                </span>
              </div>

              <div>
                <label className="block text-xs font-barlow uppercase text-gold-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  placeholder="Brief highlights or coverage notes..."
                  className="w-full px-4 py-2 rounded-lg bg-black/60 border border-gold-500/25 text-foreground text-xs focus:outline-none focus:border-gold-400 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-gold-500/15">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowEventModal(false)} disabled={isSubmittingEvent}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={isSubmittingEvent} className="font-barlow-condensed uppercase font-semibold gap-1.5">
                  {isSubmittingEvent && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isSubmittingEvent ? "Creating & Syncing..." : "Create Event"}</span>
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* ==========================================================
          MODAL: ADD NEW REEL
          ========================================================== */}
      {showReelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-md p-6 bg-dark-card border border-gold-500/40 rounded-2xl shadow-2xl relative">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-anton text-xl tracking-wide uppercase text-foreground">
                Add Homepage Video Reel
              </h3>
              <button onClick={() => setShowReelModal(false)} className="text-foreground/50 hover:text-foreground">✕</button>
            </div>

            <form onSubmit={handleCreateReel} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-barlow uppercase text-gold-400 mb-1">Reel Title *</label>
                <input
                  type="text"
                  required
                  value={reelForm.title}
                  onChange={(e) => setReelForm({ ...reelForm, title: e.target.value })}
                  placeholder="e.g. Flashmob Teaser"
                  className="w-full px-4 py-2 rounded-lg bg-black/60 border border-gold-500/25 text-foreground text-sm focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs font-barlow uppercase text-gold-400 mb-1">Instagram Reel URL *</label>
                <input
                  type="url"
                  required
                  value={reelForm.instagram_url}
                  onChange={(e) => setReelForm({ ...reelForm, instagram_url: e.target.value })}
                  placeholder="https://www.instagram.com/reel/C..."
                  className="w-full px-4 py-2 rounded-lg bg-black/60 border border-gold-500/25 text-foreground text-xs focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs font-barlow uppercase text-gold-400 mb-1">Cover Image (Drive ID or URL)</label>
                <input
                  type="text"
                  value={reelForm.thumbnail_url}
                  onChange={(e) => setReelForm({ ...reelForm, thumbnail_url: e.target.value })}
                  placeholder="Google Drive File ID or Image URL"
                  className="w-full px-4 py-2 rounded-lg bg-black/60 border border-gold-500/25 text-foreground text-xs font-mono focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-gold-500/15">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowReelModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="font-barlow-condensed uppercase font-semibold">
                  Add Reel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

    </div>
  );
}

export default AdminPage;
