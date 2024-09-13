import Nav from '@/components/Nav'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react';

export const AppLayout = () => {
  return (
    <div>
        <Outlet/>
        <Analytics />
    </div>
  )
}
