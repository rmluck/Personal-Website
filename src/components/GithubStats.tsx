"use client";

import { useEffect } from "react";
import GitHubCalendar from "github-calendar";
import "github-calendar/dist/github-calendar-responsive.css";

export default function GithubCalendarWidget() {
  useEffect(() => {
    GitHubCalendar(".calendar", "rmluck", { responsive: true });
  }, []);

  return <div className="calendar">Loading your GitHub data…</div>;
}