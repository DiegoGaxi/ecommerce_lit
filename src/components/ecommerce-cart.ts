import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { theme } from '../styles/theme';

@customElement('ecommerce-cart')
export class EcommerceCart extends LitElement {
  static styles = [
    theme,
    css`
      .icon-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.7rem;
        color: #0ff;
        position: relative;
        transition: color 0.18s, text-shadow 0.18s;
        text-shadow: 0 0 8px #0ffb;
      }
      .icon-btn:hover {
        color: #fff;
        text-shadow: 0 0 16px #0ffb, 0 0 2px #fff;
      }
      .cart-badge {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #0ff;
        color: #222;
        border-radius: 50%;
        font-size: 0.85rem;
        padding: 2px 7px;
        font-family: 'Orbitron', 'Segoe UI', Arial, sans-serif;
        font-weight: bold;
        box-shadow: 0 0 8px #0ffb;
      }
      .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(24,24,24,0.18);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        min-width: 100vw;
        backdrop-filter: blur(2.5px);
      }
      .cart-modal {
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 8px 40px #1e90ff22, 0 4px 32px #0002;
        min-width: 340px;
        max-width: 96vw;
        min-height: 220px;
        max-height: 90vh;
        padding: 2.2rem 2.2rem 1.7rem 2.2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1.5px solid #eaeaea;
        position: relative;
        justify-content: center;
      }
        padding: 2rem 1.5rem 1.5rem 1.5rem;
        min-width: 320px;
        max-width: 95vw;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
      }
      .cart-modal h2 {
        margin-top: 0;
        margin-bottom: 1.2rem;
        font-size: 1.2rem;
        color: var(--color-primary);
      }
      .close-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.3rem;
        color: #888;
        cursor: pointer;
      }
      .cart-list {
        margin-bottom: 1.2rem;
      }
      .cart-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid #eee;
        padding-bottom: 0.7rem;
      }
      .cart-item-img {
        width: 48px;
        height: 48px;
        object-fit: cover;
        border-radius: 6px;
        background: #f3f3f3;
      }
      .cart-item-info {
        flex: 1;
      }
      .cart-item-title {
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 0.2rem;
      }
      .cart-item-qty {
        font-size: 0.95rem;
        color: #666;
      }
      .cart-item-price {
        font-size: 1rem;
        color: var(--color-primary);
        font-weight: 600;
      }
      .remove-btn {
        background: none;
        border: none;
        color: #e74c3c;
        font-size: 1.1rem;
        cursor: pointer;
        margin-left: 0.5rem;
      }
      .subtotal {
        text-align: right;
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 1.2rem;
        color: var(--color-primary);
      }
      .pay-btn {
        width: 100%;
        background: var(--color-primary);
        color: #fff;
        border: none;
        border-radius: 6px;
        padding: 0.7rem 0;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
        box-shadow: 0 2px 8px #0001;
      }
      .pay-btn:active {
        background: var(--color-secondary);
      }
      .empty-cart {
        text-align: center;
        color: #888;
        margin: 2rem 0 1rem 0;
      }
    `
  ];

  static get properties() {
    return {
        items: { type: Array },
        _cartCount: { type: Number },
        _open: { type: Boolean }
    };
  }

  items: any[] = [];
  _open = false;

  get _cartCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  _openModal() {
    this._open = true;
    window.addEventListener('keydown', this._onEscClose);
  }

  _closeModal() {
    this._open = false;
    window.removeEventListener('keydown', this._onEscClose);
  }

  _onBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      this._closeModal();
    }
  }

  _onEscClose = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this._closeModal();
    }
  }

  _removeItem(index: number) {
    const newItems = [...this.items];
    newItems.splice(index, 1);
    this.dispatchEvent(new CustomEvent('cart-update', {
      detail: { items: newItems },
      bubbles: true,
      composed: true
    }));
  }

  get _total() {
    const items: any[] = this.items;
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  render() {
    const items: any[] = this.items;
    return html`
      <button class="icon-btn" title="Cart" @click="${this._openModal}">
        <span>🛒</span>
        ${this._cartCount > 0
          ? html`<span class="cart-badge">${this._cartCount}</span>`
          : ''}
      </button>
      ${this._open ? html`
        <div class="modal-backdrop" @click="${this._onBackdropClick}">
          <div class="cart-modal">
            <button class="close-btn" @click="${this._closeModal}">&times;</button>
            <h2>Cart</h2>
            <div class="cart-list">
              ${items.length === 0 ? html`<div class="empty-cart">El carrito esta vació.</div>` 
                : 
                items.map((item, i) => html`
                <div class="cart-item">
                  <img class="cart-item-img" src="${item.images[0]}" alt="${item.title}" />
                  <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-qty">Qty: ${item.quantity}</div>
                  </div>
                  <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                  <button class="remove-btn" @click="${() => this._removeItem(i)}" title="Remove">🗑️</button>
                </div>
              `)}
            </div>
            <div class="subtotal" ?hidden=${items.length === 0}>Total: $ ${this._total.toFixed(2)}</div>
            <button class="pay-btn" ?hidden=${items.length === 0}>Pagar</button>
          </div>
        </div>
      ` : ''}
    `;
  }
}
