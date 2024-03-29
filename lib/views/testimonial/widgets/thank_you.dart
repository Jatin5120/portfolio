import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/widgets/widgets.dart';

class ThankYouWidget extends StatelessWidget {
  const ThankYouWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(
            Icons.check_circle_rounded,
            color: AppColors.success,
            size: 40,
          ),
          const SizedBox(height: 16),
          AppText(
            StringConstants.thankYou,
            style: context.textTheme.titleLarge?.withTitleColor,
            textAlign: TextAlign.center,
          ),
          AppText(
            StringConstants.testimonialWillBeVisible,
            style: context.textTheme.bodyLarge?.withTitleColor,
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
