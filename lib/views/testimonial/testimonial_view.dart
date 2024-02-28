import 'package:flutter/material.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/widgets/widgets.dart';

class TestimonialView extends StatelessWidget {
  const TestimonialView({super.key});

  static const String route = AppRoutes.testimonial;

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: AppText('Testimonial'),
      ),
    );
  }
}
