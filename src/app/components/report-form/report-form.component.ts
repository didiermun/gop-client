import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators, FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Apollo,gql } from 'apollo-angular';
import { Router} from '@angular/router';
export interface Fruit {
  name: string;
}

const NEW_REPORT = gql`
  mutation newReport($data: NewReport!) {
    newReport(data: $data) {
      _id
    }
  }
`;

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
  disabled = true;
  distances: string[] = ['<50M','-50-100M','>100M'];
  anySick: any[] = [{dValue:'Yes, there is',value:true}, {dValue:'No, not any',value:false}];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent,count:Number): void {
    const value = (event.value || '').trim();


    if (value) {
      if(count == 2){
      this.secondFormGroup.value.species.push(value);
    }
    else if(count == 42){
      this.forthFormGroup.value.behaviour.push(value);
    }
    else if(count == 3){
      this.thirdFormGroup.value.behaviour.push(value);
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
    const index = this.forthFormGroup.value.behaviour.indexOf(fruit);

    if (index >= 0) {
      this.forthFormGroup.value.behaviour.splice(index, 1);
    }
  }
  else if (count == 3){
    const index = this.thirdFormGroup.value.behaviour.indexOf(fruit);

    if (index >= 0) {
      this.thirdFormGroup.value.behaviour.splice(index, 1);
    }
  }
  }
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  forthFormGroup!: FormGroup;
  fifthFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder,private apollo: Apollo,private router: Router) {
    this.feeding = _formBuilder.group({
      bamboo: false,
      eucalyptus: false,
    });
   }

   feeding: FormGroup;
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      date: [new Date(),Validators.required],
      starttime: [, Validators.required],
      endtime: [, Validators.required],
      family: ['', Validators.required],
      habituated: ['', Validators.required],
      location: ['', Validators.required],
      individuals: [, Validators.required,],
      Oindividuals: [, Validators.required,],
      distance: [, Validators.required],
      village: ['', Validators.required],     
    });
    this.secondFormGroup = this._formBuilder.group({
      distance: ['', Validators.required],
      species: [[],],
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
      behaviour: [[],],
    })
    this.forthFormGroup = this._formBuilder.group({
      behaviour: [[],],
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
    let timing: any ={
      date: this.firstFormGroup.value.date?.toString(),
      start: this.firstFormGroup.value.starttime,
      end: this.firstFormGroup.value.endtime,
    } 
    let baseInfo: any =this.firstFormGroup.value;
    delete baseInfo.date;
    delete baseInfo.starttime;
    delete baseInfo.endtime;
    baseInfo.individuals = Math.round(baseInfo.individuals)
    baseInfo.Oindividuals = Math.round(baseInfo.Oindividuals)
    baseInfo.distance = baseInfo.distance.toString();


    //gathering all species
    let feeding:string[] = [...this.secondFormGroup.value.species]
    if(this.secondFormGroup.value.bamboo == true){
      feeding = [...feeding,'Bamboo']
    }
    if(this.secondFormGroup.value.eucalyptus == true){
      feeding = [...feeding,'Eucalyptus']
    }

    let budget = {
      feeding: feeding,
      distance: this.secondFormGroup.value.distance,
      period: this.secondFormGroup.value.period,
    }

    // putting together all reactions in the form in third form group
    let reactions:string[] = [];
    if(this.thirdFormGroup.value.runningReaction == true){
      reactions = [...reactions,'Running']
    }
    if(this.thirdFormGroup.value.chargingReaction == true){
      reactions = [...reactions,'Charging']
    }


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


    let interaction = {
      distance: this.thirdFormGroup.value.distance,
      reaction: reactions,
      observation,
      behaviour: this.thirdFormGroup.value.behaviour
    }

    let touristActivity:any = {
      tourist: this.forthFormGroup.value.tourists,
      period: this.forthFormGroup.value.period,
      behaviour: this.forthFormGroup.value.behaviour
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

    let health:any = {
      sick: this.fifthFormGroup.value.sick,
      signs: sickness
    }

    let data = {timing,baseInfo,budget,interaction,touristActivity,health}

    this.apollo.mutate({
      mutation: NEW_REPORT,
      variables: {
        data: data
      }
    }).subscribe(({ data }) => {
      let res: any = data;
      console.log(res)
      this.router.navigateByUrl(`report/${res.newReport._id}`);
    },(error) => {
      console.log(data);
      console.log(error.networkError)
      console.log(error.graphQLErrors[0]?.error)
      if(error.networkError){
        // this.error = "Slow or no internet detected";
      }
      else if(error.graphQLErrors){
        // this.error = error.graphQLErrors[0].message;
      }
      
      // this.notifier.notify('error', `${error.}`);
    });

  }

}
