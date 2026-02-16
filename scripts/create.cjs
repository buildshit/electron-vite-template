#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const packageRoot = path.resolve(__dirname, "..");
const sourcePackageJsonPath = path.join(packageRoot, "package.json");
const targetNameArg = process.argv[2];

if (!targetNameArg) {
  console.error("Usage: npx electron-vite-template <project-name>");
  console.error("   or: bunx electron-vite-template <project-name>");
  process.exit(1);
}

const projectName = targetNameArg.trim();
const targetDirectory = path.resolve(process.cwd(), projectName);

if (fs.existsSync(targetDirectory) && fs.readdirSync(targetDirectory).length > 0) {
  console.error(`Target directory is not empty: ${targetDirectory}`);
  process.exit(1);
}

fs.mkdirSync(targetDirectory, { recursive: true });

const copyEntries = ["electron", "src", "index.html", "tsconfig.json", "vite.config.ts", "bun.lock"];

for (const entry of copyEntries) {
  const sourcePath = path.join(packageRoot, entry);
  const targetPath = path.join(targetDirectory, entry);
  fs.cpSync(sourcePath, targetPath, { recursive: true });
}

const sourcePackageJson = JSON.parse(fs.readFileSync(sourcePackageJsonPath, "utf8"));
const templateScripts = Object.fromEntries(
  Object.entries(sourcePackageJson.scripts || {}).filter(([key]) => key !== "create")
);

const templatePackageJson = {
  name: projectName,
  version: "1.0.0",
  description: "Electron app with Vite bundler",
  main: "dist-electron/main.js",
  packageManager: sourcePackageJson.packageManager,
  scripts: templateScripts,
  keywords: sourcePackageJson.keywords || [],
  author: "",
  license: sourcePackageJson.license || "MIT",
  devDependencies: sourcePackageJson.devDependencies || {},
  dependencies: {}
};

fs.writeFileSync(
  path.join(targetDirectory, "package.json"),
  `${JSON.stringify(templatePackageJson, null, 2)}\n`,
  "utf8"
);

const gitignoreSource = fs.readFileSync(path.join(packageRoot, "template.gitignore"), "utf8");
fs.writeFileSync(path.join(targetDirectory, ".gitignore"), gitignoreSource, "utf8");

const readme = `# ${projectName}

Generated from \`electron-vite-template\`.

## Quick start

\`\`\`bash
bun install
bun run dev
\`\`\`

## Build

\`\`\`bash
bun run build
\`\`\`

## Create distributable packages

\`\`\`bash
bun run dist
\`\`\`
`;

fs.writeFileSync(path.join(targetDirectory, "README.md"), readme, "utf8");

console.log(`Created ${projectName} at ${targetDirectory}`);
console.log("Next steps:");
console.log(`  cd ${projectName}`);
console.log("  bun install");
console.log("  bun run dev");
