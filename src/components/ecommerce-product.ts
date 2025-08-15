
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { theme } from '../styles/theme';
import { fetchCatalogProducts, Product } from './dm/productDm';
import { addToCart } from './utils/ecommerce-cart-events';

@customElement('ecommerce-product')
export class EcommerceProduct extends LitElement {
  static styles = [
    theme,
    css`
      .modal-backdrop {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(24,24,24,0.18);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.2s;
        backdrop-filter: blur(2.5px);
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .img-modal {
        position: relative;
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 8px 40px #1e90ff22, 0 8px 40px #0002;
        padding: 2.5rem 2.5rem 2.2rem 2.5rem;
        min-width: 340px;
        min-height: 340px;
        max-width: 90vw;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        animation: modalPop 0.2s;
      }
      @keyframes modalPop {
        from { transform: scale(0.95); opacity: 0.7; }
        to { transform: scale(1); opacity: 1; }
      }
      .modal-img {
        max-width: 440px;
        max-height: 60vh;
        border-radius: 14px;
        box-shadow: 0 4px 24px #1e90ff22;
        background: #f7f5ef;
        object-fit: contain;
        transition: box-shadow 0.2s, transform 0.3s cubic-bezier(.4,2,.3,1), opacity 0.2s;
        margin-bottom: 1.2rem;
        display: block;
        cursor: zoom-in;
      }
      .modal-img.zoomed {
        transform: scale(1.7);
        z-index: 20;
        cursor: zoom-out;
        box-shadow: 0 8px 48px #1e90ff44;
      }
      .modal-thumbs {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 0.7rem;
        margin-top: 1.2rem;
      }
      .modal-thumb {
        width: 48px;
        height: 48px;
        border-radius: 7px;
        box-shadow: 0 1px 4px #0002;
        cursor: pointer;
        border: 2.5px solid #fff;
        background: #f3f3f3;
        object-fit: cover;
        transition: border 0.18s, box-shadow 0.18s;
      }
      .modal-thumb.selected {
        border: 2.5px solid #1e90ff;
        box-shadow: 0 2px 8px #1e90ff22;
      }
      .close-btn {
        position: absolute;
        top: 1.1rem;
        right: 1.1rem;
        background: #f7f5ef;
        border: none;
        border-radius: 50%;
        width: 38px;
        height: 38px;
        font-size: 1.7rem;
        color: #1e90ff;
        cursor: pointer;
        box-shadow: 0 2px 8px #1e90ff22;
        transition: background 0.2s;
        z-index: 10;
      }
      .close-btn:hover {
        background: #1e90ff11;
        color: #181818;
      }
      .arrow-btn {
        background: #f7f5ef;
        border: none;
        border-radius: 50%;
        width: 44px;
        height: 44px;
        font-size: 2rem;
        color: #1e90ff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px #1e90ff22;
        transition: background 0.2s, color 0.2s;
        z-index: 5;
        margin: 0 1.2rem;
      }
      .arrow-btn:disabled {
        color: #bbb;
        background: #fff;
        cursor: not-allowed;
      }
      .arrow-btn.left {
        left: 0.5rem;
      }
      .arrow-btn.right {
        right: 0.5rem;
      }
      .product-container {
        max-width: 900px;
        margin: 2.5rem auto;
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 4px 32px #1e90ff22, 0 2px 12px #0002;
        padding: 2.5rem 2rem 2.2rem 2rem;
        border: 1.5px solid #eaeaea;
        display: flex;
        flex-direction: row;
        gap: 2.5rem;
        align-items: flex-start;
      }
      .product-left {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
      }
      .product-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 1.2rem;
        margin-top: 0.5rem;
      }
      .product-img {
        width: 230px;
        height: 230px;
        object-fit: contain;
        border-radius: 12px;
        background: #f7f5ef;
        margin-bottom: 1.7rem;
        box-shadow: 0 2px 12px #1e90ff22;
        cursor: pointer;
      }
      .product-title {
        font-size: 1.35rem;
        font-weight: 700;
        margin-bottom: 0.6rem;
        color: #181818;
        text-align: center;
        font-family: 'Segoe UI', Arial, sans-serif;
        letter-spacing: 1.5px;
      }
      .product-desc {
        color: #444;
        font-size: 1.07rem;
        margin-bottom: 1.3rem;
        text-align: center;
        font-family: 'Segoe UI', Arial, sans-serif;
      }
      .product-price {
        font-size: 1.22rem;
        color: #1e90ff;
        font-weight: bold;
        margin-bottom: 1.7rem;
      }
      .qty-controls {
        display: flex;
        align-items: center;
        gap: 1.2rem;
        margin-bottom: 1.7rem;
      }
      .qty-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #1e90ff;
        background: #fff;
        color: #1e90ff;
        font-size: 1.25rem;
        cursor: pointer;
        transition: background 0.2s, color 0.2s;
        font-family: 'Segoe UI', Arial, sans-serif;
      }
      .qty-btn:active {
        background: #1e90ff;
        color: #fff;
      }
      .qty-value {
        min-width: 36px;
        text-align: center;
        font-size: 1.13rem;
        color: #1e90ff;
        font-family: 'Segoe UI', Arial, sans-serif;
      }
      .add-cart-btn {
        background: #1e90ff;
        color: #fff;
        border: none;
        border-radius: 8px;
        padding: 0.8rem 2.7rem;
        font-size: 1.13rem;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.18s, color 0.18s, box-shadow 0.18s;
        box-shadow: 0 2px 12px #1e90ff22;
        letter-spacing: 1px;
        font-family: 'Segoe UI', Arial, sans-serif;
      }
      .add-cart-btn:active {
        background: #0d6efd;
        color: #fff;
      }
      .cursor-zoom-in {
        cursor: zoom-in;
      }
      .modal-img-row {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
    `
  ];

