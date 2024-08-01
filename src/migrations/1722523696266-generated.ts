import { MigrationInterface, QueryRunner } from 'typeorm';

export class Generated1722523696266 implements MigrationInterface {
  name = 'Generated1722523696266';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`,
    );
  }
}
