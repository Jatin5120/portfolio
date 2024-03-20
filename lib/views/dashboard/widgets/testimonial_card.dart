import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/models/models.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/widgets/widgets.dart';

class TestimonialCard extends StatelessWidget {
  const TestimonialCard(this.testimonial, {super.key});

  final TestimonialModel testimonial;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: context.testimonialPadding,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(24),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
          child: Container(
            width: context.testimonialWidth,
            padding: context.responsiveState.isMobile ? Dimens.edgeInsets16 : Dimens.edgeInsets24,
            decoration: BoxDecoration(
              color: AppColors.cardDark.withOpacity(0.4),
              borderRadius: BorderRadius.circular(24),
            ),
            child: Stack(
              alignment: Alignment.topCenter,
              children: [
                const Align(
                  alignment: Alignment.bottomLeft,
                  child: AppIcon(AssetConstants.dotBg),
                ),
                Column(
                  children: [
                    Row(
                      children: [
                        Avatar(testimonial.avatar),
                        const SizedBox(width: 8),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            AppText(
                              testimonial.name,
                              style: context.textTheme.bodyMedium?.withBodyColor.copyWith(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            AppText(
                              testimonial.designation,
                              style: context.textTheme.bodyMedium?.withBodyColor,
                            ),
                          ],
                        ),
                      ],
                    ),
                    Dimens.boxHeight16,
                    AppText(
                      testimonial.message,
                      style: context.textTheme.titleMedium?.withTitleColor,
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
