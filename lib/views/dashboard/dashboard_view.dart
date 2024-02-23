import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/res/res.dart';
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
          Get.find<DashboardController>().precache(context);
        },
        builder: (context) {
          return const Scaffold(
            appBar: PreferredSize(
              preferredSize: Size.fromHeight(Dimens.navbarHeight),
              child: NavBar(),
            ),
            body: SingleChildScrollView(
              child: Column(
                children: [
                  LandingView(),
                  AboutView(),
                  ContactView(),
                ],
              ),
            ),
          );
        },
      );
}
