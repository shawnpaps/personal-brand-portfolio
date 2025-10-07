import React from 'react'
import './styles.css'

export const metadata = {
  description: 'sudo.create cms',
  title: 'sudo.create cms',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
