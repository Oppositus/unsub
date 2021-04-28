/**
 * UnsubscribeAll() component decorator to automatically unsubscribe from all subscriptions.
 *                 unsubscribe will be called when ngOnDestroy() is called
 *                 if component has ngOnDestroy function it will be called after unsubscribe
 *                 if component has no ngOnDestroy function it will be automatically created
 */
export function UnsubscribeAll(): (constructor: new (...args: any[]) => void) => void {

  // tslint:disable-next-line:only-arrow-functions
  return function(constructor: new (...args: any[]) => void): void {

    function unsub(savedNgOnDestroy: () => void): () => void {

      // tslint:disable-next-line:only-arrow-functions
      return function(): void {

        // @ts-ignore
        Object.values(this)
          .filter((prop: any) => typeof prop.unsubscribe === 'function')
          .forEach((sub: any) => {
            try {
              sub.unsubscribe();
            } catch (e) { }
          });

        // @ts-ignore
        savedNgOnDestroy.call(this);
      };

    }

    const ngOnDestroy = constructor.prototype.ngOnDestroy || (() => {});
    constructor.prototype.ngOnDestroy = unsub(ngOnDestroy);

  };

}
