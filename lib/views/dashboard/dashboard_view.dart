import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/views/dashboard/dashboard.dart';
import 'package:portfolio/widgets/widgets.dart';

class DashboardView extends StatelessWidget {
  const DashboardView({super.key});

  static const String route = AppRoutes.dashboard;

  static const String updateId = 'dashboard-view';

  @override
  Widget build(BuildContext context) => GetBuilder<DashboardController>(
        id: updateId,
        initState: (_) {
          Utility.setWebTitle('Jatin | Flutter Developer');
          Get.find<DashboardController>().precache(context);
        },
        builder: (controller) {
          return Scaffold(
            key: controller.dashboardKey,
            appBar: const PreferredSize(
              preferredSize: Size.fromHeight(Dimens.navbarHeight),
              child: NavBar(),
            ),
            endDrawer: context.responsiveState.isMobile ? const NavDrawer() : null,
            floatingActionButton: context.responsiveState.isMobile ? const GetInTouchButtonFAB() : null,
            body: SingleChildScrollView(
              child: Column(
                children: [
                  const Landing(),
                  const About(),
                  const Projects(),
                  const Testimonials(),
                  const Contact(),
                  if (context.responsiveState.isMobile) ...[
                    const SizedBox(height: 50),
                  ],
                ],
              ),
            ),
          );
        },
      );
}
