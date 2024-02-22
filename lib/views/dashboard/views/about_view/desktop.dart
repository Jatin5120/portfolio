part of 'about_view.dart';

class _AboutViewDesktop extends StatelessWidget {
  const _AboutViewDesktop();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.maxFinite,
      height: MediaQuery.of(context).size.height - Dimens.navbarHeight,
      child: Padding(
        padding: ResponsiveState.desktop.pagePadding,
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
                    flex: 3,
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
                        Row(
                          children: [
                            Flexible(
                              child: AppButton.outlined(
                                label: 'Github',
                                onTap: () {},
                              ),
                            ),
                            Dimens.boxWidth16,
                            Flexible(
                              child: AppButton(
                                label: 'LinkedIn',
                                onTap: () {},
                              ),
                            ),
                          ],
                        ),
                        const Spacer(),
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
          ],
        ),
      ),
    );
  }
}
