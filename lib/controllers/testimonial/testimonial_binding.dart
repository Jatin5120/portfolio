import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/services/services.dart';

class TestimonialBinding implements Bindings {
  @override
  void dependencies() {
    Get.lazyPut<TestimonialController>(
      () => TestimonialController(
        const TestimonialService(),
      ),
    );
  }
}
