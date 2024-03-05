part of 'projects_view.dart';

class _ProjectsViewDesktop extends StatelessWidget {
  const _ProjectsViewDesktop();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.maxFinite,
      height: context.height - Dimens.navbarHeight,
      child: Padding(
        padding: ResponsiveState.desktop.pagePadding,
        child: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [],
        ),
      ),
    );
  }
}
