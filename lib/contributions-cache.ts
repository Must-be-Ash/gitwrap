import clientPromise from './mongodb';
import type { GitHubUserStats } from './github';

const DB_NAME = 'gitwrap';
const COLLECTION_NAME = 'contributions';

interface CachedContributions {
  username: string;
  name: string;
  avatar_url: string;
  bio: string;
  power_level: number;
  total_commits: number;
  total_stars: number;
  total_forks: number;
  languages: { [key: string]: number };
  contributions: Array<{ date: string; count: number }>;
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
  updatedAt: Date;
}

/**
 * Cache contribution data for a user
 * Only stores contribution metrics, not sensitive data
 */
export async function cacheContributions(
  username: string,
  stats: GitHubUserStats
): Promise<void> {
  try {
    if (!clientPromise) {
      console.log('MongoDB not configured, skipping cache');
      return;
    }
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection<CachedContributions>(COLLECTION_NAME);

    const cacheData: CachedContributions = {
      username: username.toLowerCase(),
      name: stats.name,
      avatar_url: stats.avatar_url,
      bio: stats.bio,
      power_level: stats.power_level,
      total_commits: stats.total_commits,
      total_stars: stats.total_stars,
      total_forks: stats.total_forks,
      languages: stats.languages,
      contributions: stats.contributions,
      achievements: stats.achievements,
      updatedAt: new Date(),
    };

    await collection.updateOne(
      { username: username.toLowerCase() },
      { $set: cacheData },
      { upsert: true }
    );

    console.log(`Cached contribution data for ${username}`);
  } catch (error) {
    console.error('Error caching contributions:', error);
    // Don't throw - caching is optional
  }
}

/**
 * Get cached contribution data for a user
 */
export async function getCachedContributions(
  username: string
): Promise<CachedContributions | null> {
  try {
    if (!clientPromise) {
      return null;
    }
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection<CachedContributions>(COLLECTION_NAME);

    const cached = await collection.findOne({
      username: username.toLowerCase(),
    });

    if (!cached) {
      return null;
    }

    // Check if cache is stale (older than 24 hours)
    const cacheAge = Date.now() - cached.updatedAt.getTime();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    if (cacheAge > maxAge) {
      console.log(`Cache for ${username} is stale, will refresh`);
      return null;
    }

    return cached;
  } catch (error) {
    console.error('Error getting cached contributions:', error);
    return null;
  }
}

/**
 * Merge cached contribution data with fresh user data
 */
export function mergeContributions(
  freshStats: GitHubUserStats,
  cached: CachedContributions
): GitHubUserStats {
  return {
    ...freshStats,
    contributions: cached.contributions,
    achievements: cached.achievements,
    total_commits: cached.total_commits,
  };
}

/**
 * Get leaderboard data sorted by power level
 */
export async function getLeaderboard(
  page: number = 1,
  limit: number = 10
): Promise<{ users: CachedContributions[]; total: number }> {
  try {
    if (!clientPromise) {
      return { users: [], total: 0 };
    }
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection<CachedContributions>(COLLECTION_NAME);

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      collection
        .find({})
        .sort({ power_level: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection.countDocuments({}),
    ]);

    return { users, total };
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    return { users: [], total: 0 };
  }
}

export type { CachedContributions };

