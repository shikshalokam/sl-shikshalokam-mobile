import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-domain4',
  templateUrl: './domain4.page.html',
  styleUrls: ['./domain4.page.scss'],
})
export class Domain4Page implements OnInit {

  constructor(private screenOrientation: ScreenOrientation) { }

  ngOnInit() {
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    } catch (error) {
    }
  }

}
