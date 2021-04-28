/**
 * Unsubscribe() decorator to automatically unsubscribe from decorated subscriptions.
 *               unsubscribe will be called when ngOnDestroy() is called
 *               if component has ngOnDestroy function it will be called after unsubscribe
 *               if component has no ngOnDestroy function it will be automatically created
 */
export function Unsubscribe(): (target: any, key: string) => void {

  // The decorator itself
  // tslint:disable-next-line:only-arrow-functions
  return function(target: any, key: string): void {

    // Function that do unsubscribe and then call ngOnDestroy.
    function unsub(): void {
      // "this" value is defined by call component.ngOnDestroy()

      // Unsubscribe
      target.__unsubscribeArray__.forEach((sub: string) => {
        try {
          console.log('Unsubscribe from', sub);
          // @ts-ignore
          this[sub].unsubscribe();
        } catch (e) { } // nothing
      });

      // And call ngOnDestroy
      // @ts-ignore
      target.__savedNgOnDestroy__.call(this);
    }

    // Add __unsubscribeArray__ to target prototype
    if (target.__unsubscribeArray__ === undefined) {
      Object.defineProperty(target, '__unsubscribeArray__', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: []
      });
    }

    // Add __savedNgOnDestroy__ to target prototype with saved ngOnDestroy
    if (target.__savedNgOnDestroy__ === undefined) {
      Object.defineProperty(target, '__savedNgOnDestroy__', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: target.ngOnDestroy || (() => {})
      });
    }

    // Push subscription field name to unsubscribe array
    target.__unsubscribeArray__.push(key);

    // Replace ngOnDestroy. Multiple replace is ok.
    target.ngOnDestroy = unsub;

  };
}
