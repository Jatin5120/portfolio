import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
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

  EdgeInsets get pagePadding => EdgeInsets.symmetric(
        horizontal: horizontalPadding,
        vertical: 24,
      );

  EdgeInsets get navbarPadding => EdgeInsets.symmetric(
        horizontal: horizontalPadding,
        vertical: 10,
      );
}

extension MaterialStateExtension on Set<MaterialState> {
  bool get isDisabled => any((e) => [MaterialState.disabled].contains(e));
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
