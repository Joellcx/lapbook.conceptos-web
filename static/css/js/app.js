
let indiceActual = 0;
let puntaje = 0;

function cargarPregunta() {
    const q = preguntas[indiceActual];
    document.getElementById("numPregunta").innerText = `Pregunta ${indiceActual + 1}/10`;
    document.getElementById("txtPregunta").innerText = q.pregunta;
    document.getElementById("resultadoJuego").innerText = "";

    const contenedor = document.getElementById("contenedorOpciones");
    contenedor.innerHTML = "";

    q.opciones.forEach((opcion, index) => {
        const btn = document.createElement("button");
        btn.innerText = opcion;
        btn.onclick = () => verificar(index === q.correcta);
        contenedor.appendChild(btn);
    });
}

function verificar(esCorrecta) {
    const res = document.getElementById("resultadoJuego");
    const botones = document.getElementById("contenedorOpciones").getElementsByTagName("button");

    for (let b of botones) b.disabled = true;

    if (esCorrecta) {
        res.style.color = "#2a9d8f";
        res.innerText = "¡Correcto! 🎉 Siguiente...";
        puntaje++;
    } else {
        res.style.color = "#e63946";
        res.innerText = "Incorrecto ❌ Siguiente...";
    }

    setTimeout(() => {
        indiceActual++;
        if (indiceActual < preguntas.length) cargarPregunta();
        else mostrarResultadoFinal();
    }, 1100);
}

function mostrarResultadoFinal() {
    document.getElementById("numPregunta").innerText = "¡Juego Completado! 🏆";
    document.getElementById("txtPregunta").innerText = `Terminaste las 10 preguntas. Tu puntaje fue: ${puntaje}/10.`;
    document.getElementById("contenedorOpciones").innerHTML = `
        <button onclick="reiniciarJuego()" style="background: #2a9d8f; padding: 10px; font-size: 1rem;">🔄 Volver a Jugar</button>
    `;
    document.getElementById("resultadoJuego").innerText = "";
}

function reiniciarJuego() {
    indiceActual = 0;
    puntaje = 0;
    cargarPregunta();
}

window.onload = function() {
    cargarPregunta();
};

// ===================== PUERTAS =====================
function abrirPuertas() {
    const puertaIzquierda = document.getElementById('puertaIzquierda');
    const puertaDerecha = document.getElementById('puertaDerecha');
    
    if (puertaIzquierda && puertaDerecha) {
        puertaIzquierda.style.transform = "rotateY(-180deg)";
        puertaDerecha.style.transform = "rotateY(180deg)";
        puertaIzquierda.style.pointerEvents = "none";
        puertaDerecha.style.pointerEvents = "none";
    }
}

function cerrarPuertas() {
    const contenidos = document.querySelectorAll('.cascada-container, .sql-terminal, .jinja-puente, .css-cabina, .js-cabina');
    contenidos.forEach(c => {
        c.style.display = 'none';
        c.classList.remove('activa-efecto');
    });

    const tarjetas = document.querySelectorAll('.tarjeta-interior');
    tarjetas.forEach(t => t.classList.remove('activa'));

    const puertaIzq = document.getElementById('puertaIzquierda');
    const puertaDer = document.getElementById('puertaDerecha');
    if (puertaIzq && puertaDer) {
        puertaIzq.style.transform = 'translateX(0)';
        puertaDer.style.transform = 'translateX(0)';
        puertaIzq.style.pointerEvents = 'auto';
        puertaDer.style.pointerEvents = 'auto';
    }
}

// ===================== TOGGLES DE TARJETAS =====================
function toggleCascada() {
    const el = document.getElementById('contentCascada');
    const card = document.getElementById('cardHtml');
    const isOpen = el.style.display === 'block';
    el.style.display = isOpen ? 'none' : 'block';
    card.classList.toggle('activa', !isOpen);
}

function toggleSql() {
    const el = document.getElementById('contentSql');
    const card = document.getElementById('cardSql');
    const isOpen = el.style.display === 'block';
    el.style.display = isOpen ? 'none' : 'block';
    card.classList.toggle('activa', !isOpen);
    if (!isOpen) el.classList.add('activa-efecto');
    else el.classList.remove('activa-efecto');
}

