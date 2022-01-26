import { TatumBtcSDK } from '@tatumio/btc'
import { walletSdk } from './services/sdk.wallet'
import { BlockchainRecordService, TatumUrl } from '@tatumio/api-client'
import { abstractSdk } from '@tatumio/abstract-sdk'
import { sdkKms } from './services/sdk.kms'
import { TatumEthSDK } from '@tatumio/eth'
import { Currency, Web3Request, Web3Response } from '@tatumio/shared-core'
import { sdkMultiToken } from './services/sdk.multitoken'
import { SDKS } from './sdk.common'
import { httpDriver } from './services/sdk.httpDriver'
import { TatumDogeSDK } from '@tatumio/doge'
import { TatumCeloSDK } from '@tatumio/celo'
import { TatumXrpSDK } from '@tatumio/xrp'
import { TatumLtcSDK } from '@tatumio/ltc'
import { TatumPolygonSDK } from '@tatumio/polygon'
import { TatumKcsSDK } from '@tatumio/kcs'
import { TatumOneSDK } from '@tatumio/one'
import { TatumBscSDK } from '@tatumio/bsc'

export const TatumSDK = (args: { apiKey: string; url?: TatumUrl }) => {
  const blockchainSpecificSDKs: SDKS = {
    btc: TatumBtcSDK(args),
    eth: TatumEthSDK(args),
    doge: TatumDogeSDK(args),
    celo: TatumCeloSDK(args),
    ltc: TatumLtcSDK(args),
    polygon: TatumPolygonSDK(args),
    kcs: TatumKcsSDK(args),
    one: TatumOneSDK(args),
    bsc: TatumBscSDK(args),
    xrp: TatumXrpSDK(args),
  }
  return {
    ...abstractSdk(args),
    blockchain: blockchainSpecificSDKs,
    kms: sdkKms({ sdks: blockchainSpecificSDKs }),
    wallet: walletSdk,
    record: BlockchainRecordService,
    multiToken: sdkMultiToken(),
    httpDriver: (currency: Currency, request: Web3Request): Promise<Web3Response> =>
      httpDriver(blockchainSpecificSDKs, currency, request),
  }
}