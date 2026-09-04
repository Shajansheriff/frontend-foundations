import { StudyApp } from '@/components/study-app';
import { getQuestionBank } from '@/lib/questions';

export default function Home() {
  const categories = getQuestionBank();
  return <StudyApp categories={categories} />;
}
