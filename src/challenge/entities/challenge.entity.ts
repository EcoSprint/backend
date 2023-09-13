import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChallengeStatus } from './challenge-status.entity';

export enum Difficulty {
  EASY,
  MEDIUM,
  HARD,
}

export enum Tag {
  Recycle,
  EnergySaving,
  NatureProtection,
  SustainableAgriculture,
  CarbonNeutral,
  EnvironmentalEducation,
  EnvironmentalPolicy,
  ProtectBiodiversity,
  EnvironmentalArt,
  PlantBasedDiet,
  ReduceCarbonEmissions,
  PlasticFreeMovement,
  SustainableTransportation,
  GreenArchitecture,
  WaterConservation,
  ClimateChangeResponse,
  SustainableConsumption,
  ResourceManagement,
  MarineProtection,
  Bicycle,
}

export const TagKorean = {
  [Tag.Recycle]: '재활용',
  [Tag.EnergySaving]: '에너지 절약',
  [Tag.NatureProtection]: '자연 보호',
  [Tag.SustainableAgriculture]: '지속 가능한 농업',
  [Tag.CarbonNeutral]: '탄소 중립',
  [Tag.EnvironmentalEducation]: '환경 교육',
  [Tag.EnvironmentalPolicy]: '환경 정책',
  [Tag.ProtectBiodiversity]: '생물 다양성 보호',
  [Tag.EnvironmentalArt]: '환경 예술',
  [Tag.PlantBasedDiet]: '식물 기반 식사',
  [Tag.ReduceCarbonEmissions]: '탄소 배출 감소',
  [Tag.PlasticFreeMovement]: '무플라스틱 운동',
  [Tag.SustainableTransportation]: '지속 가능한 교통 수단',
  [Tag.GreenArchitecture]: '친환경 건축',
  [Tag.WaterConservation]: '물 보존',
  [Tag.ClimateChangeResponse]: '기후변화 대응',
  [Tag.SustainableConsumption]: '지속 가능한 소비',
  [Tag.ResourceManagement]: '자원 관리',
  [Tag.MarineProtection]: '해양 보호',
  [Tag.Bicycle]: '자전거 이용',
};

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  shortDescription: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @Column({ type: 'enum', enum: Tag, array: true })
  tag: Tag[];

  @Column({
    type: 'enum',
    enum: Difficulty,
  })
  difficulty: Difficulty;

  @OneToMany(
    () => ChallengeStatus,
    (challengeStatus) => challengeStatus.challenge,
  )
  challengeStatuses: ChallengeStatus[];
}
