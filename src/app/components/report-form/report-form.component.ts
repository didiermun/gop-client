import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators, FormControl} from '@angular/forms';
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

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  // fruits: Fruit[] = [
  // ];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();


    if (value) {
      this.secondFormGroup.value.species.push({name: value});
    }
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.secondFormGroup.value.species.indexOf(fruit);

    if (index >= 0) {
      this.secondFormGroup.value.species.splice(index, 1);
    }
  }
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.feeding = _formBuilder.group({
      bamboo: false,
      eucalyptus: false,
    });
   }

   feeding: FormGroup;
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      date: [, Validators.required],
      starttime: [, Validators.required],
      endtime: [, Validators.required],
      group: ['', Validators.required],
      none_habits: ['', Validators.required],
      location: ['', Validators.required],
      nIndividuals: [, Validators.required,],
      nOutIndividuals: [, Validators.required,],
      distance: [, Validators.required],
      village: ['', Validators.required],      
    });
    this.secondFormGroup = this._formBuilder.group({
      distance: ['', Validators.required],
      species: [[], Validators.required],
    });
  }
  submit() {
    console.log(this.secondFormGroup.value);
  }

}
