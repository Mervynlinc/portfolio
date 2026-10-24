import { NextResponse } from "next/server";

export const revalidate = 3600;

const username = "Mervynlinc";
const featuredProjects = [
  { repo: "nurs7", name: "Nurs7", visual: "dashboard" },
  { repo: "rideshare", name: "RideShare", visual: "rides" },
  { repo: "arena-plus", name: "Arena Plus", visual: "code" },
  { repo: "amr", name: "AMR", visual: "window" },
];

async function getProjects() {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?type=owner&sort=pushed&per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate },
    },
  );

  if (!response.ok) throw new Error(`GitHub repositories request failed: ${response.status}`);

  const repositories = await response.json();
  return featuredProjects.flatMap((featured) => {
    const repository = repositories.find(
      (item) => item.name.toLowerCase() === featured.repo,
    );
    if (!repository) return [];

    return [{
      name: featured.name,
      url: repository.html_url,
      visual: featured.visual,
      description: repository.description,
      language: repository.language,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
      pushedAt: repository.pushed_at,
    }];
  });
}

function countCurrentStreak(days) {
  const today = new Date().toISOString().slice(0, 10);
  const orderedDays = [...days].sort((left, right) => left.date.localeCompare(right.date));
  const activeDays = orderedDays.filter((day) => day.contributionCount > 0);
  const latest = activeDays.at(-1);
  if (!latest) return 0;

  const dateDistance = (from, to) =>
    Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);
  if (dateDistance(latest.date, today) > 1) return 0;

  let streak = 1;
  let previousDate = latest.date;
  for (let index = orderedDays.indexOf(latest) - 1; index >= 0; index -= 1) {
    const day = orderedDays[index];
    if (dateDistance(day.date, previousDate) !== 1 || day.contributionCount === 0) break;
    streak += 1;
    previousDate = day.date;
  }
  return streak;
}

async function getContributionStats() {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query($login: String!) {
          user(login: $login) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks { contributionDays { date contributionCount } }
              }
            }
          }
        }`,
        variables: { login: username },
      }),
      next: { revalidate },
    });

    if (response.ok) {
      const payload = await response.json();
      const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;
      if (calendar) {
        const days = calendar.weeks.flatMap((week) => week.contributionDays);
        return {
          totalContributions: calendar.totalContributions,
          currentStreak: countCurrentStreak(days),
          contributions: days.map((day) => ({
            date: day.date,
            count: day.contributionCount,
            level: Math.min(4, day.contributionCount === 0 ? 0 : day.contributionCount < 3 ? 1 : day.contributionCount < 6 ? 2 : day.contributionCount < 10 ? 3 : 4),
          })),
        };
      }
    }
  }

  const year = new Date().getUTCFullYear();
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=${year - 1}&y=${year}`,
    { next: { revalidate } },
  );
  if (!response.ok) return null;

  const payload = await response.json();
  if (!Array.isArray(payload.contributions)) return null;
  const days = payload.contributions.map((day) => ({
    date: day.date,
    contributionCount: day.count,
  }));
  return {
    totalContributions: payload.total?.[year] ?? 0,
    currentStreak: countCurrentStreak(days),
    contributions: payload.contributions.map((day) => ({
      date: day.date,
      count: day.count,
      level: day.level,
    })),
  };
}

export async function GET() {
  const [projectsResult, streakResult] = await Promise.allSettled([
    getProjects(),
    getContributionStats(),
  ]);

  return NextResponse.json({
    projects: projectsResult.status === "fulfilled" ? projectsResult.value : [],
    streak: streakResult.status === "fulfilled" ? streakResult.value : null,
  });
}
