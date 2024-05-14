"use client";
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Something = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/projects')
  }, [router])

  return (
    <div>
      welcome
    </div>
  )
}

export default Something;
