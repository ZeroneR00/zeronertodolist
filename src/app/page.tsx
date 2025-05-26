"use client"

import dynamic from 'next/dynamic';

const TaskListsManager = dynamic(() => import('../components/TaskListsManager'), {
  ssr: false
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-300 py-8 pt-0">
      <TaskListsManager />
    </main>
  );
} 