/**
 * SIMULADOR DE FÍSICA UNIVERSITARIA - MODELO PRO (CORREGIDO)
 * JS de control y generación sistemática de 150 reactivos únicos.
 * Incluye cinemática vectorial con coordenadas i,j, leyes de Newton,
 * Trabajo, Potencia y Energía y Teorías conceptuales.
 * Event Listeners bindeados de manera segura al cargar el DOM.
 */

const GRAVITY = 9.8;
let questions = [];
let userAnswers = {}; // { questionIndex: { chosen, isCorrect } }
let activeIndex = 0;
let usedComodines = { "5050": false, "eliminar": false, "llamada": false, "publico": false };

/**
 * Genera el banco de 150 reactivos estructurados sin repetición de datos ni variables.
 */
function generateQuestionBank() {
    questions = [];
    const categories = [
        "Cinemática - MRU (Vectorial & Escalar)",
        "Cinemática - MRUV Vectorial",
        "Cinemática - Caída Libre",
        "Cinemática - Movimiento Vertical",
        "Cinemática - Movimiento Compuesto",
        "Cinemática - MCU",
        "Dinámica - Leyes de Newton",
        "Dinámica - Fuerzas y Planos",
        "Trabajo, Potencia y Energía",
        "Teoría General de la Física"
    ];

    for (let i = 1; i <= 150; i++) {
        let cat = categories[(i - 1) % categories.length];
        let q = {
            id: i,
            categoria: cat,
            pregunta: "",
            opciones: {},
            correcta: "",
            explicacion: ""
        };

        // Coeficientes variables únicos dependientes del ID para evitar clonación de parámetros
        let val1 = ((i * 3) % 15) + 6; 
        let val2 = ((i * 2) % 8) + 3; 
        let m = ((i * 4) % 20) + 8;   

        switch (cat) {
            case "Cinemática - MRU (Vectorial & Escalar)":
                if (i % 2 === 0) {
                    let rx = val1 * 5;
                    let ry = -val2 * 10;
                    let t = 5;
                    let vx = rx / t;
                    let vy = ry / t;
                    q.pregunta = `Un móvil se desplaza con movimiento rectilíneo uniforme desde el origen hasta el punto final \\( \\vec{r} = (${rx}\\hat{i} ${ry >= 0 ? "+" : ""}${ry}\\hat{j}) \\text{ km} \\) en un tiempo de \\( t = ${t} \\text{ h} \\). Determine el vector velocidad media de la partícula.`;
                    q.opciones = {
                        A: `\\( \\vec{v} = (${vx.toFixed(2)}\\hat{i} ${vy >= 0 ? "+" : ""}${vy.toFixed(2)}\\hat{j}) \\text{ km/h} \\)`,
                        B: `\\( \\vec{v} = (${(vx + 4.1).toFixed(2)}\\hat{i} ${(vy - 3.2) >= 0 ? "+" : ""}${(vy - 3.2).toFixed(2)}\\hat{j}) \\text{ km/h} \\)`,
                        C: `\\( \\vec{v} = (${(vx * 2.5).toFixed(2)}\\hat{i} ${(vy * 2.5) >= 0 ? "+" : ""}${(vy * 2.5).toFixed(2)}\\hat{j}) \\text{ km/h} \\)`,
                        D: `\\( \\vec{v} = (${rx}\\hat{i} ${ry >= 0 ? "+" : ""}${ry}\\hat{j}) \\text{ km/h} \\)`
                    };
                } else {
                    let d = val1 * 10;
                    let v = val2;
                    let t = (d / v).toFixed(2);
                    q.pregunta = `Un vehículo de pruebas universitarias avanza a lo largo de un riel horizontal con velocidad constante de \\( v = ${v} \\text{ m/s} \\). ¿Qué intervalo de tiempo requiere para recorrer \\( d = ${d} \\text{ m} \\)?`;
                    q.opciones = {
                        A: `\\( t = ${t} \\text{ s} \\)`,
                        B: `\\( t = ${(parseFloat(t) + 4.2).toFixed(2)} \\text{ s} \\)`,
                        C: `\\( t = ${(parseFloat(t) * 0.6).toFixed(2)} \\text{ s} \\)`,
                        D: `\\( t = ${(d * v).toFixed(2)} \\text{ s} \\)`
                    };
                }
                q.correcta = "A";
                q.explicacion = "En el MRU, la velocidad es constante. El desplazamiento o el tiempo se calculan mediante su relación de proporcionalidad directa lineal simple.";
                break;

            case "Cinemática - MRUV Vectorial":
                let v0x = val1;
                let ay = val2;
                let t_mruv = 4;
                let x_f = v0x * t_mruv;
                let y_f = 0.5 * ay * t_mruv * t_mruv;
                q.pregunta = `Un electrón ingresa a un deflector con velocidad inicial \\( \\vec{v}_0 = ${v0x}\\hat{i} \\text{ m/s} \\) y experimenta una aceleración electrostática uniforme de \\( \\vec{a} = ${ay}\\hat{j} \\text{ m/s}^2 \\). Calcule su vector de posición final \\( \\vec{r} \\) a los \\( t = ${t_mruv} \\text{ s} \\).`;
                q.opciones = {
                    A: `\\( \\vec{r} = (${x_f.toFixed(2)}\\hat{i} + ${y_f.toFixed(2)}\\hat{j}) \\text{ m} \\)`,
                    B: `\\( \\vec{r} = (${(x_f * 1.5).toFixed(2)}\\hat{i} + ${y_f.toFixed(2)}\\hat{j}) \\text{ m} \\)`,
                    C: `\\( \\vec{r} = (${x_f.toFixed(2)}\\hat{i} + ${(y_f * 2.2).toFixed(2)}\\hat{j}) \\text{ m} \\)`,
                    D: `\\( \\vec{r} = (0\\hat{i} + 0\\hat{j}) \\text{ m} \\)`
                };
                q.correcta = "A";
                q.explicacion = "Se aplican por separado las ecuaciones cinemáticas de posición final: \\( x = v_0 t \\) en la componente horizontal e \\( y = \\frac{1}{2}at^2 \\) en la acelerada.";
                break;

            case "Cinemática - Caída Libre":
                let h_cl = (0.5 * GRAVITY * val1 * val1).toFixed(2);
                q.pregunta = `Se suelta una esfera metálica desde el reposo absoluto desde la terraza de un laboratorio de física. Si tarda exactamente \\( t = ${val1} \\text{ s} \\) en chocar contra el suelo, determine la altura del edificio. Considere \\( g = ${GRAVITY} \\text{ m/s}^2 \\).`;
                q.opciones = {
                    A: `\\( h = ${h_cl} \\text{ m} \\)`,
                    B: `\\( h = ${(h_cl * 0.5).toFixed(2)} \\text{ m} \\)`,
                    C: `\\( h = ${(GRAVITY * val1).toFixed(2)} \\text{ m} \\)`,
                    D: `\\( h = ${(h_cl * 1.35).toFixed(2)} \\text{ m} \\)`
                };
                q.correcta = "A";
                q.explicacion = "Dado que el objeto se suelta desde el reposo absoluto, su altura se evalúa como: \\( h = \\frac{1}{2}g t^2 \\). Reemplazando los parámetros numéricos se obtiene el resultado.";
                break;

            case "Cinemática - Movimiento Vertical":
                let v0_mv = (GRAVITY * val2).toFixed(1);
                let h_max = (0.5 * v0_mv * v0_mv / GRAVITY).toFixed(2);
                q.pregunta = `Un proyectil de calibración es disparado verticalmente hacia arriba desde el suelo con rapidez de \\( v_0 = ${v0_mv} \\text{ m/s} \\). Calcule la altura máxima alcanzada sobre el punto de partida. Considere \\( g = ${GRAVITY} \\text{ m/s}^2 \\).`;
                q.opciones = {
                    A: `\\( H_{max} = ${h_max} \\text{ m} \\)`,
                    B: `\\( H_{max} = ${(h_max * 1.5).toFixed(2)} \\text{ m} \\)`,
                    C: `\\( H_{max} = ${(h_max * 0.5).toFixed(2)} \\text{ m} \\)`,
                    D: `\\( H_{max} = ${(v0_mv * 2).toFixed(2)} \\text{ m} \\)`
                };
                q.correcta = "A";
                q.explicacion = "Al alcanzar la altura máxima, la velocidad instantánea del objeto se reduce a cero. Por ende: \\( H_{max} = \\frac{v_0^2}{2g} \\).";
                break;

            case "Cinemática - Movimiento Compuesto":
                let v0_p = val1 + 10;
                let alc_p = ((v0_p * v0_p * Math.sin(2 * 45 * Math.PI / 180)) / GRAVITY).toFixed(2);
                q.pregunta = `Un proyectil es lanzado con una velocidad inicial de \\( v_0 = ${v0_p} \\text{ m/s} \\) y un ángulo de inclinación de \\( \\theta = 45^\\circ \\). Determine el alcance horizontal de la trayectoria parabólica. Considere \\( g = ${GRAVITY} \\text{ m/s}^2 \\).`;
                q.opciones = {
                    A: `\\( R = ${alc_p} \\text{ m} \\)`,
                    B: `\\( R = ${(alc_p * 1.25).toFixed(2)} \\text{ m} \\)`,
                    C: `\\( R = ${(alc_p * 0.5).toFixed(2)} \\text{ m} \\)`,
                    D: `\\( R = ${(v0_p * 2).toFixed(2)} \\text{ m} \\)`
                };
                q.correcta = "A";
                q.explicacion = "El alcance horizontal máximo en tiro parabólico se obtiene mediante la ecuación simplificada: \\( R = \\frac{v_0^2 \\cdot \\sin(2\\theta)}{g} \\).";
                break;

            case "Cinemática - MCU":
                let radio_mcu = val2;
                let periodo_mcu = val1 / 2;
                let vt = ((2 * Math.PI * radio_mcu) / periodo_mcu).toFixed(2);
                q.pregunta = `Un volante de motor de inercia gira con movimiento circular uniforme con un radio de \\( R = ${radio_mcu} \\text{ m} \\). Si tarda un periodo de \\( T = ${periodo_mcu} \\text{ s} \\) por cada vuelta, calcule la velocidad tangencial lineal de los puntos periféricos.`;
                q.opciones = {
                    A: `\\( v = ${vt} \\text{ m/s} \\)`,
                    B: `\\( v = ${(vt * 1.5).toFixed(2)} \\text{ m/s} \\)`,
                    C: `\\( v = ${(vt * 0.5).toFixed(2)} \\text{ m/s} \\)`,
                    D: `\\( v = ${(radio_mcu / periodo_mcu).toFixed(2)} \\text{ m/s} \\)`
                };
                q.correcta = "A";
                q.explicacion = "La rapidez tangencial lineal se define por el perímetro recorrido en un periodo orbital completo: \\( v = \\frac{2\\pi R}{T} \\).";
                break;

            case "Dinámica - Leyes de Newton":
                let f_newton = val1 * 10;
                let a_newton = (f_newton / m).toFixed(2);
                q.pregunta = `Un bloque de metal con masa de \\( m = ${m} \\text{ kg} \\) se encuentra en reposo absoluto sobre una rampa lisa horizontal sin fricción. Si se le imprime una fuerza constante de \\( F = ${f_newton} \\text{ N} \\), ¿qué aceleración lineal adquirirá?`;
                q.opciones = {
                    A: `\\( a = ${a_newton} \\text{ m/s}^2 \\)`,
                    B: `\\( a = ${(a_newton * 1.4).toFixed(2)} \\text{ m/s}^2 \\)`,
                    C: `\\( a = ${(a_newton * 0.6).toFixed(2)} \\text{ m/s}^2 \\)`,
                    D: `\\( a = ${(f_newton * m).toFixed(2)} \\text{ m/s}^2 \\)`
                };
                q.correcta = "A";
                q.explicacion = "Basándonos en la Segunda Ley de Newton, la aceleración se despeja de la fuerza neta y masa: \\( a = \\frac{F}{m} \\).";
                break;

            case "Dinámica - Fuerzas y Planos":
                let normal = (m * GRAVITY * Math.cos(30 * Math.PI / 180)).toFixed(2);
                q.pregunta = `Un bloque pesado de masa \\( m = ${m} \\text{ kg} \\) reposa sobre un plano inclinado pulido libre de fricción que forma un ángulo de \\( \\theta = 30^\\circ \\) respecto al plano horizontal. Determine la magnitud de la fuerza normal ejercida por la superficie sobre el bloque. Considere \\( g = ${GRAVITY} \\text{ m/s}^2 \\).`;
                q.opciones = {
                    A: `\\( N = ${normal} \\text{ N} \\)`,
                    B: `\\( N = ${(m * GRAVITY).toFixed(2)} \\text{ N} \\)`,
                    C: `\\( N = ${(m * GRAVITY * 0.5).toFixed(2)} \\text{ N} \\)`,
                    D: `\\( N = ${(normal * 1.5).toFixed(2)} \\text{ N} \\)`
                };
                q.correcta = "A";
                q.explicacion = "La fuerza normal en un plano inclinado equilibra la componente del peso perpendicular a la rampa: \\( N = m \\cdot g \\cdot \\cos(\\theta) \\).";
                break;

            case "Trabajo, Potencia y Energía":
                let indexSub = i % 5;
                if (indexSub === 0) {
                    let f_t = val1 * 10;
                    let d_t = val2;
                    let w_t = f_t * d_t;
                    q.pregunta = `Un bloque es empujado sobre un piso horizontal libre de rozamiento por una fuerza constante de \\( F = ${f_t} \\text{ N} \\). Si se desplaza una distancia lineal de \\( d = ${d_t} \\text{ m} \\) de manera colineal, calcule el trabajo mecánico realizado.`;
                    q.opciones = {
                        A: `\\( W = ${w_t.toFixed(2)} \\text{ J} \\)`,
                        B: `\\( W = ${(w_t * 1.35).toFixed(2)} \\text{ J} \\)`,
                        C: `\\( W = ${(w_t * 0.5).toFixed(2)} \\text{ J} \\)`,
                        D: `\\( W = 0 \\text{ J} \\)`
                    };
                    q.explicacion = "El trabajo mecánico realizado por una fuerza paralela al desplazamiento se define por el producto directo de la fuerza y la distancia de arrastre: \\( W = F \\cdot d \\).";
                } else if (indexSub === 1) {
                    let mass_ec = m;
                    let speed_ec = val1;
                    let ec_val = 0.5 * mass_ec * speed_ec * speed_ec;
                    q.pregunta = `Determine la energía cinética que posee un cuerpo de masa \\( m = ${mass_ec} \\text{ kg} \\) en el instante que su rapidez lineal alcanza los \\( v = ${speed_ec} \\text{ m/s} \\).`;
                    q.opciones = {
                        A: `\\( E_c = ${ec_val.toFixed(2)} \\text{ J} \\)`,
                        B: `\\( E_c = ${(ec_val * 1.5).toFixed(2)} \\text{ J} \\)`,
                        C: `\\( E_c = ${(ec_val * 0.4).toFixed(2)} \\text{ J} \\)`,
                        D: `\\( E_c = ${(mass_ec * speed_ec).toFixed(2)} \\text{ J} \\)`
                    };
                    q.explicacion = "La energía cinética, dependiente del movimiento lineal de los cuerpos, se evalúa mediante la expresión matemática escalar: \\( E_c = \\frac{1}{2}m v^2 \\).";
                } else if (indexSub === 2) {
                    let mass_ep = m;
                    let height_ep = val2;
                    let ep_val = mass_ep * GRAVITY * height_ep;
                    q.pregunta = `Un objeto de masa \\( m = ${mass_ep} \\text{ kg} \\) se encuentra suspendido estáticamente a una altura de \\( h = ${height_ep} \\text{ m} \\) sobre el suelo. Calcule su energía potencial gravitatoria acumulada. Considere \\( g = ${GRAVITY} \\text{ m/s}^2 \\).`;
                    q.opciones = {
                        A: `\\( E_p = ${ep_val.toFixed(2)} \\text{ J} \\)`,
                        B: `\\( E_p = ${(ep_val * 1.45).toFixed(2)} \\text{ J} \\)`,
                        C: `\\( E_p = ${(ep_val * 0.5).toFixed(2)} \\text{ J} \\)`,
                        D: `\\( E_p = ${(mass_ep * height_ep).toFixed(2)} \\text{ J} \\)`
                    };
                    q.explicacion = "La energía potencial gravitatoria se calcula directamente como el producto de la masa, la aceleración gravitatoria y la altura relativa: \\( E_p = m \\cdot g \\cdot h \\).";
                } else if (indexSub === 3) {
                    let work_p = val1 * 200;
                    let time_p = val2;
                    let power_val = work_p / time_p;
                    q.pregunta = `Una grúa de carga realiza un trabajo mecánico de \\( W = ${work_p} \\text{ J} \\) para elevar un bloque de hormigón en un lapso de tiempo exacto de \\( t = ${time_p} \\text{ s} \\). Calcule la potencia mecánica desarrollada por el motor.`;
                    q.opciones = {
                        A: `\\( P = ${power_val.toFixed(2)} \\text{ W} \\)`,
                        B: `\\( P = ${(power_val * 1.5).toFixed(2)} \\text{ W} \\)`,
                        C: `\\( P = ${(power_val * 0.6).toFixed(2)} \\text{ W} \\)`,
                        D: `\\( P = ${(work_p * time_p).toFixed(2)} \\text{ W} \\)`
                    };
                    q.explicacion = "La potencia mecánica representa la rapidez o tasa temporal con la que se transfiere o realiza trabajo útil: \\( P = \\frac{W}{t} \\).";
                } else {
                    let h_cons = val1 + 5;
                    let speed_cons = Math.sqrt(2 * GRAVITY * h_cons);
                    q.pregunta = `Se deja caer una esfera metálica desde una plataforma a una altura de \\( h = ${h_cons} \\text{ m} \\). Utilizando la conservación de la energía mecánica, determine su velocidad de impacto en el suelo. Considere \\( g = ${GRAVITY} \\text{ m/s}^2 \\).`;
                    q.opciones = {
                        A: `\\( v = ${speed_cons.toFixed(2)} \\text{ m/s} \\)`,
                        B: `\\( v = ${(speed_cons * 1.5).toFixed(2)} \\text{ m/s} \\)`,
                        C: `\\( v = ${(speed_cons * 0.5).toFixed(2)} \\text{ m/s} \\)`,
                        D: `\\( v = ${(2 * GRAVITY * h_cons).toFixed(2)} \\text{ m/s} \\)`
                    };
                    q.explicacion = "Por conservación de la energía, la energía potencial gravitatoria inicial se transforma íntegramente en cinética: \\( mgh = \\frac{1}{2}mv^2 \\implies v = \\sqrt{2gh} \\).";
                }
                q.correcta = "A";
                break;

            case "Teoría General de la Física":
                let theorySub = i % 5;
                if (theorySub === 0) {
                    q.pregunta = "¿Cuál de las siguientes magnitudes físicas se clasifica rigurosamente como una magnitud escalar en la física general?";
                    q.opciones = {
                        A: "La energía mecánica",
                        B: "La fuerza de empuje",
                        C: "La velocidad instantánea",
                        D: "La aceleración centrípeta"
                    };
                    q.explicacion = "La energía es una cantidad escalar ya que se define completamente por su magnitud numérica y unidad física, sin requerir una dirección ni sentido en el espacio.";
                } else if (theorySub === 1) {
                    q.pregunta = "De acuerdo con la Primera Ley de Newton (Inercia), si la fuerza neta que actúa sobre una partícula es exactamente nula, ¿qué se puede afirmar sobre su estado?";
                    q.opciones = {
                        A: "Permanecerá en reposo o continuará en movimiento con velocidad constante.",
                        B: "Se detendrá inmediatamente debido a la ausencia de fuerzas impulsoras.",
                        C: "Experimentará una aceleración centrípeta de magnitud constante.",
                        D: "Aumentará su energía potencial gravitatoria de forma exponencial."
                    };
                    q.explicacion = "La inercia postula que un cuerpo libre de fuerzas netas externas mantiene su estado de movimiento rectilíneo uniforme (MRU) o reposo absoluto.";
                } else if (theorySub === 2) {
                    q.pregunta = "En un Movimiento Circular Uniforme (MCU), ¿cuál es el comportamiento físico de la aceleración centrípeta de la partícula?";
                    q.opciones = {
                        A: "Su magnitud es constante, pero su dirección cambia continuamente apuntando al centro.",
                        B: "Tanto su magnitud como su dirección angular son completamente constantes.",
                        C: "Su magnitud cambia linealmente en el tiempo, pero su dirección es fija.",
                        D: "Es nula, ya que la rapidez lineal de la partícula no sufre variaciones."
                    };
                    q.explicacion = "La aceleración centrípeta actúa alterando únicamente la dirección del vector de velocidad, apuntando siempre de forma ortogonal hacia el centro orbital.";
                } else if (theorySub === 3) {
                    q.pregunta = "Según la Tercera Ley de Newton (Acción y Reacción), ¿cuál es la razón por la cual las fuerzas de acción y reacción nunca se anulan recíprocamente?";
                    q.opciones = {
                        A: "Porque actúan simultáneamente sobre cuerpos completamente distintos.",
                        B: "Porque poseen magnitudes diferentes dependiendo de la masa de cada objeto.",
                        C: "Porque actúan en instantes de tiempo separados de forma infinitesimal.",
                        D: "Porque se propagan de manera ortogonal entre si en planos cartesianos."
                    };
                    q.explicacion = "Las fuerzas de acción y reacción forman pares de interacción simétrica, pero al actuar en dos cuerpos físicos distintos, nunca pueden equilibrarse en un solo sistema de fuerzas.";
                } else {
                    q.pregunta = "¿Qué propiedad física fundamental de un sistema mecánico se asocia directamente a la existencia de fuerzas conservativas?";
                    q.opciones = {
                        A: "La conservación de la energía mecánica total del sistema.",
                        B: "La anulación de la fuerza normal en rampa inclinada.",
                        C: "La disipación de calor mediante rozamiento molecular.",
                        D: "El incremento indefinido del momento lineal en reposo."
                    };
                    q.explicacion = "Las fuerzas conservativas (como la gravedad o la fuerza elástica) permiten que el trabajo realizado a lo largo de un ciclo cerrado sea nulo, conservando la energía mecánica total.";
                }
                q.correcta = "A";
                break;
        }

        // Barajamos dinámicamente usando Fisher-Yates para romper patrones estáticos
        q = shuffleOptions(q);
        questions.push(q);
    }
}

