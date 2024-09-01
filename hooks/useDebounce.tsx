export function useDebounce(cb, delay = 500) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb(...args), delay);
  };
}
