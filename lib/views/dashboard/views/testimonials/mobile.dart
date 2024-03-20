part of 'testimonials.dart';

class _TestimonialsMobile extends StatelessWidget {
  const _TestimonialsMobile();

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        maxWidth: context.width,
        minHeight: context.height - Dimens.navbarHeight,
      ),
      child: GetBuilder<DashboardController>(
        id: Testimonials.updateId,
        builder: (controller) {
          if (controller.testimonials.isEmpty) {
            return const SizedBox.shrink();
          }
          return Padding(
            padding: EdgeInsets.symmetric(
              vertical: context.responsiveState.pagePadding.top,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Padding(
                  padding: context.responsiveState.pagePadding,
                  child: Column(
                    children: [
                      AppText(
                        StringConstants.testimonials,
                        style: context.textTheme.headlineLarge?.withTitleColor,
                      ),
                      Dimens.boxHeight16,
                      AppText(
                        StringConstants.testimonialDescription,
                        style: context.textTheme.titleLarge?.withBodyColor,
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
                Dimens.boxHeight24,
                Stack(
                  alignment: Alignment.center,
                  children: [
                    Center(
                      child: AppIcon(
                        context.responsiveState.isMobile ? AssetConstants.testimonialBgMobile : AssetConstants.testimonialBg,
                      ),
                    ),
                    SizedBox(
                      height: context.testimonialHeight,
                      child: PageView.builder(
                        itemCount: controller.testimonials.length * 5,
                        controller: controller.testimonialController,
                        physics: const NeverScrollableScrollPhysics(),
                        itemBuilder: (_, index) => TestimonialCard(
                          controller.testimonials[index % controller.testimonials.length],
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 24),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.center,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    IconButton(
                      onPressed: controller.previousTestimonial,
                      icon: const AppIcon(AssetConstants.arrowLeft),
                    ),
                    const SizedBox(width: 16),
                    IconButton(
                      onPressed: controller.nextTestimonial,
                      icon: const AppIcon(AssetConstants.arrowRight),
                    ),
                  ],
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
