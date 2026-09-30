import { describe, expect, it } from 'vitest'
import { PRODUCTS } from '../data/products'
import { calcRemainingForFreeShipping, calcShipping, calcSubtotal, calcTotal, countItems, isFreeShipping, type CartItem } from './cart'

const coffee = PRODUCTS.find((p) => p.id === 'coffee-beans')! // 1,200円
const tshirt = PRODUCTS.find((p) => p.id === 'tshirt')! // 2,500円
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

describe('送料無料の判定', () => {
  const under: CartItem[] = [{ product: coffee, quantity: 4 }] // 4,800円
  const exact: CartItem[] = [{ product: tshirt, quantity: 2 }] // 5,000円

  it('小計が 5,000 円未満なら送料 500 円で、残額を返す', () => {
    expect(calcShipping(under)).toBe(500)
    expect(isFreeShipping(under)).toBe(false)
    expect(calcRemainingForFreeShipping(under)).toBe(200)
  })

  it('小計がちょうど 5,000 円なら送料無料で、合計は小計と同じ', () => {
    expect(calcShipping(exact)).toBe(0)
    expect(isFreeShipping(exact)).toBe(true)
    expect(calcRemainingForFreeShipping(exact)).toBe(0)
    expect(calcTotal(exact)).toBe(5000)
  })

  it('カートが空のときは送料無料でも残額でもない', () => {
    expect(isFreeShipping([])).toBe(false)
    expect(calcRemainingForFreeShipping([])).toBe(0)
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
