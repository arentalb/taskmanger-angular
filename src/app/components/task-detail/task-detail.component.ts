import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Task, TaskState} from "../../models/task";
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent implements OnInit {

  task :Task
  baseState :TaskState
  constructor(private activeRoute :ActivatedRoute , private firebaseService :FirebaseService , private router :Router){

  }

  ngOnInit(): void {
   let  taskId = this.activeRoute.snapshot.paramMap.get('id');
    console.log(taskId)
    this.firebaseService.getTask(taskId).subscribe((task)=>{
      this.task = task
      this.baseState = task.state
      console.log(task)
    })
  }

  getStatusColorClass(state: string): string {
    switch (state.toLowerCase()) {
      case 'inprogress':
        return 'bg-blue-700 ';
      case 'pending':
        return 'bg-red-700   ';
      case 'done':
        return 'bg-green-700';
      default:
        return 'bg-blue-700 ';
    }
  }

  onChange(state :TaskState){
    this.task.state = state
  }
  onSave() {
    if (this.baseState != this.task.state){
      this.firebaseService.updateTask(this.task.id ,this.task.state).subscribe(()=>{
        this.router.navigate(["/tasks"])
      })
    }else {
      this.router.navigate(["/tasks"])
    }
  }

  protected readonly TaskState = TaskState;
}
