function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Função para exibir informações do planeta com animação
export function showPlanetInfo(planet) {
    const infoBox = document.getElementById('info-box');
    document.getElementById('planet-name').textContent = planet.name;
    document.getElementById('planet-size').innerHTML = `<strong>Tamanho:</strong> ${planet.size} km`;
    document.getElementById('planet-distance').innerHTML = `<strong>Distância do Sol:</strong> ${planet.distance}`;

    infoBox.classList.add('active'); // Adiciona a classe active para exibir com animação
}

// Função para ocultar a caixa de informações
export function hidePlanetInfo() {
    sleep(3000)
    const infoBox = document.getElementById('info-box');
    infoBox.classList.remove('active'); // Remove a classe active para ocultar
}