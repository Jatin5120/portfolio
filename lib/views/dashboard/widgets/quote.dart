import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/widgets/widgets.dart';

class Quote extends StatelessWidget {
  const Quote({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.end,
      mainAxisAlignment: MainAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        AppText(
          '“Avoid the \'refactor later\' trap; act now.”',
          style: context.textTheme.titleLarge?.withTitleColor,
        ),
        AppText(
          '- Jatin',
          style: context.textTheme.titleMedium?.withBodyColor,
        ),
      ],
    );
  }
}
