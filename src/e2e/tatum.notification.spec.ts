import { Network } from '../dto'
import { AddressEventNotification, TatumSDK } from '../service'
import { Status } from '../util'
import { TestConst } from './e2e.constant'
import { e2eUtil } from './e2e.util'

const AddressEventNetworks = [
  Network.BITCOIN,
  Network.BITCOIN_TESTNET,
  Network.BITCOIN_CASH,
  Network.BITCOIN_CASH_TESTNET,
  Network.LITECOIN,
  Network.LITECOIN_TESTNET,
  Network.DOGECOIN,
  Network.DOGECOIN_TESTNET,
  Network.ETHEREUM,
  Network.ETHEREUM_SEPOLIA,
  Network.POLYGON,
  Network.POLYGON_MUMBAI,
  Network.CELO,
  Network.CELO_ALFAJORES,
  Network.SOLANA,
  Network.SOLANA_DEVNET,
  Network.BINANCE_SMART_CHAIN,
  Network.BINANCE_SMART_CHAIN_TESTNET,
  Network.TRON,
  Network.TRON_SHASTA,
  Network.KLAYTN,
  Network.KLAYTN_BAOBAB,
]

const NotificationV2Networks = [
  Network.BITCOIN,
  Network.BITCOIN_TESTNET,
  Network.LITECOIN,
  Network.LITECOIN_TESTNET,
  Network.DOGECOIN,
  Network.DOGECOIN_TESTNET,
  Network.ETHEREUM,
  Network.ETHEREUM_SEPOLIA,
  Network.POLYGON,
  Network.POLYGON_MUMBAI,
  Network.CELO,
  Network.CELO_ALFAJORES,
  Network.BINANCE_SMART_CHAIN,
  Network.BINANCE_SMART_CHAIN_TESTNET,
  Network.XRP,
  Network.XRP_TESTNET,
  Network.KLAYTN,
  Network.KLAYTN_BAOBAB,
]

