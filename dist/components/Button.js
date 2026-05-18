class Button {
    constructor(label, onClickCallback) {
        this.label = label;
        this.onClickCallback = onClickCallback;
    }
    render() {
        const button = document.createElement('button');
        button.innerText = this.label;
        button.addEventListener('click', this.onClick.bind(this));
        return button;
    }
    onClick() {
        this.onClickCallback();
    }
}
export { Button };
//# sourceMappingURL=Button.js.map