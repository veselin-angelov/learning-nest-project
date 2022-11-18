import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    new Product({ name: 'Cheese', price: 1000, barcode: '1984asd3434d' }),
  ];

  create(createProductDto: CreateProductDto) {
    this.products.push(new Product(createProductDto));
  }

  findAll() {
    return this.products.map((product) => plainToInstance(Product, product));
  }

  findOne(id: number) {
    const product = this.findProductById(id);

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    return plainToInstance(Product, product);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const product = this.findProductById(id);

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    Object.assign(product, updateProductDto);

    return plainToInstance(Product, product);
  }

  remove(id: number) {
    const product = this.findProductById(id);

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    const index = this.products.indexOf(product);

    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

  private findProductById(id: number) {
    return this.products.find((p) => p.id === id);
  }
}
