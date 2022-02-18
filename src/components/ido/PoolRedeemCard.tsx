import BigNumber from 'bignumber.js'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { IDO_RESULTS } from '../../config/constants'
import useLargestAccounts from '../../hooks/useLargestAccounts'
import usePool from '../../hooks/usePool'
import useVaults from '../../hooks/useVaults'
import { notify } from '../../stores/useNotificationStore'
import useWalletStore, { PoolAccount } from '../../stores/useWalletStore'
import { calculateSupply } from '../../utils/balance'
import { Button } from '../button'
import NumberText from '../texts/Number'
import PoolCountdown from './PoolCountdown'

interface PoolRedeemCardProps {
  pool: PoolAccount
}

const PoolRedeemCard: React.FC<PoolRedeemCardProps> = ({ pool }) => {
  const actions = useWalletStore((s) => s.actions)
  const connected = useWalletStore((s) => s.connected)
  const mints = useWalletStore((s) => s.mints)
  const largestAccounts = useLargestAccounts(pool)
  const { prtBalance, usdcBalance, fetchVaults } = useVaults(pool)
  const { startRedeem, poolStatus } = usePool(pool)
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const WATERMELON_TOTAL = 50_000_000

  const contributeBalance = largestAccounts.redeemable?.balance || 0

  let realTokenPrice = new BigNumber(usdcBalance / WATERMELON_TOTAL)

  const redeemablePrtAmount = useMemo(() => {
    const redeemableSupply = calculateSupply(mints, pool.redeemableMint)
    console.log('prt balance', prtBalance)
    console.log('usdcBalance', usdcBalance)
    console.log('redeemableSupply', redeemableSupply)
    console.log('contributeBalance', contributeBalance)
    console.log('realTokenPrice', realTokenPrice.toString())
    const basePrice = new BigNumber(0.1)

    if (realTokenPrice < new BigNumber(0.1)) {
      const tokenMultiple = realTokenPrice.dividedBy(basePrice)
      realTokenPrice = new BigNumber(0.1)
      //console.log('tokenMultiple', tokenMultiple.toString())
      return prtBalance && redeemableSupply
        ? ((contributeBalance * WATERMELON_TOTAL) / usdcBalance) *
            Number(tokenMultiple.toString())
        : 0
    } else {
      const returnVal =
        prtBalance && redeemableSupply
          ? (contributeBalance * prtBalance) / redeemableSupply
          : 0

      console.log('redeemable :' + returnVal)
      return returnVal
    }
  }, [prtBalance, contributeBalance, mints, pool.redeemableMint])

  const handleRedeem = useCallback(() => {
    setSubmitting(true)
  }, [])

  useEffect(() => {
    if (pool.redeemableMint) {
      actions.fetchMints()
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    if (largestAccounts.redeemable) {
      setLoading(false)
    }
  }, [largestAccounts])

  useEffect(() => {
    if (submitting) {
      const handleSubmit = async () => {
        try {
          await actions.submitRedeem(pool)
          setSubmitting(false)
          fetchVaults()
        } catch (e) {
          notify({
            type: 'error',
            title: 'Redeem error',
            message: e.message,
          })
          setSubmitting(false)
        }
      }
      handleSubmit()
    }
  }, [submitting])

  const idoResult = IDO_RESULTS[pool.publicKey.toBase58()]
  const estimatedPrice = useMemo(() => {
    if (realTokenPrice >= new BigNumber(0.1)) {
      return realTokenPrice
    } else {
      return new BigNumber(0.1)
    }
  }, [usdcBalance, prtBalance])

  const disableSubmit =
    !connected || loading || redeemablePrtAmount <= 0 || startRedeem.isAfter()

  return (
    <div className="">
      {startRedeem.isAfter() && (
        <div className="bg-secondary rounded-xl p-6 text-center mb-2">
          <p className="text-sm text-secondary">Redeem starts</p>
          <PoolCountdown
            poolStatus={poolStatus}
            date={startRedeem}
            className="justify-center pt-2"
          />
        </div>
      )}
      <div className="bg-secondary rounded-xl p-6 text-center">
        <p className="text-sm text-secondary">Total raised</p>
        <div className="flex items-center justify-center pt-2">
          <img
            alt=""
            width="20"
            height="20"
            src="/icons/usdc.svg"
            className="mr-2"
          />
          <NumberText
            className="font-bold text-mdx"
            value={idoResult?.contributed || usdcBalance.toString()}
            defaultIfNull="N/A"
          />
        </div>
      </div>
      <div className="bg-secondary rounded-xl p-6 text-center mt-2">
        <p className="text-sm text-secondary">Token Price</p>
        <div className="flex items-center justify-center pt-2">
          <img
            alt=""
            width="20"
            height="20"
            src="/icons/usdc.svg"
            className="mr-2"
          />
          <NumberText
            className="font-bold text-mdx"
            value={idoResult?.realTokenPrice || estimatedPrice.toString()}
            defaultIfNull="N/A"
            displayDecimals={9}
          />
        </div>
      </div>
      <div className="bg-secondary rounded-xl p-6 text-center mt-2">
        <p className="text-sm text-secondary">Your contribution</p>
        <div className="flex items-center justify-center pt-2">
          <img
            alt=""
            width="20"
            height="20"
            src="/icons/usdc.svg"
            className="mr-2"
          />
          <NumberText
            className="font-bold text-mdx"
            value={contributeBalance}
            defaultIfNull="N/A"
          />
        </div>
      </div>
      <div className="bg-secondary rounded-xl p-6 text-center mt-2">
        <p className="text-sm text-secondary">Redeemable amount</p>
        <div className="flex items-center justify-center pt-2">
          <img
            alt=""
            width="20"
            height="20"
            src="/icons/logo.png"
            className="mr-2"
          />
          <NumberText
            className="font-bold text-mdx"
            value={redeemablePrtAmount}
            displayDecimals={9}
            defaultIfNull="N/A"
          />
        </div>
      </div>
      <Button
        onClick={handleRedeem}
        className="w-full mt-6"
        disabled={disableSubmit}
        isLoading={submitting}
      >
        {submitting ? 'Waiting approval' : 'Redeem NYN'}
      </Button>
    </div>
  )
}

export default PoolRedeemCard
