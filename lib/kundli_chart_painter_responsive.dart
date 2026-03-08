import 'dart:math' as math;
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:kundli/kundli_chart_data.dart';

class KundliChartPainter extends CustomPainter {
  const KundliChartPainter({
    required this.config,
    this.planetImages,
    required this.hasRashi,
    required this.isCombine,
  });

  final KundliChartConfig config;
  final Map<String, ui.Image>? planetImages;
  final bool hasRashi;
  final bool isCombine;

  @override
  void paint(Canvas canvas, Size size) {
    final double side = math.min(size.width, size.height);
    final Offset center = Offset(_snap(size.width / 2), _snap(size.height / 2));

    final double outerRadius = _snap(side * 0.48);
    final double nakOuter = outerRadius;
    final double nakInner = _snap(outerRadius * 0.90);
    final double houseOuter = _snap(nakInner);
    final double planetMaxRadius = _snap(outerRadius * 0.80);
    if (isCombine) {
      _drawOuterCircles(canvas, center, nakOuter, nakInner, houseOuter);
      _drawNakshatraBand(canvas, center, nakOuter, nakInner);
      _drawRashiDividers(canvas, center, houseOuter);
      // if (config.showHouseLines) {
      _drawHouseLines(canvas, center, houseOuter);
      _drawHouseNumbers(canvas, center, outerRadius * 0.28);
      // }
      _drawPlanets(canvas, center, planetMaxRadius);
    } else if (!isCombine && hasRashi) {
      //This statemens only for rashi and the houes will be removed

      _drawOuterCircles(canvas, center, nakOuter, nakInner, houseOuter);
      _drawNakshatraBand(canvas, center, nakOuter, nakInner);
      _drawRashiDividers(canvas, center, houseOuter);
      // // if (config.showHouseLines) {
      // _drawHouseLines(canvas, center, houseOuter);
      // _drawHouseNumbers(canvas, center, outerRadius * 0.28);
      // // }
      _drawPlanets(canvas, center, planetMaxRadius);
    } else {
      _drawOuterCircles(canvas, center, nakOuter, nakInner, houseOuter);
      _drawNakshatraBand(canvas, center, nakOuter, nakInner);
      // _drawRashiDividers(canvas, center, houseOuter);
      // if (config.showHouseLines) {
      _drawHouseLines(canvas, center, houseOuter);
      _drawHouseNumbers(canvas, center, outerRadius * 0.28);
      // }
      _drawPlanets(canvas, center, planetMaxRadius);
    }
  }

  void _drawOuterCircles(
    Canvas canvas,
    Offset center,
    double nakOuter,
    double nakInner,
    double houseOuter,
  ) {
    final Paint border = Paint()
      ..color = const Color(0xFF8A8A8A)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round
      ..isAntiAlias = true;
    canvas.drawCircle(center, nakOuter, border);
    canvas.drawCircle(center, nakInner, border);
  }

  void _drawNakshatraBand(
    Canvas canvas,
    Offset center,
    double nakOuter,
    double nakInner,
  ) {
    final Paint divider = Paint()
      ..color = const Color(0xFF8A8A8A)
      ..strokeWidth = 1
      ..strokeCap = StrokeCap.round
      ..isAntiAlias = true;
    final double labelRadius = (nakOuter + nakInner) / 2;
    final double step = 360 / KundliChartConfig.nakshatraNames.length;

    for (int i = 0; i < KundliChartConfig.nakshatraNames.length; i++) {
      final double deg = i * step;
      final double a = _degToRad(deg);

      final Offset p1 = center + Offset(math.cos(a), math.sin(a)) * nakInner;
      final Offset p2 = center + Offset(math.cos(a), math.sin(a)) * nakOuter;
      canvas.drawLine(p1, p2, divider);

      final double mid = _degToRad(deg + step / 2);
      final Offset lp =
          center + Offset(math.cos(mid), math.sin(mid)) * labelRadius;
      _paintRotatedText(
        canvas: canvas,
        text: KundliChartConfig.nakshatraNames[i],
        offset: lp,
        angle: mid + math.pi / 2,
        style: const TextStyle(
          color: Color(0xFF4A4A4A),
          fontSize: 8,
          fontWeight: FontWeight.w600,
        ),
      );
    }
  }

  void _drawRashiDividers(Canvas canvas, Offset center, double radius) {
    final Paint divider = Paint()
      ..color = const Color(0xFFBDBDBD)
      ..strokeWidth = 1
      ..strokeCap = StrokeCap.round
      ..isAntiAlias = true;

    for (int i = 0; i < 12; i++) {
      final double angleDeg = i * 30;
      final double a = _degToRad(angleDeg);
      final Offset p = center + Offset(math.cos(a), math.sin(a)) * radius;
      canvas.drawLine(center, p, divider);
    }
  }

