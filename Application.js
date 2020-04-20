export default class Screen {
    constructor(data) {
        if (!(data instanceof Object)) {
            return;
        }

        this.data = data;
        this.screen = document.getElementById("Screen");
        this.render(this.data);
    }

    render(data) {}

    registerEventListener() {}

//=======================================
// HANDLING METHODS
//=======================================
    prevItem() {
        this.changeItem('prev');
    }

    nextItem() {
        this.changeItem('next');
    }

    prevColumn() {
        let itemId = this.getCurrentItemId();
        let columnId = this.getCurrentColumnId();
        if (this.isItemType(columnId, itemId, 'item')) {
            this.removeItem(itemId);
            return;
        }
        this.changeColumn('prev');
    }

    nextColumn() {
        this.changeColumn('next');
    }

    handleEnter() {}

    changeItem(direction) {
        if(!direction){
            return;
        }
        let currentItemId = this.getCurrentItemId();
        let currentColumnId = this.getCurrentColumnId();
        let nextItemId = (direction == 'next') ? +currentItemId + 1 : +currentItemId - 1;
        if (this.setNextItem(currentColumnId, nextItemId)) {
            this.blurItem(currentColumnId, currentItemId);
        }
    }

    changeColumn(direction) {
        if(!direction){
            return;
        }
        let columnId = this.getCurrentColumnId();
        columnId = (direction == 'next') ? ++columnId : --columnId;
        if (this.setNextColumn(columnId)) {
            this.focusItemInColumn(columnId);
        }
    }

    setNextColumn(columnId) {
        let nextColumn = this.getColumn(columnId);
        if (!nextColumn) {
            return false;
        }
        nextColumn.focus();
        return true;
    }

//=======================================
// OTHER METHODS
//=======================================
    getTemplateById(templateId) {
        let template = document.getElementById(templateId);
        if (!template) {
            return template;
        }
        return document.importNode(template.content, true);
    }

    setNextItem(columnId, itemId) {
        let nextItem = this.getItem(columnId, itemId);
        if (!nextItem) {
            return false;
        }
        nextItem.focus();
        nextItem.dataset.active = 'true';

        return true;
    }

    getCurrentItemId() {
        let currentElem = this.getCurrentItem();
        let itemId = currentElem.dataset.itemId;
        return itemId;
    }

    getItem(columnId, itemId) {
        let column = this.getColumn(columnId);
        if (!column) {
            return null;
        }
        let item = column.querySelector(`.item[data-item-id="${itemId}"]`);
        return item;
    }

    getColumn(columnId) {
        return document.querySelector(`.column[data-column-id="${columnId}"]`);
    }

    blurItem(currentColumnId, nextItemId) {
        let item = this.getItem(currentColumnId, nextItemId);
        if (!item) {
            return;
        }
        item.dataset.active = 'false';
    }

    isItemType(columnId, itemId, type = 'item') {
        let column = this.getColumn(columnId);
        if (!column) {
            return false;
        }
        let item = column.querySelector(`.item[data-item-id="${itemId}"]`);
        if (!item) {
            return false;
        }
        return item.dataset.itemType == type;
    }

    removeItem(itemId) {
        this.data.splice(itemId, 1);
        this.render(this.data);
    }

    focusItemInColumn(columnId) {
        let currentColumn = this.getColumn(columnId);
        let children = currentColumn.children;
        let childIsActive = false;
        for (let i = 0; i < children.length; i++) {
            if (children[i].dataset.active == 'true') {
                children[i].focus();
                childIsActive = true;
                break;
            }
        }
        if (!childIsActive && children.length > 0) {
            children[0].focus();
        }
    }

    getCurrentColumnId() {
        let currentColumn = this.getCurrentColumn();
        return currentColumn.dataset.columnId;
    }

    getCurrentItem() {
        let currentItem = document.activeElement;
        let classList = currentItem.classList;
        let isItem = false;
        for (let i = 0; i < classList.length; i++) {
            if (classList[i] == 'item') {
                isItem = true;
                break;
            }
        }
        if (!isItem) {
            let addItemBtn = document.querySelector('.item[data-item-type="btn"]');
            addItemBtn.focus();
            return document.activeElement;
        }
        return currentItem;
    }

    getCurrentColumn() {
        let currentItem = this.getCurrentItem();
        return currentItem.parentNode;
    }
}