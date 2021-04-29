import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from '../../decorators/unsubscribe.decorator';
import { interval, SubscriptionLike } from 'rxjs';
import { tap } from 'rxjs/operators';
import { autoDestroy } from '../../operators/auto-destroy.operator';
import { UnsubscribeAll } from '../../decorators/unsubscribe-all.decorator';

@UnsubscribeAll()
@Component({
  selector: 'app-mix-all',
  templateUrl: './mix-all.component.html',
  styleUrls: ['./mix-all.component.scss']
})
export class MixAllComponent implements OnInit, OnDestroy {

  @Unsubscribe()
  private sub9: SubscriptionLike;

  @Unsubscribe()
  private sub10: SubscriptionLike;

  private sub11: SubscriptionLike;
  private sub12: SubscriptionLike;

  constructor() {
    interval(2345)
      .pipe(
        autoDestroy(this),
        tap((num: number) => console.log('Subscription 2345', num))
      ).subscribe();

    this.sub9 = interval(1200).pipe(tap(() => console.log('Subscription 9'))).subscribe();
    this.sub10 = interval(2300).pipe(tap(() => console.log('Subscription 10'))).subscribe();

    interval(1234)
      .pipe(
        autoDestroy(this),
        tap((num: number) => console.log('Subscription 1234', num))
      ).subscribe();

    this.sub11 = interval(2300).pipe(tap(() => console.log('Subscription 11'))).subscribe();
    this.sub12 = interval(2300).pipe(tap(() => console.log('Subscription 12'))).subscribe();

    interval(3456)
      .pipe(
        autoDestroy(this),
        tap((num: number) => console.log('Subscription 3456', num))
      ).subscribe();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('MixAllComponent ngOnDestroy');
  }

}
