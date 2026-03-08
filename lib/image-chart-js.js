 <script>
    // North Indian Chart
    $(function () {
        // Rashi numbers for each house, passed from backend (Chart 1)
        var rashiNumbers = @js($rashiNumbers);
        var planets = @js($planetRashiNumbers);
        createNorthIndianLagnaChart("astroChartNorth1", rashiNumbers, planets, 'displayedImageNorth1');

        // Rashi numbers for each house, passed from backend (Chart 2)
        var navamsaRashiNumber = @js($navamsaRashiNumbers);
        createNorthIndianNavamshaChart("astroChartNorth2", navamsaRashiNumber, planets, 'displayedImageNorth2');
    });
    // South Indian Chart
    $(function () {

        // Parse input data from the backend
        var name = @js($name);
        var dateOfBirth = @js($day) + '-' + @js($month) + '-' + @js($year);
        var time = @js($hours) + ' h, ' + @js($minutes) + ' m, ' + @js($seconds) + ' s';
        var rashi = @js($rashi);
        var nakshatra = @js($nakshatra);
        const data = {
            name: name,
            dateOfBirth: dateOfBirth,
            time: time,
            rashi: rashi,
            nakshatra: nakshatra
        };

        // Rashi numbers for each house, passed from backend (Chart 1)
        var planets3 = @js($planetRashiNumbers);
        createSouthIndianLagnaChart("astroChartSouth1", planets3, 'displayedImageSouth1', data);

        var planets4 = @js($planetRashiNumbers);
        createSouthIndianNavamshaChart('astroChartSouth2', planets4, 'displayedImageSouth2', data);
    });
    // East Indian Chart
    $(function () {
        // Rashi numbers for each house, passed from backend (Chart 1)
        var planets5 = @js($planetRashiNumbers);
        createEastIndianLagnaChart('astroChartEast1', planets5, 'displayedImageEast1');
        createEastIndianNavamshaChart('astroChartEast2', planets5, 'displayedImageEast2');
    });
    // CheckMyAstro chart
    $(function () {
        const planets = @js($planetRashiNumbers);
        const planetsNavamsa = @js($circularNavamsa);
        const house = @js($houseDegrees);

        if (document.getElementById('checkMyAstroChart') && document.getElementById('displayedImagecheckMyAstro')) {
            createCheckMyAstroChart('checkMyAstroChart', house, planets, 'displayedImagecheckMyAstro');
            createCheckMyAstroChartNavamsa('checkMyAstroChartNavamsa', house, planetsNavamsa, 'displayedImagecheckMyAstroNavamsa');
        }

        chartCombineVabRashi('chartFull', house, planets, 'imgFull', {
            showHouses: true,
            showBackground: true,
            whiteBackground: false,
            customBackground: false,
        });

        chartCombineVabRashi('chartNoHouses', house, planets, 'imgNoHouses', {
            showHouses: false,
            showBackground: true,
            whiteBackground: false,
            customBackground: true,
        });

        chartCombineVabRashi('chartWhiteBg', house, planets, 'imgWhiteBg', {
            showHouses: true,
            showBackground: false,
            whiteBackground: true,
            customBackground: false,
        });

        const currentPlanets = @js($currentPlanetRashiNumbers);
        const currentHouses = @js($currentHouseDegrees);

        if (document.getElementById('checkMyAstroCurrentChart') && document.getElementById('displayedCurrentImagecheckMyAstro')) {
            createCheckMyAstroChart('checkMyAstroCurrentChart', currentHouses, currentPlanets, 'displayedCurrentImagecheckMyAstro');
        }
        chartCombineVabRashi('chartFullCurrent', currentHouses, currentPlanets, 'imgFullCurrent', {
            showHouses: true,
            showBackground: true,
            whiteBackground: false,
            customBackground: false,
        });

        chartCombineVabRashi('chartNoHousesCurrent', currentHouses, currentPlanets, 'imgNoHousesCurrent', {
            showHouses: false,
            showBackground: true,
            whiteBackground: false,
            customBackground: true,
        });

        chartCombineVabRashi('chartWhiteBgCurrent', currentHouses, currentPlanets, 'imgWhiteBgCurrent', {
            showHouses: true,
            showBackground: false,
            whiteBackground: true,
            customBackground: false,
        });
    });

