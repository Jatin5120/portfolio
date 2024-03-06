import 'dart:convert';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/widgets.dart';
import 'package:portfolio/utils/utils.dart';

class TechnologyModel {
  const TechnologyModel({
    required this.reference,
    this.icon = '',
    this.label = '',
    this.color,
  });

  factory TechnologyModel.fromMap(Map<String, dynamic> map) {
    return TechnologyModel(
      reference: map['reference'] as DocumentReference,
      icon: map['icon'] as String? ?? '',
      label: map['label'] as String? ?? '',
      color: (map['color'] as String?).color,
    );
  }

  factory TechnologyModel.fromJson(String source) => TechnologyModel.fromMap(json.decode(source) as Map<String, dynamic>);

  final DocumentReference reference;
  final String icon;
  final String label;
  final Color? color;

  TechnologyModel copyWith({
    DocumentReference? reference,
    String? icon,
    String? label,
    Color? color,
  }) {
    return TechnologyModel(
      reference: reference ?? this.reference,
      icon: icon ?? this.icon,
      label: label ?? this.label,
      color: color ?? this.color,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'reference': reference,
      'icon': icon,
      'label': label,
      'color': color?.value,
    };
  }

  String toJson() => json.encode(toMap());

  @override
  String toString() {
    return 'TechnologyModel(reference: $reference, icon: $icon, label: $label, color: $color)';
  }

  @override
  bool operator ==(covariant TechnologyModel other) {
    if (identical(this, other)) return true;

    return other.reference == reference && other.icon == icon && other.label == label && other.color == color;
  }

  @override
  int get hashCode {
    return reference.hashCode ^ icon.hashCode ^ label.hashCode ^ color.hashCode;
  }
}
