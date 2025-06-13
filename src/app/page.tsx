"use client"

import dynamic from 'next/dynamic';

const TaskListsManager = dynamic(() => import('../components/TaskListsManager'), {
  ssr: false
});

export default function Home() {
  return (<>
   <TaskListsManager />
   </>
  );
} 