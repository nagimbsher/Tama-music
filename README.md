# Tama Music 🎵

A beautiful, modern music player app for Tama traditional music built with React Native and Expo.

## Features

✨ **Modern UI Design**
- Beautiful dark theme interface
- Smooth animations and transitions
- Responsive layout for all screen sizes

🎮 **Advanced Audio Player**
- Play/Pause controls
- Next/Previous song navigation
- Auto-play next song when current finishes
- Visual feedback for currently playing song

📥 **Offline Mode**
- Download songs to device storage
- Play downloaded songs without internet
- Download status indicators

🏷️ **Categories & Filtering**
- Filter songs by category
- Horizontal scrolling category chips
- Quick category switching

🔍 **Search Functionality**
- Real-time search as you type
- Search by song title, artist, or category
- Clear search with one tap

🎨 **Splash Screen & App Icon**
- Customizable splash screen
- App icon configuration
- Ready for Play Store publishing

## Screenshots

*Add screenshots of your app here*

## Installation

1. Clone the repository:
```bash
git clone https://github.com/nagimbsher/Tama-music.git
cd Tama-music
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your device:
   - Install Expo Go app on your phone
   - Scan the QR code
   - Or press `i` for iOS simulator / `a` for Android emulator

## Project Structure

```
Tama music/
├── App.js                  # Main application component
├── app.json                # Expo configuration
├── songs.json              # Song data (also on GitHub)
├── assets/                 # App icons and splash screens
│   ├── icon.png
│   ├── adaptive-icon.png
│   ├── splash.png
│   └── favicon.png
├── PLAY_STORE_GUIDE.md     # Complete Play Store publishing guide
├── SETUP_GUIDE.md          # Setup and development guide
└── README.md               # This file
```

## Configuration

### Songs Data

Songs are loaded from `songs.json`. The app fetches this file from GitHub:
```
https://raw.githubusercontent.com/nagimbsher/Tama-music/main/songs.json
```

To add songs:
1. Edit `songs.json` locally
2. Push to GitHub
3. The app will automatically fetch the updated list

### App Configuration

Edit `app.json` to customize:
- App name and version
- Package identifiers
- Splash screen and icons
- Permissions

## Building for Production

See [PLAY_STORE_GUIDE.md](./PLAY_STORE_GUIDE.md) for detailed instructions on:
- Building APK/AAB files using EAS Build
- Publishing to Google Play Store
- App Store publishing (iOS)

## Development

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for:
- Development setup
- Testing instructions
- Troubleshooting
- Feature documentation

## Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **expo-av** - Audio playback
- **expo-file-system** - File downloads and storage
- **axios** - HTTP requests
- **@expo/vector-icons** - Icon library

## Requirements

- Node.js 14+ 
- npm or yarn
- Expo CLI
- Expo Go app (for testing on physical device)
- iOS Simulator or Android Emulator (for testing on simulator)

## Permissions

The app requires the following permissions:
- **Internet**: To fetch song list and stream audio
- **Storage**: To download songs for offline listening

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
- Check the [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- Review [PLAY_STORE_GUIDE.md](./PLAY_STORE_GUIDE.md) for publishing help
- Open an issue on GitHub

## Author

Created by nagimbsher

---

**Note**: Make sure to add your app assets (icons, splash screen) to the `assets/` folder before building for production. See `assets/README.md` for details.
