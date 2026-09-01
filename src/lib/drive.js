/**
 * Google Drive URL & Thumbnail Utilities
 */

/**
 * Extract Google Drive file or folder ID from various URL formats or raw IDs
 */
export function extractDriveId(input) {
  if (!input) return "";
  const str = input.trim();
  
  // Folder URL match: /folders/ID
  const folderMatch = str.match(/folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch && folderMatch[1]) return folderMatch[1];

  // File URL match: /d/ID/ or /file/d/ID
  const fileMatch = str.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) return fileMatch[1];

  // Query parameter ID match: ?id=ID
  const queryMatch = str.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (queryMatch && queryMatch[1]) return queryMatch[1];

  // If already a raw ID without slashes
  return str.replace(/[^a-zA-Z0-9_-]/g, "");
}

/**
 * Generate Google's global high-speed edge thumbnail URL
 * @param {string} fileId - Google Drive file ID
 * @param {string} size - 'w400', 'w800', 'w1200', 'w1600', or 'w2400'
 */
export function getDriveThumbnail(fileId, size = "w800") {
  if (!fileId) return "";
  const cleanId = extractDriveId(fileId);
  // If the input is already a full external image URL (e.g. Unsplash), return as is
  if (fileId.startsWith("http://") || fileId.startsWith("https://") || fileId.startsWith("/")) {
    if (!fileId.includes("drive.google.com")) {
      return fileId;
    }
  }
  return `https://drive.google.com/thumbnail?id=${cleanId}&sz=${size}`;
}

/**
 * Generate direct Google Drive preview link
 */
export function getDriveDirectUrl(fileId) {
  if (!fileId) return "";
  const cleanId = extractDriveId(fileId);
  return `https://drive.google.com/file/d/${cleanId}/view`;
}

/**
 * Call the Google Apps Script Webhook to extract photo metadata from a Drive folder
 */
export async function syncFolderWithAppsScript(webhookUrl, folderId) {
  if (!webhookUrl) {
    throw new Error("Google Apps Script Webhook URL is not configured. Please set it in Admin Settings.");
  }
  const cleanFolderId = extractDriveId(folderId);
  if (!cleanFolderId) {
    throw new Error("Invalid Google Drive folder ID or URL provided.");
  }

  // Use GET request with folderId parameter
  const url = `${webhookUrl}?folderId=${encodeURIComponent(cleanFolderId)}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Google Apps Script returned HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || "Failed to fetch files from Google Drive folder.");
  }

  return data;
}
