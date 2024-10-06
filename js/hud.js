// Função para exibir informações do planeta com animação
export function showPlanetInfo(planet) {
    const infoBox = document.getElementById('info-box');
    document.getElementById('planet-name').textContent = planet.name;
    document.getElementById('planet-distance').innerHTML = `<strong>Distence from the sun:</strong> ${planet.distance}`;
    document.getElementById('descricao').innerHTML = `<strong>Planet description:</strong> ${planet.description}`

    infoBox.classList.add('active'); // Adiciona a classe active para exibir com animação
}

// Função para ocultar a caixa de informações
export function hidePlanetInfo() {
    const infoBox = document.getElementById('info-box');
    infoBox.classList.remove('active'); // Remove a classe active para ocultar
}