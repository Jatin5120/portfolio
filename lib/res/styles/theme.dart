import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:portfolio/res/res.dart';

class AppTheme {
  const AppTheme._();

  static ThemeData get lightTheme => ThemeData(
        useMaterial3: true,
        brightness: Brightness.light,
        primaryColor: AppColors.primary,
        scaffoldBackgroundColor: AppColors.backgroundLight,
        canvasColor: AppColors.backgroundLight,
        cardTheme: const CardTheme(
          color: AppColors.cardLight,
          elevation: 0,
        ),
        textTheme: _textTheme,
      );

  static ThemeData get darkTheme => ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        primaryColor: AppColors.primary,
        scaffoldBackgroundColor: AppColors.backgroundDark,
        canvasColor: AppColors.backgroundDark,
        cardTheme: const CardTheme(
          color: AppColors.cardDark,
          elevation: 0,
        ),
        textTheme: _textTheme,
      );

  static TextTheme get _textTheme => GoogleFonts.getTextTheme('Roboto');
}
