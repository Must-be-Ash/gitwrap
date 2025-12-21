import type { GitHubUser } from './types';

const GITHUB_API_BASE = 'https://api.github.com';

export interface GitHubUserStats {
  name: string;
  username: string;
  avatar_url: string;
  bio: string;
  power_level: number;
  total_commits: number;
  total_stars: number;
  total_forks: number;
  languages: { [key: string]: number };
  achievements: {
    mostActiveDay: {
      date: string;
      count: number;
    };
    longestStreak: number;
    topRepository: {
      name: string;
      commits: number;
    };
  };
  contributions: Array<{
    date: string;
    count: number;
  }>;
}

interface GitHubRepoResponse {
  stargazers_count: number;
  forks_count: number;
  languages_url?: string;
  name: string;
  default_branch: string;
}

interface GitHubAchievements {
  mostActiveDay: {
    date: string;
    count: number;
    repository: string;
  };
  percentile?: number;
  longestStreak: number;
  favoriteTime?: string;
  topRepository: {
    name: string;
    commits: number;
  };
}

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

interface CommitContributionsByRepository {
  repository: {
    name: string;
  };
  contributions: {
    totalCount: number;
  };
}

interface RepoContribution {
  name: string;
  contributions: number;
}

async function getCommitCount(username: string, repo: string, branch: string, token?: string): Promise<number> {
  const headers: HeadersInit = token 
    ? { 
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    : { Accept: 'application/vnd.github.v3+json' };

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${username}/${repo}/commits?author=${username}&per_page=1&sha=${branch}`,
      { headers }
    );

    if (!response.ok) return 0;

    const linkHeader = response.headers.get('link');
    if (!linkHeader) return 1;

    const matches = linkHeader.match(/&page=(\d+)>; rel="last"/);
    return matches ? parseInt(matches[1]) : 1;
  } catch (error) {
    console.error(`Error fetching commits for ${repo}:`, error);
    return 0;
  }
}

async function getContributionCount(token: string): Promise<number> {
  const query = `
    query {
      viewer {
        contributionsCollection(from: "${new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()}", to: "${new Date().toISOString()}") {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalPullRequestReviewContributions
          restrictedContributionsCount
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      console.error('GraphQL API Error:', await response.text());
      return 0;
    }

    const data = await response.json();
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      return 0;
    }

    const contributions = data.data.viewer.contributionsCollection;
    const total = (
      contributions.totalCommitContributions +
      contributions.totalPullRequestContributions +
      contributions.totalIssueContributions +
      contributions.totalPullRequestReviewContributions +
      contributions.restrictedContributionsCount
    );

    console.log('Contribution breakdown:', {
      commits: contributions.totalCommitContributions,
      prs: contributions.totalPullRequestContributions,
      issues: contributions.totalIssueContributions,
      reviews: contributions.totalPullRequestReviewContributions,
      restricted: contributions.restrictedContributionsCount,
      total
    });

    return total;
  } catch (error) {
    console.error('Error fetching contribution count:', error);
    return 0;
  }
}

function calculatePowerLevel(stats: {
  total_commits: number;
  total_stars: number;
  total_forks: number;
  languages: { [key: string]: number };
}): number {
  const commitWeight = 0.6;
  const starWeight = 0.25;
  const forkWeight = 0.15;
  const languageMultiplier = Object.keys(stats.languages).length / 10 + 1;

  const baseScore = 
    (Math.log(stats.total_commits + 1) * 50 * commitWeight) +
    (stats.total_stars * starWeight) +
    (stats.total_forks * forkWeight);

  return Math.round(baseScore * languageMultiplier);
}

async function getContributionCalendar(token: string) {
  const query = `
    query {
      viewer {
        contributionsCollection(from: "2025-01-01T00:00:00Z", to: "${new Date().toISOString()}") {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
          commitContributionsByRepository {
            repository {
              name
            }
            contributions {
              totalCount
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      console.error('GraphQL API Error:', await response.text());
      throw new Error(`GitHub API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      throw new Error('GraphQL API Error: ' + data.errors[0]?.message);
    }

    if (!data.data?.viewer) {
      console.error('Invalid GraphQL response:', data);
      throw new Error('Invalid GraphQL response structure');
    }

    return data;
  } catch (error) {
    console.error('Error fetching contribution calendar:', error);
    throw error;
  }
}

