import { WalletEndpoint } from '@parrotfi/wallets'
import { web3 } from '@project-serum/anchor'
import BigNumber from 'bignumber.js'
import moment from 'moment'

export const NETWORK = process.env.NEXT_PUBLIC_NETWORK
export const VERSION = process.env.NEXT_PUBLIC_VERSION

/**
 * Used for lending page countdown
 */
export const IDO_STARTS = moment(process.env.NEXT_PUBLIC_IDO_START)

export const RPC_ENDPOINTS: WalletEndpoint[] = [
  {
    id: 'mainnet-beta',
    network: 'mainnet-beta' as web3.Cluster,
    rpcURL: process.env.NEXT_PUBLIC_RPC_URL,
    rpcName: 'Mainnet-beta',
    commitment: 'processed' as web3.Commitment,
  },
  // {
  //   id: 'devnet',
  //   network: 'devnet' as web3.Cluster,
  //   rpcURL: 'https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899/',
  //   rpcName: 'Devnet',
  //   commitment: 'processed' as web3.Commitment,
  // },
]

export const IDO_RESULTS = {
  '3UnvNhP3N3CC2BQWjUNfc5na37wYr6E3ro9Yd1RKnyFr': {},
}

export const IDO_ENDPOINTS = [
  // {
  //   net  work: 'mainnet-beta',
  //   programId: 'BRkhzczJALNLNbaYtLiuo4yQi6i33fQDt3z1wiujyKU4',
  //   usdcMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  //   pools: ['9KLppKiDcTiaonj55PmwiZCDU62R6JFz1uPEc26wXB5J'],
  // },
  {
    network: 'devnet',
    programId: '4jo3edmeRYPZypDAbYNmzUxt6zi8BR1sQMGphnsNAgJ9',
    usdcMint: '6VBXyszEKZ6qW5GarpjTVygY8riZnu2h6EMA9W1pCAd6',
    pools: ['3UnvNhP3N3CC2BQWjUNfc5na37wYr6E3ro9Yd1RKnyFr'],
  },
  // {
  //   network: 'devnet' as web3.Cluster,
  //   programId: '7EYV5r3K4efZXrPynWzidc5KTFTKjCtaQcpLV998zniF',
  //   usdcMint: '7GMQXhBQFmsbZs5P6g8SBdpfLJggwgLtydXtRWLtH2vU',
  //   pools: [
  //     'J1nASk9aWGe9cnUCm3MS5hFmsZC8tuSn7DjZAHPRSQBb'
  //   ],
  // },
]

const defaultNode = undefined

export const DEFAULT_RPC = RPC_ENDPOINTS.find((i) => {
  const r = i.id === `mainnet-beta`
  return r
})

export const RANDOM_DEFAULT_RPC_INDEXES = [0, 1]
