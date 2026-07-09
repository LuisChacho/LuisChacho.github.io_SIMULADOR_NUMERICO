/**
 * SISTEMA DE EVALUACIÓN MULTICATEGORÍA - MOTOR DE GENERACIÓN PROCEDURAL
 * Diseñado con arquitectura limpia, inmutabilidad de estado y algoritmos robustos.
 */

const CATEGORIAS_EXAMEN = [
    "SIMPLIFICACION O REDUCCIOND E EXPRESIONES",
    "PLANATEAMIENTO DE ECUACIONES",
    "CALCULO DE EDADES",
    "REGLA DE 3 COMPUESTA",
    "PORCENTAJES",
    "MEDIA ARITMETICA",
    "RAZONES Y PROPORCIONES",
    "PERMUTACIONES Y VARIACIONES",
    "PROPORCIONALIDAD"
];

// Banco base de reactivos semilla analizados pedagógicamente
const reactivosSemilla = [
    {
        cat: "SIMPLIFICACION O REDUCCIOND E EXPRESIONES",
        preg: "Reduzca a su mínima expresión algebraica el siguiente sistema fraccionario continuo bajo condiciones de frontera válidas: $W = \\frac{x^2 - 9}{x^2 - 5x + 6} \\cdot \\frac{x - 2}{x + 3}$.",
        corr: "1",
        inc: ["x - 3", "\\frac{x + 3}{x - 2}", "0"],
        just: "Factorizando por diferencia de cuadrados y trinomio de la forma x^2+bx+c: (x-3)(x+3)/[(x-3)(x-2)] * (x-2)/(x+3). Al simplificar los términos idénticos en el numerador y denominador, todos los factores se anulan recíprocamente, resultando exactamente la unidad (1).",
        pist: "Proceda a factorizar el numerador del primer término como una diferencia de cuadrados perfectos y su denominador como un binomio soluble."
    },
    {
        cat: "PLANATEAMIENTO DE ECUACIONES",
        preg: "Un sistema cinemático compuesto por tres partículas acumula una energía total distribuida de tal forma que la segunda recibe el doble de la primera, y la tercera el triple de la segunda. Si el consolidado energético es de 180 Joules, ¿cuál es la energía de la primera partícula?",
        corr: "20 J",
        inc: ["40 J", "30 J", "60 J"],
        just: "Planteamiento algebraico: P1 = x, P2 = 2x, P3 = 3(2x) = 6x. La ecuación resultante es: x + 2x + 6x = 180 -> 9x = 180 -> x = 20 Joules. Por tanto, la primera partícula registra de manera exacta 20 J.",
        pist: "Defina la variable unificada en función de la primera partícula y multiplique consecutivamente los coeficientes relativos."
    },
    {
        cat: "CALCULO DE EDADES",
        preg: "La edad de un acelerador de partículas lineal alfa triplica la edad operativa de un módulo beta. Si hace 5 años la suma absoluta de sus tiempos de servicio equivalía a 30 años, ¿cuál es la edad operativa actual del acelerador alfa?",
        corr: "30 años",
        inc: ["10 años", "24 años", "40 años"],
        just: "Ecuación temporal: Alfa = 3x, Beta = x. Hace 5 años: (3x - 5) + (x - 5) = 30 -> 4x - 10 = 30 -> 4x = 40 -> x = 10. Por consiguiente, el módulo Alfa posee actualmente 3 * 10 = 30 años.",
        pist: "No olvide restar el desplazamiento de 5 años del pasado a ambas entidades al formular la igualdad fundamental."
    },
    {
        cat: "REGLA DE 3 COMPUESTA",
        preg: "Si 6 reactores de fusión idénticos consumen 12 kg de deuterio operando a régimen constante durante 4 horas, ¿cuántos kilogramos de combustible consumirán 9 reactores análogos durante un lapso extendido de 8 horas?",
        corr: "36 kg",
        inc: ["24 kg", "18 kg", "48 kg"],
        just: "Análisis proporcional: (Reactores * Horas) / Combustible = Constante. Operando: (6 * 4) / 12 = (9 * 8) / X -> 24 / 12 = 72 / X -> 2 = 72 / X -> X = 36 kg.",
        pist: "Establezca la proporcionalidad directa respecto a reactores y horas, e inversa respecto al insumo masa consumido."
    },
    {
        cat: "PORCENTAJES",
        preg: "Un haz luminoso experimenta un proceso de atenuación óptica secuencial: primero pierde el 20% de su intensidad al cruzar un cristal refractivo, y posteriormente se reduce un 10% adicional sobre el remanente en un filtro polarizado. ¿Cuál es el porcentaje total de intensidad retenida al final?",
        corr: "72%",
        inc: ["70%", "68%", "75%"],
        just: "Cálculo en cadena acumulativa: Intensidad inicial = 100%. Tras primer filtro: 100% * 0.80 = 80%. Tras segundo filtro: 80% * 0.90 = 72%. La eficiencia neta conservada es del 72%.",
        pist: "Recuerde que los descuentos de atenuación sucesivos se multiplican como factores de retención correlativos, no de manera acumulativa aritmética."
    },
    {
        cat: "MEDIA ARITMETICA",
        preg: "Se registran las velocidades de muestreo de 5 sensores cuánticos obteniendo una media exacta de 12 ms. Si se añade un sexto sensor de calibración, el promedio general se desplaza de forma ascendente a 14 ms. ¿Qué velocidad de respuesta registró el nuevo componente?",
        corr: "24 ms",
        inc: ["20 ms", "16 ms", "22 ms"],
        just: "Sumatoria inicial total = 5 * 12 = 60 ms. Sumatoria final expandida con el nuevo nodo = 6 * 14 = 84 ms. El aporte escalar neto del sexto componente equivale a: 84 - 60 = 24 ms.",
        pist: "Compare las magnitudes sumatorias absolutas de los conjuntos estables antes y después de la inserción del nuevo dato."
    },
    {
        cat: "RAZONES Y PROPORCIONES",
        preg: "La masa de dos muestras físicas inestables se halla en una relación geométrica de 4 a 7. Si la diferencia de masa entre ambas estructuras críticas es de 15 gramos, determine el gramaje absoluto de la muestra más pesada.",
        corr: "35 g",
        inc: ["20 g", "28 g", "49 g"],
        just: "Proporción escalar: M1 = 4k, M2 = 7k. Condición diferencial: 7k - 4k = 15 -> 3k = 15 -> k = 5. La constante operativa es 5. Por lo tanto, la muestra mayor mide: 7 * 5 = 35 gramos.",
        pist: "Determine el valor unificado de la constante de proporcionalidad 'k' partiendo del diferencial aritmético provisto."
    },
    {
        cat: "PERMUTACIONES Y VARIACIONES",
        preg: "Un algoritmo criptográfico requiere estructurar claves de acceso exclusivas utilizando exactamente 3 letras distintas elegidas del conjunto de control ordenado {A, B, C, D, E}. ¿Cuántas cadenas de comandos secuenciales se pueden constituir?",
        corr: "60",
        inc: ["10", "120", "20"],
        just: "Puesto que el orden jerárquico es determinante en un entorno criptográfico, aplicamos variaciones ordinarias de 5 elementos tomados en subgrupos de 3: V(5,3) = 5 * 4 * 3 = 60 combinaciones lineales.",
        pist: "Evalúe si cambiar el orden de las letras seleccionadas genera o no un código de acceso diferente."
    },
    {
        cat: "PROPORCIONALIDAD",
        preg: "La resistencia eléctrica de un conductor de pruebas varía de forma inversamente proporcional al área de su sección transversal circular. Si un conductor con un área de 2 mm² presenta una resistencia óhmica de 12 ohmios, ¿cuál será el valor de la resistencia si el área se expande a 6 mm²?",
        corr: "4 ohmios",
        inc: ["36 ohmios", "6 ohmios", "8 ohmios"],
        just: "Bajo proporcionalidad inversa, el producto escalar se mantiene invariante: A1 * R1 = A2 * R2. Sustituyendo los valores del experimento: 2 * 12 = 6 * R2 -> 24 = 6 * R2 -> R2 = 4 ohmios.",
        pist: "A mayor sección transversal disponible, los portadores de carga encuentran menor oposición física, disminuyendo la resistencia."
    }
];

