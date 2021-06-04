import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormArray,FormGroup, Validators, FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
export interface Fruit {
  name: string;
}

export interface Data{
  id: number;
  name: string;
}

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit {
  allComplete: boolean = false;

  feeding: Data[] = [{id: 1,name:"Eucalyptus"},{id: 2,name:"Bamboo"}];
  // distance: Data[] = ["<50 M","-50-100M",">100M"]

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [
  ];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();


    if (value) {
      this.fruits.push({name: value});
    }
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }
  onChangeEventFunc(name: string, isChecked: boolean) {
    const cartoons = (this.firstFormGroup.controls.name as FormArray);

    if (isChecked) {
      cartoons.push(new FormControl(name));
    } else {
      const index = cartoons.controls.findIndex(x => x.value === name);
      cartoons.removeAt(index);
    }
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      name: this._formBuilder.array([])
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
