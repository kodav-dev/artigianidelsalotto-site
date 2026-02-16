import type { CollectionEntry } from 'astro:content';

export function getSortedBlogPosts(posts: CollectionEntry<'blog'>[]) {
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

export function getLatestBlogPosts(posts: CollectionEntry<'blog'>[], count: number = 3) {
  return getSortedBlogPosts(posts).slice(0, count);
}
