part of 'landing_view.dart';

class _LandingViewTablet extends StatelessWidget {
  const _LandingViewTablet();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.maxFinite,
      height: Get.height - Dimens.navbarHeight,
      child: Padding(
        padding: ResponsiveState.tablet.padding,
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
            const SocialRow(center: true),
          ],
        ),
      ),
    );
  }
}
