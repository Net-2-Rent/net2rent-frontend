import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useAppScope() {
    const { pathname } = useLocation()

    useEffect(() => {
        const app = pathname.startsWith('/guest') ? 'guest' : 'backoffice'
        document.documentElement.dataset.app = app
    }, [pathname])
}