# Play Store Publishing Guide for Tama Music

This guide will walk you through publishing your Tama Music app to the Google Play Store.

## Prerequisites

1. **Google Play Developer Account**
   - Sign up at: https://play.google.com/console/signup
   - One-time registration fee: $25 USD
   - Valid for lifetime

2. **EAS Build Account** (Expo Application Services)
   - Sign up at: https://expo.dev
   - Free tier available

3. **App Assets Ready**
   - App icon (1024x1024px)
   - Feature graphic (1024x500px)
   - Screenshots (at least 2, recommended: 5-8)
   - Privacy policy URL (required)

## Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

## Step 2: Login to EAS

```bash
eas login
```

## Step 3: Configure EAS Build

```bash
eas build:configure
```

This will create an `eas.json` file in your project.

## Step 4: Update app.json

Make sure your `app.json` has the correct configuration:

- **package**: `com.nagimbsher.tamamusic` (Android package name)
- **version**: `1.0.0` (version number)
- **versionCode**: `1` (Android version code, increment for each release)

## Step 5: Build Android APK/AAB

### For Testing (APK):
```bash
eas build --platform android --profile preview
```

### For Production (AAB - required for Play Store):
```bash
eas build --platform android --profile production
```

**Note**: The first build may take 20-30 minutes. Subsequent builds are faster.

## Step 6: Download and Test Your Build

1. Once the build completes, download it from the Expo dashboard
2. Install on a test device
3. Test all features thoroughly

## Step 7: Prepare Play Store Listing

### Required Information:

1. **App Name**: Tama Music (or your preferred name)

2. **Short Description** (80 characters max):
   ```
   Discover and enjoy traditional Tama music. Download songs for offline listening.
   ```

3. **Full Description** (4000 characters max):
   ```
   Tama Music is your gateway to authentic Tama traditional music. 
   
   Features:
   • Browse and play traditional Tama songs
   • Download songs for offline listening
   • Search by title, artist, or category
   • Beautiful, modern interface
   • Easy-to-use music player with play, pause, next, and previous controls
   • Category filtering
   
   Whether you're looking for traditional songs, kids' music, or cultural tunes, 
   Tama Music brings the rich musical heritage of the Tama people to your device.
   
   Download now and start your musical journey!
   ```

4. **App Icon**: 512x512px PNG (high-res icon)

5. **Feature Graphic**: 1024x500px PNG
   - This appears at the top of your Play Store listing
   - Should be visually appealing and represent your app

6. **Screenshots** (Required: at least 2, Recommended: 5-8)
   - Phone screenshots: 16:9 or 9:16 aspect ratio
   - Minimum: 320px, Maximum: 3840px
   - Recommended: 1080x1920px or 1440x2560px
   - Show key features: song list, player, categories, search

7. **Privacy Policy URL** (Required)
   - Create a privacy policy page
   - Host it on GitHub Pages, your website, or a free hosting service
   - Must be publicly accessible

8. **Content Rating**: Complete the questionnaire in Play Console

9. **Target Audience**: Select appropriate age groups

10. **Category**: Music & Audio

## Step 8: Create Privacy Policy

Create a `PRIVACY_POLICY.md` file or web page with:

```markdown
# Privacy Policy for Tama Music

Last updated: [Date]

## Data Collection
Tama Music does not collect, store, or transmit any personal user data.

## Audio Files
Audio files are streamed from publicly available sources. Downloaded files are stored locally on your device.

## Permissions
- Internet: Required to fetch song list and stream audio
- Storage: Required to download songs for offline listening

## Contact
For questions about this privacy policy, contact: [Your Email]
```

Host this on:
- GitHub Pages (free)
- Your website
- Google Sites (free)

## Step 9: Upload to Play Console

1. Go to https://play.google.com/console
2. Click "Create app"
3. Fill in app details:
   - App name: Tama Music
   - Default language: English
   - App or game: App
   - Free or paid: Free
   - Declarations: Complete all required sections

4. **Store Listing**:
   - Upload all required assets
   - Add descriptions
   - Add screenshots
   - Add feature graphic
   - Set privacy policy URL

5. **Content Rating**: Complete questionnaire

6. **Pricing & Distribution**:
   - Set as free
   - Select countries for distribution
   - Accept content guidelines

## Step 10: Create Release

1. Go to "Production" → "Create new release"
2. Upload your AAB file (from EAS build)
3. Add release notes:
   ```
   Initial release of Tama Music
   - Browse and play Tama traditional songs
   - Download songs for offline listening
   - Search and filter by category
   - Modern, intuitive interface
   ```
4. Review and roll out

## Step 11: Submit for Review

1. Review all sections (green checkmarks)
2. Click "Submit for review"
3. Review typically takes 1-3 days
4. You'll receive email notifications about status

## Step 12: After Approval

- Your app will be live on Play Store
- Monitor reviews and ratings
- Respond to user feedback
- Plan updates and new features

## Updating Your App

1. Update version in `app.json`:
   ```json
   "version": "1.0.1",
   "versionCode": 2
   ```

2. Build new version:
   ```bash
   eas build --platform android --profile production
   ```

3. Upload new AAB to Play Console
4. Add release notes
5. Submit for review

## Tips for Success

1. **Test Thoroughly**: Test on multiple devices and Android versions
2. **Good Screenshots**: Show your app's best features
3. **Clear Description**: Explain what your app does clearly
4. **Regular Updates**: Keep your app updated with new features
5. **Respond to Reviews**: Engage with users who leave reviews
6. **ASO (App Store Optimization)**:
   - Use relevant keywords in description
   - Get positive reviews
   - Regular updates improve ranking

## Common Issues

### Build Fails
- Check `app.json` for errors
- Ensure all dependencies are compatible
- Check EAS build logs

### Rejected by Play Store
- Ensure privacy policy is accessible
- Complete all required sections
- Follow content guidelines
- Address any policy violations

### App Crashes
- Test on physical devices
- Check error logs
- Test with different Android versions

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Play Store Policies](https://play.google.com/about/developer-content-policy/)

## Support

If you encounter issues:
1. Check Expo documentation
2. Check EAS build logs
3. Review Play Console messages
4. Contact Expo support if needed

Good luck with your app launch! 🚀

