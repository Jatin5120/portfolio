part of 'contact_view.dart';

class _ContactViewDesktopLarge extends StatelessWidget {
  const _ContactViewDesktopLarge();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.maxFinite,
      height: Get.height - Dimens.navbarHeight,
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
            const SizedBox(height: 24),
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
            const Spacer(),
            const ContactForm(state: ResponsiveState.desktopLarge),
            const Spacer(),
            const SocialRow(center: true, showName: true),
          ],
        ),
      ),
    );
  }
}
