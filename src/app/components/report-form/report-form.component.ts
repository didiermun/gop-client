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

  constructor(private _formBuilder: FormBuilder) {
    this.toppings = _formBuilder.group({
      pepperoni: false,
      extracheese: false,
      mushroom: false
    });
   }

  toppings: FormGroup;

  onCbChange(e:any) {
    const name: FormArray = this.firstFormGroup.get('name') as FormArray;

    if (e.target.checked) {
      name.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      name.controls.forEach((item) => {
        if (item.value == e.target.value) {
          name.removeAt(i);
          return;
        }
        i++;
      });
    }
 }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      date: ['', Validators.required],
      starttime: ['', Validators.required],
      endtime: ['', Validators.required],
      group: ['', Validators.required],
      none_habits: ['', Validators.required],
      location: ['', Validators.required],
      nIndividuals: [, Validators.required,],
      nOutIndividuals: [, Validators.required,],
      time: this._formBuilder.array([], [Validators.required])
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  submit() {
    console.log(this.firstFormGroup.value);
  }

}
