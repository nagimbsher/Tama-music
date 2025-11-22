# Songs Directory

This folder should contain your audio files (MP3, M4A, etc.).

## Folder Structure

```
Tama-music/
├── songs/
│   ├── song1.mp3
│   ├── song2.mp3
│   └── ... (your audio files)
└── songs.json
```

## How to Add Songs

1. **Add Audio Files**:
   - Place your audio files (MP3, M4A, etc.) in this `songs/` folder
   - Name them descriptively (e.g., `tama-traditional-song.mp3`)

2. **Update songs.json**:
   - Edit `songs.json` in the root directory
   - Add entries for each song with:
     - `id`: Unique number
     - `title`: Song title
     - `artist`: Artist name
     - `url`: GitHub raw URL to the file
     - `category`: Category (Traditional, Kids, etc.)

3. **Example songs.json entry**:
```json
{
  "id": 1,
  "title": "Tama Traditional Song",
  "artist": "Unknown",
  "url": "https://raw.githubusercontent.com/nagimbsher/Tama-music/main/songs/song1.mp3",
  "category": "Traditional"
}
```

4. **Push to GitHub**:
   ```bash
   git add songs/
   git add songs.json
   git commit -m "Add new songs"
   git push
   ```

## Important Notes

- **File Size**: GitHub has a 100MB file size limit per file
- **Large Files**: For files larger than 100MB, consider using:
  - GitHub LFS (Large File Storage)
  - External hosting (AWS S3, Firebase Storage, etc.)
  - CDN services

- **URL Format**: The URL should be:
  ```
  https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/songs/FILENAME.mp3
  ```

## Supported Audio Formats

- MP3 (recommended)
- M4A
- AAC
- WAV (larger file size)

Make sure your audio files are optimized for mobile streaming!