  @property({ type: Object }) product: Product | null = null;
  @state() _products: Product[] = [];
  @state() _quantity: number = 1;
  @state() _showModal: boolean = false;
  @state() _modalIndex: number = 0;
  @state() _error: string = '';
  @state() _zoomed: boolean = false;

  async connectedCallback() {
    super.connectedCallback();
    try {
      this._products = await fetchCatalogProducts();
      const id = Number(window.location.pathname.split('/').pop());
      const found = this._products.find(p => p.id === id);
      if (!found) {
        this._error = 'Producto no encontrado.';
        setTimeout(() => window.location.href = '/catalogo', 1200);
      } else {
        this.product = found;
      }
    } catch (e) {
      this._error = 'Error cargando el producto.';
    } finally {
    }
  }
  
  _addToCartLogic() {
    if (!this.product) return;
    addToCart(this.product, this._quantity);
    this._quantity = 1;
  }

  _toggleZoom = () => {
    this._zoomed = !this._zoomed;
  }

  _openModal(idx: number) {
    this._modalIndex = idx;
    this._showModal = true;
    window.addEventListener('keydown', this._onEscClose);
  }

  _closeModal = () => {
    this._showModal = false;
    window.removeEventListener('keydown', this._onEscClose);
  }

  _onBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      this._closeModal();
    }
  }

  _onEscClose = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this._closeModal();
    }
  }

  _prevImg = () => {
    if (this._modalIndex > 0) this._modalIndex--;
  }

  _nextImg = () => {
    if (this.product && this.product.images && this._modalIndex < this.product.images.length - 1) this._modalIndex++;
  }

  _goToImg(idx: number) {
    this._modalIndex = idx;
  }

  _updateQty(delta: number) {
    this._quantity = Math.max(1, this._quantity + delta);
  }

  render() {
    if (this._error) {
      return html`<p style="color:red;">${this._error}</p>`;
    }
    if (!this.product) {
      return html``;
    }
    return html`
      <div class="product-container">
        <div class="product-left">
          <img class="product-img" src="${this.product.images?.[this._modalIndex] ?? ''}" alt="${this.product.title ?? ''}" @click="${() => this._openModal(this._modalIndex)}" style="cursor:zoom-in;" tabindex="0" @keydown="${(e: KeyboardEvent) => {if(e.key==='Enter'){this._openModal(this._modalIndex)}}}" />
          <div class="modal-thumbs">
            ${this.product.images.map((img:string, idx:number) => html`
              <img
                class="modal-thumb${this._modalIndex===idx?' selected':''}"
                src="${img}"
                alt="miniatura"
                @mouseenter="${() => this._goToImg(idx)}"
                @click="${() => this._goToImg(idx)}"
              />
            `)}
          </div>
        </div>
        <div class="product-right">
          <div class="product-title">${this.product.title ?? ''}</div>
          <div class="product-desc">${this.product.description ?? ''}</div>
          <div class="product-price">$${this.product.price?.toFixed(2) ?? ''}</div>
          <div class="qty-controls">
            <button class="qty-btn" @click="${() => this._updateQty(-1)}" aria-label="Disminuir cantidad">-</button>
            <span class="qty-value">${this._quantity}</span>
            <button class="qty-btn" @click="${() => this._updateQty(1)}" aria-label="Aumentar cantidad">+</button>
          </div>
          <button class="add-cart-btn" @click="${this._addToCartLogic}">Agregar al carrito</button>
        </div>
      </div>

      ${this._showModal && this.product.images ? html`
        <div class="modal-backdrop" @click="${this._onBackdropClick}">
          <div class="img-modal" @click="e => e.stopPropagation()">
            <button class="close-btn" @click="${this._closeModal}" aria-label="Cerrar">&times;</button>
            <div class="modal-img-row">
              <button class="arrow-btn left" @click="${this._prevImg}" ?disabled=${this._modalIndex === 0} title="Anterior" aria-label="Anterior">&#8592;</button>
              <img class="modal-img${this._zoomed ? ' zoomed' : ''}" src="${this.product.images[this._modalIndex] ?? ''}" alt="${this.product.title ?? ''}" @click="${this._toggleZoom}" />
              <button class="arrow-btn right" @click="${this._nextImg}" ?disabled=${this._modalIndex === this.product.images.length-1} title="Siguiente" aria-label="Siguiente">&#8594;</button>
            </div>
            <div class="modal-thumbs">
              ${this.product.images.map((img:string, idx:number) => html`
                <img
                  class="modal-thumb${this._modalIndex===idx?' selected':''}"
                  src="${img}"
                  alt="miniatura"
                  @mouseenter="${() => this._goToImg(idx)}"
                  @click="${() => this._goToImg(idx)}"
                />
              `)}
            </div>
          </div>
        </div>
      ` : ''}
    `;
  }
}
