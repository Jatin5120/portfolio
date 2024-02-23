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

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      useInheritedMediaQuery: true,
      designSize: const Size(1920, 1200),
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (_, child) => child!,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: Utility.hideKeyboard,
        child: GetMaterialApp(
          debugShowCheckedModeBanner: false,
          theme: AppTheme.lightTheme,
          darkTheme: AppTheme.darkTheme,
          themeMode: ThemeMode.dark,
          initialRoute: AppPages.initial,
          getPages: AppPages.pages,
        ),
      ),
    );
  }
}
