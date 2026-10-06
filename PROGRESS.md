# Progreso: Seis Figuras (aplicación de productividad)

Última revisión: 2026-10-05. Estado: **prototipo front-end funcional con datos de ejemplo**.

## Qué es
Panel de productividad para pequeños negocios, mostrado con un perfil de ejemplo: **Casa Alba Catering** (San Juan, Puerto Rico). Es una app estática (HTML + CSS + JS vanilla), sin backend ni build. Se abre `index.html` (landing de ventas) o `app.html` (demostración) directo en el navegador. Todo el contenido está en español.

## Archivos
| Archivo | Contenido |
|---|---|
| `index.html` + `landing.css` | Landing page de ventas (simulada) con enlace a la demostración. |
| `Estrategia-de-mercadeo.docx` | Reporte de una página de la estrategia de mercadeo. |
| `app.html` | Estructura: barra lateral y 6 secciones (hash routing). |
| `app.js` | Datos de ejemplo, utilidades y lógica de cada página. |
| `styles.css` | Estilo minimalista (paleta cálida, Newsreader + Geist), responsive, `prefers-reduced-motion`. |
| `logo.png` | Logo de la marca, usado como favicon y en la barra lateral. |
| `preview-minimalista.html` / `preview-brutalista.html` / `preview-suave.html` | Tres maquetas de estilo exploradas. El estilo **minimalista** fue el elegido y está aplicado en la app. |
| `seis figuras` | Archivo vacío (0 bytes), parece un marcador sin uso. |

## Páginas implementadas
1. **Resumen**: tarjeta de perfil (datos del negocio, estadísticas), 4 KPIs de septiembre, próximos eventos y facturas por cobrar.
2. **Calendario**: vista mensual (semana desde lunes) con navegación de meses, agenda del mes y leyenda por tipo (Boda, Corporativo, Social, Cita). Abre en octubre 2026.
3. **Facturación**: KPIs (facturado, cobrado, pendiente, vencido), tabla con filtro por estado. IVU de PR al 11.5 % (10.5 % estatal + 1 % municipal).
4. **Rentabilidad**: KPIs, gráfico de barras ingresos vs. costos por mes, desglose de costos, resultado mensual y margen por evento (verde ≥30 %, amarillo ≥25 %, rojo menos). Gastos fijos de $1,800 al mes.
5. **Menú**: 3 paquetes por persona (Criollo $38, Elegante $52, Gala $68) y carta completa con precio, costo y margen por plato.
6. **Análisis IA**: muestra los datos que se enviarían y 3 recomendaciones. **Es una simulación**: las cifras salen de los datos locales con un retraso de 900 ms. No hay IA real conectada.

## Datos de ejemplo
- 12 eventos realizados (junio a septiembre 2026) con ingresos y costos (comida, personal, logística, otros).
- 11 entradas de agenda (septiembre a diciembre 2026).
- 9 facturas. "Hoy" está fijado en `2026-09-28` (`HOY` en `app.js`).

## Accesibilidad y calidad ya cubiertas
Enlace "Saltar al contenido", foco en el `h1` al cambiar de página, `aria-current`, `aria-pressed` en filtros, regiones de tabla enfocables, `aria-live` en calendario e IA, `translate="no"` en nombres propios, estilos responsive (1000/820/560 px).

## Pendiente / siguientes pasos
- **"Añadir página"**: el botón existe en la barra lateral pero **no tiene funcionalidad**.
- **IA real**: reemplazar `analisisDemo()` con una llamada a un modelo (requiere backend o proxy para no exponer la clave).
- **Persistencia**: los datos están fijos en el código. Falta almacenamiento (localStorage o base de datos) y formularios para crear o editar eventos, facturas y platos.
- **Fecha real**: `HOY` está fija; usar la fecha actual cuando haya datos reales. Con la fecha actual (2026-10-05), parte de los "próximos eventos" y facturas ya cambia de estado.
- **Estado de facturas**: es manual; podría calcularse según la fecha de vencimiento (hoy `F-1056` aparece "Pagada" y `F-1057` vence el 6 de octubre).
- **Fuentes**: se cargan desde Google Fonts, por lo que no hay modo offline.
- Las maquetas `preview-*.html` se pueden archivar o borrar. Muestran un título con texto corrupto ("Â·", problema de codificación) y el nombre "6-Figures".
- Revisar con la guía web-interface-guidelines los archivos de UI (regla de tu CLAUDE.md).
- Sin pruebas automáticas ni control de versiones (no es un repo git).
