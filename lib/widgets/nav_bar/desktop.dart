part of 'nav_bar.dart';

class _NavbarDesktop extends StatelessWidget {
  const _NavbarDesktop();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: ResponsiveState.desktop.navbarPadding,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Flexible(
            flex: 8,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                const AppLogo(),
                Dimens.boxWidth16,
                const Flexible(
                  flex: 4,
                  child: NavLinkRow(),
                ),
              ],
            ),
          ),
          const Spacer(),
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