</script>
 
 
 globalThis.getRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 8)];
        }
        return color;
    }

    globalThis.getPlanetColor = function (planetName) {
        const planetColors = {
            Sun: '#FFA500', // Bright Orange
            Moon: '#ADD8E6', // Light Blue
            Mars: '#FF4500', // Red-Orange
            Mercury: '#C0C0C0', // Silver
            Jupiter: '#FFD700', // Gold
            Venus: '#FF69B4', // Hot Pink
            Saturn: '#A52A2A', // Brown
            Rahu: '#8B008B', // Dark Magenta
            Ketu: '#808080', // Gray
            Ascendant: '#32CD32', // Lime Green
        };

        return planetColors[planetName];
    }      
	  // for north indian charts
    globalThis.createNorthIndianLagnaChart = function (canvasId, rashiNumbers, planets, exportId) {
        // canvas =============Langana Chart==
        var canvas = document.getElementById(canvasId);
        var ctx = canvas.getContext("2d");

        // Set the canvas size to 500x500
        canvas.width = 400;
        canvas.height = 400;

        ctx.fillStyle = '#fff'; // Set background color
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas with this color

        // Set the size and position of the main square relative to the new canvas size
        var squareSize = 400; // Adjusted square size to fit within the 500x500 canvas
        var startX = 0; // Adjusted startX to center the square
        var startY = 0; // Adjusted startY to center the square

        // Set the line color and thickness
        ctx.strokeStyle = "#F59D22";
        ctx.lineWidth = 3;

        // Draw the main square with diagonals
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + squareSize, startY);
        ctx.lineTo(startX + squareSize, startY + squareSize);
        ctx.lineTo(startX, startY + squareSize);
        ctx.closePath();
        ctx.stroke();

        // Draw the diagonals
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + squareSize, startY + squareSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(startX + squareSize, startY);
        ctx.lineTo(startX, startY + squareSize);
        ctx.stroke();

        // Draw the tilted inner square
        var side2 = squareSize / Math.sqrt(2);
        var centerX = startX + squareSize / 2;
        var centerY = startY + squareSize / 2;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(Math.PI / 4);

        ctx.beginPath();
        ctx.moveTo(-side2 / 2, -side2 / 2);
        ctx.lineTo(side2 / 2, -side2 / 2);
        ctx.lineTo(side2 / 2, side2 / 2);
        ctx.lineTo(-side2 / 2, side2 / 2);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        // Add numbers 1 to 12 in each box
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black";

        planets = [...planets].map(function (planet) {
            planet.short = planet.name.slice(0, planet.name==='Ascendant'?3:2);
            return planet;
        });


        let planetPositions = [];
        Object.values(rashiNumbers).forEach(function (rashi_number) {
            planetPositions[rashi_number] = [];
            planets.forEach(function (planet) {
                if (rashi_number === planet.rashi_number) {
                    planetPositions[rashi_number].push(planet);
                }
            });
        });

        // Define positions for numbers
        const positions = [
            {x: centerX, y: centerY - 20},                 // House 1
            {x: centerX - 99, y: startY + 85},             // House 2
            {x: startX + 85, y: startY + 100},             // House 3
            {x: centerX - 20, y: centerY},                 // House 4
            {x: startX + 85, y: startY + 305},            // House 5
            {x: startX + 100, y: startY + 325},             // House 6
            {x: centerX, y: centerY + 20},                 // House 7
            {x: startX + 300, y: startY + 325},            // House 8
            {x: startX + 320, y: startY + 300},            // House 9
            {x: centerX + 20, y: centerY},                 // House 10
            {x: startX + 320, y: startY + 100},            // House 11
            {x: centerX + 100, y: startY + 85}              // House 12
        ];

        const planetChartPositions = [
            [
                {x: positions[0].x, y: positions[0].y - 80},
                {x: positions[0].x - 30, y: positions[0].y - 80},
                {x: positions[0].x - 65, y: positions[0].y - 80},
                {x: positions[0].x + 30, y: positions[0].y - 80},
                {x: positions[0].x + 65, y: positions[0].y - 80},
                {x: positions[0].x - 20, y: positions[0].y - 120},
                {x: positions[0].x + 20, y: positions[0].y - 120},
                {x: positions[0].x - 20, y: positions[0].y - 40},
                {x: positions[0].x + 20, y: positions[0].y - 40},
            ],
            [
                {x: positions[1].x - 5, y: positions[1].y - 65},
                {x: positions[1].x - 31, y: positions[1].y - 65},
                {x: positions[1].x - 62, y: positions[1].y - 65},
                {x: positions[1].x + 25, y: positions[1].y - 65},
                {x: positions[1].x + 55, y: positions[1].y - 65},
                {x: positions[1].x - 5, y: positions[1].y - 40},
                {x: positions[1].x - 35, y: positions[1].y - 40},
                {x: positions[1].x + 25, y: positions[1].y - 40},
                {x: positions[1].x - 1, y: positions[1].y - 20},
            ],             // House 2
            [
                {x: positions[2].x - 70, y: positions[2].y},
                {x: positions[2].x - 70, y: positions[2].y - 30},
                {x: positions[2].x - 70, y: positions[2].y - 60},
                {x: positions[2].x - 70, y: positions[2].y + 30},
                {x: positions[2].x - 70, y: positions[2].y + 60},
                {x: positions[2].x - 45, y: positions[2].y},
                {x: positions[2].x - 45, y: positions[2].y - 30},
                {x: positions[2].x - 45, y: positions[2].y + 30},
                {x: positions[2].x - 23, y: positions[2].y + 9},
            ],             // House 3
            [
                {x: positions[3].x - 80, y: positions[3].y},
                {x: positions[3].x - 80, y: positions[3].y - 30},
                {x: positions[3].x - 80, y: positions[3].y - 65},
                {x: positions[3].x - 80, y: positions[3].y + 30},
                {x: positions[3].x - 80, y: positions[3].y + 65},
                {x: positions[3].x - 120, y: positions[3].y - 20},
                {x: positions[3].x - 120, y: positions[3].y + 20},
                {x: positions[3].x - 40, y: positions[3].y - 20},
                {x: positions[3].x - 40, y: positions[3].y + 20},
            ],                 // House 4
            [
                {x: positions[4].x - 70, y: positions[4].y},
                {x: positions[4].x - 70, y: positions[4].y - 30},
                {x: positions[4].x - 70, y: positions[4].y - 60},
                {x: positions[4].x - 70, y: positions[4].y + 30},
                {x: positions[4].x - 70, y: positions[4].y + 60},
                {x: positions[4].x - 45, y: positions[4].y},
                {x: positions[4].x - 45, y: positions[4].y - 30},
                {x: positions[4].x - 45, y: positions[4].y + 30},
                {x: positions[4].x - 23, y: positions[4].y + 9},
            ],            // House 5
            [
                {x: positions[5].x - 5, y: positions[5].y + 65},
                {x: positions[5].x - 31, y: positions[5].y + 65},
                {x: positions[5].x - 62, y: positions[5].y + 65},
                {x: positions[5].x + 25, y: positions[5].y + 65},
                {x: positions[5].x + 55, y: positions[5].y + 65},
                {x: positions[5].x - 5, y: positions[5].y + 40},
                {x: positions[5].x - 35, y: positions[5].y + 40},
                {x: positions[5].x + 25, y: positions[5].y + 40},
                {x: positions[5].x - 1, y: positions[5].y + 20},
            ],             // House 6
            [
                {x: positions[6].x, y: positions[6].y + 80},
                {x: positions[6].x - 30, y: positions[6].y + 80},
                {x: positions[6].x - 65, y: positions[6].y + 80},
                {x: positions[6].x + 30, y: positions[6].y + 80},
                {x: positions[6].x + 65, y: positions[6].y + 80},
                {x: positions[6].x - 20, y: positions[6].y + 40},
                {x: positions[6].x + 20, y: positions[6].y + 40},
                {x: positions[6].x - 20, y: positions[6].y + 120},
                {x: positions[6].x + 20, y: positions[6].y + 120},
            ],                // House 7
            [
                {x: positions[7].x - 5, y: positions[7].y + 65},
                {x: positions[7].x - 31, y: positions[7].y + 65},
                {x: positions[7].x - 62, y: positions[7].y + 65},
                {x: positions[7].x + 25, y: positions[7].y + 65},
                {x: positions[7].x + 55, y: positions[7].y + 65},
                {x: positions[7].x - 5, y: positions[7].y + 40},
                {x: positions[7].x - 35, y: positions[7].y + 40},
                {x: positions[7].x + 25, y: positions[7].y + 40},
                {x: positions[7].x - 1, y: positions[7].y + 20},
            ],            // House 8
            [
                {x: positions[8].x + 65, y: positions[8].y},
                {x: positions[8].x + 65, y: positions[8].y - 30},
                {x: positions[8].x + 65, y: positions[8].y - 60},
                {x: positions[8].x + 65, y: positions[8].y + 30},
                {x: positions[8].x + 65, y: positions[8].y + 60},
                {x: positions[8].x + 40, y: positions[8].y},
                {x: positions[8].x + 40, y: positions[8].y - 30},
                {x: positions[8].x + 40, y: positions[8].y + 30},
                {x: positions[8].x + 15, y: positions[8].y + 9},
            ],            // House 9
            [
                {x: positions[9].x + 80, y: positions[9].y},
                {x: positions[9].x + 80, y: positions[9].y - 30},
                {x: positions[9].x + 80, y: positions[9].y - 65},
                {x: positions[9].x + 80, y: positions[9].y + 30},
                {x: positions[9].x + 80, y: positions[9].y + 65},
                {x: positions[9].x + 40, y: positions[9].y - 20},
                {x: positions[9].x + 40, y: positions[9].y + 20},
                {x: positions[9].x + 120, y: positions[9].y - 20},
                {x: positions[9].x + 120, y: positions[9].y + 20},
            ],                 // House 10
            [
                {x: positions[10].x + 65, y: positions[10].y},
                {x: positions[10].x + 65, y: positions[10].y - 30},
                {x: positions[10].x + 65, y: positions[10].y - 60},
                {x: positions[10].x + 65, y: positions[10].y + 30},
                {x: positions[10].x + 65, y: positions[10].y + 60},
                {x: positions[10].x + 40, y: positions[10].y},
                {x: positions[10].x + 40, y: positions[10].y - 30},
                {x: positions[10].x + 40, y: positions[10].y + 30},
                {x: positions[10].x + 15, y: positions[10].y + 9},
            ],            // House 11
            [
                {x: positions[11].x - 5, y: positions[11].y - 65},
                {x: positions[11].x - 31, y: positions[11].y - 65},
                {x: positions[11].x - 62, y: positions[11].y - 65},
                {x: positions[11].x + 25, y: positions[11].y - 65},
                {x: positions[11].x + 55, y: positions[11].y - 65},
                {x: positions[11].x - 5, y: positions[11].y - 40},
                {x: positions[11].x - 35, y: positions[11].y - 40},
                {x: positions[11].x + 25, y: positions[11].y - 40},
                {x: positions[11].x - 1, y: positions[11].y - 20},
            ],              // House 12
        ];

        const planetDegreePositions = [
            [
                {x: planetChartPositions[0][0].x + 15, y: planetChartPositions[0][0].y - 10},
                {x: planetChartPositions[0][1].x + 15, y: planetChartPositions[0][1].y - 10},
                {x: planetChartPositions[0][2].x + 15, y: planetChartPositions[0][2].y - 10},
                {x: planetChartPositions[0][3].x + 15, y: planetChartPositions[0][3].y - 10},
                {x: planetChartPositions[0][4].x + 15, y: planetChartPositions[0][4].y - 10},
                {x: planetChartPositions[0][5].x + 15, y: planetChartPositions[0][5].y - 10},
                {x: planetChartPositions[0][6].x + 15, y: planetChartPositions[0][6].y - 10},
                {x: planetChartPositions[0][7].x + 15, y: planetChartPositions[0][7].y - 10},
                {x: planetChartPositions[0][8].x + 15, y: planetChartPositions[0][8].y - 10},
            ],
            [
                {x: planetChartPositions[1][0].x + 15, y: planetChartPositions[1][0].y - 10},
                {x: planetChartPositions[1][1].x + 15, y: planetChartPositions[1][1].y - 10},
                {x: planetChartPositions[1][2].x + 15, y: planetChartPositions[1][2].y - 10},
                {x: planetChartPositions[1][3].x + 15, y: planetChartPositions[1][3].y - 10},
                {x: planetChartPositions[1][4].x + 15, y: planetChartPositions[1][4].y - 10},
                {x: planetChartPositions[1][5].x + 15, y: planetChartPositions[1][5].y - 10},
                {x: planetChartPositions[1][6].x + 15, y: planetChartPositions[1][6].y - 10},
                {x: planetChartPositions[1][7].x + 15, y: planetChartPositions[1][7].y - 10},
                {x: planetChartPositions[1][8].x + 15, y: planetChartPositions[1][8].y - 10},
            ],             // House 2
            [
                {x: planetChartPositions[2][0].x + 15, y: planetChartPositions[2][0].y - 10},
                {x: planetChartPositions[2][1].x + 15, y: planetChartPositions[2][1].y - 10},
                {x: planetChartPositions[2][2].x + 15, y: planetChartPositions[2][2].y - 10},
                {x: planetChartPositions[2][3].x + 15, y: planetChartPositions[2][3].y - 10},
                {x: planetChartPositions[2][4].x + 15, y: planetChartPositions[2][4].y - 10},
                {x: planetChartPositions[2][5].x + 15, y: planetChartPositions[2][5].y - 10},
                {x: planetChartPositions[2][6].x + 15, y: planetChartPositions[2][6].y - 10},
                {x: planetChartPositions[2][7].x + 15, y: planetChartPositions[2][7].y - 10},
                {x: planetChartPositions[2][8].x + 15, y: planetChartPositions[2][8].y - 10},
            ],             // House 3
            [
                {x: planetChartPositions[3][0].x + 15, y: planetChartPositions[3][0].y - 10},
                {x: planetChartPositions[3][1].x + 15, y: planetChartPositions[3][1].y - 10},
                {x: planetChartPositions[3][2].x + 15, y: planetChartPositions[3][2].y - 10},
                {x: planetChartPositions[3][3].x + 15, y: planetChartPositions[3][3].y - 10},
                {x: planetChartPositions[3][4].x + 15, y: planetChartPositions[3][4].y - 10},
                {x: planetChartPositions[3][5].x + 15, y: planetChartPositions[3][5].y - 10},
                {x: planetChartPositions[3][6].x + 15, y: planetChartPositions[3][6].y - 10},
                {x: planetChartPositions[3][7].x + 15, y: planetChartPositions[3][7].y - 10},
                {x: planetChartPositions[3][8].x + 15, y: planetChartPositions[3][8].y - 10},
            ],              // House 4
            [
                {x: planetChartPositions[4][0].x + 15, y: planetChartPositions[4][0].y - 10},
                {x: planetChartPositions[4][1].x + 15, y: planetChartPositions[4][1].y - 10},
                {x: planetChartPositions[4][2].x + 15, y: planetChartPositions[4][2].y - 10},
                {x: planetChartPositions[4][3].x + 15, y: planetChartPositions[4][3].y - 10},
                {x: planetChartPositions[4][4].x + 15, y: planetChartPositions[4][4].y - 10},
                {x: planetChartPositions[4][5].x + 15, y: planetChartPositions[4][5].y - 10},
                {x: planetChartPositions[4][6].x + 15, y: planetChartPositions[4][6].y - 10},
                {x: planetChartPositions[4][7].x + 15, y: planetChartPositions[4][7].y - 10},
                {x: planetChartPositions[4][8].x + 15, y: planetChartPositions[4][8].y - 10},
            ],             // House 5
            [
                {x: planetChartPositions[5][0].x + 15, y: planetChartPositions[5][0].y - 10},
                {x: planetChartPositions[5][1].x + 15, y: planetChartPositions[5][1].y - 10},
                {x: planetChartPositions[5][2].x + 15, y: planetChartPositions[5][2].y - 10},
                {x: planetChartPositions[5][3].x + 15, y: planetChartPositions[5][3].y - 10},
                {x: planetChartPositions[5][4].x + 15, y: planetChartPositions[5][4].y - 10},
                {x: planetChartPositions[5][5].x + 15, y: planetChartPositions[5][5].y - 10},
                {x: planetChartPositions[5][6].x + 15, y: planetChartPositions[5][6].y - 10},
                {x: planetChartPositions[5][7].x + 15, y: planetChartPositions[5][7].y - 10},
                {x: planetChartPositions[5][8].x + 15, y: planetChartPositions[5][8].y - 10},
            ],             // House 6
            [
                {x: planetChartPositions[6][0].x + 15, y: planetChartPositions[6][0].y - 10},
                {x: planetChartPositions[6][1].x + 15, y: planetChartPositions[6][1].y - 10},
                {x: planetChartPositions[6][2].x + 15, y: planetChartPositions[6][2].y - 10},
                {x: planetChartPositions[6][3].x + 15, y: planetChartPositions[6][3].y - 10},
                {x: planetChartPositions[6][4].x + 15, y: planetChartPositions[6][4].y - 10},
                {x: planetChartPositions[6][5].x + 15, y: planetChartPositions[6][5].y - 10},
                {x: planetChartPositions[6][6].x + 15, y: planetChartPositions[6][6].y - 10},
                {x: planetChartPositions[6][7].x + 15, y: planetChartPositions[6][7].y - 10},
                {x: planetChartPositions[6][8].x + 15, y: planetChartPositions[6][8].y - 10},
            ],                 // House 7
            [
                {x: planetChartPositions[7][0].x + 15, y: planetChartPositions[7][0].y - 10},
                {x: planetChartPositions[7][1].x + 15, y: planetChartPositions[7][1].y - 10},
                {x: planetChartPositions[7][2].x + 15, y: planetChartPositions[7][2].y - 10},
                {x: planetChartPositions[7][3].x + 15, y: planetChartPositions[7][3].y - 10},
                {x: planetChartPositions[7][4].x + 15, y: planetChartPositions[7][4].y - 10},
                {x: planetChartPositions[7][5].x + 15, y: planetChartPositions[7][5].y - 10},
                {x: planetChartPositions[7][6].x + 15, y: planetChartPositions[7][6].y - 10},
                {x: planetChartPositions[7][7].x + 15, y: planetChartPositions[7][7].y - 10},
                {x: planetChartPositions[7][8].x + 15, y: planetChartPositions[7][8].y - 10},
            ],            // House 8
            [
                {x: planetChartPositions[8][0].x + 15, y: planetChartPositions[8][0].y - 10},
                {x: planetChartPositions[8][1].x + 15, y: planetChartPositions[8][1].y - 10},
                {x: planetChartPositions[8][2].x + 15, y: planetChartPositions[8][2].y - 10},
                {x: planetChartPositions[8][3].x + 15, y: planetChartPositions[8][3].y - 10},
                {x: planetChartPositions[8][4].x + 15, y: planetChartPositions[8][4].y - 10},
                {x: planetChartPositions[8][5].x + 15, y: planetChartPositions[8][5].y - 10},
                {x: planetChartPositions[8][6].x + 15, y: planetChartPositions[8][6].y - 10},
                {x: planetChartPositions[8][7].x + 15, y: planetChartPositions[8][7].y - 10},
                {x: planetChartPositions[8][8].x + 15, y: planetChartPositions[8][8].y - 10},
            ],            // House 9
            [
                {x: planetChartPositions[9][0].x + 15, y: planetChartPositions[9][0].y - 10},
                {x: planetChartPositions[9][1].x + 15, y: planetChartPositions[9][1].y - 10},
                {x: planetChartPositions[9][2].x + 15, y: planetChartPositions[9][2].y - 10},
                {x: planetChartPositions[9][3].x + 15, y: planetChartPositions[9][3].y - 10},
                {x: planetChartPositions[9][4].x + 15, y: planetChartPositions[9][4].y - 10},
                {x: planetChartPositions[9][5].x + 15, y: planetChartPositions[9][5].y - 10},
                {x: planetChartPositions[9][6].x + 15, y: planetChartPositions[9][6].y - 10},
                {x: planetChartPositions[9][7].x + 15, y: planetChartPositions[9][7].y - 10},
                {x: planetChartPositions[9][8].x + 15, y: planetChartPositions[9][8].y - 10},
            ],               // House 10
            [
                {x: planetChartPositions[10][0].x + 15, y: planetChartPositions[10][0].y - 10},
                {x: planetChartPositions[10][1].x + 15, y: planetChartPositions[10][1].y - 10},
                {x: planetChartPositions[10][2].x + 15, y: planetChartPositions[10][2].y - 10},
                {x: planetChartPositions[10][3].x + 15, y: planetChartPositions[10][3].y - 10},
                {x: planetChartPositions[10][4].x + 15, y: planetChartPositions[10][4].y - 10},
                {x: planetChartPositions[10][5].x + 15, y: planetChartPositions[10][5].y - 10},
                {x: planetChartPositions[10][6].x + 15, y: planetChartPositions[10][6].y - 10},
                {x: planetChartPositions[10][7].x + 15, y: planetChartPositions[10][7].y - 10},
                {x: planetChartPositions[10][8].x + 15, y: planetChartPositions[10][8].y - 10},
            ],            // House 11
            [
                {x: planetChartPositions[11][0].x + 15, y: planetChartPositions[11][0].y - 10},
                {x: planetChartPositions[11][1].x + 15, y: planetChartPositions[11][1].y - 10},
                {x: planetChartPositions[11][2].x + 15, y: planetChartPositions[11][2].y - 10},
                {x: planetChartPositions[11][3].x + 15, y: planetChartPositions[11][3].y - 10},
                {x: planetChartPositions[11][4].x + 15, y: planetChartPositions[11][4].y - 10},
                {x: planetChartPositions[11][5].x + 15, y: planetChartPositions[11][5].y - 10},
                {x: planetChartPositions[11][6].x + 15, y: planetChartPositions[11][6].y - 10},
                {x: planetChartPositions[11][7].x + 15, y: planetChartPositions[11][7].y - 10},
                {x: planetChartPositions[11][8].x + 15, y: planetChartPositions[11][8].y - 10},
            ]              // House 12
        ];

        // Draw the numbers (House 1 to 12 with their corresponding Rashi number)
        for (var i = 0; i < positions.length; i++) {
            var houseNumber = i + 1;
            var rashiNumber = rashiNumbers[houseNumber];
            ctx.font = "16px Arial";
            ctx.fillText(rashiNumber, positions[i].x, positions[i].y); // Draw Rashi number

            rashiPlanets = planetPositions[rashiNumber];
            rashiPlanets.forEach(function (planet, key) {
                let house_degree = Math.floor(planet.house_degree).toString().padStart(2, '0');
                if (planetChartPositions[i].length) {
                    let pcolor = getRandomColor();
                    if (planetChartPositions[i][key]) {
                        let planetName = planet.short;
                        if (planet.retro) {
                            planetName += '®';
                        }
                        ctx.fillStyle = pcolor;
                        ctx.font = 'bold 16px Arial';
                        ctx.textAlign = 'center';
                        ctx.fillText(planetName, planetChartPositions[i][key].x, planetChartPositions[i][key].y); // Draw Planet name

                        if (planetDegreePositions[i][key]) {
                            ctx.fillStyle = pcolor;
                            ctx.font = 'bold 12px Arial';
                            ctx.textAlign = 'right';
                            ctx.fillText(house_degree, planetDegreePositions[i][key].x, planetDegreePositions[i][key].y); // Draw Planet name
                        }
                    }
                }
            });
        }
