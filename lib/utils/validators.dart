import 'package:get/get.dart';

class AppValidators {
  const AppValidators._();

  static String? emailValidator(String? value) {
    if (value == null || value.trim().isEmpty) {
      return '*Required';
    }
    if (!value.isEmail) {
      return 'Invalid Email';
    }
    return null;
  }

  static String? nameValidator(String? value) {
    if (value == null || value.trim().isEmpty) {
      return '*Required';
    }
    return null;
  }
}
