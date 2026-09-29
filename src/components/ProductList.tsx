import { Truck } from 'lucide-react'
import type { Product } from '../data/products'
import { calcPoints, LOW_STOCK_THRESHOLD } from '../lib/catalog'
import { Price } from './Price'
import { ProductImage } from './ProductImage'
import { QuantityControl } from './QuantityControl'
import { Rating } from './Rating'

type Props = {
  title: string
  products: Product[]
  /** 商品 ID → カート内の数量 */
  quantities: Record<string, number>
  onAdd: (product: Product) => void
  onIncrement: (productId: string) => void
  onDecrement: (productId: string) => void
}

export function ProductList({ title, products, quantities, onAdd, onIncrement, onDecrement }: Props) {
  return (
    <section>
      <div className="list-head">
        <h2 className="page-title">{title}</h2>
        <span className="result-count">{products.length}件の商品</span>
      </div>
      {products.length === 0 ? (
        <div className="no-results">
          <p className="no-results-title">一致する商品はありません。</p>
          <p>キーワードを変えるか、別のカテゴリをお試しください。</p>
        </div>
      ) : (
        <ul className="product-grid">
          {products.map((product) => {
            const quantity = quantities[product.id] ?? 0
            const lowStock = product.stock > 0 && product.stock <= LOW_STOCK_THRESHOLD
            return (
              <li key={product.id} className="product-card">
                <div className="product-media">
                  <ProductImage product={product} />
                  {product.badge && (
                    <span className={product.badge === '新着' ? 'badge badge-new' : 'badge badge-best'}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="product-body">
                  <h3 className="product-name">{product.name}</h3>
                  <Rating rating={product.rating} reviewCount={product.reviewCount} />
                  <div className="price-row">
                    <Price amount={product.price} size="large" />
                    <span className="points">{calcPoints(product.price)}ポイント(1%)</span>
                  </div>
                  <p className="delivery">
                    <Truck size={16} aria-hidden="true" />
                    最短翌日お届け
                  </p>
                  {lowStock ? (
                    <p className="low-stock">残り{product.stock}点 ご注文はお早めに</p>
                  ) : (
                    <p className="low-stock-placeholder" aria-hidden="true" />
                  )}
                  {quantity > 0 ? (
                    <QuantityControl
                      quantity={quantity}
                      onIncrement={() => onIncrement(product.id)}
                      onDecrement={() => onDecrement(product.id)}
                      block
                    />
                  ) : (
                    <button type="button" className="btn-yellow" onClick={() => onAdd(product)}>
                      カートに入れる
                    </button>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
