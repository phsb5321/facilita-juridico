/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  const clientsData = [];

  // Generate 100 client entities
  for (let i = 1; i <= 100; i++) {
    clientsData.push({
      name: `Client ${i}`,
      email: `client${i}@example.com`,
      phone: `123-456-${1000 + i}`,
      coordinate_x: Math.random() * 100, // Random x coordinate
      coordinate_y: Math.random() * 100, // Random y coordinate
    });
  }

  // Generate SQL insert statements for clients
  clientsData.forEach((client) => {
    const { name, email, phone, coordinate_x, coordinate_y } = client;
    pgm.sql(`
      INSERT INTO clients (name, email, phone, coordinate_x, coordinate_y)
      VALUES ('${name}', '${email}', '${phone}', ${coordinate_x}, ${coordinate_y});
    `);
  });
};

exports.down = (pgm) => {
  pgm.sql(`DELETE FROM clients;`);
};
