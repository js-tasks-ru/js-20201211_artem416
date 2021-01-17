export default class SortableList {
    element = document.createElement("ul");
    constructor({ items } = {}) {
        this.items = items;
        this.render();
    }

    render() {
        console.log(this.items);
        for (let i = 0; i < this.items.length; i++) {
            this.element.append(this.items[i]);
        }
    }
}