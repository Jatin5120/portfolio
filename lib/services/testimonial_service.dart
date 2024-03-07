import 'package:flutter/foundation.dart';
import 'package:portfolio/models/models.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';

class TestimonialService {
  const TestimonialService();

  Future<bool> requestTestimonial(TestimonialModel testimonial) async {
    try {
      final model = await AppCollections.testimonials.add(testimonial);
      return model.id.isNotEmpty;
    } catch (e, st) {
      if (kDebugMode) {
        print(e);
      }
      AppLog.error(e, st);
      return false;
    }
  }
}
