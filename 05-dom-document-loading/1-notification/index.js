export default class NotificationMessage {
    constructor(text = "", { type = "", duration = Number } = {}) {
        this.type = type;
        this.duration = duration;
        this.text = text;
        this.render();
    }

    get template() {
        return ` <div class="notification
          ${this.type}" style="--value:${this.duration / 1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">success</div>
          <div class="notification-body">
          ${this.text}
          </div>
        </div>
      </div>
        `;
    }

    render() {
        const element = document.createElement("div");
        element.innerHTML = this.template;
        this.element = element.firstElementChild;
    }

    show(target) {
        let notification = document.querySelector(".notification");
        if (notification) {
            notification.remove();
            this.append(target);
            setTimeout(() => this.remove(), this.duration);
        } else {
            this.append(target);
            setTimeout(() => this.remove(), this.duration);
        }
    }

    append(target) {
        target ? target.append(this.element) : document.body.append(this.element);
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.element = null;
    }
}