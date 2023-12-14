import {Component, Input} from '@angular/core';
import {Task} from "../../models/task";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  @Input() task: Task

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
}
