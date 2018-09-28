import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private counter: number = 0;

  // Observable property for the array of offices
  private $spinnerOn = new BehaviorSubject<Boolean>(false);
  spinnerOn = this.$spinnerOn.asObservable();
  
  constructor() { }

  ShowSpinner() {
    this.counter += 1;
    if (!this.$spinnerOn.getValue()) {
      this.$spinnerOn.next(true);
    }
  }

  HideSpinner() {
    this.counter -= (this.counter == 0) ? 0 : 1;
    if ((this.counter == 0) && (this.$spinnerOn.getValue())) {
      this.$spinnerOn.next(false);
    }
  }

}
