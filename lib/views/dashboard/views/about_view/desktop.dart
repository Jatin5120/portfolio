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
            Dimens.boxHeight16,
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
                        Dimens.boxHeight8,
                        AppText(
                          StringConstants.aboutMe,
                          style: context.textTheme.titleLarge?.withBodyColor,
                        ),
                        const Spacer(),
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
                            const Spacer(),
                          ],
                        ),
                        Dimens.boxHeight20,
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
