import fs from 'node:fs';
import path from 'node:path';

export type Question = {
  id: string;
  category: string;
  order: number;
  question: string;
  answer: string;
  connect?: string;
  example?: string;
  interview?: string;
  hook?: string;
  code?: string;
};

export type Category = {
  slug: string;
  title: string;
  order: number;
  questions: Question[];
};

const contentDir = path.join(process.cwd(), 'content');

function splitFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {} as Record<string, string>, content: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '');
    data[key] = value;
  }
  return { data, content: match[2] };
}

function readField(rest: string, label: string) {
  const labels = 'Answer|Connect|Example|Interview|Remember';
  const withoutCode = rest.replace(/```[\s\S]*?```/g, '\n[[CODE]]');
  const re = new RegExp(`\\*\\*${label}:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*(?:${labels}):\\*\\*|\\n\\[\\[CODE\\]\\]|$)`);
  return withoutCode.match(re)?.[1].trim();
}

function parseQuestions(body: string, category: string, order: number): Question[] {
  const blocks = body.split(/^## /gm).slice(1);
  return blocks.map((block, index) => {
    const lines = block.trim().split('\n');
    const question = lines.shift()?.trim() ?? '';
    const rest = lines.join('\n').trim();
    const codeMatch = rest.match(/```(?:js|jsx|ts|tsx|html|css|bash)?\n([\s\S]*?)```/);

    return {
      id: `${order}-${index + 1}`,
      category,
      order: index + 1,
      question,
      answer: readField(rest, 'Answer') ?? rest,
      connect: readField(rest, 'Connect'),
      example: readField(rest, 'Example'),
      interview: readField(rest, 'Interview'),
      hook: readField(rest, 'Remember'),
      code: codeMatch?.[1].trim(),
    };
  });
}

export function getQuestionBank(): Category[] {
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.md'));
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(contentDir, file), 'utf8');
      const { data, content } = splitFrontmatter(raw);
      const title = data.title ?? slug;
      const order = Number(data.order ?? 999);
      return { slug, title, order, questions: parseQuestions(content, title, order) };
    })
    .sort((a, b) => a.order - b.order);
}
