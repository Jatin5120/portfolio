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
    return Container(
      margin: context.responsiveState.isMobile ? context.responsiveState.pagePadding : context.testimonialPadding,
      padding: Dimens.edgeInsets24,
      decoration: BoxDecoration(
        color: AppColors.cardDark,
        borderRadius: BorderRadius.circular(Dimens.twentyFour),
      ),
      child: Stack(
        alignment: Alignment.topCenter,
        children: [
          const Align(
            alignment: Alignment.bottomRight,
            child: AppIcon(
              AssetConstants.dotBg,
              color: AppColors.backgroundDark,
            ),
          ),
          Column(
            children: [
              AppText(
                testimonial.message,
                style: context.textTheme.titleMedium?.withTitleColor,
              ),
              Dimens.boxHeight16,
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
            ],
          ),
        ],
      ),
    );
  }
}
