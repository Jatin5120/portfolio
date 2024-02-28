import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class Dimens {
  const Dimens._();

  /// Get the height with the percent value of the screen height.
  static double percentHeight(double percentValue) => percentValue.sh;

  /// Get the width with the percent value of the screen width.
  static double percentWidth(double percentValue) => percentValue.sw;

  static const double navbarHeight = 64;

  static double get zero => 0.sp;
  static double get one => 1.sp;
  static double get two => 2.sp;
  static double get four => 4.sp;
  static double get five => 5.sp;
  static double get six => 6.sp;

  static double get eight => 8.sp;
  static double get nine => 9.sp;
  static double get ten => 10.sp;
  static double get twelve => 12.sp;

  static double get fifteen => 15.sp;
  static double get sixteen => 16.sp;
  static double get twenty => 20.sp;
  static double get twentyFour => 24.sp;
  static double get twentyFive => 25.sp;

  static double get thirty => 30.sp;
  static double get thirtyTwo => 32.sp;

  static double get forty => 40.sp;
  static double get fifty => 50.sp;
  static double get fiftyFive => 55.sp;
  static double get sixty => 60.sp;
  static double get sixtyFour => 64.sp;
  static double get seventyEight => 78.sp;

  static double get eighty => 80.sp;
  static double get ninty => 90.sp;

  static double get hundred => 100.sp;
  static double get oneHundredTwenty => 120.sp;
  static double get hundredFourty => 140.sp;
  static double get oneHundredFifty => 150.sp;
  static double get oneHundredSeventy => 170.sp;
  static double get twoHundred => 200.sp;
  static double get twoHundredTwenty => 220.sp;
  static double get twoHundredFifty => 250.sp;

  static Widget get box0 => SizedBox(height: zero);

  static Widget get boxHeight2 => SizedBox(height: two);
  static Widget get boxHeight4 => SizedBox(height: four);
  static Widget get boxHeight5 => SizedBox(height: five);
  static Widget get boxHeight8 => SizedBox(height: eight);
  static Widget get boxHeight10 => SizedBox(height: ten);
  static Widget get boxHeight12 => SizedBox(height: twelve);
  static Widget get boxHeight16 => SizedBox(height: sixteen);
  static Widget get boxHeight20 => SizedBox(height: twenty);
  static Widget get boxHeight24 => SizedBox(height: twentyFour);
  static Widget get boxHeight32 => SizedBox(height: thirtyTwo);
  static Widget get boxHeight50 => SizedBox(height: fifty);

  static Widget get boxWidth2 => SizedBox(width: two);
  static Widget get boxWidth4 => SizedBox(width: four);
  static Widget get boxWidth8 => SizedBox(width: eight);
  static Widget get boxWidth10 => SizedBox(width: ten);
  static Widget get boxWidth12 => SizedBox(width: twelve);
  static Widget get boxWidth16 => SizedBox(width: sixteen);
  static Widget get boxWidth20 => SizedBox(width: twenty);
  static Widget get boxWidth24 => SizedBox(width: twentyFour);
  static Widget get boxWidth32 => SizedBox(width: thirtyTwo);

  static const EdgeInsets edgeInsets0 = EdgeInsets.zero;
  static EdgeInsets get edgeInsets4 => EdgeInsets.all(four);
  static EdgeInsets get edgeInsets5 => EdgeInsets.all(five);
  static EdgeInsets get edgeInsets6 => EdgeInsets.all(six);
  static EdgeInsets get edgeInsets8 => EdgeInsets.all(eight);
  static EdgeInsets get edgeInsets10 => EdgeInsets.all(ten);
  static EdgeInsets get edgeInsets12 => EdgeInsets.all(twelve);
  static EdgeInsets get edgeInsets16 => EdgeInsets.all(sixteen);
  static EdgeInsets get edgeInsets24 => EdgeInsets.all(twentyFour);

  static EdgeInsets get edgeInsetsL2 => EdgeInsets.only(left: two);

  static EdgeInsets get edgeInsetsL4 => EdgeInsets.only(left: four);
  static EdgeInsets get edgeInsetsR4 => EdgeInsets.only(right: four);

  static EdgeInsets get edgeInsets2_0 => EdgeInsets.symmetric(horizontal: two);
  static EdgeInsets get edgeInsets4_0 => EdgeInsets.symmetric(horizontal: four);
  static EdgeInsets get edgeInsets8_0 => EdgeInsets.symmetric(horizontal: eight);
  static EdgeInsets edgeInsets10_0 = EdgeInsets.symmetric(horizontal: ten);

  static EdgeInsets get edgeInsets0_4 => EdgeInsets.symmetric(vertical: four);
  static EdgeInsets get edgeInsets0_8 => EdgeInsets.symmetric(vertical: eight);

  static EdgeInsets get edgeInsets4_8 => EdgeInsets.symmetric(horizontal: four, vertical: eight);
  static EdgeInsets get edgeInsets8_4 => EdgeInsets.symmetric(horizontal: eight, vertical: four);
  static EdgeInsets get edgeInsets16_8 => EdgeInsets.symmetric(horizontal: sixteen, vertical: eight);
}
