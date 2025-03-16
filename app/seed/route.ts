import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedAdmin() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;
}

async function createScraperTable() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS scrapers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      url TEXT NOT NULL,
      title_selector TEXT NOT NULL,
      selectors TEXT NOT NULL,
      scraper TEXT NOT NULL,
      format TEXT NOT NULL,
      width INT,
      height INT,
      scraper_data_id UUID NOT NULL,
      qrcode BOOLEAN NOT NULL,
      created_at DATE NOT NULL
    );
  `;
}

async function createScraperDataTable() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS scraper_data (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title TEXT NOT NULL,
      data TEXT NOT NULL,
      date DATE NOT NULL
    );
  `;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      // seedAdmin(),
      createScraperDataTable(),
      createScraperTable(),
    ]);

    return Response.json({ message: "Database created successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
