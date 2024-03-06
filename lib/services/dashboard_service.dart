import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:portfolio/models/models.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';

class DashboardService {
  const DashboardService();

  FirebaseFirestore get _firestore => FirebaseFirestore.instance;

  Future<List<ProjectsModel>> getProjects() async {
    try {
      final projects = await _firestore.collection(AppCollections.projects).orderBy('order').get();

      final list = projects.docs.map((e) {
        return ProjectsModel.fromMap(e.data());
      }).toList();
      for (final project in list) {
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
      return list;
    } catch (e, st) {
      AppLog.error(e, st);
      return [];
    }
  }
}
