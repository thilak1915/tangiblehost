import { ChainId, Token, WS } from '@pancakeswap/sdk'
import { USDC_SONIC,USDT_SONIC } from './common'

export const sonicTokens = {
  ws: WS[ChainId.SONIC],
  usdc: USDC_SONIC[ChainId.SONIC],
  USDT: USDT_SONIC[ChainId.SONIC],
  CANYON: new Token(ChainId.SONIC, '0xb7CB174c293073a684F3a234524685634d985c3F', 18, 'CELR', 'CanyonToken', ''),
  //leet: new Token(ChainId.GOERLI, '0xBd509651E6374c327d24b9d7E3Ea46704f6F31E8', 18, 'LEET', 'Leet Token', ''),
  
}
