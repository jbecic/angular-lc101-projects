import { AfterViewInit, 
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'Exercises: Angular Lesson 3';

  color = 'green';
  height = 0;
  width = 0;
  message = 'Space shuttle ready for takeoff!';
  takeOff: boolean = false;
  constructor() {}
  ngAfterViewInit() {
    let width = this.bckg.nativeElement.offsetWidth;
    let height = this.bckg.nativeElement.offsetHeight;
  }
  @ViewChild('bckg', {static: false}) bckg: ElementRef;

  handleTakeOff(rocketImage) {
    let result = window.confirm('Are you sure the shuttle is ready for takeoff?');
    if (result) {
      this.color = 'blue';
      this.height = 10000;
      this.width = 0;
      this.message = 'Shuttle in flight.';
      this.takeOff = true;
      rocketImage.style.bottom = '10px';
      rocketImage.style.left = '10px';
    }
  }

  handleLand(rocketImage) {
    if (this.takeOff) {
      let result = window.alert('The shuttle is landing. Landing gear engaged.');
      this.message = 'The shuttle has landed.';
      this.color = 'green';
      this.height = 0;
      this.width = 0;
      rocketImage.style.bottom = '0px';
      rocketImage.style.left = '0px';
      this.takeOff = false;
    }
  }

  handleAbort(rocketImage) {
    if (this.takeOff){    
      let result = window.confirm('Are you sure you wish to abort the mission?');
      if (result) {
        this.message = 'Mission aborted.';
        this.color = 'red';
        this.height = 0;
        this.width = 0;
        rocketImage.style.bottom = '0px';
        rocketImage.style.left = '0px';
        this.takeOff = false;
      }
    }
  }

  moveRocket(rocketImage, direction) {
    let clientWidth = parseInt(this.bckg.nativeElement.offsetWidth);
    let clientHeight = parseInt(this.bckg.nativeElement.offsetHeight);
    let horizontal = parseInt(rocketImage.style.left);
    let vertical = parseInt(rocketImage.style.bottom);
    if (this.takeOff){    
        if (direction === 'right') {
          if (horizontal < (clientWidth - 75)) {
            let movement = parseInt(rocketImage.style.left) + 10 + 'px';
            rocketImage.style.left = movement;
            this.width = this.width + 10000;
            this.checkHeightWidth(rocketImage);
          }
      }
      if (direction === 'left') {
        if (horizontal > 0) {
          let movement = parseInt(rocketImage.style.left) - 10 + 'px';
          rocketImage.style.left = movement;
          this.width = this.width + 10000;
          this.checkHeightWidth(rocketImage);
        }
      }
      if (direction === 'up') {
        if (vertical < (clientHeight - 75)) {
          let movement = parseInt(rocketImage.style.bottom) + 10 + 'px';
          rocketImage.style.bottom = movement;
          this.height = this.height + 10000;
          this.checkHeightWidth(rocketImage);
        }
      }
      if (direction === 'down') {
        if (vertical > 0) {
          let movement = parseInt(rocketImage.style.bottom) - 10 + 'px';
          rocketImage.style.bottom = movement;
          this.height = this.height - 10000;
          this.checkHeightWidth(rocketImage);
        }
      }
    }
  }

  checkHeightWidth(rocketImage) {
    let horizontal = parseInt(rocketImage.style.left);
    let vertical = parseInt(rocketImage.style.bottom);
    let clientWidth = parseInt(this.bckg.nativeElement.offsetWidth);
    let clientHeight = parseInt(this.bckg.nativeElement.offsetHeight);
    if (horizontal <= 0) {
      this.color = 'orange';
    }
    if (vertical <= 0) {
      this.color = 'orange';
    }
    if (vertical >= (clientHeight - 75)) {
      this.color = 'orange';
    }
    if (horizontal >= (clientWidth - 75)) {
      this.color = 'orange';
    }
    if (vertical > 0 && vertical < (clientHeight - 75) && horizontal > 0 && horizontal < (clientWidth - 75)) {
      this .color = 'blue';
    }
  }
}
