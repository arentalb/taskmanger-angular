import {Injectable} from '@angular/core';
import {Task, TaskState} from "../models/task";
import {filter, from, map, Observable, switchMap, take, tap} from "rxjs";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firebaseList: AngularFireList<Task>

  constructor(private firebaseDatabase: AngularFireDatabase) {
    this.firebaseList = firebaseDatabase.list("tasks")
  }


  getTasks(): Observable<Task[]> {
    return this.firebaseDatabase.list("tasks").snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const key = action.payload.key as string;
          const data = action.payload.val() as Task;
          return {id: key, ...data};
        });
      })
    );
  }

  getTask(taskId: string): Observable<Task> {
    return this.firebaseList.valueChanges().pipe(
      map(tasks => tasks.find(task => task.id === taskId))
    );
  }

  createTask(task: Task): Observable<string> {
    const taskRef = this.firebaseDatabase.list<Task>('/tasks');

    return from(taskRef.push(task)).pipe(
      switchMap((result) => {
        const taskId = result.key;
        const updatedTask: Task = { ...task, id: taskId };

        return from(taskRef.update(taskId, updatedTask));
      }),
      map(() => 'created'),
      take(1)
    );
  }

  updateTask(taskId: string, taskState: TaskState):Observable<void> {
    const taskRef = this.firebaseDatabase.object<Task>(`/tasks/${taskId}`);

    return from(taskRef.update({ state: taskState })).pipe(
      take(1)// if your double-clicked quickly it only take one of them
    )
  }

  deleteTask(taskId: string):Observable<void> {
    const taskRef = this.firebaseDatabase.object<Task>(`/tasks/${taskId}`);

    return from(taskRef.remove()).pipe(
      take(1)// if your double-clicked quickly it only take one of them
    )
  }

  applyFilter(filterState: TaskState): Observable<Task[]> {
    return this.firebaseDatabase.list("tasks", ref => ref.orderByChild('state').equalTo(filterState)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const key = action.payload.key as string;
          const data = action.payload.val() as Task;
          return { id: key, ...data };
        });
      })
    );
  }
}
