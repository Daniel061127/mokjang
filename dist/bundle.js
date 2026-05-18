"use strict";
(() => {
  // src/components/Button.ts
  var Button = class {
    constructor(label, onClickCallback) {
      this.label = label;
      this.onClickCallback = onClickCallback;
    }
    render() {
      const button2 = document.createElement("button");
      button2.innerText = this.label;
      button2.addEventListener("click", this.onClick.bind(this));
      return button2;
    }
    onClick() {
      this.onClickCallback();
    }
  };

  // src/components/DevotionalDisplay.ts
  var DevotionalDisplay = class {
    constructor() {
      this.displayElement = document.createElement("div");
      this.displayElement.className = "devotional-display";
    }
    render() {
      return this.displayElement;
    }
    update(devotional) {
      const today = /* @__PURE__ */ new Date();
      const dateString = today.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
      });
      this.displayElement.innerHTML = `
            <div class="scripture">
                <div class="scripture-reference">${devotional.reference}</div>
                <div class="scripture-text">"${devotional.text}"</div>
                <div class="date">${dateString}</div>
            </div>
        `;
    }
  };

  // src/services/devotionalService.ts
  var getRandomDevotional = async () => {
    const response = await fetch("./assets/verses.json");
    const raw = await response.text();
    const lines = raw.split("\n").filter((line) => line.trim().length > 0);
    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    const match = randomLine.match(/^(\S+)\s+(?:<[^>]+>\s+)?(.+)$/);
    if (!match) return { reference: "", text: randomLine };
    return { reference: match[1], text: match[2] };
  };

  // src/main.ts
  var app = document.getElementById("app");
  var container = document.createElement("div");
  container.className = "container";
  var header = document.createElement("div");
  header.className = "header";
  header.innerHTML = "<h1>\uC624\uB298\uC758 \uB9D0\uC500</h1><p>\uC624\uB298\uB3C4 \uD558\uB098\uB2D8\uC758 \uB9D0\uC500\uC73C\uB85C \uC0B4\uC544\uAC00\uB294 \uBE61\uB2E4\uBC29 \uBAA9\uC7A5</p>";
  var button = new Button("\uC624\uB298\uC758 \uB9D0\uC500 \uBCF4\uAE30", handleButtonClick);
  var devotionalDisplay = new DevotionalDisplay();
  async function handleButtonClick() {
    try {
      const todaysDevotional = await getRandomDevotional();
      devotionalDisplay.update(todaysDevotional);
    } catch (error) {
      console.error("\uB9D0\uC500\uC744 \uBD88\uB7EC\uC624\uB294 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4:", error);
    }
  }
  function init() {
    container.appendChild(header);
    container.appendChild(button.render());
    container.appendChild(devotionalDisplay.render());
    app.appendChild(container);
    handleButtonClick();
  }
  init();
})();
