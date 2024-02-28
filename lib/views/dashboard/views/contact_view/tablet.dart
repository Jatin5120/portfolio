part of 'contact_view.dart';

class _ContactViewTablet extends StatelessWidget {
  const _ContactViewTablet();

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
            AppText(
              StringConstants.contactMe,
              style: context.textTheme.headlineLarge?.withTitleColor,
            ),
            Dimens.boxHeight16,
            AppText(
              StringConstants.quickLinks,
              style: context.textTheme.titleLarge?.withBodyColor,
            ),
            const SizedBox(height: 24),
            ...ContactItem.values
                .map((e) => ContactCard(
                      e,
                      state: ResponsiveState.tablet,
                    ))
                .separated(Dimens.boxHeight12),
            Dimens.boxHeight16,
            const Expanded(
              child: ContactForm(state: ResponsiveState.tablet),
            ),
            const SocialRow(center: true, showName: true),
          ],
        ),
      ),
    );
  }
}
