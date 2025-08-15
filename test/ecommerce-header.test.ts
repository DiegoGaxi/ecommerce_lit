import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/ecommerce-header.ts';

describe('ecommerce-header', () => {
  it('renders logo and catalog link', async () => {
    const el = await fixture(html`<ecommerce-header></ecommerce-header>`);
    const logo = el.shadowRoot?.querySelector('.logo');
    expect(logo?.textContent).to.include('Tienda');
    const catalogLink = el.shadowRoot?.querySelector('.nav-link');
    expect(catalogLink?.textContent).to.include('Catálogo');
  });
});
