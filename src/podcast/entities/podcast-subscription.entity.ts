import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Podcast } from "./podcast.entity";
import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from "./core.entity";

@Entity()
@ObjectType()
export class PodcastSubscription extends CoreEntity{
  @ManyToOne(() => User, user => user.podcastSubscriptions)
  @Field(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Podcast, podcast => podcast.podcastSubscriptions, { eager: true })
  @Field(() => Podcast)
  @JoinColumn()
  podcast: Podcast;
}