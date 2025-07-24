import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/create-note-dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = this.noteRepository.create({
      ...createNoteDto,
      createdAt: new Date(),
    });
    return this.noteRepository.save(note);
  }

  async findAll(): Promise<Note[]> {
    return this.noteRepository.find({ relations: ['tags'] });
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    if (!note) {
      throw new Error(`Note with ID ${id} not found`);
    }
    return note;
  }

  async update(id: number, updateNoteDto: any): Promise<Note> {
    const note = await this.noteRepository.preload({
      id,
      ...updateNoteDto,
    });
    if (!note) {
      throw new Error(`Note with ID ${id} not found`);
    }
    return this.noteRepository.save(note);
  }

  async remove(id: number): Promise<void> {
    const result = await this.noteRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Note with ID ${id} not found`);
    }
  }

  async addTagToNote(noteId: number, tagName: string): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id: noteId },
      relations: ['tags'],
    });
    if (!note) {
      throw new Error(`Note with ID ${noteId} not found`);
    }
    let tag = await this.tagRepository.findOne({ where: { name: tagName } });
    if (!tag) {
      tag = this.tagRepository.create({ name: tagName });
      await this.tagRepository.save(tag);
    }
    note.tags = note.tags || [];
    if (!note.tags.some((t) => t.name === tagName)) {
      note.tags.push(tag);
      return this.noteRepository.save(note);
    }
    return note;
  }

  async findByTag(tagName: string): Promise<Note[]> {
    const tag = await this.tagRepository.findOne({
      where: { name: tagName },
      relations: ['notes'],
    });
    if (!tag) {
      return [];
    }
    return tag.notes.map((note) => ({
      ...note,
      tags: note.tags || [], // Ensure tags is always an array
    }));
  }
}
