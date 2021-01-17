export default class SortableList {
    element = document.createElement("ul");
    constructor({ items } = {}) {
        this.items = items;
        this.array = this.items.concat();
        this.render();
    }

    render(array = this.items) {
        for (let i = 0; i < array.length; i++) {
            array[i].style.position = "relative";
            array[i].style.top = "auto";
            this.element.append(array[i]);
            this.dragInit(array[i]);
        }
    }

    updateRender(item) {
        console.log(this.array.indexOf(item));
        // console.log(this.array.indexOf(droppableBelow));
    }

    dragInit(item) {
        item.ondragstart = function() {
            return false;
        };
        item.onmousedown = (event) => {
            item.style.position = "absolute";
            item.style.zIndex = 1000;
            moveAt(event.pageY);

            function moveAt(pageY) {
                item.style.top = pageY - item.offsetHeight / 2 + "px";
            }

            function onMouseMove(event) {
                moveAt(event.pageY);
            }

            document.addEventListener("mousemove", onMouseMove);

            item.onmouseup = (event) => {
                let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
                console.log(elemBelow);
                this.updateRender(event.target.parentElement);
                document.removeEventListener("mousemove", onMouseMove);
                item.onmouseup = null;
            };
        };
    }
}