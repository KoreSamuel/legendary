import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import sanitizeHtml from 'sanitize-html';
import { compiler } from 'markdown-to-jsx';
import removeMarkdown from 'remove-markdown';
import readingTime from 'reading-time';

import { renderToStaticMarkup } from 'react-dom/server';

import type { NoteMetaType } from '../types';
const NOTES_DIR = './notes';
const baseUrl = 'https://dearxiaojie.top';

export const getNoteSlugs = () =>
  fs
    .readdirSync(path.join(process.cwd(), NOTES_DIR))
    .filter((file) => /\.mdx$/.test(file))
    .map((noteFile) => noteFile.replace(/\.mdx$/, ''));

export const getNoteData = (
  slug: string,
): { frontMatter: NoteMetaType; content: string } => {
  const fullPath = path.join(process.cwd(), NOTES_DIR, `${slug}.mdx`);
  const rawContent = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(rawContent);

  const htmlTitle = sanitizeHtml(
    renderToStaticMarkup(
      compiler(data.title, {
        forceInline: true,
        disableParsingRawHTML: true,
      }),
    ),
    {
      allowedTags: ['code', 'pre', 'em', 'strong', 'del'],
    },
  );
  return {
    frontMatter: {
      ...(data as Omit<
        NoteMetaType,
        'slug' | 'title' | 'htmlTitle' | 'permalink' | 'date' | 'readingMins'
      >),
      title: removeMarkdown(data.title),
      htmlTitle,
      slug,
      permalink: `${baseUrl}/notes/${slug}/`,
      created_at: new Date(data.created_at).toISOString(),
      readingMins: Math.ceil(readingTime(content).minutes),
    },
    content,
  };
};

export const getAllNotes = () =>
  getNoteSlugs()
    .map((slug) => getNoteData(slug).frontMatter)
    .sort((note1: NoteMetaType, note2: NoteMetaType) =>
      note1.created_at > note2.created_at ? -1 : 1,
    );
