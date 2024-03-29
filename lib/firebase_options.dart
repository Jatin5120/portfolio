// File generated by FlutterFire CLI.
// ignore_for_file: lines_longer_than_80_chars, avoid_classes_with_only_static_members
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for macos - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.windows:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for windows - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyACSp3Mn-WjCe7Hdm9UcjmR4gSh0_Nfp3U',
    appId: '1:333046234443:web:d8b31257881a21d657bcce',
    messagingSenderId: '333046234443',
    projectId: 'portfolio-5120',
    authDomain: 'portfolio-5120.firebaseapp.com',
    storageBucket: 'portfolio-5120.appspot.com',
    measurementId: 'G-F8VEL6MSY2',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyDrUz5bpynprmb6AZBhIfVaDbvF0Gojczc',
    appId: '1:333046234443:android:8144535cefe96aae57bcce',
    messagingSenderId: '333046234443',
    projectId: 'portfolio-5120',
    storageBucket: 'portfolio-5120.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyBuXSq--kYYI7Zc9BjlecHBcuhwjFjMWI0',
    appId: '1:333046234443:ios:8af232752c47a94f57bcce',
    messagingSenderId: '333046234443',
    projectId: 'portfolio-5120',
    storageBucket: 'portfolio-5120.appspot.com',
    iosBundleId: 'com.jatin5120.portfolio',
  );
}
