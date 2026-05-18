import { Button } from './components/Button';
import { DevotionalDisplay } from './components/DevotionalDisplay';
import { getRandomDevotional } from './services/devotionalService';

const app = document.getElementById('app')!;

const container = document.createElement('div');
container.className = 'container';

const header = document.createElement('div');
header.className = 'header';
header.innerHTML = '<h1>오늘의 말씀</h1><p>오늘도 하나님의 말씀으로 살아가는 빡다방 목장</p>';

const button = new Button('오늘의 말씀 보기', handleButtonClick);
const devotionalDisplay = new DevotionalDisplay();

async function handleButtonClick() {
    try {
        const todaysDevotional = await getRandomDevotional();
        devotionalDisplay.update(todaysDevotional);
    } catch (error) {
        console.error('말씀을 불러오는 중 오류가 발생했습니다:', error);
    }
}

function init() {
    container.appendChild(header);
    container.appendChild(button.render());
    container.appendChild(devotionalDisplay.render());
    app.appendChild(container);
    
    handleButtonClick();
}

init();