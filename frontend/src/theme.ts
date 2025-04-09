import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const customConfig = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        gray: {
          50: { value: { _dark: '#f9f9f9' } },
          100: { value: { _dark: '#ededed' } },
          200: { value: { _dark: '#d3d3d3' } },
          300: { value: { _dark: '#b3b3b3' } },
          400: { value: { _dark: '#a0a0a0' } },
          500: { value: { _dark: '#898989' } },
          600: { value: { _dark: '#6c6c6c' } },
          700: { value: { _dark: '#202020' } },
          800: { value: { _dark: '#121212' } },
          900: { value: { _dark: '#111' } },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)
