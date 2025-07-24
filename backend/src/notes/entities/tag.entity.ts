import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Note } from '../note.entity';

// Defining the Tag entity for the database
@Entity()
export class Tag {
  @PrimaryGeneratedColumn() // Automatically generates a unique ID for each tag
  id: number;

  @Column() // Stores the name of the tag
  name: string;

  @ManyToMany(() => Note, (note) => note.tags) // Defines a many-to-many relationship with Note
  notes: Note[]; // Array of associated notes
}
