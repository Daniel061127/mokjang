import { Devotional } from '../types/index';

export const getRandomDevotional = async (): Promise<Devotional> => {
    const response = await fetch('./assets/verses.json');
    const raw = await response.text();

    const lines = raw.split('\n').filter(line => line.trim().length > 0);
    const randomLine = lines[Math.floor(Math.random() * lines.length)];

    // 형식: "창1:1 <섹션제목> 본문" 또는 "창1:1 본문"
    const match = randomLine.match(/^(\S+)\s+(?:<[^>]+>\s+)?(.+)$/);
    if (!match) return { reference: '', text: randomLine };

    return { reference: match[1], text: match[2] };
};