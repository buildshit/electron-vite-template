# Electron + Vite Template

A minimal, modern Electron application template built with Vite for fast development and TypeScript support.

## Features

- ⚡ **Vite** for fast development and hot reload
- 🔷 **TypeScript** support for both main and renderer processes
- 🔒 **Security best practices** with context isolation and preload scripts
- 🛠️ **Concurrent development** - Vite dev server and Electron run together
- 📦 **Production builds** with electron-builder
- 🎯 **Clean project structure** with separate configs for main/renderer

## Project Structure

```
├── electron/                 # Electron main process
│   ├── main.ts              # Main process entry point
│   ├── preload.ts           # Preload script for secure IPC
│   └── tsconfig.json        # TypeScript config for main process
├── src/                     # Renderer process (web app)
│   ├── main.ts              # Renderer entry point
│   └── style.css            # App styles
├── dist-electron/           # Compiled Electron files (auto-generated)
├── dist-renderer/           # Compiled renderer files (auto-generated)
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript config for renderer
└── package.json             # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download this template
2. Install dependencies:

```bash
npm install
```

### Development

Start the development server with hot reload:

```bash
npm run dev
```

This command:
1. Compiles the Electron main process TypeScript files
2. Starts the Vite dev server on `http://localhost:5173`
3. Launches Electron which loads the dev server
4. Opens developer tools automatically

### Building

Build the renderer process only:
```bash
vite build
```

Build the Electron main process:
```bash
npm run build:electron
```

Build everything for production:
```bash
npm run build
```

Create distributable packages:
```bash
npm run dist
```

## How It Works

### Development Mode Detection

The template automatically detects whether to run in development or production mode by checking if the built renderer files exist:

```typescript
const rendererPath = path.join(__dirname, '../dist-renderer/index.html')
const isDev = !existsSync(rendererPath)

if (isDev) {
  mainWindow.loadURL('http://localhost:5173')  // Vite dev server
} else {
  mainWindow.loadFile(rendererPath)            // Built files
}
```

### Security Setup

The template follows Electron security best practices:

- **Context Isolation**: Enabled to isolate the main world from the isolated world
- **Node Integration**: Disabled in renderer for security
- **Preload Script**: Used for secure communication between main and renderer processes

```typescript
webPreferences: {
  nodeIntegration: false,
  contextIsolation: true,
  preload: path.join(__dirname, 'preload.js')
}
```

### TypeScript Configuration

Two separate TypeScript configurations:

- **Main Process** (`electron/tsconfig.json`): Targets CommonJS for Node.js environment
- **Renderer Process** (`tsconfig.json`): Targets ESNext for modern browser environment

### Vite Configuration

Configured for Electron with:
- Base path set to `./` for relative asset loading
- Output directory set to `dist-renderer`
- Development server on port 5173

## Scripts

- `npm run dev` - Start development with hot reload
- `npm run build` - Build for production
- `npm run build:electron` - Compile Electron main process only
- `npm run dist` - Create distributable packages
- `npm run preview` - Preview production build

## Adding Features

### IPC Communication

Add methods to the preload script for secure communication:

```typescript
// electron/preload.ts
contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (data: string) => ipcRenderer.invoke('file:save', data)
})
```

Handle in main process:

```typescript
// electron/main.ts
import { ipcMain, dialog } from 'electron'

ipcMain.handle('dialog:openFile', async () => {
  const result = await dialog.showOpenDialog({})
  return result.filePaths
})
```

### Adding Dependencies

For renderer process (web technologies):
```bash
npm install package-name
```

For main process (Node.js):
```bash
npm install package-name
npm install --save-dev @types/package-name  # if TypeScript types needed
```

## Customization

- Modify `src/main.ts` and `src/style.css` for your app's UI
- Update `electron/main.ts` for main process logic
- Configure `vite.config.ts` for build customization
- Update `package.json` for app metadata and build settings

## License

MIT#   e l e c t r o n - v i t e - t e m p l a t e  
 