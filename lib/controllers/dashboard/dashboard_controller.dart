import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/widgets/widgets.dart';
import 'package:rive/rive.dart';

class DashboardController extends GetxController {
  final Rx<NavItem> _selectedNavItem = NavItem.hero.obs;
  NavItem get selectedNavItem => _selectedNavItem.value;
  set selectedNavItem(NavItem value) => _selectedNavItem.value = value;

  final Rx<NavItem?> _hoveredNavItem = Rx<NavItem?>(null);
  NavItem? get hoveredNavItem => _hoveredNavItem.value;
  set hoveredNavItem(NavItem? value) => _hoveredNavItem.value = value;

  late RiveAnimationController riveController;

  @override
  void onInit() {
    super.onInit();
    changeDashState(DashState.idle);
  }

  void precache(BuildContext context) {
    precacheImage(const AssetImage(AssetConstants.cartoonDp), context);
    precacheImage(const AssetImage(AssetConstants.cartoonFull), context);
    precacheImage(const AssetImage(AssetConstants.contact), context);
  }

  void lookUpOnHover(bool isHovering) {
    if (isHovering) {
      changeDashState(DashState.lookUp);
    } else {
      changeDashState(DashState.idle);
    }
    update([DashAnimation.updateId]);
  }

  void danceOnHover(bool isHovering) {
    if (isHovering) {
      changeDashState(DashState.slowDance);
    } else {
      changeDashState(DashState.idle);
    }
    update([DashAnimation.updateId]);
  }

  void onHireMe() {}

  void onGetInTouch() {}

  void onMyWork() {}

  void changeDashState(DashState state) {
    riveController = SimpleAnimation(state.name);
  }

  void onSocialTap(SocialItem item) {
    Utility.launchURL(item.url);
  }

  void onContactTap(ContactItem item) {
    Utility.launchURL(item.url);
  }
}
