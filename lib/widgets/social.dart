import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/widgets/widgets.dart';

class SocialRow extends StatelessWidget {
  const SocialRow({
    super.key,
    this.showName = false,
    this.center = false,
  });

  final bool showName;
  final bool center;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      direction: Axis.horizontal,
      children: SocialItem.values
          .map(
            (e) => $Social(e, showName: showName),
          )
          .toList(),
    );
  }
}

class $Social extends StatelessWidget {
  const $Social(
    this.item, {
    super.key,
    this.showName = false,
  });

  final SocialItem item;
  final bool showName;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 8),
      child: ObxValue<RxBool>(
        (isHovering) => TapHandler(
          showSplash: false,
          onTap: () => Get.find<DashboardController>().onSocialTap(item),
          onHover: (value) {
            isHovering.value = value;
          },
          child: AnimatedContainer(
            duration: AppConstants.animationDuration,
            decoration: BoxDecoration(
              color: isHovering.value ? item.color : null,
              borderRadius: BorderRadius.circular(8),
            ),
            padding: const EdgeInsets.all(8),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                AppIcon(item.icon),
                if (showName) ...[
                  Dimens.boxWidth8,
                  AppText(
                    item.label,
                    isSelectable: false,
                    style: context.textTheme.bodyLarge?.withTitleColor,
                  ),
                ],
              ],
            ),
          ),
        ),
        false.obs,
      ),
    );
  }
}
