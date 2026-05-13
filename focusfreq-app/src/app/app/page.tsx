import type { Metadata } from 'next';
import FocusWorkspace from '@/components/session/FocusWorkspace';

export const metadata: Metadata = {
  title: 'Focus Workspace',
  description:
    'Create tasks, start focus sessions, and track your productivity with FocusFreq.',
};

export default function AppPage() {
  return <FocusWorkspace />;
}
