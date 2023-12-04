import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'postingv2',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
