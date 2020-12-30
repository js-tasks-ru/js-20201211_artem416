export default class NotificationMessage {
    constructor(text = "", { type = "", duration = Number } = {}) {
        if (NotificationMessage.activeNotification) {
            NotificationMessage.activeNotification.remove();
        }
        this.type = type;
        this.duration = duration;
        this.text = text;
        this.render();
    }

    static activeNotification;

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
        NotificationMessage.activeNotification = this.element;
    }

    show(target) {
        this.append(target);
        setTimeout(() => this.remove(), this.duration);
    }

    append(target = document.body) {
        target.append(this.element);
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.element = null;
        NotificationMessage.activeNotification = null;
    }
}