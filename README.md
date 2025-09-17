# CircuitKraft: Mapa de Karnaugh y Circuitos Lógicos

## Descripción

CircuitKraft es una herramienta interactiva diseñada para ayudar a estudiantes y profesionales en la simplificación de circuitos lógicos utilizando mapas de Karnaugh. La aplicación incluye:

- Generación de tablas de verdad. (en proceso)
- Creación dinámica de mapas de Karnaugh.(en proceso)
- Identificación de grupos y simplificación de ecuaciones. (en proceso)
- Representación visual de los resultados.

## Explicación del algoritmo

Te entiendo, lo que tienes en tu sección de **Explicación del algoritmo** se percibe muy general y poco técnico. No está mal, pero da la sensación de que falta estructura y precisión. Te propongo una redacción más clara y ordenada, diferenciando **qué hace el algoritmo, cómo lo hace y qué objetivo cumple**:

---

## Explicación del Algoritmo

El algoritmo de CircuitKraft reproduce de forma sistemática lo que hace un humano al analizar un mapa de Karnaugh: identificar adyacencia, formar grupos y simplificar expresiones booleanas.

La aplicación permite trabajar con 2 a 8 entradas digitales y hasta 8 salidas, generando una ecuación booleana simplificada por cada salida. Con ello se facilita el diseño de circuitos digitales como sumadores, sumadores con acarreo, controladores de displays u otros sistemas lógicos personalizados.

## Estructura del Proyecto

### 1. HTML

Estructura básica de la interfaz de usuario:

- **Sección de configuración:** Selección de entradas y salidas.
- **Tabla de verdad:** Generada dinámicamente.
- **Mapa de Karnaugh:** Visualización interactiva.
- **Ecuaciones simplificadas:** Presentación de resultados.
- **Salida del circuito:** Representación visual del circuito simplificado.

### 2. CSS

Estilo del proyecto (pendiente de ajustes futuros):

- Diseño responsivo.
- Mejoras visuales para botones, tablas y mapas.

### 3. JavaScript

Funciones principales:

- Generación de tablas de verdad.
- Manejo de eventos en la interfaz.
- Ajuste dinámico de valores (1, 0, X).
- Creación y manipulación de mapas de Karnaugh.

## Log de Cambios

### Versión Inicial

- Implementación de generación de tablas de verdad.
- Funcionalidad de ajuste de valores de salidas con botones.
- Interfaz inicial con estructura básica.

### Cambios Recientes

- **Generación de la Tabla de Verdad:**
  - Se implementó la funcionalidad para generar una tabla de verdad dinámica en función del número de entradas y salidas.
  - Se añadió interactividad a las celdas de salida para alternar entre los valores `0`, `1` y `X` con un clic.

- **Botones de Ajuste Global:**
  - Se añadieron botones para establecer todas las salidas de la tabla de verdad en `1`, `0` o `X`.

- **Generación del Mapa de Karnaugh:**
  - Se implementó la función `generateKarnaughMap` para capturar las salidas de la tabla de verdad y generar un mapa de Karnaugh visual.
  - Se utilizó código Gray para garantizar que las combinaciones vecinas en el mapa difieran solo en un bit.
  - Los encabezados del mapa ahora reflejan correctamente las variables de entrada.
  - Se corrigieron errores relacionados con nombres de entradas y salidas.

### Próximos Pasos

- Implementar la lógica para identificar grupos en el mapa de Karnaugh.
- Calcular ecuaciones booleanas simplificadas a partir de los grupos identificados.
- Optimizar la generación dinámica de tablas y mapas para mejorar el rendimiento y la experiencia del usuario.

## Funcionalidades Futuros

1. **Estilo Visual Mejorado:**
   - Diseñar un tema visual agradable y claro.
   - Colores diferenciados para identificar fácilmente entradas y salidas.

2. **Funciones Adicionales:**
   - Generación automática de ecuaciones simplificadas.
   - Validación de mapas de Karnaugh.

3. **Accesibilidad:**
   - Navegación mediante teclado.
   - Compatibilidad con lectores de pantalla.

4. **Soporte Multi lenguaje:**
   - Traducciones automáticas de la interfaz.

## Cómo Contribuir

1. Clona el repositorio.
2. Realiza tus cambios en una nueva rama.
3. Realiza un pull request con una descripción clara de tus cambios.

## Autor

Proyecto desarrollado por jmasmelac.
