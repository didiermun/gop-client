import { Component, Input, OnInit } from '@angular/core';
import { Apollo,gql,QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';


const IS_BOOKMARKED =  gql`
  query isbookmarked($id: ID!){
    isbookmarked(id: $id){ 
      success
    }
  }
`


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
  isBookmarked: boolean = false;

  bookQuery!: QueryRef<any>;
  group:any = {};
  date: Date = new Date();
  private querySubscription!: Subscription;

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
    this.bookQuery = this.apollo.watchQuery<any>({
      query: IS_BOOKMARKED,
      variables: {
        id: this.report._id
      },
      pollInterval: 300,
    });
    this.querySubscription = this.bookQuery
      .valueChanges
      .subscribe(({ data, loading }) => {
        if(!loading){
          this.isBookmarked = data.isbookmarked.success;
      }
      },(error) => {
        console.log(error.networkError);
        if(error.graphQLErrors[0].status == 401){
          localStorage.removeItem('gop_app_token')
        }
        console.log(error.graphQLErrors)
        console.log('error', `${error.message}`);
      });
  }

}
