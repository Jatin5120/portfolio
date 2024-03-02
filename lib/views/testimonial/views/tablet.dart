part of '../testimonial_view.dart';

class _TestimonialViewTablet extends StatelessWidget {
  const _TestimonialViewTablet();

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        maxWidth: context.width,
        minHeight: context.height - Dimens.navbarHeight,
        maxHeight: max(700, context.height - Dimens.navbarHeight),
      ),
      child: Padding(
        padding: ResponsiveState.tablet.pagePadding,
        child: const Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [],
        ),
      ),
    );
  }
}
