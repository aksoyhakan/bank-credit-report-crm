/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (role) => {
      role.increments("roleId");
      role.string("role").notNullable().unique();
    })
    .createTable("users", (user) => {
      user.increments("lineNo");
      user.string("userId").notNullable().unique();
      user.string("username").notNullable().unique();
      user.string("email");
      user.string("password").notNullable();
      user.string("typeformToken");
      user.string("pipedriveToken");
      user
        .string("photo")
        .notNullable()
        .defaultTo(
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIoAigMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EAD0QAAIBAwEFAgcOBwAAAAAAAAABAgMEEQUSITFBUXHRBhMjQmGhsRQVIjJSU1RygZGSk8HhFiQzNGJzgv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+4AAAAAAAAAw3jHpOC71e1tpOOZVJrdswxu+3gBIAgv4hXK0eP8AZ+xvttdtqj2a0Z0X1eHH7wJYHmM4zSlFpp8GuZ6AAAAAAAAAAAAAAABiTwm28Y5gQuvahKn/ACtGWzJr4ck8NLoiAXYvs3HutVderOrLjN7XYeCoAACR0jUJWlWNOpLyEnhp+a+paFwKMW7SKzr6dRm/jYcX2p4IrsAAAAAAAAAAAAADVd/2tbHHxcsfcbTDw1h8AKMD3WouhWnRfGDa3ngqAAAcizeDufe95+clj1FZ7eBbtJouhp1GDWJNbT7W8gdgAIoAAAAAAAAAAAAAhdd06VXFzQi5TSxOKW9rqivrfjHPh6S8tZOC70m1uZubi4TfFw5gVUE7/Dy825ePTD9zot9CtabTqOVVr5W5fcURej2Duq0as15CDy8+c1yLSjEYxhFRglFLckuRkgAAAAAAAAAAAAcmoXlOyo+Mmsye6MV5zA3V69O3pupWqKEVzZDXOvb2rWnu+XPuIm6uq13V8ZWll8lyj2I0gdlTVL6o3m5lH0RSRqd5d/Sa/wCY+80AqN3uy7+k1vzH3mfdl39Kr/mM0ADqhqN7B5jdVP8Ap59p22+vV4NKvCNRej4L7mRACrdZ6hQvI+Snia4wluaOwo0W4yUotxknlNPGGWLR9U90vxFw/Kr4svl/uQS4CeeAAAAAAABU9auHcahUTfwKb2Irp19Za5NRTb4JZKROW3OUnxk2wPIAKgAAAAAAAAZhKUJxnB4lF5i+jMAC621Tx1CnVSxtwUjacGhz29Npf45XrO8igAAAADTeS2LWtLpB+wpa4Iud7HbtK0ebgymLgAABUAAAAAAAAAABZfBuWbCS6VGSpFeDkdmxk+s2SpFAAAAAAr+paLOMpVbRbUXvdJ8V2dewsBjAFHlGUJuE04zXGL4mOwute2o3EdmtSjNctpcCOraDbTeac6lN9ufaUVsExU8H6y/pXFOX1k495olol9Hzacvqz70gI4Hf7z3/AMwvxx7zHvPf/ML8ce8DhBJR0O9fHxMe2b/RM6qXg+8p1rlY6Qh+rAg+WWdlhp1e8ksJwpc5tewn7fSLOhv8Xty6zefVwO5RS4Aa7ejC3oxpU90YrCNoBAAAAAAAAAAAAAAAAAwAAAAAAAAAAP/Z"
        );
      user
        .integer("roleId")
        .unsigned()
        .references("roleId")
        .inTable("roles")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("sectors", (sector) => {
      sector.increments("sectorId");
      sector.string("sectorName").notNullable().unique();
    })
    .createTable("jobs", (job) => {
      job.increments("jobId");
      job.string("jobName").notNullable().unique();
    })
    .createTable("priorities", (prority) => {
      prority.increments("priorityId");
      prority
        .integer("sectorId")
        .unsigned()
        .references("sectorId")
        .inTable("sectors")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      prority
        .integer("jobId")
        .unsigned()
        .references("jobId")
        .inTable("jobs")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      prority.string("group").notNullable();
      prority.integer("possibility").notNullable();
    })
    .createTable("clients", (client) => {
      client.increments("clientId");
      client.string("name").notNullable();
      client.string("surname").notNullable();
      client.string("citizenshipNo").notNullable().unique();
      client.string("sector").notNullable();
      client.string("occupation").notNullable();
      client.integer("workStartYear").notNullable();
      client.string("graduate").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("clients")
    .dropTableIfExists("priorities")
    .dropTableIfExists("jobs")
    .dropTableIfExists("sectors")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
