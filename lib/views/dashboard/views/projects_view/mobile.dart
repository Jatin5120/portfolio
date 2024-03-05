part of 'projects_view.dart';

class _ProjectsViewMobile extends StatelessWidget {
  const _ProjectsViewMobile();

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        maxWidth: context.width,
        minHeight: context.height - Dimens.navbarHeight,
      ),
      child: Padding(
        padding: ResponsiveState.mobile.pagePadding,
        child: const Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [],
        ),
      ),
    );
  }
}
