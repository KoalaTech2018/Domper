import { Component, OnInit } from "@angular/core";
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { Injectable, Pipe, PipeTransform } from "@angular/core";
// import { ProjectDto } from './projectDto';

@Component({
  selector: "page-maid",
  templateUrl: "detail.html"
})
export class ModalContentPage implements OnInit {

  object: { [key: number]: string } =
    { 2: 'Angular keyvalue Pipe', 1: 'Angular ngFor' };

  public arrayOfKeys;
  maid;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    console.log("I am created");
    this.maid = this.params.get("obj");
    console.log(this.maid.working_exps);
    this.arrayOfKeys = this.maid.working_exps;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  ngOnInit() {}
  
}



  