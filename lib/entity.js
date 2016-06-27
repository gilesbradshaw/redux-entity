'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureModule = exports.entityModule = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends14 = require('babel-runtime/helpers/extends');

var _extends15 = _interopRequireDefault(_extends14);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _rxjs = require('rxjs');

var Rx = _interopRequireWildcard(_rxjs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------
var getModule = function getModule(_ref) {
  var _ACTION_HANDLERS;

  var name = _ref.name;
  var getJoinId = _ref.getJoinId;
  var getJoinSingleId = _ref.getJoinSingleId;
  var getLoadPath = _ref.getLoadPath;
  var getLoadDefaults = _ref.getLoadDefaults;
  var getSinglePath = _ref.getSinglePath;
  var getPostPath = _ref.getPostPath;
  var getPutPath = _ref.getPutPath;
  var getDeletePath = _ref.getDeletePath;
  var postConvert = _ref.postConvert;

  var ENTITIES_UPDATE_PUT = 'react-dealerweb/ENTITIES_UPDATE_PUT:' + name;
  var ENTITIES_UPDATE_POST = 'react-dealerweb/ENTITIES_UPDATE_POST:' + name;
  var ENTITIES_UPDATE_DELETE = 'react-dealerweb/ENTITIES_UPDATE_DELETE:' + name;

  var ENTITIES_LOAD = 'react-dealerweb/ENTITIES_LOAD:' + name;
  var ENTITIES_LOAD_SUCCESS = 'react-dealerweb/ENTITIES_LOAD_SUCCESS:' + name;
  var ENTITIES_LOAD_FAIL = 'react-dealerweb/ENTITIES_LOAD_FAIL:' + name;
  var ENTITIES_LOAD_FAIL_CANCEL = 'react-dealerweb/ENTITIES_LOAD_FAIL_CANCEL:' + name;

  var ENTITIES_LOAD_MORE = 'react-dealerweb/ENTITIES_LOAD_MORE:' + name;
  var ENTITIES_LOAD_MORE_SUCCESS = 'react-dealerweb/ENTITIES_LOAD_MORE_SUCCESS:' + name;
  var ENTITIES_LOAD_MORE_FAIL = 'react-dealerweb/ENTITIES_LOAD_MORE_FAIL:' + name;

  var ENTITY_UPDATE_PUT = 'react-dealerweb/ENTITY_UPDATE_PUT:' + name;
  var ENTITY_UPDATE_DELETE = 'react-dealerweb/ENTITY_UPDATE_DELETE:' + name;

  var ENTITY_LOAD = 'react-dealerweb/ENTITY_LOAD:' + name;
  var ENTITY_LOAD_SUCCESS = 'react-dealerweb/ENTITY_LOAD_SUCCESS:' + name;
  var ENTITY_LOAD_FAIL = 'react-dealerweb/ENTITY_LOAD_FAIL:' + name;
  var ENTITY_LOAD_FAIL_CANCEL = 'react-dealerweb/ENTITY_LOAD_FAIL_CANCEL:' + name;
  var ENTITY_RESET = 'react-dealerweb/ENTITY_RESET:' + name;

  var ENTITIES_RESET = 'react-dealerweb/ENTITIES_RESET:' + name;
  var ENTITIES_INIT = 'react-dealerweb/ENTITIES_INIT:' + name;

  var ENTITIES_EDIT_START = 'react-dealerweb/ENTITIES_EDIT_START:' + name;
  var ENTITIES_EDIT_STOP = 'react-dealerweb/ENTITIES_EDIT_STOP:' + name;

  var ENTITIES_SAVE = 'react-dealerweb/ENTITIES_SAVE:' + name;
  var ENTITIES_SAVE_SUCCESS = 'react-dealerweb/ENTITIES_SAVE_SUCCESS:' + name;
  var ENTITIES_SAVE_FAIL = 'react-dealerweb/ENTITIES_SAVE_FAIL:' + name;
  var ENTITIES_SAVE_FAIL_CANCEL = 'react-dealerweb/ENTITIES_SAVE_FAIL_CANCEL:' + name;

  var ENTITIES_ADD = 'react-dealerweb/ENTITIES_ADD:' + name;
  var ENTITIES_ADD_SUCCESS = 'react-dealerweb/ENTITIES_ADD_SUCCESS:' + name;

  var ENTITIES_DELETE = 'react-dealerweb/ENTITIES_DELETE:' + name;
  var ENTITIES_DELETE_SUCCESS = 'react-dealerweb/ENTITIES_DELETE_SUCCESS:' + name;
  var ENTITIES_DELETE_FAIL = 'react-dealerweb/ENTITIES_DELETE_FAIL:' + name;

  var join = function join(joinConfig) {
    return function (_ref2) {
      var signalR = _ref2.signalR;
      var apiClient = _ref2.apiClient;

      var joinId = getJoinId(joinConfig);
      return signalR.flatMap(function (subscriber) {
        return subscriber.join(joinId).flatMap(function (messages) {
          return Rx.Observable.of(messages.map(function (message) {
            if (message.message && message.message.method === 'put') {
              return { type: ENTITIES_UPDATE_PUT, payload: message.message.value };
            }
            if (message.message && message.message.method === 'post') {
              return { type: ENTITIES_UPDATE_POST, payload: message.message.value };
            }
            if (message.message && message.message.method === 'delete') {
              return { type: ENTITIES_UPDATE_DELETE, id: message.message.id };
            }
            return {};
          }));
        });
      })

      // if the signalR join fails we do a reset...
      .catch(function (error) {
        return Rx.Observable.of(Rx.Observable.of({ type: ENTITIES_RESET }));
      });
    };
  };

  var joinSingle = function joinSingle(id) {
    return function (_ref3) {
      var signalR = _ref3.signalR;
      var apiClient = _ref3.apiClient;

      var joinSingleId = getJoinSingleId(id);
      return signalR.flatMap(function (subscriber) {
        return subscriber.join(joinSingleId).flatMap(function (messages) {
          return Rx.Observable.of(messages.map(function (message) {
            if (message.message && message.message.method === 'put') {
              return { type: ENTITY_UPDATE_PUT, payload: message.message.value };
            }
            if (message.message && message.message.method === 'delete') {
              return { type: ENTITY_UPDATE_DELETE, id: message.message.id };
            }
            return {};
          }));
        });
      })
      // if the signalR join fails we do a reset...
      .catch(function (error) {
        return Rx.Observable.of(Rx.Observable.of({ type: ENTITIES_RESET }));
      });
    };
  };

  // ------------------------------------
  // Actions
  // -----------------------------
  var replayer = function replayer(changes) {
    var subject = new Rx.ReplaySubject(100 /* buffer size */);
    var subscription = changes.subscribe(function (x) {
      subject.next(x);
    });
    return Rx.Observable.create(function (obs) {
      subject.subscribe(function (x) {
        return obs.next(x);
      });
      return function () {
        return subscription.unsubscribe();
      };
    });
  };
  var load = function load(loadConfig) {
    return function (_ref4) {
      var signalR = _ref4.signalR;
      var apiClient = _ref4.apiClient;

      var loadDefaults = getLoadDefaults(loadConfig);
      return function (actions, _ref5) {
        var getState = _ref5.getState;

        return join(loadConfig)({ signalR: signalR, apiClient: apiClient }).flatMap(function (changes) {
          var observedMessages = replayer(changes);
          var path = getLoadPath(loadDefaults);
          return Rx.Observable.fromPromise(apiClient.get(path)).map(function (result) {
            return { type: ENTITIES_LOAD_SUCCESS, payload: result };
          }).concat(observedMessages).catch(function (error) {
            return Rx.Observable.of({ type: ENTITIES_LOAD_FAIL, payload: error });
          });
        }).startWith({ type: ENTITIES_LOAD, payload: loadDefaults }).takeUntil(Rx.Observable.empty().delay(0).concat(actions.ofType(ENTITIES_RESET)));
      };
    };
  };

  var loadErrorCancel = function loadErrorCancel() {
    return { type: ENTITIES_LOAD_FAIL_CANCEL };
  };

  var loadMore = function loadMore(loadConfig) {
    return function (_ref6) {
      var apiClient = _ref6.apiClient;

      var loadDefaults = getLoadDefaults(loadConfig);
      var path = getLoadPath(loadDefaults);

      return function (actions, _ref7) {
        var getState = _ref7.getState;

        return Rx.Observable.fromPromise(apiClient.get(path)).map(function (result) {
          return { type: ENTITIES_LOAD_MORE_SUCCESS, payload: result };
        }).catch(function (error) {
          return Rx.Observable.of({ type: ENTITIES_LOAD_MORE_FAIL, payload: error });
        }).startWith({ type: ENTITIES_LOAD_MORE });
      };
    };
  };

  var loadSingle = function loadSingle(id, loadNode) {
    return function (_ref8) {
      var signalR = _ref8.signalR;
      var apiClient = _ref8.apiClient;

      var singlePath = getSinglePath(id);
      return function (actions, _ref9) {
        var getState = _ref9.getState;
        var dispatch = _ref9.dispatch;

        return joinSingle(id)({ signalR: signalR, apiClient: apiClient }).flatMap(function (changes) {
          var observedMessages = replayer(changes);
          return Rx.Observable.fromPromise(apiClient.get(singlePath)).do(function (result) {
            return loadNode && dispatch(loadNode(result.ParentId));
          }).map(function (result) {
            return { type: ENTITY_LOAD_SUCCESS, payload: result };
          }).concat(observedMessages).catch(function (error) {
            return Rx.Observable.of({ type: ENTITY_LOAD_FAIL, payload: error });
          });
        }).startWith({ type: ENTITY_LOAD })
        // miss a beat to allow for route changes...
        .takeUntil(Rx.Observable.empty().delay(0).concat(actions.ofType(ENTITY_RESET)));
      };
    };
  };
  var singleLoadErrorCancel = function singleLoadErrorCancel() {
    return { type: ENTITY_LOAD_FAIL_CANCEL };
  };

  var add = function add(parentId) {
    return { type: ENTITIES_ADD, parentId: parentId };
  };
  var reset = function reset() {
    return { type: ENTITIES_RESET };
  };
  var resetSingle = function resetSingle() {
    return { type: ENTITY_RESET };
  };
  function editStart(id) {
    return { type: ENTITIES_EDIT_START, id: id };
  }

  function editStop(id) {
    return { type: ENTITIES_EDIT_STOP, id: id };
  }
  var saveErrorCancel = function saveErrorCancel(id) {
    return { type: ENTITIES_SAVE_FAIL_CANCEL, id: id };
  };

  var save = function save(values) {
    return function (_ref10) {
      var apiClient = _ref10.apiClient;

      if (!values.isNew) {
        var _ret = function () {
          var putPath = getPutPath(values);
          return {
            v: function v(actions, _ref11) {
              var getState = _ref11.getState;
              return Rx.Observable.fromPromise(
              //Promise.reject('nooooooooo')
              apiClient.put(putPath, {
                data: values
              })).flatMap(function (result) {
                return Rx.Observable.of({ type: ENTITIES_SAVE_SUCCESS, id: values.Id });
              }).catch(function (error) {
                return Rx.Observable.of({ type: ENTITIES_SAVE_FAIL, id: values.Id, error: error });
              }).startWith({ type: ENTITIES_SAVE, values: values });
            }
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
      } else {
        var _ret2 = function () {
          var postPath = getPostPath(values);
          return {
            v: function v(actions, _ref12) {
              var getState = _ref12.getState;
              return Rx.Observable.fromPromise(apiClient.post(postPath, {
                data: postConvert(values)
              })).flatMap(function (result) {
                return Rx.Observable.of({ type: ENTITIES_ADD_SUCCESS });
              }).catch(function (error) {
                return Rx.Observable.of({ type: ENTITIES_SAVE_FAIL, id: values.Id, error: error });
              }).startWith({ type: ENTITIES_SAVE, values: values });
            }
          };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret2)) === "object") return _ret2.v;
      }
    };
  };
  var remove = function remove(id) {
    return function (_ref13) {
      var apiClient = _ref13.apiClient;

      var deletePath = getDeletePath(id);
      return function (actions, _ref14) {
        var getState = _ref14.getState;
        return Rx.Observable.fromPromise(apiClient.del(deletePath)).flatMap(function (result) {
          return Rx.Observable.of({ type: ENTITIES_DELETE_SUCCESS, id: id });
        }).catch(function (error) {
          return Rx.Observable.of({ type: ENTITIES_SAVE_FAIL, id: id, error: error });
        }).startWith({ type: ENTITIES_DELETE, id: id });
      };
    };
  };

  // orders and filters data according to state
  var orderData = function orderData(values, state) {
    if (state.loadOrder) {
      var _ret3 = function () {
        var back = state.loadOrder[0] === '-';
        var field = back ? state.loadOrder.substring(1) : state.loadOrder;
        var deleted = state.loadDeleted && state.loadDeleted !== 'false';
        var ret = values.map(function (value) {
          return value;
        }).filter(function (value) {
          return value.IsDeleted === deleted;
        }).sort(function (a, b) {
          var aa = a[field] && a[field].toLowerCase ? a[field].toLowerCase() : a[field];
          var bb = b[field] && b[field].toLowerCase ? b[field].toLowerCase() : b[field];

          if (aa === bb) {
            return 0;
          }
          if (aa < bb) {
            return back ? 1 : -1;
          }
          return back ? -1 : 1;
        });
        return {
          v: ret
        };
      }();

      if ((typeof _ret3 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret3)) === "object") return _ret3.v;
    } else {
      return values;
    }
  };
  // ------------------------------------
  // Action Handlers
  // ------------------------------------
  var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_RESET, function (state, action) {
    return (0, _extends15.default)({}, state);
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_LOAD, function (state, action) {
    return (0, _extends15.default)({}, state, {
      error: null,
      loading: true,
      loadOrder: action.payload.order || 'Name',
      loadDeleted: action.payload.isDeleted || 'false'
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_LOAD_SUCCESS, function (state, action) {
    return (0, _extends15.default)({}, state, {
      data: action.payload,
      loading: false
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_LOAD_FAIL, function (state, action) {
    return (0, _extends15.default)({}, state, {
      error: action.payload,
      loading: false
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_LOAD_FAIL_CANCEL, function (state, action) {
    return (0, _extends15.default)({}, state, {
      error: null
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_LOAD_MORE, function (state, action) {
    return (0, _extends15.default)({}, state, {
      error: null,
      loadingMore: true
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_LOAD_MORE_SUCCESS, function (state, action) {
    return (0, _extends15.default)({}, state, {
      data: (0, _extends15.default)({}, state.data, { Values: state.data.Values.concat(action.payload.Values) }),
      loadingMore: false
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_LOAD_MORE_FAIL, function (state, action) {
    return (0, _extends15.default)({}, state, {
      error: action.payload,
      loadingMore: false
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITY_LOAD, function (state) {
    return (0, _extends15.default)({}, state, {
      singleError: null,
      singleLoading: true
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITY_LOAD_SUCCESS, function (state, action) {
    return (0, _extends15.default)({}, state, {
      singleData: action.payload,
      singleLoading: false
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITY_LOAD_FAIL, function (state, action) {
    return (0, _extends15.default)({}, state, {
      singleError: action.payload,
      singleLoading: false
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITY_LOAD_FAIL_CANCEL, function (state, action) {
    return (0, _extends15.default)({}, state, {
      singleError: null
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_EDIT_START, function (state, action) {
    return (0, _extends15.default)({}, state, {
      editing: (0, _extends15.default)({}, state.editing, (0, _defineProperty3.default)({}, action.id, true))
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_EDIT_STOP, function (state, action) {
    return (0, _extends15.default)({}, state, {
      data: (0, _extends15.default)({}, state.data, {
        Values: state.data && state.data.Values ? state.data.Values.filter(function (value) {
          return !value.isNew || value.Id != action.id;
        }) : []
      }),
      editing: (0, _extends15.default)({}, state.editing, (0, _defineProperty3.default)({}, action.id, false))
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_SAVE, function (state, action) {
    return (0, _extends15.default)({}, state, {
      saveError: (0, _extends15.default)({}, state.saveError, (0, _defineProperty3.default)({}, action.values.Id, null)),
      saving: (0, _extends15.default)({}, state.saving, (0, _defineProperty3.default)({}, action.values.Id, action.values))
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_SAVE_SUCCESS, function (state, action) {
    return (0, _extends15.default)({}, state, {
      editing: (0, _extends15.default)({}, state.editing, (0, _defineProperty3.default)({}, action.id, false)),
      saving: (0, _extends15.default)({}, state.saving, (0, _defineProperty3.default)({}, action.id, false))
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_SAVE_FAIL, function (state, action) {
    return (0, _extends15.default)({}, state, {
      saving: (0, _extends15.default)({}, state.saving, (0, _defineProperty3.default)({}, action.id, false)),
      saveError: (0, _extends15.default)({}, state.saveError, (0, _defineProperty3.default)({}, action.id, action.error))
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_SAVE_FAIL_CANCEL, function (state, action) {
    return (0, _extends15.default)({}, state, {
      saveError: (0, _extends15.default)({}, state.saveError, (0, _defineProperty3.default)({}, action.id, null))
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_UPDATE_PUT, function (state, action) {
    var deleted = state.loadDeleted && state.loadDeleted !== 'false';
    //total count changes with deletion
    var totalCountChange = deleted && action.payload.IsDeleted ? 1 : !deleted && action.payload.IsDeleted ? -1 : 0;
    if (state.data && state.data.Values) {
      var found = state.data.Values.find(function (state) {
        return state.Id === action.payload.Id;
      });
      var replace = (0, _extends15.default)({}, found, action.payload);
      if (state.data.Values.indexOf(found) > -1) {
        state.data.Values.splice(state.data.Values.indexOf(found), 1, replace);
      } else {
        state.data.Values.push(replace);
      }
    }
    return (0, _extends15.default)({}, state, {
      singleData: state.singleData && action.payload.Id === state.singleData.Id ? action.payload : state.singleData,
      data: (0, _extends15.default)({}, state.data, {
        TotalCount: state.data && state.data.TotalCount + totalCountChange,
        Values: state.data && state.data.Values ? orderData(state.data.Values, state) : []
      })
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_UPDATE_POST, function (state, action) {
    var deleted = state.loadDeleted && state.loadDeleted !== 'false';
    var totalCountChange = !deleted ? 1 : 0;
    var found = state.data.Values.find(function (state) {
      return state.Id === action.payload.Id;
    });
    if (found) {
      var replace = (0, _extends15.default)({}, action.payload);
      state.data.Values.splice(state.data.Values.indexOf(found), 1, replace);
    } else {
      state.data.Values.push(action.payload);
    }

    var ah = orderData(state.data.Values, state);
    return (0, _extends15.default)({}, state, {
      data: (0, _extends15.default)({}, state.data, {
        TotalCount: state.data && state.data.TotalCount + totalCountChange,
        Values: orderData(state.data.Values, state)
      })
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_UPDATE_DELETE, function (state, action) {
    return (0, _extends15.default)({}, state, {
      deleting: (0, _extends15.default)({}, state.deleting, (0, _defineProperty3.default)({}, action.id, false)),
      data: (0, _extends15.default)({}, state.data, {
        Values: state.data.Values.filter(function (state) {
          return state.Id !== action.id;
        })
      })
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITY_UPDATE_PUT, function (state, action) {
    if (state.singleData && state.singleData.Id == action.payload.Id) {
      return (0, _extends15.default)({}, state, {
        singleData: (0, _extends15.default)({}, state.singleData, action.payload)
      });
    }
    return state;
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITY_UPDATE_DELETE, function (state, action) {
    if (state.singleData && action.id === state.singleData.Id) {
      return (0, _extends15.default)({}, state, {
        singleData: null
      });
    }
    return state;
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_DELETE_SUCCESS, function (state, action) {
    return (0, _extends15.default)({}, state, {
      deleting: (0, _extends15.default)({}, state.deleting, (0, _defineProperty3.default)({}, action.id, false)),
      data: (0, _extends15.default)({}, state.data, {
        Values: state.data.Values.filter(function (state) {
          return state.Id !== action.id;
        })
      })
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_ADD, function (state, action) {
    return (0, _extends15.default)({}, state, {
      editing: (0, _extends15.default)({}, state.editing, {
        add: true
      }),
      data: (0, _extends15.default)({}, state.data, {
        Values: [{
          Id: 'add',
          ParentId: action.parentId,
          isNew: true,
          Name: ''
        }].concat(state.data.Values)
      })
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_ADD_SUCCESS, function (state, action) {
    return (0, _extends15.default)({}, state, {
      data: (0, _extends15.default)({}, state.data, {
        Values: state.data.Values.filter(function (group) {
          return group.Id !== 'add';
        }) }),
      saving: (0, _extends15.default)({}, state.saving, {
        add: false
      }),
      editing: (0, _extends15.default)({}, state.editing, {
        add: false
      })
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_DELETE, function (state, action) {
    return (0, _extends15.default)({}, state, {
      deleting: (0, _extends15.default)({}, state.deleting, (0, _defineProperty3.default)({}, action.id, true))
    });
  }), _ACTION_HANDLERS);

  // ------------------------------------
  // Reducer
  // ------------------------------------
  var initialState = { loadOrder: 'Name', loadDeleted: 'false' };
  function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    var handler = ACTION_HANDLERS[action.type];
    if (handler) {
      console.log(action.type);
    }
    return handler ? handler(state, action) : state;
  }

  return {
    constants: {
      ENTITIES_UPDATE_PUT: ENTITIES_UPDATE_PUT,
      ENTITIES_UPDATE_POST: ENTITIES_UPDATE_POST,
      ENTITIES_UPDATE_DELETE: ENTITIES_UPDATE_DELETE,

      ENTITIES_LOAD: ENTITIES_LOAD,
      ENTITIES_LOAD_SUCCESS: ENTITIES_LOAD_SUCCESS,
      ENTITIES_LOAD_FAIL: ENTITIES_LOAD_FAIL,
      ENTITIES_LOAD_FAIL_CANCEL: ENTITIES_LOAD_FAIL_CANCEL,

      ENTITIES_LOAD_MORE: ENTITIES_LOAD_MORE,
      ENTITIES_LOAD_MORE_SUCCESS: ENTITIES_LOAD_MORE_SUCCESS,
      ENTITIES_LOAD_MORE_FAIL: ENTITIES_LOAD_MORE_FAIL,

      ENTITY_UPDATE_PUT: ENTITY_UPDATE_PUT,
      ENTITY_UPDATE_DELETE: ENTITY_UPDATE_DELETE,

      ENTITY_LOAD: ENTITY_LOAD,
      ENTITY_LOAD_SUCCESS: ENTITY_LOAD_SUCCESS,
      ENTITY_LOAD_FAIL: ENTITY_LOAD_FAIL,
      ENTITY_LOAD_FAIL_CANCEL: ENTITY_LOAD_FAIL_CANCEL,
      ENTITY_RESET: ENTITY_RESET,

      ENTITIES_RESET: ENTITIES_RESET,
      ENTITIES_INIT: ENTITIES_INIT,

      ENTITIES_EDIT_START: ENTITIES_EDIT_START,
      ENTITIES_EDIT_STOP: ENTITIES_EDIT_STOP,

      ENTITIES_SAVE: ENTITIES_SAVE,
      ENTITIES_SAVE_SUCCESS: ENTITIES_SAVE_SUCCESS,
      ENTITIES_SAVE_FAIL: ENTITIES_SAVE_FAIL,
      ENTITIES_SAVE_FAIL_CANCEL: ENTITIES_SAVE_FAIL_CANCEL,

      ENTITIES_ADD: ENTITIES_ADD,
      ENTITIES_ADD_SUCCESS: ENTITIES_ADD_SUCCESS,

      ENTITIES_DELETE: ENTITIES_DELETE,
      ENTITIES_DELETE_SUCCESS: ENTITIES_DELETE_SUCCESS,
      ENTITIES_DELETE_FAIL: ENTITIES_DELETE_FAIL
    },
    actions: {
      load: load,
      loadErrorCancel: loadErrorCancel,
      loadMore: loadMore,
      loadSingle: loadSingle,
      singleLoadErrorCancel: singleLoadErrorCancel,
      add: add,
      reset: reset,
      resetSingle: resetSingle,
      editStart: editStart,
      editStop: editStop,
      save: save,
      saveErrorCancel: saveErrorCancel,
      remove: remove
    },
    reducer: reducer
  };
};

var modules = {};

// get a module from the cache of configured modules
var entityModule = exports.entityModule = function entityModule(name) {
  return modules[name];
};

// configura a new module
var configureModule = exports.configureModule = function configureModule(config) {
  return modules[config.name] = getModule(config);
};