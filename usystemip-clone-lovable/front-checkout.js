// Optional checkout for a separately described product. Keep the URL blank until
// the product, its price and the destination are ready to show to visitors.
export const FRONT_CHECKOUT = Object.freeze({
  url: 'https://pay.pag3b.com/ae3402',
  product: '',
  price: 'US$ 37.12'
});

export function frontCheckout() {
  const { url, product, price } = FRONT_CHECKOUT;
  if (!url.trim() || !product.trim() || !price.trim()) return null;
  try {
    const destination = new URL(url);
    if (destination.protocol !== 'https:' || destination.username || destination.password) return null;
    return { url: destination.href, product: product.trim(), price: price.trim() };
  } catch {
    return null;
  }
}
