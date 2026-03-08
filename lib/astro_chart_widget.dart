import 'dart:math';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:kundli/kundli_chart_screen.dart';

// ─────────────────────────────────────────────
//  Data models
// ─────────────────────────────────────────────

class PlanetData {
  final String name;
  final double degree;
  final bool retro;

  const PlanetData({
    required this.name,
    required this.degree,
    this.retro = false,
  });

  factory PlanetData.fromMap(Map<String, dynamic> map) {
    return PlanetData(
      name: map['name'] as String,
      degree: (map['degree'] as num).toDouble(),
      retro: map['retro'] as bool? ?? false,
    );
  }
}

class ChartOptions {
  final bool showHouses;
  final bool showBackground;
  final bool whiteBackground;
  final bool customBackground;

  const ChartOptions({
    this.showHouses = true,
    this.showBackground = true,
    this.whiteBackground = false,
    this.customBackground = false,
  });
}

// ─────────────────────────────────────────────
//  Widget
// ─────────────────────────────────────────────

/// Drop-in Flutter equivalent of chartCombineVabRashi().
///
/// Usage:
/// ```dart
/// AstroChartWidget(
///   planets: planets,        // List<PlanetData>
///   houseDegrees: house,     // Map<int, double>  (key 1-12)
///   options: ChartOptions(showHouses: true, showBackground: true),
///   size: 500,
/// )
/// ```
class AstroChartWidget extends StatefulWidget {
  final List<PlanetData> planets;

  /// Map keyed 1-12 with the cusp degree of each house.
  final Map<int, double> houseDegrees;

  final ChartOptions options;

  /// Width & height of the chart canvas (it is square).
  final double size;

  const AstroChartWidget({
    super.key,
    required this.planets,
    required this.houseDegrees,
    this.options = const ChartOptions(),
    this.size = 500,
  });

  @override
  State<AstroChartWidget> createState() => _AstroChartWidgetState();
}

class _AstroChartWidgetState extends State<AstroChartWidget> {
  // Loaded images
  ui.Image? _bgAll;
  ui.Image? _bgBhav;
  ui.Image? _bgRashi;
  final Map<String, ui.Image> _planetIcons = {};

  bool _ready = false;

  // ── asset paths (adjust to your pubspec assets) ──────────────────────────
  static const String _assetBase = 'assets/checkmyastro-chart';

  static const Map<String, String> _iconAssets = {
    'Sun': '$_assetBase/sun.png',
    'Moon': '$_assetBase/moon.png',
    'Mars': '$_assetBase/mars.png',
    'Mercury': '$_assetBase/mercury.png',
    'Jupiter': '$_assetBase/jupiter.png',
    'Venus': '$_assetBase/venus.png',
    'Saturn': '$_assetBase/saturn.png',
    'Rahu': '$_assetBase/rahu.png',
    'Ketu': '$_assetBase/ketu.png',
    'Ascendant': '$_assetBase/asc.png',
  };

  static const Map<String, String> _abbreviations = {
    'Sun': 'Su',
    'Moon': 'Mo',
    'Mars': 'Ma',
    'Mercury': 'Me',
    'Jupiter': 'Ju',
    'Venus': 'Ve',
    'Saturn': 'Sa',
    'Rahu': 'Ra',
    'Ketu': 'Ke',
    'Ascendant': 'Asc',
  };

  static const Map<String, double> _planetRadii = {
    'Moon': 120,
    'Mercury': 150,
    'Venus': 135,
    'Sun': 165,
    'Mars': 180,
    'Jupiter': 195,
    'Saturn': 210,
    'Rahu': 100,
    'Ketu': 100,
  };

  // Planet label colours (same cycle as JS getRandomColor())
  static const List<Color> _labelColors = [
    Color(0xFFE53935),
    Color(0xFF8E24AA),
    Color(0xFF1E88E5),
    Color(0xFF43A047),
    Color(0xFFFB8C00),
    Color(0xFF00ACC1),
    Color(0xFF6D4C41),
    Color(0xFF3949AB),
    Color(0xFF00897B),
  ];

  @override
  void initState() {
    super.initState();
    _loadAllImages();
  }

  Future<ui.Image> _loadAssetImage(String assetPath) async {
    final data = await rootBundle.load(assetPath);
    final codec = await ui.instantiateImageCodec(data.buffer.asUint8List());
    final frame = await codec.getNextFrame();
    return frame.image;
  }

  Future<void> _loadAllImages() async {
    try {
      _bgAll = await _loadAssetImage('$_assetBase/img-back-all.jpg');
      _bgBhav = await _loadAssetImage('$_assetBase/img-back-bhav.jpg');
      _bgRashi = await _loadAssetImage('$_assetBase/img-back-rashi.jpg');

      for (final entry in _iconAssets.entries) {
        _planetIcons[entry.key] = await _loadAssetImage(entry.value);
      }
    } catch (_) {
      // Assets may be missing during development – chart still renders shapes.
    }

    if (mounted) setState(() => _ready = true);
  }

