import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

const faqs = [
  {
    question: 'When is the IDO taking place?',
    answer: 'The IDO begins on Feb 18th, 2022 @ 3pm UTC',
  },
  {
    question: 'Will I need SOL in my wallet?',
    answer:
      'Yes, you will need SOL in your wallet to pay for transaction fees. If you have a 0 SOL balance but have USDC, your transactions will fail.',
  },
  {
    question: 'Will I need USDC?',
    answer: 'Yes, the IDO deposits will be placed in USDC',
  },
  {
    question: 'Where will the token be listed post-IDO?',
    answer:
      'Thus far we have gotten firm confirmation of listings on Orca, Raydium, and Aldrin DEX (with more to come)!',
  },
  {
    question: 'How does the IDO work?',
    answer: (
      <>
        <p>
          Step #1 - Connect your wallet (we recommend using Phantom). You will
          need to have USDC in your wallet in order to participate in the IDO.
        </p>
        <br />
        <p>
          Step #2 - Enter the amount of USDC you wish to contribute to the IDO
          pool and click deposit.
        </p>
        <br />
        <p>
          Step #3 - Confirm the amount of USDC you wish to contribute to the IDO
          pool. This finalizes your deposit.
        </p>
        <br />
        <p>
          Step #4 - Wait until the deposit phase of the IDO expires. The deposit
          phase opens on 18th Feb at 3pm UTC and will last for 90 mins in order
          to ensure people from all time zones are able to participate.
        </p>
        <br />
        <p>
          Step #5 - After the deposit phase has expired, you can return to the
          IDO page and collect your $NYN token! The redemption phase will last
          for as long as there are outstanding $NYN tokens needing to be
          redeemed.
        </p>
        <br />
        <p>
          Step #6 - Congratulations! Your $NYN tokens are now in your wallet!
        </p>
        <br />
      </>
    ),
  },
  {
    question: `Where do I need to start accruing my USDC?`,
    answer: `Your Phantom wallet! Phantom's code is battle tested and we love the focus they have on protecting their users. So, you'll just be connecting your Phantom wallet to the IDO site. Ez pz!`,
  },
  {
    question: `Can I participate in the IDO even if I don't have a NYN NFT?`,
    answer: 'Of course! The IDO is not tied to owning a Nyan NFT.',
  },
  {
    question: `My transaction timed out while trying to deposit.`,
    answer: (
      <>
        <p>
          This can be caused by numerous different factors. The following steps
          are a good starting point to resolve the issue:
        </p>
        <br />
        <p>
          Check that you have SOL in the wallet you&apos;re using. If you do
          not, try sending around 0.1 SOL to your wallet.
        </p>
        <br />
        <p>
          Check that you&apos;re using the latest version of
          Chrome/Brave/Firefox.
        </p>
        <br />
        <p>Try a different network (VPN, connect to a mobile hotspot, etc)</p>
        <br />
        <p>
          Try a different web browser. Example: if using Chrome, try Firefox.
        </p>
        <br />
        <p>Try small test transactions to see if that goes through.</p>
        <p>
          Shift your balance to a different wallet and try from that different
          wallet.
        </p>
        <br />
      </>
    ),
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FAQs() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto pt-6 pb-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <h2 className="text-center text-2xl font-extrabold text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-md">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                        <span className="font-bold text-gray-900">
                          {faq.question}
                        </span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={classNames(
                              open ? '-rotate-180' : 'rotate-0',
                              'h-6 w-6 transform'
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500 leading-snug">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
