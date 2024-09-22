"use client";

export type Post = {
  id: string;
  title: string;
  description: string;
  date: Date;
  tags: string[];
  body: string;
};
