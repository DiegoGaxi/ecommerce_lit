import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('toast-message')
export class ToastMessage extends LitElement {
  static styles = css`
    .toast {
      position: fixed;
      bottom: 2.5rem;
      left: 50%;
      transform: translateX(-50%);
      min-width: 220px;
      max-width: 90vw;
      background: #181818ee;
      color: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 24px #0003;
      padding: 1rem 2.2rem;
      font-size: 1.07rem;
      font-family: 'Segoe UI', Arial, sans-serif;
      display: flex;
      align-items: center;
      gap: 1rem;
      opacity: 0;
      pointer-events: none;
      animation: fadeInToast 0.3s forwards;
      z-index: 9999;
    }
    @keyframes fadeInToast {
      from { opacity: 0; transform: translateX(-50%) translateY(30px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    .toast.hide {
      animation: fadeOutToast 0.3s forwards;
    }
    @keyframes fadeOutToast {
      from { opacity: 1; transform: translateX(-50%) translateY(0); }
      to { opacity: 0; transform: translateX(-50%) translateY(30px); }
    }
    .success { background: #1e90ffee; }
    .error { background: #ff7d1aee; }
    .info { background: #181818ee; }
  `;

  @property({ type: String }) message = '';
  @property({ type: String }) type: 'success' | 'error' | 'info' = 'info';
  @state() private visible = false;

  show(msg: string, type: 'success' | 'error' | 'info' = 'info', duration = 2500) {
    this.message = msg;
    this.type = type;
    this.visible = true;
    setTimeout(() => this.hide(), duration);
  }

  hide() {
    this.visible = false;
  }

  render() {
    return this.visible
      ? html`<div class="toast ${this.type}">${this.message}</div>`
      : html``;
  }
}
