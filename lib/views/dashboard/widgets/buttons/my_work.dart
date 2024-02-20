import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/widgets/widgets.dart';

class MyWorkButton extends StatelessWidget {
  const MyWorkButton({super.key});

  @override
  Widget build(BuildContext context) {
    return AppButton.outlined(
      label: 'My Work',
      onTap: Get.find<DashboardController>().onMyWork,
    );
  }
}
