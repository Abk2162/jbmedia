---
name: google-drive-sync
description: Workflows for automating image ingestion from Google Drive folders, WebP compression, and metadata generation.
---

# Google Drive Media Sync Pipeline

## Architecture
1. **Schema Standardization**:
   - Every gallery item follows: `{ id, title, category, eventDate, thumbnailUrl, hdUrl, tags, photographer, dimensions }`.
2. **Optimization**:
   - Convert raw camera JPEGs/PNGs into optimized WebP formats (thumbnail ~400px, HD preview ~1600px).
3. **Data Storage**:
   - Write indexed catalog to `src/data/gallery.json`.
4. **Seamless Transition**:
   - The React frontend consumes the normalized JSON structure. Switching from batch-scripted `gallery.json` (Option 1) to a live Google Apps Script endpoint (Option 2) requires only updating the data fetch function.
