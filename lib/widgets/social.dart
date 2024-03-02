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
    this.isMobile = false,
  });

  final bool showName;
  final bool center;
  final bool isMobile;

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      shrinkWrap: true,
      itemCount: SocialItem.values.length,
      physics: const NeverScrollableScrollPhysics(),
      cacheExtent: showName ? 170 : 44,
      gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
        maxCrossAxisExtent: showName ? 170 : 44,
        mainAxisExtent: 44,
        crossAxisSpacing: 10,
        mainAxisSpacing: 10,
      ),
      itemBuilder: (_, index) => $Social(
        SocialItem.values[index],
        showName: showName,
        isMobile: isMobile,
      ),
    );
  }
}

class $Social extends StatelessWidget {
  const $Social(
    this.item, {
    super.key,
    this.showName = false,
    this.isMobile = false,
  });

  final SocialItem item;
  final bool showName;
  final bool isMobile;

  @override
  Widget build(BuildContext context) {
    return ObxValue<RxBool>(
      (isHovering) => TapHandler(
        showSplash: false,
        onTap: () => Get.find<DashboardController>().onSocialTap(item),
        onHover: (value) {
          isHovering.value = value;
        },
        child: AnimatedContainer(
          alignment: isMobile ? Alignment.centerLeft : Alignment.center,
          duration: AppConstants.animationDuration,
          decoration: BoxDecoration(
            color: isHovering.value ? item.color : null,
            borderRadius: BorderRadius.circular(12),
          ),
          padding: const EdgeInsets.all(8),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
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
    );
  }
}
