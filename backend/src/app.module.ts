import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig()), // Registers the TypeORM configuration
    NotesModule, // Includes the notes module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
