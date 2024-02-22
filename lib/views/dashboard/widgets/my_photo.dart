import 'package:flutter/material.dart';
import 'package:portfolio/res/res.dart';

class ProfileImage extends StatelessWidget {
  const ProfileImage({
    super.key,
    this.small = false,
  });

  final bool small;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      key: const ValueKey('profile-image'),
      height: AppConstants.profileImageSize(small),
      width: AppConstants.profileImageSize(small),
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: AppColors.primary.shade100,
          borderRadius: BorderRadius.circular(
            AppConstants.profileImageSize(small),
          ),
          image: const DecorationImage(
            image: AssetImage(AssetConstants.cartoonDp),
          ),
        ),
      ),
    );
  }
}
