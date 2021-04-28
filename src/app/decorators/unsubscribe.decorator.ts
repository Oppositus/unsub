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
      if (Array.isArray(target.__unsubscribeArray)) {
        target.__unsubscribeArray.forEach((sub: string) => {
          try {
            console.log('Unsubscribe from', sub);
            // @ts-ignore
            this[sub].unsubscribe();
          } catch (e) { } // nothing
        });
      }

      // And call ngOnDestroy
      // @ts-ignore
      target.__savedNgOnDestroy.call(this);
    }

    // Add __unsubscribeArray to target prototype
    if (target.__unsubscribeArray === undefined) {
      Object.defineProperty(target, '__unsubscribeArray', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: []
      });
    }

    // Save ngOnDestroy from target prototype
    const savedNgOnDestroy = target.ngOnDestroy || (() => {});

    // Add __savedNgOnDestroy to target prototype
    if (target.__savedNgOnDestroy === undefined) {
      Object.defineProperty(target, '__savedNgOnDestroy', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: savedNgOnDestroy
      });
    }

    // Push subscription field name to unsubscribe array
    target.__unsubscribeArray.push(key);

    // Replace ngOnDestroy. Multiple replace is ok.
    target.ngOnDestroy = unsub;

  };
}