// Convert canvas to an image and show it in the <img> tag
        const image = canvas.toDataURL('image/png');
        const canvasImage = document.getElementById(exportId)
        canvasImage.src = image;
        const preventCallback = function (e) {
            e.preventDefault();
            return false;
        };
        canvas.addEventListener('drag', preventCallback);
        canvas.addEventListener('dragstart', preventCallback);
        canvas.addEventListener('contextmenu', preventCallback);
    }
    globalThis.createNorthIndianNavamshaChart = function (canvasId, navamsaRashiNumber, planets, exportId) {
        // canvas 2 ============Navamasa Chart===
        var canvas2 = document.getElementById(canvasId);
        var ctx2 = canvas2.getContext("2d");

        // Set the canvas size to 500x500
        canvas2.width = 400;
        canvas2.height = 400;

        ctx2.fillStyle = '#fff'; // Set background color
        ctx2.fillRect(0, 0, canvas2.width, canvas2.height); // Fill the entire canvas with this color

        // Set the size and position of the main square relative to the new canvas size
        var squareSize2 = 400; // Adjusted square size to fit within the 500x500 canvas
        var startX2 = 0; // Adjusted startX to center the square
        var startY2 = 0; // Adjusted startY to center the square

        // Set the line color and thickness
        ctx2.strokeStyle = "#F59D22";
        ctx2.lineWidth = 3;

        // Draw the main square with diagonals
        ctx2.beginPath();
        ctx2.moveTo(startX2, startY2);
        ctx2.lineTo(startX2 + squareSize2, startY2);
        ctx2.lineTo(startX2 + squareSize2, startY2 + squareSize2);
        ctx2.lineTo(startX2, startY2 + squareSize2);
        ctx2.closePath();
        ctx2.stroke();

        // Draw the diagonals
        ctx2.beginPath();
        ctx2.moveTo(startX2, startY2);
        ctx2.lineTo(startX2 + squareSize2, startY2 + squareSize2);
        ctx2.stroke();

        ctx2.beginPath();
        ctx2.moveTo(startX2 + squareSize2, startY2);
        ctx2.lineTo(startX2, startY2 + squareSize2);
        ctx2.stroke();

        // Draw the tilted inner square
        var side22 = squareSize2 / Math.sqrt(2);
        var centerX2 = startX2 + squareSize2 / 2;
        var centerY2 = startY2 + squareSize2 / 2;

        ctx2.save();
        ctx2.translate(centerX2, centerY2);
        ctx2.rotate(Math.PI / 4);

        ctx2.beginPath();
        ctx2.moveTo(-side22 / 2, -side22 / 2);
        ctx2.lineTo(side22 / 2, -side22 / 2);
        ctx2.lineTo(side22 / 2, side22 / 2);
        ctx2.lineTo(-side22 / 2, side22 / 2);
        ctx2.closePath();
        ctx2.stroke();
        ctx2.restore();

        // Add numbers 1 to 12 in each box
        ctx2.font = "16px Arial";
        ctx2.textAlign = "center";
        ctx2.textBaseline = "middle";
        ctx2.fillStyle = "black";

        let planetPositions2 = [];
        Object.values(navamsaRashiNumber).forEach(function (navamsaRashiNumber) {
            planetPositions2[navamsaRashiNumber] = [];
            planets.forEach(function (planet) {
                if (navamsaRashiNumber === planet.navamsa_rashi) {
                    planetPositions2[navamsaRashiNumber].push(planet);
                }
            });
        });

        // Define positions for numbers
        const positions2 = [
            {x: centerX2, y: centerY2 - 20},                 // House 1
            {x: centerX2 - 99, y: startY2 + 85},             // House 2
            {x: startX2 + 85, y: startY2 + 100},             // House 3
            {x: centerX2 - 20, y: centerY2},                 // House 4
            {x: startX2 + 85, y: startY2 + 305},             // House 5
            {x: startX2 + 100, y: startY2 + 325},            // House 6
            {x: centerX2, y: centerY2 + 20},                 // House 7
            {x: startX2 + 300, y: startY2 + 325},            // House 8
            {x: startX2 + 320, y: startY2 + 300},            // House 9
            {x: centerX2 + 20, y: centerY2},                 // House 10
            {x: startX2 + 320, y: startY2 + 100},            // House 11
            {x: centerX2 + 100, y: startY2 + 85}             // House 12
        ];

        const planetChartPositions2 = [
            [
                {x: positions2[0].x, y: positions2[0].y - 80},
                {x: positions2[0].x - 30, y: positions2[0].y - 80},
                {x: positions2[0].x - 65, y: positions2[0].y - 80},
                {x: positions2[0].x + 30, y: positions2[0].y - 80},
                {x: positions2[0].x + 65, y: positions2[0].y - 80},
                {x: positions2[0].x - 20, y: positions2[0].y - 120},
                {x: positions2[0].x + 20, y: positions2[0].y - 120},
                {x: positions2[0].x - 20, y: positions2[0].y - 40},
                {x: positions2[0].x + 20, y: positions2[0].y - 40},
            ],
            [
                {x: positions2[1].x - 5, y: positions2[1].y - 65},
                {x: positions2[1].x - 31, y: positions2[1].y - 65},
                {x: positions2[1].x - 62, y: positions2[1].y - 65},
                {x: positions2[1].x + 25, y: positions2[1].y - 65},
                {x: positions2[1].x + 55, y: positions2[1].y - 65},
                {x: positions2[1].x - 5, y: positions2[1].y - 40},
                {x: positions2[1].x - 35, y: positions2[1].y - 40},
                {x: positions2[1].x + 25, y: positions2[1].y - 40},
                {x: positions2[1].x - 1, y: positions2[1].y - 20},
            ],
            [
                {x: positions2[2].x - 70, y: positions2[2].y},
                {x: positions2[2].x - 70, y: positions2[2].y - 30},
                {x: positions2[2].x - 70, y: positions2[2].y - 60},
                {x: positions2[2].x - 70, y: positions2[2].y + 30},
                {x: positions2[2].x - 70, y: positions2[2].y + 60},
                {x: positions2[2].x - 45, y: positions2[2].y},
                {x: positions2[2].x - 45, y: positions2[2].y - 30},
                {x: positions2[2].x - 45, y: positions2[2].y + 30},
                {x: positions2[2].x - 23, y: positions2[2].y + 9},
            ],
            [
                {x: positions2[3].x - 80, y: positions2[3].y},
                {x: positions2[3].x - 80, y: positions2[3].y - 30},
                {x: positions2[3].x - 80, y: positions2[3].y - 65},
                {x: positions2[3].x - 80, y: positions2[3].y + 30},
                {x: positions2[3].x - 80, y: positions2[3].y + 65},
                {x: positions2[3].x - 120, y: positions2[3].y - 20},
                {x: positions2[3].x - 120, y: positions2[3].y + 20},
                {x: positions2[3].x - 40, y: positions2[3].y - 20},
                {x: positions2[3].x - 40, y: positions2[3].y + 20},
            ],
            [
                {x: positions2[4].x - 70, y: positions2[4].y},
                {x: positions2[4].x - 70, y: positions2[4].y - 30},
                {x: positions2[4].x - 70, y: positions2[4].y - 60},
                {x: positions2[4].x - 70, y: positions2[4].y + 30},
                {x: positions2[4].x - 70, y: positions2[4].y + 60},
                {x: positions2[4].x - 45, y: positions2[4].y},
                {x: positions2[4].x - 45, y: positions2[4].y - 30},
                {x: positions2[4].x - 45, y: positions2[4].y + 30},
                {x: positions2[4].x - 23, y: positions2[4].y + 9},
            ],
            [
                {x: positions2[5].x - 5, y: positions2[5].y + 65},
                {x: positions2[5].x - 31, y: positions2[5].y + 65},
                {x: positions2[5].x - 62, y: positions2[5].y + 65},
                {x: positions2[5].x + 25, y: positions2[5].y + 65},
                {x: positions2[5].x + 55, y: positions2[5].y + 65},
                {x: positions2[5].x - 5, y: positions2[5].y + 40},
                {x: positions2[5].x - 35, y: positions2[5].y + 40},
                {x: positions2[5].x + 25, y: positions2[5].y + 40},
                {x: positions2[5].x - 1, y: positions2[5].y + 20},
            ],
            [
                {x: positions2[6].x, y: positions2[6].y + 80},
                {x: positions2[6].x - 30, y: positions2[6].y + 80},
                {x: positions2[6].x - 65, y: positions2[6].y + 80},
                {x: positions2[6].x + 30, y: positions2[6].y + 80},
                {x: positions2[6].x + 65, y: positions2[6].y + 80},
                {x: positions2[6].x - 20, y: positions2[6].y + 40},
                {x: positions2[6].x + 20, y: positions2[6].y + 40},
                {x: positions2[6].x - 20, y: positions2[6].y + 120},
                {x: positions2[6].x + 20, y: positions2[6].y + 120},
            ],
            [
                {x: positions2[7].x - 5, y: positions2[7].y + 65},
                {x: positions2[7].x - 31, y: positions2[7].y + 65},
                {x: positions2[7].x - 62, y: positions2[7].y + 65},
                {x: positions2[7].x + 25, y: positions2[7].y + 65},
                {x: positions2[7].x + 55, y: positions2[7].y + 65},
                {x: positions2[7].x - 5, y: positions2[7].y + 40},
                {x: positions2[7].x - 35, y: positions2[7].y + 40},
                {x: positions2[7].x + 25, y: positions2[7].y + 40},
                {x: positions2[7].x - 1, y: positions2[7].y + 20},
            ],
            [
                {x: positions2[8].x + 65, y: positions2[8].y},
                {x: positions2[8].x + 65, y: positions2[8].y - 30},
                {x: positions2[8].x + 65, y: positions2[8].y - 60},
                {x: positions2[8].x + 65, y: positions2[8].y + 30},
                {x: positions2[8].x + 65, y: positions2[8].y + 60},
                {x: positions2[8].x + 40, y: positions2[8].y},
                {x: positions2[8].x + 40, y: positions2[8].y - 30},
                {x: positions2[8].x + 40, y: positions2[8].y + 30},
                {x: positions2[8].x + 15, y: positions2[8].y + 9},
            ],
            [
                {x: positions2[9].x + 80, y: positions2[9].y},
                {x: positions2[9].x + 80, y: positions2[9].y - 30},
                {x: positions2[9].x + 80, y: positions2[9].y - 65},
                {x: positions2[9].x + 80, y: positions2[9].y + 30},
                {x: positions2[9].x + 80, y: positions2[9].y + 65},
                {x: positions2[9].x + 40, y: positions2[9].y - 20},
                {x: positions2[9].x + 40, y: positions2[9].y + 20},
                {x: positions2[9].x + 120, y: positions2[9].y - 20},
                {x: positions2[9].x + 120, y: positions2[9].y + 20},
            ],
            [
                {x: positions2[10].x + 65, y: positions2[10].y},
                {x: positions2[10].x + 65, y: positions2[10].y - 30},
                {x: positions2[10].x + 65, y: positions2[10].y - 60},
                {x: positions2[10].x + 65, y: positions2[10].y + 30},
                {x: positions2[10].x + 65, y: positions2[10].y + 60},
                {x: positions2[10].x + 40, y: positions2[10].y},
                {x: positions2[10].x + 40, y: positions2[10].y - 30},
                {x: positions2[10].x + 40, y: positions2[10].y + 30},
                {x: positions2[10].x + 15, y: positions2[10].y + 9},
            ],
            [
                {x: positions2[11].x - 5, y: positions2[11].y - 65},
                {x: positions2[11].x - 31, y: positions2[11].y - 65},
                {x: positions2[11].x - 62, y: positions2[11].y - 65},
                {x: positions2[11].x + 25, y: positions2[11].y - 65},
                {x: positions2[11].x + 55, y: positions2[11].y - 65},
                {x: positions2[11].x - 5, y: positions2[11].y - 40},
                {x: positions2[11].x - 35, y: positions2[11].y - 40},
                {x: positions2[11].x + 25, y: positions2[11].y - 40},
                {x: positions2[11].x - 1, y: positions2[11].y - 20},
            ],              // House 12
        ];

        // Draw the numbers (House 1 to 12 with their corresponding Rashi number)
        for (var i = 0; i < positions2.length; i++) {
            var houseNumber2 = i + 1;
            var rashiNumber2 = navamsaRashiNumber[houseNumber2];

            ctx2.font = "16px Arial";
            ctx2.fillText(rashiNumber2, positions2[i].x, positions2[i].y); // Draw Rashi number

            rashiPlanets2 = planetPositions2[rashiNumber2];
            rashiPlanets2.forEach(function (planet, key) {
                if (planetChartPositions2[i].length) {
                    if (planetChartPositions2[i][key]) {
                        let planetName = planet.short;
                        let pColor = getRandomColor();
                        if (planet.retro) {
                            ctx2.fillStyle = pColor; // Color for retrograde symbol
                            ctx2.font = '12px Arial'; // Smaller font for retrograde symbol
                            ctx2.textAlign = 'center';
                            ctx2.fillText('®', planetChartPositions2[i][key].x, planetChartPositions2[i][key].y - 15); // Positioned 15px above the planet name
                        }
                        ctx2.fillStyle = pColor;
                        ctx2.font = 'bold 16px Arial';
                        ctx2.textAlign = 'center';
                        ctx2.fillText(planetName, planetChartPositions2[i][key].x, planetChartPositions2[i][key].y); // Draw Planet name
                    }
                }
            });
        }

        // Convert canvas to an image and show it in the <img> tag
        const image2 = canvas2.toDataURL('image/png');
        const canvasImage2 = document.getElementById(exportId);
        canvasImage2.src = image2;

        const preventCallback2 = function (e) {
            e.preventDefault();
            return false;
        };
        canvas2.addEventListener('drag', preventCallback2);
        canvas2.addEventListener('dragstart', preventCallback2);
        canvas2.addEventListener('contextmenu', preventCallback2);
    }

    // for south indian charts
    globalThis.createSouthIndianLagnaChart = function (canvasId, planets3, exportId, {name, dateOfBirth, time, rashi, nakshatra}) {
        // Define the rashiNumbers
        const rashiNumbers3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        const canvas3 = document.getElementById(canvasId);
        const ctx3 = canvas3.getContext('2d');

        const squareSize3 = 400; // Updated size of the large square (500x500)
        const numRowsCols3 = 4;  // 4 rows and 4 columns (16 smaller squares)
        // Set the canvas dimensions to match the new square size
        canvas3.width = squareSize3;
        canvas3.height = squareSize3;

        // Set canvas border color
        ctx3.strokeStyle = '#f18f06';
        ctx3.lineWidth = 4;

        // Draw the large square
        ctx3.strokeRect(0, 0, squareSize3, squareSize3);

        // Calculate each small square's size
        const smallsquareSize3 = squareSize3 / numRowsCols3;

        // Set font style for the numbers and text inside the squares
        ctx3.font = '14px Arial'; // Slightly larger font for better visibility
        ctx3.textAlign = 'center';
        ctx3.textBaseline = 'middle';

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 8)];
            }
            return color;
        }

        // Define the positions3 and labels as per the provided chart
        const positions3 = [
            {x: 1, y: 0},
            {x: 2, y: 0},
            {x: 3, y: 0},
            {x: 3, y: 1},
            {x: 3, y: 2},
            {x: 3, y: 3},
            {x: 2, y: 3},
            {x: 1, y: 3},
            {x: 0, y: 3},
            {x: 0, y: 2},
            {x: 0, y: 1},
            {x: 0, y: 0},
        ];

        let ascHouseNumber = 1;
        planets3.forEach(function (planet) {
            if (planet.name === 'Ascendant') {
                ascHouseNumber = planet.rashi_number;
            }
        });
        const houseNumber = [];
        let houseNumberIterator = ascHouseNumber;
        for (let l=1; l<=12; l++) {
            if (houseNumberIterator===13) {
                houseNumberIterator = 1;
            }
            houseNumber[houseNumberIterator++] = l;
        }

        // Draw the numbered squares and labels
        positions3.forEach((pos, index) => {
            const x = pos.x * smallsquareSize3;
            const y = pos.y * smallsquareSize3;

            // Draw the square
            ctx3.strokeRect(x, y, smallsquareSize3, smallsquareSize3);

            ctx3.fillText(houseNumber[index+1], x + smallsquareSize3 / 1.1, y + smallsquareSize3 / 1.1);
            // ctx3.fillText(rashiNumbers3[index], x + smallsquareSize3 / 1.2, y + smallsquareSize3 / 8);
        });

        // Fill the center square with date and Rasi information
        ctx3.fillStyle = 'white'; // Center square background
        ctx3.fillRect(smallsquareSize3, smallsquareSize3, smallsquareSize3 * 2, smallsquareSize3 * 2);
        ctx3.strokeRect(smallsquareSize3, smallsquareSize3, smallsquareSize3 * 2, smallsquareSize3 * 2);

        // Center text content
        ctx3.fillStyle = '#000'; // Text color
        ctx3.font = '16px Arial'; // Adjusted font size for visibility
        ctx3.fillText(name || 'Name', squareSize3 / 2, squareSize3 / 2 - 60);
        ctx3.fillText(dateOfBirth || 'Date of Birth', squareSize3 / 2, squareSize3 / 2 - 30);
        ctx3.fillText(time || 'Time', squareSize3 / 2, squareSize3 / 2);
        ctx3.fillText(rashi || 'Rashi', squareSize3 / 2, squareSize3 / 2 + 30);
        ctx3.fillText(nakshatra || 'Nakshatra', squareSize3 / 2, squareSize3 / 2 + 60);

        // To store the count of planets in each house
        let housePlanetCount3 = Array(12).fill(0);

        // Loop through planets and place them in houses
        planets3.forEach(function (planet) {
            const rashiNumber = planet.rashi_number;  // Planet's rashi_number
            const planetN= planet.name.slice(0, planet.name === 'Ascendant'?3:2);  // Planet's name (take first two letters)
            const houseDegree = Math.floor(planet.house_degree);  // Planet's house degree

            let planetName = planetN;
            if (planet.retro) {
                planetName += '®';
            }

            // Iterate through rashiNumbers3 to find a matching rashi_number
            rashiNumbers3.forEach(function (rashiValue, index) {
                if (rashiValue === rashiNumber) {
                    // Find the corresponding house position based on the index (rashiValue)
                    const housePosition = positions3[index]; // Index corresponds to house

                    // Get how many planets are already in the house (from housePlanetCount3 array)
                    const planetCount = housePlanetCount3[index];

                    // Calculate the position for the planet in the house
                    const x = housePosition.x * smallsquareSize3;
                    const y = housePosition.y * smallsquareSize3;

                    // Calculate the horizontal offset for each planet in the same house
                    const offsetX = (planetCount % 3) * 30;  // Change 40 to the space you want between planet names
                    const offsetY = Math.floor(planetCount / 3) * 20;  // Move to the next line after 3 planets

                    // Update the housePlanetCount for this house
                    housePlanetCount3[index]++;

                    // Set the drawing position with offset
                    const finalX = x + smallsquareSize3 / 4.5 + offsetX;
                    const finalY = y + smallsquareSize3 / 4.5 + offsetY;

                    ctx3.fillStyle = getRandomColor();
                    ctx3.font = 'bold 16px Arial';  // Set font for planet name and degree
                    // Increase the shift to move the degree further right

                    const degreeShift = 10;  // Move right by 10 pixels

                    const degreeY = finalY - 6;  // Keeping the degree's vertical position fixed
                    const degreeX = finalX + degreeShift;  // Apply the shift to the degree position

                    const nameY = finalY + 5; // Add a little space between degree and name

                    // Draw the house degree (higher position) with a shift to the right
                    ctx3.font = 'bold 11px Arial';
                    ctx3.fillText(houseDegree + '°', degreeX, degreeY);


                    // Draw the planet name (lower position)
                    ctx3.font = 'bold 15px Arial';
                    ctx3.fillText(planetName, finalX, nameY);
                }
            });
        });

        // Convert canvas3 to an image and show it in the <img> tag
        const image3 = canvas3.toDataURL('image/png');
        document.getElementById(exportId).src = image3;
    }
    globalThis.createSouthIndianNavamshaChart = function (canvasId, planets4, exportId, {name, dateOfBirth, time, rashi, nakshatra}) {
        const rashiNumbers4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        const canvas4 = document.getElementById(canvasId);
        const ctx4 = canvas4.getContext('2d');

        const squareSize4 = 400; // Updated size of the large square (500x500)
        const numRowsCols4 = 4;  // 4 rows and 4 columns (16 smaller squares)

        // Set the canvas dimensions to match the new square size
        canvas4.width = squareSize4;
        canvas4.height = squareSize4;

        // Set canvas border color
        ctx4.strokeStyle = '#f18f06';
        ctx4.lineWidth = 4;

        // Draw the large square
        ctx4.strokeRect(0, 0, squareSize4, squareSize4);

        // Calculate each small square's size
        const smallsquareSize4 = squareSize4 / numRowsCols4;

        // Set font style for the numbers and text inside the squares
        ctx4.font = '14px Arial'; // Slightly larger font for better visibility
        ctx4.textAlign = 'center';
        ctx4.textBaseline = 'middle';


        // Define the positions4 and labels as per the provided chart
        const positions4 = [
            {x: 1, y: 0},
            {x: 2, y: 0},
            {x: 3, y: 0},
            {x: 3, y: 1},
            {x: 3, y: 2},
            {x: 3, y: 3},
            {x: 2, y: 3},
            {x: 1, y: 3},
            {x: 0, y: 3},
            {x: 0, y: 2},
            {x: 0, y: 1},
            {x: 0, y: 0},
        ];
        let ascHouseNumber = 1;
        planets4.forEach(function (planet) {
            if (planet.name === 'Ascendant') {
                ascHouseNumber = planet.navamsa_rashi;
            }
        });
        const houseNumber = [];
        let houseNumberIterator = ascHouseNumber;
        for (let l=1; l<=12; l++) {
            if (houseNumberIterator===13) {
                houseNumberIterator = 1;
            }
            houseNumber[houseNumberIterator++] = l;
        }
        // Draw the numbered squares and labels
        positions4.forEach((pos, index) => {
            const x = pos.x * smallsquareSize4;
            const y = pos.y * smallsquareSize4;

            // Draw the square
            ctx4.strokeRect(x, y, smallsquareSize4, smallsquareSize4);

            // Draw the number
            ctx4.fillText(houseNumber[index+1], x + smallsquareSize4 / 1.1, y + smallsquareSize4 / 1.1);
            // ctx4.fillText(rashiNumbers4[index], x + smallsquareSize4 / 1.2, y + smallsquareSize4 / 8);
        });

        // Fill the center square with date and Rasi information
        ctx4.fillStyle = 'white'; // Center square background
        ctx4.fillRect(smallsquareSize4, smallsquareSize4, smallsquareSize4 * 2, smallsquareSize4 * 2);
        ctx4.strokeRect(smallsquareSize4, smallsquareSize4, smallsquareSize4 * 2, smallsquareSize4 * 2);

        // Center text content
        ctx4.fillStyle = '#000'; // Text color
        ctx4.font = '16px Arial'; // Adjusted font size for visibility

        ctx4.fillText(name || 'Name', squareSize4 / 2, squareSize4 / 2 - 60);
        ctx4.fillText(dateOfBirth || 'Date of Birth', squareSize4 / 2, squareSize4 / 2 - 30);
        ctx4.fillText(time || 'Time', squareSize4 / 2, squareSize4 / 2);
        ctx4.fillText(rashi || 'Rashi', squareSize4 / 2, squareSize4 / 2 + 30);
        ctx4.fillText(nakshatra || 'Nakshatra', squareSize4 / 2, squareSize4 / 2 + 60);


        let housePlanetCount4 = Array(12).fill(0);

        planets4.forEach(function (planet) {
            const rashiNumber2 = planet.navamsa_rashi;  // Planet's navamsa_rashi
            const planetN2 = planet.name.slice(0, planet.name === 'Ascendant' ? 3 : 2);  // Planet's name (take first two letters)

            let planetName2 = planetN2;  // Base planet name without retrograde symbol

            // Iterate through rashiNumbers4 to find a matching navamsa_rashi
            rashiNumbers4.forEach(function (rashiValue, index) {
                if (rashiValue === rashiNumber2) {
                    // Find the corresponding house position based on the index (rashiValue)
                    const housePosition2 = positions4[index]; // Index corresponds to house

                    // Get how many planets are already in the house (from housePlanetCount array)
                    const planetCount = housePlanetCount4[index];

                    // Calculate the position for the planet in the house
                    const x = housePosition2.x * smallsquareSize4;
                    const y = housePosition2.y * smallsquareSize4;

                    // Calculate the horizontal offset for each planet in the same house
                    const offsetX = (planetCount % 3) * 25;  // Horizontal spacing
                    const offsetY = Math.floor(planetCount / 3) * 20;  // Vertical spacing for overflow

                    // Update the housePlanetCount for this house
                    housePlanetCount4[index]++;

                    // Set the drawing position with offset
                    const finalX = x + smallsquareSize4 / 4 + offsetX;
                    const finalY = y + smallsquareSize4 / 4 + offsetY;

                    // Draw planet name
                    ctx4.fillStyle = getRandomColor();
                    ctx4.font = 'bold 16px Arial';  // Set font for planet name
                    ctx4.fillText(planetName2, finalX, finalY);

                    // Draw retrograde symbol ('®') above the name
                    if (planet.retro) {
                        ctx4.font = '12px Arial';  // Smaller font for the retrograde symbol
                        ctx4.fillText('®', finalX + 5, finalY - 10); // Positioned slightly above the planet name
                    }
                }
            });
        });


        // Convert canvas4 to an image and show it in the <img> tag
        const image4 = canvas4.toDataURL('image/png');
        document.getElementById(exportId).src = image4;
    }

    // for east indian charts
    globalThis.createEastIndianLagnaChart = function (canvasId, planets5, exportId) {
        var rashiNumbers5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        const canvas5 = document.getElementById(canvasId);
        const ctx5 = canvas5.getContext('2d');

        const squareSize5 = 400; // Canvas size
        const numRowsCols5 = 3; // 3x3 grid
        const smallSquareSize5 = squareSize5 / numRowsCols5; // Size of each square

        // Update the canvas size
        canvas5.width = squareSize5;
        canvas5.height = squareSize5;

        // Draw the 3x3 grid
        ctx5.strokeStyle = "#F59D22";
        ctx5.lineWidth = 3;
        for (let i = 1; i < numRowsCols5; i++) {
            // Vertical lines
            ctx5.moveTo(i * smallSquareSize5, 0);
            ctx5.lineTo(i * smallSquareSize5, squareSize5);

            // Horizontal lines
            ctx5.moveTo(0, i * smallSquareSize5);
            ctx5.lineTo(squareSize5, i * smallSquareSize5);
        }
        ctx5.stroke();

        // Add diagonals to the corner squares
        ctx5.beginPath();
        // Top-left corner
        ctx5.moveTo(0, 0);
        ctx5.lineTo(smallSquareSize5, smallSquareSize5);
        // Top-right corner
        ctx5.moveTo(squareSize5, 0);
        ctx5.lineTo(squareSize5 - smallSquareSize5, smallSquareSize5);
        // Bottom-left corner
        ctx5.moveTo(0, squareSize5);
        ctx5.lineTo(smallSquareSize5, squareSize5 - smallSquareSize5);
        // Bottom-right corner
        ctx5.moveTo(squareSize5, squareSize5);
        ctx5.lineTo(squareSize5 - smallSquareSize5, squareSize5 - smallSquareSize5);
        ctx5.stroke();
        // Draw the last border (outer square)
        ctx5.lineWidth = 6;
        ctx5.strokeRect(0, 0, squareSize5, squareSize5);

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 8)];
            }
            return color;
        }

        // Define house numbers and positions
        const housePositions5 = [
            {x: smallSquareSize5 * 1.5, y: smallSquareSize5 / 1.1}, // Top-center
            {x: smallSquareSize5 * 0.94, y: smallSquareSize5 / 1.2}, // Top-right triangle
            {x: smallSquareSize5 * 0.83, y: smallSquareSize5 / 1.08}, // Left diagonal split
            {x: smallSquareSize5 / 1.1, y: smallSquareSize5 * 1.5}, // Left-center
            {x: smallSquareSize5 / 1.2, y: smallSquareSize5 * 2.1}, // Bottom-left triangle
            {x: smallSquareSize5 / 1.1, y: smallSquareSize5 * 2.2}, // Bottom-left triangle
            {x: smallSquareSize5 * 1.5, y: smallSquareSize5 * 2.1}, // Bottom-center
            {x: smallSquareSize5 * 2.1, y: smallSquareSize5 * 2.2}, // Bottom-right triangle
            {x: smallSquareSize5 * 2.2, y: smallSquareSize5 * 2.1}, // Bottom-right triangle
            {x: smallSquareSize5 * 2.2, y: smallSquareSize5 * 1.5}, // Right-center
            {x: smallSquareSize5 * 2.2, y: smallSquareSize5 / 1.05}, // Top-right triangle
            {x: smallSquareSize5 * 2.12, y: smallSquareSize5 / 1.2}, // Top-right triangle
        ];
        const planetChartPositions5 = [
            [
                {x: housePositions5[0].x + 30, y: housePositions5[0].y - 85}, // 9
                {x: housePositions5[0].x - 30, y: housePositions5[0].y - 85}, // 8
                {x: housePositions5[0].x, y: housePositions5[0].y - 85},      // 7
                {x: housePositions5[0].x + 30, y: housePositions5[0].y - 55}, // 6
                {x: housePositions5[0].x - 30, y: housePositions5[0].y - 55}, // 5
                {x: housePositions5[0].x, y: housePositions5[0].y - 55},      // 4
                {x: housePositions5[0].x + 30, y: housePositions5[0].y - 25}, // 3
                {x: housePositions5[0].x - 30, y: housePositions5[0].y - 25}, // 2
                {x: housePositions5[0].x, y: housePositions5[0].y - 25},      // 1
            ],
            [
                {x: housePositions5[1].x - 68, y: housePositions5[1].y - 95}, // 9
                {x: housePositions5[1].x - 40, y: housePositions5[1].y - 95}, // 8
                {x: housePositions5[1].x - 12, y: housePositions5[1].y - 95}, // 7
                {x: housePositions5[1].x - 68, y: housePositions5[1].y - 70}, // 6
                {x: housePositions5[1].x - 40, y: housePositions5[1].y - 70}, // 5
                {x: housePositions5[1].x - 12, y: housePositions5[1].y - 70}, // 4
                {x: housePositions5[1].x - 40, y: housePositions5[1].y - 45}, // 3
                {x: housePositions5[1].x - 12, y: housePositions5[1].y - 45}, // 2
                {x: housePositions5[1].x - 12, y: housePositions5[1].y - 20}, // 1
            ],             // House 2
            [
                {x: housePositions5[2].x - 90, y: housePositions5[2].y - 60},  // 9
                {x: housePositions5[2].x - 90, y: housePositions5[2].y - 30},  // 8
                {x: housePositions5[2].x - 90, y: housePositions5[2].y},       // 7
                {x: housePositions5[2].x - 65, y: housePositions5[2].y - 55},   // 6
                {x: housePositions5[2].x - 65, y: housePositions5[2].y - 30},   // 5
                {x: housePositions5[2].x - 65, y: housePositions5[2].y},        // 4
                {x: housePositions5[2].x - 40, y: housePositions5[2].y - 30},   // 3
                {x: housePositions5[2].x - 40, y: housePositions5[2].y},        // 2
                {x: housePositions5[2].x - 15, y: housePositions5[2].y},        // 1
            ],             // House 3
            [
                {x: housePositions5[3].x - 90, y: housePositions5[3].y + 30}, // 9
                {x: housePositions5[3].x - 90, y: housePositions5[3].y - 30}, // 8
                {x: housePositions5[3].x - 90, y: housePositions5[3].y},      // 7
                {x: housePositions5[3].x - 60, y: housePositions5[3].y + 30}, // 6
                {x: housePositions5[3].x - 60, y: housePositions5[3].y - 30}, // 5
                {x: housePositions5[3].x - 60, y: housePositions5[3].y},      // 4
                {x: housePositions5[3].x - 30, y: housePositions5[3].y + 30}, // 3
                {x: housePositions5[3].x - 30, y: housePositions5[3].y - 30}, // 2
                {x: housePositions5[3].x - 30, y: housePositions5[3].y},      // 1
            ],                 // House 4
            [
                {x: housePositions5[4].x - 90, y: housePositions5[4].y + 57},  // 9
                {x: housePositions5[4].x - 90, y: housePositions5[4].y + 32},  // 8
                {x: housePositions5[4].x - 90, y: housePositions5[4].y + 7},  // 7
                {x: housePositions5[4].x - 65, y: housePositions5[4].y + 57},  // 6
                {x: housePositions5[4].x - 65, y: housePositions5[4].y + 32},  // 5
                {x: housePositions5[4].x - 65, y: housePositions5[4].y + 7},   // 4
                {x: housePositions5[4].x - 45, y: housePositions5[4].y + 32},  // 3
                {x: housePositions5[4].x - 45, y: housePositions5[4].y + 7},   // 2
                {x: housePositions5[4].x - 15, y: housePositions5[4].y + 7},   // 1
            ],            // House 5
            [
                {x: housePositions5[5].x - 68, y: housePositions5[5].y + 100}, // 9
                {x: housePositions5[5].x - 40, y: housePositions5[5].y + 100}, // 8
                {x: housePositions5[5].x - 12, y: housePositions5[5].y + 100}, // 7
                {x: housePositions5[5].x - 68, y: housePositions5[5].y + 75},  // 6
                {x: housePositions5[5].x - 40, y: housePositions5[5].y + 75},  // 5
                {x: housePositions5[5].x - 12, y: housePositions5[5].y + 75},  // 4
                {x: housePositions5[5].x - 40, y: housePositions5[5].y + 50},  // 3
                {x: housePositions5[5].x - 12, y: housePositions5[5].y + 50},  // 2
                {x: housePositions5[5].x - 12, y: housePositions5[5].y + 25},  // 1
            ],             // House 6
            [
                {x: housePositions5[6].x + 30, y: housePositions5[6].y + 85}, // 9
                {x: housePositions5[6].x - 30, y: housePositions5[6].y + 85}, // 8
                {x: housePositions5[6].x, y: housePositions5[6].y + 85},      // 7
                {x: housePositions5[6].x + 30, y: housePositions5[6].y + 55}, // 6
                {x: housePositions5[6].x - 30, y: housePositions5[6].y + 55}, // 5
                {x: housePositions5[6].x, y: housePositions5[6].y + 55},      // 4
                {x: housePositions5[6].x + 30, y: housePositions5[6].y + 25}, // 3
                {x: housePositions5[6].x - 30, y: housePositions5[6].y + 25}, // 2
                {x: housePositions5[6].x, y: housePositions5[6].y + 25},      // 1
            ],                // House 7
            [
                {x: housePositions5[7].x + 54, y: housePositions5[7].y + 100}, // 9
                {x: housePositions5[7].x + 27, y: housePositions5[7].y + 100}, // 8
                {x: housePositions5[7].x, y: housePositions5[7].y + 100},      // 7
                {x: housePositions5[7].x + 54, y: housePositions5[7].y + 75}, // 6
                {x: housePositions5[7].x + 27, y: housePositions5[7].y + 75}, // 5
                {x: housePositions5[7].x + 2, y: housePositions5[7].y + 75},  // 4
                {x: housePositions5[7].x + 27, y: housePositions5[7].y + 50}, // 3
                {x: housePositions5[7].x + 2, y: housePositions5[7].y + 50},  // 2
                {x: housePositions5[7].x + 2, y: housePositions5[7].y + 20},  // 1
            ],            // House 8
            [
                {x: housePositions5[8].x + 90, y: housePositions5[8].y + 57}, // 9
                {x: housePositions5[8].x + 90, y: housePositions5[8].y + 32}, // 8
                {x: housePositions5[8].x + 90, y: housePositions5[8].y + 7},  // 7
                {x: housePositions5[8].x + 65, y: housePositions5[8].y + 57}, // 6
                {x: housePositions5[8].x + 65, y: housePositions5[8].y + 32}, // 5
                {x: housePositions5[8].x + 65, y: housePositions5[8].y + 7},  // 4
                {x: housePositions5[8].x + 40, y: housePositions5[8].y + 32}, // 3
                {x: housePositions5[8].x + 40, y: housePositions5[8].y + 7}, // 2
                {x: housePositions5[8].x + 15, y: housePositions5[8].y + 7}, // 1
            ],            // House 9
            [
                {x: housePositions5[9].x + 75, y: housePositions5[9].y + 30},    // 9
                {x: housePositions5[9].x + 75, y: housePositions5[9].y - 30},    // 8
                {x: housePositions5[9].x + 75, y: housePositions5[9].y},         // 7
                {x: housePositions5[9].x + 45, y: housePositions5[9].y + 30},    // 6
                {x: housePositions5[9].x + 45, y: housePositions5[9].y - 30},    // 5
                {x: housePositions5[9].x + 45, y: housePositions5[9].y},         // 4
                {x: housePositions5[9].x + 15, y: housePositions5[9].y + 30},    // 3
                {x: housePositions5[9].x + 15, y: housePositions5[9].y - 30},    // 2
                {x: housePositions5[9].x + 15, y: housePositions5[9].y},         // 1
            ],                 // House 10
            [
                {x: housePositions5[10].x + 90, y: housePositions5[10].y - 65},  // 9
                {x: housePositions5[10].x + 90, y: housePositions5[10].y - 35},  // 8
                {x: housePositions5[10].x + 90, y: housePositions5[10].y - 5},   // 7
                {x: housePositions5[10].x + 65, y: housePositions5[10].y - 60},  // 6
                {x: housePositions5[10].x + 65, y: housePositions5[10].y - 35},  // 5
                {x: housePositions5[10].x + 65, y: housePositions5[10].y - 5},   // 4
                {x: housePositions5[10].x + 40, y: housePositions5[10].y - 35},  // 3
                {x: housePositions5[10].x + 40, y: housePositions5[10].y - 5},   // 2
                {x: housePositions5[10].x + 10, y: housePositions5[10].y - 5},   // 1
            ],            // House 11
            [
                {x: housePositions5[11].x, y: housePositions5[11].y - 95},      // 7
                {x: housePositions5[11].x + 30, y: housePositions5[11].y - 95}, // 8
                {x: housePositions5[11].x + 60, y: housePositions5[11].y - 95}, // 9
                {x: housePositions5[11].x + 60, y: housePositions5[11].y - 70}, // 6
                {x: housePositions5[11].x + 30, y: housePositions5[11].y - 70}, // 5
                {x: housePositions5[11].x, y: housePositions5[11].y - 70},      // 4
                {x: housePositions5[11].x + 30, y: housePositions5[11].y - 42}, // 3
                {x: housePositions5[11].x, y: housePositions5[11].y - 42},      // 2
                {x: housePositions5[11].x, y: housePositions5[11].y - 20},      // 1
            ],              // House 12
        ];

        const planetDegreePositions5 = [
            [
                {x: planetChartPositions5[0][0].x + 15, y: planetChartPositions5[0][0].y - 10},
                {x: planetChartPositions5[0][1].x + 15, y: planetChartPositions5[0][1].y - 10},
                {x: planetChartPositions5[0][2].x + 15, y: planetChartPositions5[0][2].y - 10},
                {x: planetChartPositions5[0][3].x + 15, y: planetChartPositions5[0][3].y - 10},
                {x: planetChartPositions5[0][4].x + 15, y: planetChartPositions5[0][4].y - 10},
                {x: planetChartPositions5[0][5].x + 15, y: planetChartPositions5[0][5].y - 10},
                {x: planetChartPositions5[0][6].x + 15, y: planetChartPositions5[0][6].y - 10},
                {x: planetChartPositions5[0][7].x + 15, y: planetChartPositions5[0][7].y - 10},
                {x: planetChartPositions5[0][8].x + 15, y: planetChartPositions5[0][8].y - 10},
            ],
            [
                {x: planetChartPositions5[1][0].x + 15, y: planetChartPositions5[1][0].y - 10},
                {x: planetChartPositions5[1][1].x + 15, y: planetChartPositions5[1][1].y - 10},
                {x: planetChartPositions5[1][2].x + 15, y: planetChartPositions5[1][2].y - 10},
                {x: planetChartPositions5[1][3].x + 15, y: planetChartPositions5[1][3].y - 10},
                {x: planetChartPositions5[1][4].x + 15, y: planetChartPositions5[1][4].y - 10},
                {x: planetChartPositions5[1][5].x + 15, y: planetChartPositions5[1][5].y - 10},
                {x: planetChartPositions5[1][6].x + 15, y: planetChartPositions5[1][6].y - 10},
                {x: planetChartPositions5[1][7].x + 15, y: planetChartPositions5[1][7].y - 10},
                {x: planetChartPositions5[1][8].x + 15, y: planetChartPositions5[1][8].y - 10},
            ],             // House 2
            [
                {x: planetChartPositions5[2][0].x + 15, y: planetChartPositions5[2][0].y - 10},
                {x: planetChartPositions5[2][1].x + 15, y: planetChartPositions5[2][1].y - 10},
                {x: planetChartPositions5[2][2].x + 15, y: planetChartPositions5[2][2].y - 10},
                {x: planetChartPositions5[2][3].x + 15, y: planetChartPositions5[2][3].y - 10},
                {x: planetChartPositions5[2][4].x + 15, y: planetChartPositions5[2][4].y - 10},
                {x: planetChartPositions5[2][5].x + 15, y: planetChartPositions5[2][5].y - 10},
                {x: planetChartPositions5[2][6].x + 15, y: planetChartPositions5[2][6].y - 10},
                {x: planetChartPositions5[2][7].x + 15, y: planetChartPositions5[2][7].y - 10},
                {x: planetChartPositions5[2][8].x + 15, y: planetChartPositions5[2][8].y - 10},
            ],             // House 3
            [
                {x: planetChartPositions5[3][0].x + 15, y: planetChartPositions5[3][0].y - 10},
                {x: planetChartPositions5[3][1].x + 15, y: planetChartPositions5[3][1].y - 10},
                {x: planetChartPositions5[3][2].x + 15, y: planetChartPositions5[3][2].y - 10},
                {x: planetChartPositions5[3][3].x + 15, y: planetChartPositions5[3][3].y - 10},
                {x: planetChartPositions5[3][4].x + 15, y: planetChartPositions5[3][4].y - 10},
                {x: planetChartPositions5[3][5].x + 15, y: planetChartPositions5[3][5].y - 10},
                {x: planetChartPositions5[3][6].x + 15, y: planetChartPositions5[3][6].y - 10},
                {x: planetChartPositions5[3][7].x + 15, y: planetChartPositions5[3][7].y - 10},
                {x: planetChartPositions5[3][8].x + 15, y: planetChartPositions5[3][8].y - 10},
            ],              // House 4
            [
                {x: planetChartPositions5[4][0].x + 15, y: planetChartPositions5[4][0].y - 10},
                {x: planetChartPositions5[4][1].x + 15, y: planetChartPositions5[4][1].y - 10},
                {x: planetChartPositions5[4][2].x + 15, y: planetChartPositions5[4][2].y - 10},
                {x: planetChartPositions5[4][3].x + 15, y: planetChartPositions5[4][3].y - 10},
                {x: planetChartPositions5[4][4].x + 15, y: planetChartPositions5[4][4].y - 10},
                {x: planetChartPositions5[4][5].x + 15, y: planetChartPositions5[4][5].y - 10},
                {x: planetChartPositions5[4][6].x + 15, y: planetChartPositions5[4][6].y - 10},
                {x: planetChartPositions5[4][7].x + 15, y: planetChartPositions5[4][7].y - 10},
                {x: planetChartPositions5[4][8].x + 15, y: planetChartPositions5[4][8].y - 10},
            ],             // House 5
            [
                {x: planetChartPositions5[5][0].x + 15, y: planetChartPositions5[5][0].y - 10},
                {x: planetChartPositions5[5][1].x + 15, y: planetChartPositions5[5][1].y - 10},
                {x: planetChartPositions5[5][2].x + 15, y: planetChartPositions5[5][2].y - 10},
                {x: planetChartPositions5[5][3].x + 15, y: planetChartPositions5[5][3].y - 10},
                {x: planetChartPositions5[5][4].x + 15, y: planetChartPositions5[5][4].y - 10},
                {x: planetChartPositions5[5][5].x + 15, y: planetChartPositions5[5][5].y - 10},
                {x: planetChartPositions5[5][6].x + 15, y: planetChartPositions5[5][6].y - 10},
                {x: planetChartPositions5[5][7].x + 15, y: planetChartPositions5[5][7].y - 10},
                {x: planetChartPositions5[5][8].x + 15, y: planetChartPositions5[5][8].y - 10},
            ],             // House 6
            [
                {x: planetChartPositions5[6][0].x + 15, y: planetChartPositions5[6][0].y - 10},
                {x: planetChartPositions5[6][1].x + 15, y: planetChartPositions5[6][1].y - 10},
                {x: planetChartPositions5[6][2].x + 15, y: planetChartPositions5[6][2].y - 10},
                {x: planetChartPositions5[6][3].x + 15, y: planetChartPositions5[6][3].y - 10},
                {x: planetChartPositions5[6][4].x + 15, y: planetChartPositions5[6][4].y - 10},
                {x: planetChartPositions5[6][5].x + 15, y: planetChartPositions5[6][5].y - 10},
                {x: planetChartPositions5[6][6].x + 15, y: planetChartPositions5[6][6].y - 10},
                {x: planetChartPositions5[6][7].x + 15, y: planetChartPositions5[6][7].y - 10},
                {x: planetChartPositions5[6][8].x + 15, y: planetChartPositions5[6][8].y - 10},
            ],                 // House 7
            [
                {x: planetChartPositions5[7][0].x + 15, y: planetChartPositions5[7][0].y - 10},
                {x: planetChartPositions5[7][1].x + 15, y: planetChartPositions5[7][1].y - 10},
                {x: planetChartPositions5[7][2].x + 15, y: planetChartPositions5[7][2].y - 10},
                {x: planetChartPositions5[7][3].x + 15, y: planetChartPositions5[7][3].y - 10},
                {x: planetChartPositions5[7][4].x + 15, y: planetChartPositions5[7][4].y - 10},
                {x: planetChartPositions5[7][5].x + 15, y: planetChartPositions5[7][5].y - 10},
                {x: planetChartPositions5[7][6].x + 15, y: planetChartPositions5[7][6].y - 10},
                {x: planetChartPositions5[7][7].x + 15, y: planetChartPositions5[7][7].y - 10},
                {x: planetChartPositions5[7][8].x + 15, y: planetChartPositions5[7][8].y - 10},
            ],            // House 8
            [
                {x: planetChartPositions5[8][0].x + 15, y: planetChartPositions5[8][0].y - 10},
                {x: planetChartPositions5[8][1].x + 15, y: planetChartPositions5[8][1].y - 10},
                {x: planetChartPositions5[8][2].x + 15, y: planetChartPositions5[8][2].y - 10},
                {x: planetChartPositions5[8][3].x + 15, y: planetChartPositions5[8][3].y - 10},
                {x: planetChartPositions5[8][4].x + 15, y: planetChartPositions5[8][4].y - 10},
                {x: planetChartPositions5[8][5].x + 15, y: planetChartPositions5[8][5].y - 10},
                {x: planetChartPositions5[8][6].x + 15, y: planetChartPositions5[8][6].y - 10},
                {x: planetChartPositions5[8][7].x + 15, y: planetChartPositions5[8][7].y - 10},
                {x: planetChartPositions5[8][8].x + 15, y: planetChartPositions5[8][8].y - 10},
            ],            // House 9
            [
                {x: planetChartPositions5[9][0].x + 15, y: planetChartPositions5[9][0].y - 10},
                {x: planetChartPositions5[9][1].x + 15, y: planetChartPositions5[9][1].y - 10},
                {x: planetChartPositions5[9][2].x + 15, y: planetChartPositions5[9][2].y - 10},
                {x: planetChartPositions5[9][3].x + 15, y: planetChartPositions5[9][3].y - 10},
                {x: planetChartPositions5[9][4].x + 15, y: planetChartPositions5[9][4].y - 10},
                {x: planetChartPositions5[9][5].x + 15, y: planetChartPositions5[9][5].y - 10},
                {x: planetChartPositions5[9][6].x + 15, y: planetChartPositions5[9][6].y - 10},
                {x: planetChartPositions5[9][7].x + 15, y: planetChartPositions5[9][7].y - 10},
                {x: planetChartPositions5[9][8].x + 15, y: planetChartPositions5[9][8].y - 10},
            ],               // House 10
            [
                {x: planetChartPositions5[10][0].x + 15, y: planetChartPositions5[10][0].y - 10},
                {x: planetChartPositions5[10][1].x + 15, y: planetChartPositions5[10][1].y - 10},
                {x: planetChartPositions5[10][2].x + 15, y: planetChartPositions5[10][2].y - 10},
                {x: planetChartPositions5[10][3].x + 15, y: planetChartPositions5[10][3].y - 10},
                {x: planetChartPositions5[10][4].x + 15, y: planetChartPositions5[10][4].y - 10},
                {x: planetChartPositions5[10][5].x + 15, y: planetChartPositions5[10][5].y - 10},
                {x: planetChartPositions5[10][6].x + 15, y: planetChartPositions5[10][6].y - 10},
                {x: planetChartPositions5[10][7].x + 15, y: planetChartPositions5[10][7].y - 10},
                {x: planetChartPositions5[10][8].x + 15, y: planetChartPositions5[10][8].y - 10},
            ],            // House 11
            [
                {x: planetChartPositions5[11][0].x + 15, y: planetChartPositions5[11][0].y - 10},
                {x: planetChartPositions5[11][1].x + 15, y: planetChartPositions5[11][1].y - 10},
                {x: planetChartPositions5[11][2].x + 15, y: planetChartPositions5[11][2].y - 10},
                {x: planetChartPositions5[11][3].x + 15, y: planetChartPositions5[11][3].y - 10},
                {x: planetChartPositions5[11][4].x + 15, y: planetChartPositions5[11][4].y - 10},
                {x: planetChartPositions5[11][5].x + 15, y: planetChartPositions5[11][5].y - 10},
                {x: planetChartPositions5[11][6].x + 15, y: planetChartPositions5[11][6].y - 10},
                {x: planetChartPositions5[11][7].x + 15, y: planetChartPositions5[11][7].y - 10},
                {x: planetChartPositions5[11][8].x + 15, y: planetChartPositions5[11][8].y - 10},
            ]              // House 12
        ];

        // Render house numbers
        ctx5.font = '18px Arial';
        ctx5.fillStyle = 'black';
        ctx5.textAlign = 'center';
        ctx5.textBaseline = 'middle';

        let ascHouseNumber = 1;
        planets5.forEach(function (planet) {
            if (planet.name === 'Ascendant') {
                ascHouseNumber = planet.rashi_number;
            }
        });
        const houseNumber = [];
        let houseNumberIterator = ascHouseNumber;
        for (let l=1; l<=12; l++) {
            if (houseNumberIterator===13) {
                houseNumberIterator = 1;
            }
            houseNumber[houseNumberIterator++] = l;
        }

        rashiNumbers5.forEach((rashiNumber, index) => {
            const pos = housePositions5[index];
            ctx5.font = "16px Arial";
            ctx5.fillText(houseNumber[rashiNumber], pos.x, pos.y); // Draw the house number

            // Check if any planet's rashi_number matches the current rashiNumber
            const planetPosition = planetChartPositions5[index];// Get the same position for the planet
            const degreePosition = planetDegreePositions5[index];// Get the same position for the planet

            const rashiPlanets = planets5.filter(planet => planet.rashi_number === rashiNumber)

            rashiPlanets.forEach((planet, i) => {
                // if (![0,1,2,3,4,5].includes(i)) return;
                if (planet.rashi_number === rashiNumber) {
                    // Display the first two letters of the planet's name at the starting position
                    const planetN = planet.name.slice(0, planet.name==='Ascendant'?3:2); // Slice to get the first two letters
                    let planetName = planetN;
                    let pColor=getRandomColor();

                    if (planet.retro) {
                        planetName += '®';
                    }

                    ctx5.fillStyle = pColor;
                    ctx5.font = 'bold 16px Arial';
                    ctx5.textAlign = 'center';
                    ctx5.fillText(planetName, planetPosition[i].x, planetPosition[i].y); // Planet name at house position

                    // Display the house degree above the planet name at the same starting position
                    ctx5.fillStyle = pColor;
                    ctx5.font = 'bold 12px Arial';
                    ctx5.textAlign = 'right';
                    let houseDegree = Math.floor(planet.house_degree).toString().padStart(2, '0');
                    ctx5.fillText(houseDegree, degreePosition[i].x, degreePosition[i].y); // House degree above
                }
            });
        });


        const image5 = canvas5.toDataURL('image/png');
        document.getElementById(exportId).src = image5;
    }
    globalThis.createEastIndianNavamshaChart = function (canvasId, planets5, exportId) {
        var rashiNumbers5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const canvas6 = document.getElementById(canvasId);
        const ctx6 = canvas6.getContext('2d');

        const squareSize6 = 400; // Canvas size
        const numRowsCols6 = 3; // 3x3 grid
        const smallSquareSize6 = squareSize6 / numRowsCols6; // Size of each square

        const squareSize5 = 400; // Canvas size
        const numRowsCols5 = 3; // 3x3 grid
        const smallSquareSize5 = squareSize5 / numRowsCols5; // Size of each square

        // Update the canvas size
        canvas6.width = squareSize6;
        canvas6.height = squareSize6;

        // Draw the 3x3 grid
        ctx6.strokeStyle = "#F59D22";
        ctx6.lineWidth = 3;
        for (let i = 1; i < numRowsCols6; i++) {
            // Vertical lines
            ctx6.moveTo(i * smallSquareSize6, 0);
            ctx6.lineTo(i * smallSquareSize6, squareSize6);

            // Horizontal lines
            ctx6.moveTo(0, i * smallSquareSize6);
            ctx6.lineTo(squareSize6, i * smallSquareSize6);
        }
        ctx6.stroke();

        // Add diagonals to the corner squares
        ctx6.beginPath();
        // Top-left corner
        ctx6.moveTo(0, 0);
        ctx6.lineTo(smallSquareSize6, smallSquareSize6);
        // Top-right corner
        ctx6.moveTo(squareSize6, 0);
        ctx6.lineTo(squareSize6 - smallSquareSize6, smallSquareSize6);
        // Bottom-left corner
        ctx6.moveTo(0, squareSize6);
        ctx6.lineTo(smallSquareSize6, squareSize6 - smallSquareSize6);
        // Bottom-right corner
        ctx6.moveTo(squareSize6, squareSize6);
        ctx6.lineTo(squareSize6 - smallSquareSize6, squareSize6 - smallSquareSize6);
        ctx6.stroke();
        // Draw the last border (outer square)
        ctx6.lineWidth = 6;
        ctx6.strokeRect(0, 0, squareSize6, squareSize6);
        // Render house numbers
        ctx6.font = '16px Arial';
        ctx6.fillStyle = 'black';
        ctx6.textAlign = 'center';
        ctx6.textBaseline = 'middle';

        // Define house numbers and positions
        const housePositions5 = [
            {x: smallSquareSize5 * 1.5, y: smallSquareSize5 / 1.1}, // Top-center
            {x: smallSquareSize5 * 0.94, y: smallSquareSize5 / 1.2}, // Top-right triangle
            {x: smallSquareSize5 * 0.83, y: smallSquareSize5 / 1.08}, // Left diagonal split
            {x: smallSquareSize5 / 1.1, y: smallSquareSize5 * 1.5}, // Left-center
            {x: smallSquareSize5 / 1.2, y: smallSquareSize5 * 2.1}, // Bottom-left triangle
            {x: smallSquareSize5 / 1.1, y: smallSquareSize5 * 2.2}, // Bottom-left triangle
            {x: smallSquareSize5 * 1.5, y: smallSquareSize5 * 2.1}, // Bottom-center
            {x: smallSquareSize5 * 2.1, y: smallSquareSize5 * 2.2}, // Bottom-right triangle
            {x: smallSquareSize5 * 2.2, y: smallSquareSize5 * 2.1}, // Bottom-right triangle
            {x: smallSquareSize5 * 2.2, y: smallSquareSize5 * 1.5}, // Right-center
            {x: smallSquareSize5 * 2.2, y: smallSquareSize5 / 1.05}, // Top-right triangle
            {x: smallSquareSize5 * 2.12, y: smallSquareSize5 / 1.2}, // Top-right triangle
        ];
        const planetChartPositions5 = [
            [
                {x: housePositions5[0].x + 30, y: housePositions5[0].y - 90}, // 9
                {x: housePositions5[0].x - 30, y: housePositions5[0].y - 90}, // 8
                {x: housePositions5[0].x, y: housePositions5[0].y - 90},      // 7
                {x: housePositions5[0].x + 30, y: housePositions5[0].y - 60}, // 6
                {x: housePositions5[0].x - 30, y: housePositions5[0].y - 60}, // 5
                {x: housePositions5[0].x, y: housePositions5[0].y - 60},      // 4
                {x: housePositions5[0].x + 30, y: housePositions5[0].y - 30}, // 3
                {x: housePositions5[0].x - 30, y: housePositions5[0].y - 30}, // 2
                {x: housePositions5[0].x, y: housePositions5[0].y - 30},      // 1
            ],
            [
                {x: housePositions5[1].x - 68, y: housePositions5[1].y - 90}, // 9
                {x: housePositions5[1].x - 40, y: housePositions5[1].y - 90}, // 8
                {x: housePositions5[1].x - 12, y: housePositions5[1].y - 90}, // 7
                {x: housePositions5[1].x - 68, y: housePositions5[1].y - 65}, // 6
                {x: housePositions5[1].x - 40, y: housePositions5[1].y - 65}, // 5
                {x: housePositions5[1].x - 12, y: housePositions5[1].y - 65}, // 4
                {x: housePositions5[1].x - 40, y: housePositions5[1].y - 40}, // 3
                {x: housePositions5[1].x - 12, y: housePositions5[1].y - 40}, // 2
                {x: housePositions5[1].x - 12, y: housePositions5[1].y - 15}, // 1
            ],             // House 2
            [
                {x: housePositions5[2].x - 90, y: housePositions5[2].y - 60},  // 9
                {x: housePositions5[2].x - 90, y: housePositions5[2].y - 30},  // 8
                {x: housePositions5[2].x - 90, y: housePositions5[2].y},       // 7
                {x: housePositions5[2].x - 65, y: housePositions5[2].y - 55},   // 6
                {x: housePositions5[2].x - 65, y: housePositions5[2].y - 30},   // 5
                {x: housePositions5[2].x - 65, y: housePositions5[2].y},        // 4
                {x: housePositions5[2].x - 40, y: housePositions5[2].y - 30},   // 3
                {x: housePositions5[2].x - 40, y: housePositions5[2].y},        // 2
                {x: housePositions5[2].x - 15, y: housePositions5[2].y},        // 1
            ],             // House 3
            [
                {x: housePositions5[3].x - 90, y: housePositions5[3].y + 30}, // 9
                {x: housePositions5[3].x - 90, y: housePositions5[3].y - 30}, // 8
                {x: housePositions5[3].x - 90, y: housePositions5[3].y},      // 7
                {x: housePositions5[3].x - 60, y: housePositions5[3].y + 30}, // 6
                {x: housePositions5[3].x - 60, y: housePositions5[3].y - 30}, // 5
                {x: housePositions5[3].x - 60, y: housePositions5[3].y},      // 4
                {x: housePositions5[3].x - 30, y: housePositions5[3].y + 30}, // 3
                {x: housePositions5[3].x - 30, y: housePositions5[3].y - 30}, // 2
                {x: housePositions5[3].x - 30, y: housePositions5[3].y},      // 1
            ],                 // House 4
            [
                {x: housePositions5[4].x - 90, y: housePositions5[4].y + 57},  // 9
                {x: housePositions5[4].x - 90, y: housePositions5[4].y + 32},  // 8
                {x: housePositions5[4].x - 90, y: housePositions5[4].y + 7},  // 7
                {x: housePositions5[4].x - 65, y: housePositions5[4].y + 57},  // 6
                {x: housePositions5[4].x - 65, y: housePositions5[4].y + 32},  // 5
                {x: housePositions5[4].x - 65, y: housePositions5[4].y + 7},   // 4
                {x: housePositions5[4].x - 40, y: housePositions5[4].y + 32},  // 3
                {x: housePositions5[4].x - 40, y: housePositions5[4].y + 7},   // 2
                {x: housePositions5[4].x - 15, y: housePositions5[4].y + 7},   // 1
            ],            // House 5
            [
                {x: housePositions5[5].x - 68, y: housePositions5[5].y + 100}, // 9
                {x: housePositions5[5].x - 40, y: housePositions5[5].y + 100}, // 8
                {x: housePositions5[5].x - 12, y: housePositions5[5].y + 100}, // 7
                {x: housePositions5[5].x - 68, y: housePositions5[5].y + 75},  // 6
                {x: housePositions5[5].x - 40, y: housePositions5[5].y + 75},  // 5
                {x: housePositions5[5].x - 12, y: housePositions5[5].y + 75},  // 4
                {x: housePositions5[5].x - 40, y: housePositions5[5].y + 50},  // 3
                {x: housePositions5[5].x - 12, y: housePositions5[5].y + 50},  // 2
                {x: housePositions5[5].x - 12, y: housePositions5[5].y + 25},  // 1
            ],             // House 6
            [
                {x: housePositions5[6].x + 30, y: housePositions5[6].y + 85}, // 9
                {x: housePositions5[6].x - 30, y: housePositions5[6].y + 85}, // 8
                {x: housePositions5[6].x, y: housePositions5[6].y + 85},      // 7
                {x: housePositions5[6].x + 30, y: housePositions5[6].y + 55}, // 6
                {x: housePositions5[6].x - 30, y: housePositions5[6].y + 55}, // 5
                {x: housePositions5[6].x, y: housePositions5[6].y + 55},      // 4
                {x: housePositions5[6].x + 30, y: housePositions5[6].y + 25}, // 3
                {x: housePositions5[6].x - 30, y: housePositions5[6].y + 25}, // 2
                {x: housePositions5[6].x, y: housePositions5[6].y + 25},      // 1
            ],                // House 7
            [
                {x: housePositions5[7].x + 54, y: housePositions5[7].y + 100}, // 9
                {x: housePositions5[7].x + 27, y: housePositions5[7].y + 100}, // 8
                {x: housePositions5[7].x, y: housePositions5[7].y + 100},      // 7
                {x: housePositions5[7].x + 54, y: housePositions5[7].y + 75}, // 6
                {x: housePositions5[7].x + 27, y: housePositions5[7].y + 75}, // 5
                {x: housePositions5[7].x + 2, y: housePositions5[7].y + 75},  // 4
                {x: housePositions5[7].x + 27, y: housePositions5[7].y + 50}, // 3
                {x: housePositions5[7].x + 2, y: housePositions5[7].y + 50},  // 2
                {x: housePositions5[7].x + 2, y: housePositions5[7].y + 20},  // 1
            ],            // House 8
            [
                {x: housePositions5[8].x + 90, y: housePositions5[8].y + 57}, // 9
                {x: housePositions5[8].x + 90, y: housePositions5[8].y + 32}, // 8
                {x: housePositions5[8].x + 90, y: housePositions5[8].y + 7},  // 7
                {x: housePositions5[8].x + 65, y: housePositions5[8].y + 57}, // 6
                {x: housePositions5[8].x + 65, y: housePositions5[8].y + 32}, // 5
                {x: housePositions5[8].x + 65, y: housePositions5[8].y + 7},  // 4
                {x: housePositions5[8].x + 40, y: housePositions5[8].y + 32}, // 3
                {x: housePositions5[8].x + 40, y: housePositions5[8].y + 7}, // 2
                {x: housePositions5[8].x + 15, y: housePositions5[8].y + 7}, // 1
            ],            // House 9
            [
                {x: housePositions5[9].x + 75, y: housePositions5[9].y + 30},    // 9
                {x: housePositions5[9].x + 75, y: housePositions5[9].y - 30},    // 8
                {x: housePositions5[9].x + 75, y: housePositions5[9].y},         // 7
                {x: housePositions5[9].x + 45, y: housePositions5[9].y + 30},    // 6
                {x: housePositions5[9].x + 45, y: housePositions5[9].y - 30},    // 5
                {x: housePositions5[9].x + 45, y: housePositions5[9].y},         // 4
                {x: housePositions5[9].x + 15, y: housePositions5[9].y + 30},    // 3
                {x: housePositions5[9].x + 15, y: housePositions5[9].y - 30},    // 2
                {x: housePositions5[9].x + 15, y: housePositions5[9].y},         // 1
            ],                 // House 10
            [
                {x: housePositions5[10].x + 90, y: housePositions5[10].y - 65},  // 9
                {x: housePositions5[10].x + 90, y: housePositions5[10].y - 35},  // 8
                {x: housePositions5[10].x + 90, y: housePositions5[10].y - 5},   // 7
                {x: housePositions5[10].x + 65, y: housePositions5[10].y - 60},  // 6
                {x: housePositions5[10].x + 65, y: housePositions5[10].y - 35},  // 5
                {x: housePositions5[10].x + 65, y: housePositions5[10].y - 5},   // 4
                {x: housePositions5[10].x + 40, y: housePositions5[10].y - 35},  // 3
                {x: housePositions5[10].x + 40, y: housePositions5[10].y - 5},   // 2
                {x: housePositions5[10].x + 10, y: housePositions5[10].y - 5},   // 1
            ],            // House 11
            [
                {x: housePositions5[11].x, y: housePositions5[11].y - 90},      // 7
                {x: housePositions5[11].x + 30, y: housePositions5[11].y - 90}, // 8
                {x: housePositions5[11].x + 60, y: housePositions5[11].y - 90}, // 9
                {x: housePositions5[11].x + 60, y: housePositions5[11].y - 65}, // 6
                {x: housePositions5[11].x + 30, y: housePositions5[11].y - 65}, // 5
                {x: housePositions5[11].x, y: housePositions5[11].y - 65},      // 4
                {x: housePositions5[11].x + 30, y: housePositions5[11].y - 37}, // 3
                {x: housePositions5[11].x, y: housePositions5[11].y - 37},      // 2
                {x: housePositions5[11].x, y: housePositions5[11].y - 15},      // 1
            ],              // House 12
        ];

        const planetChartPositions6 = planetChartPositions5;
        planetChartPositions6[10][0].x = planetChartPositions6[10][0].x + 7;
        planetChartPositions6[10][0].y = planetChartPositions6[10][0].y - 12;
        planetChartPositions6[9][0].x = planetChartPositions6[10][0].x + 3;

        let ascHouseNumber = 1;
        planets5.forEach(function (planet) {
            if (planet.name === 'Ascendant') {
                ascHouseNumber = planet.navamsa_rashi;
            }
        });
        const houseNumber = [];
        let houseNumberIterator = ascHouseNumber;
        for (let l=1; l<=12; l++) {
            if (houseNumberIterator===13) {
                houseNumberIterator = 1;
            }
            houseNumber[houseNumberIterator++] = l;
        }

        rashiNumbers5.forEach((rashiNumber, index) => {
            const pos = housePositions5[index];

            ctx6.font = '16px Arial';
            ctx6.fillStyle = 'black';
            ctx6.textAlign = 'center';
            ctx6.fillText(houseNumber[rashiNumber], pos.x, pos.y);

            const planetPosition = planetChartPositions6[index];// Get the same position for the planet

            const navamsaPlanets = planets5.filter(planet => planet.navamsa_rashi === rashiNumber)


            // Check if any planet's rashi_number matches the current rashiNumber
            navamsaPlanets.forEach((planet, i) => {
                const planetPos = planetPosition[i]; // Get the same position for the planet

                // Display the first two letters of the planet's name at the starting position
                const planetN = planet.name.slice(0, planet.name==='Ascendant'?3:2); // Slice to get the first two letters
                let planetName = planetN;
                let pColor = getRandomColor();
                if (planet.retro) {
                    ctx6.fillStyle = pColor; // Color for retrograde symbol
                    ctx6.font = '12px Arial'; // Smaller font for retrograde symbol
                    ctx6.textAlign = 'center';
                    ctx6.fillText('®', planetPos.x, planetPos.y - 10); // Positioned 15px above the planet name
                }
                ctx6.font = 'bold 14px Arial';
                ctx6.fillStyle = pColor;
                ctx6.textAlign = 'center';
                ctx6.fillText(planetName, planetPos.x, planetPos.y); // Planet name at house position
            });
        });

        const image6 = canvas6.toDataURL('image/png');
        document.getElementById(exportId).src = image6;
    }
	
	globalThis.chartCombineVabRashi = function (canvasId, house, planets, exportImageId, options = {}) {
        options = {
            showHouses: options.showHouses ?? true,
            showBackground: options.showBackground ?? true,
            whiteBackground: options.whiteBackground ?? false,
            customBackground: options.customBackground ?? false,
        };
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');

        const canvasX = canvas.width / 2;
        const canvasY = canvas.height / 2;
        const radius8 = 200;
        const houseradius8 = 230;
        const rotationOffset8 = (285 * Math.PI) / 180;

        const houseDegrees = [
            -house[1],
            -house[2],
            -house[3],
            -house[4],
            -house[5],
            -house[6],
            -house[7],
            -house[8],
            -house[9],
            -house[10],
            -house[11],
            -house[12]
        ];

        const planetRadii8 = {
            Moon: 120,
            Mercury: 150,
            Venus: 135,
            Sun: 165,
            Mars: 180,
            Jupiter: 195,
            Saturn: 210,
            Rahu: 100,
            Ketu: 100
        };

        // Define the planet icons and abbreviations
        const planetIcons8 = {
            'Sun': assetUrl('/images/checkmyastro-chart/sun.png'),
            'Moon': assetUrl('/images/checkmyastro-chart/moon.png'),
            'Mars': assetUrl('/images/checkmyastro-chart/mars.png'),
            'Mercury': assetUrl('/images/checkmyastro-chart/mercury.png'),
            'Jupiter': assetUrl('/images/checkmyastro-chart/jupiter.png'),
            'Venus': assetUrl('/images/checkmyastro-chart/venus.png'),
            'Saturn': assetUrl('/images/checkmyastro-chart/saturn.png'),
            'Rahu': assetUrl('/images/checkmyastro-chart/rahu.png'),
            'Ketu': assetUrl('/images/checkmyastro-chart/ketu.png'),
            'Ascendant': assetUrl('/images/checkmyastro-chart/asc.png'),
        };

        const planetAbbreviations8 = {
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

        const backgroundImage8 = new Image();
        backgroundImage8.src = assetUrl("/images/checkmyastro-chart/img-back-all.jpg");

        // Wait for the background image and planet icons to load before drawing
        let imagesLoaded = 0;
        const totalImages = Object.keys(planetIcons8).length + 1;  // Add 1 for the background image

        // Load all planet icons
        const loadedIcons = {};
        for (const planet in planetIcons8) {
            const icon = new Image();
            if (planetIcons8[planet]) {

            }
            icon.src = planetIcons8[planet];
            icon.onload = function () {
                loadedIcons[planet] = icon;
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    drawChart(); // All images are loaded, now draw the chart
                }
            };
        }

        // Wait for the background image to load
        backgroundImage8.onload = function () {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                drawChart(); // All images are loaded, now draw the chart
            }
        };

        function degreesToRadians8(degrees) {
            return (degrees * Math.PI) / 180;
        }

        function getPlanetDegrees8() {
            const planetDegrees = {};
            planets.forEach(function (planet) {
                // Add the minus sign before degree
                planetDegrees[planet.name] = -parseFloat(planet.degree);
            });
            return planetDegrees;
        }

        function drawChart() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Fill white background if requested
            if (options.whiteBackground) {
                // Fill with white
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Optionally draw a background overlay
                const backgroundImageBhav = new Image();
                backgroundImageBhav.src = assetUrl("/images/checkmyastro-chart/img-back-bhav.jpg");
                backgroundImageBhav.onload = () => {
                    ctx.drawImage(backgroundImageBhav, 0, 0, canvas.width, canvas.height);
                    // Continue after image is ready
                    if (options.showHouses) drawHouses();
                    drawPlanets();
                    showImage();
                };

                // Stop execution until image is loaded
                return;
            }


            // Draw the background image if enabled
            if (options.showBackground) {
                if (options.customBackground === true) {
                    // Fill with white
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Optionally draw a background overlay
                    const backgroundImageRashi = new Image();
                    backgroundImageRashi.src = assetUrl("/images/checkmyastro-chart/img-back-rashi.jpg");
                    backgroundImageRashi.onload = () => {
                        ctx.drawImage(backgroundImageRashi, 0, 0, canvas.width, canvas.height);
                        // Continue after image is ready
                        if (options.showHouses) drawHouses();
                        drawPlanets();
                        showImage();
                    };
                    return;
                }
                else {
                    ctx.drawImage(backgroundImage8, 0, 0, canvas.width, canvas.height);
                }
            }

            // Draw the houses if enabled
            if (options.showHouses) {
                drawHouses();
            }

            // Always draw planets
            drawPlanets();

            // Export image after drawing everything
            showImage();
        }


        function drawHouses() {

            const invisibleradius8 = 75;
            let houseAngles = [];

            for (let i = 0; i < houseDegrees.length; i++) {
                const angleStart = degreesToRadians8(houseDegrees[i]) + rotationOffset8;
                const angleEnd = degreesToRadians8(houseDegrees[(i + 1) % 12]) + rotationOffset8;

                const x1 = canvasX + houseradius8 * Math.cos(angleStart);
                const y1 = canvasY + houseradius8 * Math.sin(angleStart);

                const x2 = canvasX + houseradius8 * Math.cos(angleEnd);
                const y2 = canvasY + houseradius8 * Math.sin(angleEnd);

                ctx.beginPath();
                ctx.moveTo(canvasX, canvasY);
                ctx.lineTo(x1, y1);
                ctx.strokeStyle = "rgb(243, 149, 8)";
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(canvasX, canvasY);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = "rgb(243, 149, 8)";
                ctx.lineWidth = 1;
                ctx.stroke();

                let houseAngle = (angleStart + angleEnd) / 2;

                let roundHouseAngle = parseFloat(houseAngle.toFixed(5));

                // Check for duplicate angle and move opposite if needed
                if (houseAngles.includes(roundHouseAngle)) {
                    let haIndex =  houseAngles.findIndex(haItem => haItem === roundHouseAngle);
                    if (angleStart < 0) {
                        roundHouseAngle = parseFloat((houseAngle + Math.PI).toFixed(5)); // Move to the opposite side (180 degrees or π radians)
                    } else {
                        houseAngles[haIndex] = parseFloat((houseAngles[haIndex] + Math.PI).toFixed(5))
                    }
                }

                houseAngles.push(roundHouseAngle);
            }

            for (let i = 0; i < houseDegrees.length; i++) {
                const textX = canvasX + invisibleradius8 * Math.cos(houseAngles[i]);
                const textY = canvasY + invisibleradius8 * Math.sin(houseAngles[i]);

                ctx.font = "15px Arial";
                ctx.fillStyle = "black";
                ctx.fillText(String(i + 1), textX, textY);
            }
        }

        function drawPlanets() {
            const planetDegrees = getPlanetDegrees8();
            const planetPositions = [];
            for (const planetName in planetDegrees) {
                const degree = planetDegrees[planetName];
                const angle = degreesToRadians8(degree) + rotationOffset8;
                const planetradius8 = planetRadii8[planetName] || radius8;
                const planetX = canvasX + planetradius8 * Math.cos(angle);
                const planetY = canvasY + planetradius8 * Math.sin(angle);

                // Draw the planet icon
                const icon = loadedIcons[planetName];
                const iconSize = 20;
                ctx.drawImage(icon, planetX - iconSize / 2, planetY - iconSize / 2, iconSize, iconSize);

                planetPositions.push({
                    planetName,
                    planetX,
                    planetY,
                });
            }
            planetPositions.forEach(pos => {
                const { planetName, planetX, planetY } = pos;

                const _planet = planets.find(p => p.name === planetName);

                let abbreviation = planetAbbreviations8[planetName];
                if (_planet?.retro) abbreviation += '®';

                const iconSize = 20;
                ctx.font = "bold 16px Arial";
                ctx.fillStyle = getRandomColor();
                ctx.textAlign = "center";
                ctx.fillText(abbreviation, planetX, planetY - iconSize / 2);
            });
        }

        function showImage() {
            const imageURL8 = canvas.toDataURL();  // Convert canvas to an image URL
            const displayedImage8 = document.getElementById(exportImageId);
            displayedImage8.src = imageURL8; // Set the image source
            displayedImage8.style.display = "block"; // Show the image
        }
    };
    globalThis.createCheckMyAstroChartNavamsa = function (canvasId, house, planets, exportImageId) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');

        const canvasX = canvas.width / 2;
        const canvasY = canvas.height / 2;
        const radius8 = 200;  // Base radius for the planet positions
        const houseradius8 = 230;  // radius for the house lines
        const rotationOffset8 = (285 * Math.PI) / 180;  // 285 degrees anticlockwise

        const houseDegrees = [
            -house[1],
            -house[2],
            -house[3],
            -house[4],
            -house[5],
            -house[6],
            -house[7],
            -house[8],
            -house[9],
            -house[10],
            -house[11],
            -house[12]
        ];

        const planetRadii8 = {
            Moon: 120,
            Mercury: 150,
            Venus: 135,
            Sun: 165,
            Mars: 180,
            Jupiter: 195,
            Saturn: 210,
            Rahu: 100,
            Ketu: 100
        };

        // Define the planet icons and abbreviations
        const planetIcons8 = {
            'Sun': assetUrl('/images/checkmyastro-chart/sun.png'),
            'Moon': assetUrl('/images/checkmyastro-chart/moon.png'),
            'Mars': assetUrl('/images/checkmyastro-chart/mars.png'),
            'Mercury': assetUrl('/images/checkmyastro-chart/mercury.png'),
            'Jupiter': assetUrl('/images/checkmyastro-chart/jupiter.png'),
            'Venus': assetUrl('/images/checkmyastro-chart/venus.png'),
            'Saturn': assetUrl('/images/checkmyastro-chart/saturn.png'),
            'Rahu': assetUrl('/images/checkmyastro-chart/rahu.png'),
            'Ketu': assetUrl('/images/checkmyastro-chart/ketu.png'),
            'Ascendant': assetUrl('/images/checkmyastro-chart/asc.png'),
        };

        const planetAbbreviations8 = {
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

        const backgroundImage8 = new Image();
        backgroundImage8.src = assetUrl("/images/checkmyastro-chart/img-back-rashi.jpg");

        // Wait for the background image and planet icons to load before drawing
        let imagesLoaded = 0;
        const totalImages = Object.keys(planetIcons8).length + 1;  // Add 1 for the background image

        // Load all planet icons
        const loadedIcons = {};
        for (const planet in planetIcons8) {
            const icon = new Image();
            if (planetIcons8[planet]) {

            }
            icon.src = planetIcons8[planet];
            icon.onload = function () {
                loadedIcons[planet] = icon;
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    drawChart(); // All images are loaded, now draw the chart
                }
            };
        }

        // Wait for the background image to load
        backgroundImage8.onload = function () {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                drawChart(); // All images are loaded, now draw the chart
            }
        };

        function degreesToRadians8(degrees) {
            return (degrees * Math.PI) / 180;
        }

        function getPlanetDegrees8() {
            const planetDegrees = {};
            planets.forEach(function (planet) {
                // Add the minus sign before degree
                planetDegrees[planet.name] = -parseFloat(planet.d9_full_degree);
            });
            return planetDegrees;
        }

        function drawChart() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the background image
            ctx.drawImage(backgroundImage8, 0, 0, canvas.width, canvas.height);

            // Draw the houses
            // drawHouses();

            // Draw the planets with hardcoded degrees
            drawPlanets();

            // Export image after drawing everything
            showImage();
        }

        function drawHouses() {

            const invisibleradius8 = 75;
            let houseAngles = [];

            for (let i = 0; i < houseDegrees.length; i++) {
                const angleStart = degreesToRadians8(houseDegrees[i]) + rotationOffset8;
                const angleEnd = degreesToRadians8(houseDegrees[(i + 1) % 12]) + rotationOffset8;

                const x1 = canvasX + houseradius8 * Math.cos(angleStart);
                const y1 = canvasY + houseradius8 * Math.sin(angleStart);

                const x2 = canvasX + houseradius8 * Math.cos(angleEnd);
                const y2 = canvasY + houseradius8 * Math.sin(angleEnd);

                ctx.beginPath();
                ctx.moveTo(canvasX, canvasY);
                ctx.lineTo(x1, y1);
                ctx.strokeStyle = "rgb(243, 149, 8)";
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(canvasX, canvasY);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = "rgb(243, 149, 8)";
                ctx.lineWidth = 1;
                ctx.stroke();

                let houseAngle = (angleStart + angleEnd) / 2;

                let roundHouseAngle = parseFloat(houseAngle.toFixed(5));

                // Check for duplicate angle and move opposite if needed
                if (houseAngles.includes(roundHouseAngle)) {
                    let haIndex =  houseAngles.findIndex(haItem => haItem === roundHouseAngle);
                    if (angleStart < 0) {
                        roundHouseAngle = parseFloat((houseAngle + Math.PI).toFixed(5)); // Move to the opposite side (180 degrees or π radians)
                    } else {
                        houseAngles[haIndex] = parseFloat((houseAngles[haIndex] + Math.PI).toFixed(5))
                    }
                }

                houseAngles.push(roundHouseAngle);
            }

            for (let i = 0; i < houseDegrees.length; i++) {
                const textX = canvasX + invisibleradius8 * Math.cos(houseAngles[i]);
                const textY = canvasY + invisibleradius8 * Math.sin(houseAngles[i]);

                ctx.font = "15px Arial";
                ctx.fillStyle = "black";
                // ctx.fillText(String(i + 1), textX, textY);
            }
        }

        function drawPlanets() {
            const planetDegrees = getPlanetDegrees8();
            const planetPositions = [];
            for (const planetName in planetDegrees) {
                const degree = planetDegrees[planetName];
                const angle = degreesToRadians8(degree) + rotationOffset8;
                const planetradius8 = planetRadii8[planetName] || radius8;
                const planetX = canvasX + planetradius8 * Math.cos(angle);
                const planetY = canvasY + planetradius8 * Math.sin(angle);

                // Draw the planet icon
                const icon = loadedIcons[planetName];
                const iconSize = 20;
                ctx.drawImage(icon, planetX - iconSize / 2, planetY - iconSize / 2, iconSize, iconSize);

                planetPositions.push({
                    planetName,
                    planetX,
                    planetY,
                });
            }
            planetPositions.forEach(pos => {
                const { planetName, planetX, planetY } = pos;

                const _planet = planets.find(p => p.name === planetName);

                let abbreviation = planetAbbreviations8[planetName];
                if (_planet?.retro) abbreviation += '®';

                const iconSize = 20;
                ctx.font = "bold 16px Arial";
                ctx.fillStyle = getRandomColor();
                ctx.textAlign = "center";
                ctx.fillText(abbreviation, planetX, planetY - iconSize / 2);
            });
        }

        function showImage() {
            const imageURL8 = canvas.toDataURL();  // Convert canvas to an image URL
            const displayedImage8 = document.getElementById(exportImageId);
            displayedImage8.src = imageURL8; // Set the image source
            displayedImage8.style.display = "block"; // Show the image
        }
    };