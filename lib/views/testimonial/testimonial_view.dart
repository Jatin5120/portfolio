import 'dart:math';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/widgets/widgets.dart';

part 'views/desktop.dart';
part 'views/desktop_large.dart';
part 'views/mobile.dart';
part 'views/tablet.dart';

class TestimonialView extends StatelessWidget {
  const TestimonialView({super.key});

  static const String route = AppRoutes.testimonial;

  static const String updateId = 'testimonial-view';

  @override
  Widget build(BuildContext context) {
    return GetBuilder<TestimonialController>(
      id: updateId,
      builder: (controller) {
        return Scaffold(
          appBar: const PreferredSize(
            preferredSize: Size.fromHeight(Dimens.navbarHeight),
            child: NavBar(),
          ),
          body: Center(
            child: SingleChildScrollView(
              padding: context.responsiveState.pagePadding,
              child: ConstrainedBox(
                constraints: const BoxConstraints(
                  maxWidth: 800,
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    AppText(
                      StringConstants.testimonials,
                      style: context.textTheme.headlineMedium?.withTitleColor,
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 8),
                    AppText(
                      StringConstants.addYourTestimonial,
                      style: context.textTheme.titleLarge?.withBodyColor,
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 40),
                    if (context.responsiveState == ResponsiveState.mobile) ...[
                      const InputField(
                        label: 'Name',
                        hint: 'Your Name',
                      ),
                      const SizedBox(height: 16),
                      const InputField(
                        label: 'Designation/Relation',
                        hint: 'CEO@XYZ / Best Friend',
                      ),
                    ] else
                      const Row(
                        children: [
                          Flexible(
                            child: InputField(
                              label: 'Name',
                              hint: 'Your Name',
                            ),
                          ),
                          SizedBox(width: 16),
                          Flexible(
                            child: InputField(
                              label: 'Designation/Relation',
                              hint: 'CEO@XYZ / Best Friend',
                            ),
                          ),
                        ],
                      ),
                    const SizedBox(height: 16),
                    const InputField(
                      label: 'Feedback',
                      hint: 'Share a snapshot of your experience with me.',
                      minLines: 3,
                      maxLines: 5,
                    ),
                    const SizedBox(height: 80),
                    AppButton(
                      label: 'Submit',
                      onTap: () {},
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
