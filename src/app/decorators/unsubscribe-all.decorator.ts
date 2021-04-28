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
              console.log('Unsubscribe', sub);
              sub.unsubscribe();
            } catch (e) { } // nothing;
          });

        // @ts-ignore
        savedNgOnDestroy.call(this);
      };
    }

    const ngOnDestroy = constructor.prototype.ngOnDestroy || (() => {});
    constructor.prototype.ngOnDestroy = unsub(ngOnDestroy);
  };

}
