import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class Product {
  private static productIds = 0;

  public readonly id: number;
  public name: string;
  public price: number;

  @Exclude()
  @ApiHideProperty()
  public barcode: string;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
    this.id = ++Product.productIds;
  }
}
