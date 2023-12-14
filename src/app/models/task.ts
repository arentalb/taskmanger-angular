export interface Task {
  id?: string;
  name: string;
  description: string;
  state: TaskState
}

export enum TaskState {
  inProgress = "InProgress",
  pending = "Pending",
  done = "Done",

}