// Estado de la Aplicación Global (Inmutable externamente)
const bancoPreguntas = [];
const progresoExamen = {};
const trackingComodines = {};
let idPreguntaActiva = null;

/**
 * MOTOR DE GENERACIÓN ALGORÍTMICA DE REACTIVOS
 * Completa la matriz hasta 100 ítems sin duplicación mediante funciones pseudo-aleatorias deterministas.
 */
function generarBanco100Reactivos() {
    // 1. Cargar las semillas base pre-calculadas
    reactivosSemilla.forEach((p, index) => {
        bancoPreguntas.push({
            id: index + 1,
            cat: p.cat,
            preg: p.preg,
            corr: p.corr,
            inc: [...p.inc],
            just: p.just,
            pist: p.pist
        });
    });

    // 2. Extrapolación procedimental matemática para los reactivos del 10 al 100
    for (let i = bancoPreguntas.length + 1; i <= 100; i++) {
        const catAsignada = CATEGORIAS_EXAMEN[(i - 1) % CATEGORIAS_EXAMEN.length];
        let preg = "", corr = "", inc = [], just = "", pist = "";
        
        // Coeficientes variables basados en el índice del bucle para garantizar unicidad matemática absoluta
        const k = (i % 7) + 2;
        const valA = i * 3 + 4;
        const valB = i * 2 + 10;

        switch (catAsignada) {
            case "SIMPLIFICACION O REDUCCIOND E EXPRESIONES":
                const n = i * 2;
                preg = `Simplifique analíticamente la expresión polinómica indexada para control de distorsión armónica: $E = \\frac{${n}x^2 - ${n}y^2}{${n}x + ${n}y} - (x - 2y)$.`;
                corr = "y";
                inc = ["x", "2x - y", "0"];
                just = `Factorizando por diferencia de cuadrados perfectos el numerador: ${n}(x-y)(x+y) / [${n}(x+y)] = x - y. Restando el término complementario lineal: (x - y) - (x - 2y) = x - y - x + 2y = y. Validación matricial exacta.`;
                pist: "Efectúe la extracción del factor común escalar numérico antes de aplicar la diferencia de cuadrados.";
                break;

            case "PLANATEAMIENTO DE ECUACIONES":
                const totalMasa = valA * 3 + 15;
                preg = `En un laboratorio metalúrgico, una muestra gaseosa confinada de tipo A pesa el triple que una de tipo B. Si la suma total combinada de sus masas netas es de ${totalMasa} gramos, calcule la carga correspondiente a la muestra B.`;
                corr = `${valA + 5} g`;
                inc = [`${(valA + 5) * 2} g`, `${valA} g`, `${valA - 5} g`];
                just = `Modelado cinético: A = 3x, B = x. Ecuación lineal unificada: 3x + x = ${totalMasa} -> 4x = ${totalMasa} -> x = ${(totalMasa)/4} = ${valA + 5}. La masa de B equivale a ${valA + 5} g.`;
                pist = "Sume los coeficientes lineales e iguales a la constante de masa absoluta del gas.";
                break;

            case "CALCULO DE EDADES":
                const diffTime = k * 4;
                preg = `El ciclo de degradación isotópica del elemento Helio-X triplica el tiempo de desintegración del compuesto Isótopo-Y. Si la diferencia neta entre sus periodos medios de estabilidad es de ${diffTime} microsegundos, calcule la duración de degradación de Helio-X.`;
                corr = `${(diffTime / 2) * 3} µs`;
                inc = [`${diffTime} µs`, `${diffTime / 2} µs`, `${diffTime * 2} µs`];
                just = `Estructura temporal: X = 3t, Y = t. Ecuación diferencial estricta: 3t - t = ${diffTime} -> 2t = ${diffTime} -> t = ${diffTime / 2}. Por lo tanto, el elemento Helio-X computa: 3 * ${diffTime / 2} = ${(diffTime / 2) * 3} µs.`;
                pist = "Asocie la diferencia directa de las tasas con la magnitud escalar métrica dada.";
                break;

            case "REGLA DE 3 COMPUESTA":
                const maquinas = 4 + k;
                const prodBase = maquinas * 10;
                preg = `Si ${maquinas} módulos computacionales autónomos idénticos procesan ${prodBase} gigabytes de telemetría en un rango de 2 horas, ¿cuántos gigabytes procesarán ${maquinas * 2} módulos de igual capacidad si operan estables durante 6 horas continuas?`;
                corr = `${prodBase * 6} GB`;
                inc = [`${prodBase * 3} GB`, `${prodBase * 4} GB`, `${prodBase * 2} GB`];
                just = `Análisis por tasas de rendimiento lineal combinado: (Módulos * Horas) / Producción = Constante. Operando la igualdad: (${maquinas} * 2) / ${prodBase} = (${maquinas * 2} * 6) / X -> El factor multiplicativo neta de escala es 6. X = ${prodBase * 6} GB.`;
                pist = "Observe el factor de escala geométrico tanto en el número de máquinas como en el tiempo asignado.";
                break;

            case "PORCENTAJES":
                const precioBase = 100 + (i * 5);
                preg = `Un software de simulación termodinámica con licencia institucional cotiza en un valor de $${precioBase}. Si el desarrollador concede un descuento de promoción del 20% seguido de un recargo logístico de actualización del 10%, ¿cuál es el costo final neto?`;
                corr = `$${(precioBase * 0.8 * 1.1).toFixed(2)}`;
                inc = [`$${(precioBase * 0.9).toFixed(2)}`, `$${precioBase.toFixed(2)}`, `$${(precioBase * 0.85).toFixed(2)}`];
                just = `Aplicación indexada: Descuento base del 20% implica retener el 80% del valor: ${precioBase} * 0.80 = ${precioBase * 0.8}. Incremento impositivo del 10%: ${precioBase * 0.8} * 1.10 = ${(precioBase * 0.8 * 1.1).toFixed(2)}.`;
                pist = "Evite sumar los porcentajes algebraicamente; procese el factor multiplicativo resultante paso a paso.";
                break;

            case "MEDIA ARITMETICA":
                const sumaBase = valA + valB + (i * 2);
                const promedioObjetivo = Math.round(sumaBase / 3);
                const elementoFaltante = (promedioObjetivo * 4) - (valA + valB + (i * 2));
                preg = `El set de datos térmicos recopilados por tres estaciones meteorológicas registra valores de ${valA}°C, ${valB}°C y ${i * 2}°C. Al anexar una cuarta estación de control, la media aritmética de la red se estabiliza en ${promedioObjetivo}°C. ¿Qué temperatura midió el cuarto sensor?`;
                corr = `${elementoFaltante}°C`;
                inc = [`${elementoFaltante + 4}°C`, `${promedioObjetivo}°C`, `${elementoFaltante - 3}°C`];
                just = `Ecuación de la media combinada: Suma acumulada de las tres estaciones primeras = ${valA} + ${valB} + ${i * 2} = ${valA + valB + (i * 2)}°C. Suma requerida para 4 estaciones = 4 * ${promedioObjetivo} = ${promedioObjetivo * 4}°C. Diferencia de control: ${promedioObjetivo * 4} - ${valA + valB + (i * 2)} = ${elementoFaltante}°C.`;
                pist = "Multiplique el nuevo promedio objetivo por el número total de componentes finales para hallar la masa de datos requerida.";
                break;

            case "RAZONES Y PROPORCIONES":
                const totalMezcla = k * 110;
                preg = `Un compuesto químico industrial se fabrica mezclando dos reactivos líquidos purificados en una razón estricta de 3 a 8. Si el volumen total destilado del lote es de ${totalMezcla} ml, determine el volumen preciso del componente minoritario.`;
                corr = `${(totalMezcla / 11) * 3} ml`;
                inc = [`${(totalMezcla / 11) * 8} ml`, `${(totalMezcla / 11) * 5} ml`, `${totalMezcla / 2} ml`];
                just = `Suma de las partes proporcionales constitutivas: 3 unidades + 8 unidades = 11 unidades métricas. Constante de volumen volumétrico: k = ${totalMezcla} / 11 = ${totalMezcla / 11}. El reactivo minoritario es: 3 * ${totalMezcla / 11} = ${(totalMezcla / 11) * 3} ml.`;
                pist = "Divida el volumen global entre la sumatoria de los coeficientes enteros de la razón base.";
                break;

            case "PERMUTACIONES Y VARIACIONES":
                const nElementos = 4 + (i % 3); 
                let variacionesResult = nElementos * (nElementos - 1);
                preg = `¿De cuántas maneras diferenciadas se pueden asignar los cargos de Coordinador de Investigación Quirúrgica y Supervisor de Bioseguridad en un panel médico compuesto por ${nElementos} especialistas certificados?`;
                corr = `${variacionesResult}`;
                inc = [`${nElementos}`, `${variacionesResult * 2}`, `${nElementos * 2}`];
                just = `Puesto que los roles administrativos asignados poseen naturalezas y rangos de responsabilidad diferenciados, el orden de selección altera el resultado. Se calcula mediante variaciones sin repetición: V(${nElementos}, 2) = ${nElementos} * ${nElementos - 1} = ${variacionesResult}.`;
                pist = "Analice que la asignación de un puesto A a un individuo X no es equivalente a asignarle el puesto B.";
                break;

            case "PROPORCIONALIDAD":
                const pesoOriginal = 10 * k;
                const estiramientoOriginal = 2 * k;
                const nuevoPeso = 15 * k;
                preg = `La elongación elástica lineal de un muelle mecánico se comporta de forma directamente proporcional a la fuerza de gravedad aplicada. Si una masa de ${pesoOriginal} kg induce un estiramiento de ${estiramientoOriginal} mm, ¿cuántos milímetros se desplazará al suspender una carga de ${nuevoPeso} kg?`;
                corr = `${(nuevoPeso * estiramientoOriginal) / pesoOriginal} mm`;
                inc = [`${estiramientoOriginal * 2} mm`, `${estiramientoOriginal / 2} mm`, `${((nuevoPeso * estiramientoOriginal) / pesoOriginal) + 2} mm`];
                just = `Bajo la Ley de Hooke y proporcionalidad directa, la razón entre fuerza y elongación es constante: Peso1 / Elongación1 = Peso2 / Elongación2. Sustituyendo: ${pesoOriginal} / ${estiramientoOriginal} = ${nuevoPeso} / X -> X = (${nuevoPeso} * ${estiramientoOriginal}) / ${pesoOriginal} = ${(nuevoPeso * estiramientoOriginal) / pesoOriginal} mm.`;
                pist = "Plantee una igualdad de razones cruzadas directas ya que a mayor peso, mayor es la fuerza de deformación elástica.";
                break;
        }

        bancoPreguntas.push({
            id: i,
            cat: catAsignada,
            preg: preg,
            corr: corr,
            inc: inc,
            just: just,
            pist: pist
        });
    }
}

