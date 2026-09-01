/**
 * ==========================================================
 * JB MEDIA — GOOGLE APPS SCRIPT WEBHOOK FOR DRIVE SYNC
 * ==========================================================
 * 
 * HOW TO DEPLOY (Takes 2 minutes):
 * 1. Open Google Drive (drive.google.com) and click "New" > "More" > "Google Apps Script"
 *    (or go to script.google.com).
 * 2. Delete any existing code in the editor and paste THIS ENTIRE FILE.
 * 3. Click "Deploy" > "New deployment".
 * 4. Select Type: "Web app".
 * 5. Configuration:
 *    - Description: "JB Media Drive Sync"
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone"  <-- CRITICAL so your website admin can call it
 * 6. Click "Deploy" and copy the "Web app URL" (starts with https://script.google.com/macros/s/...).
 * 7. Paste this Web app URL in your JB Media Admin Dashboard (/admin).
 */

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var params = e ? e.parameter : {};
  var folderId = params.folderId || (e && e.postData ? JSON.parse(e.postData.contents).folderId : null);

  if (!folderId) {
    return createJsonResponse({
      success: false,
      error: "Missing required query parameter: folderId (e.g. ?folderId=YOUR_DRIVE_FOLDER_ID)"
    }, 400);
  }

  // Sanitize folder ID if full Drive URL was passed
  folderId = extractFolderId(folderId);

  try {
    var folder = DriveApp.getFolderById(folderId);
    var filesIterator = folder.getFiles();
    var photoList = [];

    // Supported image mime types (including iPhone HEIC, HEIF, WebP, Camera RAW, etc.)
    var imageTypes = [
      "image/jpeg", "image/png", "image/webp", "image/heic", "image/heif",
      "image/gif", "image/jpg", "image/tiff", "image/x-adobe-dng",
      "image/x-canon-cr2", "image/x-nikon-nef", "image/x-sony-arw", "image/bmp", "image/avif"
    ];

    while (filesIterator.hasNext()) {
      var file = filesIterator.next();
      var mimeType = file.getMimeType();

      // Filter to only image files (by MIME or extension)
      if (imageTypes.indexOf(mimeType.toLowerCase()) !== -1 || isImageExtension(file.getName())) {
        var fileId = file.getId();
        photoList.push({
          id: fileId,
          name: file.getName(),
          size: file.getSize(),
          mimeType: mimeType,
          dateCreated: file.getDateCreated().toISOString(),
          thumbnailUrl: "https://drive.google.com/thumbnail?id=" + fileId + "&sz=w800",
          highResUrl: "https://drive.google.com/thumbnail?id=" + fileId + "&sz=w1600",
          directViewUrl: "https://drive.google.com/file/d/" + fileId + "/view"
        });
      }
    }

    return createJsonResponse({
      success: true,
      folderId: folderId,
      folderName: folder.getName(),
      totalPhotos: photoList.length,
      photos: photoList
    });

  } catch (error) {
    return createJsonResponse({
      success: false,
      error: "Google Drive Error: " + error.toString() + ". Make sure the folder is set to 'Anyone with the link can view'."
    }, 500);
  }
}

function isImageExtension(filename) {
  var ext = (filename || "").split('.').pop().toLowerCase();
  var supportedExts = [
    "jpg", "jpeg", "png", "webp", "heic", "heif", "avif", 
    "dng", "cr2", "nef", "arw", "tiff", "tif", "bmp", "gif"
  ];
  return supportedExts.indexOf(ext) !== -1;
}

function extractFolderId(input) {
  if (!input) return "";
  input = input.trim();
  // Extract ID from full URL like https://drive.google.com/drive/folders/1aBcDeFgHiJkLmNoP
  var match = input.match(/folders\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return input;
}

function createJsonResponse(data) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
