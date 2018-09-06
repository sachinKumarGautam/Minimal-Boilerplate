'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEpicMiddleware = createEpicMiddleware;

var _rxjs = require('rxjs');

var _operators = require('rxjs/operators');

var _ActionsObservable = require('./ActionsObservable');

var _StateObservable = require('./StateObservable');

function createEpicMiddleware() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (process.env.NODE_ENV !== 'production' && typeof options === 'function') {
    throw new TypeError('Providing your root Epic to `createEpicMiddleware(rootEpic)` is no longer supported, instead use `epicMiddleware.run(rootEpic)`\n\nLearn more: https://redux-observable.js.org/MIGRATION.html#setting-up-the-middleware');
  }

  var epic$ = new _rxjs.Subject();
  var store = void 0;

  var epicMiddleware = function epicMiddleware(_store) {
    if (process.env.NODE_ENV !== 'production' && store) {
      // https://github.com/redux-observable/redux-observable/issues/389
      require('./utils/console').warn('this middleware is already associated with a store. createEpicMiddleware should be called for every store.\n\nLearn more: https://goo.gl/2GQ7Da');
    }
    store = _store;
    var actionSubject$ = new _rxjs.Subject().pipe((0, _operators.observeOn)(_rxjs.queueScheduler));
    var stateSubject$ = new _rxjs.Subject().pipe((0, _operators.observeOn)(_rxjs.queueScheduler));
    var action$ = new _ActionsObservable.ActionsObservable(actionSubject$);
    var state$ = new _StateObservable.StateObservable(stateSubject$, store.getState());

    var result$ = epic$.pipe((0, _operators.map)(function (epic) {
      var output$ = 'dependencies' in options ? epic(action$, state$, options.dependencies) : epic(action$, state$);

      if (!output$) {
        throw new TypeError('Your root Epic "' + (epic.name || '<anonymous>') + '" does not return a stream. Double check you\'re not missing a return statement!');
      }

      return output$;
    }), (0, _operators.mergeMap)(function (output$) {
      return (0, _rxjs.from)(output$).pipe((0, _operators.subscribeOn)(_rxjs.queueScheduler), (0, _operators.observeOn)(_rxjs.queueScheduler));
    }));

    result$.subscribe(store.dispatch);

    return function (next) {
      return function (action) {
        // Downstream middleware gets the action first,
        // which includes their reducers, so state is
        // updated before epics receive the action
        var result = next(action);

        // It's important to update the state$ before we emit
        // the action because otherwise it would be stale
        stateSubject$.next(store.getState());
        actionSubject$.next(action);

        return result;
      };
    };
  };

  epicMiddleware.run = function (rootEpic) {
    if (process.env.NODE_ENV !== 'production' && !store) {
      require('./utils/console').warn('epicMiddleware.run(rootEpic) called before the middleware has been setup by redux. Provide the epicMiddleware instance to createStore() first.');
    }
    epic$.next(rootEpic);
  };

  return epicMiddleware;
}