part of 'testimonials.dart';

class _TestimonialsMobile extends StatelessWidget {
  const _TestimonialsMobile();

  @override
  Widget build(BuildContext context) {
    return GetBuilder<DashboardController>(
      id: Testimonials.updateId,
      builder: (controller) {
        if (controller.testimonials.isEmpty) {
          return const SizedBox.shrink();
        }
        return Column(
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
            SizedBox(
              height: context.testimonialHeight,
              child: InfiniteCarousel.builder(
                itemCount: controller.testimonials.length,
                itemExtent: context.testimonialExtent,
                center: true,
                axisDirection: Axis.horizontal,
                loop: true,
                scrollBehavior: ScrollConfiguration.of(context).copyWith(
                  dragDevices: {...PointerDeviceKind.values},
                ),
                itemBuilder: (_, index, __) => TestimonialCard(controller.testimonials[index]),
              ),
            ),
          ],
        );
      },
    );
  }
}
