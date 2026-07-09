const TEMAS = [
    "REDUCCIÓN DE EXPRESIONES", "PLANTEO DE ECUACIONES", "CÁLCULO DE EDADES",
    "REGLA DE 3 COMPUESTA", "PORCENTAJES", "MEDIA ARITMÉTICA",
    "RAZONES Y PROPORCIONES", "PERMUTACIONES", "PROPORCIONALIDAD"
];

let bancoPreguntas = [];
let progresoExamen = {};
let trackingComodines = {};
let idPreguntaActiva = 1;

function generarBanco100Ejercicios() {
    for (let i = 1; i <= 100; i++) {
        let tema = TEMAS[(i - 1) % TEMAS.length];
        let preg = "", corr = "", inc = [], just = "", pist = "";

        switch (tema) {
            case "REDUCCIÓN DE EXPRESIONES":
                preg = `Simplifique al máximo la expresión algebraica para el ejercicio número ${i}: E = [(${i * 2}x² - ${i * 2}y²) / (${i * 2}x + ${i * 2}y)] - (x - 2y).`;
                corr = "y";
                inc = ["x", "2x - y", "0"];
                just = `Al factorizar la diferencia de cuadrados en el numerador se simplifica a (x - y). Al restar (x - 2y), el resultado final neto es 'y'.`;
                pist = "Use la identidad algebraico de diferencia de cuadrados en el numerador.";
                break;
            case "PLANTEO DE ECUACIONES":
                preg = `En una bodega, tres contenedores guardan sacos de grano de modo que el segundo tiene el doble del primero y el tercero posee el triple del segundo. Si el total es de ${i * 9} kg, ¿cuánto contiene el primero?`;
                corr = `${i} kg`;
                inc = [`${i * 2} kg`, `${i * 3} kg`, `${i * 4} kg`];
                just = `Ecuación: x + 2x + 6x = ${i * 9} -> 9x = ${i * 9} -> x = ${i} kg.`;
                pist = "Sume los contenedores expresados en función de x (x, 2x y 6x).";
                break;
            case "CÁLCULO DE EDADES":
                preg = `La edad de un ingeniero duplica la de su asistente. Hace exactamente ${i} años la suma de sus edades era de ${i * 4} años. ¿Cuál es la edad actual del asistente?`;
                corr = `${i * 2} años`;
                inc = [`${i} años`, `${i * 3} años`, `${i * 4} años`];
                just = `Ecuación retrospectiva: (2x - ${i}) + (x - ${i}) = ${i * 4} -> 3x = ${i * 6} -> x = ${i * 2} años.`;
                pist = "Recuerde restar los años pasados a ambos personajes por igual.";
                break;
            case "REGLA DE 3 COMPUESTA":
                preg = `Si ${i + 2} operarios confeccionan ${i * 4} prendas en 2 días, ¿cuántas prendas elaborarán ${(i + 2) * 2} operarios trabajando bajo las mismas condiciones durante 4 días?`;
                corr = `${i * 16} prendas`;
                inc = [`${i * 8} prendas`, `${i * 12} prendas`, `${i * 20} prendas`];
                just = `Duplicar operarios duplica la producción, y duplicar los días la vuelve a duplicar. Multiplicador total = 4 veces (${i * 4} * 4).`;
                pist = "Analice las relaciones directamente proporcionales paso a paso.";
                break;
            case "PORCENTAJES":
                preg = `Un lote de insumos cuyo precio base es $${i * 100} recibe un descuento del 20% y luego un recargo del 10%. ¿Cuál es el precio final neto de venta?`;
                corr = `$${(i * 100 * 0.8 * 1.1).toFixed(2)}`;
                inc = [`$${(i * 90).toFixed(2)}`, `$${(i * 100).toFixed(2)}`, `$${(i * 85.5).toFixed(2)}`];
                just = `Multiplicación secuencial encadenada: Precio original * 0.80 (descuento) * 1.10 (recargo).`;
                pist = "Aplique los porcentajes consecutivamente, no los reste de forma lineal.";
                break;
            case "MEDIA ARITMÉTICA":
                preg = `Los pesos de tres muestras consecutivas son ${i} g, ${i * 2} g y ${i * 3} g. Al incorporar una cuarta muestra, el promedio aumenta exactamente a ${i * 3} g. ¿Qué peso registró la cuarta muestra?`;
                corr = `${i * 6} g`;
                inc = [`${i * 4} g`, `${i * 5} g`, `${i * 3} g`];
                just = `Suma inicial = ${i * 6}. Suma requerida para promediar ${i * 3} con 4 muestras = ${i * 12}. Diferencia = ${i * 6} g.`;
                pist = "Multiplique el nuevo promedio por 4 para hallar la suma total necesaria.";
                break;
            case "RAZONES Y PROPORCIONES":
                preg = `La pintura blanca y azul en una mezcla está en la razón de 2 a 3. Si el volumen total final es de ${i * 5} litros, ¿cuántos litros corresponden al color mayoritario?`;
                corr = `${i * 3} L`;
                inc = [`${i * 2} L`, `${i * 5} L`, `${i * 1} L`];
                just = `Proporción: 2k + 3k = ${i * 5} -> 5k = ${i * 5} -> k = ${i}. El mayoritario es 3k = ${i * 3} L.`;
                pist = "Divida el volumen total entre la suma de las proporciones (2+3=5).";
                break;
            case "PERMUTACIONES":
                preg = `¿De cuántas maneras se pueden ocupar los cargos de Director y Subdirector en un comité integrado por ${i + 3} miembros elegibles?`;
                corr = `${(i + 3) * (i + 2)}`;
                inc = [`${i + 3}`, `${(i + 3) * 2}`, `${i * 2}`];
                just = `Variación sin repetición donde el orden de los puestos importa: V(n, 2) = n * (n - 1).`;
                pist = "El orden es relevante ya que los puestos tienen jerarquías distintas.";
                break;
            default:
                preg = `El consumo de combustible de un motor es directamente proporcional a la distancia recorrida. Si para 20 km consume ${i * 2} litros, ¿cuánto consumirá en 60 km?`;
                corr = `${i * 6} L`;
                inc = [`${i * 4} L`, `${i * 8} L`, `${i * 12} L`];
                just = `Al triplicarse la distancia (de 20 km a 60 km), el consumo de diésel se triplica de forma directa: ${i * 2} * 3.`;
                pist = "Establezca una regla de tres simple directa relacionando litros y km.";
        }
        bancoPreguntas.push({ id: i, cat: tema, preg: preg, corr: corr, inc: inc, just: just, pist: pist });
    }
}

