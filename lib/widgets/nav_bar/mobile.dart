part of 'nav_bar.dart';

class _NavbarMobile extends StatelessWidget {
  const _NavbarMobile();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: ResponsiveState.mobile.navbarPadding,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const AppLogo(),
          const Spacer(),
          TapHandler(
            onTap: () => Get.find<DashboardController>().toggleDrawer(true),
            child: const AppIcon(
              AssetConstants.menu,
              color: AppColors.primary,
            ),
          ),
        ],
      ),
    );
  }
}
