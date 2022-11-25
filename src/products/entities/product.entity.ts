import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Exclude()
  @ApiProperty({ name: 'id' })
  public _id: string;

  @Prop({ required: true, unique: true })
  public name: string;

  @Prop({ required: true })
  public price: number;

  @Exclude()
  @ApiHideProperty()
  @Prop({ required: true })
  public barcode: string;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);
