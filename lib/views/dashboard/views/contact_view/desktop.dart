part of 'contact_view.dart';

class _ContactViewDesktop extends StatelessWidget {
  const _ContactViewDesktop();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.maxFinite,
      height: Get.height - Dimens.navbarHeight,
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
