import { getRandomChapterKey, getBookList, getChapterByBookAndNum, BookInfo } from './services/devotionalService';
import { Chapter } from './types/index';

const app = document.getElementById('app')!;

// ── Music ──────────────────────────────────────────────────────────────────

const audio = new Audio('./assets/praise.mp3');
let firstPlayDone = false;

async function startMusic() {
    audio.volume = 1;

    if (!audio.duration || !isFinite(audio.duration)) {
        await new Promise<void>(resolve => {
            if (audio.readyState >= 1) resolve();
            else audio.addEventListener('loadedmetadata', () => resolve(), { once: true });
        });
    }

    if (!firstPlayDone) {
        firstPlayDone = true;
        audio.currentTime = Math.random() * audio.duration;
    }

    try {
        await audio.play();
    } catch {}
}

function stopMusic() {
    audio.pause();
}

// 끝나면 처음부터 재시작
audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    audio.volume = 1;
    audio.play().catch(() => {});
});

// ── Music widget ────────────────────────────────────────────────────────────

const musicWrapper = document.createElement('div');
musicWrapper.className = 'music-wrapper';

// 패널 (숨김 상태로 시작)
const musicPanel = document.createElement('div');
musicPanel.className = 'music-panel hidden';

// 상단: 곡 정보 + 재생 버튼
const topRow = document.createElement('div');
topRow.className = 'music-top-row';
topRow.innerHTML = `
    <div class="music-info">
        <div class="music-playlist">𝑪𝑪𝑴 𝑷𝒊𝒂𝒏𝒐 𝑷𝒍𝒂𝒚𝒍𝒊𝒔𝒕</div>
        <div class="music-song">여호와께서 너의 걸음을 정하시고</div>
    </div>
`;

const playPauseBtn = document.createElement('button');
playPauseBtn.className = 'play-pause-btn';
playPauseBtn.textContent = '▶';
topRow.appendChild(playPauseBtn);
musicPanel.appendChild(topRow);

// 시크바
const seekRow = document.createElement('div');
seekRow.className = 'music-seek-row';

const currentTimeEl = document.createElement('span');
currentTimeEl.className = 'music-time';
currentTimeEl.textContent = '0:00';

const seekBar = document.createElement('input');
seekBar.type = 'range';
seekBar.className = 'music-seek-bar';
seekBar.min = '0';
seekBar.max = '100';
seekBar.value = '0';
seekBar.step = '0.1';

const totalTimeEl = document.createElement('span');
totalTimeEl.className = 'music-time';
totalTimeEl.textContent = '--:--';

seekRow.appendChild(currentTimeEl);
seekRow.appendChild(seekBar);
seekRow.appendChild(totalTimeEl);
musicPanel.appendChild(seekRow);

function formatTime(sec: number): string {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

audio.addEventListener('loadedmetadata', () => {
    seekBar.max = String(audio.duration);
    totalTimeEl.textContent = formatTime(audio.duration);
});

let isSeeking = false;
audio.addEventListener('timeupdate', () => {
    if (isSeeking) return;
    seekBar.value = String(audio.currentTime);
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

seekBar.addEventListener('mousedown',  () => { isSeeking = true; });
seekBar.addEventListener('touchstart', () => { isSeeking = true; }, { passive: true });
seekBar.addEventListener('input', () => {
    currentTimeEl.textContent = formatTime(parseFloat(seekBar.value));
});
seekBar.addEventListener('change', () => {
    audio.currentTime = parseFloat(seekBar.value);
    isSeeking = false;
});

playPauseBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (audio.paused) {
        playPauseBtn.textContent = '⏸';
        await startMusic();
    } else {
        playPauseBtn.textContent = '▶';
        await stopMusic();
    }
});

// 🎵 토글 버튼 (패널 열고 닫기)
const musicToggleBtn = document.createElement('button');
musicToggleBtn.className = 'music-toggle-btn';
musicToggleBtn.textContent = '🎵';


audio.addEventListener('play', () => {
    playPauseBtn.textContent = '⏸';
    musicToggleBtn.textContent = '🔊';
});
audio.addEventListener('pause', () => {
    playPauseBtn.textContent = '▶';
    musicToggleBtn.textContent = '🎵';
});

musicWrapper.appendChild(musicPanel);
musicWrapper.appendChild(musicToggleBtn);
document.body.appendChild(musicWrapper);

// ── Music widget 드래그 이동 ────────────────────────────────────────────────

let didDrag = false;

function setWrapperPos(x: number, y: number) {
    const w = musicWrapper.offsetWidth || 60;
    const h = musicWrapper.offsetHeight || 60;
    x = Math.max(0, Math.min(window.innerWidth - w, x));
    y = Math.max(0, Math.min(window.innerHeight - h, y));
    musicWrapper.style.left   = x + 'px';
    musicWrapper.style.top    = y + 'px';
    musicWrapper.style.right  = 'auto';
    musicWrapper.style.bottom = 'auto';
}

(function loadSavedPos() {
    const saved = localStorage.getItem('musicPos');
    if (!saved) return;
    try {
        const { x, y } = JSON.parse(saved);
        // rAF으로 렌더 후 offsetWidth 확보
        requestAnimationFrame(() => setWrapperPos(x, y));
    } catch {}
})();

musicToggleBtn.addEventListener('mousedown', startDrag);
musicToggleBtn.addEventListener('touchstart', startDrag, { passive: true });

function startDrag(e: MouseEvent | TouchEvent) {
    didDrag = false;
    const pt = 'touches' in e ? e.touches[0] : e;
    const startX = pt.clientX;
    const startY = pt.clientY;
    const rect = musicWrapper.getBoundingClientRect();
    const originX = rect.left;
    const originY = rect.top;

    function onMove(e: MouseEvent | TouchEvent) {
        const pt = 'touches' in e ? (e as TouchEvent).touches[0] : e as MouseEvent;
        const dx = pt.clientX - startX;
        const dy = pt.clientY - startY;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
            didDrag = true;
        }
        if (didDrag) {
            e.preventDefault();
            setWrapperPos(originX + dx, originY + dy);
        }
    }

    function onEnd() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('mouseup', onEnd);
        document.removeEventListener('touchend', onEnd);
        if (didDrag) {
            const r = musicWrapper.getBoundingClientRect();
            localStorage.setItem('musicPos', JSON.stringify({ x: r.left, y: r.top }));
        }
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchend', onEnd);
}

