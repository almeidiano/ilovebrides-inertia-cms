import { Chip } from '@mui/material'
import React from 'react'

export default function Version() {
  return <div className="z-[9999] fixed right-[5px] bottom-[5px]"><Chip label={import.meta.env.PACKAGE_VERSION} /></div>
}
