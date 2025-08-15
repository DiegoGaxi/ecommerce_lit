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
        padding: 0.7rem 1.5rem;
        background: #fff;
        box-shadow: 0 1px 8px #0001;
        border-bottom: 1px solid #eee;
        position: relative;
        z-index: 10;
      }
      .logo {
        font-size: 1.45rem;
        font-weight: 700;
        color: #1e90ff;
        letter-spacing: 1.5px;
        font-family: 'Segoe UI', Arial, sans-serif;
        user-select: none;
        margin-right: 1.5rem;
      }
      nav {
        display: flex;
        align-items: center;
        gap: 1.2rem;
      }
      .nav-link {
        color: #222;
        font-size: 1.01rem;
        font-family: 'Segoe UI', Arial, sans-serif;
        font-weight: 500;
        text-decoration: none;
        letter-spacing: 0.5px;
        padding: 0.15rem 0.6rem;
        border-radius: 5px;
        transition: background 0.18s, color 0.18s, box-shadow 0.18s;
        position: relative;
      }
      .nav-link:hover, .nav-link.active {
        background: #f7f5ef;
        color: #1e90ff;
        box-shadow: 0 0 6px #1e90ff22;
      }
      .header-actions {
        display: flex;
        align-items: center;
        gap: 1.1rem;
      }
    `
  ];

  static get properties() {
    return {
      showCatalogLink: { type: Boolean }
    };
  }

  showCatalogLink = false;

  _goToCatalog(e?: Event) {
    if (e) e.preventDefault();
    window.location.href = '/catalogo';
  }

  render() {
    return html`
      <header class="header">
        <a style="text-decoration: none;" href="#" @click="${this._goToCatalog}"><div class="logo">Tienda</div></a>
        <nav>
          <a class="nav-link" href="#" @click="${this._goToCatalog}">Catálogo</a>
          <a class="nav-link" href="#" @click="${this._goToCatalog}">Ofertas</a>
          <a class="nav-link" href="#" @click="${this._goToCatalog}">Novedades</a>
          <a class="nav-link" href="#" @click="${this._goToCatalog}">Soporte</a>
          <a class="nav-link" href="#" @click="${this._goToCatalog}">Mi Cuenta</a>
        </nav>
        <div class="header-actions">
          <slot name="cart"></slot>
        </div>
      </header>
    `;
  }
}
