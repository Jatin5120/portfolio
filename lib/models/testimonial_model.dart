import 'dart:convert';

import 'package:portfolio/utils/utils.dart';

class TestimonialModel {
  const TestimonialModel({
    required this.name,
    required this.designation,
    required this.message,
    this.status = TestimonialStatus.pending,
    this.order = 1,
    this.visible = true,
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
  final int order;
  final bool visible;

  TestimonialModel copyWith({
    String? name,
    String? designation,
    String? message,
    TestimonialStatus? status,
    int? order,
    bool? visible,
  }) {
    return TestimonialModel(
      name: name ?? this.name,
      designation: designation ?? this.designation,
      message: message ?? this.message,
      status: status ?? this.status,
      order: order ?? this.order,
      visible: visible ?? this.visible,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'name': name,
      'designation': designation,
      'message': message,
      'status': status.name,
      'order': order,
      'visible': visible,
    };
  }

  String toJson() => json.encode(toMap());

  @override
  String toString() =>
      'TestimonialModel(name: $name, designation: $designation, message: $message, status: $status, order: $order, visible: $visible)';

  @override
  bool operator ==(covariant TestimonialModel other) {
    if (identical(this, other)) return true;

    return other.name == name &&
        other.designation == designation &&
        other.message == message &&
        other.status == status &&
        other.order == order &&
        other.visible == visible;
  }

  @override
  int get hashCode => name.hashCode ^ designation.hashCode ^ message.hashCode ^ status.hashCode ^ order.hashCode ^ visible.hashCode;
}
