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
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr min-content;
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
      <div class="grid-container">
        ${repeat(
          [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24
          ],
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
      _categories: Array
    };
  }

  stateChanged(state) {
    this._categories = state.products.categories;
  }
}

window.customElements.define("gallery-page", GalleryPage);