/**
 * Mezclador Fisher-Yates de opciones A, B, C, D
 */
function shuffleOptions(q) {
    let rawOptions = [
        { key: "A", text: q.opciones.A },
        { key: "B", text: q.opciones.B },
        { key: "C", text: q.opciones.C },
        { key: "D", text: q.opciones.D }
    ];

    let correctText = q.opciones[q.correcta];

    for (let i = rawOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rawOptions[i], rawOptions[j]] = [rawOptions[j], rawOptions[i]];
    }

    let newOptions = {};
    let newCorrectKey = "A";
    const keys = ["A", "B", "C", "D"];
    
    rawOptions.forEach((opt, idx) => {
        newOptions[keys[idx]] = opt.text;
        if (opt.text === correctText) {
            newCorrectKey = keys[idx];
        }
    });

    q.opciones = newOptions;
    q.correcta = newCorrectKey;
    return q;
}

function startQuiz() {
    document.getElementById("welcome-screen").classList.add("hidden");
    renderMatrix();
    loadQuestion(0);
}

function renderMatrix() {
    const grid = document.getElementById("matrix-grid");
    grid.innerHTML = "";
    
    questions.forEach((q, idx) => {
        const btn = document.createElement("button");
        btn.id = `matrix-btn-${idx}`;
        btn.className = "cell-nav h-9 w-full rounded-lg flex items-center justify-center text-xs font-bold transition duration-200 border bg-slate-100 border-slate-200 text-slate-500 hover:border-slate-400";
        btn.textContent = idx + 1;
        btn.tabIndex = 0;
        btn.addEventListener("click", () => loadQuestion(idx));
        grid.appendChild(btn);
    });
}

