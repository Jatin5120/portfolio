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
  });

  final ContactItem item;

  @override
  Widget build(BuildContext context) {
    return TapHandler(
      showSplash: false,
      onTap: () => Get.find<DashboardController>().onContactTap(item),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: ShapeDecoration(
          color: context.theme.cardTheme.color,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(24),
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
                  style: context.textTheme.titleMedium?.withBodyColor,
                ),
                AppText(
                  item.content,
                  isSelectable: false,
                  style: context.textTheme.headlineMedium?.withTitleColor,
                ),
              ],
            ),
            const AppIcon(AssetConstants.arrowRight),
          ],
        ),
      ),
    );
  }
}
