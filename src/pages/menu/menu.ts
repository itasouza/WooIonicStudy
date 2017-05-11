import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';


import * as WC from 'woocommerce-api';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

  homePage: Component;
  WooCommerce: any;
  categories: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage
    this.categories = [];


    this.WooCommerce = WC({
      url: "http://wooionic.esy.es",
      version: 'v3', // WooCommerce API version (optional)
      verifySsl: false, // Use `false` when need test with self-signed certificates, default is `true` (optional)
      encoding: 'utf8', // Encode, default is 'utf8' (optional)
      consumerKey: "ck_c5b919fa658a9d22a2a013326c18555a8b3c6c26",
      consumerSecret: "cs_b4b307338741da37cb7c4f96e299dfbb908f8d53"
    });

    this.WooCommerce.getAsync("products/categories").then((data) => {
      console.log(JSON.parse(data.body).product_categories);

      let temp: any[] = JSON.parse(data.body).product_categories;

      for( let i = 0; i < temp.length; i ++){
        if(temp[i].parent == 0){
          this.categories.push(temp[i]);
        }
      }

    }, (err)=> {
      console.log(err)
    })

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad Menu');
  }

}