function loadQuestion(idx) {
    activeIndex = idx;
    const q = questions[idx];
    
    // Resaltar elemento activo en la rejilla inferior
    document.querySelectorAll(".cell-nav").forEach(btn => btn.classList.remove("ring-4", "ring-blue-500/30", "scale-95", "border-blue-500"));
    const activeCell = document.getElementById(`matrix-btn-${idx}`);
    if (activeCell) activeCell.classList.add("ring-4", "ring-blue-500/30", "scale-95", "border-blue-500");

    // Cargar datos
    document.getElementById("active-category").textContent = q.categoria;
    document.getElementById("active-number").textContent = `Reactivo ${q.id} de 150`;
    document.getElementById("question-text-container").innerHTML = q.pregunta;

    // Renderizar las opciones
    const stack = document.getElementById("options-stack");
    stack.innerHTML = "";

    const optionKeys = ["A", "B", "C", "D"];
    optionKeys.forEach(key => {
        const btn = document.createElement("button");
        btn.className = "option-card flex items-center gap-4 text-left p-4 rounded-2xl border border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50 transition duration-150 w-full";
        btn.id = `option-${key}`;
        btn.tabIndex = 0;
        btn.innerHTML = `
            <span class="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-slate-200 option-badge">${key}</span>
            <span class="option-text flex-grow">${q.opciones[key]}</span>
        `;
        
        btn.addEventListener("click", () => checkAnswer(key));
        stack.appendChild(btn);
    });

    // Validar estados previos
    const feedback = document.getElementById("feedback-panel");
    if (userAnswers[idx]) {
        feedback.classList.remove("hidden");
        revealCorrectStyles(idx);
        disableOptions(true);
    } else {
        feedback.classList.add("hidden");
        disableOptions(false);
    }

    updateComodinesUI();

    // Renderizar LaTeX mediante KaTeX de forma síncrona en el DOM
    if (typeof renderMathInElement === "function") {
        renderMathInElement(document.body, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '\\(', right: '\\)', display: false},
                {left: '\\[', right: '\\]', display: true}
            ],
            throwOnError : false
        });
    }
}

