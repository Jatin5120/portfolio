import 'dart:convert';

import 'package:portfolio/utils/utils.dart';

class LinksModel {
  const LinksModel({
    required this.type,
    required this.url,
  });

  factory LinksModel.fromMap(Map<String, dynamic> map) {
    return LinksModel(
      type: LinkType.fromValue(map['type'] as int? ?? 1),
      url: map['url'] as String? ?? '',
    );
  }

  factory LinksModel.fromJson(String source) => LinksModel.fromMap(json.decode(source) as Map<String, dynamic>);

  final LinkType type;
  final String url;

  LinksModel copyWith({
    LinkType? type,
    String? url,
  }) {
    return LinksModel(
      type: type ?? this.type,
      url: url ?? this.url,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'type': type.value,
      'url': url,
    };
  }

  String toJson() => json.encode(toMap());

  @override
  String toString() => 'LinksModel(type: $type, url: $url)';

  @override
  bool operator ==(covariant LinksModel other) {
    if (identical(this, other)) return true;

    return other.type == type && other.url == url;
  }

  @override
  int get hashCode => type.hashCode ^ url.hashCode;
}
