import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:portfolio/models/models.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';

class DashboardService {
  const DashboardService();

  FirebaseFirestore get _firestore => FirebaseFirestore.instance;

  Future<List<ProjectsModel>> getProjects() async {
    try {
      final projects = await _firestore.collection(AppCollections.projects).get();

      return projects.docs.map((e) => ProjectsModel.fromMap(e.data())).toList();
    } catch (e, st) {
      AppLog.error(e, st);
      return [];
    }
  }
}