  @override
  Widget build(BuildContext context) {
    if (!_ready) {
      return SizedBox(
        width: widget.size,
        height: widget.size,
        child: const Center(child: CircularProgressIndicator()),
      );
    }

    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: CustomPaint(
        painter: _AstroChartPainter(
          planets: widget.planets,
          houseDegrees: widget.houseDegrees,
          options: widget.options,
          bgAll: _bgAll,
          bgBhav: _bgBhav,
          bgRashi: _bgRashi,
          planetIcons: _planetIcons,
          abbreviations: _abbreviations,
          planetRadii: _planetRadii,
          labelColors: _labelColors,
        ),
        size: Size(widget.size, widget.size),
      ),
    );
  }
}

// ─────────────────────────────────────────────
//  Painter  (equivalent to drawChart() in JS)
// ─────────────────────────────────────────────

class _AstroChartPainter extends CustomPainter {
  final List<PlanetData> planets;
  final Map<int, double> houseDegrees;
  final ChartOptions options;

  final ui.Image? bgAll;
  final ui.Image? bgBhav;
  final ui.Image? bgRashi;
  final Map<String, ui.Image> planetIcons;
  final Map<String, String> abbreviations;
  final Map<String, double> planetRadii;
  final List<Color> labelColors;

  _AstroChartPainter({
    required this.planets,
    required this.houseDegrees,
    required this.options,
    required this.bgAll,
    required this.bgBhav,
    required this.bgRashi,
    required this.planetIcons,
    required this.abbreviations,
    required this.planetRadii,
    required this.labelColors,
  });

  static const double _radius8 = 200;
  static const double _houseRadius8 = 230;
  static const double _invisibleR8 = 75;
  static const double _rotationOffset = (285 * pi) / 180;

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;

    // ── background ──────────────────────────────────────────────────────────
    if (options.whiteBackground) {
      canvas.drawRect(
        Rect.fromLTWH(0, 0, size.width, size.height),
        Paint()..color = Colors.white,
      );
      if (bgBhav != null) _drawImage(canvas, bgBhav!, size);
    } else if (options.showBackground) {
      if (options.customBackground) {
        canvas.drawRect(
          Rect.fromLTWH(0, 0, size.width, size.height),
          Paint()..color = Colors.white,
        );
        if (bgRashi != null) _drawImage(canvas, bgRashi!, size);
      } else {
        if (bgAll != null) _drawImage(canvas, bgAll!, size);
      }
    }

    // ── houses ──────────────────────────────────────────────────────────────
    if (options.showHouses) {
      _drawHouses(canvas, cx, cy);
    }

    // ── planets ─────────────────────────────────────────────────────────────
    _drawPlanets(canvas, cx, cy);
  }

  void _drawImage(Canvas canvas, ui.Image image, Size size) {
    paintImage(
      canvas: canvas,
      rect: Rect.fromLTWH(0, 0, size.width, size.height),
      image: image,
      fit: BoxFit.fill,
    );
  }

  // ── Equivalent to drawHouses() ───────────────────────────────────────────
  void _drawHouses(Canvas canvas, double cx, double cy) {
    // Build the negated list (JS uses -house[i])
    final List<double> hd = List.generate(
      12,
      (i) => -(houseDegrees[i + 1] ?? 0.0),
    );

    final linePaint = Paint()
      ..color = const Color(0xFFF39508)
      ..strokeWidth = 1
      ..style = PaintingStyle.stroke;

    final List<double> houseAngles = [];

    for (int i = 0; i < 12; i++) {
      final double angleStart = _toRad(hd[i]) + _rotationOffset;
      final double angleEnd = _toRad(hd[(i + 1) % 12]) + _rotationOffset;

      final x1 = cx + _houseRadius8 * cos(angleStart);
      final y1 = cy + _houseRadius8 * sin(angleStart);
      final x2 = cx + _houseRadius8 * cos(angleEnd);
      final y2 = cy + _houseRadius8 * sin(angleEnd);

      canvas.drawLine(Offset(cx, cy), Offset(x1, y1), linePaint);
      canvas.drawLine(Offset(cx, cy), Offset(x2, y2), linePaint);

      double houseAngle = (angleStart + angleEnd) / 2;
      double rounded = _round5(houseAngle);

      // duplicate check (mirrors JS logic)
      final dupIdx = houseAngles.indexWhere((a) => a == rounded);
      if (dupIdx != -1) {
        if (angleStart < 0) {
          rounded = _round5(houseAngle + pi);
        } else {
          houseAngles[dupIdx] = _round5(houseAngles[dupIdx] + pi);
        }
      }
      houseAngles.add(rounded);
    }

    // Draw house numbers
    for (int i = 0; i < 12; i++) {
      final tx = cx + _invisibleR8 * cos(houseAngles[i]);
      final ty = cy + _invisibleR8 * sin(houseAngles[i]);

      final tp = TextPainter(
        text: TextSpan(
          text: '${i + 1}',
          style: const TextStyle(
            fontSize: 15,
            color: Colors.black,
            fontFamily: 'Arial',
          ),
        ),
        textDirection: TextDirection.ltr,
      )..layout();

      tp.paint(canvas, Offset(tx - tp.width / 2, ty - tp.height / 2));
    }
  }

  // ── Equivalent to drawPlanets() ──────────────────────────────────────────
  void _drawPlanets(Canvas canvas, double cx, double cy) {
    int colorIdx = 0;

    // First pass: draw icons
    final List<Map<String, dynamic>> positions = [];

    for (final planet in planets) {
      final double degree = -planet.degree; // negate, same as JS
      final double angle = _toRad(degree) + _rotationOffset;
      final double r = planetRadii[planet.name] ?? _radius8;

      final double px = cx + r * cos(angle);
      final double py = cy + r * sin(angle);

      const double iconSize = 20;
      final icon = planetIcons[planet.name];
      if (icon != null) {
        paintImage(
          canvas: canvas,
          rect: Rect.fromLTWH(
            px - iconSize / 2,
            py - iconSize / 2,
            iconSize,
            iconSize,
          ),
          image: icon,
          fit: BoxFit.fill,
        );
      } else {
        // Fallback circle when icon not available
        canvas.drawCircle(
          Offset(px, py),
          8,
          Paint()..color = labelColors[colorIdx % labelColors.length],
        );
      }

      positions.add({
        'planet': planet,
        'px': px,
        'py': py,
        'color': labelColors[colorIdx % labelColors.length],
      });
      colorIdx++;
    }

    // Second pass: draw abbreviation labels
    for (final pos in positions) {
      final PlanetData p = pos['planet'] as PlanetData;
      final double px = pos['px'] as double;
      final double py = pos['py'] as double;
      final Color color = pos['color'] as Color;

      String abbr = abbreviations[p.name] ?? p.name.substring(0, 2);
      if (p.retro) abbr += '®';

      const double iconSize = 20;
      final tp = TextPainter(
        text: TextSpan(
          text: abbr,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: color,
          ),
        ),
        textDirection: TextDirection.ltr,
        textAlign: TextAlign.center,
      )..layout();

      tp.paint(
        canvas,
        Offset(px - tp.width / 2, py - iconSize / 2 - tp.height),
      );
    }
  }

  // ── helpers ───────────────────────────────────────────────────────────────
  static double _toRad(double deg) => (deg * pi) / 180;
  static double _round5(double v) => (v * 100000).roundToDouble() / 100000;

  @override
  bool shouldRepaint(_AstroChartPainter old) =>
      old.planets != planets ||
      old.houseDegrees != houseDegrees ||
      old.options != options;
}

