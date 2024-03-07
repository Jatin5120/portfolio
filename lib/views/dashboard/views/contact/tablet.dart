part of 'contact.dart';

class _ContactTablet extends StatelessWidget {
  const _ContactTablet();

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        maxWidth: context.width,
        minHeight: context.height - Dimens.navbarHeight,
      ),
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
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 24),
            ...ContactItem.values
                .map((e) => ContactCard(
                      e,
                      state: ResponsiveState.tablet,
                    ))
                .separated(Dimens.boxHeight12),
            const SizedBox(height: 24),
            AppText(
              StringConstants.technicalQuery,
              style: context.textTheme.titleLarge?.withBodyColor,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 24),
            const ContactForm(state: ResponsiveState.tablet),
            const SizedBox(height: 16),
            const SocialRow(center: true, showName: true),
          ],
        ),
      ),
    );
  }
}
