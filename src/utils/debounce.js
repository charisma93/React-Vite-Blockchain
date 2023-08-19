export const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
        const context = this;
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    }
}