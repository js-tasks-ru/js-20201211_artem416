import fetchJson from "./utils/fetch-json.js";

const BACKEND_URL = "https://course-js.javascript.ru";

export default class ColumnChart {
    element = document.createElement("div");
    subElements = {};
    chartHeight = 50;

    constructor({
        label = "",
        link = "",
        formatHeading = (data) => data,
        url = "",
        range = {
            from: new Date("2020-04-11"),
            to: new Date("2020-05-11"),
        },
    } = {}) {
        this.url = new URL(url, BACKEND_URL);

        this.range = range;
        this.label = label;
        this.link = link;
        this.formatHeading = formatHeading;
        this.render();
    }

    getHeaderValue(data) {
        return this.formatHeading(
            Object.values(data).reduce((accum, item) => accum + item, 0)
        );
    }

    render() {
        this.element.innerHTML = this.template;
        this.element = this.element.firstElementChild;
        this.subElements = this.getSubElements(this.element);
        this.update();
    }

    async getData(from, to) {
        this.element.classList.add("column-chart_loading");

        this.url.searchParams.set("from", from.toISOString());
        this.url.searchParams.set("to", to.toISOString());

        const data = await fetchJson(this.url);
        this.setUpdate(data);
    }

    setUpdate(data) {
        if (data && Object.values(data).length) {
            this.subElements.header.textContent = this.getHeaderValue(data);
            this.subElements.body.innerHTML = this.getColumnBody(data);

            this.element.classList.remove("column-chart_loading");
            console.error(data);
        }
    }

    getColumnBody(data) {
        const maxValue = Math.max(...Object.values(data));

        return Object.entries(data)
            .map(([key, value]) => {
                const scale = this.chartHeight / maxValue;
                const percent = ((value / maxValue) * 100).toFixed(0);
                const tooltip = `<span>
        <small>${key.toLocaleString("default", { dateStyle: "medium" })}</small>
        <br>
        <strong>${percent}%</strong>
      </span>`;

                return `<div style="--value: ${Math.floor(
          value * scale
        )}" data-tooltip="${tooltip}"></div>`;
            })
            .join("");
    }

    getLink() {
        return this.link ?
            `<a class="column-chart__link" href="${this.link}">View all</a>` :
            "";
    }

    get template() {
        return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${
        this.chartHeight
      }">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header"></div>
          <div data-element="body" class="column-chart__chart"></div>
        </div>
      </div>
    `;
    }

    getSubElements(element) {
        const elements = element.querySelectorAll("[data-element]");

        return [...elements].reduce((accum, subElement) => {
            accum[subElement.dataset.element] = subElement;

            return accum;
        }, {});
    }

    async update(from = this.range.from, to = this.range.to) {
        return await this.getData(from, to);
    }

    destroy() {
        this.element.remove();
    }
}