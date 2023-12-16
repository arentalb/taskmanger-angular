import {ChangeDetectorRef, Component, HostListener, OnInit, Output} from '@angular/core';
import {TaskState} from "../../models/task";
import {Subject} from "rxjs";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {
  activeFilter: TaskState
  toiggleState: boolean = false
  @Output() filter: Subject<TaskState> = new Subject<TaskState>();
  protected readonly TaskState = TaskState;

  constructor(private cdr: ChangeDetectorRef) {
  }

  applyFilter(state: TaskState) {
    this.activeFilter = state
    this.filter.next(state)
  }

  reset() {
    this.activeFilter = null
    this.filter.next(null)

  }


  toggleFilter() {
    this.toiggleState = !this.toiggleState
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
    this.cdr.detectChanges(); // Trigger change detection explicitly
  }

  ngOnInit(): void {
    this.checkScreenWidth();
  }

  private checkScreenWidth(): void {
    // You can adjust this threshold based on your design
    const threshold = 768;
    this.toiggleState = window.innerWidth <= threshold;
  }
}
