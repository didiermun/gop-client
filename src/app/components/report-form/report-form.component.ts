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
  anySick: string[] = ['True', 'False'];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent,count:Number): void {
    const value = (event.value || '').trim();


    if (value) {
      if(count == 2){
      this.secondFormGroup.value.species.push({name: value});
    }
    else if(count == 42){
      this.forthFormGroup.value.behavior.push({name: value});
    }
    else if(count == 3){
      this.thirdFormGroup.value.behavior.push({name: value});
    }
    }
    event.chipInput!.clear();
  }

  remove(fruit: Fruit,count: Number): void {
    if(count == 2){
    const index = this.secondFormGroup.value.species.indexOf(fruit);

    if (index >= 0) {
      this.secondFormGroup.value.species.splice(index, 1);
    }
  }
  else if (count == 42){
    const index = this.forthFormGroup.value.behavior.indexOf(fruit);

    if (index >= 0) {
      this.forthFormGroup.value.behavior.splice(index, 1);
    }
  }
  else if (count == 3){
    const index = this.thirdFormGroup.value.behavior.indexOf(fruit);

    if (index >= 0) {
      this.thirdFormGroup.value.behavior.splice(index, 1);
    }
  }
  }
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  forthFormGroup!: FormGroup;
  fifthFormGroup!: FormGroup;

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
      bamboo: [false, Validators.required],
      eucalyptus: [false, Validators.required], 
    });
    this.thirdFormGroup = this._formBuilder.group({
      distance: ['', Validators.required],
      runningReaction:[false, Validators.required],
      chargingReaction:[false, Validators.required],
      dungObservation:[false, Validators.required],
      clothingObservation:[false, Validators.required],
      hutObservation:[false, Validators.required],
      behavior: [[], Validators.required],
    })
    this.forthFormGroup = this._formBuilder.group({
      behavior: [[], Validators.required],
      tourists: [, Validators.required],
      period: [, Validators.required],
    })

    this.fifthFormGroup = this._formBuilder.group({
      sickfound: ['', Validators.required],
      cough: [false, Validators.required],
      flu:[false, Validators.required],
      injury:[false, Validators.required],
      limbbroken:[false, Validators.required],
      diarrhea:[false, Validators.required],
    })
  }
  submit() {
    console.log(this.thirdFormGroup.value);
  }

}
