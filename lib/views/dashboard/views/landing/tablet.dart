part of 'landing.dart';

class _LandingTablet extends StatelessWidget {
  const _LandingTablet();

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        maxWidth: context.width,
        minHeight: context.height - Dimens.navbarHeight,
        maxHeight: max(700, context.height - Dimens.navbarHeight),
      ),
      child: Padding(
        padding: ResponsiveState.tablet.pagePadding,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Expanded(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.end,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            AppText(
                              'Hey, I\'m',
                              style: context.textTheme.titleLarge?.withBodyColor,
                            ),
                            FittedBox(
                              child: AppText(
                                'Jatin',
                                style: GoogleFonts.getTextTheme(
                                  'Montserrat',
                                ).displayLarge?.withTitleColor.copyWith(
                                      fontSize: 144,
                                      fontWeight: FontWeight.bold,
                                      height: 1,
                                      letterSpacing: 0,
                                    ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const Expanded(
                        child: DashAnimation(),
                      ),
                    ],
                  ),
                  Dimens.boxHeight10,
                  AppText(
                    StringConstants.heroDescription,
                    style: context.textTheme.bodyLarge?.withBodyColor,
                  ),
                  Dimens.boxHeight32,
                  const Row(
                    children: [
                      Flexible(
                        child: MyWorkButton(),
                      ),
                      SizedBox(width: 16),
                      Flexible(
                        child: HireMeButton(),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SocialRow(center: true),
          ],
        ),
      ),
    );
  }
}
