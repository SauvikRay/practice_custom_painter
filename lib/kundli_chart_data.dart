import 'package:flutter/material.dart';

class ChartPlanet {
  const ChartPlanet({
    required this.id,
    required this.name,
    required this.degree,
    required this.color,
    this.retrograde = false,
  });

  final String id;
  final String name;
  final double degree;
  final Color color;
  final bool retrograde;
}

class KundliChartConfig {
  const KundliChartConfig({
    required this.houseCusps,
    required this.planets,
    this.rotationOffsetDeg = 285,
    this.showHouseLines = true,
  });

  final List<double> houseCusps;
  final List<ChartPlanet> planets;
  final double rotationOffsetDeg;
  final bool showHouseLines;

  static const List<String> nakshatraNames = [
    'Ashwini',
    'Bharani',
    'Krittika',
    'Rohini',
    'Mrigashira',
    'Ardra',
    'Punarvasu',
    'Pushya',
    'Ashlesha',
    'Magha',
    'P.Phalguni',
    'U.Phalguni',
    'Hasta',
    'Chitra',
    'Swati',
    'Vishakha',
    'Anuradha',
    'Jyeshtha',
    'Moola',
    'P.Ashadha',
    'U.Ashadha',
    'Shravana',
    'Dhanishtha',
    'Shatabhisha',
    'P.Bd.Pada',
    'U.Bd.Pada',
    'Revati',
  ];

  KundliChartConfig copyWith({
    List<double>? houseCusps,
    List<ChartPlanet>? planets,
    double? rotationOffsetDeg,
    bool? showHouseLines,
  }) {
    return KundliChartConfig(
      houseCusps: houseCusps ?? this.houseCusps,
      planets: planets ?? this.planets,
      rotationOffsetDeg: rotationOffsetDeg ?? this.rotationOffsetDeg,
      showHouseLines: showHouseLines ?? this.showHouseLines,
    );
  }

  static const KundliChartConfig sample = KundliChartConfig(
    houseCusps: [
      12,
      42,
      73,
      102,
      131,
      160,
      192,
      223,
      254,
      283,
      312,
      341,
    ],
    planets: [
      ChartPlanet(id: 'Su', name: 'Sun', degree: 307.2, color: Color(0xFF177E89)),
      ChartPlanet(id: 'Mo', name: 'Moon', degree: 181.1, color: Color(0xFF2CA25F)),
      ChartPlanet(id: 'Ma', name: 'Mars', degree: 322.8, color: Color(0xFFCC0000)),
      ChartPlanet(id: 'Me', name: 'Mercury', degree: 301.8, color: Color(0xFF7F5539), retrograde: true),
      ChartPlanet(id: 'Ju', name: 'Jupiter', degree: 248.2, color: Color(0xFF8D5A97), retrograde: true),
      ChartPlanet(id: 'Ve', name: 'Venus', degree: 295.6, color: Color(0xFF2E7D32)),
      ChartPlanet(id: 'Sa', name: 'Saturn', degree: 292.4, color: Color(0xFF4A34A8), retrograde: true),
      ChartPlanet(id: 'Ra', name: 'Rahu', degree: 277.2, color: Color(0xFF689F38), retrograde: true),
      ChartPlanet(id: 'Ke', name: 'Ketu', degree: 97.2, color: Color(0xFF6A1B9A), retrograde: true),
      ChartPlanet(id: 'Asc', name: 'Ascendant', degree: 120.0, color: Color(0xFF555555)),
    ],
  );
}
