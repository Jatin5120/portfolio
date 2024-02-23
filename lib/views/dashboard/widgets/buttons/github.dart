import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/widgets/widgets.dart';

class GithubButton extends StatelessWidget {
  const GithubButton({super.key});

  @override
  Widget build(BuildContext context) {
    return AppButton.outlined(
      label: 'Github',
      onTap: () => Get.find<DashboardController>().onSocialTap(SocialItem.github),
    );
  }
}
