import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, SubscriptionLike } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UnsubscribeAll } from '../../decorators/unsubscribe-all.decorator';
import { Unsubscribe } from '../../decorators/unsubscribe.decorator';

@UnsubscribeAll()
@Component({
  selector: 'app-unsubscribe-mix',
  templateUrl: './unsubscribe-mix.component.html',
  styleUrls: ['./unsubscribe-mix.component.scss']
})
export class UnsubscribeMixComponent implements OnInit, OnDestroy {

  @Unsubscribe()
  private sub7: SubscriptionLike;

  @Unsubscribe()
  private sub8: SubscriptionLike;

  constructor() {
    this.sub7 = interval(1200).pipe(tap(() => console.log('Subscription 7'))).subscribe();
    this.sub8 = interval(2300).pipe(tap(() => console.log('Subscription 8'))).subscribe();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('UnsubscribeMixComponent ngOnDestroy');
  }
}
