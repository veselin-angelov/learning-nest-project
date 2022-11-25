import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  public readonly price: number;

  @IsString()
  @IsNotEmpty()
  public readonly barcode: string;
}
