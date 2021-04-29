import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

function autoDestroyProtoNgOnDestroy(): void {
  // @ts-ignore
  Object.values(this.__unsubscribeSubjects__.subjects).forEach((subj: Subject<void>) => {
    subj.next();
    subj.complete();
  });

  // @ts-ignore
  this.__unsubscribeSubjects__.subjects.splice(0, this.__unsubscribeSubjects__.subjects.length);
  // @ts-ignore
  this.__autoDestroyNgOnDestroy__.call(this);

}

export function autoDestroy<T>(me: any): MonoTypeOperatorFunction<T> {

  const proto = Object.getPrototypeOf(me);
  if (!proto.__autoDestroyNgOnDestroy__) {
    proto.__autoDestroyNgOnDestroy__ = me.ngOnDestroy || (() => {});
  }
  if (proto.ngOnDestroy !== autoDestroyProtoNgOnDestroy) {
    proto.ngOnDestroy = autoDestroyProtoNgOnDestroy;
  }

  if (me.__unsubscribeSubjects__ === undefined) {
    Object.defineProperty(me, '__unsubscribeSubjects__', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: {
        subjects: []
      }
    });
  }

  const subj = new Subject<void>();
  me.__unsubscribeSubjects__.subjects.push(subj);
  return takeUntil(subj);
}
