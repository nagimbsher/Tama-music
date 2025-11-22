# Tama Music - Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npx expo start
   ```

3. **Run on Device**
   - Scan QR code with Expo Go app (iOS/Android)
   - Or press `i` for iOS simulator, `a` for Android emulator

## Project Structure

```
Tama music/
├── App.js              # Main application component
├── app.json            # Expo configuration
├── songs.json          # Song data (also on GitHub)
├── assets/             # App icons and splash screens
│   ├── icon.png
│   ├── adaptive-icon.png
│   ├── splash.png
│   └── favicon.png
├── PLAY_STORE_GUIDE.md # Publishing guide
└── SETUP_GUIDE.md      # This file
```

## Features Implemented

✅ **Modern UI Design**
- Dark theme with beautiful gradients
- Smooth animations and transitions
- Responsive layout

✅ **Audio Player**
- Play/Pause controls
- Next/Previous song navigation
- Auto-play next song
- Visual feedback for current song

✅ **Download for Offline**
- Download songs to device storage
- Offline playback support
- Download status indicators

✅ **Categories**
- Filter songs by category
- Horizontal scrolling category chips
- "All" category to show everything

✅ **Search Functionality**
- Real-time search
- Search by title, artist, or category
- Clear search button

✅ **Splash Screen & App Icon**
- Configured in app.json
- Add your assets to the assets/ folder

## Creating App Assets

### Option 1: Use Online Tools

1. **App Icon Generator**: https://www.appicon.co/
   - Upload a 1024x1024px image
   - Download all sizes

2. **Splash Screen Generator**: https://www.figma.com/community
   - Search for "Expo Splash Screen" templates

### Option 2: Create Manually

1. **Icon** (1024x1024px):
   - Create a square design with your logo
   - Export as PNG with transparency
   - Save as `assets/icon.png`

2. **Adaptive Icon** (1024x1024px):
   - Similar to icon but optimized for Android
   - Save as `assets/adaptive-icon.png`

3. **Splash Screen** (1242x2436px recommended):
   - Portrait orientation
   - Center your logo/name
   - Background color: #1e1b4b
   - Save as `assets/splash.png`

4. **Favicon** (48x48px):
   - Small version of your icon
   - Save as `assets/favicon.png`

## Configuration

### Update app.json

Before publishing, update:
- `package`: Your unique package name
- `bundleIdentifier` (iOS): Your unique bundle ID
- `package` (Android): Your unique package name
- `version`: Current version (e.g., "1.0.0")
- `versionCode` (Android): Increment for each release

### Update GitHub URLs

In `App.js`, the songs are fetched from:
```javascript
"https://raw.githubusercontent.com/nagimbsher/Tama-music/main/songs.json"
```

Make sure this matches your GitHub repository.

## Testing

### Test on Physical Device

1. Install Expo Go app on your phone
2. Run `npx expo start`
3. Scan QR code with Expo Go

### Test Features

- [ ] Play songs
- [ ] Pause/Resume
- [ ] Next/Previous buttons
- [ ] Search functionality
- [ ] Category filtering
- [ ] Download songs
- [ ] Play downloaded songs offline
- [ ] UI responsiveness

## Building for Production

See `PLAY_STORE_GUIDE.md` for detailed instructions on:
- Building APK/AAB files
- Publishing to Play Store
- App Store publishing (iOS)

## Troubleshooting

### Audio Not Playing
- Check internet connection
- Verify song URLs are accessible
- Check device volume

### Downloads Not Working
- Ensure storage permissions are granted
- Check available storage space
- Verify song URLs are valid

### Build Errors
- Clear cache: `npx expo start -c`
- Delete node_modules and reinstall
- Check app.json for syntax errors

## Next Steps

1. Add your app assets (icons, splash screen)
2. Test all features thoroughly
3. Update songs.json with your actual songs
4. Upload songs.json and audio files to GitHub
5. Follow PLAY_STORE_GUIDE.md for publishing

## Support

For issues:
- Check Expo documentation: https://docs.expo.dev
- Check EAS documentation: https://docs.expo.dev/build/introduction/
- Review error messages in terminal

Happy coding! 🎵

