import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDetectiveTables1767753484485 implements MigrationInterface {
  name = 'AddDetectiveTables1767753484485';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "apply" ("id" SERIAL NOT NULL, "date" date NOT NULL, "request" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c61ed680472aa0f58499175d902" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cases" ("id" SERIAL NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "status" boolean NOT NULL DEFAULT false, "applyId" integer, "userId" integer, CONSTRAINT "REL_2cef4a726f07fb7d8989043d16" UNIQUE ("applyId"), CONSTRAINT "PK_264acb3048c240fb89aa34626db" PRIMARY KEY ("id"))`,
    );
    //await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
    //await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    //await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`);
    //await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
    //await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
    //await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    //await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying`);
    //await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
    //await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    //await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying`);
    await queryRunner.query(
      `ALTER TABLE "cases" ADD CONSTRAINT "FK_2cef4a726f07fb7d8989043d166" FOREIGN KEY ("applyId") REFERENCES "apply"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cases" ADD CONSTRAINT "FK_7d698db2c1f862aca92eaa0d4bd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cases" DROP CONSTRAINT "FK_7d698db2c1f862aca92eaa0d4bd"`);
    await queryRunner.query(`ALTER TABLE "cases" DROP CONSTRAINT "FK_2cef4a726f07fb7d8989043d166"`);
    //await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    //await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(40)`);
    //await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
    //await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    //await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying(40)`);
    //await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
    //await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
    //await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    //await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(100) NOT NULL`);
    //await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
    await queryRunner.query(`DROP TABLE "cases"`);
    await queryRunner.query(`DROP TABLE "apply"`);
  }
}
