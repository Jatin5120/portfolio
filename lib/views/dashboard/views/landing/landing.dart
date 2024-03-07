import 'dart:math';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/views/views.dart';
import 'package:portfolio/widgets/widgets.dart';

part 'desktop.dart';
part 'desktop_large.dart';
part 'mobile.dart';
part 'tablet.dart';

class Landing extends StatelessWidget {
  const Landing({super.key});

  @override
  Widget build(BuildContext context) {
    return ResponsiveWrapper(
      key: Get.find<DashboardController>().landingKey,
      mobile: const _LandingMobile(),
      tablet: const _LandingTablet(),
      desktop: const _LandingDesktop(),
      desktopLarge: const _LandingDesktopLarge(),
    );
  }
}
