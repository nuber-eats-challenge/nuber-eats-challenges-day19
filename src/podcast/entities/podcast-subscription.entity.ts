import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Podcast } from "./podcast.entity";
import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from "./core.entity";

@Entity()
@ObjectType()
export class PodcastSubscription extends CoreEntity{
  @ManyToOne(() => User, user => user.podcastSubscriptions)
  @Field(() => Number)
  @Column()
  user: number;

  @ManyToOne(() => Podcast, podcast => podcast.podcastSubscriptions)
  @Field(() => Number)
  @Column()
  podcast: number;
}