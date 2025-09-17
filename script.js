// Obtenemos los elementos del DOM para entradas y salidas
const numInputsElement = document.getElementById('num-inputs'); // Elemento para capturar el número de entradas
const numOutputsElement = document.getElementById('num-outputs'); // Elemento para capturar el número de salidas
const truthTableContainer = document.getElementById('truth-table-container'); // Contenedor donde se generará la tabla de verdad

// Función para generar la tabla de verdad
function generateTruthTable() {
    // Obtenemos el número de entradas y salidas ingresadas por el usuario
    const numInputs = parseInt(numInputsElement.value, 10);
    const numOutputs = parseInt(numOutputsElement.value, 10);

    // Validación de los valores ingresados para asegurar que estén en el rango permitido
    if (isNaN(numInputs) || isNaN(numOutputs) || numInputs < 2 || numInputs > 8 || numOutputs < 1 || numOutputs > 8) {
        alert('Por favor ingrese valores válidos para entradas (2-8) y salidas (1-8).');
        return;
    }

    // Número de filas en la tabla de verdad, que es 2 elevado al número de entradas
    const numRows = Math.pow(2, numInputs);

    // Limpiamos cualquier contenido previo en el contenedor de la tabla
    truthTableContainer.innerHTML = '';

    // Crear la tabla dinámica
    const table = document.createElement('table');
    table.id = 'truth-table'; // Asignamos un ID a la tabla para referencia futura
    table.border = '1'; // Añadimos un borde básico para visualización

    // Crear la sección de encabezados
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr'); // Fila de encabezados

    // Primera celda de numeración (columna índice)
    const thIndex = document.createElement('th');
    thIndex.textContent = '#'; // Título de la columna índice
    headerRow.appendChild(thIndex);

    // Crear encabezados para las columnas de entrada (A, B, C, ...)
    for (let i = 0; i < numInputs; i++) {
        const th = document.createElement('th');
        th.textContent = `${String.fromCharCode(65 + i)}`; // Genera letras consecutivas desde A
        headerRow.appendChild(th);
    }

    // Crear encabezados para las columnas de salida (R, S, T, ...)
    for (let i = 0; i < numOutputs; i++) {
        const th = document.createElement('th');
        th.textContent = `${String.fromCharCode(82 + i)}`; // Genera letras consecutivas desde R
        headerRow.appendChild(th);
    }

    thead.appendChild(headerRow); // Agregamos la fila de encabezados al thead
    table.appendChild(thead); // Agregamos thead a la tabla

    // Crear el cuerpo de la tabla
    const tbody = document.createElement('tbody');

    for (let i = 0; i < numRows; i++) {
        const row = document.createElement('tr'); // Crear una nueva fila

        // Celda de numeración para cada fila
        const tdIndex = document.createElement('td');
        tdIndex.textContent = i; // Número de la fila (0 a numRows-1)
        row.appendChild(tdIndex);

        // Celdas de entradas en formato binario
        const binaryString = i.toString(2).padStart(numInputs, '0'); // Convertir índice a binario
        for (let bit of binaryString) {
            const td = document.createElement('td');
            td.textContent = bit; // Valor binario (0 o 1)
            row.appendChild(td);
        }

        // Celdas de salidas inicializadas en 0
        for (let j = 0; j < numOutputs; j++) {
            const td = document.createElement('td');
            td.textContent = '0'; // Valor inicial para las salidas
            td.classList.add('editable-cell'); // Clase para identificar celdas editables
            td.setAttribute('data-row', i); // Atributo para identificar la fila
            td.setAttribute('data-output', j); // Atributo para identificar la salida
            td.addEventListener('click', () => {
                // Alternar valores al hacer clic: 0 -> 1 -> X -> 0
                const currentValue = td.textContent;
                let newValue = '0';
                if (currentValue === '0') {
                    newValue = '1';
                } else if (currentValue === '1') {
                    newValue = 'X';
                }
                td.textContent = newValue; // Actualizar el valor
            });
            row.appendChild(td);
        }

        tbody.appendChild(row); // Agregar la fila al cuerpo de la tabla
    }

    table.appendChild(tbody); // Agregar el cuerpo a la tabla
    truthTableContainer.appendChild(table); // Mostrar la tabla en el contenedor

    // Log detallado de la matriz de salida
    const outputMatrix = Array.from(tbody.children).map(row => {
        return Array.from(row.children).slice(-numOutputs).map(cell => cell.textContent);
    });
    console.log("Matriz de salidas generada para el mapa de Karnaugh:", outputMatrix);

    console.log("Tabla de verdad generada correctamente.");
}

