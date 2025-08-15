import { ToastMessage } from './toast-message';
import { LitElement, html, css } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import './ecommerce-header';
import './ecommerce-cart';
import './ecommerce-product';
import './ecommerce-catalog';
import './toast-message';

@customElement('ecommerce-app')
export class EcommerceApp extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        background: var(--color-background);
        min-height: 100vh;
      }
      main {
        margin-top: 2rem;
      }
    `
  ];

  @state() _view = window.location.pathname === '/catalogo' ? 'catalog' : 'producto';
  @state() _selectedProduct: any = JSON.parse(localStorage.getItem('') || 'null');
  @query('toast-message') toastRef!: ToastMessage;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('cart-toast', this._showToast);
  }

  disconnectedCallback() {
    window.removeEventListener('cart-toast', this._showToast);
    super.disconnectedCallback();
  }

  _showToast = (e: any) => {
    const { message, type } = e.detail;
    this.toastRef?.show(message, type);
  }

  sum(a: number, b: number) {
    return a + b;
  }

  render() {
    return html`
      <toast-message></toast-message>
      <ecommerce-header>
        <ecommerce-cart slot="cart"></ecommerce-cart>
      </ecommerce-header>
      <main>
        ${this._view === 'catalog'
          ? html`<ecommerce-catalog></ecommerce-catalog>`
          : html`<ecommerce-product></ecommerce-product>`}
      </main>
    `;
  }
}
