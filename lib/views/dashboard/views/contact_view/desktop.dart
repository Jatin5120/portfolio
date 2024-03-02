part of 'contact_view.dart';

class _ContactViewDesktop extends StatelessWidget {
  const _ContactViewDesktop();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.maxFinite,
      height: context.height - Dimens.navbarHeight,
      child: Padding(
        padding: ResponsiveState.desktop.pagePadding,
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
            Row(
              children: ContactItem.values
                  .map((e) => Expanded(
                          child: ContactCard(
                        e,
                        state: ResponsiveState.desktop,
                      )))
                  .separated(
                    const SizedBox(width: 16),
                  )
                  .toList(),
            ),
            const SizedBox(height: 24),
            AppText(
              StringConstants.technicalQuery,
              style: context.textTheme.titleLarge?.withBodyColor,
            ),
            const Spacer(),
            const ContactForm(state: ResponsiveState.desktop),
            const Spacer(),
            const SocialRow(center: true, showName: true),
          ],
        ),
      ),
    );
  }
}
