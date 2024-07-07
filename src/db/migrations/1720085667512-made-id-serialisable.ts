import { MigrationInterface, QueryRunner } from "typeorm";

export class MadeIdSerialisable1720085667512 implements MigrationInterface {
    name = 'MadeIdSerialisable1720085667512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "employee_id_seq" OWNED BY "employee"."id"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "id" SET DEFAULT nextval('"employee_id_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "employee_id_seq"`);
    }

}
