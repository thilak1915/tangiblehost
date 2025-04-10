import { createGlobalTheme, createGlobalThemeContract } from '@vanilla-extract/css'
import { tokens } from '../tokens'
import type { Theme } from './types'

const getVarName = (_value: string | null, path: string[]) => path.join('-')

// Contract for shared non-color tokens
const baseTokens: Omit<typeof tokens, 'colors'> = {
  fonts: tokens.fonts,
  space: tokens.space,
  borderWidths: tokens.borderWidths,
  radii: tokens.radii,
  fontSizes: tokens.fontSizes,
  shadows: tokens.shadows,
}

const baseVars = createGlobalThemeContract(baseTokens, getVarName)
createGlobalTheme(':root', baseVars, baseTokens)

const lightColors = tokens.colors.light
const darkColors = tokens.colors.dark

const colorVars = createGlobalThemeContract(lightColors, getVarName)
createGlobalTheme('[data-theme="light"]', colorVars, lightColors)
createGlobalTheme('[data-theme="dark"]', colorVars, darkColors)

type BaseVars = typeof baseVars
type ColorVars = typeof colorVars
type Vars = BaseVars & { colors: ColorVars }

export const vars = {
  ...baseVars,
  colors: colorVars,
} as Vars
