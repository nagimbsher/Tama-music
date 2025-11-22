# Quick Start - Tama Music

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development
```bash
npx expo start
```

### 3. Run on Device
- Install **Expo Go** app on your phone
- Scan the QR code shown in terminal
- Your app will load!

## 📱 Features Checklist

- ✅ Modern dark theme UI
- ✅ Play/Pause audio controls
- ✅ Next/Previous song buttons
- ✅ Download songs for offline
- ✅ Search by title/artist/category
- ✅ Filter by categories
- ✅ Auto-play next song
- ✅ Visual player at bottom

## 🎨 Before Publishing

1. **Add App Assets** (see `assets/README.md`):
   - `icon.png` (1024x1024px)
   - `adaptive-icon.png` (1024x1024px)
   - `splash.png` (1242x2436px)
   - `favicon.png` (48x48px)

2. **Update Configuration** in `app.json`:
   - Change package names to your own
   - Update version numbers

3. **Upload Songs**:
   - Add audio files to GitHub `songs/` folder
   - Update `songs.json` with your songs

## 📚 Full Guides

- **Setup & Development**: See `SETUP_GUIDE.md`
- **Play Store Publishing**: See `PLAY_STORE_GUIDE.md`
- **Assets Creation**: See `assets/README.md`

## 🐛 Common Issues

**Audio not playing?**
- Check internet connection
- Verify song URLs in `songs.json` are accessible

**Build errors?**
- Run: `npx expo start -c` (clear cache)
- Delete `node_modules` and run `npm install` again

**Can't download?**
- Check storage permissions
- Ensure device has storage space

## 📞 Need Help?

Check the detailed guides:
- `SETUP_GUIDE.md` - Development help
- `PLAY_STORE_GUIDE.md` - Publishing help

Happy coding! 🎵

