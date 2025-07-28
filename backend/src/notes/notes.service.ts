import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  findAll() {
    return this.notesRepository.findBy({ archived: false });
  }

  findByTag(tag: string) {
    console.log(`Querying for tag: ${tag}`);
    const query = this.notesRepository
      .createQueryBuilder('note')
      .where('note.tags @> :tag', { tag: `[{"name": "${tag}"}]` })
      .andWhere('note.archived = :archived', { archived: false });
    console.log(`Generated SQL:`, query.getSql());
    return query.getMany().then((results) => {
      console.log(`Results for tag ${tag}:`, results);
      return results;
    });
  }

  async create(createNoteDto: any) {
    const note = this.notesRepository.create(createNoteDto);
    return this.notesRepository.save(note);
  }

  async updateTags(id: number, tagName: string) {
    const note = await this.notesRepository.findOneBy({ id });
    if (note) {
      if (!note.tags) note.tags = [];
      if (!note.tags.some((t) => t.name === tagName)) {
        note.tags.push({ name: tagName });
      }
      return this.notesRepository.save(note);
    }
    return null;
  }

  async archiveNote(id: number) {
    const note = await this.notesRepository.findOneBy({ id });
    if (note) {
      note.archived = true;
      return this.notesRepository.save(note);
    }
    return null;
  }

  async unarchiveNote(id: number) {
    const note = await this.notesRepository.findOneBy({ id });
    if (note) {
      note.archived = false;
      return this.notesRepository.save(note);
    }
    return null;
  }

  removeArchivedNote(id: number) {
    return this.notesRepository.delete({ id, archived: true });
  }

  findArchived() {
    return this.notesRepository.findBy({ archived: true });
  }

  remove(id: number) {
    return this.notesRepository.delete(id);
  }
}
