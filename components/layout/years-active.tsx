'use client';

const START_YEAR = 2021;

function getYearsActive() {
  return Math.max(1, new Date().getFullYear() - START_YEAR);
}

export default function YearsActive() {
  return <span suppressHydrationWarning>{getYearsActive()}</span>;
}
