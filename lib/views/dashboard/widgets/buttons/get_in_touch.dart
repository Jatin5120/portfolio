import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
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
