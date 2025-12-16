// Test script to verify environment variables are loaded correctly
// Run with: node test-env.js

console.log("=== Environment Variables Test ===\n");

console.log("MUX_TOKEN_ID:", process.env.MUX_TOKEN_ID ? "✓ Set" : "✗ Not set");
console.log("MUX_TOKEN_SECRET:", process.env.MUX_TOKEN_SECRET ? "✓ Set" : "✗ Not set");

console.log("\n=== Details ===");
console.log("MUX_TOKEN_ID length:", process.env.MUX_TOKEN_ID?.length || 0);
console.log("MUX_TOKEN_SECRET length:", process.env.MUX_TOKEN_SECRET?.length || 0);

if (!process.env.MUX_TOKEN_ID || !process.env.MUX_TOKEN_SECRET) {
  console.log("\n❌ FAILED: Environment variables are not set!");
  console.log("\nTo fix this:");
  console.log("1. Create a .env file in the client directory");
  console.log("2. Add the following lines:");
  console.log("   MUX_TOKEN_ID=your_token_id_here");
  console.log("   MUX_TOKEN_SECRET=your_token_secret_here");
  console.log("3. Restart your development server");
  process.exit(1);
} else {
  console.log("\n✓ SUCCESS: All environment variables are set!");

  // Test Base64 encoding (what we use for Mux API)
  const credentials = Buffer.from(
    `${process.env.MUX_TOKEN_ID}:${process.env.MUX_TOKEN_SECRET}`
  ).toString("base64");

  console.log("\n=== Base64 Credentials ===");
  console.log("Credentials encoded successfully");
  console.log("First 20 chars