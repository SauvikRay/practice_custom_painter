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

double planetBaseRadiusFactor(String planetName) {
  switch (planetName.toLowerCase()) {
    case 'moon':
      return 0.40;
    case 'rahu':
    case 'ketu':
      return 0.50;
    case 'venus':
      return 0.58;
    case 'mercury':
    case 'marcary':
      return 0.66;
    case 'sun':
      return 0.74;
    case 'mars':
      return 0.82;
    case 'jupiter':
      return 0.88;
    case 'ascendant':
    case 'asc':
      return 0.94;
    case 'saturn':
      return 1.00;
    default:
      return 0.74;
  }
}

Map<int, double> buildPlanetRadiusFactors(
  List<ChartPlanet> planets, {
  double clusterThresholdDeg = 12,
  double radiusStep = 0.028,
}) {
  if (planets.isEmpty) return const {};

  final List<int> sorted = List<int>.generate(planets.length, (i) => i)
    ..sort((a, b) => _normalizeDeg(planets[a].degree).compareTo(
          _normalizeDeg(planets[b].degree),
        ));

  final List<List<int>> clusters = <List<int>>[];
  List<int> current = <int>[sorted.first];

  for (int i = 1; i < sorted.length; i++) {
    final int prev = sorted[i - 1];
    final int next = sorted[i];
    final double prevDeg = _normalizeDeg(planets[prev].degree);
    final double nextDeg = _normalizeDeg(planets[next].degree);
    if (nextDeg - prevDeg <= clusterThresholdDeg) {
      current.add(next);
    } else {
      clusters.add(current);
      current = <int>[next];
    }
  }
  clusters.add(current);

  if (clusters.length > 1) {
    final List<int> first = clusters.first;
    final List<int> last = clusters.last;
    final double firstDeg = _normalizeDeg(planets[first.first].degree);
    final double lastDeg = _normalizeDeg(planets[last.last].degree);
    if (360 - lastDeg + firstDeg <= clusterThresholdDeg) {
      clusters[0] = <int>[...last, ...first];
      clusters.removeLast();
    }
  }

  final Map<int, double> factors = <int, double>{};
  for (final List<int> cluster in clusters) {
    for (int i = 0; i < cluster.length; i++) {
      final int index = cluster[i];
      final double centeredOffset = i - (cluster.length - 1) / 2;
      final double factor =
          planetBaseRadiusFactor(planets[index].name) + centeredOffset * radiusStep;
      factors[index] = factor.clamp(0.36, 1.06);
    }
  }
  return factors;
}

double _normalizeDeg(double d) {
  double v = d % 360;
  if (v < 0) v += 360;
  return v;
}
