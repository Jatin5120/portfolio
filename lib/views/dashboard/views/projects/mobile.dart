part of 'projects.dart';

class _ProjectsMobile extends StatelessWidget {
  const _ProjectsMobile();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: context.responsiveState.pagePadding,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          AppText(
            StringConstants.projects,
            style: context.textTheme.headlineLarge?.withTitleColor,
          ),
          Dimens.boxHeight24,
          GetBuilder<DashboardController>(
            id: Projects.updateId,
            builder: (controller) {
              if (controller.projects.isEmpty) {
                return const LoadingProjects();
              }
              return ListView.separated(
                itemCount: controller.showAllProjects ? controller.projects.length : controller.projects.take(4).length,
                shrinkWrap: true,
                scrollDirection: Axis.vertical,
                physics: const NeverScrollableScrollPhysics(),
                separatorBuilder: (_, __) => Dimens.boxHeight16,
                itemBuilder: (_, index) {
                  final project = controller.projects[index];
                  return ProjectCard(
                    project,
                    state: context.responsiveState,
                  );
                },
              );
            },
          ),
          GetBuilder<DashboardController>(
            id: Projects.updateId,
            builder: (controller) => !controller.showAllProjects
                ? Column(
                    children: [
                      const SizedBox(height: 24),
                      AppButton(
                        label: 'Show All',
                        onTap: controller.toggleShowAllProjects,
                      ),
                    ],
                  )
                : const SizedBox.shrink(),
          ),
        ],
      ),
    );
  }
}
