import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/widgets/widgets.dart';

class AvatarRow extends StatelessWidget {
  const AvatarRow({super.key});

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 16,
      runSpacing: 16,
      children: AvatarItem.values
          .map(
            (e) => GetX<TestimonialController>(builder: (controller) {
              return TapHandler(
                onTap: () {
                  controller.selectedAvatar = e;
                },
                showSplash: false,
                showArrowCursor: true,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: controller.selectedAvatar == e ? AppColors.primary : Colors.transparent,
                      width: 2,
                    ),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(4),
                    child: Avatar(e),
                  ),
                ),
              );
            }),
          )
          .toList(),
    );
  }
}
