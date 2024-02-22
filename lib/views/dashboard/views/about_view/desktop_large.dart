part of 'about_view.dart';

class _AboutViewDesktopLarge extends StatelessWidget {
  const _AboutViewDesktopLarge();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.maxFinite,
      height: Get.height - Dimens.navbarHeight,
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
