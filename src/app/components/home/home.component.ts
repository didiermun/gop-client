import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef,gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

const GET_REPORTS =  gql`
  query reports($page: Int){
    reports(page: $page){ 
      _id
      reporter{
        leader
      }
      baseInfo{
        individuals
        Oindividuals
        family
      }
      health{
        sick
      }
      interaction{
        reaction
      }
      timing{
        end
        start
        date
      }
    }
  }
`
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  reports: any[] = [];
  reportsQuery!: QueryRef<any>;
  private querySubscription!: Subscription;
  loading: boolean = true;
  page:number =  1;

  constructor(private apollo: Apollo) { }

  loadMore() {
    this.reportsQuery.refetch({page: this.page})
  }

  ngOnInit(): void {
    this.reportsQuery = this.apollo.watchQuery<any>({
      query: GET_REPORTS,
      pollInterval: 0,
      variables:{
        page: this.page
      }
    });
    this.querySubscription = this.reportsQuery
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.reports = [...this.reports,...data.reports];
        this.page++;
    },(error) => {
      console.log('error', `${error.message}`);
    });
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}
