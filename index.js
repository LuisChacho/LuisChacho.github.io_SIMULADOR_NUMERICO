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

        // Variables con variaciones numéricas controladas sin duplicados estructurales
        let varA = i * 2 + 3;
        let varB = i + 4;

        switch (tema) {
            case "REDUCCIÓN DE EXPRESIONES":
                // Se calibró para el nivel exacto solicitado de leyes de exponentes con bases x, y, w
                let expX = (i % 3) + 2; 
                let expW = (i % 2) + 4;
                preg = `Simplifique la siguiente expresión aplicando las leyes de los exponentes para el reactivo nº ${i}:<br><br>$$\\frac{x^{e} y^{-1/3} w^{-3}}{x^{-${expX}} w^{-${expW}} y^{-1/2}}$$ donde el exponente entero de x arriba es $e = ${expX}$.`;
                
                // Resultado teórico simplificado para esa estructura exacta
                corr = `$x^{${expX * 2}} y^{1/6} w^{${expW - 3}}$`;
                inc = [
                    `$x^{0} y^{-5/6} w^{${expW + 3}}$`,
                    `$x^{${expX}} y^{1/2} w^{-6}$`,
                    `$x^{${expX * 2}} y^{-1/6} w^{1}$`
                ];
                just = `Para simplificar, restamos los exponentes del numerador menos el denominador: <br> Para $x$: $${expX} - (-${expX}) = ${expX * 2}$.<br> Para $y$: $-\\frac{1}{3} - (-\\frac{1}{2}) = \\frac{1}{6}$.<br> Para $w$: $-3 - (-${expW}) = ${expW - 3}$. Resultado: $x^{${expX * 2}} y^{1/6} w^{${expW - 3}}$.`;
                pist = "Recuerde aplicar la propiedad de la división de potencias de igual base: $\\frac{a^m}{a^n} = a^{m-n}$.";
                break;

            case "PLANTEO DE ECUACIONES":
                let totalSacos = varA * 7;
                preg = `En un almacén de distribución automatizado, el contenedor beta contiene el doble de sacos que el contenedor alfa, y el contenedor gamma almacena el cuádruple del contenedor beta. Si la auditoría registra un inventario neto de $${totalSacos}$ sacos entre los tres sectores, ¿cuántos sacos almacena específicamente el contenedor alfa?`;
                corr = `$${varA}$ sacos`;
                inc = [`$${varA * 2}$ sacos`, `$${varA * 4}$ sacos`, `$${Math.floor(totalSacos / 3)}$ sacos`];
                just = `Definiendo el contenedor alfa como $x$, el modelo lineal es: $x + 2x + 8x = ${totalSacos} \\Rightarrow 11x = ${totalSacos} \\Rightarrow x = ${varA}$.`;
                pist = "Plantee la ecuación sumando las proporciones relativas: $x + 2x + 8x = Total$.";
                break;

            case "CÁLCULO DE EDADES":
                let factorEdad = i + 5;
                let edadAnalista = factorEdad + 15;
                let edadDirector = edadAnalista * 2;
                let sumaComprobacion = (edadDirector - factorEdad) + (edadAnalista - factorEdad);
                preg = `La edad de un astrofísico es actualmente el doble de la de su asistente de campo. Si hace $${factorEdad}$ años la suma de sus respectivas edades era de $${sumaComprobacion}$ años, determine la edad actual del asistente.`;
                corr = `$${edadAnalista}$ años`;
                inc = [`$${edadAnalista - 5}$ años`, `$${edadAnalista + 5}$ años`, `$${factorEdad * 2}$ años`];
                just = `Estableciendo la ecuación en el pasado: $(2x - ${factorEdad}) + (x - ${factorEdad}) = ${sumaComprobacion} \\Rightarrow 3x - ${factorEdad * 2} = ${sumaComprobacion} \\Rightarrow 3x = ${sumaComprobacion + factorEdad * 2} \\Rightarrow x = ${edadAnalista}$.`;
                pist = "Reste la cantidad de años transcurridos a ambas variables individuales antes de realizar la suma.";
                break;

            case "REGLA DE 3 COMPUESTA":
                let operarios = varB;
                let horas = 6 + (i % 4);
                let eficienciaBase = 100 + (i * 5);
                preg = `Un equipo de $${operarios}$ técnicos trabajando $${horas}$ horas diarias logran calibrar un lote de servidores con un rendimiento indexado de $${eficienciaBase}$ unidades. ¿Cuántas unidades calibrarán $${operarios * 2}$ técnicos si optimizan su jornada a $${horas + 2}$ horas diarias bajo las mismas condiciones de entorno?`;
                let prodFinal = Math.floor((eficienciaBase * (operarios * 2) * (horas + 2)) / (operarios * horas));
                corr = `$${prodFinal}$ unidades`;
                inc = [`$${prodFinal - varB}$ unidades`, `$${prodFinal * 2}$ unidades`, `$${Math.floor(prodFinal / 2)}$ unidades`];
                just = `Aplicando la proporcionalidad compuesta: $\\frac{O_1 \\cdot H_1}{P_1} = \\frac{O_2 \\cdot H_2}{P_2}$. Despejando la incógnita de producción resulta en un total exacto de $${prodFinal}$ unidades.`;
                pist = "Las variables operarios y horas mantienen una relación directamente proporcional con la producción.";
                break;

            case "PORCENTAJES":
                let costoInicial = 250 + (i * 15);
                let dsc = 10 + (i % 3) * 5;
                let IVA = 12;
                let despuesDsc = costoInicial * (1 - dsc/100);
                let netoFinal = despuesDsc * (1 + IVA/100);
                preg = `El presupuesto base para el desarrollo de un componente de software especializado es de $$\\$${costoInicial}$$. Si se otorga un descuento comercial de contingencia del $${dsc}\\%$ pero posteriormente se indexa un recargo fiscal obligatorio del $${IVA}\\%$, ¿cuál es el costo neto final de la transacción?`;
                corr = `$\\$${netoFinal.toFixed(2)}$`;
                inc = [`$\\$${(costoInicial * 0.95).toFixed(2)}$`, `$\\$${costoInicial.toFixed(2)}$`, `$\\$${(costoInicial * (1 - (dsc-IVA)/100)).toFixed(2)}$`];
                just = `Cálculo geométrico encadenado: $${costoInicial} \\cdot (1 - 0.${dsc}) \\cdot (1 + 0.${IVA}) = ${netoFinal.toFixed(2)}$.`;
                pist = "Aplique los factores multiplicativos de forma sucesiva; evite sumar o restar los porcentajes directamente.";
                break;

            case "MEDIA ARITMÉTICA":
                let n1 = 10 + i;
                let n2 = 15 + i * 2;
                let n3 = 20 + i * 3;
                let promDeseado = n3 + 5;
                let sumaTres = n1 + n2 + n3;
                let n4 = (promDeseado * 4) - sumaTres;
                preg = `Los valores de conductividad registrados en tres celdas electroquímicas son $${n1}\\text{ mS}$, $${n2}\\text{ mS}$ y $${n3}\\text{ mS}$. Al añadir una cuarta celda testigo, la media aritmética global se eleva exactamente a $${promDeseado}\\text{ mS}$. Calcule la magnitud de la cuarta muestra.`;
                corr = `$${n4}\\text{ mS}$`;
                inc = [`$${n4 - 5}\\text{ mS}$`, `$${n4 + 10}\\text{ mS}$`, `$${promDeseado}\\text{ mS}$`];
                just = `La suma acumulada de los tres primeros elementos es $${sumaTres}$. Para que el promedio de 4 elementos sea $${promDeseado}$, la sumatoria total obligatoria debe ser $4 \\cdot ${promDeseado} = ${promDeseado * 4}$. Por sustracción: $${promDeseado * 4} - ${sumaTres} = ${n4}$.`;
                pist = "Multiplique la nueva media por el número total de muestras (4) para deducir la masa del dato faltante.";
                break;

            case "RAZONES Y PROPORCIONES":
                let pA = 3 + (i % 3);
                let pB = 5 + (i % 2);
                let factorVol = i + 4;
                let volTotal = (pA + pB) * factorVol;
                preg = `La relación de volumen entre el reactivo reactante ácido y el destilado base dentro de una solución química balanceada responde a la razón geométrica de $$\\frac{${pA}}{${pB}}$$ Si el volumen neto de la mezcla homogénea final en el reactor alcanza los $${volTotal}\\text{ mL}$, ¿cuántos mililitros componen la sustancia de mayor volumen?`;
                corr = `$${pB * factorVol}\\text{ mL}$`;
                inc = [`$${pA * factorVol}\\text{ mL}$`, `$${volTotal}\\text{ mL}$`, `$${factorVol}\\text{ mL}$`];
                just = `Planteamiento de la constante de proporcionalidad $k$: $${pA}k + ${pB}k = ${volTotal} \\Rightarrow ${pA + pB}k = ${volTotal} \\Rightarrow k = ${factorVol}$. El componente mayoritario es $${pB}k = ${pB} \\cdot ${factorVol} = ${pB * factorVol}$.`;
                pist = "Determine la constante $k$ dividiendo el volumen absoluto entre la suma de las partes de la razón.";
                break;

            case "PERMUTACIONES":
                let elementos = 5 + (i % 6);
                preg = `¿De cuántas formas distintas, lineales y secuenciales se pueden ordenar e instalar $${elementos}$ módulos de memoria RAM de arquitecturas de procesamiento independientes en los slots maestros correlativos de un servidor de alta gama?`;
                let factorial = 1;
                for(let f=1; f<=elementos; f++) factorial *= f;
                corr = `$${factorial}$ formas`;
                inc = [`$${elementos * 2}$ formas`, `$${factorial - 24}$ formas`, `$${elementos}$ formas`];
                just = `Dado que se deben ordenar la totalidad de los elementos en posiciones relativas diferenciadas, se aplica una permutación ordinaria: $P_{${elementos}} = ${elementos}! = ${factorial}$.`;
                pist = "Cuando intervienen todos los elementos del conjunto y el orden posicional es un factor diferenciador, aplique factoriales.";
                break;

            default: 
                let distBase = 30 + i;
                let tiempoBase = 2;
                let nuevaDist = distBase * 3;
                preg = `Un vehículo de prueba no tripulado se desplaza con velocidad constante y uniforme, cubriendo una distancia de $${distBase}\\text{ km}$ en un intervalo temporal controlado de $${tiempoBase}\\text{ horas}$. Manteniendo exactamente las mismas constantes cinemáticas, ¿en cuánto tiempo completará una trayectoria extendida de $${nuevaDist}\\text{ km}$?`;
                corr = `$6\\text{ horas}$`;
                inc = [`$4\\text{ horas}$`, `$8\\text{ horas}$`, `$5\\text{ horas}$`];
                just = `La relación espacio-tiempo a velocidad constante es lineal y directamente proporcional: $\\frac{d_1}{t_1} = \\frac{d_2}{t_2} \\Rightarrow \\frac{${distBase}}{2} = \\frac{${nuevaDist}}{t_2}$. Al triplicarse la distancia, el tiempo escalar se triplica proporcionalmente.`;
                pist = "Establezca una relación de proporcionalidad directa (una regla de tres simple lineal).";
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
    document.getElementById("questionText").innerHTML = q.preg;

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

    if (progresoExamen[id]) {
        mostrarResultadoBloqueado(id);
    } else {
        document.getElementById("feedbackPanel").classList.add("hidden");
    }

    if (window.MathJax && window.MathJax.typeset) {
        MathJax.typeset();
    }
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
    document.getElementById("feedbackText").innerHTML = q.just;
    document.getElementById("btn5050").disabled = true;
    document.getElementById("btnTutor").disabled = true;

    if (window.MathJax && window.MathJax.typeset) {
        MathJax.typeset();
    }
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
    
    if (window.MathJax && window.MathJax.typeset) {
        MathJax.typeset();
    }
}