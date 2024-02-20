import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/widgets/widgets.dart';

class AppText extends StatelessWidget {
  const AppText(
    this.data, {
    super.key,
    this.style,
    this.textAlign,
    this.isSelectable = true,
    this.softWrap,
    this.overflow,
  });

  final String data;
  final TextStyle? style;
  final bool isSelectable;
  final TextAlign? textAlign;
  final bool? softWrap;
  final TextOverflow? overflow;

  @override
  Widget build(BuildContext context) => isSelectable
      ? SelectableText(
          data,
          style: style,
          textAlign: textAlign,
          semanticsLabel: data,
          selectionControls: kIsWeb ? DesktopTextSelectionControls() : MaterialTextSelectionControls(),
        )
      : Text(
          data,
          style: style,
          textAlign: textAlign,
          semanticsLabel: data,
          softWrap: softWrap,
          overflow: overflow,
        );
}

class LinkText extends StatelessWidget {
  const LinkText(
    this.label, {
    super.key,
    this.onTap,
    this.style,
    this.color,
  });

  final VoidCallback? onTap;
  final String label;
  final TextStyle? style;
  final Color? color;

  @override
  Widget build(BuildContext context) => TapHandler(
        onTap: onTap,
        child: AppText(
          label,
          isSelectable: false,
          style: (style ?? context.textTheme.bodyMedium)?.copyWith(
            color: color ?? AppColors.primary,
            decoration: TextDecoration.underline,
            decorationColor: color ?? AppColors.primary,
          ),
        ),
      );
}
