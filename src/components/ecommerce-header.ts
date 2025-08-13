import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { theme } from '../styles/theme';

@customElement('ecommerce-header')
export class EcommerceHeader extends LitElement {
  static styles = [
    theme,
    css`
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.2rem 2.5rem;
        background: #fff;
        box-shadow: 0 2px 12px #0001;
        border-bottom: 1.5px solid #eaeaea;
        position: relative;
        z-index: 10;
      }
      .logo {
        font-size: 2rem;
        font-weight: bold;
        color: #181818;
        letter-spacing: 2px;
        font-family: 'Segoe UI', Arial, sans-serif;
        user-select: none;
      }
      nav {
        display: flex;
        align-items: center;
        gap: 2.2rem;
      }
      .nav-link {
        color: #181818;
        font-size: 1.13rem;
        font-family: 'Segoe UI', Arial, sans-serif;
        font-weight: 500;
        text-decoration: none;
        letter-spacing: 1px;
        padding: 0.2rem 0.7rem;
        border-radius: 6px;
        transition: background 0.18s, color 0.18s, box-shadow 0.18s;
        position: relative;
      }
      .nav-link:hover, .nav-link.active {
        background: #f7f5ef;
        color: #1e90ff;
        box-shadow: 0 0 8px #1e90ff22;
      }
      .header-actions {
        display: flex;
        align-items: center;
        gap: 1.7rem;
      }
    `
  ];


  static get properties() {
    return {
      showCatalogLink: { type: Boolean }
    };
  }

  showCatalogLink = false;

  constructor() {
    super();
    this.showCatalogLink = false;
  }

  _goToCatalog(e?: Event) {
    if (e) e.preventDefault();
    window.history.pushState({}, '', '/catalogo');
    this.dispatchEvent(new CustomEvent('go-catalog', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <header class="header">
        <div class="logo">MyShop</div>
        <nav>
          <a class="nav-link" href="#" @click="${this._goToCatalog}">Catálogo</a>
          <a class="nav-link" href="#" @click="e => e.preventDefault()">Ofertas</a>
          <a class="nav-link" href="#" @click="e => e.preventDefault()">Novedades</a>
          <a class="nav-link" href="#" @click="e => e.preventDefault()">Soporte</a>
          <a class="nav-link" href="#" @click="e => e.preventDefault()">Mi Cuenta</a>
        </nav>
        <div class="header-actions">
          <slot name="cart"></slot>
        </div>
      </header>
    `;
  }
}
