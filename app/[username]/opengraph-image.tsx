import { ImageResponse } from '@vercel/og'
import { fetchGitHubStats } from '@/lib/github'

export const runtime = 'edge'
export const alt = 'GitWrap 2025'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { username: string } }) {
  try {
    const stats = await fetchGitHubStats(params.username)

    // Get top 3 languages
    const topLanguages = Object.entries(stats.languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([lang]) => lang)

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #0a0a0a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #0a0a0a 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            border: '4px solid #22c55e',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 40,
            }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                border: '4px solid #22c55e',
                marginRight: 30,
                overflow: 'hidden',
                display: 'flex',
              }}
            >
              <img
                src={stats.avatar_url}
                alt={stats.name}
                width={120}
                height={120}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h1
                style={{
                  fontSize: 72,
                  fontWeight: 'bold',
                  color: '#22c55e',
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                {stats.name || stats.username}
              </h1>
              <p
                style={{
                  fontSize: 36,
                  color: '#10b981',
                  margin: 0,
                  marginTop: 10,
                }}
              >
                @{stats.username}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            style={{
              display: 'flex',
              gap: 40,
              marginBottom: 30,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 40px',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                border: '2px solid #22c55e',
                borderRadius: 8,
              }}
            >
              <div style={{ fontSize: 48, fontWeight: 'bold', color: '#22c55e' }}>
                {stats.total_commits.toLocaleString()}
              </div>
              <div style={{ fontSize: 24, color: '#10b981' }}>Commits</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 40px',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                border: '2px solid #22c55e',
                borderRadius: 8,
              }}
            >
              <div style={{ fontSize: 48, fontWeight: 'bold', color: '#22c55e' }}>
                {stats.total_stars.toLocaleString()}
              </div>
              <div style={{ fontSize: 24, color: '#10b981' }}>Stars</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 40px',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                border: '2px solid #22c55e',
                borderRadius: 8,
              }}
            >
              <div style={{ fontSize: 48, fontWeight: 'bold', color: '#22c55e' }}>
                {stats.power_level}
              </div>
              <div style={{ fontSize: 24, color: '#10b981' }}>Power Level</div>
            </div>
          </div>

          {/* Languages */}
          <div
            style={{
              display: 'flex',
              gap: 20,
              marginBottom: 30,
            }}
          >
            {topLanguages.map((lang) => (
              <div
                key={lang}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#000',
                  border: '2px solid #22c55e',
                  borderRadius: 4,
                  fontSize: 20,
                  color: '#22c55e',
                }}
              >
                {lang}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div
            style={{
              fontSize: 28,
              color: '#22c55e',
              fontWeight: 'bold',
            }}
          >
            GITWRAP 2025
          </div>
        </div>
      ),
      {
        ...size,
      }
    )
  } catch {
    // Fallback image if user data fetch fails
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            border: '4px solid #22c55e',
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: '#22c55e',
            }}
          >
            GitWrap 2025
          </h1>
          <p
            style={{
              fontSize: 32,
              color: '#10b981',
            }}
          >
            GitHub Year in Review
          </p>
        </div>
      ),
      {
        ...size,
      }
    )
  }
}
