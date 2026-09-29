import { CATEGORIES, type CategoryFilter } from '../lib/catalog'

type Props = {
  selected: CategoryFilter
  onSelect: (category: CategoryFilter) => void
}

export function CategoryNav({ selected, onSelect }: Props) {
  const entries: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: 'すべて' },
    ...CATEGORIES.map((c) => ({ key: c, label: c })),
  ]
  return (
    <nav className="category-nav" aria-label="カテゴリ">
      {entries.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          className={selected === key ? 'category-link active' : 'category-link'}
          aria-current={selected === key ? 'page' : undefined}
          onClick={() => onSelect(key)}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}
