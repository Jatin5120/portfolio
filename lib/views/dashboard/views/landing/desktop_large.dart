part of 'landing.dart';

class _LandingDesktopLarge extends StatelessWidget {
  const _LandingDesktopLarge();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.maxFinite,
      height: context.height - Dimens.navbarHeight,
      child: Padding(
        padding: ResponsiveState.desktopLarge.pagePadding,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Row(
                children: [
                  Expanded(
                    flex: 6,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        AppText(
                          'Hey, I\'m',
                          style: context.textTheme.titleLarge?.withBodyColor,
                        ),
                        AppText(
                          'Jatin',
                          style: GoogleFonts.getTextTheme(
                            'Montserrat',
                          ).displayLarge?.withTitleColor.copyWith(
                                fontSize: Dimens.hundredFourty,
                                fontWeight: FontWeight.bold,
                                height: 1,
                                letterSpacing: 0,
                              ),
                        ),
                        AppText(
                          StringConstants.heroDescription,
                          style: context.textTheme.bodyLarge?.withBodyColor,
                        ),
                        Dimens.boxHeight20,
                        Row(
                          children: [
                            const Flexible(
                              flex: 2,
                              child: MyWorkButton(),
                            ),
                            Dimens.boxWidth16,
                            const Flexible(
                              flex: 2,
                              child: HireMeButton(),
                            ),
                            const Spacer(),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const Spacer(),
                  const Expanded(
                    flex: 5,
                    child: Center(
                      child: DashAnimation(),
                    ),
                  ),
                ],
              ),
            ),
            const SocialRow(),
          ],
        ),
      ),
    );
  }
}
