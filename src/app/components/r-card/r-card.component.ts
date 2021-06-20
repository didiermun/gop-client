import { Component, Input, OnInit } from '@angular/core';
import { Apollo,gql } from 'apollo-angular';


const BOOK_REPORT = gql`
  mutation bookReport($id: ID!) {
    bookReport(id: $id) {
      message
      success
    }
  }
`;
@Component({
  selector: 'app-r-card',
  templateUrl: './r-card.component.html',
  styleUrls: ['./r-card.component.scss']
})
export class RCardComponent implements OnInit {
  @Input() report: any = {};

  constructor(private apollo: Apollo) {

  }

  submit(){
    this.apollo.mutate({
      mutation: BOOK_REPORT,
      variables: {
        id: this.report._id
      }
    }).subscribe(({ data }) => {
      let res: any = data;
      console.log(data);
    },(error) => {
      console.log(error.networkError);
      if(error.networkError){
        console.log("Slow or no internet detected");
      }
      else if(error.graphQLErrors){
        console.log(error.graphQLErrors[0].message);
      }
    });
  }
  

  ngOnInit(): void {
  }

}