function mezclarArreglo(arr) {
    let copia = [...arr];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

document.addEventListener("DOMContentLoaded", () => {
    generarBanco100Ejercicios();
    renderizarMatrizNavegacion();
    cargarPregunta(1);
});

function renderizarMatrizNavegacion() {
    const grid = document.getElementById("matrixGrid");
    grid.innerHTML = "";
    for (let i = 1; i <= 100; i++) {
        const item = document.createElement("div");
        item.className = "matrix-item";
        item.id = `node-${i}`;
        item.innerText = i.toString().padStart(2, '0');
        item.onclick = () => cargarPregunta(i);
        grid.appendChild(item);
    }
}

function cargarPregunta(id) {
    idPreguntaActiva = id;
    const q = bancoPreguntas.find(p => p.id === id);
    
    document.querySelectorAll(".matrix-item").forEach(n => n.classList.remove("focused-node"));
    document.getElementById(`node-${id}`).classList.add("focused-node");
    document.getElementById("wildcardOutput").classList.add("hidden");

    document.getElementById("questionIdLabel").innerText = `Reactivo #${id.toString().padStart(3, '0')}`;
    document.getElementById("questionCategory").innerText = q.cat;
    document.getElementById("questionText").innerText = q.preg;

    if (!trackingComodines[id]) trackingComodines[id] = { usado5050: false, usadoTutor: false };
    document.getElementById("btn5050").disabled = trackingComodines[id].usado5050 || progresoExamen[id];
    document.getElementById("btnTutor").disabled = trackingComodines[id].usadoTutor || progresoExamen[id];

    const container = document.getElementById("optionsContainer");
    container.innerHTML = "";

    if (!q.opcionesMuestreo) {
        let opts = [{ t: q.corr, c: true }, ...q.inc.map(txt => ({ t: txt, c: false }))];
        q.opcionesMuestreo = mezclarArreglo(opts);
    }

    q.opcionesMuestreo.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "option-node";
        btn.innerHTML = `<strong>${String.fromCharCode(65 + idx)}</strong> &nbsp;&nbsp; ${opt.t}`;
        btn.dataset.isCorrect = opt.c;
        btn.dataset.idx = idx;
        btn.onclick = () => verificarRespuesta(btn, opt.c, id);
        container.appendChild(btn);
    });

    if (progresoExamen[id]) mostrarResultadoBloqueado(id);
    else document.getElementById("feedbackPanel").classList.add("hidden");
}

function verificarRespuesta(btn, esCorrecto, id) {
    if (progresoExamen[id]) return;
    progresoExamen[id] = { idxSeleccionado: btn.dataset.idx, estado: esCorrecto ? "OK" : "ERR" };
    document.getElementById(`node-${id}`).className = esCorrecto ? "matrix-item node-correct" : "matrix-item node-incorrect";
    
    let correctas = Object.values(progresoExamen).filter(v => v.estado === "OK").length;
    let incorrectas = Object.values(progresoExamen).filter(v => v.estado === "ERR").length;
    document.getElementById("globalCorrect").innerText = correctas;
    document.getElementById("globalIncorrect").innerText = incorrectas;

    mostrarResultadoBloqueado(id);
}

function mostrarResultadoBloqueado(id) {
    const r = progresoExamen[id];
    const q = bancoPreguntas.find(p => p.id === id);
    const botones = document.querySelectorAll("#optionsContainer .option-node");

    botones.forEach(b => {
        b.disabled = true;
        if (b.dataset.isCorrect === "true") b.classList.add("state-correct");
        if (b.dataset.idx === r.idxSeleccionado && b.dataset.isCorrect === "false") b.classList.add("state-incorrect");
    });

    document.getElementById("feedbackPanel").classList.remove("hidden");
    document.getElementById("feedbackText").innerText = q.just;
    document.getElementById("btn5050").disabled = true;
    document.getElementById("btnTutor").disabled = true;
}

function ejecutarComodina5050() {
    trackingComodines[idPreguntaActiva].usado5050 = true;
    document.getElementById("btn5050").disabled = true;
    const btns = document.querySelectorAll("#optionsContainer .option-node");
    let removidos = 0;
    btns.forEach(b => {
        if (b.dataset.isCorrect === "false" && removidos < 2) {
            b.classList.add("state-hidden");
            removidos++;
        }
    });
}

function ejecutarComodinarTutor() {
    trackingComodines[idPreguntaActiva].usadoTutor = true;
    document.getElementById("btnTutor").disabled = true;
    const q = bancoPreguntas.find(p => p.id === idPreguntaActiva);
    const panel = document.getElementById("wildcardOutput");
    panel.classList.remove("hidden");
    panel.innerHTML = `💡 <strong>Pista del Tutor:</strong> ${q.pist}`;
}