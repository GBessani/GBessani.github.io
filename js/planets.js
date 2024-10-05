
export function createPlanet(size, textureUrl, emissive = 0x000000, tl) {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const texture = tl.load(textureUrl);
    const material = new THREE.MeshPhongMaterial({
        map: texture,
        emissive: emissive,
        emissiveIntensity: 0.5
    });
    const planet = new THREE.Mesh(geometry, material);
    planet.castShadow = true;
    planet.receiveShadow = true;
    return planet;
}

export const orbitalElements = {
    earth: {
        semiMajorAxis: 149.6,  // Unidade: milhões de km
        eccentricity: 0.0167,
        inclination: THREE.MathUtils.degToRad(0.00005),  // Aproximado, em radianos
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(-11.26064),  // Graus convertidos em radianos
        argumentOfPeriapsis: THREE.MathUtils.degToRad(114.20783),  // Graus convertidos em radianos
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(358.617),  // Graus convertidos em radianos
        epoch: 2451545.0, // Tempo juliano
        link: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
        sizeOf: 3.9,
        name: 'Terra',
        distance: '150 milhões de km'
    },
    moon: {
        semiMajorAxis: 0.384,  // Unidade: milhões de km
        eccentricity: 0.0549,
        inclination: THREE.MathUtils.degToRad(5.145),  // Aproximado, em radianos
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(125.08),  // Graus convertidos em radianos
        argumentOfPeriapsis: THREE.MathUtils.degToRad(318.15),  // Graus convertidos em radianos
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(115.365),  // Graus convertidos em radianos
        epoch: 2451545.0, // Tempo juliano
        link: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg',
        name: 'Lua',
        sizeOf: '1',
        distance: '384 mil km',
    },
    venus: {
        semiMajorAxis: 108.2,
        eccentricity: 0.0067,
        inclination: THREE.MathUtils.degToRad(3.39),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(76.680),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(131.532),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(50.115),
        epoch: 2451545.0,
        link: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Solarsystemscope_texture_8k_venus_surface.jpg',
        name: 'Vênus',
        sizeOf: '3.7',
        distance: '108 milhões de km'
    },
    mercury: {
        semiMajorAxis: 57.91,
        eccentricity: 0.2056,
        inclination: THREE.MathUtils.degToRad(7.005),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(48.331),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(29.124),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(174.796),
        epoch: 2451545.0,
        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQHHhttyRZnbpliW8ftwD7BQUZs6aTPmI7eQ&s',
        name: 'Mercúrio',
        sizeOf: '1.5',
        distance: '58 milhões de km'
    },
    mars: {
        semiMajorAxis: 227.9,
        eccentricity: 0.0934,
        inclination: THREE.MathUtils.degToRad(1.85),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(49.558),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(286.537),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(19.412),
        epoch: 2451545.0,
        link:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0ELDdWdnToVXeznMHPNmZPjB9-jKy1p68Q&s',
        name: 'Marte',
        sizeOf: '2.1',
        distance: '228 milhões de km'
    },
    phobos: {
        semiMajorAxis: 0.0069,  // Unidade: milhões de km (aproximadamente 6,9 km)
        eccentricity: 0.0151,
        inclination: THREE.MathUtils.degToRad(1.08),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(113.68),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(212.42),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(236.0),
        epoch: 2451545.0,
        link: 'https://cdn.pixabay.com/photo/2022/06/30/02/16/mercury-7292788_1280.jpg',
        name: 'Mercúrio',
        sizeOf: '1.5',
        distance: '58 milhões de km'
    },
    deimos: {
        semiMajorAxis: 0.0235,  // Unidade: milhões de km (aproximadamente 23,5 km)
        eccentricity: 0.0007,
        inclination: THREE.MathUtils.degToRad(0.93),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(174.91),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(122.38),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(229.76),
        epoch: 2451545.0,
        link:'https://lh4.googleusercontent.com/proxy/_J0h01q8yY5_bB1jm52HTUYUgqKvM-O0XT86aVczsQLGApv0_pzwy_Y7R-SMro96-2CXcZuC0XjGtcJbX7E1EGcKqW0p4C86jwaFCaMRUPSObfljziHw',
        name: 'Deimos',
        sizeOf: '0.004',
        distance: '23,5 mil km'
    },
    saturn: {
        semiMajorAxis: 1430,
        eccentricity: 0.0565,
        inclination: THREE.MathUtils.degToRad(2.485),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(113.665),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(336.313),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(217.613),
        epoch: 2451545.0,
        link: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e0763947-6f42-4d09-944f-c2d6f41c415b/dcaift0-422ad564-f7b0-4291-914f-425b9ac29a35.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UwNzYzOTQ3LTZmNDItNGQwOS05NDRmLWMyZDZmNDFjNDE1YlwvZGNhaWZ0MC00MjJhZDU2NC1mN2IwLTQyOTEtOTE0Zi00MjViOWFjMjlhMzUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.YYTxK1xSwJxGTBIMLHsgFWiwrdd0W6UqmXy7a5CCnnk',
        name: 'Saturno',
        sizeOf: '4.5',
        distance: '1.2 bilhões de km'
    }

};

export function createAllPlanets(textureLoader, scene) {
    var planets = [];
    for (const planetName in orbitalElements) {
        const planet = createPlanet(orbitalElements[planetName].sizeOf, orbitalElements[planetName].link, 0x000000,textureLoader);
        planet.name = orbitalElements[planetName].name;
        planet.size = orbitalElements[planetName].sizeOf;
        planet.distance = orbitalElements[planetName].distance;
        planets.push(planet);
        scene.add(planet);
    }
    return planets;
}