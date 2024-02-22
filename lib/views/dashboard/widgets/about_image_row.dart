import 'package:flutter/material.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/views/views.dart';

class AboutImageRow extends StatelessWidget {
  const AboutImageRow({
    super.key,
    this.small = false,
    this.isMobile = false,
  });

  final bool small;
  final bool isMobile;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        top: AppConstants.aboutMeImageSpace(small),
      ),
      child: isMobile
          ? Column(
              children: [
                Align(
                  alignment: Alignment.topLeft,
                  child: ProfileImage(small: small),
                ),
                const SizedBox(height: 4),
                Align(
                  alignment: Alignment.bottomRight,
                  child: Quote(small: small),
                ),
              ],
            )
          : Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ProfileImage(small: small),
                Quote(small: small),
              ],
            ),
    );
  }
}
