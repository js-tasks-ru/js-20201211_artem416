class Tooltip {
    static instance;

    element;

    constructor() {
        if (Tooltip.instance) {
            return Tooltip.instance;
        }

        Tooltip.instance = this;
    }

    onMouseOver = (e) => {
        const element = e.target.closest("[data-tooltip]");

        if (element) {
            this.render(element.dataset.tooltip);
            this.moveTooltip(e);

            document.addEventListener("pointermove", this.onMouseMove);
        }
    };

    onMouseMove = (e) => {
        this.moveTooltip(e);
    };

    onMouseOut = () => {
        this.removeTooltip();
    };

    removeTooltip() {
        if (this.element) {
            this.element.remove();
            this.element = null;

            document.removeEventListener("pointermove", this.onMouseMove);
        }
    }

    initEventListeners() {
        document.addEventListener("pointerover", this.onMouseOver);
        document.addEventListener("pointerout", this.onMouseOut);
    }

    initialize() {
        this.initEventListeners();
    }

    render(textContent) {
        this.element = document.createElement("div");
        this.element.classList.add("tooltip");
        this.element.textContent = textContent;

        document.body.append(this.element);
    }

    moveTooltip(e) {
        this.element.style.left = e.clientX + 10 + "px";
        this.element.style.top = e.clientY + 10 + "px";
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        document.removeEventListener("pointerover", this.onMouseOver);
        document.removeEventListener("pointerout", this.onMouseOut);
        this.removeTooltip();
    }
}

const tooltip = new Tooltip();

export default tooltip;