// Setup básico da cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Habilitar sombras
document.getElementById('earth-container').appendChild(renderer.domElement);

// Carregador de texturas
const textureLoader = new THREE.TextureLoader();

// Adicionando um fundo mais realista
const skyTexture = textureLoader.load('https://images.unsplash.com/photo-1504333638930-c8787321eee0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D');
const skyMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide });
const skyGeometry = new THREE.SphereGeometry(1500, 32, 32); // A esfera é grande o suficiente para englobar toda a cena
const skySphere = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(skySphere);

// Função genérica para criar planetas com sombras
function createPlanet(size, textureUrl, emissive = 0x000000) {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const texture = textureLoader.load(textureUrl);
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

// Criação do Sol com brilho emissivo
const sun = createPlanet(30, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Map_of_the_full_sun.jpg/1280px-Map_of_the_full_sun.jpg', 0xffdd00);
sun.castShadow = false; // O Sol não projeta sombra
scene.add(sun);

// Função para calcular a posição orbital precisa com base nos elementos orbitais
function calculateOrbitalPosition(orbitalElements, time) {
    const { semiMajorAxis, eccentricity, inclination, longitudeOfAscendingNode, argumentOfPeriapsis, meanAnomalyAtEpoch, epoch } = orbitalElements;

    const meanMotion = Math.sqrt(1.0 / Math.pow(semiMajorAxis, 3)); // Aproximação simplificada para órbita kepleriana

    const timeSinceEpoch = time - epoch;
    let meanAnomaly = meanAnomalyAtEpoch + meanMotion * timeSinceEpoch;

    // Normalizando o ângulo
    meanAnomaly = meanAnomaly % 360; // Mantendo entre 0 e 360 graus
    meanAnomaly = THREE.MathUtils.degToRad(meanAnomaly); // Convertendo para radianos

    // Aproximação simples da Equação de Kepler
    const eccentricAnomaly = meanAnomaly + eccentricity * Math.sin(meanAnomaly);  

    // Distância do centro do objeto central
    const distance = semiMajorAxis * (1 - eccentricity * Math.cos(eccentricAnomaly));

    // Convertendo para coordenadas espaciais (simplificado)
    const trueAnomaly = 2 * Math.atan2(Math.sqrt(1 + eccentricity) * Math.sin(eccentricAnomaly / 2), Math.sqrt(1 - eccentricity) * Math.cos(eccentricAnomaly / 2));

    const x = distance * (Math.cos(longitudeOfAscendingNode) * Math.cos(trueAnomaly + argumentOfPeriapsis) - Math.sin(longitudeOfAscendingNode) * Math.sin(trueAnomaly + argumentOfPeriapsis) * Math.cos(inclination));
    const z = distance * (Math.sin(longitudeOfAscendingNode) * Math.cos(trueAnomaly + argumentOfPeriapsis) + Math.cos(longitudeOfAscendingNode) * Math.sin(trueAnomaly + argumentOfPeriapsis) * Math.cos(inclination));
    const y = distance * Math.sin(trueAnomaly + argumentOfPeriapsis) * Math.sin(inclination);

    return new THREE.Vector3(x, y, z);
}

// Função para movimentar os planetas com órbita ajustada por HPOP
function updateOrbitWithHPOP(planet, orbitalElements, time) {
    const position = calculateOrbitalPosition(orbitalElements, time);
    planet.position.copy(position);
}

// Exemplos de elementos orbitais para diferentes planetas (valores aproximados)
const orbitalElements = {
    earth: {
        semiMajorAxis: 149.6,  // Unidade: milhões de km
        eccentricity: 0.0167,
        inclination: THREE.MathUtils.degToRad(0.00005),  // Aproximado, em radianos
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(-11.26064),  // Graus convertidos em radianos
        argumentOfPeriapsis: THREE.MathUtils.degToRad(114.20783),  // Graus convertidos em radianos
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(358.617),  // Graus convertidos em radianos
        epoch: 2451545.0 // Tempo juliano
    },
    moon: {
        semiMajorAxis: 0.384,  // Unidade: milhões de km
        eccentricity: 0.0549,
        inclination: THREE.MathUtils.degToRad(5.145),  // Aproximado, em radianos
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(125.08),  // Graus convertidos em radianos
        argumentOfPeriapsis: THREE.MathUtils.degToRad(318.15),  // Graus convertidos em radianos
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(115.365),  // Graus convertidos em radianos
        epoch: 2451545.0 // Tempo juliano
    },
    venus: {
        semiMajorAxis: 108.2,
        eccentricity: 0.0067,
        inclination: THREE.MathUtils.degToRad(3.39),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(76.680),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(131.532),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(50.115),
        epoch: 2451545.0
    },
    mercury: {
        semiMajorAxis: 57.91,
        eccentricity: 0.2056,
        inclination: THREE.MathUtils.degToRad(7.005),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(48.331),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(29.124),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(174.796),
        epoch: 2451545.0
    },
    mars: {
        semiMajorAxis: 227.9,
        eccentricity: 0.0934,
        inclination: THREE.MathUtils.degToRad(1.85),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(49.558),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(286.537),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(19.412),
        epoch: 2451545.0
    },
    phobos: {
        semiMajorAxis: 0.0069,  // Unidade: milhões de km (aproximadamente 6,9 km)
        eccentricity: 0.0151,
        inclination: THREE.MathUtils.degToRad(1.08),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(113.68),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(212.42),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(236.0),
        epoch: 2451545.0
    },
    deimos: {
        semiMajorAxis: 0.0235,  // Unidade: milhões de km (aproximadamente 23,5 km)
        eccentricity: 0.0007,
        inclination: THREE.MathUtils.degToRad(0.93),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(174.91),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(122.38),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(229.76),
        epoch: 2451545.0
    },
    saturn: {
        semiMajorAxis: 1430,
        eccentricity: 0.0565,
        inclination: THREE.MathUtils.degToRad(2.485),
        longitudeOfAscendingNode: THREE.MathUtils.degToRad(113.665),
        argumentOfPeriapsis: THREE.MathUtils.degToRad(336.313),
        meanAnomalyAtEpoch: THREE.MathUtils.degToRad(217.613),
        epoch: 2451545.0
    }

};

// Criação dos planetas
const earth = createPlanet(3.9, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
earth.name = 'Terra';
earth.size = '3.9';
earth.distance = '150 milhões de km';
scene.add(earth);

const moon = createPlanet(1, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg');
moon.name = 'Lua';
moon.size = '1';
moon.distance = '384 mil km';
scene.add(moon);

const venus = createPlanet(3.7, 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Solarsystemscope_texture_8k_venus_surface.jpg');
venus.name = 'Vênus';
venus.size = '3.7';
venus.distance = '108 milhões de km';
scene.add(venus);

const mercury = createPlanet(1.5, 'https://cdn.pixabay.com/photo/2022/06/30/02/16/mercury-7292788_1280.jpg');
mercury.name = 'Mercúrio';
mercury.size = '1.5';
mercury.distance = '58 milhões de km';
scene.add(mercury);

const mars = createPlanet(2.1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlLRqRQsmshDjJFCuK7bFjrjUP75ZRBn3AuA&s');
mars.name = 'Marte';
mars.size = '2.1';
mars.distance = '228 milhões de km';
scene.add(mars);
// Criando as luas de Marte
const phobos = createPlanet(0.005, 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7f47a18-e716-4180-886b-cf5ac6ce29f6/dfencr5-a5ea730a-3c61-4cd1-9efe-cf9dfe70f6da.jpg/v1/fill/w_700,h_350,q_75,strp/phobos_map_by_mapperpro_dfencr5-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzUwIiwicGF0aCI6IlwvZlwvZjdmNDdhMTgtZTcxNi00MTgwLTg4NmItY2Y1YWM2Y2UyOWY2XC9kZmVuY3I1LWE1ZWE3MzBhLTNjNjEtNGNkMS05ZWZlLWNmOWRmZTcwZjZkYS5qcGciLCJ3aWR0aCI6Ijw9NzAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.x4cSoAk9-WTEE42-zcaOuEGMIbh7i5QOqpi6Ld5JrbA');
phobos.name = 'Fobos';
phobos.size = '0.005';
phobos.distance = '9,4 mil km';
scene.add(phobos);

const deimos = createPlanet(0.004, 'https://lh4.googleusercontent.com/proxy/_J0h01q8yY5_bB1jm52HTUYUgqKvM-O0XT86aVczsQLGApv0_pzwy_Y7R-SMro96-2CXcZuC0XjGtcJbX7E1EGcKqW0p4C86jwaFCaMRUPSObfljziHw');
deimos.name = 'Deimos';
deimos.size = '0.004';
deimos.distance = '23,5 mil km';
scene.add(deimos);



const saturn = createPlanet(4.5, 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b7fe5389-9714-4f1b-9101-ac2a97133816/dg6xrra-c9db709b-a79d-4007-b5b0-c4cc419a906c.jpg/v1/fill/w_1264,h_632,q_70,strp/saturn_cassini_2011_texture_map_by_askanery_dg6xrra-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjQwIiwicGF0aCI6IlwvZlwvYjdmZTUzODktOTcxNC00ZjFiLTkxMDEtYWMyYTk3MTMzODE2XC9kZzZ4cnJhLWM5ZGI3MDliLWE3OWQtNDAwNy1iNWIwLWM0Y2M0MTlhOTA2Yy5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Ojnga-2WcGE3sf8Ek0iS07CDrgKljQcubEtuEn4tw98');
saturn.name = 'Saturno';
saturn.size = '4.5';
saturn.distance = '1.2 bilhões de km';
scene.add(saturn);

// Luz ambiente suave para iluminar ligeiramente todos os objetos
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Aumentar a intensidade
scene.add(ambientLight);

// Luz do Sol (PointLight) para simular a iluminação (agora branca)
const sunLight = new THREE.PointLight(0xffffff, 4.0, 1500);  // Intensidade e alcance ajustados
sunLight.position.set(0, 0, 0);  // No centro da cena, onde está o Sol
sunLight.castShadow = true;  // Habilitar sombras
sunLight.shadow.mapSize.width = 2048;  // Alta resolução de sombras
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 1500;
scene.add(sunLight);

// Ajuste da posição inicial da câmera
camera.position.set(0, 200, 500); // Afastando a câmera para que o sistema solar caiba
camera.lookAt(0, 0, 0);

  // Tempo fictício
  let time = 0;
function animate() {
    if (!isPaused) {
        // Atualiza órbita com alta precisão para cada planeta
        updateOrbitWithHPOP(earth, orbitalElements.earth, time);
        updateOrbitWithHPOP(moon, orbitalElements.moon, time);
        updateOrbitWithHPOP(venus, orbitalElements.venus, time);
        updateOrbitWithHPOP(mercury, orbitalElements.mercury, time);
        updateOrbitWithHPOP(mars, orbitalElements.mars, time);
        updateOrbitWithHPOP(saturn, orbitalElements.saturn, time);
        updateOrbitWithHPOP(phobos, orbitalElements.phobos, time); // Atualiza Fobos
        updateOrbitWithHPOP(deimos, orbitalElements.deimos, time); // Atualiza Deimos

        // Rotação dos planetas (mesmo comportamento)
        earth.rotation.y += earthRotationSpeed;
        moon.rotation.y += moonRotationSpeed;
        venus.rotation.y += venusRotationSpeed;
        mercury.rotation.y += mercuryRotationSpeed;
        mars.rotation.y += marsRotationSpeed;
        saturn.rotation.y += saturnRotationSpeed;
        phobos.rotation.y += phobosRotationSpeed; // Rotação de Fobos
        deimos.rotation.y += deimosRotationSpeed; // Rotação de Deimos
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    time += 0.1;  // Incrementa o tempo para simular a passagem
}

// Variáveis de controle
let isCenteredOnPlanet = false;
let originalCameraPosition = camera.position.clone();
let isPaused = false;

// Função para movimentar os planetas em órbita
function updateOrbit(object, radius, speed, angle) {
    if (isPaused) return angle; // Congela a órbita se estiver pausado
    angle += speed;
    object.position.x = Math.cos(angle) * radius;
    object.position.z = Math.sin(angle) * radius;
    return angle;
}

// Períodos orbitais (aproximados em anos e dias da Terra)
const daysInYear = 365;
const orbitalPeriods = {
    earth: daysInYear,
    moon: 27.3,
    venus: 225,
    mercury: 88,
    mars: 687,
    saturn: 10759 // Saturno: 29.5 anos terrestres
};

// Conversão dos períodos orbitais em velocidades de translação
const orbitalSpeeds = {
    earth: 1 / orbitalPeriods.earth,
    moon: 1 / orbitalPeriods.moon,
    venus: 1 / orbitalPeriods.venus,
    mercury: 1 / orbitalPeriods.mercury,
    mars: 1 / orbitalPeriods.mars,
    saturn: 1 / orbitalPeriods.saturn
};

// Variáveis de órbita e ângulos para os planetas
let earthOrbit = { radius: 150, speed: orbitalSpeeds.earth, angle: 0 };
let moonOrbit = { radius: 10, speed: orbitalSpeeds.moon, angle: 0 };
let venusOrbit = { radius: 108, speed: orbitalSpeeds.venus, angle: 0 };
let mercuryOrbit = { radius: 58, speed: orbitalSpeeds.mercury, angle: 0 };
let marsOrbit = { radius: 228, speed: orbitalSpeeds.mars, angle: 0 };
let saturnOrbit = { radius: 450, speed: orbitalSpeeds.saturn, angle: 0 };

// Velocidades de rotação mais realistas (em radianos por quadro)
const earthRotationSpeed = 0.01;
const moonRotationSpeed = 0.001;
const venusRotationSpeed = 0.0004;
const mercuryRotationSpeed = 0.0002;
const marsRotationSpeed = 0.008;
const saturnRotationSpeed = 0.005;

// Função para centralizar a câmera no planeta clicado
function centerOnPlanet(planet) {
    if (isCenteredOnPlanet) return;

    const targetPosition = new THREE.Vector3(planet.position.x, planet.position.y, planet.position.z);
    const offset = 10 * planet.geometry.parameters.radius; // Adiciona um offset baseado no tamanho do planeta
    const duration = 1;
    const startPosition = camera.position.clone();
    const startTime = performance.now();

    function animate() {
        const elapsed = (performance.now() - startTime) / 1000;
        const t = Math.min(elapsed / duration, 1);
        const targetWithOffset = targetPosition.clone().add(new THREE.Vector3(0, 0, offset));
        camera.position.lerpVectors(startPosition, targetWithOffset, t);
        camera.lookAt(planet.position);

        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            showPlanetInfo(planet);
            isCenteredOnPlanet = true;
            isPaused = true; // Pausa a animação
        }
    }

    requestAnimationFrame(animate);
}

// Função para restaurar a posição original da câmera
function resetCameraPosition() {
    const duration = 1;
    const startPosition = camera.position.clone();
    const startTime = performance.now();

    function animate() {
        const elapsed = (performance.now() - startTime) / 1000;
        const t = Math.min(elapsed / duration, 1);
        camera.position.lerpVectors(startPosition, originalCameraPosition, t);
        camera.lookAt(0, 0, 0);

        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            isCenteredOnPlanet = false;
            isPaused = false; // Retoma a animação
            hidePlanetInfo();
        }
    }

    requestAnimationFrame(animate);
}

// Função para exibir informações do planeta com animação
function showPlanetInfo(planet) {
    const infoBox = document.getElementById('info-box');
    document.getElementById('planet-name').textContent = planet.name;
    document.getElementById('planet-size').innerHTML = `<strong>Tamanho:</strong> ${planet.size} km`;
    document.getElementById('planet-distance').innerHTML = `<strong>Distância do Sol:</strong> ${planet.distance}`;

    infoBox.classList.add('active'); // Adiciona a classe active para exibir com animação
}

// Função para ocultar a caixa de informações
function hidePlanetInfo() {
    const infoBox = document.getElementById('info-box');
    infoBox.classList.remove('active'); // Remove a classe active para ocultar
}

// Detectar cliques
function onDocumentMouseDown(event) {
    event.preventDefault();

    // Se a câmera já estiver centralizada, qualquer clique vai restaurar a posição original
    if (isCenteredOnPlanet) {
        resetCameraPosition();
        return;
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const clickedPlanet = intersects[0].object;
         // Ignorar clique na esfera do céu
         if (clickedPlanet === skySphere) {
            return; // Não faz nada se a esfera do céu foi clicada
        }
        
        
        centerOnPlanet(clickedPlanet);
    }
}

window.addEventListener('mousedown', onDocumentMouseDown, false);

// Animação
function animate() {
    if (!isPaused) {
        // Movimentação orbital
        earthOrbit.angle = updateOrbit(earth, earthOrbit.radius, earthOrbit.speed, earthOrbit.angle);
        moonOrbit.angle = updateOrbit(moon, moonOrbit.radius, moonOrbit.speed, moonOrbit.angle);
        venusOrbit.angle = updateOrbit(venus, venusOrbit.radius, venusOrbit.speed, venusOrbit.angle);
        mercuryOrbit.angle = updateOrbit(mercury, mercuryOrbit.radius, mercuryOrbit.speed, mercuryOrbit.angle);
        marsOrbit.angle = updateOrbit(mars, marsOrbit.radius, marsOrbit.speed, marsOrbit.angle);
        saturnOrbit.angle = updateOrbit(saturn, saturnOrbit.radius, saturnOrbit.speed, saturnOrbit.angle);

        // Rotação dos planetas
        earth.rotation.y += earthRotationSpeed;
        moon.rotation.y += moonRotationSpeed;
        venus.rotation.y += venusRotationSpeed;
        mercury.rotation.y += mercuryRotationSpeed;
        mars.rotation.y += marsRotationSpeed;
        saturn.rotation.y += saturnRotationSpeed;
    }

    // Renderização
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
// Adiciona a opção de zoom in/out com a roda do mouse
function onDocumentMouseWheel(event) {
    event.preventDefault();

    // Define o valor de zoom. Pode ajustar a intensidade do zoom alterando esse valor
    const zoomIntensity = 50;

    // Ajusta a posição da câmera com base no evento de rolagem
    if (event.deltaY > 0) {
        // Zoom out (afasta a câmera)
        camera.position.z += zoomIntensity;
    } else {
        // Zoom in (aproxima a câmera)
        camera.position.z -= zoomIntensity;
    }

    // Limita o zoom para evitar que a câmera entre em objetos ou se afaste demais
    if (camera.position.z < 100) {
        camera.position.z = 100;  // Limite de aproximação
    }
    if (camera.position.z > 1500) {
        camera.position.z = 1500; // Limite de afastamento
    }

    camera.updateProjectionMatrix();
}

// Adiciona o evento de rolagem do mouse para controlar o zoom
window.addEventListener('wheel', onDocumentMouseWheel, false);

// Variáveis para controle do movimento da câmera com o mouse
let isMouseDown = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

// Sensibilidade da rotação
const rotationSpeed = 0.005;

// Função para detectar quando o mouse é pressionado
function onMouseDown(event) {
    isMouseDown = true;
    previousMousePosition.x = event.clientX;
    previousMousePosition.y = event.clientY;
}

// Função para detectar quando o mouse é solto
function onMouseUp(event) {
    isMouseDown = false;
}

// Função para detectar o movimento do mouse e rotacionar a câmera
function onMouseMove(event) {
    if (!isMouseDown) return;

    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    // Rotaciona a câmera em torno do eixo Y (esquerda/direita)
    camera.rotation.y -= deltaX * rotationSpeed;

    // Rotaciona a câmera em torno do eixo X (cima/baixo), mas com limite para evitar que a câmera vire completamente
    camera.rotation.x -= deltaY * rotationSpeed;
    camera.rotation.x = Math.max(Math.PI / -2, Math.min(Math.PI / 2, camera.rotation.x)); // Limita a rotação no eixo X

    previousMousePosition.x = event.clientX;
    previousMousePosition.y = event.clientY;

    camera.updateProjectionMatrix();
}

// Adiciona os eventos do mouse
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mouseup', onMouseUp, false);
window.addEventListener('mousemove', onMouseMove, false);

// Posição original da câmera (se já não tiver sido definido)
let originalCameraPosition2 = new THREE.Vector3(0, 200, 500);

// Função para resetar a posição da câmera
function resetCameraToOriginalPosition() {
    const duration = 1;  // duração da animação
    const startPosition = camera.position.clone();
    const startRotation = camera.rotation.clone();
    const startTime = performance.now();

    function animate() {
        const elapsed = (performance.now() - startTime) / 1000;
        const t = Math.min(elapsed / duration, 1);
        
        // Interpolação da posição da câmera
        camera.position.lerpVectors(startPosition, originalCameraPosition, t);
        
        // Interpolação da rotação da câmera
        camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, 0, t);
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, 0, t);
        camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, 0, t);

        camera.updateProjectionMatrix();

        if (t < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

// Adiciona o evento de clique ao botão de reset
document.getElementById('reset-camera-btn').addEventListener('click', resetCameraToOriginalPosition);


animate();

// Ajusta o renderizador quando a janela é redimensionada
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
