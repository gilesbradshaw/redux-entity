'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureModule = exports.entityModule = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends27 = require('babel-runtime/helpers/extends');

var _extends28 = _interopRequireDefault(_extends27);

var _rxjs = require('rxjs');

var Rx = _interopRequireWildcard(_rxjs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var APP_INITIALISE = 'react-dealerweb/APP_INITIALISE';
// ------------------------------------
// Constants
// ------------------------------------
var getModule = function getModule(_ref) {
  var _ACTION_HANDLERS;

  var name = _ref.name;
  var getJoinId = _ref.getJoinId;
  var getJoinSingleId = _ref.getJoinSingleId;
  var _ref$getJoinFilter = _ref.getJoinFilter;
  var getJoinFilter = _ref$getJoinFilter === undefined ? function (_ref23) {
    var parentId = _ref23.parentId;
    return function (value) {
      return !parentId || value.ParentId == parentId;
    };
  } : _ref$getJoinFilter;
  var getLoadPath = _ref.getLoadPath;
  var getLoadDefaults = _ref.getLoadDefaults;
  var _ref$getLoadHasChange = _ref.getLoadHasChanged;
  var getLoadHasChanged = _ref$getLoadHasChange === undefined ? function () {
    return true;
  } : _ref$getLoadHasChange;
  var _ref$getLoadSingleHas = _ref.getLoadSingleHasChanged;
  var getLoadSingleHasChanged = _ref$getLoadSingleHas === undefined ? function () {
    return true;
  } : _ref$getLoadSingleHas;
  var getSinglePath = _ref.getSinglePath;
  var getPostPath = _ref.getPostPath;
  var getUploadPostPath = _ref.getUploadPostPath;
  var getPutPath = _ref.getPutPath;
  var getUploadPutPath = _ref.getUploadPutPath;
  var getDeletePath = _ref.getDeletePath;
  var postConvert = _ref.postConvert;
  var _ref$signalRRetry = _ref.signalRRetry;
  var signalRRetry = _ref$signalRRetry === undefined ? 10000 : _ref$signalRRetry;
  var _ref$getNew = _ref.getNew;
  var getNew = _ref$getNew === undefined ? function () {
    return null;
  } : _ref$getNew;
  var _ref$dontDoDelete = _ref.dontDoDelete;
  var dontDoDelete = _ref$dontDoDelete === undefined ? function () {
    return false;
  } : _ref$dontDoDelete;
  var _ref$filter = _ref.filter;
  var filter = _ref$filter === undefined ? function (payload) {
    return null;
  } : _ref$filter;

  var ENTITIES_UPDATE_PUT = 'react-dealerweb/ENTITIES_UPDATE_PUT:' + name;
  var ENTITIES_UPDATE_POST = 'react-dealerweb/ENTITIES_UPDATE_POST:' + name;
  var ENTITIES_UPDATE_DELETE = 'react-dealerweb/ENTITIES_UPDATE_DELETE:' + name;

  var ENTITIES_LOAD = 'react-dealerweb/ENTITIES_LOAD:' + name;
  var ENTITIES_LOAD_PROGRESS = 'react-dealerweb/ENTITIES_LOAD_PROGRESS:' + name;
  var ENTITIES_LOAD_SUCCESS = 'react-dealerweb/ENTITIES_LOAD_SUCCESS:' + name;
  var ENTITIES_LOAD_FAIL = 'react-dealerweb/ENTITIES_LOAD_FAIL:' + name;
  var ENTITIES_LOAD_FAIL_CANCEL = 'react-dealerweb/ENTITIES_LOAD_FAIL_CANCEL:' + name;

  var ENTITIES_LOAD_MORE = 'react-dealerweb/ENTITIES_LOAD_MORE:' + name;
  var ENTITIES_LOAD_MORE_PROGRESS = 'react-dealerweb/ENTITIES_LOAD_MORE_PROGRESS:' + name;
  var ENTITIES_LOAD_MORE_SUCCESS = 'react-dealerweb/ENTITIES_LOAD_MORE_SUCCESS:' + name;
  var ENTITIES_LOAD_MORE_FAIL = 'react-dealerweb/ENTITIES_LOAD_MORE_FAIL:' + name;

  var ENTITY_UPDATE_PUT = 'react-dealerweb/ENTITY_UPDATE_PUT:' + name;
  var ENTITY_UPDATE_DELETE = 'react-dealerweb/ENTITY_UPDATE_DELETE:' + name;

  var ENTITY_LOAD = 'react-dealerweb/ENTITY_LOAD:' + name;
  var ENTITY_LOAD_PROGRESS = 'react-dealerweb/ENTITY_LOAD_PROGRESS:' + name;
  var ENTITY_LOAD_SUCCESS = 'react-dealerweb/ENTITY_LOAD_SUCCESS:' + name;
  var ENTITY_LOAD_FAIL = 'react-dealerweb/ENTITY_LOAD_FAIL:' + name;
  var ENTITY_LOAD_FAIL_CANCEL = 'react-dealerweb/ENTITY_LOAD_FAIL_CANCEL:' + name;

  var ENTITIES_INIT = 'react-dealerweb/ENTITIES_INIT:' + name;

  var ENTITIES_EDIT_START = 'react-dealerweb/ENTITIES_EDIT_START:' + name;
  var ENTITIES_EDIT_STOP = 'react-dealerweb/ENTITIES_EDIT_STOP:' + name;

  var ENTITIES_SAVE = 'react-dealerweb/ENTITIES_SAVE:' + name;
  var ENTITIES_SAVE_PROGRESS = 'react-dealerweb/ENTITIES_SAVE_PROGRESS:' + name;
  var ENTITIES_SAVE_SUCCESS = 'react-dealerweb/ENTITIES_SAVE_SUCCESS:' + name;
  var ENTITIES_SAVE_FAIL = 'react-dealerweb/ENTITIES_SAVE_FAIL:' + name;
  var ENTITIES_SAVE_FAIL_CANCEL = 'react-dealerweb/ENTITIES_SAVE_FAIL_CANCEL:' + name;

  var ENTITIES_UPLOAD = 'react-dealerweb/ENTITIES_UPLOAD:' + name;
  var ENTITIES_UPLOAD_PROGRESS = 'react-dealerweb/ENTITIES_UPLOAD_PROGRESS:' + name;
  var ENTITIES_UPLOAD_SUCCESS = 'react-dealerweb/ENTITIES_UPLOAD_SUCCESS:' + name;
  var ENTITIES_UPLOAD_FAIL = 'react-dealerweb/ENTITIES_UPLOAD_FAIL:' + name;
  var ENTITIES_UPLOAD_FAIL_CANCEL = 'react-dealerweb/ENTITIES_UPLOAD_FAIL_CANCEL:' + name;

  var ENTITIES_ADD = 'react-dealerweb/ENTITIES_ADD:' + name;
  var ENTITIES_ADD_SUCCESS = 'react-dealerweb/ENTITIES_ADD_SUCCESS:' + name;

  var ENTITIES_DELETE = 'react-dealerweb/ENTITIES_DELETE:' + name;
  var ENTITIES_DELETE_SUCCESS = 'react-dealerweb/ENTITIES_DELETE_SUCCESS:' + name;

  var join = function join() {
    var joinConfig = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    return function (_ref2) {
      var signalR = _ref2.signalR;
      var apiClient = _ref2.apiClient;

      return Rx.Observable.of(1).switchMap(function (x) {
        return signalR().switchMap(function (subscriber) {
          return Rx.Observable.of(1).switchMap(function (x) {
            return subscriber.join(getJoinId(joinConfig)).switchMap(function (messages) {
              return Rx.Observable.of(messages.filter(function (message) {
                return getJoinFilter(joinConfig)(message.message.value);
              }).map(function (message) {
                if (message.message && message.message.method === 'put') {
                  return {
                    type: ENTITIES_UPDATE_PUT,
                    payload: message.message
                  };
                }
                if (message.message && message.message.method === 'post') {
                  return {
                    type: ENTITIES_UPDATE_POST,
                    payload: message.message
                  };
                }
                if (message.message && message.message.method === 'delete') {
                  return {
                    type: ENTITIES_UPDATE_DELETE,
                    payload: message.message
                  };
                }
              }));
            });
          }).retryWhen(function (errors) {
            return errors.delay(signalRRetry);
          });
        });
      }).retryWhen(function (errors) {
        return errors.delay(signalRRetry);
      });
    };
  };
  var joinSingle = function joinSingle(id) {
    return function (_ref3) {
      var signalR = _ref3.signalR;
      var apiClient = _ref3.apiClient;
      return Rx.Observable.of(1).switchMap(function (x) {
        return signalR().switchMap(function (subscriber) {
          return Rx.Observable.of(1).flatMap(function (x) {
            return subscriber.join(getJoinSingleId(id)).flatMap(function (messages) {
              return Rx.Observable.of(messages.filter(function (message) {
                return message.message.value.Id == id;
              }).map(function (message) {
                if (message.message && message.message.method === 'put') {
                  return { type: ENTITY_UPDATE_PUT, payload: message.message.value };
                }
                if (message.message && message.message.method === 'delete') {
                  return { type: ENTITY_UPDATE_DELETE, id: message.message.value.Id };
                }
                return {};
              }));
            });
          }).retryWhen(function (errors) {
            return errors.delay(signalRRetry);
          });
        });
      }).retryWhen(function (errors) {
        return errors.delay(signalRRetry);
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
  var load = function load() {
    var loadConfig = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    return function (_ref4) {
      var signalR = _ref4.signalR;
      var apiClient = _ref4.apiClient;

      var _loadConfig = (0, _extends28.default)({}, loadConfig, {
        isDeleted: loadConfig.isDeleted && loadConfig.isDeleted != 'false'
      });
      var loadDefaults = getLoadDefaults(_loadConfig);
      return function (actions, _ref5) {
        var getState = _ref5.getState;

        if (getLoadHasChanged({ loadDefaults: loadDefaults, getState: getState })) {
          return join(_loadConfig)({ signalR: signalR, apiClient: apiClient }).switchMap(function (changes) {
            var observedMessages = replayer(changes);
            var path = getLoadPath(loadDefaults);
            return apiClient.get(path).map(function (result) {
              return result.result ? {
                type: ENTITIES_LOAD_SUCCESS,
                payload: result.result
              } : {
                type: ENTITIES_LOAD_PROGRESS,
                payload: result.progress
              };
            }).concat(observedMessages).catch(function (error) {
              return Rx.Observable.of({
                type: ENTITIES_LOAD_FAIL,
                payload: error
              });
            });
          }).startWith({
            type: ENTITIES_LOAD,
            payload: loadDefaults
          }).takeUntil(Rx.Observable.empty().delay(0).concat(actions.ofType(ENTITIES_LOAD)));
        } else {
          return Rx.Observable.empty();
        }
      };
    };
  };

  var loadErrorCancel = function loadErrorCancel() {
    return { type: ENTITIES_LOAD_FAIL_CANCEL };
  };

  var loadMore = function loadMore(loadConfig) {
    console.log('load more', loadConfig);
    return function (_ref6) {
      var apiClient = _ref6.apiClient;
      return function (actions, _ref7) {
        var getState = _ref7.getState;
        return apiClient.get(getLoadPath(getLoadDefaults(loadConfig))).map(function (result) {
          return result.result ? {
            type: ENTITIES_LOAD_MORE_SUCCESS,
            payload: result.result
          } : {
            type: ENTITIES_LOAD_MORE_PROGRESS,
            payload: result.progress
          };
        }).catch(function (error) {
          return Rx.Observable.of({
            type: ENTITIES_LOAD_MORE_FAIL,
            payload: error
          });
        }).startWith({
          type: ENTITIES_LOAD_MORE
        });
      };
    };
  };

  var loadSingle = function loadSingle(id) {
    return function (_ref8) {
      var signalR = _ref8.signalR;
      var apiClient = _ref8.apiClient;
      return function (actions, _ref9) {
        var getState = _ref9.getState;
        var dispatch = _ref9.dispatch;

        if (getLoadSingleHasChanged({ id: id, getState: getState })) {
          return joinSingle(id)({ signalR: signalR, apiClient: apiClient }).flatMap(function (changes) {
            return apiClient.get(getSinglePath(id)).map(function (result) {
              return result.result ? {
                type: ENTITY_LOAD_SUCCESS,
                payload: result.result
              } : {
                type: ENTITY_LOAD_PROGRESS,
                payload: {
                  id: id,
                  progress: result.progress
                }
              };
            }).concat(replayer(changes)).catch(function (error) {
              return Rx.Observable.of({ type: ENTITY_LOAD_FAIL, payload: error });
            });
          }).startWith({ type: ENTITY_LOAD, payload: id })
          // miss a beat to allow for route changes...
          .takeUntil(Rx.Observable.empty().delay(0).concat(actions.ofType(ENTITY_LOAD)));
        } else {
          return Rx.Observable.empty();
        }
      };
    };
  };
  var singleLoadErrorCancel = function singleLoadErrorCancel() {
    return { type: ENTITY_LOAD_FAIL_CANCEL };
  };

  var add = function add(_ref10) {
    var parentId = _ref10.parentId;
    var _ref10$id = _ref10.id;
    var id = _ref10$id === undefined ? 'add' : _ref10$id;
    return {
      type: ENTITIES_ADD,
      parentId: parentId,
      id: id
    };
  };
  function editStart(id) {
    return { type: ENTITIES_EDIT_START, id: id };
  }

  function editStop(id) {
    return { type: ENTITIES_EDIT_STOP, id: id };
  }
  var saveErrorCancel = function saveErrorCancel(id) {
    return {
      type: ENTITIES_SAVE_FAIL_CANCEL,
      id: id
    };
  };
  var uploadErrorCancel = function uploadErrorCancel(id, uploadType) {
    return {
      type: ENTITIES_UPLOAD_FAIL_CANCEL,
      payload: {
        id: id,
        uploadType: uploadType
      }
    };
  };

  var save = function save(_ref11) {
    var oldValues = _ref11.oldValues;
    var values = _ref11.values;
    var files = _ref11.files;
    var keepEditing = _ref11.keepEditing;
    return function (_ref12) {
      var apiClient = _ref12.apiClient;

      if (!values.isNew) {
        var _ret = function () {
          var putPath = getPutPath(values);
          return {
            v: function v(actions, _ref13) {
              var getState = _ref13.getState;
              return apiClient.put(putPath, {
                data: values
              }, files).flatMap(function (result) {
                return Rx.Observable.from(result.result ? [{
                  type: ENTITIES_SAVE_SUCCESS,
                  id: values.Id,
                  keepEditing: keepEditing
                }, {
                  type: ENTITY_UPDATE_PUT,
                  payload: result.result
                }, {
                  type: ENTITIES_UPDATE_PUT,
                  payload: {
                    method: 'put',
                    oldValue: oldValues,
                    value: result.result
                  }
                }] : [{
                  type: ENTITIES_SAVE_PROGRESS,
                  payload: {
                    id: values.Id,
                    progress: result.progress
                  }
                }]);
              }).catch(function (error) {
                return Rx.Observable.of({
                  type: ENTITIES_SAVE_FAIL,
                  id: values.Id,
                  error: error
                });
              }).startWith({ type: ENTITIES_SAVE, values: values });
            }
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
      } else {
        var _ret2 = function () {
          var postPath = getPostPath(values);
          return {
            v: function v(actions, _ref14) {
              var getState = _ref14.getState;
              return apiClient.post(postPath, {
                data: postConvert(values)
              }, files).flatMap(function (result) {
                return Rx.Observable.from(result.result ? [{
                  type: ENTITIES_ADD_SUCCESS,
                  id: values.Id
                }, {
                  type: ENTITIES_UPDATE_POST,
                  payload: {
                    method: 'post',
                    value: result.result
                  }
                }] : [{
                  type: ENTITIES_SAVE_PROGRESS,
                  payload: {
                    id: values.Id,
                    progress: result.progress
                  }
                }]);
              }).catch(function (error) {
                return Rx.Observable.of({
                  type: ENTITIES_SAVE_FAIL,
                  id: values.Id,
                  error: error
                });
              }).startWith({ type: ENTITIES_SAVE, values: values });
            }
          };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret2)) === "object") return _ret2.v;
      }
    };
  };

  var upload = function upload(_ref15) {
    var _ref15$uploadType = _ref15.uploadType;
    var uploadType = _ref15$uploadType === undefined ? 'default' : _ref15$uploadType;
    var values = _ref15.values;
    var files = _ref15.files;
    return function (_ref16) {
      var apiClient = _ref16.apiClient;

      if (!values.isNew) {
        var _ret3 = function () {
          var putPath = getUploadPutPath(values, uploadType);
          return {
            v: function v(actions, _ref17) {
              var getState = _ref17.getState;
              return apiClient.put(putPath, {
                data: values
              }, files).flatMap(function (result) {
                return Rx.Observable.of(result.result ? {
                  type: ENTITIES_UPLOAD_SUCCESS,
                  payload: {
                    uploadType: uploadType,
                    values: values
                  }
                } : {
                  type: ENTITIES_UPLOAD_PROGRESS,
                  payload: {
                    values: values,
                    uploadType: uploadType,
                    files: files,
                    progress: result.progress
                  }
                });
              }).catch(function (error) {
                return Rx.Observable.of({
                  type: ENTITIES_UPLOAD_FAIL,
                  payload: {
                    values: values,
                    uploadType: uploadType,
                    error: error,
                    files: files
                  }
                });
              }).startWith({
                type: ENTITIES_UPLOAD,
                payload: {
                  uploadType: uploadType,
                  values: values,
                  files: files
                }
              });
            }
          };
        }();

        if ((typeof _ret3 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret3)) === "object") return _ret3.v;
      } else {
        var _ret4 = function () {
          var postPath = getUploadPostPath(values, uploadType);
          return {
            v: function v(actions, _ref18) {
              var getState = _ref18.getState;
              return apiClient.post(postPath, {
                data: postConvert((0, _extends28.default)({}, values, { Id: 0 }))
              }, files).flatMap(function (result) {
                return Rx.Observable.of(result.result ? {
                  type: ENTITIES_UPLOAD_SUCCESS,
                  payload: {
                    uploadType: uploadType,
                    values: values,
                    files: files
                  }
                } : {
                  type: ENTITIES_UPLOAD_PROGRESS,
                  payload: {
                    uploadType: uploadType,
                    values: values,
                    progress: result.progress,
                    files: files
                  }
                });
              }).catch(function (error) {
                return Rx.Observable.of({
                  type: ENTITIES_UPLOAD_FAIL,
                  payload: {
                    uploadType: uploadType,
                    values: values,
                    error: error,
                    files: files
                  }
                });
              }).startWith({
                type: ENTITIES_UPLOAD,
                payload: {
                  uploadType: uploadType,
                  values: values,
                  files: files
                }
              });
            }
          };
        }();

        if ((typeof _ret4 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret4)) === "object") return _ret4.v;
      }
    };
  };

  var remove = function remove(values) {
    return function (_ref19) {
      var apiClient = _ref19.apiClient;

      var deletePath = getDeletePath(values);
      return function (actions, _ref20) {
        var getState = _ref20.getState;
        return apiClient.del(deletePath).flatMap(function (result) {
          return Rx.Observable.from(result.result ? [{
            type: ENTITIES_DELETE_SUCCESS,
            id: values.Id
          }, {
            type: ENTITY_UPDATE_PUT,
            payload: result.result
          }, {
            type: ENTITIES_UPDATE_PUT,
            payload: {
              method: 'put',
              oldValue: values,
              value: result.result
            }
          }] : [{
            type: ENTITIES_SAVE_PROGRESS,
            payload: {
              id: values.Id,
              progress: result.progress
            }
          }]);
        }).catch(function (error) {
          return Rx.Observable.of({
            type: ENTITIES_SAVE_FAIL,
            id: values.Id,
            error: error
          });
        }).startWith({
          type: ENTITIES_DELETE,
          id: values.Id
        });
      };
    };
  };

  // orders and filters data according to state
  var orderData = function orderData(values, state) {
    if (state.loadOrder) {
      var _ret5 = function () {
        var back = state.loadOrder[0] === '-';
        var field = back ? state.loadOrder.substring(1) : state.loadOrder;
        var deleted = state.loadDeleted;
        var ret = values.map(function (value) {
          return value;
        }).filter(function (value) {
          return dontDoDelete() || value.IsDeleted && deleted || !value.IsDeleted && !deleted;
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

      if ((typeof _ret5 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret5)) === "object") return _ret5.v;
    } else {
      return values;
    }
  };
  // ------------------------------------
  // Action Handlers
  // ------------------------------------
  var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_LOAD, function (state, action) {
    return (0, _extends28.default)({}, state, {
      data: null,
      loadInitial: null,
      error: null,
      loading: true,
      loadOrder: action.payload.order || 'Name',
      loadDeleted: action.payload.isDeleted || false,
      loadDefaults: action.payload
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_LOAD_SUCCESS, function (state, action) {
    return (0, _extends28.default)({}, state, {
      data: action.payload,
      loading: false,
      loadingProgress: null
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_LOAD_FAIL, function (state, action) {
    return (0, _extends28.default)({}, state, {
      error: action.payload,
      loading: false,
      loadingProgress: null
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_LOAD_PROGRESS, function (state, action) {
    return (0, _extends28.default)({}, state, {
      loadingProgress: action.payload
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_LOAD_FAIL_CANCEL, function (state, action) {
    return (0, _extends28.default)({}, state, {
      error: null,
      loadDefaults: null
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_LOAD_MORE, function (state, action) {
    return (0, _extends28.default)({}, state, {
      error: null,
      loadingMore: true
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_LOAD_MORE_PROGRESS, function (state, action) {
    return (0, _extends28.default)({}, state, {
      error: null,
      loadingMoreProgress: action.payload
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_LOAD_MORE_SUCCESS, function (state, action) {
    return (0, _extends28.default)({}, state, {
      data: (0, _extends28.default)({}, state.data, { Values: state.data.Values.concat(action.payload.Values) }),
      loadingMore: false,
      loadingMoreProgress: null
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_LOAD_MORE_FAIL, function (state, action) {
    return (0, _extends28.default)({}, state, {
      error: action.payload,
      loadingMore: false,
      loadingMoreProgress: null
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITY_LOAD, function (state, action) {
    return (0, _extends28.default)({}, state, {
      singleError: null,
      singleLoading: true,
      singleLoad: action.payload,
      singleData: null
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITY_LOAD_SUCCESS, function (state, action) {
    return (0, _extends28.default)({}, state, {
      singleData: action.payload,
      singleLoading: false
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITY_LOAD_FAIL, function (state, action) {
    return (0, _extends28.default)({}, state, {
      singleError: action.payload,
      singleLoading: false
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITY_LOAD_FAIL_CANCEL, function (state, action) {
    return (0, _extends28.default)({}, state, {
      singleError: null,
      singleLoad: null
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_EDIT_START, function (state, action) {
    return (0, _extends28.default)({}, state, {
      editing: (0, _extends28.default)({}, state.editing, (0, _defineProperty3.default)({}, action.id, true))
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_EDIT_STOP, function (state, action) {
    return (0, _extends28.default)({}, state, {
      data: (0, _extends28.default)({}, state.data, {
        Values: state.data && state.data.Values ? state.data.Values.filter(function (value) {
          return !value.isNew || value.Id != action.id;
        }) : []
      }),
      editing: (0, _extends28.default)({}, state.editing, (0, _defineProperty3.default)({}, action.id, false))
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_SAVE, function (state, action) {
    return (0, _extends28.default)({}, state, {
      saveError: (0, _extends28.default)({}, state.saveError, (0, _defineProperty3.default)({}, action.values.Id, null)),
      saving: (0, _extends28.default)({}, state.saving, (0, _defineProperty3.default)({}, action.values.Id, action.values))
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_SAVE_PROGRESS, function (state, action) {
    return (0, _extends28.default)({}, state, {
      saveProgress: (0, _extends28.default)({}, state.saveProgress, (0, _defineProperty3.default)({}, action.payload.id, action.payload.progress))
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_SAVE_SUCCESS, function (state, action) {
    return (0, _extends28.default)({}, state, {
      editing: (0, _extends28.default)({}, state.editing, (0, _defineProperty3.default)({}, action.id, action.keepEditing ? state.editing[action.id] : false)),
      saveProgress: (0, _extends28.default)({}, state.saveProgress, (0, _defineProperty3.default)({}, action.id, null)),
      saving: (0, _extends28.default)({}, state.saving, (0, _defineProperty3.default)({}, action.id, false))
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_SAVE_FAIL, function (state, action) {
    return (0, _extends28.default)({}, state, {
      saving: (0, _extends28.default)({}, state.saving, (0, _defineProperty3.default)({}, action.id, false)),
      saveProgress: (0, _extends28.default)({}, state.saveProgress, (0, _defineProperty3.default)({}, action.id, null)),
      saveError: (0, _extends28.default)({}, state.saveError, (0, _defineProperty3.default)({}, action.id, action.error))
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_SAVE_FAIL_CANCEL, function (state, action) {
    return (0, _extends28.default)({}, state, {
      saveError: (0, _extends28.default)({}, state.saveError, (0, _defineProperty3.default)({}, action.id, null))
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_UPDATE_PUT, function (state, action) {
    var prevIn = filter(state.loadDefaults, action.payload.oldValue);
    var newIn = filter(state.loadDefaults, action.payload.value);
    //total count changes with deletion
    var totalCountChange = prevIn & !newIn ? -1 : newIn && !prevIn ? 1 : 0;
    if (state.data && state.data.Values) {
      if (newIn) {
        var found = state.data.Values.find(function (state) {
          return state.Id === action.payload.value.Id;
        });
        var replace = (0, _extends28.default)({}, found, action.payload.value);
        if (state.data.Values.indexOf(found) > -1) {
          state.data.Values.splice(state.data.Values.indexOf(found), 1, replace);
        } else {
          state.data.Values.push(replace);
        }
      } else {
        state.data.Values = state.data.Values.filter(function (state) {
          return state.Id !== action.payload.value.Id;
        });
      }
    }
    return (0, _extends28.default)({}, state, {
      singleData: state.singleData && action.payload.value.Id === state.singleData.Id ? action.payload.value : state.singleData,
      data: (0, _extends28.default)({}, state.data, {
        TotalCount: state.data && state.data.TotalCount + totalCountChange,
        Values: state.data && state.data.Values ? orderData(state.data.Values, state) : []
      })
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_UPDATE_POST, function (state, action) {

    var found = state.data.Values.find(function (state) {
      return state.Id === action.payload.value.Id;
    });
    var deleted = state.loadDeleted;
    var totalCountChange = !deleted && !found ? 1 : 0;
    if (found) {
      var replace = (0, _extends28.default)({}, action.payload.value);
      state.data.Values.splice(state.data.Values.indexOf(found), 1, replace);
    } else {
      state.data.Values.push(action.payload.value);
    }
    return (0, _extends28.default)({}, state, {
      data: (0, _extends28.default)({}, state.data, {
        TotalCount: state.data && state.data.TotalCount + totalCountChange,
        Values: orderData(state.data.Values, state)
      })
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_UPDATE_DELETE, function (state, action) {
    return (0, _extends28.default)({}, state, {
      data: (0, _extends28.default)({}, state.data, {
        TotalCount: state.data.TotalCount - 1,
        Values: state.data.Values.filter(function (state) {
          return state.Id !== action.payload.value.Id;
        })
      })
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITY_UPDATE_PUT, function (state, action) {
    if (state.singleData && state.singleData.Id == action.payload.Id) {
      return (0, _extends28.default)({}, state, {
        singleData: (0, _extends28.default)({}, state.singleData, action.payload)
      });
    }
    return state;
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITY_UPDATE_DELETE, function (state, action) {
    if (state.singleData && action.id === state.singleData.Id) {
      return (0, _extends28.default)({}, state, {
        singleData: null
      });
    }
    return state;
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_DELETE_SUCCESS, function (state, action) {
    return (0, _extends28.default)({}, state, {
      deleting: (0, _extends28.default)({}, state.deleting, (0, _defineProperty3.default)({}, action.id, false)),
      saveProgress: (0, _defineProperty3.default)({}, action.id, null),
      data: (0, _extends28.default)({}, state.data, {
        Values: state.data.Values.filter(function (state) {
          return state.Id !== action.id;
        })
      })
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_ADD, function (state, action) {
    return (0, _extends28.default)({}, state, {
      editing: (0, _extends28.default)({}, state.editing, (0, _defineProperty3.default)({}, action.id, true)),
      data: (0, _extends28.default)({}, state.data, {
        Values: [(0, _extends28.default)({
          Id: action.id,
          ParentId: action.parentId,
          isNew: true,
          Name: ''
        }, getNew(action))].concat(state.data.Values)
      })
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_ADD_SUCCESS, function (state, action) {
    return (0, _extends28.default)({}, state, {
      data: (0, _extends28.default)({}, state.data, {
        Values: state.data.Values.filter(function (group) {
          return group.Id !== 'add';
        }) }),
      saving: (0, _extends28.default)({}, state.saving, (0, _defineProperty3.default)({}, action.id, false)),
      saveProgress: (0, _defineProperty3.default)({}, action.id, null),
      editing: (0, _extends28.default)({}, state.editing, (0, _defineProperty3.default)({}, action.id, false))
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_DELETE, function (state, action) {
    return (0, _extends28.default)({}, state, {
      deleting: (0, _extends28.default)({}, state.deleting, (0, _defineProperty3.default)({}, action.id, true))
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_UPLOAD, function (state, action) {
    return (0, _extends28.default)({}, state, {
      uploading: (0, _extends28.default)({}, state.uploading, (0, _defineProperty3.default)({}, action.payload.values.Id, (0, _extends28.default)({}, state.uploading && state.uploading[action.payload.values.Id], (0, _defineProperty3.default)({}, action.payload.uploadType, action.payload))))
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_UPLOAD_PROGRESS, function (state, action) {
    return (0, _extends28.default)({}, state, {
      uploading: (0, _extends28.default)({}, state.uploading, (0, _defineProperty3.default)({}, action.payload.values.Id, (0, _extends28.default)({}, state.uploading && state.uploading[action.payload.values.Id], (0, _defineProperty3.default)({}, action.payload.uploadType, action.payload))))
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_UPLOAD_SUCCESS, function (state, action) {
    return (0, _extends28.default)({}, state, nullIfNone(state, action.payload.values.Id, 'uploading', action.payload.uploadType));
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_UPLOAD_FAIL, function (state, action) {
    return (0, _extends28.default)({}, state, {
      uploading: (0, _extends28.default)({}, state.uploading, (0, _defineProperty3.default)({}, action.payload.values.Id, (0, _extends28.default)({}, state.uploading && state.uploading[action.payload.values.Id], (0, _defineProperty3.default)({}, action.payload.uploadType, action.payload))))
    });
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, ENTITIES_UPLOAD_FAIL_CANCEL, function (state, action) {
    return (0, _extends28.default)({}, state, nullIfNone(state, action.payload.id, 'uploading', action.payload.uploadType));
  }), (0, _defineProperty3.default)(_ACTION_HANDLERS, APP_INITIALISE, function (state, action) {
    return (0, _extends28.default)({}, initialState);
  }), _ACTION_HANDLERS);

  var nullIfNone = function nullIfNone(state, id, fieldName, subFieldName) {
    return (0, _defineProperty3.default)({}, fieldName, (0, _extends28.default)({}, state[fieldName], (0, _defineProperty3.default)({}, id, null), state[fieldName] && state[fieldName][id] && ((0, _keys2.default)(state[fieldName][id]).length > 1 || !state[fieldName][id][subFieldName]) && (0, _defineProperty3.default)({}, id, (0, _extends28.default)({}, state[fieldName] && state[fieldName][id], (0, _defineProperty3.default)({}, subFieldName, null)))));
  };

  // ------------------------------------
  // Reducer
  // ------------------------------------
  var initialState = { loadOrder: 'Name', loadDeleted: false, loadInitial: true };
  function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    var handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
  }

  return {
    constants: {
      ENTITIES_UPDATE_PUT: ENTITIES_UPDATE_PUT,
      ENTITIES_UPDATE_POST: ENTITIES_UPDATE_POST,
      ENTITIES_UPDATE_DELETE: ENTITIES_UPDATE_DELETE,

      ENTITIES_LOAD: ENTITIES_LOAD,
      ENTITIES_LOAD_PROGRESS: ENTITIES_LOAD_PROGRESS,
      ENTITIES_LOAD_SUCCESS: ENTITIES_LOAD_SUCCESS,
      ENTITIES_LOAD_FAIL: ENTITIES_LOAD_FAIL,
      ENTITIES_LOAD_FAIL_CANCEL: ENTITIES_LOAD_FAIL_CANCEL,

      ENTITIES_LOAD_MORE: ENTITIES_LOAD_MORE,
      ENTITIES_LOAD_MORE_PROGRESS: ENTITIES_LOAD_MORE_PROGRESS,
      ENTITIES_LOAD_MORE_SUCCESS: ENTITIES_LOAD_MORE_SUCCESS,
      ENTITIES_LOAD_MORE_FAIL: ENTITIES_LOAD_MORE_FAIL,

      ENTITY_UPDATE_PUT: ENTITY_UPDATE_PUT,
      ENTITY_UPDATE_DELETE: ENTITY_UPDATE_DELETE,

      ENTITY_LOAD: ENTITY_LOAD,
      ENTITY_LOAD_PROGRESS: ENTITY_LOAD_PROGRESS,
      ENTITY_LOAD_SUCCESS: ENTITY_LOAD_SUCCESS,
      ENTITY_LOAD_FAIL: ENTITY_LOAD_FAIL,
      ENTITY_LOAD_FAIL_CANCEL: ENTITY_LOAD_FAIL_CANCEL,

      ENTITIES_INIT: ENTITIES_INIT,

      ENTITIES_EDIT_START: ENTITIES_EDIT_START,
      ENTITIES_EDIT_STOP: ENTITIES_EDIT_STOP,

      ENTITIES_SAVE: ENTITIES_SAVE,
      ENTITIES_SAVE_PROGRESS: ENTITIES_SAVE_PROGRESS,
      ENTITIES_SAVE_SUCCESS: ENTITIES_SAVE_SUCCESS,
      ENTITIES_SAVE_FAIL: ENTITIES_SAVE_FAIL,
      ENTITIES_SAVE_FAIL_CANCEL: ENTITIES_SAVE_FAIL_CANCEL,

      ENTITIES_UPLOAD: ENTITIES_UPLOAD,
      ENTITIES_UPLOAD_PROGRESS: ENTITIES_UPLOAD_PROGRESS,
      ENTITIES_UPLOAD_SUCCESS: ENTITIES_UPLOAD_SUCCESS,
      ENTITIES_UPLOAD_FAIL: ENTITIES_UPLOAD_FAIL,
      ENTITIES_UPLOAD_FAIL_CANCEL: ENTITIES_UPLOAD_FAIL_CANCEL,

      ENTITIES_ADD: ENTITIES_ADD,
      ENTITIES_ADD_SUCCESS: ENTITIES_ADD_SUCCESS,

      ENTITIES_DELETE: ENTITIES_DELETE,
      ENTITIES_DELETE_SUCCESS: ENTITIES_DELETE_SUCCESS
    },
    actions: {
      load: load,
      loadErrorCancel: loadErrorCancel,
      loadMore: loadMore,
      loadSingle: loadSingle,
      singleLoadErrorCancel: singleLoadErrorCancel,
      add: add,
      editStart: editStart,
      editStop: editStop,
      save: save,
      saveErrorCancel: saveErrorCancel,
      uploadErrorCancel: uploadErrorCancel,
      remove: remove,
      upload: upload
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