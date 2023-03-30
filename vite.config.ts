import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index'),
            name: 'tauri-steamgriddb',
        },
        rollupOptions: {
            external: [ "@tauri-apps/api" ]
        }
    }
});
