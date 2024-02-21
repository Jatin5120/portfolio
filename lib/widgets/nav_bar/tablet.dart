part of 'nav_bar.dart';

class _NavbarTablet extends StatelessWidget {
  const _NavbarTablet();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: ResponsiveState.tablet.navbarPadding,
      child: const Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Flexible(
            flex: 2,
            child: AppLogo(),
          ),
          Expanded(
            flex: 6,
            child: NavLinkRow(
              mainAxisAlignment: MainAxisAlignment.center,
            ),
          ),
          Flexible(
            flex: 2,
            child: HireMeButton(),
          ),
        ],
      ),
    );
  }
}
