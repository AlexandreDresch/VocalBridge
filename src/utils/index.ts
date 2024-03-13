/**
 * Creates a debounced function that delays invoking the provided function until after `delay` milliseconds have elapsed since the last time it was invoked.
 * @param func The function to debounce.
 * @param delay The number of milliseconds to delay.
 * @returns A debounced function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  /**
   * Returns a function that, when invoked, clears the existing timeout (if any) and sets a new timeout to invoke the original function after `delay` milliseconds.
   * @param args Arguments to be passed to the debounced function.
   */
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => func(...args), delay);
  };
}
