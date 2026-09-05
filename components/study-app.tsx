'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Category, Question } from '@/lib/questions';

type Progress = Record<string, 'learning' | 'mastered'>;
type Mode = 'browse' | 'drill';

export function StudyApp({ categories }: { categories: Category[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState<'all' | 'new' | 'learning' | 'mastered'>('all');
  const [progress, setProgress] = useState<Progress>({});
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [mode, setMode] = useState<Mode>('browse');
  const [drillId, setDrillId] = useState<string | null>(null);

  const allQuestions = useMemo(() => categories.flatMap((c) => c.questions), [categories]);

  useEffect(() => {
    const saved = localStorage.getItem('frontend-foundations-progress');
    if (!saved) return;
    try {
      setProgress(JSON.parse(saved));
    } catch {
      localStorage.removeItem('frontend-foundations-progress');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('frontend-foundations-progress', JSON.stringify(progress));
  }, [progress]);

  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return allQuestions.filter((q) => {
      const categoryMatch = category === 'all' || q.category === category;
      const searchMatch = !needle || `${q.question} ${q.answer} ${q.connect ?? ''} ${q.example ?? ''} ${q.interview ?? ''} ${q.hook ?? ''}`.toLowerCase().includes(needle);
      const current = progress[q.id];
      const statusMatch =
        status === 'all' ||
        (status === 'new' && !current) ||
        (status === 'learning' && current === 'learning') ||
        (status === 'mastered' && current === 'mastered');
      return categoryMatch && searchMatch && statusMatch;
    });
  }, [allQuestions, category, progress, query, status]);

  const stats = useMemo(() => {
    const mastered = allQuestions.filter((q) => progress[q.id] === 'mastered').length;
    const learning = allQuestions.filter((q) => progress[q.id] === 'learning').length;
    return { mastered, learning, total: allQuestions.length };
  }, [allQuestions, progress]);

  function setQuestionProgress(id: string, value: 'learning' | 'mastered') {
    setProgress((current) => ({ ...current, [id]: value }));
  }

  function randomQuestion() {
    const pool = filtered.length ? filtered : allQuestions;
    if (!pool.length) return;
    const next = pool[Math.floor(Math.random() * pool.length)];
    setDrillId(next.id);
    setOpen({ [next.id]: false });
    setMode('drill');
  }

  const drillQuestion = allQuestions.find((q) => q.id === drillId) ?? null;

  return (
    <main className="shell">
      <header className="hero">
        <div>
          <p className="eyebrow">SENIOR FRONTEND INTERVIEW PREP</p>
          <h1>Frontend Foundations</h1>
          <p className="subtitle">Understand the concept first. Then learn the interview-sized answer.</p>
        </div>
        <button className="drillButton" onClick={randomQuestion}>Random drill →</button>
      </header>

      <section className="stats" aria-label="Study progress">
        <div><strong>{stats.total}</strong><span>questions</span></div>
        <div><strong>{stats.learning}</strong><span>learning</span></div>
        <div><strong>{stats.mastered}</strong><span>mastered</span></div>
        <div><strong>{Math.round((stats.mastered / Math.max(stats.total, 1)) * 100)}%</strong><span>complete</span></div>
      </section>

      {mode === 'drill' && drillQuestion ? (
        <section className="drillPanel">
          <div className="drillTop">
            <button className="textButton" onClick={() => setMode('browse')}>← Back to bank</button>
            <span>{drillQuestion.category}</span>
          </div>
          <QuestionCard
            question={drillQuestion}
            isOpen={!!open[drillQuestion.id]}
            state={progress[drillQuestion.id]}
            onToggle={() => setOpen((v) => ({ ...v, [drillQuestion.id]: !v[drillQuestion.id] }))}
            onLearning={() => setQuestionProgress(drillQuestion.id, 'learning')}
            onMastered={() => setQuestionProgress(drillQuestion.id, 'mastered')}
          />
          <button className="nextButton" onClick={randomQuestion}>Next random question</button>
        </section>
      ) : (
        <>
          <section className="controls">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search: closure, event loop, useEffect…"
              aria-label="Search questions"
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category">
              <option value="all">All categories</option>
              {categories.map((c) => <option value={c.title} key={c.slug}>{c.title}</option>)}
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} aria-label="Progress">
              <option value="all">All progress</option>
              <option value="new">New</option>
              <option value="learning">Learning</option>
              <option value="mastered">Mastered</option>
            </select>
          </section>

          <div className="resultCount">{filtered.length} questions</div>
          <section className="questionList">
            {filtered.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                isOpen={!!open[q.id]}
                state={progress[q.id]}
                onToggle={() => setOpen((v) => ({ ...v, [q.id]: !v[q.id] }))}
                onLearning={() => setQuestionProgress(q.id, 'learning')}
                onMastered={() => setQuestionProgress(q.id, 'mastered')}
              />
            ))}
          </section>
        </>
      )}
    </main>
  );
}

function QuestionCard({
  question,
  isOpen,
  state,
  onToggle,
  onLearning,
  onMastered,
}: {
  question: Question;
  isOpen: boolean;
  state?: 'learning' | 'mastered';
  onToggle: () => void;
  onLearning: () => void;
  onMastered: () => void;
}) {
  return (
    <article className={`card ${state ?? ''}`}>
      <button className="questionHeader" onClick={onToggle} aria-expanded={isOpen}>
        <span className="categoryPill">{question.category}</span>
        <h2>{question.question}</h2>
        <span className="reveal">{isOpen ? 'Hide' : 'Show answer'}</span>
      </button>
      {isOpen && (
        <div className="answer">
          <section className="answerSection">
            <span className="answerLabel">Core idea</span>
            <p>{question.answer}</p>
          </section>
          {question.connect && (
            <section className="answerSection connectSection">
              <span className="answerLabel">Connect the dots</span>
              <p>{question.connect}</p>
            </section>
          )}
          {question.example && (
            <section className="answerSection exampleSection">
              <span className="answerLabel">Example</span>
              <p>{question.example}</p>
            </section>
          )}
          {question.code && <pre><code>{question.code}</code></pre>}
          {question.interview && (
            <section className="answerSection interviewSection">
              <span className="answerLabel">Say this in an interview</span>
              <p>{question.interview}</p>
            </section>
          )}
          {question.hook && <p className="hook"><strong>Remember:</strong> {question.hook}</p>}
          <div className="actions">
            <button className={state === 'learning' ? 'active' : ''} onClick={onLearning}>Needs practice</button>
            <button className={state === 'mastered' ? 'active' : ''} onClick={onMastered}>Got it ✓</button>
          </div>
        </div>
      )}
    </article>
  );
}
