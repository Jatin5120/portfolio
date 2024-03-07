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
      padding: context.responsiveState.isMobile ? context.responsiveState.pagePadding : context.testimonialPadding,
      child: Stack(
        children: [
          const Align(
            alignment: Alignment.bottomLeft,
            child: AppIcon(AssetConstants.dotBg),
          ),
          Column(
            children: [
              AppText(
                testimonial.message,
                style: context.textTheme.titleMedium?.withTitleColor,
                textAlign: TextAlign.center,
              ),
              Dimens.boxHeight16,
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
    );
  }
}
