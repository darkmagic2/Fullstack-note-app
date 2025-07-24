import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from './entities/tag.entity';

// Defining the Note entity for the database
@Entity()
export class Note {
  @PrimaryGeneratedColumn() // Automatically generates a unique ID for each note
  id: number;

  @Column() // Stores the title of the note
  title: string;

  @Column() // Stores the content of the note
  content: string;

  @Column({ nullable: true }) // Stores the creation date, can be null
  createdAt: Date;

  @ManyToMany(() => Tag, (tag) => tag.notes) // Defines a many-to-many relationship with Tag
  @JoinTable() // Manages the junction table for the relationship
  tags: Tag[]; // Array of associated tags
}
