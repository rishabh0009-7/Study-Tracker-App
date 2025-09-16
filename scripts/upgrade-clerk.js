#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🔄 Upgrading Clerk packages to latest versions...\n");

try {
  // Check current versions
  console.log("📦 Current Clerk versions:");
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../package.json"), "utf8")
  );
  console.log(`   @clerk/nextjs: ${packageJson.dependencies["@clerk/nextjs"]}`);

  // Upgrade to latest versions
  console.log("\n⬆️  Upgrading @clerk/nextjs to latest...");
  execSync("npm install @clerk/nextjs@latest", { stdio: "inherit" });

  console.log("\n✅ Clerk upgrade completed!");
  console.log("\n📋 Next steps:");
  console.log("1. Test your authentication flow");
  console.log(
    "2. Update your code to use the new fallbackRedirectUrl prop if desired"
  );
  console.log("3. Deploy and verify everything works in production");

  console.log("\n🔗 For more info about the new redirect props, visit:");
  console.log(
    "   https://clerk.com/docs/guides/custom-redirects#redirect-url-props"
  );
} catch (error) {
  console.error("❌ Error upgrading Clerk:", error.message);
  process.exit(1);
}
