import { ValidationError } from './errors';

export type Stats = {
  min: number;
  max: number;
  avg: number;
  median: number;
};

export function calculateStats(values: readonly number[]): Stats {
  const normalized = normalizeFiniteNumbers(values);
  if (normalized.length === 0) {
    throw new ValidationError('values must contain at least one finite number');
  }

  const sorted = [...normalized].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  const sum = sorted.reduce((acc, n) => acc + n, 0);
  const avg = sum / sorted.length;

  const median = calculateMedianFromSorted(sorted);

  return { min, max, avg, median };
}

function normalizeFiniteNumbers(values: readonly number[]): number[] {
  if (!Array.isArray(values)) {
    throw new ValidationError('values must be an array of numbers');
  }

  const out: number[] = [];
  for (const value of values) {
    if (typeof value !== 'number') {
      throw new ValidationError('values must be an array of numbers');
    }
    if (Number.isFinite(value)) {
      out.push(value);
    }
  }
  return out;
}

function calculateMedianFromSorted(sorted: readonly number[]): number {
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) {
    return sorted[mid];
  }
  return (sorted[mid - 1] + sorted[mid]) / 2;
}
