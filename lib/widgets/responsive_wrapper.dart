import 'package:flutter/material.dart';
import 'package:portfolio/utils/utils.dart';

class ResponsiveWrapper extends StatelessWidget {
  const ResponsiveWrapper({
    super.key,
    required this.mobile,
    this.tablet,
    this.desktop,
    this.desktopLarge,
  });

  final Widget mobile;
  final Widget? tablet;
  final Widget? desktop;
  final Widget? desktopLarge;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth.isMobile) {
          return mobile;
        }
        if (constraints.maxWidth.isTablet) {
          return tablet ?? mobile;
        }
        if (constraints.maxWidth.isDesktopSmall) {
          return desktop ?? tablet ?? mobile;
        }
        if (constraints.maxWidth.isDesktopLarge) {
          return desktopLarge ?? desktop ?? tablet ?? mobile;
        }
        return mobile;
      },
    );
  }
}
