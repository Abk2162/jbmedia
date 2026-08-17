import React, { useState, useMemo, useEffect } from "react";
import { Search, Filter, Maximize2, Download, Share2, Calendar, User, Tag, Sparkles, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import galleryData from "@/data/gallery.json";

const CATEGORIES = ["All", "Fests", "Cultural", "Sports", "Tech & Workshops", "Photowalks"];

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Filter photos based on category and search query
  const filteredPhotos = useMemo(() => {
    return galleryData.filter((photo) => {
      const matchesCategory = activeCategory === "All" || photo.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        photo.photographer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Keyboard navigation for Lightbox (Left / Right Arrow)
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
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-12 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <Badge variant="default" className="gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            <span>Visual Archive</span>
          </Badge>
          <span className="font-barlow-condensed text-xs uppercase tracking-widest text-gold-400 font-semibold">
            Synchronized with Google Drive
          </span>
        </div>

        <h1 className="font-anton text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-foreground">
          MEDIA <span className="bg-gold-gradient bg-clip-text text-transparent">GALLERY</span>
        </h1>
        <p className="font-barlow text-lg text-foreground/75 max-w-2xl">
          Explore captured memories from JBIET festivals, cultural nights, sports tournaments, technical hackathons, and campus photowalks.
        </p>
      </div>

      {/* Control Bar: Categories & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-gold-500/20">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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
            placeholder="Search events, tags, people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-full bg-dark-card border border-gold-500/30 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 font-barlow transition-all"
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

      {/* Photo Count */}
      <div className="flex items-center justify-between text-xs font-barlow-condensed uppercase tracking-widest text-foreground/50 mb-6">
        <span>Showing {filteredPhotos.length} Captured Moments</span>
        {activeCategory !== "All" && <span>Filtered by: {activeCategory}</span>}
      </div>

      {/* Responsive Masonry / Card Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-gold-500/20 rounded-2xl bg-dark-card/30">
          <div className="font-anton text-2xl text-gold-300 uppercase mb-2">No Photos Found</div>
          <p className="font-barlow text-foreground/60 text-sm">
            Try adjusting your search query or switching categories.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="mt-4"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-2xl border border-gold-500/20 bg-dark-card/80 overflow-hidden cursor-pointer shadow-lg hover:border-gold-400/60 transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                
                {/* Scrim Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-between p-4" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <Badge variant="gold" className="text-[10px] px-2.5 py-0.5 shadow-md">
                    {photo.category}
                  </Badge>
                  <div className="w-8 h-8 rounded-full bg-black/60 border border-gold-500/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Maximize2 className="w-4 h-4 text-gold-300" />
                  </div>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col gap-1.5">
                  <h3 className="font-anton text-xl uppercase tracking-wide text-foreground line-clamp-1 group-hover:text-gold-200 transition-colors">
                    {photo.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs font-barlow text-foreground/70">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gold-400" />
                      {photo.eventDate}
                    </span>
                    <span className="flex items-center gap-1 font-barlow-condensed uppercase tracking-wider text-gold-300">
                      <User className="w-3 h-3" />
                      {photo.photographer}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------------- FULL-SCREEN HD LIGHTBOX DIALOG ---------------- */}
      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
          <DialogContent className="max-w-6xl p-0 overflow-hidden border-gold-500/40 bg-dark-base/98">
            <div className="relative flex flex-col lg:flex-row h-full max-h-[90vh]">
              {/* Left/Main: HD Image Area */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[360px] lg:min-h-[600px] overflow-hidden group">
                <img
                  src={selectedPhoto.hdUrl}
                  alt={selectedPhoto.title}
                  className="max-h-[75vh] w-full object-contain select-none"
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
                    <Badge variant="gold">{selectedPhoto.category}</Badge>
                    <span className="text-xs font-barlow-condensed text-foreground/60 uppercase tracking-widest">
                      {selectedPhoto.eventDate}
                    </span>
                  </div>

                  <h2 className="font-anton text-2xl uppercase tracking-wide text-foreground leading-tight">
                    {selectedPhoto.title}
                  </h2>

                  <p className="font-barlow text-sm text-foreground/80 leading-relaxed">
                    {selectedPhoto.description}
                  </p>

                  {/* Metadata fields */}
                  <div className="flex flex-col gap-2 pt-3 border-t border-gold-500/20 text-xs font-barlow text-foreground/70">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/50">Photographer</span>
                      <span className="font-semibold text-gold-300">{selectedPhoto.photographer}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/50">Club Vertical</span>
                      <span>Photography & Cine</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {selectedPhoto.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-barlow-condensed uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-foreground/70"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-6 border-t border-gold-500/20">
                  <a
                    href={selectedPhoto.hdUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1"
                  >
                    <Button variant="default" size="sm" className="w-full gap-2">
                      <Download className="w-4 h-4" />
                      <span>View Full HD</span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
