import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/ecommerce.ts';

describe('ecommerce-app', () => {
  it('should render ecommerce-app and its children', async () => {
    const el = await fixture(html`<ecommerce-app></ecommerce-app>`);
    expect(el).to.exist;
    const header = el.shadowRoot?.querySelector('ecommerce-header');
    expect(header).to.exist;
    const cart = header?.querySelector('ecommerce-cart');
    expect(cart).to.exist;
    const main = el.shadowRoot?.querySelector('main');
    expect(main).to.exist;
  });
});