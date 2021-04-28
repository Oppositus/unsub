/**
 * Unsubscribe() property decorator to automatically unsubscribe from decorated subscriptions.
 *               unsubscribe will be called when ngOnDestroy() is called
 *               if component has ngOnDestroy function it will be called after unsubscribe
 *               if component has no ngOnDestroy function it will be automatically created
 */
export function Unsubscribe(): (target: any, key: string) => void {

  // tslint:disable-next-line:only-arrow-functions
  return function(target: any, key: string): void {

    function unsub(): void {
      target.__unsubscribe__.subscriptions.forEach((sub: string) => {
        try {
          // @ts-ignore
          this[sub].unsubscribe();
        } catch (e) { }
      });

      // @ts-ignore
      target.__unsubscribe__.ngOnDestroy.call(this);
    }

    if (target.__unsubscribe__ === undefined) {
      Object.defineProperty(target, '__unsubscribe__', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: {
          subscriptions: [],
          ngOnDestroy: target.ngOnDestroy || (() => {})
        }
      });
    }

    target.__unsubscribe__.subscriptions.push(key);
    target.ngOnDestroy = unsub;

  };

}
