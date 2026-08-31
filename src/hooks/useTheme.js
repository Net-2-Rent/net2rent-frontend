import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'n2r-theme'

function getStoredTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : null
}

function getSystemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function useTheme() {
  const [theme, setTheme] = useState(getStoredTheme)

  useEffect(() => {
    const root = document.documentElement

    if (theme) {
      root.dataset.theme = theme
      localStorage.setItem(STORAGE_KEY, theme)
    } else {
      delete root.dataset.theme
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [theme])

  const isDark = theme ? theme === 'dark' : getSystemPrefersDark()

  const toggleTheme = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark')
  }, [isDark])

  return { isDark, toggleTheme }
}