import 'dart:math';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/views/views.dart';
import 'package:portfolio/widgets/widgets.dart';

part 'desktop.dart';
part 'desktop_large.dart';
part 'mobile.dart';
part 'tablet.dart';

class About extends StatelessWidget {
  const About({super.key});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Positioned(
          top: AppConstants.aboutMeDividerSpace,
          width: context.width,
          child: const Divider(
            color: AppColors.primary,
            height: 1,
            thickness: 1,
          ),
        ),
        ResponsiveWrapper(
          key: Get.find<DashboardController>().aboutKey,
          mobile: const _AboutMobile(),
          tablet: const _AboutTablet(),
          desktop: const _AboutDesktop(),
          desktopLarge: const _AboutDesktopLarge(),
        ),
      ],
    );
  }
}