function toggleJinja() {
    const el = document.getElementById('contentJinja');
    const card = document.getElementById('cardJinja');
    const isOpen = el.style.display === 'block';
    el.style.display = isOpen ? 'none' : 'block';
    card.classList.toggle('activa', !isOpen);
    if (!isOpen) el.classList.add('activa-efecto');
    else el.classList.remove('activa-efecto');
}

function toggleCssCard() {
    const el = document.getElementById('contentCss');
    const card = document.getElementById('cardCss');
    const isOpen = el.style.display === 'block';
    el.style.display = isOpen ? 'none' : 'block';
    card.classList.toggle('activa', !isOpen);
}

function toggleJs() {
    const el = document.getElementById('contentJs');
    const card = document.getElementById('cardJs');
    const isOpen = el.style.display === 'block';
    el.style.display = isOpen ? 'none' : 'block';
    card.classList.toggle('activa', !isOpen);
}

// ===================== CAMBIAR COLOR CSS =====================
function cambiarColorCss(color) {
    const elementos = document.querySelectorAll('.tarjeta-interior, .panel-central, [id^="card"]');
    elementos.forEach(el => {
        el.style.borderColor = color;
        el.style.boxShadow = `0 0 20px ${color}, inset 0 0 10px ${color}`;
    });
}

// ===================== MINIJUEGO HTML =====================
let nivelHtml = 1;
function verificarHtml(etiqueta) {
    const resultado = document.getElementById('htmlResultado');
    if (etiqueta === '&lt;h1&gt;') {
        resultado.style.color = "#00f5d4";
        resultado.innerHTML = "🎉 ¡Correcto! Has creado un título web.";
    } else {
        resultado.style.color = "#ff0054";
        resultado.innerHTML = "❌ Casi, esa pertenece a otra función. ¡Intenta de nuevo!";
    }
}

function jugarHtml(opcion) {
    const resultado = document.getElementById('htmlResultado');
    const desafio = document.getElementById('htmlDesafio');

    if (nivelHtml === 1) {
        if (opcion === 'h1') {
            resultado.style.color = "#00f5d4";
            resultado.innerHTML = "🎉 ¡Excelente! &lt;h1&gt; define el título principal.";
            nivelHtml = 2;
            setTimeout(() => {
                desafio.innerHTML = "Nivel 2: ¿Qué etiqueta inserta una <b>imagen</b>?";
                resultado.innerHTML = "¡Siguiente nivel!";
                resultado.style.color = "#00f5d4";
            }, 1200);
        } else {
            resultado.style.color = "#ff0054";
            resultado.innerHTML = "❌ Nop, esa no es para títulos principales.";
        }
    } else if (nivelHtml === 2) {
        if (opcion === 'img') {
            resultado.style.color = "#00f5d4";
            resultado.innerHTML = "🏆 ¡Brillante! &lt;img&gt; inserta imágenes. ¡Juego superado!";
            nivelHtml = 1;
            setTimeout(() => {
                desafio.innerHTML = "Nivel 1: ¿Qué etiqueta define el <b>título principal</b>?";
            }, 2500);
        } else {
            resultado.style.color = "#ff0054";
            resultado.innerHTML = "❌ ¡Inténtalo de nuevo para colocar la imagen!";
        }
    }
}

function agregarElementoHtml(tipo) {
    const canvas = document.getElementById('htmlCanvas');
    if (tipo === 'reset') {
        canvas.innerHTML = '<small style="color: #aaa;">El contenido creado aparecerá aquí...</small>';
        return;
    }
    if (canvas.querySelector('small')) canvas.innerHTML = '';
    
    if (tipo === 'h1') {
        canvas.innerHTML += '<h3 style="color: #ff0054; margin: 4px 0;">⚡ Nuevo Título H1</h3>';
    } else if (tipo === 'p') {
        canvas.innerHTML += '<p style="color: #fff; font-size: 11px; margin: 4px 0;">Párrafo insertado en el DOM.</p>';
    } else if (tipo === 'btn') {
        canvas.innerHTML += '<button style="background: #ffb703; border: none; padding: 3px 6px; border-radius: 3px; font-weight: bold; font-size: 10px;">¡Botón DOM!</button>';
    }
}

