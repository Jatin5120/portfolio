part of 'nav_bar.dart';

class _NavbarDesktopLarge extends StatelessWidget {
  const _NavbarDesktopLarge();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: ResponsiveState.desktopLarge.navbarPadding,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Flexible(
            flex: 10,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                const Flexible(
                  flex: 2,
                  child: AppLogo(),
                ),
                Dimens.boxWidth16,
                const Flexible(
                  flex: 4,
                  child: NavLinkRow(),
                ),
              ],
            ),
          ),
          const Spacer(flex: 4),
          const Flexible(
            flex: 3,
            child: GetInTouchButton(),
          ),
          Dimens.boxWidth16,
          const Flexible(
            flex: 3,
            child: HireMeButton(),
          ),
        ],
      ),
    );
  }
}
