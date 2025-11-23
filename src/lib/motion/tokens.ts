export const DURATION = {
    FAST: 0.3,
    MEDIUM: 0.5,
    SLOW: 0.8,
    VERY_SLOW: 1.2,
};

export const EASE = {
    STANDARD: [0.4, 0.0, 0.2, 1] as const,
    ENTRANCE: [0.0, 0.0, 0.2, 1] as const,
    EXIT: [0.4, 0.0, 1, 1] as const,
    BOUNCE: [0.34, 1.56, 0.64, 1] as const,
};

export const REVEAL = {
    DISTANCE: 20,
    SCALE: 0.95,
};

export const PARALLAX = {
    SLOW: 0.1,
    MEDIUM: 0.2,
    FAST: 0.3,
};
