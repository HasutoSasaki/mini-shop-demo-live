import { formatYen } from '../lib/cart'

type Props = {
  amount: number
  size?: 'large' | 'medium'
}

/** 「¥」を小さく、金額を大きく表示する */
export function Price({ amount, size = 'medium' }: Props) {
  const text = formatYen(amount)
  return (
    <span className={`price price-${size}`}>
      <span className="price-symbol">{text.charAt(0)}</span>
      <span className="price-whole">{text.slice(1)}</span>
    </span>
  )
}
