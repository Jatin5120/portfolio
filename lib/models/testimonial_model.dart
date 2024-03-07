import 'dart:convert';

import 'package:portfolio/utils/utils.dart';

class TestimonialModel {
  const TestimonialModel({
    required this.name,
    required this.designation,
    required this.message,
    required this.status,
  });

  factory TestimonialModel.fromMap(Map<String, dynamic> map) {
    return TestimonialModel(
      name: map['name'] as String,
      designation: map['designation'] as String,
      message: map['message'] as String,
      status: TestimonialStatus.fromName(map['status'] as String? ?? ''),
    );
  }

  factory TestimonialModel.fromJson(String source) => TestimonialModel.fromMap(json.decode(source) as Map<String, dynamic>);

  final String name;
  final String designation;
  final String message;
  final TestimonialStatus status;

  TestimonialModel copyWith({
    String? name,
    String? designation,
    String? message,
    TestimonialStatus? status,
  }) {
    return TestimonialModel(
      name: name ?? this.name,
      designation: designation ?? this.designation,
      message: message ?? this.message,
      status: status ?? this.status,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'name': name,
      'designation': designation,
      'message': message,
      'status': status,
    };
  }

  String toJson() => json.encode(toMap());

  @override
  String toString() => 'TestimonialModel(name: $name, designation: $designation, message: $message, status: $status)';

  @override
  bool operator ==(covariant TestimonialModel other) {
    if (identical(this, other)) return true;

    return other.name == name && other.designation == designation && other.message == message && other.status == status;
  }

  @override
  int get hashCode => name.hashCode ^ designation.hashCode ^ message.hashCode ^ status.hashCode;
}
