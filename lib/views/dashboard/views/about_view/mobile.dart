part of 'about_view.dart';

class _AboutViewMobile extends StatelessWidget {
  const _AboutViewMobile();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.maxFinite,
      height: Get.height - Dimens.navbarHeight,
      child: Padding(
        padding: ResponsiveState.mobile.pagePadding,
        child: Column(
          children: [
            const AboutImageRow(small: true, isMobile: true),
            Dimens.boxHeight32,
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Flexible(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        AppText(
                          'Who am I?',
                          style: context.textTheme.headlineSmall?.withTitleColor,
                        ),
                        Dimens.boxHeight8,
                        const SkillRow(),
                        Dimens.boxHeight16,
                        AppText(
                          StringConstants.aboutMe,
                          style: context.textTheme.titleSmall?.withBodyColor,
                        ),
                      ],
                    ),
                  ),
                  AppButton(
                    label: 'LinkedIn',
                    onTap: () {},
                  ),
                  const SizedBox(height: 16),
                  AppButton.outlined(
                    label: 'Github',
                    onTap: () {},
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
