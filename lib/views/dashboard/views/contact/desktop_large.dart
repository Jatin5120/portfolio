part of 'contact.dart';

class _ContactDesktopLarge extends StatelessWidget {
  const _ContactDesktopLarge();

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        maxWidth: context.width,
        minHeight: context.height - Dimens.navbarHeight,
      ),
      child: Padding(
        padding: ResponsiveState.desktopLarge.pagePadding,
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
            Dimens.boxHeight24,
            Row(
              children: ContactItem.values
                  .map((e) => Expanded(
                        child: ContactCard(
                          e,
                          state: ResponsiveState.desktopLarge,
                        ),
                      ))
                  .separated(
                    const SizedBox(width: 16),
                  )
                  .toList(),
            ),
            Dimens.boxHeight24,
            AppText(
              StringConstants.technicalQuery,
              style: context.textTheme.titleLarge?.withBodyColor,
            ),
            Dimens.boxHeight24,
            const ContactForm(state: ResponsiveState.desktopLarge),
            Dimens.boxHeight40,
            const SocialRow(center: true, showName: true),
          ],
        ),
      ),
    );
  }
}
