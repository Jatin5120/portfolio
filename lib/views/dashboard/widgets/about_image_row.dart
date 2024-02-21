import 'package:flutter/material.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/views/views.dart';

class AboutImageRow extends StatelessWidget {
  const AboutImageRow({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(top: AppConstants.aboutMeImageSpace),
      child: const Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          ProfileImage(),
          Quote(),
        ],
      ),
    );
  }
}
