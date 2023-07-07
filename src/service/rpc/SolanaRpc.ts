/* eslint-disable @typescript-eslint/no-explicit-any */

import { Service } from 'typedi'
import {
  GetAccountInfoOptions,
  GetBlockOptions,
  GetBlockProductionOptions,
  GetCommitmentMinContextSlotOptions,
  GetCommitmentOptions,
  GetInflationRewardOptions,
  GetLargestAccountsOptions,
  GetLeaderScheduleOptions,
  GetMultipleAccountsOptions,
  GetProgramAccountsOptions,
  GetSignaturesForAddressOptions,
  GetSignatureStatusesOptions,
  GetStakeActivationOptions,
  GetSupplyOptions,
  GetTokenAccountsOptions,
  GetTransactionOptions,
  GetVoteAccountOptions,
  JsonRpcResponse,
  SendTransactionOptions,
  SimulateTransactionOptions,
  SolanaAccount,
  SolanaAccountInfo,
  SolanaBlockProduction,
  SolanaEpochInfo,
  SolanaEpochSchedule,
  SolanaLargestAccount,
  SolanaLatestBlockhash,
  SolanaLeaderSchedule,
  SolanaMint,
  SolanaProgramId,
  SolanaRpcSuite,
  SolanaSignatureStatus,
  SolanaSupply,
  SolanaTokenAccount,
  SolanaTokenAccountBalance,
  SolanaTokenSupply,
  SolanaTransaction,
  SolanaTransactionSimulation,
  SolanaTypeWithContext,
  SolanaVersion,
  SolanaVoteAccount,
} from '../../dto'
import { ResponseDto, ResponseUtils, Utils } from '../../util'
import { AbstractBatchRpc } from './generic'

@Service({
  factory: (data: { id: string }) => {
    return new SolanaRpc(data.id)
  },
  transient: true,
})
export class SolanaRpc extends AbstractBatchRpc implements SolanaRpcSuite {
  constructor(id: string) {
    super(id)
  }

  getAccountInfo(
    pubkey: string,
    options?: GetAccountInfoOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaAccountInfo | null>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getAccountInfo', [pubkey, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult<SolanaTypeWithContext<SolanaAccountInfo | null>>(r))
  }

