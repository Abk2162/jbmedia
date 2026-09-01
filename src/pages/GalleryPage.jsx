import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Maximize2, 
  Download, 
  Share2, 
  Calendar, 
  User, 
  Tag, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  X,
  ExternalLink,
  FolderOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { fetchEvents, fetchEventPhotos } from "@/lib/supabase";
import { getDriveThumbnail, getDriveDirectUrl } from "@/lib/drive";

const CATEGORIES = ["All", "Fests", "Cultural", "Sports", "Tech & Workshops", "Photowalks", "Campus Life"];

export function GalleryPage() {
  const [events, setEvents] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("all");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load live data from Supabase / local store
  useEffect(() => {
    async function loadGallery() {
      setIsLoading(true);
      try {
        const [eventsData, photosData] = await Promise.all([
          fetchEvents(),
          fetchEventPhotos()
        ]);
        setEvents(eventsData || []);
        setPhotos(photosData || []);
      } catch (err) {
        console.error("Gallery load error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadGallery();
  }, []);

  // Filter photos based on event selection, category, and search query
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      // Event filter
      const matchesEvent = selectedEventId === "all" || photo.event_id === selectedEventId;
      
      // Category filter (match photo category or parent event category)
      const parentEvent = events.find(e => e.id === photo.event_id);
      const photoCategory = photo.category || parentEvent?.category || "Fests";
      const matchesCategory = activeCategory === "All" || photoCategory === activeCategory;

      // Search query filter
      const search = searchQuery.trim().toLowerCase();
      const matchesSearch =
        search === "" ||
        (photo.title && photo.title.toLowerCase().includes(search)) ||
        (parentEvent?.title && parentEvent.title.toLowerCase().includes(search)) ||
        (photo.tags && photo.tags.some((t) => t.toLowerCase().includes(search))) ||
        (photo.photographer && photo.photographer.toLowerCase().includes(search));

      return matchesEvent && matchesCategory && matchesSearch;
    });
  }, [photos, events, selectedEventId, activeCategory, searchQuery]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedPhoto) return;
      const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
      if (e.key === "ArrowRight") {
        const nextIndex = (currentIndex + 1) % filteredPhotos.length;
        setSelectedPhoto(filteredPhotos[nextIndex]);
      } else if (e.key === "ArrowLeft") {
        const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
        setSelectedPhoto(filteredPhotos[prevIndex]);
      } else if (e.key === "Escape") {
        setSelectedPhoto(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, filteredPhotos]);

  const handleNextPhoto = (e) => {
    e?.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrevPhoto = (e) => {
    e?.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-12 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <Badge variant="default" className="gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            <span>Visual Archive</span>
          </Badge>
          <span className="font-barlow-condensed text-xs uppercase tracking-widest text-gold-400 font-semibold">
            Google Drive & Cloud Sync
          </span>
        </div>

        <h1 className="font-anton text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-foreground">
          MEDIA <span className="bg-gold-gradient bg-clip-text text-transparent">GALLERY</span>
        </h1>
        <p className="font-barlow text-lg text-foreground/75 max-w-2xl">
          High-definition visual memories captured across JBIET festivals, cultural nights, sports tournaments, technical hackathons, and photowalks.
        </p>
      </div>

      {/* Control Bar: Categories, Event Dropdown, and Search */}
      <div className="flex flex-col gap-4 mb-10 pb-6 border-b border-gold-500/20">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedEventId("all");
                }}
                className={`px-4 py-2 rounded-full text-xs font-barlow-condensed font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-gold-gradient text-dark-base shadow-md font-bold"
                    : "bg-dark-surface/80 text-foreground/70 border border-gold-500/20 hover:text-gold-200 hover:border-gold-400/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/70" />
            <input
              type="text"
              placeholder="Search moments, tags, fests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-full bg-dark-card border border-gold-500/30 text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 font-barlow transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Specific Event Selector if events exist */}
        {events.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto text-xs font-barlow pt-1">
            <span className="text-foreground/50 text-[11px] uppercase tracking-wider whitespace-nowrap">Events:</span>
            <button
              onClick={() => setSelectedEventId("all")}
              className={`px-3 py-1 rounded-md text-xs whitespace-nowrap transition-colors ${
                selectedEventId === "all"
                  ? "bg-gold-500/20 text-gold-300 border border-gold-500/40 font-semibold"
                  : "text-foreground/70 hover:text-foreground hover:bg-white/5"
              }`}
            >
              All Events ({photos.length})
            </button>
            {events.map((ev) => (
              <button
                key={ev.id}
                onClick={() => setSelectedEventId(ev.id)}
                className={`px-3 py-1 rounded-md text-xs whitespace-nowrap transition-colors ${
                  selectedEventId === ev.id
                    ? "bg-gold-500/20 text-gold-300 border border-gold-500/40 font-semibold"
                    : "text-foreground/70 hover:text-foreground hover:bg-white/5"
                }`}
              >
                {ev.title} {ev.photoCount ? `(${ev.photoCount})` : ""}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Photo Count Status */}
      <div className="flex items-center justify-between text-xs font-barlow-condensed uppercase tracking-widest text-foreground/50 mb-6">
        <span>Showing {filteredPhotos.length} Captured Moments</span>
        {activeCategory !== "All" && <span>Filtered by: {activeCategory}</span>}
      </div>

      {/* Grid View */}
      {isLoading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
          <span className="text-xs font-barlow text-foreground/60">Loading cloud gallery...</span>
        </div>
      ) : filteredPhotos.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-gold-500/20 rounded-2xl bg-dark-card/30">
          <div className="font-anton text-2xl text-gold-300 uppercase mb-2">No Photos Found</div>
          <p className="font-barlow text-foreground/60 text-sm">
            Try adjusting your search query or switching event albums.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setActiveCategory("All");
              setSelectedEventId("all");
              setSearchQuery("");
            }}
            className="mt-4"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => {
            const rawId = photo.drive_file_id || photo.thumbnailUrl || photo.image;
            const thumbUrl = getDriveThumbnail(rawId, "w800");
            const parentEvent = events.find(e => e.id === photo.event_id);

            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative rounded-2xl border border-gold-500/20 bg-dark-card/80 overflow-hidden cursor-pointer shadow-lg hover:border-gold-400/60 transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Image Container with Google Drive Thumbnail */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                  <img
                    src={thumbUrl}
                    alt={photo.title || "Campus Moment"}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    onError={(e) => {
                      const current = e.target.src;
                      const cleanId = photo.drive_file_id;
                      if (!cleanId) return;
                      if (current.includes("=s")) {
                        e.target.src = `https://lh3.googleusercontent.com/d/${cleanId}`;
                      } else if (current.includes("googleusercontent.com")) {
                        e.target.src = `https://drive.google.com/thumbnail?id=${cleanId}&sz=w800`;
                      } else if (current.includes("thumbnail?id=")) {
                        e.target.src = `https://drive.google.com/uc?export=view&id=${cleanId}`;
                      }
                    }}
                  />
                  
                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-between p-4" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <Badge variant="gold" className="text-[10px] px-2.5 py-0.5 shadow-md">
                      {photo.category || parentEvent?.category || "Fest"}
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-black/60 border border-gold-500/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Maximize2 className="w-4 h-4 text-gold-300" />
                    </div>
                  </div>

                  {/* Bottom Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col gap-1.5">
                    <h3 className="font-anton text-xl uppercase tracking-wide text-foreground line-clamp-1 group-hover:text-gold-200 transition-colors">
                      {photo.title || parentEvent?.title || "JBIET Moment"}
                    </h3>
                    <div className="flex items-center justify-between text-xs font-barlow text-foreground/70">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gold-400" />
                        {parentEvent?.event_date || photo.eventDate || "2025-2026"}
                      </span>
                      <span className="flex items-center gap-1 font-barlow-condensed uppercase tracking-wider text-gold-300">
                        <User className="w-3 h-3" />
                        {photo.photographer || "JB Media Team"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------------- FULL-SCREEN HD LIGHTBOX DIALOG ---------------- */}
      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
          <DialogContent className="max-w-6xl p-0 overflow-hidden border-gold-500/40 bg-dark-base/98">
            <div className="relative flex flex-col lg:flex-row h-full max-h-[90vh]">
              {/* Left/Main: HD Google Drive Image Area */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[360px] lg:min-h-[600px] overflow-hidden group">
                <img
                  src={getDriveThumbnail(selectedPhoto.drive_file_id || selectedPhoto.hdUrl || selectedPhoto.image, "w1600")}
                  alt={selectedPhoto.title}
                  className="max-h-[75vh] w-full object-contain select-none"
                  onError={(e) => {
                    const current = e.target.src;
                    const cleanId = selectedPhoto.drive_file_id;
                    if (!cleanId) return;
                    if (current.includes("=s")) {
                      e.target.src = `https://lh3.googleusercontent.com/d/${cleanId}`;
                    } else if (current.includes("googleusercontent.com")) {
                      e.target.src = `https://drive.google.com/thumbnail?id=${cleanId}&sz=w1600`;
                    } else if (current.includes("thumbnail?id=")) {
                      e.target.src = `https://drive.google.com/uc?export=view&id=${cleanId}`;
                    }
                  }}
                />

                {/* Left/Right Arrow Navigation */}
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-gold-500/40 text-gold-300 hover:text-white hover:bg-gold-500/20 flex items-center justify-center transition-all cursor-pointer z-20"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-gold-500/40 text-gold-300 hover:text-white hover:bg-gold-500/20 flex items-center justify-center transition-all cursor-pointer z-20"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Right Panel: Metadata & Actions */}
              <div className="w-full lg:w-96 p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gold-500/20 bg-dark-card/90">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="gold">{selectedPhoto.category || "Media Highlight"}</Badge>
                  </div>

                  <h2 className="font-anton text-2xl uppercase tracking-wide text-foreground leading-tight">
                    {selectedPhoto.title || "Campus Capture"}
                  </h2>

                  {/* Metadata List */}
                  <div className="flex flex-col gap-2.5 pt-2 border-t border-gold-500/15 text-xs font-barlow text-foreground/80">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/50 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-gold-400" /> Photographer
                      </span>
                      <span className="font-semibold text-foreground">
                        {selectedPhoto.photographer || "JB Media"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-foreground/50 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-gold-400" /> Source
                      </span>
                      <span className="font-semibold text-gold-300">
                        Google Drive HD
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col gap-2.5 pt-6 border-t border-gold-500/15">
                  {selectedPhoto.drive_file_id && (
                    <a
                      href={getDriveDirectUrl(selectedPhoto.drive_file_id)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full"
                    >
                      <Button variant="default" size="sm" className="w-full gap-2 font-barlow-condensed uppercase tracking-wider text-xs">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open in Google Drive</span>
                      </Button>
                    </a>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Gallery link copied to clipboard!");
                      }
                    }}
                    className="w-full gap-2 font-barlow-condensed uppercase tracking-wider text-xs"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Moment</span>
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default GalleryPage;
