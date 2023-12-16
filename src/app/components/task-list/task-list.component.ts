import {Component, OnInit} from '@angular/core';
import {Task} from "../../models/task";
import {FirebaseService} from "../../services/firebase.service";
import {TaskState} from "../../models/task";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []
  isLoading = true

  constructor(private firebaseService: FirebaseService ,private authService :AuthService) {

  }

  ngOnInit(): void {
    this.tasks = [];
    this.authService.loginState.subscribe((condition) => {
      if (!condition) {
        this.tasks = [];
      } else {
        this.getTasks();
      }
    });
  }
  getTasks(){
    this.firebaseService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks
      this.isLoading = false
    })
  }

  applyFilter(event: TaskState) {
    if (event === null ){
      this.getTasks()

    }else {
      this.firebaseService.applyFilter(event).subscribe((tasks)=>{
        this.tasks = tasks
      })
    }

  }
}
