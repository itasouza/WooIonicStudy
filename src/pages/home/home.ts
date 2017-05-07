import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as WC from 'npm-woocommerce-api';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  WooCommerce: any;

  constructor(public navCtrl: NavController) {
  
    this.WooCommerce = WC({
      url:"http://wooionic.comajudacoletiva.com.br/",
      consumerKey:"ck_899d1c4011cab2bde1f04cd52704c248f155ecdc",
      consumerSecret:"cs_cc90feaf8467c0a53679be89f137557cdc7acbe5",
      wp_api: true,
      version: 'wc/v2'
    });

    this.WooCommerce.getAsync('products').then((data) => {
      console.log(data);
    }, (err) =>{
      console.log(err);
    });



  }

}
