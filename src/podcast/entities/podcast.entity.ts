import { Episode } from "./episode.entity";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { IsString, Min, Max, IsNumber } from "class-validator";
import { Column, Entity, OneToMany, ManyToOne, RelationId } from "typeorm";
import { CoreEntity } from "./core.entity";
import { Review } from "./review.entity";
import { User } from "../../users/entities/user.entity";
import { PodcastSubscription } from 'src/podcast/entities/podcast-subscription.entity';

@Entity()
@ObjectType()
export class Podcast extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  title: string;

  @Column()
  @Field((type) => String)
  @IsString()
  category: string;

  @Column({ default: 0 })
  @Field((type) => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.podcasts, {
    onDelete: "CASCADE"
  })
  creator: User;

  @RelationId((podcast: Podcast) => podcast.creator)
  creatorId: number;

  @OneToMany(() => Episode, (episode) => episode.podcast, { eager: true })
  @Field((type) => [Episode])
  episodes: Episode[];

  @OneToMany(() => Review, (review) => review.podcast, { eager: true })
  @Field((type) => [Review])
  reviews: Review[];

  @OneToMany(() => PodcastSubscription, podcastSubscription => podcastSubscription.podcast)
  @Field(() => [PodcastSubscription], { nullable: true })
  podcastSubscriptions: PodcastSubscription[];
}
