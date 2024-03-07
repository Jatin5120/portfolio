part of 'about.dart';

class _AboutDesktopLarge extends StatelessWidget {
  const _AboutDesktopLarge();

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
            const AboutImageRow(),
            Dimens.boxHeight32,
            Expanded(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    flex: 2,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        AppText(
                          'Who am I?',
                          style: context.textTheme.headlineLarge?.withTitleColor,
                        ),
                        Dimens.boxHeight8,
                        const SkillRow(),
                        Dimens.boxHeight16,
                        AppText(
                          StringConstants.aboutMe,
                          style: context.textTheme.titleLarge?.withBodyColor,
                        ),
                        const Spacer(flex: 2),
                        const Row(
                          children: [
                            Flexible(
                              child: GithubButton(),
                            ),
                            SizedBox(width: 16),
                            Flexible(
                              child: LinkedinButton(),
                            ),
                            Spacer(),
                          ],
                        ),
                        const Spacer(),
                      ],
                    ),
                  ),
                  Dimens.boxWidth32,
                  Expanded(
                    child: Image.asset(
                      AssetConstants.cartoonFull,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
