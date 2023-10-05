import { Network } from '../../../dto'
import { BaseUtxoClass, TatumSDK } from '../../../service'
import { RpcE2eUtils } from '../rpc.e2e.utils'

export enum UtxoNetworkType {
  MAIN = 'main',
  TEST = 'test',
}

interface TatumBtcUtils {
  type: UtxoNetworkType
  network: Network
  apiKey?: string
  skipEstimateSmartFee?: boolean
}

export const UtxoE2eUtils = {
  initTatum: async (params: TatumBtcUtils) =>
    TatumSDK.init<BaseUtxoClass>(RpcE2eUtils.initConfig(params.network, params.apiKey)),
  e2e: (params: TatumBtcUtils) => {
    const { type } = params
    it('chain info', async () => {
      const tatum = await UtxoE2eUtils.initTatum(params)
      const { result } = await tatum.rpc.getBlockChainInfo()

      expect(result.chain).toBe(type)
      await tatum.destroy()
    })

    it('chain info raw call', async () => {
      const tatum = await UtxoE2eUtils.initTatum(params)
      const info = await tatum.rpc.rawRpcCall({
        method: 'getblockchaininfo',
        id: '1',
        jsonrpc: '2.0',
      })
      expect(info.result.chain).toBe(type)
      await tatum.destroy()
    })

    it('best block hash', async () => {
      const tatum = await UtxoE2eUtils.initTatum(params)
      const { result } = await tatum.rpc.getBestBlockHash()

      expect(result).toBeTruthy()
      await tatum.destroy()
    })

    it('block count', async () => {
      const tatum = await UtxoE2eUtils.initTatum(params)
      const { result } = await tatum.rpc.getBlockCount()

      expect(result).toBeGreaterThan(0)
      await tatum.destroy()
    })

    it('difficulty', async () => {
      const tatum = await UtxoE2eUtils.initTatum(params)
      const { result } = await tatum.rpc.getDifficulty()

      expect(result).toBeGreaterThan(0)
      await tatum.destroy()
    })

    it('mempool info', async () => {
      const tatum = await UtxoE2eUtils.initTatum(params)
      const { result } = await tatum.rpc.getMempoolInfo()

      expect(result).toBeDefined()
      await tatum.destroy()
    })

    if (!params.skipEstimateSmartFee) {
      it('estimatesmartfee', async () => {
        const tatum = await UtxoE2eUtils.initTatum(params)
        const result = await tatum.rpc.estimateSmartFee(6)

        expect(result.result).not.toBeNull()
        await tatum.destroy()
      })
    }
  },
}
