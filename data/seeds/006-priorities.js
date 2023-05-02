/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const priorityData = [
  {
    sectorId: 1,
    jobId: 2,
    group: "A",
    possibility: 100,
  },
  {
    sectorId: 2,
    jobId: 1,
    group: "B",
    possibility: 70,
  },
  {
    sectorId: 3,
    jobId: 3,
    group: "C",
    possibility: 50,
  },
];

exports.priorityData = priorityData;

exports.seed = async function (knex) {
  return await knex("priorities").insert(priorityData);
};
