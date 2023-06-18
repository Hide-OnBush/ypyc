import { fileURLToPath, URL } from 'node:url'

import { defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/

// const IS_PRODUCTION =process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [vue(), vueJsx(),
    
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })],
  //  base:IS_PRODUCTION ?"/dist/":"/" ,
  //  build:{
  //   outDir:"../public/dist",
  //   emptyOutDir:true,
  //  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
