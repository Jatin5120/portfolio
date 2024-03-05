part of 'projects_view.dart';

class _ProjectsViewDesktopLarge extends StatelessWidget {
  const _ProjectsViewDesktopLarge();

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        maxWidth: context.width,
        minHeight: context.height - Dimens.navbarHeight,
      ),
      child: Padding(
        padding: ResponsiveState.desktopLarge.pagePadding,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            AppText(
              StringConstants.projects,
              style: context.textTheme.headlineLarge?.withTitleColor,
            ),
            Dimens.boxHeight32,
            GetBuilder<DashboardController>(
              id: ProjectsView.updateId,
              builder: (controller) {
                return ListView.separated(
                  itemCount: controller.projects.length,
                  shrinkWrap: true,
                  separatorBuilder: (_, __) => const SizedBox.shrink(),
                  itemBuilder: (_, index) {
                    final project = controller.projects[index];
                    return AppText(
                      project.name,
                      style: context.textTheme.titleLarge?.withTitleColor,
                    );
                  },
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
