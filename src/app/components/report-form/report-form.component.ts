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
  anySick: any[] = [{dValue:'Yes, there is',value:true}, {dValue:'No, not any',value:false}];
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
  isLinear = true;
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
      family: ['', Validators.required],
      none_habits: ['', Validators.required],
      location: ['', Validators.required],
      individuals: [, Validators.required,],
      Oindividuals: [, Validators.required,],
      distance: [, Validators.required],
      village: ['', Validators.required],     
    });
    this.secondFormGroup = this._formBuilder.group({
      distance: ['', Validators.required],
      species: [[], Validators.required],
      bamboo: [false, Validators.required],
      eucalyptus: [false, Validators.required], 
      period: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      distance: ['', Validators.required],
      runningReaction:[false, Validators.required],
      chargingReaction:[false, Validators.required],
      dungObservation:[false, Validators.required],
      clothingObservation:[false, Validators.required],
      hutObservation:[false, Validators.required],
      behaviour: [[], Validators.required],
    })
    this.forthFormGroup = this._formBuilder.group({
      behavior: [[], Validators.required],
      tourists: [, Validators.required],
      period: [, Validators.required],
    })

    this.fifthFormGroup = this._formBuilder.group({
      sick: [false, Validators.required],
      cough: [false, Validators.required],
      flu:[false, Validators.required],
      injury:[false, Validators.required],
      limbbroken:[false, Validators.required],
      diarrhea:[false, Validators.required],
    })
  }
  submit() {
    let baseInfo: any =this.firstFormGroup.value;
    baseInfo.date = baseInfo.date.toString();
    baseInfo.individuals = Math.round(baseInfo.individuals)
    baseInfo.Oindividuals = Math.round(baseInfo.Oindividuals)
    console.log(baseInfo);

    //gathering all species
    let species:string[] = [...this.secondFormGroup.value.species]
    if(this.secondFormGroup.value.bamboo == true){
      species = [...species,'Bamboo']
    }
    if(this.secondFormGroup.value.eucalyptus == true){
      species = [...species,'Eucalyptus']
    }

    // putting together all reactions in the form in third form group
    let reactions:string[] = [];
    if(this.thirdFormGroup.value.runningReaction == true){
      reactions = [...reactions,'Running']
    }
    if(this.thirdFormGroup.value.chargingReaction == true){
      reactions = [...reactions,'Charging']
    }
    console.log(reactions)


    //putting together all observations in third form group
    let observation:string[] = [];
    if(this.thirdFormGroup.value.clothingObservation == true){
      observation = [...observation,'Clothes']
    }
    if(this.thirdFormGroup.value.dungObservation == true){
      observation = [...observation,'Dung']
    }
    if(this.thirdFormGroup.value.hutObservation == true){
      observation = [...observation,'Hut']
    }

    //gathering all sickness around

    let sickness:string[] = [];
    if(this.fifthFormGroup.value.cough == true){
      sickness = [...sickness,'Cough']
    }
    if(this.fifthFormGroup.value.flu == true){
      sickness = [...sickness,'Flu']
    }
    if(this.fifthFormGroup.value.injury == true){
      sickness = [...sickness,'Injury']
    }
    if(this.fifthFormGroup.value.limbbroken == true){
      sickness = [...sickness,'Broken Limb']
    }
    if(this.fifthFormGroup.value.diarrhea == true){
      sickness = [...sickness,'Diarrhea']
    }

  }

}
