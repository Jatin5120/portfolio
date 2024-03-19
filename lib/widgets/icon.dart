import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class AppIcon extends StatelessWidget {
  const AppIcon(
    this.path, {
    super.key,
    this.color,
    this.network = false,
    this.size,
  });

  final String path;
  final Color? color;
  final bool network;
  final double? size;

  @override
  Widget build(BuildContext context) {
    if (network) {
      return SvgPicture.network(
        path,
        height: size,
        width: size,
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
      height: size,
      width: size,
      colorFilter: color != null
          ? ColorFilter.mode(
              color!,
              BlendMode.srcIn,
            )
          : null,
    );
  }
}
