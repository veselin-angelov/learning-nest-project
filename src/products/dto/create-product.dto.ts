import { ApiProperty } from '@nestjs/swagger';
import { IsCurrency, IsNotEmpty, IsString } from 'class-validator';
import { Decimal128 } from 'mongoose';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsCurrency()
  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  public readonly price: Decimal128;

  @IsString()
  @IsNotEmpty()
  public readonly barcode: string;
}
