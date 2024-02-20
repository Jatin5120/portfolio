import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';

class TestimonialBinding implements Bindings {
  @override
  void dependencies() {
    Get.lazyPut<TestimonialController>(
      TestimonialController.new,
    );
  }
}
