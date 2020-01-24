import { Component, OnInit } from '@angular/core';
import {AppConfigs} from '../app.config';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  private infoData={
    heading:"App Info",
    showEraseBtn: true,
    content:` 
    <p><b>App Name :</b> ${AppConfigs.appName}</p>
    <p><b>App version :</b> ${AppConfigs.appVersion}</p>`
    
  }
  constructor(private router:Router) {
   }
  ngOnInit() {
  }
}
