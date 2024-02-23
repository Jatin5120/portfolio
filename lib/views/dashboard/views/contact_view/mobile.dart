part of 'contact_view.dart';

class _ContactViewMobile extends StatelessWidget {
  const _ContactViewMobile();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.maxFinite,
      height: Get.height - Dimens.navbarHeight,
      child: Padding(
        padding: ResponsiveState.mobile.pagePadding,
        child: const Column(
          children: [],
        ),
      ),
    );
  }
}
