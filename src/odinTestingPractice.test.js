import { test, expect, describe } from 'vitest';
import * as odinTest from './odinTestingPractice.js';

describe('capitalize', () => {
  test('capitalizes first character', () => {
    expect(odinTest.capitalize('good')).toBe('Good');
  });

  test('already-capitalized stays capitalized', () => {
    expect(odinTest.capitalize('Good')).toBe('Good');
  });

  test('single character', () => {
    expect(odinTest.capitalize('g')).toBe('G');
  });

  test('empty string returns empty string', () => {
    expect(odinTest.capitalize('')).toBe('');
  });

  test('non-letter first char left as-is (implementation-dependent)', () => {
    expect(odinTest.capitalize('1abc')).toBe('1abc');
  });
});

describe('reverseString', () => {
  test.each([
    ['abc', 'cba'],
    ['a', 'a'],
    ['', ''],
    ['Hello, 世界!', '!界世 ,olleH'],
  ])('reverses "%s" → "%s"', (input, output) => {
    expect(odinTest.reverseString(input)).toBe(output);
  });
});

describe('calculator', () => {
  test('add', () => {
    expect(odinTest.calculator.add(1, 2)).toBe(3);
  });

  test('subtract', () => {
    expect(odinTest.calculator.subtract(2, 1)).toBe(1);
  });

  test('multiply', () => {
    expect(odinTest.calculator.multiply(9, 2)).toBe(18);
  });

  describe('divide (floors to 1 decimal place per current implementation)', () => {
    test('10 / 3 → 3.3', () => {
      expect(odinTest.calculator.divide(10, 3)).toBe(3.3);
    });

    test('handles negative result flooring toward -Infinity', () => {
      expect(odinTest.calculator.divide(-10, 3)).toBe(-3.4);
    });

    test('small decimals with precision', () => {
      expect(odinTest.calculator.divide(1, 8)).toBe(0.1);
    });

    test.skip('division by zero (document behavior)', () => {
      expect(odinTest.calculator.divide(1, 0)).toBe(-Infinity); // 其實是 Math.floor(Infinity*10)/10 → -Infinity? 視 JS 行為
      // 小提醒：建議在實作中顯性處理 0 分母（throw 或回傳特定值），再調整這個測試。
    });
  });
});

describe('caesarCipher', () => {
  test('basic shift preserves case', () => {
    expect(odinTest.caesarCipher('HeLLo', 3)).toBe('KhOOr');
  });

  test('wraps z → a', () => {
    expect(odinTest.caesarCipher('xyz', 3)).toBe('abc');
    expect(odinTest.caesarCipher('XYZ', 3)).toBe('ABC');
  });

  test('punctuation and spaces unchanged', () => {
    expect(odinTest.caesarCipher('Hello, World!', 3)).toBe('Khoor, Zruog!');
  });

  test('large shift (>26) behaves like mod 26', () => {
    expect(odinTest.caesarCipher('abc', 29)).toBe('def');
  });

  test('zero shift returns original string', () => {
    expect(odinTest.caesarCipher('Stay', 0)).toBe('Stay');
  });

  test('returns false for non-integer shift (per your current API)', () => {
    expect(odinTest.caesarCipher('abc', 1.5)).toBe(false);
    expect(odinTest.caesarCipher('abc', NaN)).toBe(false);
  });

  test('negative shift: decide policy', () => {
    expect(odinTest.caesarCipher('def', -3)).toBe(false);
  });

  test('string length preserved', () => {
    const input = 'Abc! Z';
    const output = odinTest.caesarCipher(input, 5);
    expect(output.length).toBe(input.length);
  });
});

describe('analyzeArray', () => {
  test('basic example', () => {
    expect(odinTest.analyzeArray([1, 8, 3, 4, 2, 6])).toStrictEqual({
      average: 4,
      min: 1,
      max: 8,
      length: 6,
    });
  });

  test('handles negatives and floats', () => {
    const result = odinTest.analyzeArray([-2, 0.5, 7.5, -1.5]);
    expect(result.length).toBe(4);
    expect(result.min).toBe(-2);
    expect(result.max).toBe(7.5);
    expect(result.average).toBeCloseTo((-2 + 0.5 + 7.5 + -1.5) / 4, 3);
  });

  test('does not mutate the original array', () => {
    const input = [3, 2, 1];
    const copy = [...input];
    odinTest.analyzeArray(input);
    expect(input).toStrictEqual(copy);
  });

  // 如果日後決定：空陣列要 throw
  // 在實作裡加上檢查，並啟用這個測試
  test.skip('empty array should throw (if you choose to enforce)', () => {
    expect(() => odinTest.analyzeArray([])).toThrow();
  });
});
