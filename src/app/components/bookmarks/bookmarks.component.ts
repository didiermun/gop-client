import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef,gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Router} from '@angular/router'

const GET_REPORTS =  gql`
  query bookmarks($page: Int){
    bookmarks(page: $page){ 
      bookmarks{
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
  }
`
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  reports: any[] = [];
  reportsQuery!: QueryRef<any>;
  private querySubscription!: Subscription;
  loading: boolean = true;
  page:number =  1;

  constructor(private apollo: Apollo,private router: Router) { }

  loadMore() {
    this.loading = true;
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
        this.reports = [...this.reports,...data.bookmarks.bookmarks];
        this.page++;
    },(error) => {
      if(error.graphQLErrors[0].status == 401){
        localStorage.removeItem('gop_app_token')
        this.router.navigateByUrl('/login');
      }
      console.log('error', `${error.message}`);
    });
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}
