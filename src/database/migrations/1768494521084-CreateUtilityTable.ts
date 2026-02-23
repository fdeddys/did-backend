import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUtilityTable1768494521084 implements MigrationInterface {
  name = 'CreateUtilityTable1768494521084';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "util_dtl" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "hdr_id" uuid, CONSTRAINT "PK_d1de1e0b06838d994bee5dfcd51" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "util_hdr" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_e4a5df2fcb0682d6f198030016d" UNIQUE ("name"), CONSTRAINT "PK_a41f1758c60493f5b46daa1bcf6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "price" numeric NOT NULL, "stock" integer NOT NULL, "product_id" uuid, "variant_id" uuid, "uom_id" uuid, CONSTRAINT "PK_84582bc395409e5ebca97ef4b86" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "util_dtl" ADD CONSTRAINT "FK_0d385c8185cb775773adfa7a092" FOREIGN KEY ("hdr_id") REFERENCES "util_hdr"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_items" ADD CONSTRAINT "FK_ef33edf0c4634c4821c940a54a3" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_items" ADD CONSTRAINT "FK_c80393d66ff4e5d2932b862b9da" FOREIGN KEY ("variant_id") REFERENCES "util_dtl"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_items" ADD CONSTRAINT "FK_3fc7f0e5f576743b73aa5a9e776" FOREIGN KEY ("uom_id") REFERENCES "util_dtl"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_items" DROP CONSTRAINT "FK_3fc7f0e5f576743b73aa5a9e776"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_items" DROP CONSTRAINT "FK_c80393d66ff4e5d2932b862b9da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_items" DROP CONSTRAINT "FK_ef33edf0c4634c4821c940a54a3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "util_dtl" DROP CONSTRAINT "FK_0d385c8185cb775773adfa7a092"`,
    );
    await queryRunner.query(`DROP TABLE "product_items"`);
    await queryRunner.query(`DROP TABLE "util_hdr"`);
    await queryRunner.query(`DROP TABLE "util_dtl"`);
  }
}
