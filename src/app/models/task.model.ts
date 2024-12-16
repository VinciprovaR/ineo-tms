export enum TaskStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_TESTING = 'IN_TESTING',
  DONE = 'DONE',
}

export const TaskStatusClass: any = {
  TO_DO: 'bg-to-do',
  IN_PROGRESS: 'bg-in-prg',
  IN_TESTING: 'bg-in-testing',
  DONE: 'bg-done',
};

export const customColorsCharts = [
  { name: 'To Do', value: '#3b82f6' },
  { name: 'In Progress', value: '#ef4444' },
  { name: 'In Testing', value: '#eab308 ' },
  { name: 'Done', value: '#22c55e ' },
];

export const statusMapLabel: Record<string, string> = {
  TO_DO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
  IN_TESTING: 'In Testing',
};

export interface Task {
  id: number;
  title: string;
  summary: string;
  description: string;
  status: TaskStatus;
}
