import clientPromise from './mongodb';
import type { GitHubUserStats } from './github';

const DB_NAME = 'gitwrap';
const COLLECTION_NAME = 'contributions';

interface CachedContributions {
  username: string;
  contributions: Array<{ date: string; count: number }>;
  achievements: {
    mostActiveDay: {
      date: string;
      count: number;
      repository: string;
    };
    longestStreak: number;
    topRepository: {
      name: string;
      commits: number;
    };
  };
  total_commits: number;
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
      contributions: stats.contributions,
      achievements: stats.achievements,
      total_commits: stats.total_commits,
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

