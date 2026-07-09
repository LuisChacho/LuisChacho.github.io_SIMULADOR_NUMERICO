# ⚛️ Simulador de Física y Ciencias Exactas de Nivel Universitario

Este es un entorno web modular de alto rendimiento diseñado específicamente para la autoevaluación, el diagnóstico avanzado y el entrenamiento intensivo de estudiantes en el área de física y ciencias exactas pre-politécnicas.

## 🚀 Atributos Técnicos e Ingeniería de Software

1. **Generación Procedural Limpia:** El motor integrado en `index.js` expande dinámicamente el banco semilla hasta alcanzar exactamente **100 reactivos científicos únicos**, asegurando la inexistencia de cadenas clonadas o duplicaciones burdas de datos.
2. **Sistema Anti-Patrones (Fisher-Yates):** Cada vez que se renderiza un reactivo no resuelto, la disposición espacial de las opciones (A, B, C, D) se baraja algorítmicamente. Esto destruye cualquier patrón posicional fijo y fuerza una validación real basada en competencias cognitivas.
3. **Persistencia del Estado en Memoria:** El usuario puede usar la matriz lateral para saltar de la pregunta 1 a la 100 en el orden que desee. El software guarda el progreso exacto, bloqueando las preguntas respondidas y preservando el diagnóstico cromático (Verde: Correcto / Rojo: Incorrecto).
4. **Andamiaje Pedagógico Avanzado:** No es un simple validador. Tras responder, se devela una justificación técnica rigurosa y detallada del ejercicio. Además, la barra de comodines añade ayudas heurísticas contextuales y simulaciones estadísticas de percentiles.

## 🔧 Despliegue Inmediato en Producción

Para poner en funcionamiento el simulador en entornos locales o nubes web, siga estos pasos:

1. Guarde los 4 archivos (`index.html`, `index.css`, `index.js`, `README.md`) dentro de un mismo directorio local.
2. Para ejecución inmediata, haga doble clic sobre `index.html` en su explorador de archivos para abrirlo en cualquier navegador moderno (Edge, Chrome, Safari, Firefox).
3. **Despliegue en GitHub Pages:**
   - Cree un repositorio público en su perfil de GitHub.
   - Suba los 4 archivos a la raíz de la rama principal (`main`).
   - Navegue a `Settings` -> `Pages`.
   - Bajo **Build and deployment**, defina el origen como `Deploy from a branch`, elija la rama `main` y haga clic en `Save`.
   - En menos de un minuto, GitHub generará un link HTTPS global para acceder al simulador desde cualquier dispositivo.