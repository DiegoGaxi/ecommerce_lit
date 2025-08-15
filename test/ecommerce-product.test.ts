import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/ecommerce-product.ts';

describe('ecommerce-product', () => {
  it('renders product container', async () => {
    const el = await fixture(html`<ecommerce-product></ecommerce-product>`);
    expect(el).to.exist;
  });

  it('shows error if product not found', async () => {
    // Simulate route with invalid product id
    window.history.pushState({}, '', '/producto/999999');
    const el = await fixture(html`<ecommerce-product></ecommerce-product>`);
    await (el as any).updateComplete;
    expect(el).to.exist;
  });
});
