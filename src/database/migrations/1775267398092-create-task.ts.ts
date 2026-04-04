import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTask1775267398092 implements MigrationInterface {
  name = 'CreateTask1775267398092';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`task\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, \`importance\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password_hash\``);
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`passwordHash\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`);
    await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_29c593b244774c65824ae1df648\` FOREIGN KEY (\`userIdId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_29c593b244774c65824ae1df648\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`passwordHash\``);
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`password_hash\` varchar(255) NOT NULL`);
    await queryRunner.query(`DROP TABLE \`task\``);
  }
}
