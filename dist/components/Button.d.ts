declare class Button {
    private label;
    private onClickCallback;
    constructor(label: string, onClickCallback: () => void);
    render(): HTMLButtonElement;
    private onClick;
}
export { Button };