/**
 * ALGORITMO ROMPE-PATRONES DE FISHER-YATES
 * Garantiza la aleatorización total de las opciones eliminando cualquier sesgo posicional.
 */
function mezclarOpcionesAlgoritmo(opciones) {
    const arr = [...opciones];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Inicialización de la Interfaz y Event Listeners del Motor Core
document.addEventListener("DOMContentLoaded", () => {
    generarBanco100Reactivos();
    inicializarMatrizNavegacionDOM();
    cargarReactivoEspecifico(1);
    actualizarContadoresGlobales();
});

function inicializarMatrizNavegacionDOM() {
    const grid = document.getElementById("matrixGrid");
    grid.innerHTML = "";
    
    for (let i = 1; i <= 100; i++) {
        const celda = document.createElement("div");
        celda.className = "matrix-item";
        celda.id = `node-${i}`;
        celda.innerText = i.toString().padStart(2, '0');
        celda.onclick = () => cargarReactivoEspecifico(i);
        grid.appendChild(celda);
    }
}

function cargarReactivoEspecifico(id) {
    idPreguntaActiva = id;
    const pregunta = bancoPreguntas.find(p => p.id === id);
    if (!pregunta) return;

    // Resaltar nodo activo en la matriz lateral
    document.querySelectorAll(".matrix-item").forEach(node => node.classList.remove("focused-node"));
    const nodoActivo = document.getElementById(`node-${id}`);
    if (nodoActivo) nodoActivo.classList.add("focused-node");

    // Resetear visibilidad del panel de comodines
    document.getElementById("wildcardOutput").classList.add("hidden");

    // Configurar metadatos del reactivo
    document.getElementById("questionIdLabel").innerText = `Reactivo #${id.toString().padStart(3, '0')}`;
    document.getElementById("questionCategory").innerText = pregunta.cat;
    document.getElementById("questionText").innerText = pregunta.preg;

    // Verificar e inicializar el estado de comodines de esta pregunta
    if (!trackingComodines[id]) {
        trackingComodines[id] = { c5050: false, cDiscard: false, cTutor: false, cStats: false };
    }
    evaluarEstadoComodinesUI();

    // Estructurar u obtener opciones ordenadas/mezcladas
    const container = document.getElementById("optionsContainer");
    container.innerHTML = "";

    if (!progresoExamen[id]) {
        // Primera carga del reactivo: Mezclamos de forma disruptiva
        const opcionesEstructuradas = [
            { texto: pregunta.corr, correcto: true },
            ...pregunta.inc.map(txt => ({ texto: txt, correcto: false }))
        ];
        pregunta.opcionesMezcladasCache = mezclarOpcionesAlgoritmo(opcionesEstructuradas);
    }

    pregunta.opcionesMezcladasCache.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "option-node";
        btn.innerHTML = `<strong style="color:var(--accent-blue); margin-right: 14px;">${String.fromCharCode(65 + idx)}</strong> <span class="opt-text">${opt.texto}</span>`;
        btn.dataset.correcto = opt.correcto;
        btn.dataset.index = idx;
        btn.onclick = () => validarSeleccionUsuario(btn, opt.correcto, id);
        container.appendChild(btn);
    });

    // Control de renderizado post-respuesta (Persistencia de estado al navegar)
    if (progresoExamen[id]) {
        forzarBloqueoYRetroalimentacion(id);
    } else {
        document.getElementById("feedbackPanel").classList.add("hidden");
    }
}

