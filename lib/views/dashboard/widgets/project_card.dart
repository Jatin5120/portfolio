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
        borderRadius: BorderRadius.circular(Dimens.sixteen),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          AspectRatio(
            aspectRatio: 1.5,
            child: DecoratedBox(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(Dimens.sixteen),
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
                Dimens.boxHeight8,
                _LinksRow(project),
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

  Duration get _duration => AppConstants.animationDuration;

  Curve get _curve => Curves.easeInOut;

  @override
  Widget build(BuildContext context) {
    return ObxValue<RxBool>(
      (isHovering) => TapHandler(
        showSplash: false,
        showArrowCursor: true,
        onHover: (value) {
          isHovering.value = value;
        },
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          clipBehavior: Clip.antiAlias,
          child: Stack(
            children: [
              Positioned.fill(
                child: AnimatedScale(
                  key: const ValueKey('project-image'),
                  scale: isHovering.value ? 1.2 : 1.0,
                  duration: _duration,
                  curve: _curve,
                  child: Image.network(
                    project.images.first,
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              Positioned.fill(
                child: AnimatedOpacity(
                  key: const ValueKey('black-gradient'),
                  duration: _duration,
                  curve: _curve,
                  opacity: isHovering.value ? 1 : 0,
                  child: const ColoredBox(
                    color: Colors.black54,
                  ),
                ),
              ),
              AnimatedPositioned(
                key: const ValueKey('hover-button'),
                duration: _duration,
                bottom: isHovering.value ? 20 : -150,
                left: 20,
                right: 20,
                curve: _curve,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
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
                    Dimens.boxHeight8,
                    _LinksRow(project),
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

class _LinksRow extends StatelessWidget {
  const _LinksRow(this.project);

  final ProjectsModel project;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: project.links
          .map(
            (e) => Padding(
              padding: const EdgeInsets.all(2),
              child: TapHandler(
                onTap: () {
                  Utility.launchURL(e.url);
                },
                child: AppIcon(
                  e.type.path,
                  size: 24,
                ),
              ),
            ),
          )
          .toList(),
    );
  }
}