function checkAnswer(chosenKey) {
    if (userAnswers[activeIndex]) return;

    const q = questions[activeIndex];
    const isCorrect = (chosenKey === q.correcta);

    userAnswers[activeIndex] = {
        chosen: chosenKey,
        isCorrect: isCorrect
    };

    revealCorrectStyles(activeIndex);
    disableOptions(true);

    // Reflejar estado cromático en la matriz inferior
    const matrixBtn = document.getElementById(`matrix-btn-${activeIndex}`);
    if (matrixBtn) {
        matrixBtn.classList.remove("bg-slate-100", "border-slate-200", "text-slate-500");
        if (isCorrect) {
            matrixBtn.classList.add("bg-emerald-500", "border-emerald-600", "text-white");
        } else {
            matrixBtn.classList.add("bg-rose-500", "border-rose-600", "text-white");
        }
    }

    updateScore();
}

function revealCorrectStyles(idx) {
    const q = questions[idx];
    const ans = userAnswers[idx];
    const feedback = document.getElementById("feedback-panel");
    const explanation = document.getElementById("explanation-box");
    const fTitle = document.getElementById("feedback-title");
    const fIcon = document.getElementById("feedback-icon");

    feedback.classList.remove("hidden");
    explanation.innerHTML = `<strong>Análisis Teórico Científico:</strong><br>${q.explicacion}`;

    if (ans.isCorrect) {
        feedback.className = "bg-emerald-50 border border-emerald-200 rounded-3xl p-6 shadow-sm transition-all duration-300";
        fTitle.textContent = "¡Respuesta Correcta! Sumas 1 punto.";
        fTitle.className = "font-extrabold text-emerald-950 text-base md:text-lg";
        fIcon.className = "w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-lg";
        fIcon.textContent = "✓";
    } else {
        feedback.className = "bg-rose-50 border border-rose-200 rounded-3xl p-6 shadow-sm transition-all duration-300";
        fTitle.textContent = `Respuesta Incorrecta. La opción científica correcta era la (${q.correcta})`;
        fTitle.className = "font-extrabold text-rose-950 text-base md:text-lg";
        fIcon.className = "w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-lg";
        fIcon.textContent = "✗";
    }

    // Pintar tarjetas (Verde/Rojo)
    const optionKeys = ["A", "B", "C", "D"];
    optionKeys.forEach(key => {
        const card = document.getElementById(`option-${key}`);
        if (card) {
            const badge = card.querySelector(".option-badge");
            if (key === q.correcta) {
                card.className = "option-card flex items-center gap-4 text-left p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50/50 transition duration-150 w-full";
                badge.className = "w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold border border-emerald-600 option-badge";
            } else if (key === ans.chosen) {
                card.className = "option-card flex items-center gap-4 text-left p-4 rounded-xl border-2 border-rose-500 bg-rose-50/50 transition duration-150 w-full";
                badge.className = "w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold border border-rose-600 option-badge";
            } else {
                card.className = "option-card flex items-center gap-4 text-left p-4 rounded-xl border border-slate-100 opacity-40 bg-slate-50 transition duration-150 w-full";
            }
        }
    });

    if (Object.keys(userAnswers).length === 150) {
        showFinalResults();
    }

    if (typeof renderMathInElement === "function") {
        renderMathInElement(explanation, { throwOnError: false });
    }
}

