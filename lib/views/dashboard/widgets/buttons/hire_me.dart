import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/widgets/widgets.dart';

class HireMeButton extends StatelessWidget {
  const HireMeButton({super.key});

  @override
  Widget build(BuildContext context) {
    return AppButton(
      label: 'Hire Me',
      onHover: Get.find<DashboardController>().danceOnHover,
      onTap: Get.find<DashboardController>().onHireMe,
    );
  }
}
