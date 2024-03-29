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

  final dashboardKey = GlobalKey<ScaffoldState>();

  final landingKey = GlobalKey();
  final aboutKey = GlobalKey();
  final projectsKey = GlobalKey();
  final testimonialsKey = GlobalKey();
  final contactKey = GlobalKey();

  final contactFormKey = GlobalKey<FormState>();

  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final subjectController = TextEditingController();
  final messageController = TextEditingController();

  final Rx<NavItem> _selectedNavItem = NavItem.hero.obs;
  NavItem get selectedNavItem => _selectedNavItem.value;
  set selectedNavItem(NavItem value) => _selectedNavItem.value = value;

  final Rx<NavItem?> _hoveredNavItem = Rx<NavItem?>(null);
  NavItem? get hoveredNavItem => _hoveredNavItem.value;
  set hoveredNavItem(NavItem? value) => _hoveredNavItem.value = value;

  final RxBool _showAllProjects = true.obs;
  bool get showAllProjects => _showAllProjects.value;
  set showAllProjects(bool value) => _showAllProjects.value = value;

  late RiveAnimationController riveController;

  List<ProjectsModel> projects = [];

  List<TestimonialModel> testimonials = [];

  late PageController testimonialController;

  @override
  void onInit() {
    super.onInit();
    changeDashState(DashState.idle);
    getProjects();
    getTestimonials();
  }

  void precache(BuildContext context) {
    precacheImage(const AssetImage(AssetConstants.dp), context);
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

  void toggleDrawer(bool shouldOpen) {
    if (shouldOpen) {
      dashboardKey.currentState!.openEndDrawer();
    } else {
      dashboardKey.currentState!.closeEndDrawer();
    }
  }

  void onHireMe() {
    onNavClicked(NavItem.contact);
  }

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
    toggleDrawer(false);
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
    showAllProjects = projects.length <= 4;
    update([Projects.updateId]);
  }

  void toggleShowAllProjects() {
    showAllProjects = !showAllProjects;
    update([Projects.updateId]);
  }

  void getTestimonials() async {
    testimonials = await _service.getTestimonials();
    testimonialController = PageController(initialPage: testimonials.length * 2);
    update([Testimonials.updateId]);
  }

  void previousTestimonial() {
    testimonialController.previousPage(
      duration: AppConstants.scrollDuration,
      curve: Curves.easeInOut,
    );
  }

  void nextTestimonial() {
    testimonialController.nextPage(
      duration: AppConstants.scrollDuration,
      curve: Curves.easeInOut,
    );
  }

  void submitContactRequest() async {
    if (!contactFormKey.currentState!.validate()) {
      return;
    }
    Utility.showLoader();
    final contact = ContactModel(
      name: nameController.text.trim(),
      email: emailController.text.trim(),
      subject: subjectController.text.trim(),
      message: messageController.text.trim(),
    );
    final requested = await _service.requestContact(contact);
    Utility.hideLoader();
    if (requested) {
      contactFormKey.currentState!.reset();
      nameController.clear();
      emailController.clear();
      subjectController.clear();
      messageController.clear();
    }
  }
}
