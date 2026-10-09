#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/1db3eec48a657547ec050718250b95c5e3f21c9bd5e5ce850f2fc2c7d04eb320/contract';
import endContract from '../../snapshots/1db3eec48a657547ec050718250b95c5e3f21c9bd5e5ce850f2fc2c7d04eb320/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'CatActivity',
        columns: [
          col('code', 'int2', { notNull: true, codecRef: { codecId: 'pg/int2@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('label', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'CatAnswer',
        columns: [
          col('code', 'int2', { notNull: true, codecRef: { codecId: 'pg/int2@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('label', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'CatEducationLevel',
        columns: [
          col('code', 'int2', { notNull: true, codecRef: { codecId: 'pg/int2@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('label', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'CatFirstUseTiming',
        columns: [
          col('code', 'int2', { notNull: true, codecRef: { codecId: 'pg/int2@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('label', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'CatGender',
        columns: [
          col('code', 'int2', { notNull: true, codecRef: { codecId: 'pg/int2@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('label', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'CatHealthStatus',
        columns: [
          col('code', 'int2', { notNull: true, codecRef: { codecId: 'pg/int2@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('label', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'CatRisk',
        columns: [
          col('code', 'int2', { notNull: true, codecRef: { codecId: 'pg/int2@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('label', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Household',
        columns: [col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } })],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Person',
        columns: [
          col('age', 'int2', { notNull: true, codecRef: { codecId: 'pg/int2@1' } }),
          col('genderId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('householdId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('pSequence', 'int2', { notNull: true, codecRef: { codecId: 'pg/int2@1' } }),
          col('personOrder', 'int2', { notNull: true, codecRef: { codecId: 'pg/int2@1' } }),
          col('surveySequence', 'int2', { notNull: true, codecRef: { codecId: 'pg/int2@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Respondent',
        columns: [
          col('educationLevelId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('healthStatusId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('mainActivityId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('personId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('smokingRiskId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'TobaccoUse',
        columns: [
          col('ageFirstUse', 'int2', { codecRef: { codecId: 'pg/int2@1' } }),
          col('everSmokedId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('firstUseTimingId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('respondentId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('smokedLast12mId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('smokedLast30dId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'VapeUse',
        columns: [
          col('ageFirstUse', 'int2', { codecRef: { codecId: 'pg/int2@1' } }),
          col('everVapedId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('respondentId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('vapedLast30dId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'CatActivity',
        constraint: 'CatActivity_code_key',
        columns: ['code'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'CatActivity',
        constraint: 'CatActivity_label_key',
        columns: ['label'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'CatAnswer',
        constraint: 'CatAnswer_code_key',
        columns: ['code'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'CatAnswer',
        constraint: 'CatAnswer_label_key',
        columns: ['label'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'CatEducationLevel',
        constraint: 'CatEducationLevel_code_key',
        columns: ['code'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'CatEducationLevel',
        constraint: 'CatEducationLevel_label_key',
        columns: ['label'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'CatFirstUseTiming',
        constraint: 'CatFirstUseTiming_code_key',
        columns: ['code'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'CatFirstUseTiming',
        constraint: 'CatFirstUseTiming_label_key',
        columns: ['label'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'CatGender',
        constraint: 'CatGender_code_key',
        columns: ['code'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'CatGender',
        constraint: 'CatGender_label_key',
        columns: ['label'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'CatHealthStatus',
        constraint: 'CatHealthStatus_code_key',
        columns: ['code'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'CatHealthStatus',
        constraint: 'CatHealthStatus_label_key',
        columns: ['label'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'CatRisk',
        constraint: 'CatRisk_code_key',
        columns: ['code'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'CatRisk',
        constraint: 'CatRisk_label_key',
        columns: ['label'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Person',
        constraint: 'Person_householdId_personOrder_key',
        columns: ['householdId', 'personOrder'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Respondent',
        constraint: 'Respondent_personId_key',
        columns: ['personId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'TobaccoUse',
        constraint: 'TobaccoUse_respondentId_key',
        columns: ['respondentId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'VapeUse',
        constraint: 'VapeUse_respondentId_key',
        columns: ['respondentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Person',
        index: 'Person_genderId_idx_f5331e2a',
        columns: ['genderId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Person',
        index: 'Person_householdId_idx_fb33d798',
        columns: ['householdId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Respondent',
        index: 'Respondent_educationLevelId_idx_c4962183',
        columns: ['educationLevelId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Respondent',
        index: 'Respondent_healthStatusId_idx_e5cadaeb',
        columns: ['healthStatusId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Respondent',
        index: 'Respondent_mainActivityId_idx_3c038aef',
        columns: ['mainActivityId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Respondent',
        index: 'Respondent_smokingRiskId_idx_01287455',
        columns: ['smokingRiskId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'TobaccoUse',
        index: 'TobaccoUse_everSmokedId_idx_f3d24791',
        columns: ['everSmokedId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'TobaccoUse',
        index: 'TobaccoUse_firstUseTimingId_idx_4516a4d9',
        columns: ['firstUseTimingId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'TobaccoUse',
        index: 'TobaccoUse_smokedLast12mId_idx_6eff04ac',
        columns: ['smokedLast12mId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'TobaccoUse',
        index: 'TobaccoUse_smokedLast30dId_idx_3e005cf9',
        columns: ['smokedLast30dId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'VapeUse',
        index: 'VapeUse_everVapedId_idx_61a3f735',
        columns: ['everVapedId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'VapeUse',
        index: 'VapeUse_vapedLast30dId_idx_1bdfdb2a',
        columns: ['vapedLast30dId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Person',
        foreignKey: {
          name: 'Person_householdId_fkey',
          columns: ['householdId'],
          references: { schema: 'public', table: 'Household', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Person',
        foreignKey: {
          name: 'Person_genderId_fkey',
          columns: ['genderId'],
          references: { schema: 'public', table: 'CatGender', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Respondent',
        foreignKey: {
          name: 'Respondent_personId_fkey',
          columns: ['personId'],
          references: { schema: 'public', table: 'Person', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Respondent',
        foreignKey: {
          name: 'Respondent_mainActivityId_fkey',
          columns: ['mainActivityId'],
          references: { schema: 'public', table: 'CatActivity', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Respondent',
        foreignKey: {
          name: 'Respondent_healthStatusId_fkey',
          columns: ['healthStatusId'],
          references: { schema: 'public', table: 'CatHealthStatus', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Respondent',
        foreignKey: {
          name: 'Respondent_smokingRiskId_fkey',
          columns: ['smokingRiskId'],
          references: { schema: 'public', table: 'CatRisk', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Respondent',
        foreignKey: {
          name: 'Respondent_educationLevelId_fkey',
          columns: ['educationLevelId'],
          references: { schema: 'public', table: 'CatEducationLevel', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'TobaccoUse',
        foreignKey: {
          name: 'TobaccoUse_respondentId_fkey',
          columns: ['respondentId'],
          references: { schema: 'public', table: 'Respondent', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'TobaccoUse',
        foreignKey: {
          name: 'TobaccoUse_everSmokedId_fkey',
          columns: ['everSmokedId'],
          references: { schema: 'public', table: 'CatAnswer', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'TobaccoUse',
        foreignKey: {
          name: 'TobaccoUse_firstUseTimingId_fkey',
          columns: ['firstUseTimingId'],
          references: { schema: 'public', table: 'CatFirstUseTiming', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'TobaccoUse',
        foreignKey: {
          name: 'TobaccoUse_smokedLast12mId_fkey',
          columns: ['smokedLast12mId'],
          references: { schema: 'public', table: 'CatAnswer', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'TobaccoUse',
        foreignKey: {
          name: 'TobaccoUse_smokedLast30dId_fkey',
          columns: ['smokedLast30dId'],
          references: { schema: 'public', table: 'CatAnswer', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'VapeUse',
        foreignKey: {
          name: 'VapeUse_respondentId_fkey',
          columns: ['respondentId'],
          references: { schema: 'public', table: 'Respondent', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'VapeUse',
        foreignKey: {
          name: 'VapeUse_everVapedId_fkey',
          columns: ['everVapedId'],
          references: { schema: 'public', table: 'CatAnswer', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'VapeUse',
        foreignKey: {
          name: 'VapeUse_vapedLast30dId_fkey',
          columns: ['vapedLast30dId'],
          references: { schema: 'public', table: 'CatAnswer', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
