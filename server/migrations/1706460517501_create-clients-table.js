/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("clients", {
    id_client: "id",
    name: { type: "varchar(255)", notNull: true },
    email: { type: "varchar(255)", notNull: true },
    phone: { type: "varchar(255)", notNull: true },
    coordinate_x: { type: "double precision", notNull: true, default: 0 },
    coordinate_y: { type: "double precision", notNull: true, default: 0 },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("clients");
};
