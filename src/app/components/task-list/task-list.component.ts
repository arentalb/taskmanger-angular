import {Component, OnInit} from '@angular/core';
import {Task} from "../../models/task";
import {FirebaseService} from "../../services/firebase.service";
import {TaskState} from "../../models/task";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []

  constructor(private firebaseService: FirebaseService) {

  }

  ngOnInit(): void {
    this.getTasks()
  }
  getTasks(){
    this.firebaseService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks
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
