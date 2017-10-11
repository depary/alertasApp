import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AjustesProvider } from "../providers/ajustes/ajustes";
import { LoginProvider } from '../providers/login/login'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private _ajustes: AjustesProvider, private _login:LoginProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this._ajustes.cargar_storage().then(()=>{
        if(this._ajustes.ajustes.mostrar_tutorial){
          this.rootPage = "IntroduccionPage";
        }else{
          this._login.isLogin().then(res => {
            console.log(res);
            
            if (res){
              this.rootPage = HomePage;
            }
            else {
              this.rootPage = LoginPage;
            }
          })
          
        }

        statusBar.styleDefault();
        splashScreen.hide();
      });
    });
  }

  //logout() {
  //  this.rootPage = LoginPage;
  //  this._login.logout();

  //}
}

