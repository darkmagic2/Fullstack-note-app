import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get('tag/:tag')
  findByTag(@Param('tag') tag: string) {
    return this.notesService.findByTag(tag);
  }

  @Post()
  create(@Body() createNoteDto: any) {
    return this.notesService.create(createNoteDto);
  }

  @Patch(':id/tags')
  updateTags(@Param('id') id: string, @Body('tagName') tagName: string) {
    return this.notesService.updateTags(+id, tagName);
  }

  @Patch(':id/archive')
  archive(@Param('id') id: string) {
    return this.notesService.archiveNote(+id);
  }

  @Patch(':id/unarchive')
  unarchive(@Param('id') id: string) {
    return this.notesService.unarchiveNote(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: any) {
    return this.notesService.updateNote(+id, updateNoteDto);
  }

  @Delete(':id/archived')
  removeArchived(@Param('id') id: string) {
    return this.notesService.removeArchivedNote(+id);
  }

  @Get('archived')
  findArchived() {
    return this.notesService.findArchived();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
