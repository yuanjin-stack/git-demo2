import { calculateStats, ValidationError } from '../src';

describe('calculateStats', () => {
  test('computes stats for odd length array', () => {
    const stats = calculateStats([3, 1, 2]);
    expect(stats).toEqual({ min: 1, max: 3, avg: 2, median: 2 });
  });

  test('computes stats for even length array', () => {
    const stats = calculateStats([10, 0, 2, 4]);
    expect(stats.min).toBe(0);
    expect(stats.max).toBe(10);
    expect(stats.avg).toBe(4);
    expect(stats.median).toBe(3);
  });

  test('filters non-finite numbers', () => {
    const stats = calculateStats([1, Number.NaN, Number.POSITIVE_INFINITY, 3]);
    expect(stats).toEqual({ min: 1, max: 3, avg: 2, median: 2 });
  });

  test('throws when input has no finite numbers', () => {
    expect(() =>
      calculateStats([Number.NaN, Number.POSITIVE_INFINITY]),
    ).toThrow(ValidationError);
  });

  test('throws when input contains non-number', () => {
    expect(() => calculateStats([1, '2' as unknown as number])).toThrow(
      ValidationError,
    );
  });
});
