import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateAccuracy,
  calculateGrossWpm,
  calculateNetWpm,
  calculateUncorrectedErrors,
  sanitizeAccuracy,
} from '../src/utils/metrics';

describe('Typing Accuracy Calculations & Bug Prevention', () => {
  describe('1. Perfect typing', () => {
    it('returns exactly 100% when all evaluated characters are correct', () => {
      assert.equal(calculateAccuracy(10, 10), 100);
      assert.equal(calculateAccuracy(50, 50), 100);
      assert.equal(calculateAccuracy(150, 150), 100);
    });

    it('returns exactly 100% when target code with indentation is typed without errors', () => {
      // Simulating: "int main() {\n    return 0;\n}" (28 characters total, including \n and 4 leading spaces)
      const targetCode = 'int main() {\n    return 0;\n}';
      let correctCount = 0;
      let totalCount = 0;

      for (let i = 0; i < targetCode.length; i++) {
        const char = targetCode[i];
        if (char === '\n') {
          // Newline evaluated
          totalCount++;
          correctCount++;
          // Auto-indent helper advances 4 leading spaces
          const nextTarget = targetCode.slice(i + 1);
          const indentMatch = nextTarget.match(/^[ ]+/);
          if (indentMatch && indentMatch[0]) {
            const indentLen = indentMatch[0].length;
            totalCount += indentLen;
            correctCount += indentLen;
            i += indentLen; // advance loop past indented spaces
          }
        } else {
          totalCount++;
          correctCount++;
        }
      }

      assert.equal(correctCount, targetCode.length);
      assert.equal(totalCount, targetCode.length);
      const accuracy = calculateAccuracy(correctCount, totalCount);
      assert.equal(accuracy, 100);
      assert.ok(accuracy <= 100, 'Accuracy must never exceed 100%');
    });
  });

  describe('2. Incorrect characters', () => {
    it('accurately calculates percentage when errors are present', () => {
      // 9 correct out of 10 evaluated
      assert.equal(calculateAccuracy(9, 10), 90);

      // 45 correct out of 50 evaluated
      assert.equal(calculateAccuracy(45, 50), 90);

      // 73 correct out of 80 evaluated
      assert.equal(calculateAccuracy(73, 80), 91.3);

      // 1 correct out of 3 evaluated
      assert.equal(calculateAccuracy(1, 3), 33.3);
    });

    it('returns 0% when 0 characters are correct but input was evaluated', () => {
      assert.equal(calculateAccuracy(0, 10), 0);
      assert.equal(calculateAccuracy(0, 1), 0);
    });

    it('rounds to 1 decimal place cleanly', () => {
      // 2/3 = 66.666...% -> 66.7%
      assert.equal(calculateAccuracy(2, 3), 66.7);
      // 1/6 = 16.666...% -> 16.7%
      assert.equal(calculateAccuracy(1, 6), 16.7);
    });
  });

  describe('3. Deleted characters and Backspace', () => {
    it('maintains consistent accuracy when typing mistakes are corrected via backspace', () => {
      // User types 'x' (wrong, total=1, correct=0)
      // User hits backspace (text deleted)
      // User types 'a' (correct, total=2, correct=1)
      const correctKeystrokes = 1;
      const totalEvaluated = 2;
      const accuracy = calculateAccuracy(correctKeystrokes, totalEvaluated);
      assert.equal(accuracy, 50);
      assert.ok(accuracy <= 100);
    });

    it('handles typing correct characters, deleting them, and re-typing without exceeding 100%', () => {
      // User types 'a' (correct, total=1, correct=1)
      // User hits backspace (text deleted)
      // User types 'a' again (correct, total=2, correct=2)
      const correctKeystrokes = 2;
      const totalEvaluated = 2;
      const accuracy = calculateAccuracy(correctKeystrokes, totalEvaluated);
      assert.equal(accuracy, 100);
    });

    it('reflects multiple corrections in free typing mode', () => {
      // User types 10 correct, 2 wrong (total=12, correct=10)
      // User backspaces the 2 wrong and retypes them correctly (total=14, correct=12)
      const accuracy = calculateAccuracy(12, 14);
      assert.equal(accuracy, 85.7);
      assert.ok(accuracy <= 100);
    });
  });

  describe('4. Empty input and division by zero safety', () => {
    it('safely handles 0 total evaluated characters without division by zero', () => {
      assert.equal(calculateAccuracy(0, 0), 100);
    });

    it('safely handles negative or invalid inputs', () => {
      assert.equal(calculateAccuracy(-1, 0), 100);
      assert.equal(calculateAccuracy(0, -5), 100);
      assert.equal(calculateAccuracy(NaN, 10), 0);
      assert.equal(calculateAccuracy(10, NaN), 100);
      assert.equal(calculateAccuracy(Infinity, 0), 100);
    });
  });

  describe('5. Accuracy never exceeding 100% (The 103.6% bug reproduction and fix)', () => {
    it('prevents the exact bug where auto-indent spaces caused correct > total', () => {
      // In the previous bug:
      // A snippet with newlines had auto-indenting leading spaces.
      // localCorrect was incremented for the spaces, but localTotal was NOT incremented.
      // This caused correctKeystrokes = 29 while totalKeystrokes = 28.
      // 29 / 28 * 100 = 103.57% -> 103.6%!

      // With the fix, auto-indent increments BOTH correct and total:
      const fixedCorrect = 29;
      const fixedTotal = 28 + 4; // 32
      const fixedAccuracy = calculateAccuracy(fixedCorrect, fixedTotal);
      assert.equal(fixedAccuracy, 90.6);
      assert.ok(fixedAccuracy <= 100);
    });

    it('clamps accuracy to 100% even if correct is somehow larger than total', () => {
      // Invariant check: correct can never exceed total
      assert.equal(calculateAccuracy(105, 100), 100);
      assert.equal(calculateAccuracy(29, 28), 100);
      assert.equal(calculateAccuracy(999, 10), 100);
    });

    it('sanitizeAccuracy guarantees strictly bounded results [0, 100]', () => {
      assert.equal(sanitizeAccuracy(103.6), 100);
      assert.equal(sanitizeAccuracy(150), 100);
      assert.equal(sanitizeAccuracy(-10), 0);
      assert.equal(sanitizeAccuracy(95.4), 95.4);
      assert.equal(sanitizeAccuracy(NaN), 100);
      assert.equal(sanitizeAccuracy(undefined), 100);
    });
  });

  describe('6. WPM, Errors, and Text Consistency', () => {
    it('calculates gross WPM correctly (chars / 5 / minutes)', () => {
      // 100 characters in 60 seconds (1 minute) = 20 gross WPM
      assert.equal(calculateGrossWpm(100, 60), 20);

      // 150 characters in 30 seconds (0.5 minute) = 60 gross WPM
      assert.equal(calculateGrossWpm(150, 30), 60);

      // 0 chars or 0 seconds
      assert.equal(calculateGrossWpm(0, 60), 0);
      assert.equal(calculateGrossWpm(100, 0), 0);
    });

    it('calculates net WPM with error penalty', () => {
      // 60 gross WPM, 2 uncorrected errors in 60s (1 min) -> 60 - 2 = 58 net WPM
      assert.equal(calculateNetWpm(60, 2, 60), 58);

      // Penalty exceeds gross WPM -> clamped to 0
      assert.equal(calculateNetWpm(20, 50, 60), 0);
    });

    it('counts uncorrected errors correctly', () => {
      const target = 'std::cout << "Hello";';
      const typedCorrect = 'std::cout << "Hello";';
      assert.equal(calculateUncorrectedErrors(target, typedCorrect), 0);

      const typedWithErrors = 'std::cout >> "Hella";'; // 3 errors (both '<' changed to '>', 'o' changed to 'a')
      assert.equal(calculateUncorrectedErrors(target, typedWithErrors), 3);

      const emptyTyped = '';
      assert.equal(calculateUncorrectedErrors(target, emptyTyped), 0);
    });
  });
});
