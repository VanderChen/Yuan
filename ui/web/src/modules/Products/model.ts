import { IProduct } from '@yuants/protocol';
import { Observable, defer, shareReplay, switchMap } from 'rxjs';
import { terminal$ } from '../Terminals';

export const useProducts = (() => {
  const hub: Record<string, Observable<IProduct[]>> = {};
  return (datasource_id: string) =>
    (hub[datasource_id] ??= defer(() => terminal$).pipe(
      switchMap((terminal) => terminal.useProducts(datasource_id)),
      shareReplay(1),
    ));
})();
