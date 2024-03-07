import 'dart:convert';

class ContactModel {
  const ContactModel({
    required this.name,
    required this.email,
    required this.subject,
    required this.message,
    this.acknowledged = false,
  });

  factory ContactModel.fromMap(Map<String, dynamic> map) {
    return ContactModel(
      name: map['name'] as String,
      email: map['email'] as String,
      subject: map['subject'] as String,
      message: map['message'] as String,
      acknowledged: map['acknowledged'] as bool,
    );
  }

  factory ContactModel.fromJson(String source) => ContactModel.fromMap(json.decode(source) as Map<String, dynamic>);

  final String name;
  final String email;
  final String subject;
  final String message;
  final bool acknowledged;

  ContactModel copyWith({
    String? name,
    String? email,
    String? subject,
    String? message,
    bool? acknowledged,
  }) {
    return ContactModel(
      name: name ?? this.name,
      email: email ?? this.email,
      subject: subject ?? this.subject,
      message: message ?? this.message,
      acknowledged: acknowledged ?? this.acknowledged,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'name': name,
      'email': email,
      'subject': subject,
      'message': message,
      'acknowledged': acknowledged,
    };
  }

  String toJson() => json.encode(toMap());

  @override
  String toString() {
    return 'ContactModel(name: $name, email: $email, subject: $subject, message: $message, acknowledged: $acknowledged)';
  }

  @override
  bool operator ==(covariant ContactModel other) {
    if (identical(this, other)) return true;

    return other.name == name && other.email == email && other.subject == subject && other.message == message && other.acknowledged == acknowledged;
  }

  @override
  int get hashCode {
    return name.hashCode ^ email.hashCode ^ subject.hashCode ^ message.hashCode ^ acknowledged.hashCode;
  }
}