  void _drawHouseLines(Canvas canvas, Offset center, double houseOuter) {
    final Paint houseLine = Paint()
      ..color = const Color(0xFFF39508)
      ..strokeWidth = 1.2
      ..strokeCap = StrokeCap.round
      ..isAntiAlias = true;

    for (int i = 0; i < config.houseCusps.length; i++) {
      final double a = _degToRad(config.houseCusps[i]);
      final Offset p = center + Offset(math.cos(a), math.sin(a)) * houseOuter;
      canvas.drawLine(center, p, houseLine);
    }
  }

  void _drawHouseNumbers(Canvas canvas, Offset center, double radius) {
    for (int i = 0; i < config.houseCusps.length; i++) {
      final double a1 = config.houseCusps[i];
      final double a2 = config.houseCusps[(i + 1) % config.houseCusps.length];
      final double mid = _midAngleClockwise(a1, a2);
      final double rad = _degToRad(mid);
      final Offset p = center + Offset(math.cos(rad), math.sin(rad)) * radius;
      _paintText(
        canvas,
        '${i + 1}',
        p,
        const TextStyle(
          color: Color(0xFF303030),
          fontSize: 16,
          fontWeight: FontWeight.w500,
        ),
      );
    }
  }

  void _drawPlanets(Canvas canvas, Offset center, double maxRadius) {
    final double imageSize = (maxRadius * 0.14).clamp(14.0, 22.0);
    final double labelFont = (maxRadius * 0.10).clamp(11.0, 14.0);
    final double labelDy = -(imageSize * 0.9);
    final Map<int, double> radiusFactors = buildPlanetRadiusFactors(config.planets);

    for (int i = 0; i < config.planets.length; i++) {
      final ChartPlanet planet = config.planets[i];
      final double angle = _degToRad(planet.degree);
      final double radius =
          maxRadius * (radiusFactors[i] ?? planetBaseRadiusFactor(planet.name));
      final Offset position =
          center + Offset(math.cos(angle), math.sin(angle)) * radius;

      final ui.Image? planetImage = planetImages?[_planetAssetKey(planet)];
      if (planetImage != null) {
        final Rect src = Rect.fromLTWH(
          0,
          0,
          planetImage.width.toDouble(),
          planetImage.height.toDouble(),
        );
        final Rect dst = Rect.fromCenter(
          center: position,
          width: imageSize,
          height: imageSize,
        );
        canvas.drawImageRect(
          planetImage,
          src,
          dst,
          Paint()..isAntiAlias = true,
        );
      } else {
        final Paint dot = Paint()..color = planet.color;
        canvas.drawCircle(position, imageSize / 2, dot);
        canvas.drawCircle(
          position,
          imageSize / 2,
          Paint()
            ..color = Colors.white
            ..style = PaintingStyle.stroke
            ..strokeWidth = 1.2,
        );
      }

      final String symbolTop = planet.retrograde
          ? '${planet.id}\u00AE'
          : planet.id;
      _paintText(
        canvas,
        symbolTop,
        position + Offset(0, labelDy),
        TextStyle(
          color: planet.color,
          fontSize: labelFont,
          fontWeight: FontWeight.w700,
          shadows: const [Shadow(color: Colors.white, blurRadius: 2)],
        ),
      );
    }
  }

  double _degToRad(double degree) {
    return (config.rotationOffsetDeg - degree) * math.pi / 180;
  }

  double _snap(double value) => (value * 2).roundToDouble() / 2;

  double _midAngleClockwise(double from, double to) {
    final double a = _normalizeDeg(from);
    double b = _normalizeDeg(to);
    if (b < a) b += 360;
    return _normalizeDeg(a + (b - a) / 2);
  }

  double _normalizeDeg(double d) {
    double v = d % 360;
    if (v < 0) v += 360;
    return v;
  }

  String _planetAssetKey(ChartPlanet planet) {
    final String name = planet.name.toLowerCase();
    if (name == 'ascendant') return 'asc';
    return name;
  }

  void _paintText(Canvas canvas, String text, Offset center, TextStyle style) {
    final TextPainter tp = TextPainter(
      text: TextSpan(text: text, style: style),
      textDirection: TextDirection.ltr,
    )..layout();
    tp.paint(
      canvas,
      Offset(center.dx - tp.width / 2, center.dy - tp.height / 2),
    );
  }

  void _paintRotatedText({
    required Canvas canvas,
    required String text,
    required Offset offset,
    required double angle,
    required TextStyle style,
  }) {
    final TextPainter tp = TextPainter(
      text: TextSpan(text: text, style: style),
      textDirection: TextDirection.ltr,
    )..layout();

    canvas.save();
    canvas.translate(offset.dx, offset.dy);
    canvas.rotate(angle);
    tp.paint(canvas, Offset(-tp.width / 2, -tp.height / 2));
    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant KundliChartPainter oldDelegate) {
    return oldDelegate.config != config ||
        oldDelegate.planetImages != planetImages ||
        oldDelegate.hasRashi != hasRashi ||
        oldDelegate.isCombine != isCombine;
  }
}