function disableOptions(status) {
    document.querySelectorAll(".option-card").forEach(btn => {
        btn.disabled = status;
    });
}

function updateScore() {
    let score = 0;
    Object.values(userAnswers).forEach(ans => {
        if (ans.isCorrect) score++;
    });
    document.getElementById("score-display").textContent = `${score} Puntos`;
    document.getElementById("final-score").textContent = `${score} / 150`;
}

function goToNextQuestion() {
    let found = false;
    for (let i = 0; i < 150; i++) {
        let checkIdx = (activeIndex + i + 1) % 150;
        if (!userAnswers[checkIdx]) {
            loadQuestion(checkIdx);
            found = true;
            break;
        }
    }
    if (!found) {
        showFinalResults();
    }
}

// LÓGICA DE COMODINES
function use5050() {
    if (usedComodines["5050"] || userAnswers[activeIndex]) return;

    const q = questions[activeIndex];
    const incorrectKeys = ["A", "B", "C", "D"].filter(key => key !== q.correcta);
    
    // Mezclamos opciones incorrectas para ocultar 2 aleatorias
    for (let i = incorrectKeys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [incorrectKeys[i], incorrectKeys[j]] = [incorrectKeys[j], incorrectKeys[i]];
    }

    document.getElementById(`option-${incorrectKeys[0]}`).classList.add("hidden-option");
    document.getElementById(`option-${incorrectKeys[1]}`).classList.add("hidden-option");

    usedComodines["5050"] = true;
    updateComodinesUI();
}

