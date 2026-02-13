import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// Read the repository name from package.json to set the base path for GitHub Pages.
// Change the "name" field in package.json to match your GitHub repository name.
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? `/${pkg.name}/` : '/',
}))
