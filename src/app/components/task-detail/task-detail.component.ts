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
  protected readonly TaskState = TaskState;


  task :Task
  baseState :TaskState
  isLoading = true

  constructor(private activeRoute :ActivatedRoute , private firebaseService :FirebaseService , private router :Router){

  }

  ngOnInit(): void {
   let  taskId = this.activeRoute.snapshot.paramMap.get('id');

    this.firebaseService.getTask(taskId).subscribe((task)=>{
      this.task = task
      this.baseState = task.state

      this.isLoading = false

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
      this.isLoading = true

      this.firebaseService.updateTask(this.task.id ,this.task.state).subscribe(()=>{
        this.isLoading = false
        this.router.navigate(["/tasks"])
      })
    }else {
      this.router.navigate(["/tasks"])
    }
  }


  onDelete(taskId :string ) {
    this.isLoading = true
    this.firebaseService.deleteTask(taskId).subscribe(()=>{
      this.isLoading = false
      this.router.navigate(["/tasks"])

    })
  }
}
