export interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
  languages_url: string;
}

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
}

export interface CommitStats {
  total_commits: number;
  commits_by_repo: { [key: string]: number };
} 