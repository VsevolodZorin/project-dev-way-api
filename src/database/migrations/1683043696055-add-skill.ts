import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSkill1683043696055 implements MigrationInterface {
  name = 'AddSkill1683043696055';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "skills" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "img" character varying NOT NULL, CONSTRAINT "UQ_81f05095507fd84aa2769b4a522" UNIQUE ("name"), CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "skills"`);
  }
}
