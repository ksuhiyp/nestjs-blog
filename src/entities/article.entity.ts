import { Entity, Column, BeforeInsert, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import * as slug from 'slug';
import { UserEntity } from './user.entity';

@Entity('articles')
export class ArticleEntity extends AbstractEntity {
  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  body: string;

  // @Column('simple-array')
  // tagList: string[];

  @ManyToOne(
    type => UserEntity,
    user => user.articles,
  )
  author: UserEntity;

  // @OneToMany(type => Comment, comment => comment.article, {eager: true})
  // @JoinColumn()
  // comments: Comment[];

  @Column({ default: 0 })
  favoriteCount: number;

  @BeforeInsert()
  generateSlug() {
    this.slug =
      slug(this.title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }
}