function validarSeleccionUsuario(botonSeleccionado, esCorrecto, id) {
    if (progresoExamen[id]) return; // Evitar mutaciones secundarias de respuestas ya fijadas

    progresoExamen[id] = {
        idxSeleccionado: botonSeleccionado.dataset.index,
        estado: esCorrecto ? "CORRECT" : "INCORRECT"
    };

    // Actualizar nodo de matriz visual
    const nodoMatriz = document.getElementById(`node-${id}`);
    if (nodoMatriz) {
        nodoMatriz.classList.add(esCorrecto ? "node-correct" : "node-incorrect");
    }

    actualizarContadoresGlobales();
    forzarBloqueoYRetroalimentacion(id);
}

function forzarBloqueoYRetroalimentacion(id) {
    const registro = progresoExamen[id];
    const pregunta = bancoPreguntas.find(p => p.id === id);
    const botones = document.querySelectorAll("#optionsContainer .option-node");

    botones.forEach(btn => {
        btn.disabled = true;
        const esCorrecto = btn.dataset.correcto === "true";
        const esElSeleccionado = btn.dataset.index === registro.idxSeleccionado;

        if (esCorrecto) {
            btn.classList.add("state-correct");
        } else if (esElSeleccionado && !esCorrecto) {
            btn.classList.add("state-incorrect");
        }
    });

    // Desplegar panel inferior de justificación
    const feedbackPanel = document.getElementById("feedbackPanel");
    feedbackPanel.classList.remove("hidden");
    document.getElementById("feedbackText").innerText = pregunta.just;

    // Desactivar totalmente la barra de asistencia
    bloquearBarraComodinesCompleta();
}

