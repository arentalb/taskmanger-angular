import {Injectable, OnInit} from '@angular/core';
import {Task, TaskState} from "../models/task";
import {catchError, from, map, Observable, switchMap, take, throwError, timeout} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {User} from "../models/user";
import {OnlineService} from "./online.service";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnInit {

  // firebaseList: AngularFireList<Task>
  userUID: string = null

  constructor(private firebaseDatabase: AngularFireDatabase, private onlineService: OnlineService, private firestore: AngularFirestore) {


  }

  ngOnInit() {
    this.getUserUid()
  }

  getUserUid() {
    // this.firebaseList = firebaseDatabase.list(`tasks/${this.userUID}`)
    const userString = localStorage.getItem('user');
    const userObject = JSON.parse(userString);
    this.userUID = userObject.uid;
  }


  getTasks(): Observable<Task[]> {
    this.getUserUid()
    return this.handleRequest(
      this.firebaseDatabase.list(`tasks/${this.userUID}`).snapshotChanges().pipe(
        map(actions => {
          return actions.map(action => {
            const key = action.payload.key as string;
            const data = action.payload.val() as Task;
            return {id: key, ...data};
          });
        })
      ))
  }

  getTask(taskId: string): Observable<Task> {
    return this.handleRequest(
      this.firebaseDatabase.list(`tasks/${this.userUID}`).snapshotChanges().pipe(
        map(actions => {
          return actions.map(action => {
            const key = action.payload.key as string;
            const data = action.payload.val() as Task;
            return {id: key, ...data};
          });
        }),
        map(tasks => tasks.find(task => task.id === taskId))
      ))
  }

  createTask(task: Task): Observable<string> {
    const newTaskRef = this.firebaseDatabase.list(`tasks/${this.userUID}`).push(task);
    return this.handleRequest(
      from(newTaskRef).pipe(
        switchMap((result) => {
          const taskId = result.key;
          const updatedTask: Task = {...task, id: taskId};

          // Use this.firebaseDatabase.object to update the specific task by its ID
          return from(this.firebaseDatabase.object(`tasks/${this.userUID}/${taskId}`).update(updatedTask));
        }),
        map(() => 'created'),
        take(1)
      ));
  }

  updateTask(taskId: string, taskState: TaskState): Observable<void> {

    const taskRef = this.firebaseDatabase.object<Task>(`/tasks/${this.userUID}/${taskId}`);
    return this.handleRequest(
      from(taskRef.update({state: taskState})).pipe(
        take(1)// if your double-clicked quickly it only take one of them
      ))
  }

  deleteTask(taskId: string): Observable<void> {
    const taskRef = this.firebaseDatabase.object<Task>(`/tasks/${this.userUID}/${taskId}`);
    return this.handleRequest(
      from(taskRef.remove()).pipe(
        take(1)// if your double-clicked quickly it only take one of them
      ))
  }

  applyFilter(filterState: TaskState): Observable<Task[]> {
    return this.handleRequest(
      this.firebaseDatabase.list(`tasks/${this.userUID}`, ref => ref.orderByChild('state').equalTo(filterState)).snapshotChanges().pipe(
        map(actions => {
          return actions.map(action => {
            const key = action.payload.key as string;
            const data = action.payload.val() as Task;
            return {id: key, ...data};
          });
        })
      ))
  }

  getUserProfile(userEmail: string): Observable<User | undefined> {

    const userCollection: AngularFirestoreCollection<User> = this.firestore.collection('users', ref => ref.where('email', '==', userEmail));
    return this.handleRequest(
      userCollection.snapshotChanges().pipe(
        map(actions => {
          const user = actions.map(a => {
            const data = a.payload.doc.data() as User;
            const id = a.payload.doc.id;
            return {id, ...data};
          });

          if (user.length > 0) {
            return user[0];
          } else {
            return undefined;
          }
        })
      ))
  }

  private handleRequest<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(
      timeout(10000),
      take(1),
      catchError((error) => {
        if (error.message === 'Timeout has occurred') {
          this.onlineService.isConnected$.next('You are not connected to the internet.');
        } else {
          this.onlineService.isConnected$.next('Internal server error occurred.');
        }
        return throwError('');
      })
    );
  }
}
