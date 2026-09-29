import { Star, StarHalf } from 'lucide-react'

type Props = {
  rating: number
  reviewCount: number
}

export function Rating({ rating, reviewCount }: Props) {
  return (
    <div className="rating" aria-label={`5つ星のうち${rating}、${reviewCount}件の評価`}>
      <span className="stars" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => {
          const n = i + 1
          const kind = rating >= n ? 'full' : rating >= n - 0.5 ? 'half' : 'empty'
          return (
            <span key={n} className="star">
              <Star size={16} fill={kind === 'full' ? 'currentColor' : 'none'} />
              {kind === 'half' && <StarHalf size={16} className="star-half" fill="currentColor" />}
            </span>
          )
        })}
      </span>
      <span className="review-count">{reviewCount.toLocaleString('ja-JP')}</span>
    </div>
  )
}
