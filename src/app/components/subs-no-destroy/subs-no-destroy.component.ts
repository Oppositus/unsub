import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from '../../decorators/unsubscribe.decorator';
import { interval, SubscriptionLike } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-subs-no-destroy',
  templateUrl: './subs-no-destroy.component.html',
  styleUrls: ['./subs-no-destroy.component.scss']
})
export class SubsNoDestroyComponent implements OnInit {

  @Unsubscribe()
  private sub3: SubscriptionLike;

  @Unsubscribe()
  private sub4: SubscriptionLike;

  constructor() {
    this.sub3 = interval(1100).pipe(tap(() => console.log('Subscription 3'))).subscribe();
    this.sub4 = interval(3300).pipe(tap(() => console.log('Subscription 4'))).subscribe();
  }

  ngOnInit(): void {
  }

}
