import { seed } from "drizzle-seed";
import { db, pool } from "../server/db/db";
import * as schema from "../server/db/schema";

const seedDb = async () => {
  await seed(db, schema).refine((f) => ({
    todos: {
      columns: {
        title: f.valuesFromArray({
          values: ["Buy groceries", "read a book", "drink cofee"],
        }),
        description: f.valuesFromArray({
          values: ["at 10am", "weekly", "carefully", undefined],
        }),
      },
    },
  }));
};

seedDb()
  .then(() => {
    console.log("seeded database success!");
    return pool.end();
  })
  .catch((err) => {
    console.error("failed to seed database:", err);
    return pool.end();
  });