// ─────────────────────────────────────────────
//  Example usage screen
// ─────────────────────────────────────────────

class AstroChartExampleScreen extends StatelessWidget {
  const AstroChartExampleScreen({super.key});

  // ── sample data (mirrors the JS demo) ────────────────────────────────────
  static final List<PlanetData> _planets = [
    PlanetData(name: 'Sun', degree: 45.5),
    PlanetData(name: 'Moon', degree: 120.0),
    PlanetData(name: 'Mars', degree: 200.0, retro: true),
    PlanetData(name: 'Mercury', degree: 55.0),
    PlanetData(name: 'Jupiter', degree: 310.0),
    PlanetData(name: 'Venus', degree: 80.0),
    PlanetData(name: 'Saturn', degree: 270.0, retro: true),
    PlanetData(name: 'Rahu', degree: 150.0),
    PlanetData(name: 'Ketu', degree: 330.0),
  ];

  static final Map<int, double> _house = {
    1: 0,
    2: 30,
    3: 60,
    4: 90,
    5: 120,
    6: 150,
    7: 180,
    8: 210,
    9: 240,
    10: 270,
    11: 300,
    12: 330,
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF1A1A2E),
      appBar: AppBar(
        backgroundColor: const Color(0xFF16213E),
        title: const Text(
          'Astro Charts',
          style: TextStyle(color: Colors.white),
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => KundliChartScreen()),
              );
            },
            child: Text("Kundli Chart"),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            _label('chartFull  (showHouses + showBackground)'),
            AstroChartWidget(
              planets: _planets,
              houseDegrees: _house,
              size: 400,
              options: const ChartOptions(
                showHouses: true,
                showBackground: true,
                whiteBackground: false,
                customBackground: false,
              ),
            ),
            const SizedBox(height: 32),
            _label('chartNoHouses  (customBackground, no houses)'),
            AstroChartWidget(
              planets: _planets,
              houseDegrees: _house,
              size: 400,
              options: const ChartOptions(
                showHouses: false,
                showBackground: true,
                whiteBackground: false,
                customBackground: true,
              ),
            ),
            const SizedBox(height: 32),
            _label('chartWhiteBg  (whiteBg + showHouses)'),
            AstroChartWidget(
              planets: _planets,
              houseDegrees: _house,
              size: 400,
              options: const ChartOptions(
                showHouses: true,
                showBackground: false,
                whiteBackground: true,
                customBackground: false,
              ),
            ),
          ],
        ),
      ),
    );
  }

  static Widget _label(String text) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 8),
    child: Text(
      text,
      style: const TextStyle(
        color: Colors.white70,
        fontSize: 13,
        fontFamily: 'monospace',
      ),
    ),
  );
}
