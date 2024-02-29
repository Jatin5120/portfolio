import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/widgets/widgets.dart';

class ContactCard extends StatelessWidget {
  const ContactCard(
    this.item, {
    super.key,
    required this.state,
  });

  final ContactItem item;
  final ResponsiveState state;

  TextStyle? _titleStyle(BuildContext context) {
    switch (state) {
      case ResponsiveState.mobile:
        return context.textTheme.bodySmall;
      case ResponsiveState.tablet:
        return context.textTheme.bodyMedium;
      case ResponsiveState.desktop:
        return context.textTheme.bodyMedium;
      case ResponsiveState.desktopLarge:
        return context.textTheme.titleMedium;
    }
  }

  TextStyle? _contentStyle(BuildContext context) {
    switch (state) {
      case ResponsiveState.mobile:
        return context.textTheme.titleMedium;
      case ResponsiveState.tablet:
        return context.textTheme.titleLarge;
      case ResponsiveState.desktop:
        return context.textTheme.headlineSmall;
      case ResponsiveState.desktopLarge:
        return context.textTheme.headlineMedium;
    }
  }

  @override
  Widget build(BuildContext context) {
    return ObxValue<RxBool>(
      (isHovering) => TapHandler(
        showSplash: false,
        onTap: () => Get.find<DashboardController>().onContactTap(item),
        onHover: (value) {
          isHovering.value = value;
        },
        child: AnimatedContainer(
          duration: AppConstants.animationDuration,
          padding: state.isMobile ? Dimens.edgeInsets8 : Dimens.edgeInsets24,
          width: double.maxFinite,
          decoration: ShapeDecoration(
            color: isHovering.value ? AppColors.primary.shade700 : context.theme.cardTheme.color,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(state.isMobile ? Dimens.twelve : Dimens.twentyFour),
            ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Column(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  AppText(
                    item.title,
                    isSelectable: false,
                    style: _titleStyle(context)?.withBodyColor,
                  ),
                  AppText(
                    item.content,
                    isSelectable: false,
                    style: _contentStyle(context)?.withTitleColor.copyWith(
                          shadows: isHovering.value
                              ? [
                                  const Shadow(
                                    color: Colors.black12,
                                    offset: Offset(2, 2),
                                  ),
                                ]
                              : null,
                        ),
                  ),
                ],
              ),
              const AppIcon(AssetConstants.arrowRight),
            ],
          ),
        ),
      ),
      false.obs,
    );
  }
}
