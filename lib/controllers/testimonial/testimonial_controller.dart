import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/models/models.dart';
import 'package:portfolio/services/services.dart';
import 'package:portfolio/utils/utils.dart';

class TestimonialController extends GetxController {
  TestimonialController(this._service);
  final TestimonialService _service;
  final formKey = GlobalKey<FormState>();

  final nameController = TextEditingController();
  final designationController = TextEditingController();
  final messageController = TextEditingController();

  final Rx<AvatarItem> _selectedAvatar = AvatarItem.avatar1.obs;
  AvatarItem get selectedAvatar => _selectedAvatar.value;
  set selectedAvatar(AvatarItem value) => _selectedAvatar.value = value;

  void requestTestimonial() async {
    if (!formKey.currentState!.validate()) {
      return;
    }
    Utility.showLoader();
    final testimonial = TestimonialModel(
      name: nameController.text.trim(),
      designation: designationController.text.trim(),
      message: messageController.text.trim(),
      status: TestimonialStatus.pending,
      avatar: selectedAvatar,
    );
    final requested = await _service.requestTestimonial(testimonial);
    Utility.hideLoader();
    if (requested) {
      formKey.currentState!.reset();
      nameController.clear();
      designationController.clear();
      messageController.clear();
    }
  }
}
