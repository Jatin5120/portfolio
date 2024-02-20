import 'package:portfolio/res/res.dart';

enum MessageType {
  error,
  success,
  information;
}

enum ResponsiveState {
  mobile,
  tablet,
  desktop,
  desktopLarge;
}

enum ButtonType {
  primary,
  secondary,
  outlined;
}

enum NavItem {
  hero(''),
  work('Work'),
  about('About'),
  contact('Contact');

  const NavItem(this.label);
  final String label;

  static List<NavItem> get visible => [work, about, contact];
}

enum SocialItem {
  whatsapp('Whatsapp', AssetConstants.whatsapp, AppConstants.whatsappUrl),
  linkedin('LinkedIn', AssetConstants.linkedin, AppConstants.linkedinUrl),
  twitter('X (Twitter)', AssetConstants.twitter, AppConstants.twitterUrl),
  instagram('Instagram', AssetConstants.instagram, AppConstants.instagramUrl),
  github('GitHub', AssetConstants.github, AppConstants.githubUrl);

  const SocialItem(this.label, this.icon, this.url);
  final String label;
  final String icon;
  final String url;
}

enum DashState {
  idle,
  lookUp,
  slowDance;
}
