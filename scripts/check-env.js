#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🔍 Checking your .env file setup...\n");

try {
  // Check if .env file exists
  const envPath = path.join(__dirname, "../.env");
  const envLocalPath = path.join(__dirname, "../.env.local");

  let envFile = null;
  if (fs.existsSync(envPath)) {
    envFile = envPath;
    console.log("✅ Found .env file");
  } else if (fs.existsSync(envLocalPath)) {
    envFile = envLocalPath;
    console.log("✅ Found .env.local file");
  } else {
    console.log("❌ No .env or .env.local file found");
    process.exit(1);
  }

  // Read and check the content
  const envContent = fs.readFileSync(envFile, "utf8");
  const lines = envContent
    .split("\n")
    .filter((line) => line.trim() && !line.startsWith("#"));

  console.log("\n📋 Environment variables found:");

  let hasClerkPublishable = false;
  let hasClerkSecret = false;
  let hasDatabaseUrl = false;

  lines.forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      console.log(`   ${key}=${value.substring(0, 20)}...`);

      if (key === "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY") {
        hasClerkPublishable = true;
        if (value.startsWith("pk_test_")) {
          console.log("   ✅ Using development key (correct for personal use)");
        } else if (value.startsWith("pk_live_")) {
          console.log(
            "   ⚠️  Using production key (may cause issues in development)"
          );
        } else {
          console.log("   ❌ Invalid Clerk publishable key format");
        }
      }

      if (key === "CLERK_SECRET_KEY") {
        hasClerkSecret = true;
        if (value.startsWith("sk_test_")) {
          console.log(
            "   ✅ Using development secret key (correct for personal use)"
          );
        } else if (value.startsWith("sk_live_")) {
          console.log(
            "   ⚠️  Using production secret key (may cause issues in development)"
          );
        } else {
          console.log("   ❌ Invalid Clerk secret key format");
        }
      }

      if (key === "DATABASE_URL") {
        hasDatabaseUrl = true;
        console.log("   ✅ Database URL found");
      }
    }
  });

  console.log("\n📊 Summary:");
  console.log(`   Clerk Publishable Key: ${hasClerkPublishable ? "✅" : "❌"}`);
  console.log(`   Clerk Secret Key: ${hasClerkSecret ? "✅" : "❌"}`);
  console.log(`   Database URL: ${hasDatabaseUrl ? "✅" : "❌"}`);

  if (hasClerkPublishable && hasClerkSecret && hasDatabaseUrl) {
    console.log("\n🎉 Your .env file looks good for personal use!");
    console.log("\n📋 Next steps:");
    console.log(
      "1. Make sure these same keys are in your Vercel environment variables"
    );
    console.log("2. Redeploy your Vercel app");
    console.log("3. Test the authentication flow");
  } else {
    console.log("\n❌ Missing required environment variables");
    console.log("\n📝 Required variables:");
    console.log("   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...");
    console.log("   CLERK_SECRET_KEY=sk_test_...");
    console.log("   DATABASE_URL=your_database_url");
  }
} catch (error) {
  console.error("❌ Error checking .env file:", error.message);
  process.exit(1);
}
