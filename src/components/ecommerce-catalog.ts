
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { theme } from '../styles/theme';
import { fetchCatalogProducts, Product } from './dm/productDm';

@customElement('ecommerce-catalog')
export class EcommerceCatalog extends LitElement {
  static styles = [
    theme,
    css`
      :host {
        --main-bg: #fff;
        --main-fg: #181818;
        --main-accent: #1e90ff;
        --main-beige: #f7f5ef;
        --main-card: #fff;
        --main-card-border: #eaeaea;
        --main-card-hover: #f0f4ff;
        --main-shadow: 0 2px 16px #0001;
      }
      .catalog-container {
        max-width: 1100px;
        margin: 2.5rem auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 2.2rem;
      }
      .product-card {
        background: var(--main-card);
        border-radius: 16px;
        box-shadow: var(--main-shadow);
        padding: 2rem 1.2rem 1.5rem 1.2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1.5px solid var(--main-card-border);
        transition: box-shadow 0.18s, border 0.18s, background 0.18s;
        position: relative;
      }
      .product-card:hover {
        box-shadow: 0 6px 32px #1e90ff22;
        border: 1.5px solid var(--main-accent);
        background: var(--main-card-hover);
      }
      .product-img {
        width: 150px;
        height: 150px;
        object-fit: contain;
        border-radius: 10px;
        background: var(--main-beige);
        margin-bottom: 1.1rem;
        box-shadow: 0 1px 6px #0001;
      }
      .product-title {
        font-size: 1.13rem;
        font-weight: 700;
        margin-bottom: 0.3rem;
        color: var(--main-fg);
        text-align: center;
        font-family: 'Segoe UI', Arial, sans-serif;
        letter-spacing: 0.5px;
      }
      .product-desc {
        color: #444;
        font-size: 1.01rem;
        margin-bottom: 0.7rem;
        text-align: center;
        min-height: 38px;
        font-family: 'Segoe UI', Arial, sans-serif;
      }
      .product-price {
        font-size: 1.13rem;
        color: var(--main-accent);
        font-weight: bold;
        margin-bottom: 1.1rem;
      }
      .view-btn {
        background: var(--main-accent);
        color: #fff;
        border: none;
        border-radius: 7px;
        padding: 0.5rem 1.5rem;
        font-size: 1.01rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.18s, color 0.18s, box-shadow 0.18s;
        box-shadow: 0 1px 6px #1e90ff22;
        letter-spacing: 0.5px;
        font-family: 'Segoe UI', Arial, sans-serif;
      }
      .view-btn:active {
        background: #0d6efd;
        color: #fff;
      }
    `
  ];

  @state() _products: Product[] = [];

  connectedCallback() {
    super.connectedCallback();
    this._loadProducts();
  }

  async _loadProducts() {
    this._products = await fetchCatalogProducts();
  }

  _viewProduct(product: any) {
    this.dispatchEvent(new CustomEvent('view-product', {
        detail: { product },
        bubbles: true,
        composed: true
    }));
    window.location.href = '/producto/' + product.id;
  }

  render() {
    return html`
      <div class="catalog-container">
        ${this._products.length === 0
          ? html`<div>Cargando productos...</div>`
          : this._products.filter((product: any) => product.images.length > 0).map((product: any) => html`
              <div class="product-card">
                <img class="product-img" src="${product.images[0]}" alt="${product.title}" />
                <div class="product-title">${product.title}</div>
                <div class="product-desc">${product.description}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="view-btn" @click="${() => this._viewProduct(product)}">Ver detalle</button>
              </div>
            `)
        }
      </div>
    `;
  }
}
