part of 'projects.dart';

class _ProjectsTablet extends StatelessWidget {
  const _ProjectsTablet();

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
              return GridView.builder(
                itemCount: controller.projects.length,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                  maxCrossAxisExtent: 400,
                  childAspectRatio: 1.4,
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                ),
                itemBuilder: (_, index) {
                  final project = controller.projects[index % controller.projects.length];
                  return ProjectCard(
                    project,
                    state: context.responsiveState,
                  );
                },
              );
            },
          ),
        ],
      ),
    );
  }
}
