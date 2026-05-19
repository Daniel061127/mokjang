import { Chapter, Verse } from '../types/index';

const BOOK_NAMES: Record<string, string> = {
    '창': '창세기', '출': '출애굽기', '레': '레위기', '민': '민수기', '신': '신명기',
    '수': '여호수아', '삿': '사사기', '룻': '룻기', '삼상': '사무엘상', '삼하': '사무엘하',
    '왕상': '열왕기상', '왕하': '열왕기하', '대상': '역대상', '대하': '역대하',
    '스': '에스라', '느': '느헤미야', '에': '에스더', '욥': '욥기', '시': '시편',
    '잠': '잠언', '전': '전도서', '아': '아가', '사': '이사야', '렘': '예레미야',
    '애': '예레미야애가', '겔': '에스겔', '단': '다니엘', '호': '호세아', '욜': '요엘',
    '암': '아모스', '옵': '오바댜', '욘': '요나', '미': '미가', '나': '나훔',
    '합': '하박국', '습': '스바냐', '학': '학개', '슥': '스가랴', '말': '말라기',
    '마': '마태복음', '막': '마가복음', '눅': '누가복음', '요': '요한복음', '행': '사도행전',
    '롬': '로마서', '고전': '고린도전서', '고후': '고린도후서', '갈': '갈라디아서',
    '엡': '에베소서', '빌': '빌립보서', '골': '골로새서', '살전': '데살로니가전서',
    '살후': '데살로니가후서', '딤전': '디모데전서', '딤후': '디모데후서', '딛': '디도서',
    '몬': '빌레몬서', '히': '히브리서', '약': '야고보서', '벧전': '베드로전서',
    '벧후': '베드로후서', '요일': '요한일서', '요이': '요한이서', '요삼': '요한삼서',
    '유': '유다서', '계': '요한계시록'
};

const BOOK_ORDER = [
    '창', '출', '레', '민', '신', '수', '삿', '룻', '삼상', '삼하',
    '왕상', '왕하', '대상', '대하', '스', '느', '에', '욥', '시', '잠',
    '전', '아', '사', '렘', '애', '겔', '단', '호', '욜', '암',
    '옵', '욘', '미', '나', '합', '습', '학', '슥', '말',
    '마', '막', '눅', '요', '행', '롬', '고전', '고후', '갈', '엡',
    '빌', '골', '살전', '살후', '딤전', '딤후', '딛', '몬', '히', '약',
    '벧전', '벧후', '요일', '요이', '요삼', '유', '계'
];

export interface BookInfo {
    abbr: string;
    name: string;
    chapterCount: number;
}

let cachedChapters: Record<string, Verse[]> | null = null;
let cachedBookList: BookInfo[] | null = null;

async function getChapters(): Promise<Record<string, Verse[]>> {
    if (cachedChapters) return cachedChapters;

    const response = await fetch('./assets/verses.json');
    const raw = await response.text();
    const lines = raw.split('\n').filter(line => line.trim().length > 0);

    const chapters: Record<string, Verse[]> = {};

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

function buildChapter(key: string, chapters: Record<string, Verse[]>): Chapter {
    const keyMatch = key.match(/^([가-힣]+)(\d+)$/);
    const bookAbbr = keyMatch ? keyMatch[1] : key;
    const chapterNum = keyMatch ? keyMatch[2] : '';
    const bookName = BOOK_NAMES[bookAbbr] || bookAbbr;
    return { title: `${bookName} ${chapterNum}장`, verses: chapters[key] || [] };
}

export const getRandomChapter = async (): Promise<Chapter> => {
    const chapters = await getChapters();
    const keys = Object.keys(chapters);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return buildChapter(randomKey, chapters);
};

export const getRandomChapterKey = async (): Promise<{ bookAbbr: string; chapterNum: number }> => {
    const chapters = await getChapters();
    const keys = Object.keys(chapters);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const match = randomKey.match(/^([가-힣]+)(\d+)$/);
    return {
        bookAbbr: match ? match[1] : randomKey,
        chapterNum: match ? parseInt(match[2]) : 1
    };
};

export const getBookList = async (): Promise<BookInfo[]> => {
    if (cachedBookList) return cachedBookList;

    const chapters = await getChapters();
    const bookChapterCounts: Record<string, number> = {};

    for (const key of Object.keys(chapters)) {
        const match = key.match(/^([가-힣]+)(\d+)$/);
        if (!match) continue;
        const abbr = match[1];
        const num = parseInt(match[2]);
        if (!bookChapterCounts[abbr] || bookChapterCounts[abbr] < num) {
            bookChapterCounts[abbr] = num;
        }
    }

    cachedBookList = BOOK_ORDER
        .filter(abbr => bookChapterCounts[abbr])
        .map(abbr => ({
            abbr,
            name: BOOK_NAMES[abbr] || abbr,
            chapterCount: bookChapterCounts[abbr]
        }));

    return cachedBookList;
};

export const getChapterByBookAndNum = async (bookAbbr: string, chapterNum: number): Promise<Chapter> => {
    const chapters = await getChapters();
    const key = `${bookAbbr}${chapterNum}`;
    return buildChapter(key, chapters);
};
