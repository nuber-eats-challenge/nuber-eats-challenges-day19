import { Field, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/users/entities/core.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Episode } from "./episode.entity";

@Entity()
@ObjectType()
export class PlayedEpisode extends CoreEntity{
  @ManyToOne(() => User, user => user.playedEpisodes)
  @Field(() => Number)
  @JoinColumn()
  user: number;

  @ManyToOne(() => Episode, episode => episode.playedEpisodes)
  @Field(() => Number)
  @JoinColumn()
  episode: number;
}