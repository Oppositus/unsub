import { Component, OnInit } from '@angular/core';
import { interval, SubscriptionLike } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UnsubscribeAll } from '../../decorators/unsubscribe-all.decorator';

@UnsubscribeAll()
@Component({
  selector: 'app-unsubscribe-all',
  templateUrl: './unsubscribe-all.component.html',
  styleUrls: ['./unsubscribe-all.component.scss']
})
export class UnsubscribeAllComponent implements OnInit {

  private sub5: SubscriptionLike;
  private sub6: SubscriptionLike;

  constructor() {
    this.sub5 = interval(1200).pipe(tap(() => console.log('Subscription 5'))).subscribe();
    this.sub6 = interval(2300).pipe(tap(() => console.log('Subscription 6'))).subscribe();
  }

  ngOnInit(): void {
  }

}