  getBalance(address: string): Promise<ResponseDto<SolanaTypeWithContext<number>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getBalance', [address]))
      .then((r) => ResponseUtils.fromRpcResult<SolanaTypeWithContext<number>>(r))
  }

  getBlockHeight(options?: GetCommitmentMinContextSlotOptions): Promise<ResponseDto<number>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getBlockHeight', [options]))
      .then((r) => ResponseUtils.fromRpcResult<number>(r))
  }

  getBlock(
    block: number,
    options?: GetBlockOptions,
  ): Promise<
    ResponseDto<{
      blockhash: string
      previousBlockhash: string
      parentSlot: number
      transactions: Array<any>
      signatures: Array<any>
      rewards: Array<any> | undefined
      blockTime: number | null
      blockHeight: number | null
    } | null>
  > {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getBlock', [block, options]))
      .then((r) => ResponseUtils.fromRpcResult<{
        blockhash: string
        previousBlockhash: string
        parentSlot: number
        transactions: Array<any>
        signatures: Array<any>
        rewards: Array<any> | undefined
        blockTime: number | null
        blockHeight: number | null
      } | null>(r))
  }

  getBlockProduction(
    options?: GetBlockProductionOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaBlockProduction>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getBlockProduction', [options]))
      .then((r) => ResponseUtils.fromRpcResult<SolanaTypeWithContext<SolanaBlockProduction>>(r))
  }

  getBlockCommitment(block: number): Promise<ResponseDto<{ commitment: Array<number>; totalStake: number }>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getBlockCommitment', [block]))
      .then((r) => ResponseUtils.fromRpcResult<{ commitment: Array<number>; totalStake: number }>(r))
  }
  getBlocks(
    startSlot: number,
    endSlot?: number,
    options?: GetCommitmentOptions,
  ): Promise<ResponseDto<Array<number>>> {
    let params: any = [startSlot]
    if (endSlot) params = [startSlot, endSlot]

    if (options && options.commitment) params.push(options)

    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getBlocks', params))
      .then((r) => ResponseUtils.fromRpcResult<Array<number>>(r))
  }
  getBlocksWithLimit(
    startSlot: number,
    limit?: number,
    options?: GetCommitmentOptions,
  ): Promise<ResponseDto<Array<number>>> {
    let params: any = [startSlot]
    if (limit) params = [startSlot, limit]

    if (options && options.commitment) params.push(options)

    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getBlocksWithLimit', params))
      .then((r) => ResponseUtils.fromRpcResult<Array<number>>(r))
  }

  getBlockTime(block: number): Promise<ResponseDto<number | null>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getBlockTime', [block]))
      .then((r) => ResponseUtils.fromRpcResult<number | null>(r))
  }

  getClusterNodes(): Promise<
    ResponseDto<
      Array<{
        pubkey: string
        gossip?: string
        tpu?: string
        rpc?: string
        version?: string
        featureSet?: number
        shredVersion?: number
      }>
    >
  > {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getClusterNodes'))
      .then((r) => ResponseUtils.fromRpcResult<
        Array<{
          pubkey: string
          gossip?: string
          tpu?: string
          rpc?: string
          version?: string
          featureSet?: number
          shredVersion?: number
        }>
        >(r))
  }

  getEpochInfo(options?: GetCommitmentMinContextSlotOptions): Promise<ResponseDto<SolanaEpochInfo>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getEpochInfo', [options]))
      .then((r) => ResponseUtils.fromRpcResult<SolanaEpochInfo>(r))
  }

  getEpochSchedule(): Promise<ResponseDto<SolanaEpochSchedule>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getEpochSchedule'))
      .then((r) => ResponseUtils.fromRpcResult<SolanaEpochSchedule>(r))
  }

  getFeeForMessage(
    message: any,
    options?: GetCommitmentMinContextSlotOptions,
  ): Promise<ResponseDto<number | null>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getFeeForMessage', [message, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult<number | null>(r))
  }

  getFirstAvailableBlock(): Promise<ResponseDto<number>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getFirstAvailableBlock'))
      .then((r) => ResponseUtils.fromRpcResult<number>(r))
  }
  getGenesisHash(): Promise<ResponseDto<string>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getGenesisHash'))
      .then((r) => ResponseUtils.fromRpcResult<string>(r))
  }
  getHealth(): Promise<ResponseDto<string>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getHealth'))
      .then((r) => ResponseUtils.fromRpcResult<string>(r))
  }
  getHighestSnapshotSlot(): Promise<ResponseDto<{ full: number; incremental: number }>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getHighestSnapshotSlot'))
      .then((r) => ResponseUtils.fromRpcResult<{ full: number; incremental: number }>(r))
  }
  getIdentity(): Promise<ResponseDto<{ identity: string }>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getIdentity'))
      .then((r) => ResponseUtils.fromRpcResult<{ identity: string }>(r))
  }
  getInflationGovernor(options?: GetCommitmentOptions): Promise<
    ResponseDto<{
      initial: number
      terminal: number
      taper: number
      foundation: number
      foundationTerm: number
    }>
  > {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getInflationGovernor', [options]))
      .then((r) => ResponseUtils.fromRpcResult<{
        initial: number
        terminal: number
        taper: number
        foundation: number
        foundationTerm: number
      }>(r))
  }
  getInflationRate(): Promise<
    ResponseDto<{ total: number; validator: number; foundation: number; epoch: number }>
  > {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getInflationRate'))
      .then((r) => ResponseUtils.fromRpcResult<{ total: number; validator: number; foundation: number; epoch: number }>(r))
  }
  getInflationReward(
    addresses?: string[],
    options?: GetInflationRewardOptions,
  ): Promise<
    ResponseDto<
      Array<{
        epoch: number
        effectiveSlot: number
        amount: number
        postBalance: number
        commission: number
      }>
    >
  > {
    let params: any = []
    if (addresses) params = [addresses]
    if (options) params = [addresses, options]

    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getInflationReward', params))
      .then((r) => ResponseUtils.fromRpcResult<
        Array<{
          epoch: number
          effectiveSlot: number
          amount: number
          postBalance: number
          commission: number
        }>
        >(r))
  }
  getLargestAccounts(
    options?: GetLargestAccountsOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaLargestAccount[]>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getLargestAccounts', [options]))
      .then((r) => ResponseUtils.fromRpcResult<SolanaTypeWithContext<SolanaLargestAccount[]>>(r))
  }
  getLatestBlockhash(
    options?: GetCommitmentMinContextSlotOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaLatestBlockhash>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getLatestBlockhash', [options]))
      .then((r) => ResponseUtils.fromRpcResult<SolanaTypeWithContext<SolanaLatestBlockhash>>(r))
  }
  getLeaderSchedule(
    slot?: number,
    options?: GetLeaderScheduleOptions,
  ): Promise<ResponseDto<SolanaLeaderSchedule | null>> {
    let params: any = []
    if (slot) params = [slot]
    if (options) params = [slot, options]
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getLeaderSchedule', params),
      )
      .then((r) => ResponseUtils.fromRpcResult<SolanaLeaderSchedule | null>(r))
  }
  getMaxRetransmitSlot(): Promise<ResponseDto<number>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getMaxRetransmitSlot'))
      .then((r) => ResponseUtils.fromRpcResult<number>(r))
  }
  getMaxShredInsertSlot(): Promise<ResponseDto<number>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getMaxShredInsertSlot'))
      .then((r) => ResponseUtils.fromRpcResult<number>(r))
  }
  getMinimumBalanceForRentExemption(
    dataSize?: number,
    options?: GetCommitmentOptions,
  ): Promise<ResponseDto<number>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getMinimumBalanceForRentExemption', [dataSize, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult<number>(r))
  }
  getMultipleAccounts(
    pubKeys?: string[],
    options?: GetMultipleAccountsOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<Array<SolanaAccountInfo | null>>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getMultipleAccounts', [pubKeys, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult<SolanaTypeWithContext<Array<SolanaAccountInfo | null>>>(r))
  }
  getProgramAccounts(
    programId: string,
    options?: GetProgramAccountsOptions,
  ): Promise<ResponseDto<Array<{ account: SolanaAccountInfo; pubkey: string }>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getProgramAccounts', [programId, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult<Array<{ account: SolanaAccountInfo; pubkey: string }>>(r))
  }
  getRecentPerformanceSamples(limit?: number): Promise<
    ResponseDto<
      Array<{
        slot: number
        numTransactions: number
        numSlots: number
        samplePeriodSecs: number
        numNonVoteTransaction: number
      }>
    >
  > {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getRecentPerformanceSamples', [limit]),
      )
      .then((r) => ResponseUtils.fromRpcResult<
        Array<{
          slot: number
          numTransactions: number
          numSlots: number
          samplePeriodSecs: number
          numNonVoteTransaction: number
        }>
        >(r))
  }
  getRecentPrioritizationFees(
    addresses?: string[],
  ): Promise<ResponseDto<Array<{ slot: number; prioritizationFee: number }>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getRecentPrioritizationFees', [addresses]),
      )
      .then((r) => ResponseUtils.fromRpcResult<Array<{ slot: number; prioritizationFee: number }>>(r))
  }
  getSignaturesForAddress(
    address: string,
    options?: GetSignaturesForAddressOptions,
  ): Promise<
    ResponseDto<
      Array<{
        signature: string
        slot: number
        err: any | null
        memo: string | null
        blockTime: number | null
        confirmationStatus: string | null
      }>
    >
  > {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getSignaturesForAddress', [address, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult<
        Array<{
          signature: string
          slot: number
          err: any | null
          memo: string | null
          blockTime: number | null
          confirmationStatus: string | null
        }>
        >(r))
  }
  getSignatureStatuses(
    signatures?: string[],
    options?: GetSignatureStatusesOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaSignatureStatus>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getSignatureStatuses', [signatures, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult<SolanaTypeWithContext<SolanaSignatureStatus>>(r))
  }
  getSlot(options?: GetCommitmentMinContextSlotOptions): Promise<ResponseDto<number>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getSlot', [options]))
      .then((r) => ResponseUtils.fromRpcResult<number>(r))
  }
  getSlotLeader(options?: GetCommitmentMinContextSlotOptions): Promise<ResponseDto<string>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getSlotLeader', [options]))
      .then((r) => ResponseUtils.fromRpcResult<string>(r))
  }
  getSlotLeaders(startSlot?: number, limit?: number): Promise<ResponseDto<Array<string>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getSlotLeaders', [startSlot, limit]),
      )
      .then((r) => ResponseUtils.fromRpcResult<Array<string>>(r))
  }
  getStakeActivation(
    pubkey: string,
    options?: GetStakeActivationOptions,
  ): Promise<ResponseDto<{ state: string; active: number; inactive: number }>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getStakeActivation', [pubkey, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult<{ state: string; active: number; inactive: number }>(r))
  }
  getStakeMinimumDelegation(
    options?: GetCommitmentOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<number>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getStakeMinimumDelegation', [options]),
      )
      .then((r) => ResponseUtils.fromRpcResult<SolanaTypeWithContext<number>>(r))
  }
  getSupply(options?: GetSupplyOptions): Promise<ResponseDto<SolanaTypeWithContext<SolanaSupply>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getSupply', [options]))
      .then((r) => ResponseUtils.fromRpcResult<SolanaTypeWithContext<SolanaSupply>>(r))
  }
  getTokenAccountBalance(
    pubkey: string,
    options?: GetCommitmentOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaTokenAccountBalance>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getTokenAccountBalance', [pubkey, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult<SolanaTypeWithContext<SolanaTokenAccountBalance>>(r))
  }
  getTokenAccountsByDelegate(
    pubkey: string,
    config?: SolanaMint | SolanaProgramId,
    options?: GetTokenAccountsOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaTokenAccount[]>>> {
    const params: any[] = [pubkey]
    if (config) params.push(config)
    if (options) params.push(options)
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getTokenAccountsByDelegate', params),
      )
      .then((r) => ResponseUtils.fromRpcResult<SolanaTypeWithContext<SolanaTokenAccount[]>>(r))
  }
  getTokenAccountsByOwner(
    pubkey: string,
    config?: SolanaMint | SolanaProgramId,
    options?: GetTokenAccountsOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaTokenAccount[]>>> {
    const params: any[] = [pubkey]
    if (config) params.push(config)
    if (options) params.push(options)
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getTokenAccountsByOwner', params))
      .then((r) => ResponseUtils.fromRpcResult<SolanaTypeWithContext<SolanaTokenAccount[]>>(r))
  }
  getTokenLargestAccounts(
    pubkey: string,
    options?: GetCommitmentOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaAccount[]>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getTokenLargestAccounts', [pubkey, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult<SolanaTypeWithContext<SolanaAccount[]>>(r))
  }
  getTokenSupply(
    pubkey: string,
    options?: GetCommitmentOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaTokenSupply>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getTokenSupply', [pubkey, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult<SolanaTypeWithContext<SolanaTokenSupply>>(r))
  }
  getTransaction(
    signature: string,
    options?: GetTransactionOptions,
  ): Promise<ResponseDto<SolanaTransaction | null>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getTransaction', [signature, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult<SolanaTransaction | null>(r))
  }
  getTransactionCount(options?: GetCommitmentMinContextSlotOptions): Promise<ResponseDto<number>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getTransactionCount', [options]))
      .then((r) => ResponseUtils.fromRpcResult<number>(r))
  }
  getVersion(): Promise<ResponseDto<SolanaVersion>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getVersion'))
      .then((r) => ResponseUtils.fromRpcResult<SolanaVersion>(r))
  }
  getVoteAccounts(
    options?: GetVoteAccountOptions,
  ): Promise<ResponseDto<{ current: Array<SolanaVoteAccount>; delinquent: Array<SolanaVoteAccount> }>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getVoteAccounts', [options]))
      .then((r) => ResponseUtils.fromRpcResult<{ current: Array<SolanaVoteAccount>; delinquent: Array<SolanaVoteAccount> }>(r))
  }
  isBlockhashValid(
    blockhash: string,
    options?: GetCommitmentMinContextSlotOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<boolean>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('isBlockhashValid', [blockhash, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult<SolanaTypeWithContext<boolean>>(r))
  }
  minimumLedgerSlot(): Promise<ResponseDto<number>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('minimumLedgerSlot'))
      .then((r) => ResponseUtils.fromRpcResult<number>(r))
  }
  requestAirdrop(
    pubkey: string,
    amount: number,
    options?: GetCommitmentOptions,
  ): Promise<ResponseDto<string>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('requestAirdrop', [pubkey, amount, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult<string>(r))
  }
  sendTransaction(transaction: string, options?: SendTransactionOptions): Promise<ResponseDto<string>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('sendTransaction', [transaction, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult<string>(r))
  }
  simulateTransaction(
    transaction: string,
    options?: SimulateTransactionOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaTransactionSimulation>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('simulateTransaction', [transaction, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult<SolanaTypeWithContext<SolanaTransactionSimulation>>(r))
  }
}