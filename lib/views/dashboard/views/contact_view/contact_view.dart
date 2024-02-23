import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/views/views.dart';
import 'package:portfolio/widgets/widgets.dart';

part 'desktop.dart';
part 'desktop_large.dart';
part 'mobile.dart';
part 'tablet.dart';

class ContactView extends StatelessWidget {
  const ContactView({super.key});

  @override
  Widget build(BuildContext context) {
    return const ResponsiveWrapper(
      mobile: _ContactViewMobile(),
      tablet: _ContactViewTablet(),
      desktop: _ContactViewDesktop(),
      desktopLarge: _ContactViewDesktopLarge(),
    );
  }
}
