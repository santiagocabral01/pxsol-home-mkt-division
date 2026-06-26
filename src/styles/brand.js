/*
 * Constantes de marca PXSOL — fuente única de verdad para valores que
 * no pueden expresarse como tokens CSS (ej: gradientes en style inline).
 *
 * Regla: los tokens del sistema (@theme en index.css) tienen prioridad.
 * Usá estas constantes solo cuando un token CSS no sea suficiente
 * (ej: gradientes en atributo `style`, SVG fills, etc.).
 */

/** Gradiente de identidad de marca: CTA primario, avatares de IA, barras de progreso.
 *  Los dos pasos usan --color-brand (#e84a2c) y --color-brand-hover (#d03d21). */
export const BRAND_GRADIENT = 'linear-gradient(135deg, #e84a2c 0%, #d03d21 100%)'

/** Variante horizontal — para barras de progreso y timelines. */
export const BRAND_GRADIENT_H = 'linear-gradient(90deg, #e84a2c 0%, #d03d21 100%)'
