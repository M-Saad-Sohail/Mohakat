import { Metadata } from 'next'
import React from 'react'
import  { FamilySettings } from '@/components/screens'

export const metadata: Metadata = {
  title: 'Family Account Settings'
}

const Page = () => <FamilySettings />

export default Page;