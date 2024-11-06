import 'dart:convert';

import 'package:portfolio/utils/utils.dart';

class LinksModel {
  const LinksModel({
    required this.type,
    required this.url,
    required this.enabled,
  });

  factory LinksModel.fromMap(Map<String, dynamic> map) {
    return LinksModel(
      type: LinkType.fromValue(map['type'] as int? ?? 1),
      url: map['url'] as String? ?? '',
      enabled: map['enabled'] as bool? ?? true,
    );
  }

  factory LinksModel.fromJson(String source) => LinksModel.fromMap(json.decode(source) as Map<String, dynamic>);

  final LinkType type;
  final String url;
  final bool enabled;

  LinksModel copyWith({
    LinkType? type,
    String? url,
    bool? enabled,
  }) {
    return LinksModel(
      type: type ?? this.type,
      url: url ?? this.url,
      enabled: enabled ?? this.enabled,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'type': type.value,
      'url': url,
      'enabled': enabled,
    };
  }

  String toJson() => json.encode(toMap());

  @override
  String toString() => 'LinksModel(type: $type, url: $url, enabled: $enabled)';

  @override
  bool operator ==(covariant LinksModel other) {
    if (identical(this, other)) return true;

    return other.type == type && other.url == url && other.enabled == enabled;
  }

  @override
  int get hashCode => type.hashCode ^ url.hashCode ^ enabled.hashCode;
}
