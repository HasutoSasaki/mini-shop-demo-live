import { ChevronRight, CircleCheck, Search, ShoppingCart, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Cart } from './components/Cart'
import { CategoryNav } from './components/CategoryNav'
import { ProductList } from './components/ProductList'
import { PRODUCTS, type Product } from './data/products'
import type { CartItem } from './lib/cart'
import { filterProducts, type CategoryFilter } from './lib/catalog'

type View = 'products' | 'cart'

export default function App() {
  const [view, setView] = useState<View>('products')
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [query, setQuery] = useState('')
  const [items, setItems] = useState<CartItem[]>([])
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(null), 2500)
    return () => clearTimeout(timer)
  }, [notice])

  // 画面を切り替えたら追加通知は消す（カートの見出しに重ならないように）
  useEffect(() => {
    setNotice(null)
  }, [view])

  const keyword = query.trim()
  const visibleProducts = filterProducts(PRODUCTS, category, keyword)
  const listTitle = keyword ? `「${keyword}」の検索結果` : category === 'all' ? 'すべての商品' : category
  const quantities = Object.fromEntries(items.map((item) => [item.product.id, item.quantity]))

  const showProducts = (next: CategoryFilter) => {
    setCategory(next)
    setView('products')
  }

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    setNotice(product.name)
  }

  const increment = (productId: string) => {
    setItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item)),
    )
  }

  const decrement = (productId: string) => {
    setItems((prev) =>
      prev.flatMap((item) => {
        if (item.product.id !== productId) return [item]
        return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : []
      }),
    )
  }

  const remove = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  return (
    <div className="app">
      <header className="header">
        <button type="button" className="brand" onClick={() => showProducts('all')}>
          Mini Shop
        </button>
        <form
          className="search"
          role="search"
          onSubmit={(e) => {
            e.preventDefault()
            setView('products')
          }}
        >
          <input
            type="search"
            aria-label="商品を検索"
            placeholder="Mini Shop で商品を検索"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" aria-label="検索">
            <Search size={22} aria-hidden="true" />
          </button>
        </form>
        <div className="account" aria-label="アカウント">
          <User size={26} aria-hidden="true" />
          <span className="account-text">
            <span className="account-greeting">こんにちは、ゲストさん</span>
            <span className="account-status">デモモードで閲覧中</span>
          </span>
        </div>
        <button
          type="button"
          className={view === 'cart' ? 'cart-link active' : 'cart-link'}
          onClick={() => setView('cart')}
        >
          <ShoppingCart size={30} aria-hidden="true" />
          <span>カート</span>
        </button>
      </header>
      <CategoryNav selected={category} onSelect={showProducts} />

      <main className="main">
        {notice && (
          <div className="notice" role="status">
            <CircleCheck size={22} aria-hidden="true" />
            <span className="notice-text">「{notice}」をカートに追加しました</span>
            <button type="button" className="btn-outline" onClick={() => setView('cart')}>
              カートを見る
            </button>
          </div>
        )}

        {view === 'products' ? (
          <>
            {(category !== 'all' || keyword !== '') && (
              <nav className="breadcrumb" aria-label="現在位置">
                <button type="button" className="link-button" onClick={() => showProducts('all')}>
                  ホーム
                </button>
                {category !== 'all' && (
                  <>
                    <ChevronRight size={14} aria-hidden="true" />
                    <span>{category}</span>
                  </>
                )}
                {keyword !== '' && (
                  <>
                    <ChevronRight size={14} aria-hidden="true" />
                    <span>「{keyword}」の検索結果</span>
                  </>
                )}
              </nav>
            )}
            <ProductList
              title={listTitle}
              products={visibleProducts}
              quantities={quantities}
              onAdd={addToCart}
              onIncrement={increment}
              onDecrement={decrement}
            />
          </>
        ) : (
          <Cart
            items={items}
            onIncrement={increment}
            onDecrement={decrement}
            onRemove={remove}
            onBackToProducts={() => showProducts('all')}
          />
        )}
      </main>

      <button type="button" className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        トップへ戻る
      </button>
      <footer className="footer">
        <div className="footer-columns">
          <div>
            <h3>Mini Shop について</h3>
            <p>Claude Code のデモ用に作られたショッピングサイトです。実際の販売は行っていません。</p>
          </div>
          <div>
            <h3>配送について</h3>
            <p>送料は全国一律 ¥500 です。ご注文から最短翌日にお届けします（デモ用の設定です）。</p>
          </div>
          <div>
            <h3>お支払いについて</h3>
            <p>デモのため決済機能はありません。カートの内容はページを再読み込みすると消えます。</p>
          </div>
        </div>
        <p className="copyright">© 2026 Mini Shop (demo)</p>
      </footer>
    </div>
  )
}
