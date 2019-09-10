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
          grid-column-gap: 10px;
          grid-row-gap: 10px;
        }

        @keyframes crawl-top {
          0% {
            top: 0px;
          }
          100% {
            top: -6000px;
          }
        }
        .crawl {
          position: relative;
          animation: crawl-top 300s linear;
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
    this._height = 8;
    this._width = 6;

    super.style.setProperty("--grid-width", this._width);
  }

  updateGrid(width, height) {
    if (width) this._width = width;
    if (height) this._height = height;

    super.style.setProperty("--grid-width", this._width);
  }

  firstUpdated() {
    setTimeout(() => {
      this.animateElements();
    }, 1000);

  }

  animateElements() {
    let selectedElement = this.renderRoot.querySelector(`.grid-container:nth-child(1)`);
    
    console.log(selectedElement.children[0]);
    for(var i = 0; i < 20; i+=5){
      selectedElement.children[i].classList.add('crawl');
    }

    /*
        for(var i = 0;i < 5;i++){
      selectedElement.children[i].classList.add('crawl');
    }
    */
    
  }
}



window.customElements.define("gallery-page", GalleryPage);
