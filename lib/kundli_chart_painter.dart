import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:kundli/kundli_chart_data.dart';

class KundliChartPainter extends CustomPainter {
  const KundliChartPainter({required this.config});

  final KundliChartConfig config;

  @override
  void paint(Canvas canvas, Size size) {
    final double side = math.min(size.width, size.height);
    final Offset center = Offset(_snap(size.width / 2), _snap(size.height / 2));

    final double outerRadius = _snap(side * 0.48);
    final double nakOuter = outerRadius;
    final double nakInner = _snap(outerRadius * 0.90);
    final double houseOuter = _snap(nakInner);
    final double planetRing = _snap(outerRadius * 0.60);

    _drawOuterCircles(canvas, center, nakOuter, nakInner, houseOuter);
    _drawNakshatraBand(canvas, center, nakOuter, nakInner);
    _drawRashiDividers(canvas, center, houseOuter);
    if (config.showHouseLines) {
      _drawHouseLines(canvas, center, houseOuter);
      _drawHouseNumbers(canvas, center, outerRadius * 0.28);
    }
    _drawPlanets(canvas, center, planetRing);
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
    // canvas.drawCircle(center, houseOuter, border);//Border
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
          fontSize: 28,
          fontWeight: FontWeight.w500,
        ),
      );
    }
  }

  void _drawPlanets(Canvas canvas, Offset center, double baseRadius) {
    final List<_PlacedPlanet> placed = [];
    final List<_PlanetAngle> sorted =
        config.planets
            .map((p) => _PlanetAngle(planet: p, angle: _degToRad(p.degree)))
            .toList()
          ..sort((a, b) => a.angle.compareTo(b.angle));

    final List<List<_PlanetAngle>> clusters = [];
    for (final item in sorted) {
      if (clusters.isEmpty) {
        clusters.add([item]);
        continue;
      }
      final List<_PlanetAngle> last = clusters.last;
      final double gap = _angleDistance(item.angle, last.last.angle);
      if (gap <= _degDistance(6)) {
        last.add(item);
      } else {
        clusters.add([item]);
      }
    }

    for (final cluster in clusters) {
      final int n = cluster.length;
      for (int i = 0; i < n; i++) {
        final _PlanetAngle item = cluster[i];
        final Offset dir = Offset(math.cos(item.angle), math.sin(item.angle));
        final Offset tangent = Offset(
          -math.sin(item.angle),
          math.cos(item.angle),
        );
        final double lane = i - (n - 1) / 2;
        final Offset pos =
            center + dir * (baseRadius + lane * 6) + tangent * (lane * 18);
        placed.add(_PlacedPlanet(planet: item.planet, position: pos));
      }
    }

    for (final _PlacedPlanet p in placed) {
      final Paint dot = Paint()..color = p.planet.color;
      canvas.drawCircle(p.position, 11, dot);
      canvas.drawCircle(
        p.position,
        11,
        Paint()
          ..color = Colors.white
          ..style = PaintingStyle.stroke
          ..strokeWidth = 1.2,
      );

      final String label = p.planet.retrograde
          ? '${p.planet.id}®'
          : p.planet.id;
      _paintText(
        canvas,
        label,
        p.position,
        const TextStyle(
          color: Colors.white,
          fontSize: 9,
          fontWeight: FontWeight.w700,
        ),
      );
    }
  }

  double _degToRad(double degree) {
    final double d = (config.rotationOffsetDeg - degree) * math.pi / 180;
    return d;
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

  double _degDistance(double d) => d * math.pi / 180;

  double _angleDistance(double a, double b) {
    final double d = (a - b).abs();
    return math.min(d, 2 * math.pi - d);
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
    return oldDelegate.config != config;
  }
}

class _PlanetAngle {
  const _PlanetAngle({required this.planet, required this.angle});

  final ChartPlanet planet;
  final double angle;
}

class _PlacedPlanet {
  const _PlacedPlanet({required this.planet, required this.position});

  final ChartPlanet planet;
  final Offset position;
}
