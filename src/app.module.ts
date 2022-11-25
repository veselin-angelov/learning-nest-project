import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (cfg: ConfigService) => ({
        uri: `mongodb+srv://${cfg.get<string>('MONGO_USER')}:${cfg.get<string>(
          'MONGO_PASSWORD',
        )}@cluster0.ry6rave.mongodb.net/${cfg.get<string>(
          'MONGO_DB',
        )}?retryWrites=true&w=majority`,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
