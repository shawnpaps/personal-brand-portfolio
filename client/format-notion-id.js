#!/usr/bin/env node

/**
 * Utility to format Notion database IDs correctly
 * Usage: node format-notion-id.js <notion-id>
 */

function formatNotionId(id) {
  // Remove any existing hyphens and whitespace
  const cleaned = id.replace(/[-\s]/g, '');

  // Check if it's a valid 32-character hex string
  if (!/^[0-9a-f]{32}$/i.test(cleaned)) {
    throw new Error('Invalid Notion ID. Must be 32 hexadecimal characters.');
  }

  // Format as UUID: 8-4-4-4-12
  return `${cleaned.slice(0, 8)}-${cleaned.slice(8, 12)}-${cleaned.slice(12, 16)}-${cleaned.slice(16, 20)}-${cleaned.slice(20, 32)}`;
}

// Get ID from command line argument
const rawId = process.argv[2];

if (!rawId) {
  console.log('Usage: node format-notion-id.js <notion-id>');
  console.log('\nExamples:');
  console.log('  node format-notion-id.js 29f3dfc4d57780a38165c855f6c0ce92');
  console.log('  node format-notion-id.js 29f3dfc4-d577-80a3-8165-c855f6c0ce92');
  console.log('\nBoth formats are accepted and will be converted to UUID format.');
  process.exit(0);
}

try {
  const formattedId = formatNotionId(rawId);
  console.log('\n✅ Formatted Notion ID (UUID format):');
  console.log(formattedId);
  console.log('\n📋 Add this to your .env file:');
  console.log(`NOTION_MEDIA_DATABASE_ID=${formattedId}`);
} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}
