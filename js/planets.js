
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
        sizeOf: '10', //1.5
        distance: '58 milhões de km'
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
        sizeOf: '10', //3.7
        distance: '108 milhões de km'
    },
    earth: {
        semiMajorAxis: 149.6,  // Unidade: milhões de km
        eccentricity: 0.0167,
        inclination: THREE.MathUtils.degToRad(0.00005),  // Aproximado, em radianos
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(-11.26064),  // Graus convertidos em radianos
        argumentOfPeriapsis: THREE.MathUtils.degToRad(114.20783),  // Graus convertidos em radianos
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(358.617),  // Graus convertidos em radianos
        epoch: 2451545.0, // Tempo juliano
        link: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
        sizeOf: '10', //3.9
        name: 'Terra',
        distance: '149.6 milhoes de quilometros',

        descricao:`A Terra, com um diâmetro de cerca de 12.742 km, é o maior dos planetas rochosos do Sistema Solar. Ela tem uma massa de aproximadamente 5,97 x 10²⁴ kg e orbita o Sol a uma distância de cerca de 149,6 milhões de km (1 UA). A estrutura da Terra consiste em um núcleo interno sólido de ferro e níquel, um núcleo externo líquido, um manto de silicato e uma crosta sólida. Sua atmosfera é composta principalmente de nitrogênio (78%) e oxigênio (21%). A Terra leva 365,25 dias para orbitar o Sol e tem um satélite natural, a Lua. Seu campo magnético forte a protege da radiação solar.`,
        
        description:`The Earth, with a diameter of about 12,742 km, is the largest of the rocky planets in the Solar System. It has a mass of approximately 5.97 x 10²⁴ kg and orbits the Sun at a distance of about 149.6 million km (1 AU). Earth's structure consists of a solid iron-nickel inner core, a liquid outer core, a silicate mantle, and a solid crust. Its atmosphere is mainly nitrogen (78%) and oxygen (21%). Earth takes 365.25 days to orbit the Sun and has one natural satellite, the Moon. Its strong magnetic field shields it from solar radiation.`
      
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
        sizeOf: '3',
        distance: '384 mil km',
        name: 'lua',

        descricao:`A Lua, único satélite natural da Terra, tem um diâmetro de aproximadamente 3.474 km, o que a torna o quinto maior satélite do Sistema Solar. Sua massa é de cerca de 7,35 x 10²² kg, ou cerca de 1,2% da massa da Terra. A Lua orbita a uma distância média de 384.400 km da Terra. Sua composição inclui uma crosta feita de basalto e anortosito, um manto rico em magnésio e ferro, e um pequeno núcleo de ferro. A Lua tem uma exosfera extremamente fina e nenhum campo magnético significativo, com sua superfície marcada por crateras, montanhas e planícies.`,
        
        description:`The Moon, Earth's only natural satellite, has a diameter of approximately 3,474 km, making it the fifth-largest satellite in the Solar System. Its mass is about 7.35 x 10²² kg, or around 1.2% of Earth's mass. The Moon orbits at an average distance of 384,400 km from Earth. Its composition includes a crust made of basalt and anorthosite, a mantle rich in magnesium and iron, and a small iron core. The Moon has an extremely thin exosphere and no significant magnetic field, with its surface marked by craters, mountains, and plains.`
        
       
    },
    venus: {
        semiMajorAxis: 108.2,
        eccentricity: 0.0067,
        inclination: THREE.MathUtils.degToRad(3.39),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(76.680),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(131.532),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(50.115),
        epoch: 2451545.0,
        sizeOf: '10',
        link: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Solarsystemscope_texture_8k_venus_surface.jpg',
        name: 'Venus',
        distance: '108.2 milhoes de quilometros',

        descricao:`Vênus, frequentemente chamada de "planeta irmão da Terra", tem um diâmetro de aproximadamente 12.104 km, ligeiramente menor que a Terra. Com uma massa de cerca de 4,87 x 10²⁴ kg, é 82% da massa da Terra. Sua distância da Terra varia, mas pode chegar a cerca de 38 milhões de km. Vênus é composta principalmente de rochas e metais, com um núcleo metálico, manto de silicato e uma crosta fina. Conhecida por sua espessa atmosfera de dióxido de carbono, Vênus sofre um intenso efeito estufa, resultando em temperaturas de superfície em torno de 462°C. Ela leva 225 dias terrestres para orbitar o Sol e gira lentamente no sentido contrário.`,

        description:`Venus, often called Earth's "sister planet," has a diameter of approximately 12,104 km, slightly smaller than Earth. With a mass of about 4.87 x 10²⁴ kg, it is 82% the mass of Earth. Its distance from Earth varies but can be around 38 million km. Venus is composed mainly of rocks and metals, with a metallic core, silicate mantle, and a thin crust. Known for its thick carbon dioxide atmosphere, Venus experiences an intense greenhouse effect, resulting in surface temperatures around 462°C. It takes 225 Earth days to orbit the Sun and rotates slowly in the opposite direction.`
       
    },
    mercury: {
        semiMajorAxis: 57.91,
        eccentricity: 0.2056,
        inclination: THREE.MathUtils.degToRad(7.005),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(48.331),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(29.124),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(174.796),
        epoch: 2451545.0,
        sizeOf: '10',
        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQHHhttyRZnbpliW8ftwD7BQUZs6aTPmI7eQ&s',
        name: 'Mercurio',
        distance:'57.9 milhoes de quilometros',

        descricao:`Mercúrio, o planeta mais próximo do Sol, tem um diâmetro de aproximadamente 4.880 km e uma massa de 3,3 x 10²³ kg. A distância mínima entre Mercúrio e a Terra é de cerca de 77 milhões de km. Composto principalmente de metais e silicatos, seu núcleo de ferro ocupa cerca de 75% do raio do planeta. Mercúrio não possui uma atmosfera densa, mas sim uma exosfera composta de oxigênio, sódio, hidrogênio, hélio e potássio, resultando em grandes variações de temperatura. Ele orbita o Sol em 88 dias terrestres.`,
        
        description:`Mercury, the closest planet to the Sun, has a diameter of approximately 4,880 km and a mass of 3.3 x 10²³ kg. The minimum distance between Mercury and Earth is about 77 million km. Composed mainly of metals and silicates, its iron core occupies about 75% of the planet's radius. Mercury lacks a dense atmosphere, having instead an exosphere made of oxygen, sodium, hydrogen, helium, and potassium, leading to extreme temperature variations. It orbits the Sun in 88 Earth days.`
      
    },
    mars: {
        semiMajorAxis: 227.9,
        eccentricity: 0.0934,
        inclination: THREE.MathUtils.degToRad(1.85),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(49.558),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(286.537),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(19.412),
        epoch: 2451545.0,
        sizeOf: '10',
        link:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0ELDdWdnToVXeznMHPNmZPjB9-jKy1p68Q&s',
        name: 'Marte',
        distance:'227.9 milhoes de quilometros',
        descricao:`Marte, o quarto planeta a partir do Sol, tem um diâmetro de aproximadamente 6.779 km, cerca de metade do tamanho da Terra. Com uma massa de 6,42 x 10²³ kg, Marte é aproximadamente 10,7% tão massivo quanto a Terra. Ele está localizado a cerca de 54,6 milhões de km da Terra, dependendo de suas posições orbitais. Marte tem um núcleo de ferro, níquel e enxofre, um manto rochoso e uma superfície rica em óxidos de ferro, que lhe dão sua cor vermelha distinta. Sua atmosfera fina, composta principalmente de dióxido de carbono (95%), não pode suportar água líquida estável. Marte leva 687 dias terrestres para orbitar o Sol e possui duas pequenas luas, Fobos e Deimos.`,
       
        description:`Mars, the fourth planet from the Sun, has a diameter of approximately 6,779 km, about half of Earth's size. With a mass of 6.42 x 10²³ kg, Mars is around 10.7% as massive as Earth. It lies about 54.6 million km from Earth, depending on their orbital positions. Mars has a core of iron, nickel, and sulfur, a rocky mantle, and a surface rich in iron oxides, giving it a distinctive red hue. Its thin atmosphere, primarily composed of carbon dioxide (95%), cannot support stable liquid water. Mars takes 687 Earth days to orbit the Sun and has two small moons, Phobos and Deimos.`
      
    },
    phobos: {
        semiMajorAxis: 0.0069,  // Unidade: milhões de km (aproximadamente 6,9 km)
        eccentricity: 0.0151,
        inclination: THREE.MathUtils.degToRad(1.08),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(113.68),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(212.42),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(236.0),
        epoch: 2451545.0,
        link: 'https://lh4.googleusercontent.com/proxy/_J0h01q8yY5_bB1jm52HTUYUgqKvM-O0XT86aVczsQLGApv0_pzwy_Y7R-SMro96-2CXcZuC0XjGtcJbX7E1EGcKqW0p4C86jwaFCaMRUPSObfljziHw',
        name: 'Phobos',
        sizeOf: '2', //1.5
        distance: '58 milhões de quilometros'
    },
    deimos: {
        semiMajorAxis: 0.0235,  // Unidade: milhões de km (aproximadamente 23,5 km)
        eccentricity: 0.0007,
        inclination: THREE.MathUtils.degToRad(0.93),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(174.91),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(122.38),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(229.76),
        epoch: 2451545.0,
        link:'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5938ae9e-47de-424a-8836-f98e6658d37b/dczaq88-d97d6ecd-a233-48a8-b1bc-74fd3327f95c.png/v1/fill/w_1264,h_632,q_70,strp/deimos_texture_map_by_askaniy_dczaq88-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjA0OCIsInBhdGgiOiJcL2ZcLzU5MzhhZTllLTQ3ZGUtNDI0YS04ODM2LWY5OGU2NjU4ZDM3YlwvZGN6YXE4OC1kOTdkNmVjZC1hMjMzLTQ4YTgtYjFiYy03NGZkMzMyN2Y5NWMucG5nIiwid2lkdGgiOiI8PTQwOTYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.hNuoyXLVNFXX4E21fnZN6hAhDAW1VPNBsNdDzYwmGhk',
        name: 'Deimos',
        sizeOf: '2', //0.004
        distance: '23,5 mil km'
    },
    
    jupter: {
        semiMajorAxis: 1430,
        eccentricity: 0.0565,
        inclination: THREE.MathUtils.degToRad(2.485),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(113.665),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(336.313),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(217.613),
        epoch: 2451545.0,
        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg1YV8717y2fhv0VOsDmEmFzKS7qGviXG3PQ&s',
        name: 'Jupter',
        sizeOf: '10', //4.5
        distance: '1.2 bilhões de quilometros'
    },

    saturn: {
        semiMajorAxis: 2000,
        eccentricity: 0.0565,
        inclination: THREE.MathUtils.degToRad(2.485),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(113.665),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(336.313),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(217.613),
        epoch: 2451545.0,
        link: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e0763947-6f42-4d09-944f-c2d6f41c415b/dcaift0-422ad564-f7b0-4291-914f-425b9ac29a35.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UwNzYzOTQ3LTZmNDItNGQwOS05NDRmLWMyZDZmNDFjNDE1YlwvZGNhaWZ0MC00MjJhZDU2NC1mN2IwLTQyOTEtOTE0Zi00MjViOWFjMjlhMzUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.YYTxK1xSwJxGTBIMLHsgFWiwrdd0W6UqmXy7a5CCnnk',
        sizeOf: '10',
        name: 'Saturno',
        distance: '1.43 bilhões de quilometros',
        descricao: `Saturno, o segundo maior planeta do sistema solar, tem um diâmetro de cerca de 116.460 km e uma massa 95 vezes maior que a da Terra. Ele orbita o Sol a uma distância de aproximadamente 1,43 bilhões de km, levando 29,5 anos terrestres para completar uma órbita. Composto principalmente de hidrogênio (96%) e hélio (3%), Saturno não possui uma superfície sólida. Sua atmosfera apresenta faixas de nuvens, e ele é famoso por seu icônico sistema de anéis feitos de gelo e rocha. Saturno tem 83 luas conhecidas, incluindo Titã, maior que Mercúrio, e Encélado, com oceanos subterrâneos indicados por gêiseres de gelo.`,
        
        description:`Saturn, the second-largest planet in the solar system, has a diameter of about 116,460 km and a mass 95 times that of Earth. It orbits the Sun at a distance of approximately 1.43 billion km, taking 29.5 Earth years to complete one orbit. Composed mainly of hydrogen (96%) and helium (3%), Saturn lacks a solid surface. Its atmosphere features cloud bands, and it is renowned for its iconic ring system made of ice and rock. Saturn has 83 known moons, including Titan, larger than Mercury, and Enceladus, with subsurface oceans indicated by icy geysers.`

    },
    urano: {
        semiMajorAxis: 2870,
        eccentricity: 0.0457,
        inclination: THREE.MathUtils.degToRad(0.772),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(74.229),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(96.541),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(142.238),
        epoch: 2451545.0,
        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg1YV8717y2fhv0VOsDmEmFzKS7qGviXG3PQ&s',
        name: 'Urano',
        sizeOf: '10',
        distance: '2.87 bilhões de quilometros',
        descricao:`Urano, o sétimo planeta do sistema solar, tem um diâmetro de cerca de 50.724 km e uma massa 14,5 vezes maior que a da Terra. Ele orbita o Sol a uma distância de aproximadamente 2,87 bilhões de km, levando 84 anos terrestres para completar uma órbita. Composto principalmente de gelo de água, amônia e metano, Urano tem uma atmosfera de hidrogênio e hélio. Ele é conhecido por seu eixo de rotação inclinado, que o faz girar de lado. Urano tem 27 luas conhecidas, incluindo Miranda, com falésias de 20
        km de altura, e Titânia, a maior lua do planeta.`,
        description:`Uranus, the seventh planet in the solar system, has a diameter of about 50,724 km and a mass 14.5 times that of Earth. It orbits the Sun at a distance of approximately 2.87 billion km, taking 84 Earth years to complete one orbit. Composed mainly of water ice, ammonia, and methane, Uranus has an atmosphere of hydrogen and helium. It is known for its inclined rotation axis, causing it to spin on its side. Uranus has 27 known moons, including Miranda, with 20 km-high cliffs, and Titania, the planet's largest moon.`
    },
    netuno: {
        semiMajorAxis: 4495,
        eccentricity: 0.0113,
        inclination: THREE.MathUtils.degToRad(1.769),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(131.721),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(272.846),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(256.228),
        epoch: 2451545.0,
        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg1YV8717y2fhv0VOsDmEmFzKS7qGviXG3PQ&s',
        name: 'Netuno',
        sizeOf: '10',
        distance: '4.495 bilhões de quilometros',
        descricao:`Netuno, o oitavo planeta do sistema solar, tem um diâmetro de cerca de 49.244 km e uma massa 17 vezes maior que a da Terra. Ele orbita o Sol a uma distância de aproximadamente 4,495 bilhões de km, levando 165 anos terrestres para completar uma órbita. Composto principalmente de gelo de água, amônia e metano, Netuno tem uma atmosfera de hidrogênio e hélio. Ele é conhec
        ido por suas tempestades, incluindo a Grande Mancha Escura, e por sua lua Tritão, que orbita em sentido contrário à rotação do planeta.`,
        description:`Neptune, the eighth planet in the solar system, has a diameter of about 49,244 km and a mass 17 times that of Earth. It orbits the Sun at a distance of approximately 4.495 billion km, taking 165 Earth years to complete one orbit. Composed mainly of water ice, ammonia, and methane, Neptune has an atmosphere of hydrogen and helium. It is known for its storms, including the Great Dark Spot, and for its moon Triton, which orbits in the opposite direction of the planet's rotation.`
    },
    pluto: {
        semiMajorAxis: 5906,
        eccentricity: 0.2488,
        inclination: THREE.MathUtils.degToRad(17.16),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(110.299),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(113.834),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(14.53),
        epoch: 2451545.0,
        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg1YV8717y2fhv0VOsDmEmFzKS7qGviXG3PQ&s',
        name: 'Plutão',
        sizeOf: '10',
        distance: '5.906 bilhões de quilometros',
        descricao:`Plutão, um planeta anão no sistema solar, tem um diâmetro de cerca de 2.377 km e uma massa 0,0022 vezes a da Terra. Ele orbita o Sol a uma distância de aproximadamente 5,906 bilhões de km, levando 248 anos terrestres para completar uma órbita. Composto principalmente de gelo de água, metano e nitrogênio, Plutão tem uma atmosfera de nitrogênio, metano e monóxido de carbono. Ele é conhecido por sua lua Caronte, que é quase do mesmo tamanho que Plutão e orbita em um sistema binário com ele.`,
        description:`Pluto, a dwarf planet in the solar system, has a diameter of about 2,377 km and a mass 0.0022 times that of Earth. It orbits the Sun at a distance of approximately 5.906 billion km, taking 248 Earth years to complete one orbit. Composed mainly of water ice, methane, and nitrogen, Pluto has an atmosphere of nitrogen, methane, and carbon monoxide. It is known for its moon Charon, which is nearly the same size as Pluto and orbits in a binary system with it.`
    }

};

export function createAllPlanets(textureLoader, scene) {
    var planets = [];
    var num  = 0;
    for (const planetName in orbitalElements) {
        const planet = createPlanet(orbitalElements[planetName].sizeOf, orbitalElements[planetName].link, 0x000000,textureLoader);
        planet.name = orbitalElements[planetName].name;
        planet.size = orbitalElements[planetName].sizeOf;
        planet.distance = orbitalElements[planetName].distance;
        planet.descricao = orbitalElements[planetName].descricao;
        planets.push(planet);
        scene.add(planet);
        let NomeParaAdicionar = document.getElementById("nome-do-planeta");
        NomeParaAdicionar.innerHTML = NomeParaAdicionar.innerHTML + `<option value="${num}">${planet.name}</option>`;
        num++;
        
    }
    planets[2].add(planets[3]);
    planets[3].position.set(2, 0, 0);

    planets[4].add(planets[5]);
    planets[5].position.set(1, 0, 0);

    planets[4].add(planets[6]);
    planets[6].position.set(2, 0, 0);

    return planets;
}