import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor() {}

  createMongooseOptions(): MongooseModuleOptions {
    const authSource = process.env.MONGO_AUTH_SOURCE;
    const config: any = {
      uri: process.env.MONGODB_URI,
      dbName: process.env.MONGO_DB,
      useNewUrlParser: true,
      useUnifiedTopology: false,
      autoIndex: true,
    };

    if (authSource) {
      config.authSource = authSource;
    }

    return config;
  }
}
