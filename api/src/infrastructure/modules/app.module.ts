import { AuthModule } from '@domain/modules';
import { CashOutModule } from '@domain/modules/cashout.module';
import { MongooseConfigService } from '@domain/services/mongoose.service';
import { setEnvironment } from '@infrastructure/config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment(),
    }),
    MongooseModule.forRootAsync({
      imports: [],
      useClass: MongooseConfigService,
      inject: [],
    }),
    TerminusModule,
    AuthModule,
    CashOutModule,
    HttpModule,
  ],
})
export class AppModule {}
