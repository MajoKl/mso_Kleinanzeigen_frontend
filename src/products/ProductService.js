export class ProductService {
  async getProductsSmall() {
    const res = await fetch("data/products-small.json");
    const d = await res.json();
    return d.data;
  }

  getProducts() {
    return fetch("data/products.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  async getProductsWithOrdersSmall() {
    const res = await fetch("data/products-orders-small.json");
    const d = await res.json();
    return d.data;
  }
}
//   .then((res) => res.json())
//   .then((d) => d.data);
