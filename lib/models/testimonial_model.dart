import 'dart:convert';

class TestimonialModel {
  const TestimonialModel({
    required this.name,
    required this.designation,
    required this.message,
  });

  factory TestimonialModel.fromMap(Map<String, dynamic> map) {
    return TestimonialModel(
      name: map['name'] as String,
      designation: map['designation'] as String,
      message: map['message'] as String,
    );
  }

  factory TestimonialModel.fromJson(String source) => TestimonialModel.fromMap(json.decode(source) as Map<String, dynamic>);

  final String name;
  final String designation;
  final String message;

  TestimonialModel copyWith({
    String? name,
    String? designation,
    String? message,
  }) {
    return TestimonialModel(
      name: name ?? this.name,
      designation: designation ?? this.designation,
      message: message ?? this.message,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'name': name,
      'designation': designation,
      'message': message,
    };
  }

  String toJson() => json.encode(toMap());

  @override
  String toString() => 'TestimonialModel(name: $name, designation: $designation, message: $message)';

  @override
  bool operator ==(covariant TestimonialModel other) {
    if (identical(this, other)) return true;

    return other.name == name && other.designation == designation && other.message == message;
  }

  @override
  int get hashCode => name.hashCode ^ designation.hashCode ^ message.hashCode;
}
