import { JsonRpcCall } from '../../../dto'

export const ARCHIVE_METHODS = [
  // Archival information
  'debug_getBadBlocks',
  'debug_storageRangeAt',
  'debug_traceCall',
  'debug_traceTransaction',
  'debug_traceBlock',
  'debug_traceBlockByHash',
  'debug_traceBlockByNumber',
  'trace_block',
  'trace_call',
  'trace_callMany',
  'trace_rawTransaction',
  'trace_replayBlockTransactions',

  // Network state
  'getBlockByHash',
  'getTransactionByHash',
  'getTransactionReceipt',
  'getUncleCountByBlockHash',
  'getUncleCountByBlockNumber',
  'getBlockByNumber',
  'getBlockTransactionCountByHash',
  'getBlockTransactionCountByNumber',
  'getBlockReceipts',
  'getTransactionByBlockHashAndIndex',
  'getTransactionByBlockNumberAndIndex',
  'getTransactionCount',
  'getProof',
]

export const POSSIBLE_ARCHIVE_METHODS = [
  // Network state
  { method: 'getStorageAt', index: 2 }, // second param block
  { method: 'call', index: 1 }, // second param block
  { method: 'getBalance', index: 1 }, // second param block
  { method: 'getCode', index: 1 }, // second param block
]

export const EvmUtils = {
  isArchiveMethod(rpc: JsonRpcCall): boolean {
    const isArchiveMethod = ARCHIVE_METHODS.find((method) => rpc.method.includes(method))
    if (isArchiveMethod) {
      return true
    }

    const possibleArchiveMethod = POSSIBLE_ARCHIVE_METHODS.find(
      (possibleArchiveMethod) => possibleArchiveMethod.method === rpc.method,
    )
    if (possibleArchiveMethod) {
      const param = rpc?.params?.[possibleArchiveMethod.index]
      return this.isParamForArchiveNode(param)
    }

    if (rpc.method.includes('getLogs')) {
      const param = rpc?.params?.[1] || {}
      return this.isParamForArchiveNode(param.fromBlock) || this.isParamForArchiveNode(param.toBlock)
    }

    return false
  },

  isParamForArchiveNode(param: unknown): boolean {
    return !!param && param !== 'latest'
  },
}