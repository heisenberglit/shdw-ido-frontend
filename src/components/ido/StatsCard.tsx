import { QuestionMarkCircleIcon } from '@heroicons/react/outline'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import React from 'react'

import NumberText from '../texts/Number'
import { useTooltip } from '../tooltip'
import PoolCountdown from './PoolCountdown'

interface StatsCardProps {
  endIdo: moment.Moment
  endDeposits: moment.Moment
  poolStatus: string
  estimatedPrice: BigNumber
  vaultPrtBalance: number
  vaultUsdcBalance: number
}

const StatsCard: React.FC<StatsCardProps> = ({
  endIdo,
  endDeposits,
  poolStatus,
  estimatedPrice,
  vaultPrtBalance,
  vaultUsdcBalance,
}) => {
  const {
    targetRef: targetSaleRef,
    tooltip: tooltipSale,
    tooltipVisible: tooltipSaleVisible,
  } = useTooltip(
    `In the first 90 mins, you may deposit your USDC into the vault. During the sale period, the NYN price can fluctuate.`,
    {
      placement: 'bottom-start',
      trigger: 'hover',
    }
  )

  const {
    targetRef: targetGraceRef,
    tooltip: tooltipGrace,
    tooltipVisible: tooltipGraceVisible,
  } = useTooltip(`After 90 mins, deposits will be restricted.`, {
    placement: 'bottom-start',
    trigger: 'hover',
  })

  return (
    <div className="flex flex-col space-y-2">
      <div className="bg-secondary rounded-xl p-6 flex items-center justify-center">
        <div>
          <div className="text-sm text-secondary flex flex-row items-center justify-center">
            <span className="mr-1">Sale Period Ends</span>
            <span ref={targetSaleRef}>
              <QuestionMarkCircleIcon className="h-5 w-5" />
            </span>
            {tooltipSaleVisible && tooltipSale}
          </div>
          <PoolCountdown
            poolStatus={poolStatus}
            date={endDeposits}
            className="justify-center pt-2"
          />
        </div>
        {/* <div>
          <div className="text-sm text-secondary flex flex-row items-center justify-center">
            <span className="mr-1">Grace Period Ends</span>
            <span ref={targetGraceRef}>
              <QuestionMarkCircleIcon className="h-5 w-5" />
            </span>
            {tooltipGraceVisible && tooltipGrace}
          </div>
          <PoolCountdown
            poolStatus={poolStatus}
            date={endIdo}
            className="justify-center pt-2"
          />
        </div> */}
      </div>
      <div className="bg-secondary rounded-xl p-6 text-center">
        <p className="text-sm text-secondary">USDC Contributed</p>
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
            value={vaultUsdcBalance}
            defaultIfNull="N/A"
          />
        </div>
      </div>
      <div className="bg-secondary rounded-xl p-6 text-center">
        <p className="text-sm text-secondary">Estimated Token Price</p>
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
            value={estimatedPrice}
            defaultIfNull="N/A"
            displayDecimals={9}
          />
        </div>
      </div>
      <div className="bg-secondary rounded-xl p-6 text-center">
        <p className="text-sm text-secondary">NYN For Sale</p>
        <div className="flex items-center justify-center pt-2">
          <img className="h-5 mr-2 w-auto" src="/icons/logo.png" alt=" " />
          <NumberText
            className="font-bold text-mdx"
            value={vaultPrtBalance}
            defaultIfNull="N/A"
            displayDecimals={9}
          />
        </div>
      </div>
    </div>
  )
}

export default StatsCard
