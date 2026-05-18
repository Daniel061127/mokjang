var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Button } from './components/Button';
import { DevotionalDisplay } from './components/DevotionalDisplay';
import { getTodaysDevotional } from './services/devotionalService';
const app = document.getElementById('app');
const container = document.createElement('div');
container.className = 'container';
const header = document.createElement('div');
header.className = 'header';
header.innerHTML = '<h1>오늘의 말씀</h1><p>오늘도 하나님의 말씀으로 살아가는 빡다방 목장</p>';
const button = new Button('오늘의 말씀 뽑기', handleButtonClick);
const devotionalDisplay = new DevotionalDisplay();
function handleButtonClick() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todaysDevotional = yield getTodaysDevotional();
            devotionalDisplay.update(todaysDevotional);
        }
        catch (error) {
            console.error('말씀을 불러오는 중 오류가 발생했습니다:', error);
        }
    });
}
function init() {
    container.appendChild(header);
    container.appendChild(button.render());
    container.appendChild(devotionalDisplay.render());
    app.appendChild(container);
    handleButtonClick();
}
init();
//# sourceMappingURL=main.js.map