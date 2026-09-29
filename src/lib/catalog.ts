import type { Category, Product } from '../data/products'

export type CategoryFilter = Category | 'all'

export const CATEGORIES: Category[] = ['食品', '雑貨', '文具', 'アパレル']

/** カテゴリとキーワード（商品名の部分一致）で商品を絞り込む */
export function filterProducts(products: Product[], category: CategoryFilter, keyword: string): Product[] {
  const word = keyword.trim()
  return products.filter(
    (product) =>
      (category === 'all' || product.category === category) && (word === '' || product.name.includes(word)),
  )
}

/** 獲得ポイント（価格の1%、端数切り捨て） */
export function calcPoints(price: number): number {
  return Math.floor(price / 100)
}

/** 「残り○点」を表示する在庫数の上限 */
export const LOW_STOCK_THRESHOLD = 5
