const timerInput = (delay) => {
  const input = document.querySelector("input");
  const paragraph = document.querySelector("p");

  const debounce = (func, ms) => {
    let timeout;

    return function () {
      const context = this;
      const args = arguments;

      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), ms);
    };
  };

  const symbolDisplay = (str) => {
    paragraph.textContent = str;
  };

  const debounceSymbolDisplay = debounce(symbolDisplay, delay);

  input.addEventListener("input", (e) => {
    debounceSymbolDisplay(e.target.value);
  });
};
module.exports = timerInput;
