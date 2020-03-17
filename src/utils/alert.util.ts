import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertUtil {

  constructor( public toastController: ToastController ) {

  }

  // Error toast message
  async errorMessageToast(msg) {
    const toast = await this.toastController.create({
      message: msg, color: 'danger',
      duration: 2000
    });
    toast.present();
  }
}
