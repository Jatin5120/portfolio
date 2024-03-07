part of 'landing.dart';

class _LandingDesktop extends StatelessWidget {
  const _LandingDesktop();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.maxFinite,
      height: context.height - Dimens.navbarHeight,
      child: Padding(
        padding: ResponsiveState.desktop.pagePadding,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Row(
                children: [
                  Expanded(
                    flex: 5,
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
                              child: MyWorkButton(),
                            ),
                            Dimens.boxWidth16,
                            const Flexible(
                              child: HireMeButton(),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const Spacer(),
                  const Expanded(
                    flex: 5,
                    child: DashAnimation(),
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
