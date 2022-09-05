import React, { useState, useEffect } from 'react'
import LoadingPage from 'components/LoadingPage'
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'

const SecurePage = ({ children }) => {

    const router = useRouter()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const securePage = async () => {
            const session = await getSession()
            if (session) {
                router.push('/client')
            } else {
                setLoading(false)
            }
        }
        securePage()
    }, [router])

    if (loading) {
        return <LoadingPage />
    }
    return (
        <>
            {children}
        </>
    )
}

export default SecurePage