part of 'about_view.dart';

class _AboutViewMobile extends StatelessWidget {
  const _AboutViewMobile();

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        maxWidth: context.width,
        minHeight: context.height - Dimens.navbarHeight,
      ),
      child: Padding(
        padding: ResponsiveState.mobile.pagePadding,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const AboutImageRow(small: true, isMobile: true),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                AppText(
                  'Who am I?',
                  style: context.textTheme.headlineSmall?.withTitleColor,
                ),
                Dimens.boxHeight8,
                const SkillRow(isMobile: true),
                Dimens.boxHeight16,
                AppText(
                  StringConstants.aboutMe,
                  style: context.textTheme.titleSmall?.withBodyColor,
                ),
              ],
            ),
            Column(
              children: [
                const SizedBox(height: 24),
                const GithubButton(),
                const SizedBox(height: 16),
                const LinkedinButton(),
                Dimens.boxHeight50,
              ],
            ),
          ],
        ),
      ),
    );
  }
}
