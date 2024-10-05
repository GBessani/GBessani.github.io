import {camera, scene} from '../main2.js'
import {centerOnPlanet} from './camera.js'

// Detectar cliques
export function onDocumentMouseDown(event) {
    event.preventDefault();


    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const clickedPlanet = intersects[0].object;
        console.log(clickedPlanet);      
        
        centerOnPlanet(clickedPlanet);
    }
}

// Adiciona a opção de zoom in/out com a roda do mouse
export function onDocumentMouseWheel(event) {
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

let isMouseDown = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

// Sensibilidade da rotação
const rotationSpeed = 0.005;

// Função para detectar quando o mouse é pressionado
export function onMouseDown(event) {
    isMouseDown = true;
    previousMousePosition.x = event.clientX;
    previousMousePosition.y = event.clientY;
}

// Função para detectar quando o mouse é solto
export function onMouseUp(event) {
    isMouseDown = false;
}

// Função para detectar o movimento do mouse e rotacionar a câmera
export function onMouseMove(event) {
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