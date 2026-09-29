export type Category = '食品' | '雑貨' | '文具' | 'アパレル'

export type ProductIcon =
  | 'bean'
  | 'filter'
  | 'coffee'
  | 'cupSoda'
  | 'notebook'
  | 'pen'
  | 'shoppingBag'
  | 'shirt'
  | 'package'
  | 'box'
  | 'tag'
  | 'backpack'

export type ProductBadge = 'ベストセラー' | '新着'

export type Product = {
  id: string
  name: string
  price: number
  category: Category
  stock: number
  /** 5つ星評価（0.5刻み） */
  rating: number
  reviewCount: number
  /** 商品画像の代わりに表示するアイコン */
  icon: ProductIcon
  /** アイコンと背景に使うアクセント色 */
  color: string
  /** カードの左上に出すバッジ */
  badge?: ProductBadge
}

export const PRODUCTS: Product[] = [
  { id: 'coffee-beans', name: '自家焙煎 コーヒー豆 中深煎り 200g', price: 1200, category: '食品', stock: 12, rating: 4.5, reviewCount: 1284, icon: 'bean', color: '#6F4E37', badge: 'ベストセラー' },
  { id: 'drip-bag', name: 'ドリップバッグ コーヒー 10袋入 ブレンド', price: 980, category: '食品', stock: 40, rating: 4, reviewCount: 231, icon: 'package', color: '#A0522D', badge: '新着' },
  { id: 'dripper', name: '円すい形 コーヒードリッパー 1〜4杯用', price: 2900, category: '雑貨', stock: 5, rating: 4, reviewCount: 356, icon: 'filter', color: '#3B6EA8' },
  { id: 'mug', name: '陶器マグカップ 350ml マットホワイト', price: 1800, category: '雑貨', stock: 8, rating: 4.5, reviewCount: 902, icon: 'coffee', color: '#4E8A5C' },
  { id: 'tumbler', name: '真空断熱タンブラー 350ml ステンレス', price: 3200, category: '雑貨', stock: 0, rating: 4, reviewCount: 2210, icon: 'cupSoda', color: '#5A6672' },
  { id: 'canister', name: 'コーヒー保存キャニスター 密閉 500g用', price: 1500, category: '雑貨', stock: 3, rating: 4.5, reviewCount: 147, icon: 'box', color: '#8A6D3B' },
  { id: 'notebook', name: 'A5 ノート 方眼 80枚 3冊セット', price: 600, category: '文具', stock: 30, rating: 4.5, reviewCount: 615, icon: 'notebook', color: '#C99A2E' },
  { id: 'pen', name: 'ゲルインクボールペン 0.5mm 黒 5本', price: 300, category: '文具', stock: 50, rating: 5, reviewCount: 4130, icon: 'pen', color: '#B3413B', badge: 'ベストセラー' },
  { id: 'masking-tape', name: 'マスキングテープ 15mm 3個セット', price: 450, category: '文具', stock: 25, rating: 4, reviewCount: 78, icon: 'tag', color: '#D98E73' },
  { id: 'tote', name: 'キャンバス トートバッグ A4対応', price: 2400, category: 'アパレル', stock: 6, rating: 4, reviewCount: 178, icon: 'shoppingBag', color: '#6E5A86' },
  { id: 'tshirt', name: 'オーガニックコットン Tシャツ 無地', price: 2500, category: 'アパレル', stock: 10, rating: 3.5, reviewCount: 89, icon: 'shirt', color: '#2A8A8A' },
  { id: 'backpack', name: 'キャンバス バックパック 20L', price: 4800, category: 'アパレル', stock: 4, rating: 4.5, reviewCount: 412, icon: 'backpack', color: '#3F5E7A', badge: '新着' },
]