// ===================== MINIJUEGO SQL =====================
let nivelSql = 1;
function jugarSql(opcion) {
    const resultado = document.getElementById('sqlResultado');
    const desafio = document.getElementById('sqlDesafio');

    if (nivelSql === 1) {
        if (opcion === 'select') {
            resultado.style.color = "#00f5d4";
            resultado.innerHTML = "🎉 ¡Perfecto! SELECT extrae los datos.";
            nivelSql = 2;
            setTimeout(() => {
                desafio.innerHTML = "Nivel 2: ¿Qué comando añade un <b>nuevo registro</b>?";
                resultado.innerHTML = "¡Siguiente nivel!";
            }, 1200);
        } else {
            resultado.style.color = "#ff0054";
            resultado.innerHTML = "❌ Nop, ese comando sirve para otra cosa en la BD.";
        }
    } else if (nivelSql === 2) {
        if (opcion === 'insert') {
            resultado.style.color = "#00f5d4";
            resultado.innerHTML = "🏆 ¡Excelente! INSERT INTO agrega registros. ¡Superado!";
            nivelSql = 1;
            setTimeout(() => {
                desafio.innerHTML = "Nivel 1: ¿Qué comando se usa para <b>leer o extraer</b> registros?";
            }, 2500);
        } else {
            resultado.style.color = "#ff0054";
            resultado.innerHTML = "❌ ¡Inténtalo de nuevo para insertar datos!";
        }
    }
}

let idCount = 3;
function ejecutarSqlReal(accion) {
    const log = document.getElementById('sqlLog');
    const tbody = document.getElementById('sqlTableBody');

    if (accion === 'SELECT') {
        log.innerHTML = 'Query: <span style="color:#00f5d4;">SELECT * FROM usuarios;</span> (Filas devueltas)';
    } else if (accion === 'INSERT') {
        log.innerHTML = `Query: <span style="color:#ff0054;">INSERT INTO usuarios VALUES (${idCount}, 'User_${idCount}', 'Guest');</span>`;
        tbody.innerHTML += `<tr><td>${idCount}</td><td>User_${idCount}</td><td>Guest</td></tr>`;
        idCount++;
    } else if (accion === 'DELETE') {
        log.innerHTML = 'Query: <span style="color:#ffb703;">DELETE FROM usuarios WHERE id = ultimo;</span>';
        if (tbody.lastElementChild) tbody.removeChild(tbody.lastElementChild);
    }
}

function ejecutarSqlTerminal(query) {
    const pantalla = document.getElementById('sqlTerminalScreen');
    if (query === 'select') {
        pantalla.innerHTML = "> SELECT * FROM registros;<br><span style='color: #00f5d4;'>[OK] 3 filas recuperadas con éxito.</span>";
    } else if (query === 'insert') {
        pantalla.innerHTML = "> INSERT INTO registros VALUES ('Nuevo');<br><span style='color: #ffb703;'>[OK] Registro añadido correctamente.</span>";
    } else if (query === 'drop') {
        pantalla.innerHTML = "> DROP TABLE registros;<br><span style='color: #ff0054;'>[¡ALERTA!] Tabla vaciada y reiniciada.</span>";
    }
}

// ===================== JINJA =====================
function renderJinjaLive(nombre, rango) {
    const output = document.getElementById('jinjaLiveOutput');
    if (output) {
        output.innerHTML = `<h3>Hola ${nombre}!</h3><small>Rango: ${rango}</small>`;
    }
}

// ===================== COHETE / JS =====================
function lanzarPropulsion() {
    const cohete = document.getElementById('coheteVolador');
    const status = document.getElementById('jsStatus');
    if (cohete) {
        status.innerHTML = "Estado: 🚀 ¡Propulsión Activada!";
        status.style.color = "#00f5d4";
        
        cohete.style.transition = 'none';
        cohete.style.bottom = '-150px';
        
        setTimeout(() => {
            cohete.style.transition = 'bottom 1.5s ease-in-out';
            cohete.style.bottom = '105vh';
        }, 50);

        setTimeout(() => {
            cohete.style.transition = 'none';
            cohete.style.bottom = '-150px';
            setTimeout(() => {
                cohete.style.transition = 'bottom 1.5s ease-in-out';
            }, 50);
            status.innerHTML = "Estado: Standby";
            status.style.color = "#ffb703";
        }, 1600);
    }
}