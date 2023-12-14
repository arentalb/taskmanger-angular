import {Injectable} from '@angular/core';
import {Task, TaskState} from "../models/task";
import {map, Observable} from "rxjs";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firebaseList: AngularFireList<Task>

  constructor(private firebaseDatabse: AngularFireDatabase) {
    this.firebaseList = firebaseDatabse.list("tasks")
  }


  getTasks(): Observable<Task[]> {
    return this.firebaseDatabse.list("tasks").snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const key = action.payload.key as string;
          const data = action.payload.val() as Task;
          return {id: key, ...data};
        });
      })
    );
  }

  getTask(taskId: string): Task {

    return {name: "null", description: "", state: TaskState.done}
  }

  createTask(task: Task): Task {

    return {name: "null", description: "", state: TaskState.done}
  }

  updateTask(taskId: string, task: Task) {

  }

  deletTask(taskId: string) {

  }
}
