/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const sectorData = [
  { sectorName: "Sağlık" },
  { sectorName: "Kamu" },
  { sectorName: "Eğitim" },
];

exports.sectorData = sectorData;

exports.seed = async function (knex) {
  return await knex("sectors").insert(sectorData);
};
