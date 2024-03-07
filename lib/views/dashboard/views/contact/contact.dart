import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
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

class Contact extends StatelessWidget {
  const Contact({super.key});

  @override
  Widget build(BuildContext context) {
    return ResponsiveWrapper(
      key: Get.find<DashboardController>().contactKey,
      mobile: const _ContactMobile(),
      tablet: const _ContactTablet(),
      desktop: const _ContactDesktop(),
      desktopLarge: const _ContactDesktopLarge(),
    );
  }
}
