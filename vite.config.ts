import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import svg from '@poppanator/sveltekit-svg';
import tailwindcss from '@tailwindcss/vite';
import icons from 'unplugin-icons/vite';
export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    icons({ compiler: 'svelte' }),
    svg({
      includePaths: ['src/lib/icons/'],
      svgoOptions: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: { overrides: { removeViewBox: false } }
          }
        ]
      }
    })
  ],
  server: { host: true }
});
