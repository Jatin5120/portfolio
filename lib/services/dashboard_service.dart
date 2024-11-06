import 'package:flutter/foundation.dart';
import 'package:portfolio/models/models.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';

class DashboardService {
  DashboardService();

  List<ProjectsModel> _cachedProjects = [];

  Future<List<ProjectsModel>> getProjects() async {
    try {
      if (_cachedProjects.isNotEmpty) {
        return _cachedProjects;
      }

      final data = await AppCollections.projects.get();
      final projects = data.docs.map((e) => e.data());

      for (final project in projects) {
        final techs = await Future.wait(project.technologies.map((e) => e.reference.get()));
        for (var i = 0; i < techs.length; i++) {
          final tech = techs[i];
          var data = <String, dynamic>{
            'reference': tech.reference,
            ...tech.data() as Map,
          };
          project.technologies[i] = TechnologyModel.fromMap(data);
        }
      }
      _cachedProjects = [...projects];
      return _cachedProjects;
    } catch (e, st) {
      AppLog.error(e, st);
      return [];
    }
  }

  Future<List<TestimonialModel>> getTestimonials() async {
    try {
      final data = await AppCollections.getTestimonials.get();
      final testimonials = data.docs.map((e) => e.data());
      return testimonials.toList();
    } catch (e, st) {
      if (kDebugMode) {
        print(e);
      }
      AppLog.error(e, st);
      return [];
    }
  }

  Future<bool> requestContact(ContactModel contact) async {
    try {
      final model = await AppCollections.contacts.add(contact);
      return model.id.isNotEmpty;
    } catch (e, st) {
      AppLog.error(e, st);
      return false;
    }
  }
}
