import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INITIAL_LESSONS, CATEGORIES, Lesson } from "@/data/courses";
import { LessonDetailClient } from "./LessonDetailClient";

export async function generateStaticParams() {
  return INITIAL_LESSONS.map((lesson) => ({
    slug: lesson.slug,
  }));
}

interface LessonPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const initialLesson = INITIAL_LESSONS.find((l) => l.slug === slug);

  if (!initialLesson) {
    notFound();
  }

  return (
    <LessonDetailClient initialLesson={initialLesson} allLessons={INITIAL_LESSONS} />
  );
}
