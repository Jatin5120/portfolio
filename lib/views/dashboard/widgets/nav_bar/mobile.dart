part of 'nav_bar.dart';

class _NavbarMobile extends StatelessWidget {
  const _NavbarMobile();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: ResponsiveState.mobile.padding,
      child: const Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          AppLogo(),
          Spacer(),
          AppIcon(
            AssetConstants.menu,
            color: AppColors.primary,
          ),
        ],
      ),
    );
  }
}
