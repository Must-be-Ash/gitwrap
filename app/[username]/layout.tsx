import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params

  return {
    title: `${username}'s GitWrap 2025`,
    description: `Check out ${username}'s GitHub year in review for 2025!`,
    openGraph: {
      title: `${username}'s GitWrap 2025`,
      description: `Check out ${username}'s GitHub year in review for 2025!`,
      url: `https://www.gitwrap.dev/${username}`,
      siteName: 'GitWrap',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${username}'s GitWrap 2025`,
      description: `Check out ${username}'s GitHub year in review for 2025!`,
    },
  }
}

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