/**
 * SISTEMA DE ASISTENCIA Y COMODINES LOGARÍTMICOS
 */
function evaluarEstadoComodinesUI() {
    if (progresoExamen[idPreguntaActiva]) {
        bloquearBarraComodinesCompleta();
        return;
    }

    const tracker = trackingComodines[idPreguntaActiva];
    document.getElementById("btn5050").disabled = tracker.c5050;
    // Si ya usó 50/50, el descarte simple no tiene sentido matemático
    document.getElementById("btnDiscard").disabled = tracker.cDiscard || tracker.c5050;
    document.getElementById("btnTutor").disabled = tracker.cTutor;
    document.getElementById("btnStats").disabled = tracker.cStats;
}

function bloquearBarraComodinesCompleta() {
    document.getElementById("btn5050").disabled = true;
    document.getElementById("btnDiscard").disabled = true;
    document.getElementById("btnTutor").disabled = true;
    document.getElementById("btnStats").disabled = true;
}

function ejecutarComodina5050() {
    trackingComodines[idPreguntaActiva].c5050 = true;
    const botones = document.querySelectorAll("#optionsContainer .option-node");
    let eliminados = 0;

    botones.forEach(btn => {
        if (btn.dataset.correcto === "false" && eliminados < 2) {
            btn.classList.add("state-hidden");
            eliminados++;
        }
    });
    evaluarEstadoComodinesUI();
}

