﻿export const metadata = {
  title: 'Simple CRM',
  description: 'Candidate Management System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
