import { Chip } from '@mui/material'
import React from 'react'

export default function Version() {
  return (
    <Chip sx={{ position: 'fixed', right: 5, bottom: 5, zIndex: 999 }} label={import.meta.env.PACKAGE_VERSION} />
  )
}
