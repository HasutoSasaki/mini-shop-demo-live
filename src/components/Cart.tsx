import {
  calcRemainingForFreeShipping,
  calcShipping,
  calcSubtotal,
  calcTotal,
  countItems,
  formatYen,
  isFreeShipping,
  type CartItem,
} from '../lib/cart'
import { Price } from './Price'
import { ProductImage } from './ProductImage'
import { QuantityControl } from './QuantityControl'

type Props = {
  items: CartItem[]
  onIncrement: (productId: string) => void
  onDecrement: (productId: string) => void
  onRemove: (productId: string) => void
  onBackToProducts: () => void
}

export function Cart({ items, onIncrement, onDecrement, onRemove, onBackToProducts }: Props) {
  const count = countItems(items)

  if (items.length === 0) {
    return (
      <section className="cart-panel">
        <h2 className="cart-title">ショッピングカートに商品はありません。</h2>
        <p className="cart-empty-text">
          商品を探してカートに追加してください。
        </p>
        <button type="button" className="btn-yellow" onClick={onBackToProducts}>
          商品一覧へ
        </button>
      </section>
    )
  }

  return (
    <div className="cart-layout">
      <section className="cart-panel">
        <div className="cart-panel-head">
          <h2 className="cart-title">ショッピングカート</h2>
          <span className="cart-price-label">価格</span>
        </div>
        <ul className="cart-list">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="cart-row">
              <ProductImage product={product} size="small" />
              <div className="cart-info">
                <span className="cart-item-name">{product.name}</span>
                <span className="cart-item-meta">
                  {product.category}
                  {product.stock > 0 && <span className="in-stock">在庫あり</span>}
                </span>
                <div className="cart-controls">
                  <QuantityControl
                    quantity={quantity}
                    onIncrement={() => onIncrement(product.id)}
                    onDecrement={() => onDecrement(product.id)}
                  />
                  <span className="cart-divider" aria-hidden="true" />
                  <button type="button" className="link-button" onClick={() => onRemove(product.id)}>
                    削除
                  </button>
                </div>
              </div>
              <div className="cart-row-price">
                <Price amount={product.price * quantity} />
              </div>
            </li>
          ))}
        </ul>
        <p className="cart-subtotal-line">
          小計 ({count}点): <strong>{formatYen(calcSubtotal(items))}</strong>
        </p>
      </section>

      <aside className="cart-summary" aria-label="注文内容">
        <p className="summary-subtotal">
          小計 ({count}点): <strong>{formatYen(calcSubtotal(items))}</strong>
        </p>
        <dl className="summary-rows">
          <div>
            <dt>送料</dt>
            <dd>{isFreeShipping(items) ? '送料無料' : formatYen(calcShipping(items))}</dd>
            {!isFreeShipping(items) && (
              <dd className="summary-free-hint">
                あと {formatYen(calcRemainingForFreeShipping(items))} で送料無料
              </dd>
            )}
          </div>
          <div className="summary-total">
            <dt>合計</dt>
            <dd>{formatYen(calcTotal(items))}</dd>
          </div>
        </dl>
        <button type="button" className="btn-yellow btn-block" disabled>
          レジに進む
        </button>
        <p className="summary-note">デモのため決済はありません</p>
      </aside>
    </div>
  )
}
