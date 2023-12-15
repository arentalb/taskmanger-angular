import {Component, Output} from '@angular/core';
import {TaskState} from "../../models/task";
import {Subject} from "rxjs";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  protected readonly TaskState = TaskState;

  activeFilter :TaskState

 @Output() filter :Subject<TaskState> = new Subject<TaskState>();

  applyFilter(state :TaskState){
    this.activeFilter = state
    this.filter.next(state)
  }

  reset() {
    this.activeFilter = null
    this.filter.next(null)

  }


}
