import {
  Backpack,
  Bean,
  Box,
  Coffee,
  CupSoda,
  Filter,
  Notebook,
  Package,
  Pen,
  Shirt,
  ShoppingBag,
  Tag,
  type LucideIcon,
} from 'lucide-react'
import type { CSSProperties } from 'react'
import type { Product, ProductIcon } from '../data/products'

const ICONS: Record<ProductIcon, LucideIcon> = {
  bean: Bean,
  filter: Filter,
  coffee: Coffee,
  cupSoda: CupSoda,
  notebook: Notebook,
  pen: Pen,
  shoppingBag: ShoppingBag,
  shirt: Shirt,
  package: Package,
  box: Box,
  tag: Tag,
  backpack: Backpack,
}

type Props = {
  product: Product
  size?: 'large' | 'small'
}

/** 商品写真の代わりに、淡い背景の上にアイコンを描く */
export function ProductImage({ product, size = 'large' }: Props) {
  const Icon = ICONS[product.icon]
  const style = { '--tint': product.color } as CSSProperties
  return (
    <div className={`product-image product-image-${size}`} role="img" aria-label={product.name} style={style}>
      <Icon size={size === 'large' ? 96 : 44} strokeWidth={1.25} color={product.color} aria-hidden="true" />
    </div>
  )
}
