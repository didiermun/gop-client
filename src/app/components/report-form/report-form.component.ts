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
  distances: string[] = ['<50M','-50-100M','>100M'];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

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
  thirdFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.feeding = _formBuilder.group({
      bamboo: false,
      eucalyptus: false,
    });

    this.reaction = _formBuilder.group({
      running: false,
      charging: false,
    });
    this.observation = _formBuilder.group({
      dung: false,
      clothes: false,
      hut: false
    });
   }

   feeding: FormGroup;
   reaction: FormGroup;
   observation: FormGroup;
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
    this.thirdFormGroup = this._formBuilder.group({
      distance: ['', Validators.required],
      runningReaction:[false, Validators.required],
      chargingReaction:[false, Validators.required],
      dungObservation:[false, Validators.required],
      clothingObservation:[false, Validators.required],
      hutObservation:[false, Validators.required],
    })
  }
  submit() {
    console.log(this.thirdFormGroup.value);
  }

}
