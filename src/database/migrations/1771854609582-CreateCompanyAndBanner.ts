import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCompanyAndBanner1771854609582 implements MigrationInterface {
    name = 'CreateCompanyAndBanner1771854609582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "banner" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying(255) NOT NULL, "image_url" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "position" character varying NOT NULL, "is_shown" boolean NOT NULL DEFAULT true, "is_announcement" boolean NOT NULL DEFAULT true, "company_id" uuid, CONSTRAINT "UQ_b8b80e0074a71ba482e2f1b92a5" UNIQUE ("title"), CONSTRAINT "PK_6d9e2570b3d85ba37b681cd4256" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(100) NOT NULL, "code" character varying(50) NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "banner" ADD CONSTRAINT "FK_0779560b2d4f3a12f7a969f820b" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banner" DROP CONSTRAINT "FK_0779560b2d4f3a12f7a969f820b"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "banner"`);
    }

}
