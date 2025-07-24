import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note-dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    // Handles POST request to create a new note
    return this.notesService.create(createNoteDto);
  }

  @Get()
  async findAll() {
    // Handles GET request to retrieve all notes
    return this.notesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // Handles GET request to retrieve a single note by ID
    try {
      return await this.notesService.findOne(parseInt(id));
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: any) {
    // Handles PUT request to update a note by ID
    try {
      return await this.notesService.update(parseInt(id), updateNoteDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // Handles DELETE request to remove a note by ID
    try {
      await this.notesService.remove(parseInt(id));
      return { message: 'Note deleted successfully' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Patch(':id/tags')
  async addTag(@Param('id') id: string, @Body('tagName') tagName: string) {
    // Handles PATCH request to add a tag to a note
    try {
      return await this.notesService.addTagToNote(parseInt(id), tagName);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('tag/:tagName')
  async findByTag(@Param('tagName') tagName: string) {
    // Handles GET request to retrieve notes by tag
    return this.notesService.findByTag(tagName);
  }
}
