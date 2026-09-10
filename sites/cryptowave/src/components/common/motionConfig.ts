/**
 * The project's shared "signature" easing curve - a slight overshoot
 * (the second value is >1) so elements settle into place with a soft
 * spring-like ease rather than a flat stop. Used consistently across all
 * entrance animations so they read as one coherent motion language.
 */
export const SIGNATURE_EASE = [0.21, 1.02, 0.43, 1.01] as const;
