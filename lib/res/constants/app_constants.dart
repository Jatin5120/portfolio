import 'package:portfolio/res/res.dart';

/// `AppConstants` is a singleton class with all static variables.
///
/// It contains all constants that are to be used within the project
class AppConstants {
  const AppConstants._();

  static const String appName = 'Portfolio';

  static const Duration timeOutDuration = Duration(seconds: 60);

  static const Duration animationDuration = Duration(milliseconds: 150);

  static const double desktopLargeBreakPoint = 1920;
  static const double desktopBreakPoint = 1366;
  static const double tabletBreakPoint = 1024;
  static const double mobileBreakPoint = 612;

  static const String whatsappUrl = 'https://wa.me/+916283401360';
  static const String linkedinUrl = 'https://www.linkedin.com/in/jatin5120';
  static const String twitterUrl = 'https://www.twitter.com/jatin5120';
  static const String instagramUrl = 'https://www.instagram.com/jatin5120_';
  static const String githubUrl = 'https://www.github.com/jatin5120';

  static double get aboutMeDividerSpace => Dimens.oneHundredTwenty;
  static double get profileImageSize => Dimens.twoHundred;
  static double get aboutMeImageSpace => (aboutMeDividerSpace - profileImageSize * 0.5) * 0.5;
}
