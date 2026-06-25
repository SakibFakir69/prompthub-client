import type { SearchUser, SearchUsersResponse } from '@/src/features/people/peopleApi'


interface PeopleSearchProps {
  data?: SearchUsersResponse
  currentUserId?: string
}

type GenderFilter = 'all' | 'male' | 'female' | 'other'
type SortOption = 'name-asc' | 'name-desc' | 'followers-desc' | 'followers-asc' | 'age-asc' | 'age-desc'

interface SortConfig {
  label: string
  value: SortOption
  icon?: 'arrow-up' | 'arrow-down'
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const GENDER_OPTIONS: { value: GenderFilter; label: string }[] = [
  { value: 'all', label: 'All genders' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
]

export const SORT_OPTIONS: SortConfig[] = [
  { label: 'Name A-Z', value: 'name-asc' },
  { label: 'Name Z-A', value: 'name-desc' },
  { label: 'Most followers', value: 'followers-desc' },
  { label: 'Fewest followers', value: 'followers-asc' },
  { label: 'Youngest first', value: 'age-asc' },
  { label: 'Oldest first', value: 'age-desc' },
]

export const PAGE_SIZE = 20