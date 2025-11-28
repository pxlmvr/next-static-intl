import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
    plugins: [
        react(),
        dts({
            entryRoot: 'src',
            tsconfigPath: 'tsconfig.build.json',
            outDir: 'dist/types',
        }),
    ],
    build: {
        lib: {
            entry: {
                index: path.resolve(__dirname, 'src/index.ts'), // client
                'index.server': path.resolve(__dirname, 'src/index.server.ts'), // server
            },
            name: 'next-static-intl',
            fileName: (format, entryName) => `${entryName}.${format}.js`,
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
        },
    },
})
