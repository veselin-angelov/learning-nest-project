export class Product {
  private static productsCount = 0;

  public readonly id: number;
  public name: string;
  public price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
    this.id = ++Product.productsCount;
  }

  // can we make newValue be of type "Product[key]"
  // set(key: string, newValue: unknown) {
  //   // this['name'] = 'Vesko';
  //   console.log(this[key as keyof Omit<Product, 'id'>]);

  //   this[key as keyof Omit<Product, 'id'>] = newValue;
  // }
}
