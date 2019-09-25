import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-domain1',
  templateUrl: './domain1.page.html',
  styleUrls: ['./domain1.page.scss'],
})
export class Domain1Page implements OnInit {
  
  constructor(private screenOrientation: ScreenOrientation) { }

  ngOnInit() {
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    } catch (error) {
    }
  }

}
