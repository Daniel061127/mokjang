class Button {
    constructor(private label: string, private onClickCallback: () => void) {}

    render(): HTMLButtonElement {
        const button = document.createElement('button');
        button.innerText = this.label;
        button.addEventListener('click', this.onClick.bind(this));
        return button;
    }

    private onClick(): void {
        this.onClickCallback();
    }
}

export { Button };