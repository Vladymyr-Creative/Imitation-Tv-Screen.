import Screen from "./Application.js";
import Screen2 from "./Screen2.js";

export default class Screen1 extends Screen {
    render(data) {
        let screen = this.screen;
        screen.innerHTML = '';
        screen.dataset.screen = 'screen1';
        let screen1 = this.getTemplateById("Screen1");
        let wrapper = screen1.querySelector("#mainScreen");
        let accountsContainer = wrapper.querySelector("#accountsContainer");

        for (let i = 0; i < data.length; i++) {
            let itemAccountTemp = this.getTemplateById("itemAccount");
            let itemAccount = itemAccountTemp.querySelector(".item");
            itemAccount.dataset.itemId = i;
            let title = itemAccount.querySelector(".title");
            title.textContent = data[i]['title'];
            let image = itemAccount.querySelector(".image");
            image.setAttribute('src', data[i]['img']);
            accountsContainer.appendChild(itemAccount);
        }
        wrapper.prepend(accountsContainer);
        screen1.appendChild(wrapper);
        screen.appendChild(screen1);

        this.registerEventListener();

        let children = accountsContainer.children;
        if (children.length == 0) {
            this.changeColumn('next');
            return;
        }
        children[0].focus();
    }

    registerEventListener() {
        let screen = document.getElementById('mainScreen');
        screen.addEventListener('keydown', (e) => {
            if (this.screen.dataset.screen != 'screen1') {
                return;
            }
            console.log('screen1');
            if (e.keyCode == 13) {//enter
                this.handleEnter();
            }
            if (e.keyCode == 37) {//left
                this.prevColumn();
            }
            if (e.keyCode == 38) {//up
                this.prevItem();
            }
            if (e.keyCode == 39) {//right
                this.nextColumn();
            }
            if (e.keyCode == 40) {//down
                this.nextItem();
            }
        } )
    }

    handleEnter() {
        let currentItem = this.getCurrentItem();
        if (currentItem.dataset.itemType != 'btn') {
            return;
        }
        if (currentItem.dataset.btnAction == 'add') {
            new Screen2(this.data);
        }
    }
}