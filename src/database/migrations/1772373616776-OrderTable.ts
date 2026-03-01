import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderTable1772373616776 implements MigrationInterface {
  name = 'OrderTable1772373616776';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order-details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "stock_id" uuid NOT NULL, "qtyOrder" integer NOT NULL DEFAULT '0', "qtySent" integer NOT NULL DEFAULT '0', "qtyReceived" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_e141e01011d5b0fe60d5a830ba6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "orderDate" TIMESTAMP NOT NULL, "confirmDate" TIMESTAMP NOT NULL, "salesId" uuid NOT NULL, "merchantId" uuid NOT NULL, "notes" text NOT NULL, "totalQuantity" integer NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "order-details"`);
  }
}