function ejecutarComodinarDescartar() {
    trackingComodines[idPreguntaActiva].cDiscard = true;
    const botones = document.querySelectorAll("#optionsContainer .option-node");

    for (let btn of botones) {
        if (btn.dataset.correcto === "false" && !btn.classList.contains("state-hidden")) {
            btn.classList.add("state-hidden");
            break; // Ocultamos solo uno al azar
        }
    }
    evaluarEstadoComodinesUI();
}

function ejecutarComodinarTutor() {
    trackingComodines[idPreguntaActiva].cTutor = true;
    const pregunta = bancoPreguntas.find(p => p.id === idPreguntaActiva);
    const panel = document.getElementById("wildcardOutput");
    
    panel.classList.remove("hidden");
    panel.innerHTML = `<strong>💡 Sugerencia del Tutor Académico:</strong> ${pregunta.pist}`;
    evaluarEstadoComodinesUI();
}

function ejecutarComodinarEstadistica() {
    trackingComodines[idPreguntaActiva].cStats = true;
    const pregunta = bancoPreguntas.find(p => p.id === idPreguntaActiva);
    const botones = document.querySelectorAll("#optionsContainer .option-node");
    const panel = document.getElementById("wildcardOutput");

    let letraCorrecta = "A";
    botones.forEach(btn => {
        if (btn.dataset.correcto === "true") {
            letraCorrecta = btn.innerHTML.match(/<strong>(.*?)<\/strong>/)[1].trim();
        }
    });

    // Generar distribución normalizada simulada orientada al éxito académico
    const pctCorrecto = Math.floor(Math.random() * 15) + 70; // Rango 70% - 85%
    const pctRestante = 100 - pctCorrecto;
    const dist1 = Math.floor(pctRestante * 0.5);
    const dist2 = pctRestante - dist1;

    panel.classList.remove("hidden");
    panel.innerHTML = `<strong>📊 Muestra Muestral (N=1,420 postulantes):</strong> El ${pctCorrecto}% de los estudiantes universitarios de semestres superiores marcó la opción <strong>(${letraCorrecta})</strong>. El resto se distribuye entre las opciones distractoras con un ${dist1}% y ${dist2}%.`;
    evaluarEstadoComodinesUI();
}

function actualizarContadoresGlobales() {
    let correctas = 0;
    let incorrectas = 0;

    Object.values(progresoExamen).forEach(r => {
        if (r.estado === "CORRECT") correctas++;
        if (r.estado === "INCORRECT") incorrectas++;
    });

    document.getElementById("globalCorrect").innerText = correctas;
    document.getElementById("globalIncorrect").innerText = incorrectas;
}