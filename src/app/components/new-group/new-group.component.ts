import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import { Apollo,gql } from 'apollo-angular';

const CREATE_GROUP = gql`
  mutation newGroup($data: NewGroup!) {
    newGroup(data: $data) {
      id
      leader
      name
    }
  }
`;

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {
  newGroupFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder,private apollo: Apollo) { }

  ngOnInit(): void {
    this.newGroupFormGroup = this._formBuilder.group({
      leader: ['', Validators.required],
      code: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit(formDirective: FormGroupDirective){
    console.log(this.newGroupFormGroup.value);
    this.newGroupFormGroup.value.name = this.newGroupFormGroup.value.leader+ "'s group"
    this.apollo.mutate({
      mutation: CREATE_GROUP,
      variables: {
        data: this.newGroupFormGroup.value
      }
    }).subscribe(({ data }) => {
      let res: any = data;
      if(res.newGroup){
        formDirective.resetForm();
        this.newGroupFormGroup.reset();
        console.log(res.newGroup);
      }
    },(error) => {
      if(error.networkError){
        console.log("Slow or no internet detected");
      }
      else if(error.graphQLErrors){
        console.log(error.graphQLErrors[0].message);
      }
    });
  }

}
