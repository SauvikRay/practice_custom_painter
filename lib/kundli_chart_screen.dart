import 'dart:math' as math;
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:kundli/asset_res.dart';
import 'package:kundli/kundli_chart_data.dart';
import 'package:kundli/kundli_chart_painter_responsive.dart';

final centricItem = [
  "Moon",

  "Rahu & Ketu(Rahu and ketu are in the same radius but they are opposite in direction)",
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
  Map<String, ui.Image> _planetImages = const {};
  List<String> buttonNames = ["Combine", "Rashi", "Bhav"];
  String _selectedButtonName = "Combine";
  late final List<KundliChartConfig> _presets = [
    _presetOne(),
    _presetTwo(),
    _presetThree(),
  ];

  @override
  void initState() {
    super.initState();
    findViewItems("Combine");
    _loadPlanetImages();
  }

  bool isCombined = true;
  bool hasRashi = true;
  void findViewItems(String name) {
    switch (name) {
      case "Combine":
        hasRashi = true;
        isCombined = true;
        break;
      case "Rashi":
        isCombined = false;
        hasRashi = true;
        break;
      case "Bhav":
        hasRashi = false;
        isCombined = false;
        break;
    }
  }

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
          SizedBox(height: 20),
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 12, 12, 6),
            child: Row(
              children: List.generate(buttonNames.length, (i) {
                final bool active = buttonNames[i] == _selectedButtonName;
                return Expanded(
                  child: Padding(
                    padding: EdgeInsets.only(right: i == 2 ? 0 : 8),
                    child: ElevatedButton(
                      onPressed: () {
                        setState(() {
                          _selectedButtonName = buttonNames[i];
                          findViewItems(_selectedButtonName);
                        });
                      },
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
                      child: Text(buttonNames[i]),
                    ),
                  ),
                );
              }),
            ),
          ),
          SizedBox(height: 20),
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
                        child: GestureDetector(
                          behavior: HitTestBehavior.opaque,
                          onTapDown: (details) =>
                              _onChartTap(details, side, chartConfig),
                          child: Stack(
                            children: [
                              if (hasRashi) ..._buildFixedRashiImages(side),
                              Positioned.fill(
                                child: CustomPaint(
                                  painter: KundliChartPainter(
                                    config: chartConfig,
                                    planetImages: _planetImages,
                                    hasRashi: hasRashi,
                                    isCombine: isCombined,
                                  ),
                                ),
                              ),
                            ],
                          ),
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

  Future<void> _loadPlanetImages() async {
    final Map<String, ui.Image> decoded = {};
    for (final entry in AssetRes.planetByName.entries) {
      final ByteData data = await rootBundle.load(entry.value);
      final ui.Codec codec = await ui.instantiateImageCodec(
        data.buffer.asUint8List(),
      );
      final ui.FrameInfo frame = await codec.getNextFrame();
      decoded[entry.key] = frame.image;
    }

    if (!mounted) return;
    setState(() => _planetImages = decoded);
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
          child: Image.asset(item.asset, fit: BoxFit.contain),
        ),
      );
    }).toList();
  }

  void _onChartTap(
    TapDownDetails details,
    double side,
    KundliChartConfig config,
  ) {
    final ChartPlanet? planet = _hitPlanet(details.localPosition, side, config);
    if (planet == null) return;
    _showPlanetDetails(planet);
  }

  ChartPlanet? _hitPlanet(Offset tap, double side, KundliChartConfig config) {
    final double outerRadius = side * 0.48;
    final double maxRadius = outerRadius * 0.80;
    final double imageSize = (maxRadius * 0.14).clamp(14.0, 22.0);
    final double hitRadius = imageSize * 0.70;
    final double labelDy = -(imageSize * 0.9);
    final double labelHitRadius = imageSize * 0.85;
    final Offset center = Offset(side / 2, side / 2);
    final Map<int, double> radiusFactors = buildPlanetRadiusFactors(config.planets);

    ChartPlanet? best;
    double bestDist = double.infinity;
    for (int i = 0; i < config.planets.length; i++) {
      final ChartPlanet planet = config.planets[i];
      final double angle =
          (config.rotationOffsetDeg - planet.degree) * math.pi / 180;
      final double radius =
          maxRadius * (radiusFactors[i] ?? planetBaseRadiusFactor(planet.name));
      final Offset pos =
          center + Offset(math.cos(angle), math.sin(angle)) * radius;
      final Offset labelPos = pos + Offset(0, labelDy);
      final double iconDist = (tap - pos).distance;
      final double labelDist = (tap - labelPos).distance;
      final bool hitIcon = iconDist <= hitRadius;
      final bool hitLabel = labelDist <= labelHitRadius;
      final double effectiveDist = math.min(iconDist, labelDist);
      if ((hitIcon || hitLabel) && effectiveDist < bestDist) {
        best = planet;
        bestDist = effectiveDist;
      }
    }
    return best;
  }

  void _showPlanetDetails(ChartPlanet planet) {
    final String sign = _zodiacSigns[((planet.degree % 360) / 30).floor() % 12];
    final double inSign = planet.degree % 30;
    final int nakIndex = (((planet.degree % 360) / 360) * 27).floor() % 27;
    final String nak = KundliChartConfig.nakshatraNames[nakIndex];
    final String? icon =
        AssetRes.planetByName[planet.name.toLowerCase()] ??
        (planet.name.toLowerCase() == 'ascendant' ? AssetRes.planetAsc : null);

    showModalBottomSheet<void>(
      context: context,
      showDragHandle: true,

      builder: (context) {
        return SizedBox(
          width: double.infinity,
          child: SafeArea(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
              child: Column(
                // mainAxisSize: MainAxisSize.min,
                children: [
                  if (icon != null)
                    Image.asset(
                      icon,
                      width: 42,
                      height: 42,
                      fit: BoxFit.contain,
                    ),
                  const SizedBox(height: 10),
                  Text(
                    '${planet.name} (${planet.id})',
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text('Degree: ${planet.degree.toStringAsFixed(2)}°'),
                  Text('Sign: $sign (${inSign.toStringAsFixed(2)}°)'),
                  Text('Nakshatra: $nak'),
                  Text('Retrograde: ${planet.retrograde ? "Yes" : "No"}'),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  static const List<String> _zodiacSigns = [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
    'Aquarius',
    'Pisces',
  ];
}

class _RashiFixedPos {
  const _RashiFixedPos({required this.asset, required this.angleDeg});

  final String asset;
  final double angleDeg;
}
