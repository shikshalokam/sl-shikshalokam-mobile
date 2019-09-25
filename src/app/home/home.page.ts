import { Component, OnInit } from '@angular/core';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  private applications =[];
  private showNotifications:boolean = true;
  private dashboard =[{
    name:'Learning',
    id:2,
    //url:'',
  },
  {
    name:'Unnati',
    id:3,
    //url:'',
  }];
  constructor(private appLauncher: AppLauncher) {
    //this.token1 =  localStorage.getItem('mayBeToken');
   // this.menuCtrl.enable(true);
  }

 
  ngOnInit()
  {
    this.prepareJson();
  }

public closeNotification()
{
  this.showNotifications = ! this.showNotifications;
}

  // Prepare JSON for list of application
  public prepareJson()
  {
    this.applications =[
      {
        title:'Samiksha',
        subTitle:'Assessments App',
        icon:'/assets/images/Samiksha.png',
        id:'org.shikshalokam.samiksha'
      },
      {
      title:'Unnati',
      subTitle:'Improvement Projects App',
      icon:'/assets/images/Unnati.png',
      id:'org.shikshalokam.unnati'
    },
    {
      title:'Bodh',
      subTitle:'Learning App',
      icon:'/assets/images/Bodh.png',
      id:'org.shikshalokam.bodh'
    },
  ]
  }

   //Launch learner App
   public openApp(id)
   {

    // org.shikshalokam.app://community.shikshalokam.org/learn
     const options: AppLauncherOptions = {
       packageName: id,
     }
     this.appLauncher.canLaunch(options).then((canLaunch: boolean) => 
     {
        if(canLaunch)
      {
        this.appLauncher.launch(options).then(()=>{
        },(err) =>{
          console.log(canLaunch +'===== ddddd ===='+ err + "error");
          console.log('https://play.google.com/store/apps/details?id='+id+'&hl=en','_system',"link")
          window.open('https://play.google.com/store/apps/details?id='+id+'&hl=en','_system')
        })
      }else {
        console.log(canLaunch);
        console.log('https://play.google.com/store/apps/details?id='+id+'&hl=en','_system',"link")
        window.open('https://play.google.com/store/apps/details?id='+id+'&hl=en','_system')
      }
   }, error => {
    console.log('https://play.google.com/store/apps/details?id='+id+'&hl=en','_system',"link")
        window.open('https://play.google.com/store/apps/details?id='+id+'&hl=en','_system')
  })
   }
}
