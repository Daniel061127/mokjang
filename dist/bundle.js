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
    update(chapter) {
      const versesHTML = chapter.verses.map((v) => `<div class="verse"><span class="verse-number">${v.number}</span>${v.text}</div>`).join("");
      this.displayElement.innerHTML = `
            <div class="chapter-title">${chapter.title}</div>
            <div class="verses-scroll">${versesHTML}</div>
        `;
    }
  };

  // src/services/devotionalService.ts
  var BOOK_NAMES = {
    "\uCC3D": "\uCC3D\uC138\uAE30",
    "\uCD9C": "\uCD9C\uC560\uAD7D\uAE30",
    "\uB808": "\uB808\uC704\uAE30",
    "\uBBFC": "\uBBFC\uC218\uAE30",
    "\uC2E0": "\uC2E0\uBA85\uAE30",
    "\uC218": "\uC5EC\uD638\uC218\uC544",
    "\uC0BF": "\uC0AC\uC0AC\uAE30",
    "\uB8FB": "\uB8FB\uAE30",
    "\uC0BC\uC0C1": "\uC0AC\uBB34\uC5D8\uC0C1",
    "\uC0BC\uD558": "\uC0AC\uBB34\uC5D8\uD558",
    "\uC655\uC0C1": "\uC5F4\uC655\uAE30\uC0C1",
    "\uC655\uD558": "\uC5F4\uC655\uAE30\uD558",
    "\uB300\uC0C1": "\uC5ED\uB300\uC0C1",
    "\uB300\uD558": "\uC5ED\uB300\uD558",
    "\uC2A4": "\uC5D0\uC2A4\uB77C",
    "\uB290": "\uB290\uD5E4\uBBF8\uC57C",
    "\uC5D0": "\uC5D0\uC2A4\uB354",
    "\uC6A5": "\uC6A5\uAE30",
    "\uC2DC": "\uC2DC\uD3B8",
    "\uC7A0": "\uC7A0\uC5B8",
    "\uC804": "\uC804\uB3C4\uC11C",
    "\uC544": "\uC544\uAC00",
    "\uC0AC": "\uC774\uC0AC\uC57C",
    "\uB818": "\uC608\uB808\uBBF8\uC57C",
    "\uC560": "\uC608\uB808\uBBF8\uC57C\uC560\uAC00",
    "\uAC94": "\uC5D0\uC2A4\uAC94",
    "\uB2E8": "\uB2E4\uB2C8\uC5D8",
    "\uD638": "\uD638\uC138\uC544",
    "\uC69C": "\uC694\uC5D8",
    "\uC554": "\uC544\uBAA8\uC2A4",
    "\uC635": "\uC624\uBC14\uB31C",
    "\uC698": "\uC694\uB098",
    "\uBBF8": "\uBBF8\uAC00",
    "\uB098": "\uB098\uD6D4",
    "\uD569": "\uD558\uBC15\uAD6D",
    "\uC2B5": "\uC2A4\uBC14\uB0D0",
    "\uD559": "\uD559\uAC1C",
    "\uC2A5": "\uC2A4\uAC00\uB7B4",
    "\uB9D0": "\uB9D0\uB77C\uAE30",
    "\uB9C8": "\uB9C8\uD0DC\uBCF5\uC74C",
    "\uB9C9": "\uB9C8\uAC00\uBCF5\uC74C",
    "\uB205": "\uB204\uAC00\uBCF5\uC74C",
    "\uC694": "\uC694\uD55C\uBCF5\uC74C",
    "\uD589": "\uC0AC\uB3C4\uD589\uC804",
    "\uB86C": "\uB85C\uB9C8\uC11C",
    "\uACE0\uC804": "\uACE0\uB9B0\uB3C4\uC804\uC11C",
    "\uACE0\uD6C4": "\uACE0\uB9B0\uB3C4\uD6C4\uC11C",
    "\uAC08": "\uAC08\uB77C\uB514\uC544\uC11C",
    "\uC5E1": "\uC5D0\uBCA0\uC18C\uC11C",
    "\uBE4C": "\uBE4C\uB9BD\uBCF4\uC11C",
    "\uACE8": "\uACE8\uB85C\uC0C8\uC11C",
    "\uC0B4\uC804": "\uB370\uC0B4\uB85C\uB2C8\uAC00\uC804\uC11C",
    "\uC0B4\uD6C4": "\uB370\uC0B4\uB85C\uB2C8\uAC00\uD6C4\uC11C",
    "\uB524\uC804": "\uB514\uBAA8\uB370\uC804\uC11C",
    "\uB524\uD6C4": "\uB514\uBAA8\uB370\uD6C4\uC11C",
    "\uB51B": "\uB514\uB3C4\uC11C",
    "\uBAAC": "\uBE4C\uB808\uBAAC\uC11C",
    "\uD788": "\uD788\uBE0C\uB9AC\uC11C",
    "\uC57D": "\uC57C\uACE0\uBCF4\uC11C",
    "\uBCA7\uC804": "\uBCA0\uB4DC\uB85C\uC804\uC11C",
    "\uBCA7\uD6C4": "\uBCA0\uB4DC\uB85C\uD6C4\uC11C",
    "\uC694\uC77C": "\uC694\uD55C\uC77C\uC11C",
    "\uC694\uC774": "\uC694\uD55C\uC774\uC11C",
    "\uC694\uC0BC": "\uC694\uD55C\uC0BC\uC11C",
    "\uC720": "\uC720\uB2E4\uC11C",
    "\uACC4": "\uC694\uD55C\uACC4\uC2DC\uB85D"
  };
  var cachedChapters = null;
  async function getChapters() {
    if (cachedChapters) return cachedChapters;
    const response = await fetch("./assets/verses.json");
    const raw = await response.text();
    const lines = raw.split("\n").filter((line) => line.trim().length > 0);
    const chapters = {};
    for (const line of lines) {
      const match = line.match(/^([가-힣]+\d+):(\d+)\s+(?:<[^>]+>\s+)?(.+)$/);
      if (!match) continue;
      const chapterKey = match[1];
      const verseNum = match[2];
      const text = match[3];
      if (!chapters[chapterKey]) chapters[chapterKey] = [];
      chapters[chapterKey].push({ number: verseNum, text });
    }
    cachedChapters = chapters;
    return chapters;
  }
  var getRandomChapter = async () => {
    const chapters = await getChapters();
    const keys = Object.keys(chapters);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const keyMatch = randomKey.match(/^([가-힣]+)(\d+)$/);
    const bookAbbr = keyMatch ? keyMatch[1] : randomKey;
    const chapterNum = keyMatch ? keyMatch[2] : "";
    const bookName = BOOK_NAMES[bookAbbr] || bookAbbr;
    return {
      title: `${bookName} ${chapterNum}\uC7A5`,
      verses: chapters[randomKey]
    };
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
      const chapter = await getRandomChapter();
      devotionalDisplay.update(chapter);
    } catch (error) {
      console.error("\uB9D0\uC500\uC744 \uBD88\uB7EC\uC624\uB294 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4:", error);
    }
  }
  function init() {
    container.appendChild(header);
    container.appendChild(button.render());
    container.appendChild(devotionalDisplay.render());
    app.appendChild(container);
  }
  init();
})();
