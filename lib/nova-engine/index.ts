// N.O.V.A. engine, v0.
//
// A single deterministic core that the demo blocks compute from, so the demo
// is the system actually running rather than a mock. This module is also the
// seed of the real reference implementation: it mirrors the spec corpus
// (_Build/specs) and keeps every tunable constant in config.ts.
//
// Implemented so far: Experience Weight (empathy equation) and the Trust
// score/tier/gate helpers. Conflict, Friction, ELI, BBI, Anchors/CIS, and the
// Tone cascade follow as the matching blocks are built.

export * from './types';
export * from './config';
export * from './experienceWeight';
export * from './trust';
export * from './governors';
export * from './tone';
export * from './anchor';
export * from './arbitration';
