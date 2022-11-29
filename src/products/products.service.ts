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
      plainToInstance(Product, product.toObject({ versionKey: false })),
    );
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    return plainToInstance(Product, product.toObject({ versionKey: false }));
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

    // Object.assign(product, updateProductDto);
    // Тука идеята е че взимам ъпдейтнатия обект, за да го върна, ама не съм сигурен дали трябва, защото ппц update не трябва ли да връща празен респонс
    const newProduct = await this.productModel.findById(id).exec();

    if (!newProduct) {
      throw new NotFoundException('Product not found!');
    }

    return plainToInstance(Product, newProduct.toObject({ versionKey: false }));
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id).exec();

    if (!product) {
      throw new NotFoundException('Product not found!');
    }
  }
}