// Función para establecer todos los valores de salida
function setTruthTableValues(value) {
    const table = document.getElementById('truth-table'); // Obtener la tabla generada
    if (!table) {
        console.error("La tabla de verdad no existe.");
        return;
    }

    const rows = table.getElementsByTagName('tr'); // Todas las filas de la tabla
    for (let i = 1; i < rows.length; i++) { // Comenzar desde 1 para saltar el encabezado
        const cells = rows[i].getElementsByTagName('td');
        for (let j = cells.length - numOutputsElement.value; j < cells.length; j++) { // Modificar solo columnas de salida
            cells[j].textContent = value; // Cambiar el contenido al valor dado
        }
    }

    console.log(`Todas las salidas se establecieron en: ${value}`); // Log del cambio
}

// Asignar la función al botón de generación
const generateTruthTableButton = document.getElementById('generate-truth-table');
generateTruthTableButton.addEventListener('click', generateTruthTable);

// Asignar funciones a los botones de ajuste de valores directamente por ID
document.getElementById('set-to-1').addEventListener('click', () => setTruthTableValues('1'));
document.getElementById('set-to-0').addEventListener('click', () => setTruthTableValues('0'));
document.getElementById('set-to-x').addEventListener('click', () => setTruthTableValues('X'));

// /////////////////////////////////////////////////////////////////////////////////////////// aca se genera el mapa de Karnaugh


/**
 * Función para generar el código Gray de n bits.
 * El código Gray asegura que las combinaciones vecinas difieran en solo un bit.
 */
function generateGrayCode(n) {
    if (n === 1) return ['0', '1'];
    const prevGrayCode = generateGrayCode(n - 1);
    const result = [];

    // Añadir un 0 al principio de los códigos previos
    for (let i = 0; i < prevGrayCode.length; i++) {
        result.push('0' + prevGrayCode[i]);
    }

    // Añadir un 1 al principio de los códigos previos en orden inverso
    for (let i = prevGrayCode.length - 1; i >= 0; i--) {
        result.push('1' + prevGrayCode[i]);
    }

    return result;
}

/**
 * Función para convertir un número en Gray code a su equivalente binario.
 */
function grayToBinary(gray) {
    let binary = parseInt(gray[0]);
    for (let i = 1; i < gray.length; i++) {
        binary = binary << 1 ^ parseInt(gray[i]);
    }
    return binary;
}

/**
 * Función para generar nombres de entradas basadas en el número de entradas.
 */
function generateInputNames(inputs) {
    const inputNames = [];
    for (let i = 0; i < inputs; i++) {
        inputNames.push(String.fromCharCode(65 + i)); // A, B, C, ...
    }
    return inputNames;
}

/**
 * Función para generar nombres de salidas basadas en el número de salidas.
 */
function generateOutputNames(outputs) {
    const outputNames = [];
    for (let i = 0; i < outputs; i++) {
        outputNames.push(String.fromCharCode(82 + i)); // R, S, T, ...
    }
    return outputNames;
}

/**
 * Función para mostrar el mapa de Karnaugh basado en los datos de la tabla de verdad.
 */