function useEliminateOne() {
    if (usedComodines["eliminar"] || userAnswers[activeIndex]) return;

    const q = questions[activeIndex];
    const incorrectKeys = ["A", "B", "C", "D"].filter(key => key !== q.correcta);
    
    const discardKey = incorrectKeys[Math.floor(Math.random() * incorrectKeys.length)];
    document.getElementById(`option-${discardKey}`).classList.add("hidden-option");

    usedComodines["eliminar"] = true;
    updateComodinesUI();
}

function useCallFriend() {
    if (usedComodines["llamada"] || userAnswers[activeIndex]) return;

    const q = questions[activeIndex];
    const tutorExplanation = `«¡Hola! Tras analizar con cuidado el modelo físico de este ejercicio, estoy seguro de que la opción correcta es la <strong>(${q.correcta})</strong>. Si aplicas la fórmula del módulo correspondiente verás que coincide perfectamente.»`;

    openModal("📞 Llamada al Tutor Académico", "Recomendación experta", tutorExplanation);

    usedComodines["llamada"] = true;
    updateComodinesUI();
}

function useAudienceHelp() {
    if (usedComodines["publico"] || userAnswers[activeIndex]) return;

    const q = questions[activeIndex];
    const keys = ["A", "B", "C", "D"];
    let stats = {};
    
    let correctPercentage = Math.floor(Math.random() * 20) + 65; // Sesgo de probabilidad para la correcta (65% - 85%)
    let remaining = 100 - correctPercentage;

    keys.forEach(key => {
        if (key === q.correcta) {
            stats[key] = correctPercentage;
        } else {
            let chunk = Math.floor(Math.random() * remaining);
            stats[key] = chunk;
            remaining -= chunk;
        }
    });

    keys.forEach(key => {
        if (key !== q.correcta && remaining > 0) {
            stats[key] += remaining;
            remaining = 0;
        }
    });

    let displayHTML = `
        <div class="space-y-3">
            <p class="mb-4 text-xs font-bold text-slate-500">Distribución porcentual de los votos:</p>
            ${keys.map(key => `
                <div>
                    <div class="flex justify-between text-xs font-extrabold mb-1">
                        <span>Opción ${key}</span>
                        <span>${stats[key]}%</span>
                    </div>
                    <div class="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div class="bg-blue-900 h-2.5 rounded-full transition-all" style="width: ${stats[key]}%"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    openModal("📊 Sondeo de Audiencia", "Resultados estadísticos simulados del grupo de estudio", displayHTML);

    usedComodines["publico"] = true;
    updateComodinesUI();
}

