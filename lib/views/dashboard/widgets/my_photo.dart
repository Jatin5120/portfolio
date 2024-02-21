import 'package:flutter/material.dart';
import 'package:portfolio/res/res.dart';

class ProfileImage extends StatelessWidget {
  const ProfileImage({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      key: const ValueKey('profile-image'),
      height: AppConstants.profileImageSize,
      width: AppConstants.profileImageSize,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: AppColors.primary.shade100,
          borderRadius: BorderRadius.circular(
            AppConstants.profileImageSize,
          ),
          image: const DecorationImage(
            image: AssetImage(AssetConstants.cartoonDp),
          ),
        ),
      ),
    );
  }
}
