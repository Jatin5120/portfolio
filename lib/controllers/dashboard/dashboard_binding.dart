import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';

class DashboardBinding implements Bindings {
  @override
  void dependencies() {
    Get.put<DashboardController>(
      DashboardController(),
    );
  }
}
