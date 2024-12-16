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

export interface Task {
  id: number;
  title: string;
  summary: string;
  description: string;
  status: TaskStatus;
}
