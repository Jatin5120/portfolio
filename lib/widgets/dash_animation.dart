import 'dart:math';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/res/res.dart';
import 'package:rive/rive.dart';

class DashAnimation extends StatelessWidget {
  const DashAnimation({super.key});

  static const String updateId = 'dash-animation';

  @override
  Widget build(BuildContext context) {
    return GetBuilder<DashboardController>(
      key: const ValueKey(updateId),
      id: updateId,
      builder: (controller) => ConstrainedBox(
        constraints: BoxConstraints(
          maxHeight: min(Get.width, Get.height) * 0.4,
          minHeight: min(Get.width, Get.height) * 0.2,
        ),
        child: RiveAnimation.asset(
          AssetConstants.dashAnimation,
          controllers: [controller.riveController],
          alignment: Alignment.bottomCenter,
        ),
      ),
    );
  }
}
