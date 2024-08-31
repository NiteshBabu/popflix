export function useDebounce(cb, delay = 300) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb(...args), delay);
  };
}
