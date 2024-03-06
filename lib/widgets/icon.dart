import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class AppIcon extends StatelessWidget {
  const AppIcon(
    this.path, {
    super.key,
    this.color,
    this.network = false,
  });

  final String path;
  final Color? color;
  final bool network;

  @override
  Widget build(BuildContext context) {
    if (network) {
      return SvgPicture.network(
        path,
        colorFilter: color != null
            ? ColorFilter.mode(
                color!,
                BlendMode.srcIn,
              )
            : null,
      );
    }
    return SvgPicture.asset(
      path,
      colorFilter: color != null
          ? ColorFilter.mode(
              color!,
              BlendMode.srcIn,
            )
          : null,
    );
  }
}
