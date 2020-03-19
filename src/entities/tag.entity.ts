import { Entity, Column, JoinColumn, ManyToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { ArticleEntity } from './article.entity';

@Entity('tags')
export class TagEntity extends AbstractEntity {
  @Column()
  tag: string;

  @ManyToMany(
    type => ArticleEntity,
    article => article.tagList,
  )
  @JoinColumn()
  articles: ArticleEntity[];

  toJSON() {
    return this.tag;
  }
}
