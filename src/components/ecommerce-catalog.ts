
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
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
        max-width: 1200px;
        margin: 2.5rem auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2.5rem;
      }
      .product-card {
        background: #fff;
        border-radius: 14px;
        box-shadow: 0 2px 16px #0001;
        padding: 1.5rem 1.2rem 1.2rem 1.2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #eee;
        transition: box-shadow 0.18s, border 0.18s, background 0.18s;
        position: relative;
        min-height: 340px;
      }
      .product-card:hover {
        box-shadow: 0 8px 32px #1e90ff22;
        border: 1px solid #1e90ff;
        background: #f8fbff;
      }
      .product-img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 12px;
        background: #f7f5ef;
        margin-bottom: 1.2rem;
        box-shadow: 0 2px 12px #1e90ff11;
        transition: box-shadow 0.18s;
      }
      .product-title {
        font-size: 1.18rem;
        font-weight: 700;
        margin-bottom: 0.2rem;
        color: #222;
        text-align: center;
        font-family: 'Segoe UI', Arial, sans-serif;
        letter-spacing: 0.5px;
      }
      .product-desc {
        color: #666;
        font-size: 1.03rem;
        margin-bottom: 0.7rem;
        text-align: center;
        font-family: 'Segoe UI', Arial, sans-serif;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        min-height: 2.2em;
        max-height: 2.2em;
        line-height: 1.1em;
      }
      .product-price {
        font-size: 1.15rem;
        color: #1e90ff;
        font-weight: bold;
        margin-bottom: 1.1rem;
      }
      .view-btn {
        background: #1e90ff;
        color: #fff;
        border: none;
        border-radius: 6px;
        padding: 0.5rem 1.5rem;
        font-size: 1.03rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.18s, color 0.18s, box-shadow 0.18s;
        box-shadow: 0 1px 6px #1e90ff22;
        letter-spacing: 0.5px;
        font-family: 'Segoe UI', Arial, sans-serif;
        margin-top: auto;
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

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  async _loadProducts() {
    this._products = await fetchCatalogProducts();
  }

  _viewProduct(product: any) {
    window.location.href = '/producto/' + product.id;
  }

  get filteredProducts() {
    return this._products.filter((product: any) => {
              const img = product.images?.[0];
              // Excluye imagenes placeholder y vacias
              if (!img || typeof img !== 'string') return false;
              if (img.trim() === '' || img.includes('placeimg') || img.includes('pravatar') || img.includes('placeholder') || img.match(/(600x400|no-image|notfound|default)/i)) return false;
              return true;
            })
  }

  render() {
    return html`
      <div class="catalog-container">
        ${
          this.filteredProducts
            .map((product: any) => html`
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