function generateKMapDisplay(kmapData, inputs, outputs) {
    const kmapDiv = document.getElementById('kmap-container'); // Contenedor del mapa de Karnaugh
    kmapDiv.innerHTML = '';  // Limpiamos el mapa anterior

    const inputNames = generateInputNames(inputs); // Nombres de las entradas (A, B, ...)
    const outputNames = generateOutputNames(outputs); // Nombres de las salidas (R, S, ...)
    const rowVars = Math.floor(inputs / 2); // Variables que determinan las filas
    const colVars = inputs - rowVars; // Variables que determinan las columnas

    const grayCodeRows = generateGrayCode(rowVars); // Generar códigos Gray para filas
    const grayCodeCols = generateGrayCode(colVars); // Generar códigos Gray para columnas

    const kmapResultMatrix = [];

    for (let outputIndex = 0; outputIndex < outputs; outputIndex++) {
        let indicativeText = `<p><strong>Mapa de Karnaugh para la salida ${outputNames[outputIndex]}</strong></p>`;
        let headerText = `${inputNames.slice(0, rowVars).join('')}${inputNames.slice(rowVars).join('')}`;
        let kmapTable = `<table border="1"><thead><tr><th>${headerText}</th>`;

        // Crear encabezados para las columnas
        for (let i = 0; i < grayCodeCols.length; i++) {
            kmapTable += `<th>${grayCodeCols[i]}</th>`;
        }
        kmapTable += '</tr></thead><tbody>';

        const kmapRowMatrix = [];

        for (let row = 0; row < grayCodeRows.length; row++) {
            kmapTable += `<tr><th>${grayCodeRows[row]}</th>`;
            const kmapRow = [];

            for (let col = 0; col < grayCodeCols.length; col++) {
                const rowIndex = grayToBinary(grayCodeRows[row]) * grayCodeCols.length;
                const colIndex = grayToBinary(grayCodeCols[col]);
                const cellIndex = rowIndex + colIndex;
                const cellValue = kmapData[cellIndex] ? kmapData[cellIndex][outputIndex] : 'X';

                kmapRow.push(cellValue);
                kmapTable += `<td>${cellValue}</td>`;
            }

            kmapRowMatrix.push(kmapRow);
            kmapTable += '</tr>';
        }

        kmapResultMatrix.push(kmapRowMatrix);
        kmapTable += '</tbody></table>';
        kmapDiv.innerHTML += indicativeText + kmapTable;
    }

    console.log("Matriz generada para el mapa de Karnaugh:", kmapResultMatrix);
    // Comentamos la siguiente línea hasta que generateSOPGroups esté definida
    // generateSOPGroups(kmapResultMatrix, inputs, outputs);
}

/**
 * Función principal para capturar datos y generar el mapa de Karnaugh.
 */
function generateKarnaughMap() {
    const table = document.getElementById('truth-table'); // Obtener la tabla generada
    if (!table) {
        console.error("La tabla de verdad no existe.");
        return;
    }

    const rows = table.getElementsByTagName('tr'); // Todas las filas de la tabla
    const kmapData = {};

    for (let i = 1; i < rows.length; i++) { // Ignorar encabezado
        const cells = rows[i].getElementsByTagName('td');
        const rowIndex = i - 1; // Índice de la fila
        kmapData[rowIndex] = [];

        for (let j = cells.length - numOutputsElement.value; j < cells.length; j++) { // Solo columnas de salida
            kmapData[rowIndex].push(cells[j].textContent);
        }
    }

    console.log("Datos capturados para el mapa de Karnaugh:", kmapData);

    const numInputs = parseInt(numInputsElement.value, 10);
    const numOutputs = parseInt(numOutputsElement.value, 10);

    // Llamar a la función para mostrar el mapa de Karnaugh
    generateKMapDisplay(kmapData, numInputs, numOutputs);
}

// Vincular la función al botón correspondiente
const generateKarnaughMapButton = document.getElementById('generate-kmap');
generateKarnaughMapButton.addEventListener('click', generateKarnaughMap);


