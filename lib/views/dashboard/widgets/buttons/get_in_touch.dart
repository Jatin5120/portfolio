import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/widgets/widgets.dart';

class GetInTouchButton extends StatelessWidget {
  const GetInTouchButton({super.key});

  @override
  Widget build(BuildContext context) {
    return AppButton.secondary(
      label: 'Get in touch',
      onHover: Get.find<DashboardController>().lookUpOnHover,
      onTap: Get.find<DashboardController>().onGetInTouch,
    );
  }
}

class GetInTouchButtonFAB extends StatelessWidget {
  const GetInTouchButtonFAB({super.key});

  @override
  Widget build(BuildContext context) {
    return FloatingActionButton.extended(
      backgroundColor: AppColors.cardDark,
      foregroundColor: AppColors.primary,
      onPressed: Get.find<DashboardController>().onGetInTouch,
      label: const Text('Get in touch'),
    );
  }
}
