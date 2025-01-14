/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { PostI } from '../../../dto/PostI'
import { EosRpcSuite } from '../../../dto/rpc/EosRpcSuite'
import { Constant } from '../../../util'
import { LoadBalancer } from '../generic'
import { AbstractEosRpc } from './AbstractEosRpc'

@Service({
  factory: (data: { id: string }) => {
    return new EosLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class EosLoadBalancerRpc extends AbstractEosRpc implements EosRpcSuite {
  protected readonly loadBalancer: LoadBalancer

  constructor(id: string) {
    super()
    this.loadBalancer = Container.of(id).get(LoadBalancer)
  }

  public destroy() {
    this.loadBalancer.destroy()
  }

  protected post<T>(post: PostI): Promise<T> {
    return this.loadBalancer.post({ ...post, basePath: `${this.getRpcNodeUrl()}${Constant.EOS_PREFIX}` })
  }

  getRpcNodeUrl(): string {
    return this.loadBalancer.getActiveNormalUrlWithFallback().url
  }
}
