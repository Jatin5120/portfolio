import 'package:flutter/widgets.dart';
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

  static List<NavItem> get visible => [about, work, contact];
}

enum SocialItem {
  whatsapp(
    'Whatsapp',
    AssetConstants.whatsapp,
    AppConstants.whatsappUrl,
    AppColors.whatsapp,
  ),
  linkedin(
    'LinkedIn',
    AssetConstants.linkedin,
    AppConstants.linkedinUrl,
    AppColors.linkedin,
  ),
  twitter(
    'X (Twitter)',
    AssetConstants.twitter,
    AppConstants.twitterUrl,
    AppColors.twitter,
  ),
  instagram(
    'Instagram',
    AssetConstants.instagram,
    AppConstants.instagramUrl,
    AppColors.instagram,
  ),
  github(
    'GitHub',
    AssetConstants.github,
    AppConstants.githubUrl,
    AppColors.github,
  ),
  medium(
    'Medium',
    AssetConstants.medium,
    AppConstants.mediumUrl,
    AppColors.medium,
  );

  const SocialItem(
    this.label,
    this.icon,
    this.url,
    this.color,
  );
  final String label;
  final String icon;
  final String url;
  final Color color;
}

enum DashState {
  idle,
  lookUp,
  slowDance;
}

enum SkillItem {
  flutter('Flutter'),
  dart('Dart'),
  firebase('Firebase'),
  nodeJs('NodeJS');

  const SkillItem(this.label);
  final String label;
}

enum ContactItem {
  email(
    StringConstants.emailTitle,
    StringConstants.emailContent,
    AppConstants.emailUrl,
  ),
  whatsapp(
    StringConstants.whatsappTitle,
    StringConstants.whatsappContent,
    AppConstants.whatsappUrl,
  ),
  linkedin(
    StringConstants.linkedinTitle,
    StringConstants.linkedinContent,
    AppConstants.linkedinUrl,
  );

  const ContactItem(this.title, this.content, this.url);
  final String title;
  final String content;
  final String url;
}

enum LinkType {
  playstore(1),
  appstore(2),
  web(3);

  factory LinkType.fromValue(int data) =>
      <int, LinkType>{
        LinkType.playstore.value: LinkType.playstore,
        LinkType.appstore.value: LinkType.appstore,
        LinkType.web.value: LinkType.web,
      }[data] ??
      LinkType.web;

  const LinkType(this.value);
  final int value;
}

enum TestimonialStatus {
  pending,
  approved,
  rejected;

  factory TestimonialStatus.fromName(String data) =>
      <String, TestimonialStatus>{
        TestimonialStatus.pending.name: TestimonialStatus.pending,
        TestimonialStatus.approved.name: TestimonialStatus.approved,
        TestimonialStatus.rejected.name: TestimonialStatus.rejected,
      }[data] ??
      TestimonialStatus.pending;
}

enum AvatarItem {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10;

  factory AvatarItem.fromIndex(int index) {
    if (index > AvatarItem.values.length - 1) {
      AvatarItem.values.first;
    }
    return AvatarItem.values[index];
  }

  String get imagePath => '${AssetConstants.avatarFolder}/avatar_${index + 1}.png';
}
