import { describe, expect, it } from 'vitest'
import { PRODUCTS } from '../data/products'
import { calcPoints, filterProducts } from './catalog'

describe('filterProducts', () => {
  it('カテゴリが all でキーワードが空のとき全商品を返す', () => {
    expect(filterProducts(PRODUCTS, 'all', '')).toHaveLength(PRODUCTS.length)
  })

  it('カテゴリで絞り込む', () => {
    const result = filterProducts(PRODUCTS, '文具', '')
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((p) => p.category === '文具')).toBe(true)
  })

  it('商品名の部分一致で絞り込む', () => {
    const result = filterProducts(PRODUCTS, 'all', 'コーヒー')
    expect(result.every((p) => p.name.includes('コーヒー'))).toBe(true)
  })

  it('カテゴリとキーワードを同時に適用する', () => {
    const result = filterProducts(PRODUCTS, '食品', 'コーヒー')
    expect(result.every((p) => p.category === '食品' && p.name.includes('コーヒー'))).toBe(true)
  })

  it('一致しないときは空配列になる', () => {
    expect(filterProducts(PRODUCTS, 'all', '存在しない商品')).toEqual([])
  })
})

describe('calcPoints', () => {
  it('価格の1%を切り捨てで返す', () => {
    expect(calcPoints(1200)).toBe(12)
    expect(calcPoints(980)).toBe(9)
  })
})
