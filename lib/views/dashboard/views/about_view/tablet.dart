part of 'about_view.dart';

class _AboutViewTablet extends StatelessWidget {
  const _AboutViewTablet();

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        maxWidth: context.width,
        minHeight: context.height - Dimens.navbarHeight,
        maxHeight: max(750, context.height - Dimens.navbarHeight),
      ),
      child: Padding(
        padding: ResponsiveState.tablet.pagePadding,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const AboutImageRow(small: true),
            Dimens.boxHeight32,
            Flexible(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    flex: 3,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        AppText(
                          'Who am I?',
                          style: context.textTheme.headlineMedium?.withTitleColor,
                        ),
                        Dimens.boxHeight8,
                        const SkillRow(),
                        Dimens.boxHeight16,
                        AppText(
                          StringConstants.aboutMe,
                          style: context.textTheme.titleMedium?.withBodyColor,
                        ),
                      ],
                    ),
                  ),
                  Dimens.boxWidth32,
                  Expanded(
                    flex: 2,
                    child: Image.asset(
                      AssetConstants.cartoonFull,
                    ),
                  ),
                ],
              ),
            ),
            const Row(
              children: [
                Flexible(
                  child: GithubButton(),
                ),
                SizedBox(width: 16),
                Flexible(
                  child: LinkedinButton(),
                ),
              ],
            ),
            Dimens.boxHeight20,
          ],
        ),
      ),
    );
  }
}
