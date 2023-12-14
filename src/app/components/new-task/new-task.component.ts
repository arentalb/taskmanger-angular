import {Component} from '@angular/core';
import {Task, TaskState} from "../../models/task";
import {NgForm} from "@angular/forms";
import {FirebaseService} from "../../services/firebase.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {


  constructor(  private firebaseService :FirebaseService ) {
  }

  OnSubmit(form :NgForm) {
    if (form.valid){
      let task:Task = {...form.value ,state :TaskState.pending}
      console.log(task)
      this.firebaseService.createTask(task).subscribe(()=>{
        form.reset();
      })
    }
  }
}
