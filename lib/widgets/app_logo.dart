import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:portfolio/res/res.dart';

class AppLogo extends StatelessWidget {
  const AppLogo({super.key}) : _short = false;

  const AppLogo.short({super.key}) : _short = true;

  final bool _short;

  @override
  Widget build(BuildContext context) {
    return SvgPicture.asset(
      _short ? AssetConstants.logoShort : AssetConstants.logoDark,
    );
  }
}