// 드래그였으면 클릭(패널 토글) 무시
musicToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (didDrag) { didDrag = false; return; }
    musicPanel.classList.toggle('hidden');
});

// ── Shared rendering ───────────────────────────────────────────────────────

function renderChapterInElement(el: HTMLElement, chapter: Chapter) {
    const versesHTML = chapter.verses
        .map(v => `<div class="verse"><span class="verse-number">${v.number}</span>${v.text}</div>`)
        .join('');

    el.innerHTML = `
        <div class="chapter-title">${chapter.title}</div>
        <div class="verses-scroll">${versesHTML}</div>
    `;
}

// ── Home View ──────────────────────────────────────────────────────────────

function renderHome() {
    document.body.classList.remove('reader-mode');
    app.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'container';

    const header = document.createElement('div');
    header.className = 'header';
    header.innerHTML = `
        <h1>오늘의 말씀</h1>
        <p>오늘도 하나님의 말씀으로 살아가는 빡다방 목장</p>
    `;
    container.appendChild(header);

    const cards = document.createElement('div');
    cards.className = 'home-cards';

    // 성경 읽기 카드
    const bibleCard = document.createElement('div');
    bibleCard.className = 'home-card';
    bibleCard.innerHTML = `
        <div class="card-icon">📖</div>
        <div class="card-title">성경</div>
        <div class="card-desc">창세기 ~ 요한계시록</div>
    `;
    const bibleBtn = document.createElement('button');
    bibleBtn.className = 'card-btn';
    bibleBtn.textContent = '읽으러 가기';
    bibleBtn.onclick = () => renderBibleReader();
    bibleCard.appendChild(bibleBtn);
    cards.appendChild(bibleCard);

    // 말씀 뽑기 카드
    const randomCard = document.createElement('div');
    randomCard.className = 'home-card';
    randomCard.innerHTML = `
        <div class="card-icon">🎲</div>
        <div class="card-title">말씀 뽑기</div>
        <div class="card-desc">오늘 읽을 말씀 뽑기</div>
    `;
    const randomBtn = document.createElement('button');
    randomBtn.className = 'card-btn';
    randomBtn.textContent = '말씀 뽑기';
    randomBtn.onclick = async () => {
        randomBtn.disabled = true;
        randomBtn.textContent = '이동 중...';
        try {
            const { bookAbbr, chapterNum } = await getRandomChapterKey();
            renderBibleReader(bookAbbr, chapterNum);
        } catch {
            randomBtn.disabled = false;
            randomBtn.textContent = '말씀 뽑기';
        }
    };
    randomCard.appendChild(randomBtn);
    cards.appendChild(randomCard);

    // 생명의 삶 카드
    const qtCard = document.createElement('div');
    qtCard.className = 'home-card';
    qtCard.innerHTML = `
        <div class="card-icon">📅</div>
        <div class="card-title">생명의 삶</div>
        <div class="card-desc">두란노 QT 묵상 바로가기</div>
    `;
    const qtBtn = document.createElement('button');
    qtBtn.className = 'card-btn';
    qtBtn.textContent = '생명의 삶 바로가기';
    qtBtn.onclick = () => window.open('https://www.duranno.com/qt/', '_blank');
    qtCard.appendChild(qtBtn);
    cards.appendChild(qtCard);

    // 오늘의 찬양 카드
    const praiseCard = document.createElement('div');
    praiseCard.className = 'home-card';
    praiseCard.innerHTML = `
        <div class="card-icon">🎵</div>
        <div class="card-title">오늘의 찬양</div>
        <div class="card-desc praise-loading">불러오는 중...</div>
    `;
    const praiseBtn = document.createElement('button');
    praiseBtn.className = 'card-btn';
    praiseBtn.textContent = '유튜브 듣기';
    praiseBtn.disabled = true;
    praiseCard.appendChild(praiseBtn);
    cards.appendChild(praiseCard);

    container.appendChild(cards);
    app.appendChild(container);

    // 오늘의 찬양 데이터 로드 (daily.json)
    loadDailyPraise(praiseCard, praiseBtn);
}

