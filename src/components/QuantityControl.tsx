import { Trash2 } from 'lucide-react'

type Props = {
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
  /** 親要素の幅いっぱいに広げる（商品カード用） */
  block?: boolean
}

/** 「− 数量 ＋」の丸いピル。数量が 1 のときは「−」の代わりにゴミ箱を出す */
export function QuantityControl({ quantity, onIncrement, onDecrement, block = false }: Props) {
  const isLast = quantity <= 1
  return (
    <div className={block ? 'qty-pill qty-pill-block' : 'qty-pill'}>
      <button
        type="button"
        aria-label={isLast ? 'カートから削除' : '数量を減らす'}
        title={isLast ? 'カートから削除' : '数量を減らす'}
        onClick={onDecrement}
      >
        {isLast ? <Trash2 size={18} aria-hidden="true" /> : '−'}
      </button>
      <span className="qty-value" aria-live="polite">
        {quantity}
      </span>
      <button type="button" aria-label="数量を増やす" title="数量を増やす" onClick={onIncrement}>
        ＋
      </button>
    </div>
  )
}
