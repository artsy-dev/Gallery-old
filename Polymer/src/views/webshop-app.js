import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { updateMetadata } from 'pwa-helpers/metadata';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query';
import { router } from '../routes';
import { store } from '../store';

//importing the actions required by this app
import {
	navigate,
	updateDrawerState,
	updateCompactLayout
} from '../actions/app';

import {
  getCategories
} from '../actions/products';

import products from '../reducers/products';
store.addReducers({
  products
});

import sharedStyles from '../components/shared-styles';

//importing web components used on this page
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button';
import '@polymer/paper-item';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/paper-tabs';
import '@polymer/paper-menu-button';
import '@polymer/paper-button';
import '../components/paper-badge';
import '../components/shop-tabs';
import '../components/view-container';
import '../components/shopping-cart';
import '../components/account-options';

//the main custom element
class TodoApp extends connect(store)(LitElement) {

	static get styles () {
		return [
      sharedStyles,
      css`
        :host {
          display: block;
          min-height: 100vh;

          --app-primary-color: #172c50;

          --app-header-background-color: rgba(255,255,255,0.9);
          --app-header-text-color: black;
          
          --app-drawer-width: 256px;

          --paper-badge-background: rgb(23, 44, 80);
        }

        [hidden] {
          display: none;
        }

        app-header {
          background: var(--app-header-background-color);
          color: var(--app-header-text-color);
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          width: 100%;
          z-index: 11;
        }

        app-toolbar {
          z-index: 11;
        }

        [main-title] {
          text-align: center;  
        }
        
        [main-title] router-link {
          font-weight: 600;
          font-size: 16px;
          line-height: 48px;
          margin: 0;
          letter-spacing: 0.3em;
          text-decoration: none;
          color: var(--app-header-text-color);
          pointer-events: auto;
        }

        app-drawer {
          z-index: 13;
        }

        app-drawer router-link {
          color: rgb(117,117,117);
          text-decoration: none;
        }

        .underline {
          transition: color 0.2s ease-in-out;
        }

        .underline:hover {
          color: black;
        }

        #menu-btn {
          display: none;
        }

        #left-bar-item, #right-bar-item {
          width: 88px;
          display: flex;
          justify-content: space-between;
        }

        #right-bar-item {
          flex-direction: row-reverse;
        }

        shopping-cart {
          z-index: 12;
        }

        @media (max-width: 765px) {
          #menu-btn {
            display: block;
          }
        }
      `
    ]
	}

	render() {
		return html`
      <app-drawer ?opened="${this._drawerOpened}">
        
      </app-drawer>
      <view-container .router="${router}"></view-container>
      <footer>
        
      </footer>
		`
	}

	firstUpdated() {
		router.addEventListener('page-change', e => {
      store.dispatch(navigate(e.page));
		})
    store.dispatch(navigate(router.activePage));
    store.dispatch(getCategories());
		installMediaQueryWatcher('(max-width: 765px)', match => store.dispatch(updateCompactLayout(match)));
	}

  update(changedProps) {
    // Sometimes the header doesn't update the layout when the height changed 
    const header = this.renderRoot.getElementById('header');
    if(header) header.resetLayout();
    super.update(changedProps);
  }

	updated(changedProps) {
		if(changedProps.has('_page')) {
			updateMetadata({
				title: `Shop ${this._page.title?' - ' + this._page.title: ''}`,
				description: this._page.title
			})
    }
	}

	static get properties () {
		return {
			_page: Object,
			_categories: Array,
      _drawerOpened: Boolean,
      _compactLayout: Boolean,
      _header: Boolean
    }
	}

	stateChanged(state) {
		this._page = state.app.page;
    this._categories = state.products.categories;
    this._drawerOpened = state.app.drawerOpened;
    this._compactLayout = state.app.compactLayout;
    this._cart = state.app.page.cart;
    this._accountOptions = state.app.page.accountOptions;
    this._header = state.app.page.header;
	}

}

customElements.define('todo-app', TodoApp);