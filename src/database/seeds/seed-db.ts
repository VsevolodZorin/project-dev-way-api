import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDB1682573544409 implements MigrationInterface {
  name = 'SeedDB1682573544409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO skills (name, img) VALUES ('JavaScript', 'https://cdn.svgporn.com/logos/javascript.svg')`,
    );
    await queryRunner.query(
      `INSERT INTO skills (name, img) VALUES ('TypeScript', 'https://cdn.svgporn.com/logos/typescript-icon.svg')`,
    );
    await queryRunner.query(
      `INSERT INTO skills (name, img) VALUES ('React', 'https://cdn.svgporn.com/logos/react.svg')`,
    );
    await queryRunner.query(
      `INSERT INTO skills (name, img) VALUES ('NodeJS', 'https://cdn.svgporn.com/logos/nodejs-icon.svg')`,
    );
    await queryRunner.query(
      `INSERT INTO skills (name, img) VALUES ('Express', 'https://cdn.svgporn.com/logos/express.svg')`,
    );
    await queryRunner.query(
      `INSERT INTO skills (name, img) VALUES ('NestJS', 'https://cdn.svgporn.com/logos/nestjs.svg')`,
    );
    await queryRunner.query(
      `INSERT INTO skills (name, img) VALUES ('MongoDB', 'https://cdn.svgporn.com/logos/mongodb.svg')`,
    );
    await queryRunner.query(
      `INSERT INTO skills (name, img) VALUES ('Docker', 'https://cdn.svgporn.com/logos/docker-icon.svg')`,
    );
  }

  public async down(): Promise<void> {
    // do nothing
  }
}
