/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import {
  JsonRpcCall,
  JsonRpcResponse,
} from '../../../dto'
import { GenericRpc } from '../generic/GenericRpc'
import { Utils } from '../../../util'
import { AbstractEvmBasedRpc } from './AbstractEvmBasedRpc'

@Service({
  factory: (data: { id: string }) => {
    return new EvmBasedRpc(data.id)
  },
  transient: true,
})
export class EvmBasedRpc extends AbstractEvmBasedRpc {
  public readonly genericRpc: GenericRpc

  constructor(id: string) {
    super()
    this.genericRpc = Container.of(id).get(GenericRpc)
  }

  protected async rpcCall<T>(method: string, params?: unknown[]): Promise<T> {
    const preparedCall = Utils.prepareRpcCall(method, params)
    return (await this.genericRpc.rawRpcCall(preparedCall)) as T
  }

  async rawRpcCall<T>(body: JsonRpcCall): Promise<T> {
    return (await this.genericRpc.rawRpcCall(body)) as T
  }

  async rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse[]> {
    return this.genericRpc.rawBatchRpcCall(body)
  }

  destroy(): void {
    // do nothing
  }
}