import 'package:flutter/material.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/views/dashboard/dashboard.dart';
import 'package:portfolio/widgets/widgets.dart';

class DashboardView extends StatelessWidget {
  const DashboardView({super.key});

  static const String route = AppRoutes.dashboard;

  @override
  Widget build(BuildContext context) => const Scaffold(
        appBar: PreferredSize(
          preferredSize: Size.fromHeight(Dimens.navbarHeight),
          child: NavBar(),
        ),
        body: SingleChildScrollView(
          child: Column(
            children: [
              LandingView(),
              AboutView(),
            ],
          ),
        ),
      );
}
