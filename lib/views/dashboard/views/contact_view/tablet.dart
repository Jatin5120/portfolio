part of 'contact_view.dart';

class _ContactViewTablet extends StatelessWidget {
  const _ContactViewTablet();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.maxFinite,
      height: Get.height - Dimens.navbarHeight,
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
