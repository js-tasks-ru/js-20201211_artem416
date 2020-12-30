export default class SortableTable {
    element = document.createElement("div");
    subElements = {};

    constructor(headersConfig = [], { data = [] } = {}) {
        this.headersConfig = headersConfig;
        this.data = data;
        this.render();
    }

    getTableHeader() {
        let headerTemplate = `<div data-element="header" class="sortable-table__header sortable-table__row">`;
        for (let i = 0; i < this.headersConfig.length; i++) {
            headerTemplate += `    <div class="sortable-table__cell" data-id="${this.headersConfig[i].id}" data-sortable=""${this.headersConfig[i].sortable}" data-order="">
            <span>${this.headersConfig[i].title}</span>
          </div>`;
        }
        headerTemplate += `</div>`;
        return headerTemplate;
    }

    getTableBody() {
        return `
      <div data-element="body" class="sortable-table__body">
        ${this.getTableRows(this.data)}
      </div>`;
    }

    getTableRows(data) {
        return data
            .map((item) => {
                return `
        <a href="/products/${item.id}" class="sortable-table__row">
          ${this.getTableRow(item)}
        </a>`;
            })
            .join("");
    }

    getTableRow(item) {
        const cells = this.headersConfig.map(({ id, template }) => {
            return {
                id,
                template,
            };
        });

        return cells
            .map(({ id, template }) => {
                return template ?
                    template(item[id]) :
                    `<div class="sortable-table__cell">${item[id]}</div>`;
            })
            .join("");
    }

    getTable() {
        return `
      <div class="sortable-table">
        ${this.getTableHeader()}
        ${this.getTableBody()}
      </div>`;
    }

    render() {
        this.element.innerHTML = this.getTable();
        this.element = this.element.firstElementChild;
        this.subElements = this.getSubElements(this.element);
    }

    sort(field, order) {
        const sortedData = this.sortData(field, order);

        const allColumns = this.element.querySelectorAll(
            ".sortable-table__cell[data-id]"
        );
        const currentColumn = this.element.querySelector(
            `.sortable-table__cell[data-id="${field}"]`
        );

        allColumns.forEach((column) => {
            column.dataset.order = "";
        });

        currentColumn.dataset.order = order;

        this.subElements.body.innerHTML = this.getTableRows(sortedData);
    }

    sortData(field, order) {
        const arr = [...this.data];
        const column = this.headersConfig.find((item) => item.id === field);
        const { sortType, customSorting } = column;
        const direction = order === "asc" ? 1 : -1;

        return arr.sort((a, b) => {
            switch (sortType) {
                case "number":
                    return direction * (a[field] - b[field]);
                case "string":
                    return direction * a[field].localeCompare(b[field], "ru");
                case "custom":
                    return direction * customSorting(a, b);
                default:
                    return direction * (a[field] - b[field]);
            }
        });
    }

    getSubElements(element) {
        const elements = element.querySelectorAll("[data-element]");

        return [...elements].reduce((accum, subElement) => {
            accum[subElement.dataset.element] = subElement;

            return accum;
        }, {});
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
        this.subElements = {};
    }
}