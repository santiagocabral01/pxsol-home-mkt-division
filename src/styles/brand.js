/*
 * Constantes de marca PXSOL — fuente única de verdad para valores que
 * no pueden expresarse como tokens CSS (ej: gradientes en style inline).
 *
 * Regla: los tokens del sistema (@theme en index.css) tienen prioridad.
 * Usá estas constantes solo cuando un token CSS no sea suficiente
 * (ej: gradientes en atributo `style`, SVG fills, etc.).
 */

/** Gradiente de identidad de marca: CTA primario, avatares de IA, barras de progreso.
 *  Los dos pasos usan --color-brand (#D20A11) y --color-brand-hover (#B3090F) — rojo web comercial PXSOL. */
export const BRAND_GRADIENT = 'linear-gradient(135deg, #D20A11 0%, #B3090F 100%)'

/** Variante horizontal — para barras de progreso y timelines. */
export const BRAND_GRADIENT_H = 'linear-gradient(90deg, #D20A11 0%, #B3090F 100%)'
