export const metadata = {
  title: 'FASO FRUITS - Studio IA',
  description: 'Création de films et dessins animés par intelligence artificielle',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, backgroundColor: '#0a0a0c' }}>{children}</body>
    </html>
  )
}
