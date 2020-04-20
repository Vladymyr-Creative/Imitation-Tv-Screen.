import Screen from "./Application.js";
import Screen1 from "./Screen1.js";

export default class Screen2 extends Screen {
    render(data) {
        let screen = this.screen;
        screen.innerHTML = '';
        screen.dataset.screen = 'screen2';
        let screen2 = this.getTemplateById("Screen2");
        screen.appendChild(screen2);

        let textarea = screen.querySelector('textarea');
        textarea.focus();
        this.registerEventListener();
    }

    registerEventListener() {
        let addScreen = document.getElementById('addScreen');
        addScreen.addEventListener('keydown', (e) => {
            if (this.screen.dataset.screen != 'screen2') {
                return;
            }
            console.log('screen2');
            if (e.keyCode == 13) {//enter
                this.handleEnter();
            }
            if (e.keyCode == 37) {//left
                this.prevItem();
            }
            if (e.keyCode == 38) {//up
                this.prevColumn();
            }
            if (e.keyCode == 39) {//right
                this.nextItem();
            }
            if (e.keyCode == 40) {//down
                this.nextColumn();
            }
        })
    }

    handleEnter() {
        let currentItem = this.getCurrentItem();
        if (currentItem.dataset.itemType != 'btn') {
            return;
        }
        if (currentItem.dataset.btnAction == 'add') {
            this.addNewItemAccount();
            this.exit();
        }
        if (currentItem.dataset.btnAction == 'cancel') {
            this.exit();
        }
    }

    addNewItemAccount() {
        let textarea = this.screen.querySelector('textarea');
        let value =textarea.value;
        value =value.replace(/\s/sg, '');
        if(!(value.length > 0)){
            return;
        }
        let newItem = {
            'title': value,
            'img': 'favicon.ico'
        };
        this.data.push(newItem);
    }

    exit() {
        new Screen1(this.data);
    }
}