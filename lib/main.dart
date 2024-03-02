import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_web_plugins/url_strategy.dart';
import 'package:get/get.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';

void main() {
  _setup();
  usePathUrlStrategy();
  runApp(const MyApp());
}

void _setup() {
  WidgetsFlutterBinding.ensureInitialized();
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      useInheritedMediaQuery: true,
      designSize: context.referenceSize,
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (_, child) => child!,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: Utility.hideKeyboard,
        child: GetMaterialApp(
          title: 'Jatin | Flutter Developer',
          debugShowCheckedModeBanner: false,
          theme: AppTheme.lightTheme,
          darkTheme: AppTheme.darkTheme,
          themeMode: ThemeMode.dark,
          initialRoute: AppPages.initial,
          getPages: AppPages.pages,
          unknownRoute: AppPages.dashboard,
        ),
      ),
    );
  }
}
