import FormatCurrency from './Currency'
import { FC, ComponentProps } from 'react'

type FormatCryptoProps = {
  address?: string
  logoWidth?: number
}

type Props = ComponentProps<typeof FormatCurrency> & FormatCryptoProps

const FormatCrypto: FC<Props> = ({
  amount,
  maximumFractionDigits,
  address,
  logoWidth = 16,
}) => {

  return (
    <FormatCurrency
      amount={amount}
      maximumFractionDigits={maximumFractionDigits}
    >
      {address && (
        <img
          src='assets/img/logo.png'
          alt="Currency Logo"
          style={{ width: `${logoWidth}px` }}
        />
      )}
    </FormatCurrency>
  )
}

export default FormatCrypto