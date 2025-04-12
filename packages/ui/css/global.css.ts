import { globalStyle } from '@vanilla-extract/css'
import { vars } from './vars.css'

globalStyle('body', {
  backgroundColor: vars.colors.background, // Optional fallback
  backgroundImage: `url('/background.png')`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  minHeight: '100vh',
  margin: '0',
  padding: '0',
})
