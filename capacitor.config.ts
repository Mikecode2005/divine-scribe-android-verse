
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.584a169f4b9d4bc1965c30ebe5ee755f',
  appName: 'divine-scribe-android-verse',
  webDir: 'dist',
  server: {
    url: 'https://584a169f-4b9d-4bc1-965c-30ebe5ee755f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1e3a8a',
      showSpinner: false
    }
  }
};

export default config;
