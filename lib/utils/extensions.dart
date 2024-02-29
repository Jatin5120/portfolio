import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/models/models.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';

extension NullString on String? {
  bool get isNullOrEmpty => this == null || this!.trim().isEmpty;
}

extension ResponseExtension on ResponseModel {
  T body<T>() => jsonDecode(data)['data'] as T;

  String get message => jsonDecode(data)['data'] as String;
}

extension DoubleExtension on double {
  bool get isMobile => this < AppConstants.mobileBreakPoint;

  bool get isTablet => !isMobile && this < AppConstants.tabletBreakPoint;

  bool get isDesktopSmall => !isTablet && this < AppConstants.desktopBreakPoint;

  bool get isDesktopLarge => this >= AppConstants.desktopBreakPoint;

  bool get isDesktop => isDesktopSmall || isDesktopLarge;

  ResponsiveState get responsiveState {
    if (isMobile) {
      return ResponsiveState.mobile;
    }
    if (isTablet) {
      return ResponsiveState.tablet;
    }
    if (isDesktopSmall) {
      return ResponsiveState.desktop;
    }
    if (isDesktopLarge) {
      return ResponsiveState.desktopLarge;
    }
    return ResponsiveState.mobile;
  }
}

extension ContextExtension on BuildContext {
  ResponsiveState get responsiveState {
    final size = MediaQuery.of(this).size;
    return size.width.responsiveState;
  }

  Size get referenceSize => responsiveState.referenceSize;
}

extension ResponsiveExtension on ResponsiveState {
  double get horizontalPadding {
    switch (this) {
      case ResponsiveState.mobile:
        return Get.width * 0.06;
      case ResponsiveState.tablet:
        return Get.width * 0.08;
      case ResponsiveState.desktop:
        return Get.width * 0.09;
      case ResponsiveState.desktopLarge:
        return Get.width * 0.1;
      // return min(Get.width * 0.1, AppConstants.desktopLargeBreakPoint * 0.1);
    }
  }

  bool get isDesktop => this == ResponsiveState.desktop || this == ResponsiveState.desktopLarge;

  bool get isMobile => this == ResponsiveState.mobile;

  EdgeInsets get pagePadding => EdgeInsets.symmetric(
        horizontal: horizontalPadding,
        vertical: 24,
      );

  EdgeInsets get navbarPadding => EdgeInsets.symmetric(
        horizontal: horizontalPadding,
        vertical: 10,
      );

  Size get referenceSize {
    return switch (this) {
      ResponsiveState.mobile => const Size(360, 800),
      ResponsiveState.tablet => const Size(1024, 1366),
      ResponsiveState.desktop => const Size(1366, 768),
      ResponsiveState.desktopLarge => const Size(1920, 1200),
    };
  }
}

extension MaterialStateExtension on Set<MaterialState> {
  bool get isDisabled => any((e) => [MaterialState.disabled].contains(e));

  bool get isClicked => any((e) => [MaterialState.pressed, MaterialState.selected].contains(e));

  bool get isHovered => any((e) => [MaterialState.hovered].contains(e));
}

extension StyleExtension on TextStyle {
  TextStyle get withTitleColor {
    return copyWith(
      color: AppColors.titleDark,
    );
  }

  TextStyle get withBodyColor {
    return copyWith(
      color: AppColors.bodyDark,
    );
  }
}

extension IterableExtension on Iterable<Widget> {
  Iterable<Widget> separated(Widget separator) {
    var output = <Widget>[];
    for (var i = 0; i < (length * 2 - 1); i++) {
      final insert = i % 2 == 0;
      if (insert) {
        output.add(elementAt(i ~/ 2));
      } else {
        output.add(separator);
      }
    }
    return output;
  }
}

extension NavigationExtension on NavItem {
  GlobalKey get sectionKey {
    final controller = Get.find<DashboardController>();
    switch (this) {
      case NavItem.hero:
        return controller.landingKey;
      case NavItem.work:
        return controller.aboutKey;
      case NavItem.about:
        return controller.aboutKey;
      case NavItem.contact:
        return controller.contactKey;
    }
  }
}
