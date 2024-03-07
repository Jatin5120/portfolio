import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/widgets/widgets.dart';

class NavDrawer extends StatelessWidget {
  const NavDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Align(
              alignment: Alignment.topRight,
              child: IconButton(
                onPressed: () => Get.find<DashboardController>().toggleDrawer(false),
                icon: const Icon(Icons.close_rounded),
              ),
            ),
            ...NavItem.visible.map(NavLink.new).separated(
                  const SizedBox(height: 16),
                ),
          ],
        ),
      ),
    );
  }
}
