"use strict";
(() => {
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
  var BOOK_ORDER = [
    "\uCC3D",
    "\uCD9C",
    "\uB808",
    "\uBBFC",
    "\uC2E0",
    "\uC218",
    "\uC0BF",
    "\uB8FB",
    "\uC0BC\uC0C1",
    "\uC0BC\uD558",
    "\uC655\uC0C1",
    "\uC655\uD558",
    "\uB300\uC0C1",
    "\uB300\uD558",
    "\uC2A4",
    "\uB290",
    "\uC5D0",
    "\uC6A5",
    "\uC2DC",
    "\uC7A0",
    "\uC804",
    "\uC544",
    "\uC0AC",
    "\uB818",
    "\uC560",
    "\uAC94",
    "\uB2E8",
    "\uD638",
    "\uC69C",
    "\uC554",
    "\uC635",
    "\uC698",
    "\uBBF8",
    "\uB098",
    "\uD569",
    "\uC2B5",
    "\uD559",
    "\uC2A5",
    "\uB9D0",
    "\uB9C8",
    "\uB9C9",
    "\uB205",
    "\uC694",
    "\uD589",
    "\uB86C",
    "\uACE0\uC804",
    "\uACE0\uD6C4",
    "\uAC08",
    "\uC5E1",
    "\uBE4C",
    "\uACE8",
    "\uC0B4\uC804",
    "\uC0B4\uD6C4",
    "\uB524\uC804",
    "\uB524\uD6C4",
    "\uB51B",
    "\uBAAC",
    "\uD788",
    "\uC57D",
    "\uBCA7\uC804",
    "\uBCA7\uD6C4",
    "\uC694\uC77C",
    "\uC694\uC774",
    "\uC694\uC0BC",
    "\uC720",
    "\uACC4"
  ];
  var cachedChapters = null;
  var cachedBookList = null;
  async function getChapters() {
    if (cachedChapters) return cachedChapters;
    const response = await fetch("./assets/verses.json");
    const raw = await response.text();
    const lines = raw.split("\n").filter((line) => line.trim().length > 0);
    const chapters = {};
    for (const line of lines) {
      const match = line.match(/^([가-힣]+\d+):(\d+)(?:-\d+)?\s+(?:<[^>]+>\s+)?(.+)$/);
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
  function buildChapter(key, chapters) {
    const keyMatch = key.match(/^([가-힣]+)(\d+)$/);
    const bookAbbr = keyMatch ? keyMatch[1] : key;
    const chapterNum = keyMatch ? keyMatch[2] : "";
    const bookName = BOOK_NAMES[bookAbbr] || bookAbbr;
    return { title: `${bookName} ${chapterNum}\uC7A5`, verses: chapters[key] || [] };
  }
  var getRandomChapterKey = async () => {
    const chapters = await getChapters();
    const keys = Object.keys(chapters);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const match = randomKey.match(/^([가-힣]+)(\d+)$/);
    return {
      bookAbbr: match ? match[1] : randomKey,
      chapterNum: match ? parseInt(match[2]) : 1
    };
  };
  var getBookList = async () => {
    if (cachedBookList) return cachedBookList;
    const chapters = await getChapters();
    const bookChapterCounts = {};
    for (const key of Object.keys(chapters)) {
      const match = key.match(/^([가-힣]+)(\d+)$/);
      if (!match) continue;
      const abbr = match[1];
      const num = parseInt(match[2]);
      if (!bookChapterCounts[abbr] || bookChapterCounts[abbr] < num) {
        bookChapterCounts[abbr] = num;
      }
    }
    cachedBookList = BOOK_ORDER.filter((abbr) => bookChapterCounts[abbr]).map((abbr) => ({
      abbr,
      name: BOOK_NAMES[abbr] || abbr,
      chapterCount: bookChapterCounts[abbr]
    }));
    return cachedBookList;
  };
  var getChapterByBookAndNum = async (bookAbbr, chapterNum) => {
    const chapters = await getChapters();
    const key = `${bookAbbr}${chapterNum}`;
    return buildChapter(key, chapters);
  };

  // src/main.ts
  var app = document.getElementById("app");
  var audio = new Audio("./assets/praise.mp3");
  var firstPlayDone = false;
  async function startMusic() {
    audio.volume = 1;
    if (!audio.duration || !isFinite(audio.duration)) {
      await new Promise((resolve) => {
        if (audio.readyState >= 1) resolve();
        else audio.addEventListener("loadedmetadata", () => resolve(), { once: true });
      });
    }
    if (!firstPlayDone) {
      firstPlayDone = true;
      audio.currentTime = Math.random() * audio.duration;
    }
    try {
      await audio.play();
    } catch {
    }
  }
  function stopMusic() {
    audio.pause();
  }
  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    audio.volume = 1;
    audio.play().catch(() => {
    });
  });
  var musicWrapper = document.createElement("div");
  musicWrapper.className = "music-wrapper";
  var musicPanel = document.createElement("div");
  musicPanel.className = "music-panel hidden";
  var topRow = document.createElement("div");
  topRow.className = "music-top-row";
  topRow.innerHTML = `
    <div class="music-info">
        <div class="music-playlist">\u{1D46A}\u{1D46A}\u{1D474} \u{1D477}\u{1D48A}\u{1D482}\u{1D48F}\u{1D490} \u{1D477}\u{1D48D}\u{1D482}\u{1D49A}\u{1D48D}\u{1D48A}\u{1D494}\u{1D495}</div>
        <div class="music-song">\uC5EC\uD638\uC640\uAED8\uC11C \uB108\uC758 \uAC78\uC74C\uC744 \uC815\uD558\uC2DC\uACE0</div>
    </div>
`;
  var playPauseBtn = document.createElement("button");
  playPauseBtn.className = "play-pause-btn";
  playPauseBtn.textContent = "\u25B6";
  topRow.appendChild(playPauseBtn);
  musicPanel.appendChild(topRow);
  var seekRow = document.createElement("div");
  seekRow.className = "music-seek-row";
  var currentTimeEl = document.createElement("span");
  currentTimeEl.className = "music-time";
  currentTimeEl.textContent = "0:00";
  var seekBar = document.createElement("input");
  seekBar.type = "range";
  seekBar.className = "music-seek-bar";
  seekBar.min = "0";
  seekBar.max = "100";
  seekBar.value = "0";
  seekBar.step = "0.1";
  var totalTimeEl = document.createElement("span");
  totalTimeEl.className = "music-time";
  totalTimeEl.textContent = "--:--";
  seekRow.appendChild(currentTimeEl);
  seekRow.appendChild(seekBar);
  seekRow.appendChild(totalTimeEl);
  musicPanel.appendChild(seekRow);
  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }
  audio.addEventListener("loadedmetadata", () => {
    seekBar.max = String(audio.duration);
    totalTimeEl.textContent = formatTime(audio.duration);
  });
  var isSeeking = false;
  audio.addEventListener("timeupdate", () => {
    if (isSeeking) return;
    seekBar.value = String(audio.currentTime);
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });
  seekBar.addEventListener("mousedown", () => {
    isSeeking = true;
  });
  seekBar.addEventListener("touchstart", () => {
    isSeeking = true;
  }, { passive: true });
  seekBar.addEventListener("input", () => {
    currentTimeEl.textContent = formatTime(parseFloat(seekBar.value));
  });
  seekBar.addEventListener("change", () => {
    audio.currentTime = parseFloat(seekBar.value);
    isSeeking = false;
  });
  playPauseBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    if (audio.paused) {
      playPauseBtn.textContent = "\u23F8";
      await startMusic();
    } else {
      playPauseBtn.textContent = "\u25B6";
      await stopMusic();
    }
  });
  var musicToggleBtn = document.createElement("button");
  musicToggleBtn.className = "music-toggle-btn";
  musicToggleBtn.textContent = "\u{1F3B5}";
  audio.addEventListener("play", () => {
    playPauseBtn.textContent = "\u23F8";
    musicToggleBtn.textContent = "\u{1F50A}";
  });
  audio.addEventListener("pause", () => {
    playPauseBtn.textContent = "\u25B6";
    musicToggleBtn.textContent = "\u{1F3B5}";
  });
  musicWrapper.appendChild(musicPanel);
  musicWrapper.appendChild(musicToggleBtn);
  document.body.appendChild(musicWrapper);
  var didDrag = false;
  function setWrapperPos(x, y) {
    const w = musicWrapper.offsetWidth || 60;
    const h = musicWrapper.offsetHeight || 60;
    x = Math.max(0, Math.min(window.innerWidth - w, x));
    y = Math.max(0, Math.min(window.innerHeight - h, y));
    musicWrapper.style.left = x + "px";
    musicWrapper.style.top = y + "px";
    musicWrapper.style.right = "auto";
    musicWrapper.style.bottom = "auto";
  }
  (function loadSavedPos() {
    const saved = localStorage.getItem("musicPos");
    if (!saved) return;
    try {
      const { x, y } = JSON.parse(saved);
      requestAnimationFrame(() => setWrapperPos(x, y));
    } catch {
    }
  })();
  musicToggleBtn.addEventListener("mousedown", startDrag);
  musicToggleBtn.addEventListener("touchstart", startDrag, { passive: true });
  function startDrag(e) {
    didDrag = false;
    const pt = "touches" in e ? e.touches[0] : e;
    const startX = pt.clientX;
    const startY = pt.clientY;
    const rect = musicWrapper.getBoundingClientRect();
    const originX = rect.left;
    const originY = rect.top;
    function onMove(e2) {
      const pt2 = "touches" in e2 ? e2.touches[0] : e2;
      const dx = pt2.clientX - startX;
      const dy = pt2.clientY - startY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        didDrag = true;
      }
      if (didDrag) {
        e2.preventDefault();
        setWrapperPos(originX + dx, originY + dy);
      }
    }
    function onEnd() {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchend", onEnd);
      if (didDrag) {
        const r = musicWrapper.getBoundingClientRect();
        localStorage.setItem("musicPos", JSON.stringify({ x: r.left, y: r.top }));
      }
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchend", onEnd);
  }
  musicToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (didDrag) {
      didDrag = false;
      return;
    }
    musicPanel.classList.toggle("hidden");
  });
  function renderChapterInElement(el, chapter) {
    const versesHTML = chapter.verses.map((v) => `<div class="verse"><span class="verse-number">${v.number}</span>${v.text}</div>`).join("");
    el.innerHTML = `
        <div class="chapter-title">${chapter.title}</div>
        <div class="verses-scroll">${versesHTML}</div>
    `;
  }
  function renderHome() {
    document.body.classList.remove("reader-mode");
    app.innerHTML = "";
    const container = document.createElement("div");
    container.className = "container";
    const header = document.createElement("div");
    header.className = "header";
    header.innerHTML = `
        <h1>\uC624\uB298\uC758 \uB9D0\uC500</h1>
        <p>\uC624\uB298\uB3C4 \uD558\uB098\uB2D8\uC758 \uB9D0\uC500\uC73C\uB85C \uC0B4\uC544\uAC00\uB294 \uBE61\uB2E4\uBC29 \uBAA9\uC7A5</p>
    `;
    container.appendChild(header);
    const cards = document.createElement("div");
    cards.className = "home-cards";
    const bibleCard = document.createElement("div");
    bibleCard.className = "home-card";
    bibleCard.innerHTML = `
        <div class="card-icon">\u{1F4D6}</div>
        <div class="card-title">\uC131\uACBD</div>
        <div class="card-desc">\uCC3D\uC138\uAE30 ~ \uC694\uD55C\uACC4\uC2DC\uB85D</div>
    `;
    const bibleBtn = document.createElement("button");
    bibleBtn.className = "card-btn";
    bibleBtn.textContent = "\uC77D\uC73C\uB7EC \uAC00\uAE30";
    bibleBtn.onclick = () => renderBibleReader();
    bibleCard.appendChild(bibleBtn);
    cards.appendChild(bibleCard);
    const randomCard = document.createElement("div");
    randomCard.className = "home-card";
    randomCard.innerHTML = `
        <div class="card-icon">\u{1F3B2}</div>
        <div class="card-title">\uB9D0\uC500 \uBF51\uAE30</div>
        <div class="card-desc">\uC624\uB298 \uC77D\uC744 \uB9D0\uC500 \uBF51\uAE30</div>
    `;
    const randomBtn = document.createElement("button");
    randomBtn.className = "card-btn";
    randomBtn.textContent = "\uB9D0\uC500 \uBF51\uAE30";
    randomBtn.onclick = async () => {
      randomBtn.disabled = true;
      randomBtn.textContent = "\uC774\uB3D9 \uC911...";
      try {
        const { bookAbbr, chapterNum } = await getRandomChapterKey();
        renderBibleReader(bookAbbr, chapterNum);
      } catch {
        randomBtn.disabled = false;
        randomBtn.textContent = "\uB9D0\uC500 \uBF51\uAE30";
      }
    };
    randomCard.appendChild(randomBtn);
    cards.appendChild(randomCard);
    const qtCard = document.createElement("div");
    qtCard.className = "home-card";
    qtCard.innerHTML = `
        <div class="card-icon">\u{1F4C5}</div>
        <div class="card-title">\uC0DD\uBA85\uC758 \uC0B6</div>
        <div class="card-desc">\uB450\uB780\uB178 QT \uBB35\uC0C1 \uBC14\uB85C\uAC00\uAE30</div>
    `;
    const qtBtn = document.createElement("button");
    qtBtn.className = "card-btn";
    qtBtn.textContent = "\uC0DD\uBA85\uC758 \uC0B6 \uBC14\uB85C\uAC00\uAE30";
    qtBtn.onclick = () => window.open("https://www.duranno.com/qt/", "_blank");
    qtCard.appendChild(qtBtn);
    cards.appendChild(qtCard);
    const praiseCard = document.createElement("div");
    praiseCard.className = "home-card";
    praiseCard.innerHTML = `
        <div class="card-icon">\u{1F3B5}</div>
        <div class="card-title">\uC624\uB298\uC758 \uCC2C\uC591</div>
        <div class="card-desc praise-loading">\uBD88\uB7EC\uC624\uB294 \uC911...</div>
    `;
    const praiseBtn = document.createElement("button");
    praiseBtn.className = "card-btn";
    praiseBtn.textContent = "\uC720\uD29C\uBE0C \uB4E3\uAE30";
    praiseBtn.disabled = true;
    praiseCard.appendChild(praiseBtn);
    cards.appendChild(praiseCard);
    container.appendChild(cards);
    app.appendChild(container);
    loadDailyPraise(praiseCard, praiseBtn);
  }
  async function loadDailyPraise(card, btn) {
    try {
      const res = await fetch("./assets/daily.json?t=" + Date.now());
      const data = await res.json();
      const { title, artist, youtubeUrl } = data.praise;
      const desc = card.querySelector(".card-desc");
      desc.innerHTML = `<strong>${title}</strong><br><span class="praise-artist">${artist}</span>`;
      btn.disabled = !youtubeUrl;
      btn.onclick = () => window.open(youtubeUrl, "_blank");
    } catch {
      const desc = card.querySelector(".card-desc");
      desc.textContent = "\uCC2C\uC591 \uC815\uBCF4\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";
    }
  }
  async function renderBibleReader(initialBook, initialChapter) {
    document.body.classList.add("reader-mode");
    app.innerHTML = "";
    const container = document.createElement("div");
    container.className = "container reader-container";
    const backBtn = document.createElement("button");
    backBtn.className = "back-btn";
    backBtn.textContent = "\u2190 \uD648\uC73C\uB85C";
    backBtn.onclick = renderHome;
    container.appendChild(backBtn);
    const loadingEl = document.createElement("div");
    loadingEl.className = "status-msg";
    loadingEl.textContent = "\uC131\uACBD\uC744 \uBD88\uB7EC\uC624\uB294 \uC911...";
    container.appendChild(loadingEl);
    app.appendChild(container);
    const books = await getBookList();
    loadingEl.remove();
    let currentBook = initialBook || books[0].abbr;
    let currentChapter = initialChapter || 1;
    const selectorRow = document.createElement("div");
    selectorRow.className = "selector-row";
    const bookSelect = document.createElement("select");
    bookSelect.className = "book-select";
    books.forEach((b) => {
      const opt = document.createElement("option");
      opt.value = b.abbr;
      opt.textContent = b.name;
      if (b.abbr === currentBook) opt.selected = true;
      bookSelect.appendChild(opt);
    });
    const chapterSelect = document.createElement("select");
    chapterSelect.className = "chapter-select";
    function populateChapterSelect(bookAbbr, selectedChapter) {
      const book = books.find((b) => b.abbr === bookAbbr);
      chapterSelect.innerHTML = "";
      for (let i = 1; i <= book.chapterCount; i++) {
        const opt = document.createElement("option");
        opt.value = String(i);
        opt.textContent = `${i}\uC7A5`;
        if (i === selectedChapter) opt.selected = true;
        chapterSelect.appendChild(opt);
      }
    }
    populateChapterSelect(currentBook, currentChapter);
    bookSelect.onchange = () => {
      currentBook = bookSelect.value;
      currentChapter = 1;
      populateChapterSelect(currentBook, 1);
      loadAndRenderChapter();
    };
    chapterSelect.onchange = () => {
      currentChapter = parseInt(chapterSelect.value);
      loadAndRenderChapter();
    };
    selectorRow.appendChild(bookSelect);
    selectorRow.appendChild(chapterSelect);
    container.appendChild(selectorRow);
    const navEl = document.createElement("div");
    navEl.className = "chapter-nav";
    const prevBtn = document.createElement("button");
    prevBtn.className = "nav-btn";
    prevBtn.textContent = "\u25C0 \uC774\uC804 \uC7A5";
    const nextBtn = document.createElement("button");
    nextBtn.className = "nav-btn";
    nextBtn.textContent = "\uB2E4\uC74C \uC7A5 \u25B6";
    navEl.appendChild(prevBtn);
    navEl.appendChild(nextBtn);
    container.appendChild(navEl);
    const chapterEl = document.createElement("div");
    chapterEl.className = "chapter-area";
    container.appendChild(chapterEl);
    function updateNavButtons() {
      const bookIdx = books.findIndex((b) => b.abbr === currentBook);
      const book = books[bookIdx];
      prevBtn.disabled = bookIdx === 0 && currentChapter <= 1;
      nextBtn.disabled = bookIdx === books.length - 1 && currentChapter >= book.chapterCount;
    }
    function goToPrev() {
      if (currentChapter > 1) {
        currentChapter--;
      } else {
        const bookIdx = books.findIndex((b) => b.abbr === currentBook);
        if (bookIdx > 0) {
          currentBook = books[bookIdx - 1].abbr;
          currentChapter = books[bookIdx - 1].chapterCount;
          bookSelect.value = currentBook;
          populateChapterSelect(currentBook, currentChapter);
        }
      }
      chapterSelect.value = String(currentChapter);
      loadAndRenderChapter();
    }
    function goToNext() {
      const book = books.find((b) => b.abbr === currentBook);
      if (currentChapter < book.chapterCount) {
        currentChapter++;
      } else {
        const bookIdx = books.findIndex((b) => b.abbr === currentBook);
        if (bookIdx < books.length - 1) {
          currentBook = books[bookIdx + 1].abbr;
          currentChapter = 1;
          bookSelect.value = currentBook;
          populateChapterSelect(currentBook, 1);
        }
      }
      chapterSelect.value = String(currentChapter);
      loadAndRenderChapter();
    }
    prevBtn.onclick = goToPrev;
    nextBtn.onclick = goToNext;
    async function loadAndRenderChapter() {
      bookSelect.value = currentBook;
      chapterSelect.value = String(currentChapter);
      updateNavButtons();
      chapterEl.classList.add("fading");
      await new Promise((r) => setTimeout(r, 180));
      chapterEl.innerHTML = '<div class="status-msg">\uBD88\uB7EC\uC624\uB294 \uC911...</div>';
      chapterEl.scrollTop = 0;
      try {
        const chapter = await getChapterByBookAndNum(currentBook, currentChapter);
        renderChapterInElement(chapterEl, chapter);
        chapterEl.scrollTop = 0;
      } catch {
        chapterEl.innerHTML = '<div class="status-msg error-msg">\uB9D0\uC500\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.</div>';
      }
      chapterEl.classList.remove("fading");
    }
    loadAndRenderChapter();
  }
  renderHome();
})();
