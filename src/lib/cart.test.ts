import { describe, expect, it } from 'vitest'
import { PRODUCTS } from '../data/products'
import { calcShipping, calcSubtotal, calcTotal, countItems, type CartItem } from './cart'

const coffee = PRODUCTS.find((p) => p.id === 'coffee-beans')! // 1,200円
const pen = PRODUCTS.find((p) => p.id === 'pen')! // 300円

describe('calcSubtotal', () => {
  it('カートが空のとき 0 を返す', () => {
    expect(calcSubtotal([])).toBe(0)
  })

  it('単価 × 数量を合計する', () => {
    const items: CartItem[] = [
      { product: coffee, quantity: 2 },
      { product: pen, quantity: 3 },
    ]
    expect(calcSubtotal(items)).toBe(1200 * 2 + 300 * 3)
  })
})

describe('calcShipping', () => {
  it('カートが空のとき送料は 0 になる', () => {
    expect(calcShipping([])).toBe(0)
  })

  it('商品があるとき一律の送料がかかる', () => {
    expect(calcShipping([{ product: pen, quantity: 1 }])).toBe(500)
  })
})

describe('calcTotal', () => {
  it('小計に送料を足した金額になる', () => {
    expect(calcTotal([{ product: coffee, quantity: 1 }])).toBe(1200 + 500)
  })
})

describe('countItems', () => {
  it('数量の合計を返す', () => {
    const items: CartItem[] = [
      { product: coffee, quantity: 2 },
      { product: pen, quantity: 3 },
    ]
    expect(countItems(items)).toBe(5)
  })
})
