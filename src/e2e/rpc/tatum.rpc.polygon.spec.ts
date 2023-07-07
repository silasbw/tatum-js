import { EvmE2eUtils } from './evm.e2e.utils'
import { Network } from '../../dto'

describe('Polygon', () => {
  describe('mainnet', () => {
    EvmE2eUtils.e2e({ network: Network.POLYGON, chainId: 137 })
  })

  describe('mumbai', () => {
    EvmE2eUtils.e2e({ network: Network.POLYGON_MUMBAI, chainId: 80001 })
  })
})