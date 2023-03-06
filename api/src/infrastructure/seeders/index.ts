import { NoteSchema } from '@domain/entities';
import { MongooseConfigService } from '@domain/services';
import { OrmModule } from '@infrastructure/database/orm';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { seeder } from 'nestjs-seeder';

import { NotesSeeder } from './notes.seed';

seeder({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [],
      useClass: MongooseConfigService,
      inject: [],
    }),
    OrmModule.forFeature([{ name: 'Note', schema: NoteSchema }]),
  ],
}).run([NotesSeeder]);
