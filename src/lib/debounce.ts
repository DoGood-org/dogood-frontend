


function debounce<T extends (...args: any[]) => void>(fn: T, ms = 300): T {
  let timeout: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  }) as T;
}
export default debounce;