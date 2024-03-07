import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/widgets/widgets.dart';

class AppLoader extends StatelessWidget {
  const AppLoader({
    super.key,
    this.message,
  });

  final String? message;

  @override
  Widget build(BuildContext context) => Center(
        child: Card(
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                const CircularProgressIndicator(
                  color: AppColors.primary,
                ),
                if (message != null && message!.trim().isNotEmpty) ...[
                  const SizedBox(height: 16),
                  AppText(
                    message!,
                    style: context.textTheme.labelLarge?.withTitleColor,
                    textAlign: TextAlign.center,
                  ),
                ],
              ],
            ),
          ),
        ),
      );
}
