import { Devotional } from '../types/index';
declare class DevotionalDisplay {
    private displayElement;
    constructor();
    render(): HTMLElement;
    update(devotional: Devotional): void;
}
export { DevotionalDisplay };
