import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/widgets/widgets.dart';

class LoadingProjects extends StatelessWidget {
  const LoadingProjects({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.maxFinite,
      height: context.height * 0.8,
      child: const Center(
        child: AppLoader(message: 'Loading Projects'),
      ),
    );
  }
}
