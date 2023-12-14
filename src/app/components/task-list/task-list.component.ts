import {Component, OnInit} from '@angular/core';
import {Task} from "../../models/task";
import {FirebaseService} from "../../services/firebase.service";

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
    this.firebaseService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks
    })
  }
}
