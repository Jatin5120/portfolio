import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/widgets/widgets.dart';

class LinkedinButton extends StatelessWidget {
  const LinkedinButton({super.key});

  @override
  Widget build(BuildContext context) {
    return AppButton(
      label: 'LinkedIn',
      onTap: () => Get.find<DashboardController>().onSocialTap(SocialItem.linkedin),
    );
  }
}
