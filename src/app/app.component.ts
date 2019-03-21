import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

export interface ResultSet {
  counter: number;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  counter = 1;
  displayedColumns: string[] = ['counter', 'value'];
  result = new MatTableDataSource<ResultSet>();
  errorText = 'Counter can be between 1 and 100';
  showerror = false;
  minCounterValue = 1;
  maxCounterValue = 100;

  // on initialization of the component process the current counter value
  ngOnInit() {
    this.changeCounter(0);
  }

  // function to reverse counter value
  previousCounter() {
    this.changeCounter(-1);
  }

  // function to next counter value
  nextCounter() {
    this.changeCounter(1);
  }

  // function to check if new step is possible else show error
  changeCounter(step: number) {
    const newCounter = this.counter + step;
    if (newCounter < this.minCounterValue || newCounter > this.maxCounterValue) {
      this.showerror = true;
    } else {
      this.showerror = false;
      this.counter = newCounter;
      let newData = [{counter: this.counter, value: this.getCounterValue(this.counter)},];
      newData = newData.concat(this.result.data.slice(0, 9));
      this.result.data = newData;
      this.result._updateChangeSubscription();
    }
  }

  // function to calculate counter value
  getCounterValue(counter: number) {
    const valuePerNumber = {3: 'Fizz', 5: 'Buzz'};
    const checkFor = [3, 5];

    let returnValue = '';
    for (const num of checkFor) {
      if (counter % num === 0) {
        returnValue += valuePerNumber[num];
      }
    }

    if (returnValue === '') {
      returnValue = counter.toString();
    }
    return returnValue;
  }

}
