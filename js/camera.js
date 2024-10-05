import {showPlanetInfo, hidePlanetInfo} from './hud.js';
import {camera, originalCameraPosition} from '../main2.js'

var stopCamera = false;

// Função para centralizar a câmera no planeta clicado
export function centerOnPlanet(planet) {

    stopCamera = false;

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
            if (!stopCamera){
            showPlanetInfo(planet);
                centerOnPlanet(planet)
            }
            return true;
        }
    }

    requestAnimationFrame(animate);
}

// Função para restaurar a posição original da câmera
export function resetCameraPosition() {
    const duration = 1;
    const startPosition = camera.position.clone();
    const startTime = performance.now();
    hidePlanetInfo();

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

// Função para resetar a posição da câmera
function resetCameraToOriginalPosition() {
    stopCamera = true;
    const duration = 1;  // duração da animação
    const startPosition = camera.position.clone();
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
    hidePlanetInfo();
}

// Adiciona o evento de clique ao botão de reset
document.getElementById('reset-camera-btn').addEventListener('click', resetCameraToOriginalPosition);
