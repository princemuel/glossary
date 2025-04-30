export function* range(start: number, end?: number, step = 1) {
  // Create new variables to avoid reassigning parameters.
  let actualStart = start;
  let actualEnd = end;

  // If only `start` is provided, assume it as `end` with `start` defaulting to 1.
  if (actualEnd === undefined) {
    actualEnd = actualStart;
    actualStart = 1;
  }

  // Validate input types.
  if (
    typeof actualStart !== "number" ||
    typeof actualEnd !== "number" ||
    typeof step !== "number"
  ) {
    throw new TypeError("All arguments must be numbers.");
  }

  // Step should not be zero to avoid infinite loops.
  if (step === 0) throw new Error("Step cannot be zero.");

  // Early return if range parameters are logically impossible.
  if (
    (step > 0 && actualStart > actualEnd) ||
    (step < 0 && actualStart < actualEnd)
  ) {
    return;
  }

  // Generate numbers in the range.
  for (
    let idx = actualStart;
    step > 0 ? idx <= actualEnd : idx >= actualEnd;
    idx += step
  ) {
    yield idx;
  }
}
