import { Component,ViewChild } from '@angular/core';
import { NavController, Slides,ToastController } from 'ionic-angular';


import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  WooCommerce: any;
  products:any[];
  moreProducts: any[];
  page: number;

  @ViewChild('productSlides') productSlides: Slides;
  


  constructor(public navCtrl: NavController,public toastCtrl: ToastController) {

    this.page = 2;


    this.WooCommerce = WC({
      url: "http://wooionic.esy.es",
      version: 'v3', // WooCommerce API version (optional)
      verifySsl: false, // Use `false` when need test with self-signed certificates, default is `true` (optional)
      encoding: 'utf8', // Encode, default is 'utf8' (optional)
      consumerKey: "ck_c5b919fa658a9d22a2a013326c18555a8b3c6c26",
      consumerSecret: "cs_b4b307338741da37cb7c4f96e299dfbb908f8d53"
    });

    this.loadMoreProducts(null);

    this.WooCommerce.getAsync("products").then( (data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad(){
    setInterval(()=> {

      if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
        this.productSlides.slideTo(0);

      this.productSlides.slideNext();
    }, 3000)
  }


loadMoreProducts(event){
    console.log(event);
    if(event == null)
    {
      this.page = 2;
      this.moreProducts = [];
    }
    else
      this.page++;

    this.WooCommerce.getAsync("products?page=" + this.page).then( (data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

      if(event != null)
      {
        event.complete();
      }

      if(JSON.parse(data.body).products.length < 10){
        event.enable(false);

        this.toastCtrl.create({
          message: "Não tem mais produtos!",
          duration: 5000
        }).present();

      }


    }, (err) => {
      console.log(err)
    })
  }


}