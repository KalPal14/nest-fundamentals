import { MigrationInterface, QueryRunner } from 'typeorm';

export class Generated1722523606400 implements MigrationInterface {
  name = 'Generated1722523606400';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`,
    );
  }
}
