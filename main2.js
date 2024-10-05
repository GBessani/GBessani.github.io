import {onDocumentMouseWheel, onDocumentMouseDown} from './js/io.js';
import {createPlanet, createAllPlanets, orbitalElements} from './js/planets.js';
import {updateOrbit} from './js/orbits.js';

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(45, (window.innerWidth/100*85) / window.innerHeight, 0.1, 3000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth/100*85, window.innerHeight);
renderer.shadowMap.enabled = false; // Habilitar sombras
document.getElementById('earth-container').appendChild(renderer.domElement);




// Carregador de texturas
const textureLoader = new THREE.TextureLoader();


// Criação do Sol com brilho emissivo
const sun = createPlanet(30, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Map_of_the_full_sun.jpg/1280px-Map_of_the_full_sun.jpg', 0xffdd00, textureLoader);
sun.castShadow = false; // O Sol não projeta sombra
scene.add(sun);

var planets = createAllPlanets(textureLoader, scene);

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

// Variáveis de controle
let isCenteredOnPlanet = false;
export let originalCameraPosition = camera.position.clone();
let isPaused = false;

// Períodos orbitais (aproximados em anos e dias da Terra)

const orbitalPeriods = {
    earth: 365,
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

window.addEventListener('mousedown', onDocumentMouseDown, false);

// Animação
function animate() {
    if (!isPaused) {
        // Movimentação orbital
        earthOrbit.angle = updateOrbit(planets[0], earthOrbit.radius, earthOrbit.speed, earthOrbit.angle, isPaused);
        moonOrbit.angle = updateOrbit(planets[1], moonOrbit.radius, moonOrbit.speed, moonOrbit.angle, isPaused);
        venusOrbit.angle = updateOrbit(planets[2], venusOrbit.radius, venusOrbit.speed, venusOrbit.angle, isPaused);
        mercuryOrbit.angle = updateOrbit(planets[3], mercuryOrbit.radius, mercuryOrbit.speed, mercuryOrbit.angle, isPaused);
        marsOrbit.angle = updateOrbit(planets[4], marsOrbit.radius, marsOrbit.speed, marsOrbit.angle, isPaused);
        saturnOrbit.angle = updateOrbit(planets[5], saturnOrbit.radius, saturnOrbit.speed, saturnOrbit.angle, isPaused);

        // Rotação dos planetas
        planets[0].rotation.y += earthRotationSpeed;
        planets[1].rotation.y += moonRotationSpeed;
        planets[2].rotation.y += venusRotationSpeed;
        planets[3].rotation.y += mercuryRotationSpeed;
        planets[4].rotation.y += marsRotationSpeed;
        planets[5].rotation.y += saturnRotationSpeed;
    }

    // Renderização
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
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

animate();

// Ajusta o renderizador quando a janela é redimensionada
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
