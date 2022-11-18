import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [new Product('Cheese', 1000)];

  create(createProductDto: CreateProductDto) {
    this.products.push(
      new Product(createProductDto.name, createProductDto.price),
    );
  }

  findAll() {
    return [...this.products];
  }

  findOne(id: number) {
    const product = this.findProductById(id);

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    return { ...product };
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    let product = this.findProductById(id);

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    // console.log(updateProductDto);

    // product.set(key, updateProductDto[key as keyof UpdateProductDto]);

    // if (!product.hasOwnProperty(key as keyof Product)) {
    //   continue;
    // }

    for (const key in updateProductDto) {
      console.log(product[key as keyof Omit<Product, 'id'>]);
      console.log(updateProductDto[key as keyof UpdateProductDto]);

      product[key as keyof Omit<Product, 'id'>] =
        updateProductDto[key as keyof UpdateProductDto];
    }

    return { ...product };
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
