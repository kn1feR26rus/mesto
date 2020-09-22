export class Section {
    constructor(data, containerSelector) {

        this._renderedItems = data.items;
        this._renderer = data.renderer;
        this._container = document.querySelector(containerSelector);

    }

    addItem(element, isArray) {
        if (isArray) {
            this._container.append(element);
        } else {
            this._container.prepend(element);
        }
    }

    clear() {
        this._container.innerHTML = '';
    }

    renderer() {
        this._renderedItems.forEach(item => {
            const element = this._renderer(item)
            this.addItem(element, true)
        })
    }

}


