import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/models/models.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/widgets/widgets.dart';

class ProjectCard extends StatelessWidget {
  const ProjectCard(
    this.project, {
    super.key,
    required this.state,
  });

  final ProjectsModel project;
  final ResponsiveState state;

  @override
  Widget build(BuildContext context) {
    if (state.isMobile) {
      return _MobileCard(project);
    }
    return _DesktopCard(project);
  }
}

class _MobileCard extends StatelessWidget {
  const _MobileCard(this.project);

  final ProjectsModel project;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.cardDark,
        borderRadius: BorderRadius.circular(Dimens.twentyFour),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          AspectRatio(
            aspectRatio: 1.5,
            child: DecoratedBox(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(Dimens.twentyFour),
                image: DecorationImage(
                  image: NetworkImage(project.images.first),
                  fit: BoxFit.cover,
                ),
              ),
            ),
          ),
          Padding(
            padding: Dimens.edgeInsets12,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AppText(
                  project.name,
                  style: context.textTheme.titleLarge?.withTitleColor.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Dimens.boxHeight4,
                AppText(
                  key: const ValueKey('project-description'),
                  project.description,
                  style: context.textTheme.bodyMedium?.withTitleColor,
                  maxLines: 4,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _DesktopCard extends StatelessWidget {
  const _DesktopCard(this.project);

  final ProjectsModel project;

  @override
  Widget build(BuildContext context) {
    return ObxValue<RxBool>(
      (isHovering) => TapHandler(
        showSplash: false,
        showArrowCursor: true,
        onHover: (value) {
          isHovering.value = value;
        },
        child: AnimatedContainer(
          duration: AppConstants.animationDuration,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            image: DecorationImage(
              image: NetworkImage(project.images.first),
              fit: BoxFit.cover,
            ),
          ),
          clipBehavior: Clip.antiAlias,
          child: Stack(
            children: [
              if (isHovering.value) ...[
                Positioned.fill(
                  child: Container(
                    decoration: const BoxDecoration(
                      color: Colors.black45,
                    ),
                  ),
                ),
              ],
              AnimatedPositioned(
                key: const ValueKey('hover-button'),
                duration: AppConstants.animationDuration,
                bottom: isHovering.value ? 20 : -150,
                left: 20,
                right: 20,
                curve: Curves.easeInOut,
                child: Column(
                  children: [
                    AppText(
                      key: const ValueKey('project-name'),
                      project.name,
                      style: context.textTheme.titleLarge?.withTitleColor.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    AppText(
                      key: const ValueKey('project-description'),
                      project.description,
                      style: context.textTheme.bodyMedium?.withTitleColor,
                      maxLines: 3,
                      textAlign: TextAlign.center,
                      overflow: TextOverflow.ellipsis,
                    ),
                    // Dimens.boxHeight4,
                    // AppButton(
                    //   key: const ValueKey('detail-button'),
                    //   label: 'Details',
                    //   onTap: () {},
                    // ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
      false.obs,
    );
  }
}
