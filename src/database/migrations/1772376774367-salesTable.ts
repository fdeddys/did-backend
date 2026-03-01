import { MigrationInterface, QueryRunner } from 'typeorm';

export class SalesTable1772376774367 implements MigrationInterface {
  name = 'SalesTable1772376774367';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sales" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(255) NOT NULL, "address" text, "companyId" uuid, "sales_custom_id" character varying(50) NOT NULL, "phone" character varying(50), "email" character varying(50), "referal_code" character varying(50), "gender" character varying(1) NOT NULL DEFAULT 'M', "photo" character varying(255), "spv_code" character varying(255), "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sales"`);
  }
}