async function loadDailyPraise(card: HTMLElement, btn: HTMLButtonElement) {
    try {
        const res = await fetch('./assets/daily.json?t=' + Date.now());
        const data = await res.json();
        const { title, artist, youtubeUrl } = data.praise;

        const desc = card.querySelector('.card-desc')!;
        desc.innerHTML = `<strong>${title}</strong><br><span class="praise-artist">${artist}</span>`;

        btn.disabled = !youtubeUrl;
        btn.onclick = () => window.open(youtubeUrl, '_blank');
    } catch {
        const desc = card.querySelector('.card-desc')!;
        desc.textContent = '찬양 정보를 불러오지 못했습니다';
    }
}

// ── Bible Reader View ──────────────────────────────────────────────────────

async function renderBibleReader(initialBook?: string, initialChapter?: number) {
    document.body.classList.add('reader-mode');
    app.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'container reader-container';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← 홈으로';
    backBtn.onclick = renderHome;
    container.appendChild(backBtn);

    const loadingEl = document.createElement('div');
    loadingEl.className = 'status-msg';
    loadingEl.textContent = '성경을 불러오는 중...';
    container.appendChild(loadingEl);

    app.appendChild(container);

    const books = await getBookList();
    loadingEl.remove();

    let currentBook = initialBook || books[0].abbr;
    let currentChapter = initialChapter || 1;

    // 선택 행
    const selectorRow = document.createElement('div');
    selectorRow.className = 'selector-row';

    const bookSelect = document.createElement('select');
    bookSelect.className = 'book-select';
    books.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b.abbr;
        opt.textContent = b.name;
        if (b.abbr === currentBook) opt.selected = true;
        bookSelect.appendChild(opt);
    });

    const chapterSelect = document.createElement('select');
    chapterSelect.className = 'chapter-select';

    function populateChapterSelect(bookAbbr: string, selectedChapter: number) {
        const book = books.find(b => b.abbr === bookAbbr)!;
        chapterSelect.innerHTML = '';
        for (let i = 1; i <= book.chapterCount; i++) {
            const opt = document.createElement('option');
            opt.value = String(i);
            opt.textContent = `${i}장`;
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

    // 상단 내비게이션
    const navEl = document.createElement('div');
    navEl.className = 'chapter-nav';
    const prevBtn = document.createElement('button');
    prevBtn.className = 'nav-btn';
    prevBtn.textContent = '◀ 이전 장';
    const nextBtn = document.createElement('button');
    nextBtn.className = 'nav-btn';
    nextBtn.textContent = '다음 장 ▶';
    navEl.appendChild(prevBtn);
    navEl.appendChild(nextBtn);
    container.appendChild(navEl);

    // 본문
    const chapterEl = document.createElement('div');
    chapterEl.className = 'chapter-area';
    container.appendChild(chapterEl);

    function updateNavButtons() {
        const bookIdx = books.findIndex(b => b.abbr === currentBook);
        const book = books[bookIdx];
        prevBtn.disabled = bookIdx === 0 && currentChapter <= 1;
        nextBtn.disabled = bookIdx === books.length - 1 && currentChapter >= book.chapterCount;
    }

    function goToPrev() {
        if (currentChapter > 1) {
            currentChapter--;
        } else {
            const bookIdx = books.findIndex(b => b.abbr === currentBook);
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
        const book = books.find(b => b.abbr === currentBook)!;
        if (currentChapter < book.chapterCount) {
            currentChapter++;
        } else {
            const bookIdx = books.findIndex(b => b.abbr === currentBook);
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
        chapterEl.innerHTML = '<div class="status-msg">불러오는 중...</div>';
        bookSelect.value = currentBook;
        chapterSelect.value = String(currentChapter);
        updateNavButtons();

        try {
            const chapter = await getChapterByBookAndNum(currentBook, currentChapter);
            renderChapterInElement(chapterEl, chapter);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch {
            chapterEl.innerHTML = '<div class="status-msg error-msg">말씀을 불러오지 못했습니다.</div>';
        }
    }

    loadAndRenderChapter();
}

// ── Init ───────────────────────────────────────────────────────────────────

renderHome();
