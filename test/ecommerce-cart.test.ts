import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/ecommerce-cart.ts';

describe('ecommerce-cart', () => {
  it('renders cart icon and badge', async () => {
    const el = await fixture(html`<ecommerce-cart></ecommerce-cart>`);
    const btn = el.shadowRoot?.querySelector('.icon-btn');
    expect(btn).to.exist;
    // Badge should be hidden if cart is empty
    const badge = el.shadowRoot?.querySelector('.cart-badge');
    expect(badge).to.not.exist;
  });

  it('opens modal on click', async () => {
    const el = await fixture(html`<ecommerce-cart></ecommerce-cart>`);
    const btn = el.shadowRoot?.querySelector('.icon-btn');
    btn?.dispatchEvent(new MouseEvent('click'));
  await (el as any).updateComplete;
    const modal = el.shadowRoot?.querySelector('.cart-modal');
    expect(modal).to.exist;
  });
});
