import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMockUser1655326231951 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user"("username", "email", "password", "createdAt", "updatedAt") VALUES ('bob', 'bob@bob.com', '$argon2i$v=19$m=4096,t=3,p=1$rsirmGYAolkYEzD+SNQQCQ$s6REMw+74Mt6gn2ZWqtCyziGCZ3VgjwkOUfpUvhcC/I', DEFAULT, DEFAULT)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
