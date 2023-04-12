import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms"

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  constructor(){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  
  onSubmit(f:NgForm){
    console.log(f.value);
  }

}
