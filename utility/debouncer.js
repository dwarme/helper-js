/**
 * @author Daouda Warme
 *
 * Debounces a function, ensuring that it is only called after a specified wait time has elapsed
 * since the last time it was invoked. This is useful for limiting the rate at which a function
 * can be triggered, such as when handling events like window resizing or keypresses.
 *
 * @param {Function} fn - The function to debounce.
 * @param {number} wait - The time to wait (in milliseconds) before calling the function after the last invocation.
 * @returns {Function} A debounced version of the input function that delays its execution until after the wait time.
 */
export default function debounce(fn, wait) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}
