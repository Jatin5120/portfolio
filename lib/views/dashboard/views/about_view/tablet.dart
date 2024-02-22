part of 'about_view.dart';

class _AboutViewTablet extends StatelessWidget {
  const _AboutViewTablet();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.maxFinite,
      height: Get.height - Dimens.navbarHeight,
      child: Padding(
        padding: ResponsiveState.tablet.pagePadding,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const AboutImageRow(small: true),
            Dimens.boxHeight32,
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
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
                  Row(
                    children: [
                      Flexible(
                        child: AppButton.outlined(
                          label: 'Github',
                          onTap: () {},
                        ),
                      ),
                      const SizedBox(width: 16),
                      Flexible(
                        child: AppButton(
                          label: 'LinkedIn',
                          onTap: () {},
                        ),
                      ),
                    ],
                  ),
                  Dimens.boxHeight50,
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
