/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const roleData = [
  { role: "süper yönetici" },
  { role: "kredi analisti" },
  { role: "yeni kullanıcı" },
];

exports.roleData = roleData;

exports.seed = async function (knex) {
  return await knex("roles").insert(roleData);
};
