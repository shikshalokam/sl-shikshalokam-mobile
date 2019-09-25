import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.page.html',
  styleUrls: ['./voting.page.scss'],
})
export class VotingPage implements OnInit {
  private disableBtn:boolean = false;
private count:number = 0;
  constructor() { }

  ngOnInit() {
  }

  public updateCount()
  {
this.count = this.count+1;
if(this.count == 3)
{
  this.disableBtn = true;
}else {
  this.disableBtn = false;
}
  }
}
