import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/widgets/widgets.dart';

class AppLogo extends StatelessWidget {
  const AppLogo({super.key}) : _short = false;

  const AppLogo.short({super.key}) : _short = true;

  final bool _short;

  @override
  Widget build(BuildContext context) {
    return TapHandler(
      onTap: () => Get.find<DashboardController>().onNavClicked(NavItem.hero),
      showSplash: false,
      child: SvgPicture.asset(
        _short ? AssetConstants.logoShort : AssetConstants.logoDark,
      ),
    );
  }
}