export async function fetchGitHubStats(username: string, token?: string): Promise<GitHubUserStats> {
  const headers: HeadersInit = token 
    ? { 
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    : { Accept: 'application/vnd.github.v3+json' };

  const requestInit: RequestInit = {
    headers,
  };

  try {
    // Basic user info
    const userResponse = await fetch(`${GITHUB_API_BASE}/users/${username}`, requestInit);
    if (!userResponse.ok) {
      console.error('User API Error:', await userResponse.text());
      throw new Error(`GitHub API Error: ${userResponse.status}`);
    }
    const userData = await userResponse.json() as GitHubUser;

    // Fetch repositories
    const reposResponse = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?per_page=100`, requestInit);
    if (!reposResponse.ok) {
      console.error('Repos API Error:', await reposResponse.text());
      throw new Error(`GitHub API Error: ${reposResponse.status}`);
    }
    const repos = await reposResponse.json() as GitHubRepoResponse[];

    if (!Array.isArray(repos)) {
      console.error('Unexpected repos response:', repos);
      throw new Error('Invalid repository data received');
    }

    // Calculate total stars and forks
    const total_stars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
    const total_forks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);

    // Fetch languages for each repo and calculate percentages
    const languageCounts: { [key: string]: number } = {};
    await Promise.all(
      repos.map(async (repo) => {
        if (!repo.languages_url) return;
        
        const langResponse = await fetch(repo.languages_url, requestInit);
        if (!langResponse.ok) {
          console.error(`Language API Error for ${repo.name}:`, await langResponse.text());
          return;
        }
        const langs = await langResponse.json() as Record<string, number>;
        Object.entries(langs).forEach(([lang, bytes]) => {
          languageCounts[lang] = (languageCounts[lang] || 0) + bytes;
        });
      })
    );

    // Convert language bytes to percentages
    const totalBytes = Object.values(languageCounts).reduce((a, b) => a + b, 0);
    const languages = Object.entries(languageCounts).reduce((acc: {[key: string]: number}, [lang, bytes]) => {
      acc[lang] = Math.round((bytes / totalBytes) * 100);
      return acc;
    }, {});

    // Fetch commit counts for each repo
    const commitCounts = await Promise.all(
      repos.map(repo => 
        getCommitCount(username, repo.name, repo.default_branch, token)
      )
    );

    // Get total contributions if token is available
    const total_commits = token 
      ? await getContributionCount(token)
      : commitCounts.reduce((sum, count) => sum + count, 0);

    let achievements: GitHubAchievements = {
      mostActiveDay: {
        date: new Date().toISOString(),
        count: 0,
        repository: '',
      },
      longestStreak: 0,
      topRepository: {
        name: '',
        commits: 0,
      },
    };

    let contributionData: ContributionCalendar = {
      totalContributions: 0,
      weeks: []
    };

    if (token) {
      try {
        const calendar = await getContributionCalendar(token);
        contributionData = calendar.data.viewer.contributionsCollection.contributionCalendar;
        
        // Get repository contributions
        const repoContributions = calendar.data.viewer.contributionsCollection.commitContributionsByRepository
          .map((contribution: CommitContributionsByRepository) => ({
            name: contribution.repository.name,
            contributions: contribution.contributions.totalCount
          }))
          .sort((a: RepoContribution, b: RepoContribution) => b.contributions - a.contributions);

        const topRepo = repoContributions[0] || { name: 'Unknown', contributions: 0 };
        
        // Calculate achievements
        let currentStreak = 0;
        let maxStreak = 0;
        let maxDay = { count: 0, date: '', repository: '' };

        contributionData.weeks.forEach((week: ContributionWeek) => {
          week.contributionDays.forEach((day: ContributionDay) => {
            if (day.contributionCount > 0) {
              currentStreak++;
              if (currentStreak > maxStreak) maxStreak = currentStreak;
              if (day.contributionCount > maxDay.count) {
                maxDay = {
                  count: day.contributionCount,
                  date: day.date,
                  repository: topRepo.name,
                };
              }
            } else {
              currentStreak = 0;
            }
          });
        });

        achievements = {
          mostActiveDay: maxDay,
          longestStreak: maxStreak,
          topRepository: {
            name: topRepo.name,
            commits: topRepo.contributions,
          },
        };
      } catch (error) {
        console.error('Error fetching contribution calendar:', error);
        // Use default values
        contributionData = {
          totalContributions: 0,
          weeks: []
        };
      }
    }

    const stats = {
      name: userData.name || username,
      username: userData.login || username,
      avatar_url: userData.avatar_url,
      bio: userData.bio || "GitHub Developer",
      power_level: 0,
      total_commits,
      total_stars,
      total_forks,
      languages,
      achievements,
      contributions: contributionData.weeks.flatMap((week: ContributionWeek) => 
        week.contributionDays.map((day: ContributionDay) => ({
          date: day.date,
          count: day.contributionCount
        }))
      ).slice(-52 * 7) // Last year's worth of contributions
    };

    stats.power_level = calculatePowerLevel(stats);

    return stats;
  } catch (error) {
    console.error('GitHub API Error:', error);
    throw new Error('Failed to fetch GitHub data');
  }
} 