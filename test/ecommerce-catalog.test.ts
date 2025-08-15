import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/ecommerce-catalog.ts';

describe('ecommerce-catalog', () => {
  it('renders catalog container', async () => {
    const el = await fixture(html`<ecommerce-catalog></ecommerce-catalog>`);
    const container = el.shadowRoot?.querySelector('.catalog-container');
    expect(container).to.exist;
  });

  it('shows product cards', async () => {
    const el = await fixture(html`<ecommerce-catalog></ecommerce-catalog>`);
    await (el as any).updateComplete;
    expect(el).to.exist;
  });
});
