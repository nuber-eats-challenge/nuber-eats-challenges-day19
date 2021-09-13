import { ObjectType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CoreEntity } from "./core.entity";
import { Podcast } from "./podcast.entity";
import { PlayedEpisode } from 'src/podcast/entities/played-episode.entity';

@Entity()
@ObjectType()
export class Episode extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  title: string;

  @Column()
  @Field((type) => String)
  @IsString()
  category: string;

  @ManyToOne(() => Podcast, (podcast) => podcast.episodes, {
    onDelete: 'CASCADE'
  })
  @Field((type) => Podcast)
  podcast: Podcast;

  @OneToMany(() => PlayedEpisode, playedEpisode => playedEpisode.episode)
  @Field(() => [PlayedEpisode], { nullable: true })
  playedEpisodes: PlayedEpisode[];
}
