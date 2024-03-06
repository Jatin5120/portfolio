import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:portfolio/models/models.dart';

class ProjectsModel {
  const ProjectsModel({
    required this.name,
    required this.description,
    required this.technologies,
    required this.images,
    required this.links,
  });

  factory ProjectsModel.fromMap(Map<String, dynamic> map) {
    return ProjectsModel(
      name: map['name'] as String,
      description: map['description'] as String,
      technologies: (map['technologies'] as List<dynamic>)
          .map(
            (e) => TechnologyModel.fromMap({'reference': e}),
          )
          .toList(),
      images: (map['images'] as List<dynamic>? ?? []).cast<String>(),
      links: (map['links'] as List<dynamic>? ?? []).cast<Map<String, dynamic>>().map(LinksModel.fromMap).toList(),
    );
  }

  factory ProjectsModel.fromJson(String source) => ProjectsModel.fromMap(json.decode(source) as Map<String, dynamic>);

  final String name;
  final String description;
  final List<TechnologyModel> technologies;
  final List<String> images;
  final List<LinksModel> links;

  ProjectsModel copyWith({
    String? name,
    String? description,
    List<TechnologyModel>? technologies,
    List<String>? images,
    List<LinksModel>? links,
  }) {
    return ProjectsModel(
      name: name ?? this.name,
      description: description ?? this.description,
      technologies: technologies ?? this.technologies,
      images: images ?? this.images,
      links: links ?? this.links,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'name': name,
      'description': description,
      'technologies': technologies,
      'images': images,
      'links': links.map((x) => x.toMap()).toList(),
    };
  }

  String toJson() => json.encode(toMap());

  @override
  String toString() {
    return 'ProjectsModel(name: $name, description: $description, technologies: $technologies, images: $images, links: $links)';
  }

  @override
  bool operator ==(covariant ProjectsModel other) {
    if (identical(this, other)) return true;

    return other.name == name &&
        other.description == description &&
        listEquals(other.technologies, technologies) &&
        listEquals(other.images, images) &&
        listEquals(other.links, links);
  }

  @override
  int get hashCode {
    return name.hashCode ^ description.hashCode ^ technologies.hashCode ^ images.hashCode ^ links.hashCode;
  }
}
