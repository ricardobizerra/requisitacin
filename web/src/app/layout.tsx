import './globals.css'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import { Header } from '@/components'
import { RoleProvider } from '@/contexts'
import { Toaster } from '@/components/ui/toaster'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RequisitaCIn',
  description: 'Sistema para requisições de discentes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleProvider>
      <html lang="pt-br">
        <body className={rubik.className}>
            <Header title={metadata.title as string} />

            {children}

            <Toaster />
        </body>
      </html>
    </RoleProvider>
  )
}
