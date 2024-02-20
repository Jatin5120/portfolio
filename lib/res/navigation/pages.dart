import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/views/views.dart';

class AppPages {
  const AppPages._();

  static const String initial = AppRoutes.dashboard;

  static List<GetPage> pages = [
    GetPage<DashboardView>(
      name: DashboardView.route,
      page: DashboardView.new,
      bindings: [
        DashboardBinding(),
      ],
    ),
    GetPage<TestimonialView>(
      name: TestimonialView.route,
      page: TestimonialView.new,
      bindings: [
        TestimonialBinding(),
      ],
    ),
  ];
}
