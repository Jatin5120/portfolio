part of 'contact.dart';

class _ContactMobile extends StatelessWidget {
  const _ContactMobile();

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
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            ...ContactItem.values
                .map((e) => ContactCard(
                      e,
                      state: ResponsiveState.mobile,
                    ))
                .separated(const SizedBox(height: 8)),
            const SizedBox(height: 16),
            AppText(
              StringConstants.technicalQuery,
              style: context.textTheme.titleLarge?.withBodyColor,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 24),
            const ContactForm(state: ResponsiveState.mobile),
            const SizedBox(height: 16),
            const SocialRow(
              center: true,
              showName: true,
              isMobile: true,
            ),
          ],
        ),
      ),
    );
  }
}
