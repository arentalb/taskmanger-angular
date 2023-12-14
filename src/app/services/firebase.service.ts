import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Task, TaskState} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebaseDatabse: AngularFireDatabase) {
  }


  getTasks(): Task[] {

    return []
  }

  getTask(taskId: string): Task {

    return {name: "null", state: TaskState.done}
  }

  createTask(task: Task): Task {

    return {name: "null", state: TaskState.done}
  }

  updateTask(taskId: string, task: Task) {

  }

  deletTask(taskId: string) {

  }
}
