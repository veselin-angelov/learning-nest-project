import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await new this.productModel(createProductDto).save();
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().exec();

    return products.map((product) =>
      plainToInstance(Product, {
        id: product.id,
        ...product.toObject({ versionKey: false }),
      }),
    );
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    return plainToInstance(Product, {
      id: product.id,
      ...product.toObject({ versionKey: false }),
    });
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productModel
      .findByIdAndUpdate(id, updateProductDto)
      .exec();

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    Object.assign(product, updateProductDto);

    // return plainToInstance(Product, {
    //   id: product.id,
    //   name: product.name,
    //   price: product.price,
    //   barcode: product.barcode,
    // });
    return plainToInstance(Product, {
      id: product.id,
      ...product.toObject({ versionKey: false }),
    });
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id).exec();

    if (!product) {
      throw new NotFoundException('Product not found!');
    }
  }
}
