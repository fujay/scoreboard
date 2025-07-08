import bcrypt from "bcrypt";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const users = [
  {
    name: "Test",
    email: "test@test.com",
    password: "123456",
  },
];

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

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (name, email, password)
        VALUES (${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function createNewsTable() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS news (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      show_until DATE,
      icon VARCHAR(100) NOT NULL DEFAULT 'info'
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

async function createSocialMediaTable() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS social_media (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title TEXT,
      platform TEXT NOT NULL,
      url TEXT NOT NULL,
      qrcode BOOLEAN NOT NULL,
      show_until DATE
    );
  `;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      // seedAdmin(),
      createScraperDataTable(),
      createScraperTable(),
      createNewsTable(),
      createSocialMediaTable(),
    ]);

    return Response.json({ message: "Databases created successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