const OutgoingNativeTxNetworks = [
  Network.BITCOIN,
  Network.BITCOIN_TESTNET,
  Network.LITECOIN,
  Network.LITECOIN_TESTNET,
  Network.ETHEREUM,
  Network.ETHEREUM_SEPOLIA,
  Network.POLYGON,
  Network.POLYGON_MUMBAI,
  Network.CELO,
  Network.CELO_ALFAJORES,
  Network.BINANCE_SMART_CHAIN,
  Network.BINANCE_SMART_CHAIN_TESTNET,
  Network.XRP,
  Network.XRP_TESTNET,
  Network.KLAYTN,
  Network.KLAYTN_BAOBAB,
]
const EvmOnlyNetworks = [
  Network.ETHEREUM,
  Network.ETHEREUM_SEPOLIA,
  Network.POLYGON,
  Network.POLYGON_MUMBAI,
  Network.CELO,
  Network.CELO_ALFAJORES,
  Network.BINANCE_SMART_CHAIN,
  Network.BINANCE_SMART_CHAIN_TESTNET,
  Network.KLAYTN,
  Network.KLAYTN_BAOBAB,
]
const FungibleNetworks = [
  Network.ETHEREUM,
  Network.ETHEREUM_SEPOLIA,
  Network.POLYGON,
  Network.POLYGON_MUMBAI,
  Network.CELO,
  Network.CELO_ALFAJORES,
  Network.BINANCE_SMART_CHAIN,
  Network.BINANCE_SMART_CHAIN_TESTNET,
  Network.KLAYTN,
  Network.KLAYTN_BAOBAB,
]
const InternalTxNetworks = [Network.ETHEREUM, Network.ETHEREUM_SEPOLIA, Network.CELO, Network.CELO_ALFAJORES]
describe('notification', () => {
  describe('createSubscription', () => {
    describe('IP auth', () => {
      describe('Address Event', () => {
        it.each(Object.values(AddressEventNetworks))('OK %s', async (network: Network) => {
          const tatum = await TatumSDK.init({ network, verbose: true })
          await e2eUtil.subscriptions.testAddressBasedSubscription(
            tatum,
            e2eUtil.subscriptions.getAddress(network),
            tatum.notification.subscribe.addressEvent,
          )
        })
      })

      describe('Incoming Native Tx', () => {
        it.each(Object.values(NotificationV2Networks))('OK %s', async (network: Network) => {
          const tatum = await TatumSDK.init({ network, verbose: true })
          await e2eUtil.subscriptions.testAddressBasedSubscription(
            tatum,
            e2eUtil.subscriptions.getAddress(network),
            tatum.notification.subscribe.incomingNativeTx,
          )
        })
      })

      describe('Outgoing Native Tx', () => {
        it.each(Object.values(OutgoingNativeTxNetworks))('OK %s', async (network: Network) => {
          const tatum = await TatumSDK.init({ network, verbose: true })
          await e2eUtil.subscriptions.testAddressBasedSubscription(
            tatum,
            e2eUtil.subscriptions.getAddress(network),
            tatum.notification.subscribe.outgoingNativeTx,
          )
        })
      })

      describe('Outgoing Failed Tx', () => {
        it.each(Object.values(EvmOnlyNetworks))('OK %s', async (network: Network) => {
          const tatum = await TatumSDK.init({ network, verbose: true })
          await e2eUtil.subscriptions.testAddressBasedSubscription(
            tatum,
            e2eUtil.subscriptions.getAddress(network),
            tatum.notification.subscribe.outgoingFailedTx,
          )
        })
      })

      describe('Paid Fee', () => {
        it.each(Object.values(EvmOnlyNetworks))('OK %s', async (network: Network) => {
          const tatum = await TatumSDK.init({ network, verbose: true })
          await e2eUtil.subscriptions.testAddressBasedSubscription(
            tatum,
            e2eUtil.subscriptions.getAddress(network),
            tatum.notification.subscribe.paidFee,
          )
        })
      })

      describe('Incoming Internal Tx', () => {
        it.each(Object.values(InternalTxNetworks))('OK %s', async (network: Network) => {
          const tatum = await TatumSDK.init({ network, verbose: true })
          await e2eUtil.subscriptions.testAddressBasedSubscription(
            tatum,
            e2eUtil.subscriptions.getAddress(network),
            tatum.notification.subscribe.incomingInternalTx,
          )
        })
      })

      describe('Outgoing Internal Tx', () => {
        it.each(Object.values(InternalTxNetworks))('OK %s', async (network: Network) => {
          const tatum = await TatumSDK.init({ network, verbose: true })
          await e2eUtil.subscriptions.testAddressBasedSubscription(
            tatum,
            e2eUtil.subscriptions.getAddress(network),
            tatum.notification.subscribe.outgoingInternalTx,
          )
        })
      })

      describe('Incoming Fungible Tx', () => {
        it.each(Object.values(FungibleNetworks))('OK %s', async (network: Network) => {
          const tatum = await TatumSDK.init({ network, verbose: true })
          await e2eUtil.subscriptions.testAddressBasedSubscription(
            tatum,
            e2eUtil.subscriptions.getAddress(network),
            tatum.notification.subscribe.incomingFungibleTx,
          )
        })
      })

      describe('Outgoing Fungible Tx', () => {
        it.each(Object.values(FungibleNetworks))('OK %s', async (network: Network) => {
          const tatum = await TatumSDK.init({ network, verbose: true })
          await e2eUtil.subscriptions.testAddressBasedSubscription(
            tatum,
            e2eUtil.subscriptions.getAddress(network),
            tatum.notification.subscribe.outgoingFungibleTx,
          )
        })
      })

      describe('Incoming Nft Tx', () => {
        it.each(Object.values(EvmOnlyNetworks))('OK %s', async (network: Network) => {
          const tatum = await TatumSDK.init({ network, verbose: true })
          await e2eUtil.subscriptions.testAddressBasedSubscription(
            tatum,
            e2eUtil.subscriptions.getAddress(network),
            tatum.notification.subscribe.incomingNftTx,
          )
        })
      })

      describe('Outgoing Nft Tx', () => {
        it.each(Object.values(EvmOnlyNetworks))('OK %s', async (network: Network) => {
          const tatum = await TatumSDK.init({ network, verbose: true })
          await e2eUtil.subscriptions.testAddressBasedSubscription(
            tatum,
            e2eUtil.subscriptions.getAddress(network),
            tatum.notification.subscribe.outgoingNftTx,
          )
        })
      })

      describe('Incoming Multitoken Tx', () => {
        it.each(Object.values(EvmOnlyNetworks))('OK %s', async (network: Network) => {
          const tatum = await TatumSDK.init({ network, verbose: true })
          await e2eUtil.subscriptions.testAddressBasedSubscription(
            tatum,
            e2eUtil.subscriptions.getAddress(network),
            tatum.notification.subscribe.incomingMultitokenTx,
          )
        })
      })

      describe('Outgoing Multitoken Tx', () => {
        it.each(Object.values(EvmOnlyNetworks))('OK %s', async (network: Network) => {
          const tatum = await TatumSDK.init({ network, verbose: true })
          await e2eUtil.subscriptions.testAddressBasedSubscription(
            tatum,
            e2eUtil.subscriptions.getAddress(network),
            tatum.notification.subscribe.outgoingMultitokenTx,
          )
        })
      })

      describe('Failed Txs Per Block', () => {
        it.each(Object.values(EvmOnlyNetworks))('OK %s', async (network: Network) => {
          const tatum = await TatumSDK.init({ network, verbose: true })
          await e2eUtil.subscriptions.testBlockBasedSubscription(
            tatum,
            tatum.notification.subscribe.failedTxsPerBlock,
          )
        })
      })
    })

    it('NOK - existing subscription ', async () => {
      const tatum = await TatumSDK.init({ network: Network.ETHEREUM, verbose: true })
      await tatum.notification.subscribe.addressEvent({
        url: 'https://tatum.com',
        address: TestConst.EXISTING_SUBSCRIPTION_ETH_ADDRESS,
      })

      const { status, error } = await tatum.notification.subscribe.addressEvent({
        url: 'https://tatum.io',
        address: TestConst.EXISTING_SUBSCRIPTION_ETH_ADDRESS,
      })

      expect(status).toEqual(Status.ERROR)
      expect(error?.message[0]).toMatch(
        /^Subscription for type ADDRESS_EVENT on the address id 0xbaf6dc2e647aeb6f510f9e318856a1bcd66c5e19 and currency ETH already exists./,
      )
      expect(error?.code).toEqual('subscription.exists.on.address-and-currency')
    })

    it('NOK - invalid address', async () => {
      const tatum = await TatumSDK.init({ network: Network.ETHEREUM, verbose: true })

      const { status, error } = await tatum.notification.subscribe.addressEvent({
        url: 'https://tatum.io',
        address: TestConst.INVALID_ETH_ADDRESS,
      })
      expect(status).toEqual(Status.ERROR)
      expect(error?.message).toEqual([
        'address must be a valid ETH address. Address must start with 0x and must contain 40 hexadecimal characters after and have the correct checksum. ',
      ])
      expect(error?.code).toEqual('validation.failed')
    })
  })

  describe('deleteSubscription', () => {
    it('OK', async () => {
      const tatum = await TatumSDK.init({ network: Network.ETHEREUM_SEPOLIA, verbose: true })
      const address = e2eUtil.subscriptions.getAddress(Network.ETHEREUM_SEPOLIA)
      const { data: subscribeData } = await tatum.notification.subscribe.addressEvent({
        url: 'https://tatum.io',
        address,
      })
      const { id } = subscribeData
      await tatum.notification.unsubscribe(id)
      const { data } = await tatum.notification.getAll()
      const subscriptions = data.find(
        (s) => s.network === Network.ETHEREUM && s.address.toLowerCase() === address.toLowerCase(),
      ) as AddressEventNotification
      expect(subscriptions).toEqual(undefined)
    })

    it('NOK - invalid subscription', async () => {
      const tatum = await TatumSDK.init({ network: Network.ETHEREUM_SEPOLIA, verbose: true })
      const { data, status, error } = await tatum.notification.unsubscribe('invalid-subscription-id')
      expect(data).toEqual(null)
      expect(status).toEqual(Status.ERROR)
      expect((error?.message as object[])[0]).toEqual(
        'id should be valid id and 24 characters long, e.g. 6398ded68bfa23a9709b1b17',
      )
    })
  })

  it('getAll', async () => {
    const tatum = await TatumSDK.init({ network: Network.ETHEREUM, verbose: true })
    const { data, error } = await tatum.notification.getAll()
    console.log(new Date().toISOString(), error)
    expect(data[0].id).toBeDefined()
    expect(data[0].network).toBeDefined()
    expect(data[0].address).toBeDefined()
    expect(data[0].url).toBeDefined()
    expect(data[0].type).toBeDefined()
    expect(data.length).toBeGreaterThan(0)
  })

  // TODO pipeline dont work with this test - IP auth
  it.skip('getAllExecutedWebhooks', async () => {
    const tatum = await TatumSDK.init({ network: Network.ETHEREUM_SEPOLIA, verbose: true })
    const { data } = await tatum.notification.getAllExecutedWebhooks()
    expect(data[0].type).toBeDefined()
    expect(data[0].id).toBeDefined()
    expect(data[0].subscriptionId).toBeDefined()
    expect(data[0].url).toBeDefined()
    expect(data[0].data).toBeDefined()
    expect(data[0].timestamp).toBeDefined()
    expect(data[0].failed).toBeDefined()
    expect(data[0].response).toBeDefined()
  })
})
