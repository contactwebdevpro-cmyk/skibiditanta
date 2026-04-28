const fs = require('fs');

// Read the template
let html = fs.readFileSync('index.html', 'utf8');

// Build the __ENV__ injection script
const envScript = `<script>
window.__ENV__ = {
  VITE_FIREBASE_API_KEY: "${process.env.VITE_FIREBASE_API_KEY || ''}",
  VITE_FIREBASE_AUTH_DOMAIN: "${process.env.VITE_FIREBASE_AUTH_DOMAIN || ''}",
  VITE_FIREBASE_PROJECT_ID: "${process.env.VITE_FIREBASE_PROJECT_ID || ''}",
  VITE_FIREBASE_STORAGE_BUCKET: "${process.env.VITE_FIREBASE_STORAGE_BUCKET || ''}",
  VITE_FIREBASE_MESSAGING_SENDER_ID: "${process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || ''}",
  VITE_FIREBASE_APP_ID: "${process.env.VITE_FIREBASE_APP_ID || ''}"
};
</script>`;

// Inject right before </head>
html = html.replace('</head>', envScript + '\n</head>');

// Write output
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);

console.log('✅ Build complete — env vars injected into dist/index.html');
console.log('   PROJECT_ID:', process.env.VITE_FIREBASE_PROJECT_ID || '⚠️  not set');
