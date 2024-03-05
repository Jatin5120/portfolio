part of 'projects_view.dart';

class _ProjectsViewTablet extends StatelessWidget {
  const _ProjectsViewTablet();

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        maxWidth: context.width,
        minHeight: context.height - Dimens.navbarHeight,
        maxHeight: max(700, context.height - Dimens.navbarHeight),
      ),
      child: Padding(
        padding: ResponsiveState.tablet.pagePadding,
        child: const Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [],
        ),
      ),
    );
  }
}
