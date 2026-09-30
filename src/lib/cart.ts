import type { Product } from '../data/products'

export type CartItem = {
  product: Product
  quantity: number
}

/** 送料（一律） */
export const SHIPPING_FEE = 500

/** 送料無料になる小計の下限 */
export const FREE_SHIPPING_THRESHOLD = 5000

export function calcSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}

export function calcShipping(items: CartItem[]): number {
  if (items.length === 0) return 0
  return calcSubtotal(items) >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
}

/** 送料無料まであと何円か。カートが空、または既に送料無料なら 0 */
export function calcRemainingForFreeShipping(items: CartItem[]): number {
  if (items.length === 0) return 0
  return Math.max(0, FREE_SHIPPING_THRESHOLD - calcSubtotal(items))
}

export function isFreeShipping(items: CartItem[]): boolean {
  return items.length > 0 && calcSubtotal(items) >= FREE_SHIPPING_THRESHOLD
}

export function calcTotal(items: CartItem[]): number {
  return calcSubtotal(items) + calcShipping(items)
}

export function countItems(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function formatYen(amount: number): string {
  return `¥${amount.toLocaleString('ja-JP')}`
}
