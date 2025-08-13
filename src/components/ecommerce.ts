import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './ecommerce-header';
import './ecommerce-cart';
import './ecommerce-product';
import './ecommerce-catalog';

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

  @state() cartItems: any[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
  @state() _view = window.location.pathname === '/catalogo' ? 'catalog' : 'producto';
  @state() _selectedProduct: any = JSON.parse(localStorage.getItem('selectedProduct') || 'null');

  handleAddToCart(e: any) {
    const { product, quantity } = e.detail;
    const idx = this.cartItems.findIndex((item) => item.id === product.id);
    let newCart;
    if (idx > -1) {
      newCart = [...this.cartItems];
      newCart[idx] = { ...newCart[idx], quantity: newCart[idx].quantity + quantity };
    } else {
      newCart = [...this.cartItems, { ...product, quantity }];
    }
    this.cartItems = newCart;
    localStorage.setItem('cartItems', JSON.stringify(newCart));
  }

  handleCartUpdate(e: any) {
    this.cartItems = e.detail.items;
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  _goToCatalog() {
    window.history.pushState({}, '', '/catalogo');
    this._view = 'catalog';
  }

  _viewProduct(e: any) {
    this._selectedProduct = e.detail.product;
    localStorage.setItem('selectedProduct', JSON.stringify(this._selectedProduct));
    window.history.pushState({}, '', '/producto/' + this._selectedProduct.id);
  }

  render() {
    return html`
      <ecommerce-header .showCatalogLink=${this._view === 'producto'} @go-catalog=${this._goToCatalog}>
        <ecommerce-cart
          slot="cart"
          .items=${this.cartItems}
          @cart-update=${this.handleCartUpdate}
        ></ecommerce-cart>
      </ecommerce-header>
      <main>
        ${this._view === 'catalog'
          ? html`<ecommerce-catalog @view-product=${this._viewProduct}></ecommerce-catalog>`
          : html`<ecommerce-product .product=${this._selectedProduct} @add-to-cart=${this.handleAddToCart}></ecommerce-product>`}
      </main>
    `;
  }
}
