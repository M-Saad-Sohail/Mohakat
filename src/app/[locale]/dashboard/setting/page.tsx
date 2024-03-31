import { Metadata } from 'next'
import React from 'react'
import  { Settings } from '@/components/screens'

export const metadata: Metadata = {
  title: 'Account Settings'
}

const Page = () => <Settings />

export default Page