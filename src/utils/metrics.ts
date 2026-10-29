/**
 * Typing metrics and accuracy calculations.
 *
 * Accuracy Formula:
 *   accuracy = (correct characters / total evaluated characters) * 100
 *
 * Rules:
 * - Empty input (total <= 0): safely returns 100% without division by zero.
 * - Correct characters can never exceed total evaluated characters.
 * - Result is rounded to 1 decimal place.
 * - Final safeguard clamps the result to [0, 100].
 */

/**
 * Calculates typing accuracy percentage from evaluated characters.
 *
 * @param correct Number of correct character evaluations
 * @param total Total number of evaluated characters (correct + errors)
 * @returns Accuracy percentage rounded to 1 decimal place, constrained to [0, 100]
 */
export function calculateAccuracy(correct: number, total: number): number {
  // Safe handling of empty or non-finite inputs
  if (!Number.isFinite(total) || total <= 0) {
    return 100;
  }

  if (!Number.isFinite(correct) || correct <= 0) {
    return 0;
  }

  // Invariant: correct characters can never exceed total evaluated characters
  const safeCorrect = Math.min(correct, total);

  const rawPercentage = (safeCorrect / total) * 100;
  const rounded = Math.round(rawPercentage * 10) / 10;

  // Safeguard clamp
  return Math.min(100, Math.max(0, rounded));
}

/**
 * Calculates Gross Words Per Minute (standard 5 characters = 1 word).
 *
 * @param charsTyped Total characters typed in the editor
 * @param durationSeconds Duration of the practice session in seconds
 */
export function calculateGrossWpm(charsTyped: number, durationSeconds: number): number {
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0 || !Number.isFinite(charsTyped) || charsTyped <= 0) {
    return 0;
  }
  const minutes = durationSeconds / 60;
  return Math.round(charsTyped / 5 / minutes);
}

/**
 * Calculates Net Words Per Minute with error penalty.
 *
 * @param grossWpm Gross WPM
 * @param uncorrectedErrors Count of uncorrected errors in the final text
 * @param durationSeconds Duration of the practice session in seconds
 */
export function calculateNetWpm(
  grossWpm: number,
  uncorrectedErrors: number,
  durationSeconds: number
): number {
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    return 0;
  }
  const safeGross = Math.max(0, grossWpm || 0);
  const safeErrors = Math.max(0, uncorrectedErrors || 0);
  const minutes = durationSeconds / 60;
  const penalty = safeErrors / minutes;
  return Math.max(0, Math.round(safeGross - penalty));
}

/**
 * Counts uncorrected character mismatches between typed text and target code.
 *
 * @param targetCode The expected target code string
 * @param typedText The text typed so far by the user
 */
export function calculateUncorrectedErrors(targetCode: string, typedText: string): number {
  const len = typedText.length;
  let errors = 0;
  for (let i = 0; i < len; i++) {
    if (typedText[i] !== targetCode[i]) {
      errors++;
    }
  }
  return errors;
}

/**
 * Sanitizes any stored accuracy value so it is strictly within [0, 100].
 */
export function sanitizeAccuracy(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 100;
  }
  const rounded = Math.round(value * 10) / 10;
  return Math.min(100, Math.max(0, rounded));
}
