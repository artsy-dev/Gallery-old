import { html, css } from "lit-element";
import { PageViewElement } from "../components/page-view-element";
import { connect } from "pwa-helpers/connect-mixin";
import sharedStyles from "../components/shared-styles";

import { store } from "../store";
import { repeat } from "lit-html/directives/repeat";

class GalleryPage extends connect(store)(PageViewElement) {
  static get styles() {
    return [
      sharedStyles,
      css`
        .grid-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr min-content;
          grid-column-gap: 20px;
          grid-row-gap: 20px;
        }

        .grid-item {
        }
      `
    ];
  }

  render() {
    return html`
      <div class="grid-container ${this._width}_${this._height}">
        ${repeat(
          new Array(this._height * (this._width + 1)),
          key => key,
          () => html`
            <div class="grid-item">
              <img
                src="https://loremflickr.com/800/450/dog"
                alt="placeholder image"
                height="100%"
                width="100%"
              />
            </div>
          `
        )}
      </div>
    `;
  }

  static get properties() {
    return {
      _categories: Array,
      _height: Number,
      _width: Number
    };
  }

  constructor() {
    super();
    this._height = 3;
    this._width = 4;
  }

  stateChanged(state) {
    this._categories = state.products.categories;
  }
}

window.customElements.define("gallery-page", GalleryPage);
