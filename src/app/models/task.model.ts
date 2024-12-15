export enum TaskStatus {
  TO_DO = 'To Do',
  IN_PROGRESS = 'In Progress',
  IN_TESTING = 'In Testing',
  DONE = 'Done',
}

export const TaskStatusClass: any = {
  'To Do': 'bg-to-do',
  'In Progress': 'bg-in-prg',
  'In Testing': 'bg-in-testing',
  Done: 'bg-done',
};

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
