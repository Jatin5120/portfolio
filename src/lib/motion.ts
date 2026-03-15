// Shared easing curves — import these instead of defining locally.
//
// EASE_OUT_EXPO: aggressive deceleration, used for hero entrance and interactive responses.
// EASE_OUT: standard material-design-style ease-out, used for page load animations.
// EASE_IN: standard ease-in for exit animations.

export type EasingTuple = [number, number, number, number]

/** Expo ease-out — aggressive start, smooth landing. Hero, navbar, interactive responses. */
export const EASE_OUT_EXPO: EasingTuple = [0.16, 1, 0.3, 1]

/** Standard ease-out — sustained motion, graceful landing. Section reveals, page load. */
export const EASE_OUT: EasingTuple = [0.4, 0, 0.2, 1]

/** Standard ease-in — accelerating exit. Used for exit animations. */
export const EASE_IN: EasingTuple = [0.4, 0, 1, 1]
