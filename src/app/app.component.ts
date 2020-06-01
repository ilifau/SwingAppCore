import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router} from '@angular/router';
import { TextService } from './services/text.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  checkToast: HTMLIonToastElement;
  updateToast: HTMLIonToastElement;

  texts: any = {};

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private router: Router,

    public textService: TextService
  ) {
    this.initializeApp();
  }

    /**
     * Check if the app is a real app
     */
  public isApp(): boolean {
      return false;
  }

  async ngOnInit() {
    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });

    if (!this.isApp()) {
        this.handleUpdate();
    }
   }

  /**
   * Force a check for available updates
   */
  async checkForUpdate() {

    if (this.checkToast) {
      await this.checkToast.dismiss();
    }
      this.checkToast = await this.toastCtrl.create({
          message: this.texts.commonUpdateCheckSucceeded,
          showCloseButton: true,
          position: 'top',
          closeButtonText: this.texts.commonHide
      });
      this.checkToast.onDidDismiss().then(() => {this.checkToast = null});
      await this.checkToast.present();

      this.swUpdate.checkForUpdate()
        .catch(async () => {
            if (this.checkToast) {
                await this.checkToast.dismiss();
            }
           this.checkToast = await this.toastCtrl.create({
            message: this.texts.commonUpdateCheckFailed,
            showCloseButton: true,
            position: 'top',
            closeButtonText: this.texts.commonHide
          });
          this.checkToast.onDidDismiss().then(() => {this.checkToast = null});
          await this.checkToast.present();
        })
  }


  /**
   * Handle an available, already downloaded update
   */
  async handleUpdate() {
    this.swUpdate.available.subscribe(async event => {

      if (this.checkToast) {
        await this.checkToast.dismiss();
      }

      this.updateToast = await this.toastCtrl.create({
        message: this.texts.commonUpdateAvailable + event.available.hash.substr(0,4),
        showCloseButton: true,
        position: 'top',
        closeButtonText: this.texts.commonUpdateActivate
      });

      await this.updateToast.present();

      this.updateToast
          .onDidDismiss()
          .then(() => this.swUpdate.activateUpdate())
          .then(() => this.router.navigate(['/tabs/home']))
          .then(() => window.location.reload());
    });
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
