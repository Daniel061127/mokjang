import { Chapter } from '../types/index';

class DevotionalDisplay {
    private displayElement: HTMLElement;

    constructor() {
        this.displayElement = document.createElement('div');
        this.displayElement.className = 'devotional-display';
    }

    render(): HTMLElement {
        return this.displayElement;
    }

    update(chapter: Chapter): void {
        const versesHTML = chapter.verses
            .map(v => `<div class="verse"><span class="verse-number">${v.number}</span>${v.text}</div>`)
            .join('');

        this.displayElement.innerHTML = `
            <div class="chapter-title">${chapter.title}</div>
            <div class="verses-scroll">${versesHTML}</div>
        `;
    }
}

export { DevotionalDisplay };