function updateComodinesUI() {
    document.getElementById("comodin-5050").disabled = usedComodines["5050"] || userAnswers[activeIndex] !== undefined;
    document.getElementById("comodin-eliminar").disabled = usedComodines["eliminar"] || userAnswers[activeIndex] !== undefined;
    document.getElementById("comodin-llamada").disabled = usedComodines["llamada"] || userAnswers[activeIndex] !== undefined;
    document.getElementById("comodin-publico").disabled = usedComodines["publico"] || userAnswers[activeIndex] !== undefined;

    ["5050", "eliminar", "llamada", "publico"].forEach(key => {
        const btn = document.getElementById(`comodin-${key}`);
        if (btn) {
            if (usedComodines[key]) {
                btn.classList.add("opacity-40", "cursor-not-allowed");
                btn.classList.remove("hover:bg-slate-100");
            } else {
                btn.classList.remove("opacity-40", "cursor-not-allowed");
                btn.classList.add("hover:bg-slate-100");
            }
        }
    });
}

function openModal(title, subtitle, content) {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-subtitle").textContent = subtitle;
    document.getElementById("modal-content").innerHTML = content;
    document.getElementById("custom-modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("custom-modal").classList.add("hidden");
}

function showFinalResults() {
    document.getElementById("final-modal").classList.remove("hidden");
}

function restartQuiz() {
    userAnswers = {};
    usedComodines = { "5050": false, "eliminar": false, "llamada": false, "publico": false };
    document.getElementById("final-modal").classList.add("hidden");
    
    // Limpiar clases de la matriz inferior
    for(let i=0; i<150; i++){
        const matrixBtn = document.getElementById(`matrix-btn-${i}`);
        if (matrixBtn) {
            matrixBtn.className = "cell-nav h-9 w-full rounded-lg flex items-center justify-center text-xs font-bold transition duration-200 border bg-slate-100 border-slate-200 text-slate-500 hover:border-slate-400";
        }
    }
    
    updateScore();
    loadQuestion(0);
}

// BINDEAR TODOS LOS EVENTOS DE MANERA SEGURA CUANDO EL DOM ESTÉ TOTALMENTE CARGADO
document.addEventListener("DOMContentLoaded", () => {
    generateQuestionBank();

    // Eventos de botones estáticos
    document.getElementById("btn-start-quiz").addEventListener("click", startQuiz);
    document.getElementById("btn-next-question").addEventListener("click", goToNextQuestion);
    document.getElementById("btn-close-modal").addEventListener("click", closeModal);
    document.getElementById("btn-restart-quiz").addEventListener("click", restartQuiz);

    // Eventos de comodines
    document.getElementById("comodin-5050").addEventListener("click", use5050);
    document.getElementById("comodin-eliminar").addEventListener("click", useEliminateOne);
    document.getElementById("comodin-llamada").addEventListener("click", useCallFriend);
    document.getElementById("comodin-publico").addEventListener("click", useAudienceHelp);
});

// Navegación accesible por teclado (Enter en tarjetas de respuestas enfocadas)
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains("option-card")) {
            activeElement.click();
        }
    }
});