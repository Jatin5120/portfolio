import 'dart:async';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/models/models.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/services/services.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/views/dashboard/views/views.dart';
import 'package:portfolio/widgets/widgets.dart';
import 'package:rive/rive.dart';

class DashboardController extends GetxController {
  DashboardController(this._service);
  final DashboardService _service;

  final landingKey = GlobalKey();
  final aboutKey = GlobalKey();
  final projectsKey = GlobalKey();
  final testimonialsKey = GlobalKey();
  final contactKey = GlobalKey();

  final Rx<NavItem> _selectedNavItem = NavItem.hero.obs;
  NavItem get selectedNavItem => _selectedNavItem.value;
  set selectedNavItem(NavItem value) => _selectedNavItem.value = value;

  final Rx<NavItem?> _hoveredNavItem = Rx<NavItem?>(null);
  NavItem? get hoveredNavItem => _hoveredNavItem.value;
  set hoveredNavItem(NavItem? value) => _hoveredNavItem.value = value;

  late RiveAnimationController riveController;

  List<ProjectsModel> projects = [];

  List<TestimonialModel> testimonials = [];

  @override
  void onInit() {
    super.onInit();
    changeDashState(DashState.idle);
    getProjects();
    getTestimonials();
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

  void onGetInTouch() {
    onNavClicked(NavItem.contact);
  }

  void onMyWork() {
    onNavClicked(NavItem.work);
  }

  void onNavClicked(NavItem item) {
    if (Get.currentRoute != AppRoutes.dashboard) {
      unawaited(Get.toNamed(AppRoutes.dashboard));
      WidgetsBinding.instance.addPostFrameCallback((_) {
        scrollToSection(item);
      });
    } else {
      scrollToSection(item);
    }
  }

  void scrollToSection(NavItem item) {
    if (item.sectionKey.currentContext == null) {
      return;
    }
    selectedNavItem = item;
    Scrollable.ensureVisible(
      item.sectionKey.currentContext!,
      duration: AppConstants.scrollDuration,
      curve: Curves.easeInOutCubic,
    );
  }

  void changeDashState(DashState state) {
    riveController = SimpleAnimation(state.name);
  }

  void onSocialTap(SocialItem item) {
    Utility.launchURL(item.url);
  }

  void onContactTap(ContactItem item) {
    Utility.launchURL(item.url);
  }

  void getProjects() async {
    projects = await _service.getProjects();
    update([Projects.updateId]);
  }

  void getTestimonials() async {
    testimonials = await _service.getTestimonials();
    update([Testimonials.updateId]);
  }
}
