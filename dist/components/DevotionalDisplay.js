class DevotionalDisplay {
    constructor() {
        this.displayElement = document.createElement('div');
        this.displayElement.className = 'devotional-display';
    }
    render() {
        return this.displayElement;
    }
    update(devotional) {
        const today = new Date();
        const dateString = today.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
        this.displayElement.innerHTML = `
            <div class="scripture">
                <div class="scripture-reference">${devotional.reference}</div>
                <div class="scripture-text">"${devotional.text}"</div>
                <div class="scripture-message">${devotional.message}</div>
                <div class="date">${dateString}</div>
            </div>
        `;
    }
}
export { DevotionalDisplay };
//# sourceMappingURL=DevotionalDisplay.js.map