import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-domain2',
  templateUrl: './domain2.page.html',
  styleUrls: ['./domain2.page.scss'],
})
export class Domain2Page implements OnInit {

    
  constructor(private screenOrientation: ScreenOrientation) { }

  ngOnInit() {
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    } catch (error) {
    }
  }

}
