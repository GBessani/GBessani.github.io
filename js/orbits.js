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

export function updateOrbit(object, radius, speed, angle, isPaused) {
    if (isPaused) return angle; // Congela a órbita se estiver pausado
    angle += speed;
    object.position.x = Math.cos(angle) * radius;
    object.position.z = Math.sin(angle) * radius;
    return angle;
}