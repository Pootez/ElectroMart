import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const customConfig = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        primary: {
          value: { _light: '#f4f4f5', _dark: '#18181b' },
        },
        secondary: {
          value: { _light: '#d4d4d8', _dark: '#3f3f46' },
        },
        brand: {
          value: { _light: '#fecaca', _dark: '#511111' },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)
