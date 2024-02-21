part of 'about_view.dart';

class _AboutViewMobile extends StatelessWidget {
  const _AboutViewMobile();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.maxFinite,
      height: Get.height - Dimens.navbarHeight,
      child: Padding(
        padding: ResponsiveState.mobile.padding,
        child: const Column(
          children: [],
        ),
      ),
    );
  }
}
