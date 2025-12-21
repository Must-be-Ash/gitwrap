"use client"

interface ContributionGraphProps {
  contributions: Array<{ date: string; count: number }>
  isMobile?: boolean
}

export default function ContributionGraph({ contributions, isMobile = false }: ContributionGraphProps) {
  // Group contributions by week (7 days)
  const weeks = contributions.reduce((acc, curr, i) => {
    const weekIndex = Math.floor(i / 7)
    if (!acc[weekIndex]) acc[weekIndex] = []
    acc[weekIndex].push(curr)
    return acc
  }, [] as Array<Array<{ date: string; count: number }>>)

  // Function to determine color based on contribution count - reversed order
  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-800'
    if (count >= 2) return 'bg-green-200'  // Lightest - fewest commits
    if (count >= 5) return 'bg-green-300'
    if (count >= 10) return 'bg-green-400'
    return 'bg-green-500'  // Darkest - most commits
  }

  const blockSize = isMobile ? 6 : 10 // Increased from 3 to 6 for better mobile visibility
  const legendBlockSize = isMobile ? 8 : 10
  const padding = isMobile ? 'p-4' : 'p-6'
  const gap = isMobile ? 'gap-[2px]' : 'gap-[2px]'
  const textSize = isMobile ? 'text-sm' : 'text-sm'

  return (
    <div className={`bg-white/5 backdrop-blur-lg rounded-xl ${padding} border border-green-500/20 w-full`}>
      {/* Container to ensure proper width and alignment */}
      <div className="w-full overflow-hidden">
        {/* Graph */}
        <div className={`flex ${gap} justify-between`}>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className={`flex flex-col ${gap}`}>
              {week.map((day) => (
                <div 
                  key={day.date} 
                  className={`
                    rounded-[1px] border border-black/20
                    ${getColor(day.count)}
                  `}
                  style={{ width: `${blockSize}px`, height: `${blockSize}px` }}
                  title={`${new Date(day.date).toLocaleDateString('en-US', { 
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}: ${day.count} contributions`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className={`flex justify-center items-center ${isMobile ? 'mt-2' : 'mt-4'} ${textSize} text-gray-400 gap-1`}>
          <span>Less</span>
          <div className={`flex ${gap} mx-1`}>
            {['bg-gray-800', 'bg-green-500', 'bg-green-400', 'bg-green-300', 'bg-green-200'].map((color, i) => (
              <div 
                key={i}
                className={`rounded-[1px] border border-black/20 ${color}`}
                style={{ width: `${legendBlockSize}px`, height: `${legendBlockSize}px` }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  )
} 