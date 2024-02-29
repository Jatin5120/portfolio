import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/widgets/widgets.dart';

class SkillRow extends StatelessWidget {
  const SkillRow({
    super.key,
    this.isMobile = false,
  });

  final bool isMobile;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      direction: Axis.horizontal,
      spacing: 10,
      runSpacing: 10,
      children: SkillItem.values
          .map((e) => $Skill(
                e.label,
                isMobile: isMobile,
              ))
          .toList(),
    );
  }
}

class $Skill extends StatelessWidget {
  const $Skill(
    this.label, {
    super.key,
    this.isMobile = false,
  });

  final String label;
  final bool isMobile;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: AppColors.cardDark,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 8,
        ),
        child: AppText(
          label,
          style: (isMobile ? context.textTheme.bodyMedium : context.textTheme.bodyLarge)?.withTitleColor,
        ),
      ),
    );
  }
}
