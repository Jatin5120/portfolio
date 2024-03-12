import 'package:flutter/material.dart';
import 'package:portfolio/utils/utils.dart';

class Avatar extends StatelessWidget {
  const Avatar(this.avatar, {super.key});

  final AvatarItem avatar;

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      avatar.imagePath,
      width: 40,
      height: 40,
      fit: BoxFit.cover,
    );
  }
}
