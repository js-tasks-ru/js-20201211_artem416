export default class ColumnChart {
    element = document.createElement("div");
    chartHeight = 50;

    constructor({ data = [], label = "", value = 0, link = "" } = {}) {
        this.data = data;
        this.label = label;
        this.value = value;
        this.link = link;
        this.render();
    }

    get template() {
        return `
            <div class="column-chart__title">
              Total ${this.label}
              ${this.getLink()}
            </div>
            <div class="column-chart__container">
               <div data-element="header" class="column-chart__header">
                 ${this.value}
               </div>
              <div data-element="body" class="column-chart__chart">
              </div>
            </div>
        `;
    }

    render() {
        this.element.innerHTML = this.template;
        this.element.classList.add("column-chart");
        this.element.style = `--chart-height: ${this.chartHeight}`;
        if (!this.data.length) {
            this.element.classList.add("column-chart_loading");
            return;
        }
        this.update(this.data);
    }

    getColumnBody(data) {
        const maxValue = Math.max(...data);
        const scale = this.chartHeight / maxValue;

        return data
            .map((item) => {
                const percent = ((item / maxValue) * 100).toFixed(0);

                return `<div style="--value: ${Math.floor(
          item * scale
        )}" data-tooltip="${percent}%"></div>`;
            })
            .join("");
    }

    getLink() {
        return this.link ?
            `<a class="column-chart__link" href="${this.link}">View all</a>` :
            "";
    }

    update(data) {
        let chart = this.element.querySelector(".column-chart__chart");
        chart.innerHTML = this.getColumnBody(data);
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
        this.element = null;
    }
}