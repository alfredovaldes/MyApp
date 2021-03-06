import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service/user-service'
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TermometroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-termometro',
  templateUrl: 'termometro.html',
})
export class TermometroPage {
  sensores: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, private storage: Storage) {
  }
  actualizar(refresher) {
    this.storage.get('uid').then(value => {
      console.log(value)

      this.userService.getdata("Jardin2", value)
        .subscribe(
          (data) => {
            var resultados = [];
            for (var i in data) {
              resultados.push(data[i]);
            }
            this.sensores = resultados.reverse();
            refresher.complete();
          },
          (error) => {
            console.error(error);
            refresher.complete();
          }
        )
    },
      (error) => {
        console.error(error);
        refresher.complete();
      }).catch(error => {
        console.log(error);
      });
  }
  ionViewDidLoad() {
    this.storage.get('uid').then(value => {
      this.userService.getdata("Jardin2", value)
        .subscribe(
          (data) => {
            var resultados = [];
            for (var i in data) {
              resultados.push(data[i]);
            }
            this.sensores = resultados.reverse();
          },
          (error) => {
            console.error(error);
          }
        )
    },
      (error) => {
        console.error(error);
      }).catch(error => {
        console.log(error);
      });
  }
}
