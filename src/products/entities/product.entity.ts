import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Decimal128, HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
  toObject: {
    transform: (doc, ret, options) => {
      delete ret._id;
      ret.id = doc.id;
      ret.price = ret.price.toString();

      return ret;
    },
  },
})
export class Product {
  @Exclude()
  @ApiProperty({ name: 'id' })
  public _id: string;

  @Prop({ required: true, unique: true })
  public name: string;

  @ApiProperty({ type: 'string' })
  @Prop({ required: true, type: 'Decimal128' })
  public price: Decimal128;

  @Exclude()
  @ApiHideProperty()
  @Prop({ required: true })
  public barcode: string;

  @Prop()
  public createdAt?: Date;

  @Prop()
  public updatedAt?: Date;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);
