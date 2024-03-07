import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:portfolio/models/models.dart';

class AppCollections {
  const AppCollections._();

  static final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  static final projects = _firestore.collection('projects').orderBy('order').withConverter<ProjectsModel>(
        fromFirestore: (snapshot, _) => ProjectsModel.fromMap(snapshot.data()!),
        toFirestore: (data, _) => data.toMap(),
      );

  static final testimonials =
      _firestore.collection('testimonials').where('visible', isEqualTo: true).orderBy('order').withConverter<TestimonialModel>(
            fromFirestore: (snapshot, _) => TestimonialModel.fromMap(snapshot.data()!),
            toFirestore: (data, _) => data.toMap(),
          );
}
