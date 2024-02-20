import 'package:flutter/material.dart';
import 'package:portfolio/res/res.dart';

class TestimonialView extends StatelessWidget {
  const TestimonialView({Key? key}) : super(key: key);

  static const String route = AppRoutes.testimonial;

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Text('Testimonial'),
      ),
    );
  }
}
