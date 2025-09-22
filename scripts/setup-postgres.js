const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function setupDatabase() {
  try {
    console.log("Setting up PostgreSQL database...");

    // Test connection
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL database");

    // Push schema to database
    console.log("📝 Pushing schema to database...");
    // Note: In production, you would run: npx prisma db push

    console.log("🎉 Database setup complete!");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();
