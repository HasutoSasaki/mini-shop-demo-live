import type { Product } from '../data/products'

export type CartItem = {
  product: Product
  quantity: number
}

/** 送料（一律） */
export const SHIPPING_FEE = 500

export function calcSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}

export function calcShipping(items: CartItem[]): number {
  return items.length === 0 ? 0 : SHIPPING_FEE
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
