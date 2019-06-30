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
        :root {
          --grid-width;
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(var(--grid-width), 1fr);
          grid-column-gap: 20px;
          grid-row-gap: 20px;
        }
      `
    ];
  }

  render() {
    return html`
      <div class="grid-container">
        ${repeat(
          new Array(this._height * this._width),
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
    this._height = 4;
    this._width = 5;

    super.style.setProperty("--grid-width", this._width);
  }

  updateGrid() {}
}

window.customElements.define("gallery-page", GalleryPage);
