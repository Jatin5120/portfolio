part of 'contact_view.dart';

class _ContactViewMobile extends StatelessWidget {
  const _ContactViewMobile();

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        maxWidth: Get.width,
        minHeight: Get.height - Dimens.navbarHeight,
      ),
      child: Padding(
        padding: ResponsiveState.mobile.pagePadding,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            AppText(
              StringConstants.contactMe,
              style: context.textTheme.headlineLarge?.withTitleColor,
            ),
            const SizedBox(height: 8),
            AppText(
              StringConstants.quickLinks,
              style: context.textTheme.titleLarge?.withBodyColor,
            ),
            const SizedBox(height: 16),
            ...ContactItem.values
                .map((e) => ContactCard(
                      e,
                      state: ResponsiveState.mobile,
                    ))
                .separated(const SizedBox(height: 8)),
            const SizedBox(height: 24),
            const ContactForm(state: ResponsiveState.mobile),
            const SizedBox(height: 16),
            const SocialRow(center: true, showName: true),
          ],
        ),
      ),
    );
  }
}
