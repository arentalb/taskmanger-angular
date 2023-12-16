import {Component} from '@angular/core';
import {Task, TaskState} from "../../models/task";
import {NgForm} from "@angular/forms";
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {

  isLoading = false

  constructor(  private firebaseService :FirebaseService ) {
  }

  OnSubmit(form :NgForm) {
    if (form.valid){
      this.isLoading = true

      let task:Task = {...form.value ,state :TaskState.pending}

      this.firebaseService.createTask(task).subscribe(()=>{
        form.reset();
        this.isLoading = false

      })
    }
  }
}
