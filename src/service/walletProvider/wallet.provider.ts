import { Container, Service } from 'typedi'
import { ITatumSdkContainer, TatumSdkWalletProvider } from "../extensions";

@Service({
  factory: (data: { id: string }) => {
    return new WalletProvider(data.id)
  },
  transient: true,
})
export class WalletProvider {
  constructor(private readonly id: string) {
  }

  /**
   * Works are an entrypoint to interact with wallet providers of choice.
   * @param type - Wallet Provider type imported to the SDK instance
   */
  use<T, P, E extends TatumSdkWalletProvider<T, P>>(type: new (tatumSdkContainer: ITatumSdkContainer, ...args: unknown[]) => E): E {
    return Container.of(this.id).get(type);
  }
}
