part of 'landing_view.dart';

class _LandingViewMobile extends StatelessWidget {
  const _LandingViewMobile();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.maxFinite,
      height: Get.height - Dimens.navbarHeight,
      child: Padding(
        padding: ResponsiveState.mobile.padding,
        child: Column(
          children: [
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const DashAnimation(),
                  AppText(
                    'Hey, I\'m',
                    style: context.textTheme.titleLarge?.withBodyColor,
                  ),
                  AppText(
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
                  Dimens.boxHeight10,
                  AppText(
                    StringConstants.heroDescription,
                    style: context.textTheme.bodyLarge?.withBodyColor,
                  ),
                  Dimens.boxHeight50,
                  const HireMeButton(),
                  Dimens.boxHeight20,
                  const MyWorkButton(),
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
