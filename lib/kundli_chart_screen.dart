import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:kundli/asset_res.dart';
import 'package:kundli/kundli_chart_data.dart';
import 'package:kundli/kundli_chart_painter.dart';

final centricItem = [
  "Moon",
  "Rahu",
  "Ketu(Rahu and ketu are in the same radius)",
  "Venus",
  "Marcary",
  "Sun",
  "Mars",
  "Jupiter",
  "ASC",
  "Saturn",

  "Both yellow and planets are movable",
  "Rashi border are fixed",
];

class KundliChartScreen extends StatefulWidget {
  const KundliChartScreen({super.key});

  @override
  State<KundliChartScreen> createState() => _KundliChartScreenState();
}

class _KundliChartScreenState extends State<KundliChartScreen> {
  int _selectedPreset = 0;

  late final List<KundliChartConfig> _presets = [
    _presetOne(),
    _presetTwo(),
    _presetThree(),
  ];

  @override
  Widget build(BuildContext context) {
    final KundliChartConfig chartConfig = _presets[_selectedPreset];

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('Kundli Canvas Chart'),
        backgroundColor: Colors.white,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 12, 12, 6),
            child: Row(
              children: List.generate(3, (i) {
                final bool active = i == _selectedPreset;
                return Expanded(
                  child: Padding(
                    padding: EdgeInsets.only(right: i == 2 ? 0 : 8),
                    child: ElevatedButton(
                      onPressed: () => setState(() => _selectedPreset = i),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: active
                            ? const Color(0xFFF39508)
                            : Colors.white,
                        foregroundColor: active
                            ? Colors.white
                            : const Color(0xFF4A4A4A),
                        elevation: 0,
                        side: const BorderSide(color: Color(0xFFBDBDBD)),
                        padding: const EdgeInsets.symmetric(vertical: 10),
                      ),
                      child: Text('Preset ${i + 1}'),
                    ),
                  ),
                );
              }),
            ),
          ),
          Expanded(
            child: Center(
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: AspectRatio(
                  aspectRatio: 1,
                  child: LayoutBuilder(
                    builder: (context, constraints) {
                      final double side = math.min(
                        constraints.maxWidth,
                        constraints.maxHeight,
                      );

                      return Container(
                        color: Colors.white,
                        child: Stack(
                          children: [
                            ..._buildFixedRashiImages(side),
                            Positioned.fill(
                              child: CustomPaint(
                                painter: KundliChartPainter(
                                  config: chartConfig,
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  KundliChartConfig _presetOne() {
    return KundliChartConfig.sample.copyWith(
      houseCusps: const [
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
      planets: const [
        ChartPlanet(
          id: 'Su',
          name: 'Sun',
          degree: 307.2,
          color: Color(0xFF177E89),
        ),
        ChartPlanet(
          id: 'Mo',
          name: 'Moon',
          degree: 181.1,
          color: Color(0xFF2CA25F),
        ),
        ChartPlanet(
          id: 'Ma',
          name: 'Mars',
          degree: 30,
          color: Color(0xFFCC0000),
        ),
        ChartPlanet(
          id: 'Me',
          name: 'Mercury',
          degree: 301.8,
          color: Color(0xFF7F5539),
          retrograde: true,
        ),
        ChartPlanet(
          id: 'Ju',
          name: 'Jupiter',
          degree: 248.2,
          color: Color(0xFF8D5A97),
          retrograde: true,
        ),
        ChartPlanet(
          id: 'Ve',
          name: 'Venus',
          degree: 295.6,
          color: Color(0xFF2E7D32),
        ),
        ChartPlanet(
          id: 'Sa',
          name: 'Saturn',
          degree: 292.4,
          color: Color(0xFF4A34A8),
          retrograde: true,
        ),
        ChartPlanet(
          id: 'Ra',
          name: 'Rahu',
          degree: 277.2,
          color: Color(0xFF689F38),
          retrograde: true,
        ),
        ChartPlanet(
          id: 'Ke',
          name: 'Ketu',
          degree: 97.2,
          color: Color(0xFF6A1B9A),
          retrograde: true,
        ),
        ChartPlanet(
          id: 'Asc',
          name: 'Ascendant',
          degree: 120.0,
          color: Color(0xFF555555),
        ),
      ],
      rotationOffsetDeg: 285,
      showHouseLines: true,
    );
  }

  KundliChartConfig _presetTwo() {
    return KundliChartConfig.sample.copyWith(
      houseCusps: const [5, 35, 66, 95, 126, 156, 186, 215, 246, 276, 306, 336],
      planets: const [
        ChartPlanet(
          id: 'Su',
          name: 'Sun',
          degree: 270.4,
          color: Color(0xFF177E89),
        ),
        ChartPlanet(
          id: 'Mo',
          name: 'Moon',
          degree: 210.7,
          color: Color(0xFF2CA25F),
        ),
        ChartPlanet(
          id: 'Ma',
          name: 'Mars',
          degree: 336.5,
          color: Color(0xFFCC0000),
        ),
        ChartPlanet(
          id: 'Me',
          name: 'Mercury',
          degree: 292.2,
          color: Color(0xFF7F5539),
        ),
        ChartPlanet(
          id: 'Ju',
          name: 'Jupiter',
          degree: 248.8,
          color: Color(0xFF8D5A97),
        ),
        ChartPlanet(
          id: 'Ve',
          name: 'Venus',
          degree: 309.9,
          color: Color(0xFF2E7D32),
          retrograde: true,
        ),
        ChartPlanet(
          id: 'Sa',
          name: 'Saturn',
          degree: 300.1,
          color: Color(0xFF4A34A8),
          retrograde: true,
        ),
        ChartPlanet(
          id: 'Ra',
          name: 'Rahu',
          degree: 278.4,
          color: Color(0xFF689F38),
          retrograde: true,
        ),
        ChartPlanet(
          id: 'Ke',
          name: 'Ketu',
          degree: 98.4,
          color: Color(0xFF6A1B9A),
          retrograde: true,
        ),
        ChartPlanet(
          id: 'Asc',
          name: 'Ascendant',
          degree: 134.0,
          color: Color(0xFF555555),
        ),
      ],
      rotationOffsetDeg: 285,
      showHouseLines: true,
    );
  }

  KundliChartConfig _presetThree() {
    return KundliChartConfig.sample.copyWith(
      houseCusps: const [
        20,
        50,
        79,
        109,
        139,
        169,
        199,
        229,
        259,
        289,
        319,
        349,
      ],
      planets: const [
        ChartPlanet(
          id: 'Su',
          name: 'Sun',
          degree: 318.0,
          color: Color(0xFF177E89),
          retrograde: true,
        ),
        ChartPlanet(
          id: 'Mo',
          name: 'Moon',
          degree: 188.3,
          color: Color(0xFF2CA25F),
        ),
        ChartPlanet(
          id: 'Ma',
          name: 'Mars',
          degree: 327.9,
          color: Color(0xFFCC0000),
        ),
        ChartPlanet(
          id: 'Me',
          name: 'Mercury',
          degree: 307.8,
          color: Color(0xFF7F5539),
          retrograde: true,
        ),
        ChartPlanet(
          id: 'Ju',
          name: 'Jupiter',
          degree: 250.1,
          color: Color(0xFF8D5A97),
          retrograde: true,
        ),
        ChartPlanet(
          id: 'Ve',
          name: 'Venus',
          degree: 297.6,
          color: Color(0xFF2E7D32),
        ),
        ChartPlanet(
          id: 'Sa',
          name: 'Saturn',
          degree: 291.2,
          color: Color(0xFF4A34A8),
        ),
        ChartPlanet(
          id: 'Ra',
          name: 'Rahu',
          degree: 281.5,
          color: Color(0xFF689F38),
          retrograde: true,
        ),
        ChartPlanet(
          id: 'Ke',
          name: 'Ketu',
          degree: 101.5,
          color: Color(0xFF6A1B9A),
          retrograde: true,
        ),
        ChartPlanet(
          id: 'Asc',
          name: 'Ascendant',
          degree: 111.0,
          color: Color(0xFF555555),
        ),
      ],
      rotationOffsetDeg: 285,
      showHouseLines: true,
    );
  }

  List<Widget> _buildFixedRashiImages(double side) {
    const List<_RashiFixedPos> items = [
      _RashiFixedPos(asset: AssetRes.aries, angleDeg: 272),
      _RashiFixedPos(asset: AssetRes.taurus, angleDeg: 242),
      _RashiFixedPos(asset: AssetRes.gemini, angleDeg: 212),
      _RashiFixedPos(asset: AssetRes.cancer, angleDeg: 182),
      _RashiFixedPos(asset: AssetRes.leo, angleDeg: 152),
      _RashiFixedPos(asset: AssetRes.virgo, angleDeg: 122),
      _RashiFixedPos(asset: AssetRes.libra, angleDeg: 92),
      _RashiFixedPos(asset: AssetRes.scorpio, angleDeg: 62),
      _RashiFixedPos(asset: AssetRes.sagittarius, angleDeg: 32),
      _RashiFixedPos(asset: AssetRes.capricorn, angleDeg: 2),
      _RashiFixedPos(asset: AssetRes.aquarius, angleDeg: 332),
      _RashiFixedPos(asset: AssetRes.pisces, angleDeg: 302),
    ];

    final double center = side / 2;
    final double ringRadius = side * 0.26;
    final double imageSize = side * 0.12;

    return items.map((item) {
      final double rad = item.angleDeg * math.pi / 180;
      final double x = center + ringRadius * math.cos(rad) - imageSize / 2;
      final double y = center + ringRadius * math.sin(rad) - imageSize / 2;

      return Positioned(
        left: x,
        top: y,
        width: imageSize,
        height: imageSize,
        child: IgnorePointer(
          child: Opacity(
            opacity: 0.22,
            child: Image.asset(item.asset, fit: BoxFit.contain),
          ),
        ),
      );
    }).toList();
  }
}

class _RashiFixedPos {
  const _RashiFixedPos({required this.asset, required this.angleDeg});

  final String asset;
  final double angleDeg;
}
