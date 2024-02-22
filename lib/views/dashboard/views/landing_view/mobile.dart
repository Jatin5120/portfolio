part of 'landing_view.dart';

class _LandingViewMobile extends StatelessWidget {
  const _LandingViewMobile();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.maxFinite,
      height: Get.height - Dimens.navbarHeight,
      child: Padding(
        padding: ResponsiveState.mobile.pagePadding,
        child: Column(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Center(child: DashAnimation()),
                  AppText(
                    'Hey, I\'m',
                    style: context.textTheme.titleMedium?.withBodyColor,
                  ),
                  FittedBox(
                    child: AppText(
                      'Jatin',
                      style: GoogleFonts.getTextTheme(
                        'Montserrat',
                      ).displayLarge?.withTitleColor.copyWith(
                            fontSize: 80,
                            fontWeight: FontWeight.bold,
                            height: 1,
                            letterSpacing: 0,
                          ),
                    ),
                  ),
                  Dimens.boxHeight10,
                  AppText(
                    StringConstants.heroDescription,
                    style: context.textTheme.bodyMedium?.withBodyColor,
                  ),
                  const SizedBox(height: 32),
                  const HireMeButton(),
                  const SizedBox(height: 16),
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
