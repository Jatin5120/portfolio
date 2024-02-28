import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/widgets/widgets.dart';

class NavLinkRow extends StatelessWidget {
  const NavLinkRow({
    super.key,
    this.mainAxisAlignment,
  });

  final MainAxisAlignment? mainAxisAlignment;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.end,
      mainAxisAlignment: mainAxisAlignment ?? MainAxisAlignment.start,
      children: [
        ...List.generate(
          NavItem.visible.length,
          (index) => NavLink(
            NavItem.visible[index],
          ),
        ),
      ],
    );
  }
}

class NavLink extends StatelessWidget {
  const NavLink(
    this.item, {
    super.key,
  });

  final NavItem item;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: Dimens.edgeInsets8_0,
      child: SizedBox(
        width: 80,
        child: GetX<DashboardController>(
          builder: (controller) {
            var isHovering = controller.hoveredNavItem == item;
            var isSelected = controller.selectedNavItem == item;
            return TapHandler(
              showSplash: false,
              onHover: (value) {
                controller.hoveredNavItem = value ? item : null;
              },
              onTap: () {
                controller.selectedNavItem = item;
              },
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  AppText(
                    item.label,
                    style: context.textTheme.titleMedium?.copyWith(
                      color: isSelected || isHovering ? AppColors.primary : AppColors.titleDark,
                    ),
                    isSelectable: false,
                  ),
                  Dimens.boxHeight4,
                  AnimatedContainer(
                    duration: AppConstants.animationDuration,
                    height: isHovering ? 2 : 4,
                    width: isHovering
                        ? 60
                        : isSelected
                            ? 4
                            : 0,
                    decoration: BoxDecoration(
                      color: AppColors.primary,
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
