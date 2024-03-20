import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/views/views.dart';
import 'package:portfolio/widgets/widgets.dart';

part 'mobile.dart';

class Testimonials extends StatelessWidget {
  const Testimonials({super.key});

  static const String updateId = 'projects-view-update';

  @override
  Widget build(BuildContext context) {
    return ResponsiveWrapper(
      key: Get.find<DashboardController>().testimonialsKey,
      mobile: const _TestimonialsMobile(),
    );
  }
}
