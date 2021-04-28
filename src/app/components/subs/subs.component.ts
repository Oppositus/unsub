import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, SubscriptionLike } from 'rxjs';
import { Unsubscribe } from '../../decorators/unsubscribe.decorator';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-subs',
  templateUrl: './subs.component.html',
  styleUrls: ['./subs.component.scss']
})
export class SubsComponent implements OnInit, OnDestroy {

  @Unsubscribe()
  private sub1: SubscriptionLike;

  @Unsubscribe()
  private sub2: SubscriptionLike;

  constructor() {
    this.sub1 = interval(1000).pipe(tap(() => console.log('Subscription 1'))).subscribe();
    this.sub2 = interval(3000).pipe(tap(() => console.log('Subscription 2'))).subscribe();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy works!');
  }
}
