import { Module } from '@nestjs/common';
import { NotesController } from './notes/notes.controller';
import { NotesService } from './notes/notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './notes/note.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost', // Default to 'localhost' if undefined
      port: parseInt(process.env.DB_PORT || '5432', 10), // Default to 5432 if undefined
      username: process.env.DB_USER || 'postgres', // Default to 'postgres' if undefined
      password: process.env.DB_PASSWORD || 'password', // Default to empty string if undefined
      database: process.env.DB_NAME || 'note_app', // Default to 'note_app' if undefined
      entities: [Note],
      synchronize: true, // Auto-create tables (use false in production)
    }),
    TypeOrmModule.forFeature([Note]),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class AppModule {}
