import { expect, fixture, html } from '@open-wc/testing';
import { EcommerceApp } from '../src/components/ecommerce.ts';
import '../src/components/ecommerce.ts';

describe('ecommerce-app', () => {
  it('sum method returns correct result', async () => {
    const el = await fixture(html`<ecommerce-app></ecommerce-app>`);
    const app = el as EcommerceApp;
    expect(app.sum(2, 3)).to.equal(5);
    expect(app.sum(-1, 1)).to.equal(0);
    expect(app.sum(0, 0)).to.equal(0);
    expect(app.sum(100, 200)).to.equal(300);
  });
});
