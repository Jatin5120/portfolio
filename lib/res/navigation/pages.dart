import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/views/views.dart';

class AppPages {
  const AppPages._();

  static const String initial = AppRoutes.dashboard;

  static GetPage get dashboard => GetPage<DashboardView>(
        name: DashboardView.route,
        page: DashboardView.new,
        binding: DashboardBinding(),
      );

  static List<GetPage> pages = [
    dashboard,
    GetPage<TestimonialView>(
      name: TestimonialView.route,
      page: TestimonialView.new,
      bindings: [
        DashboardBinding(),
        TestimonialBinding(),
      ],
    ),
  ];
}
