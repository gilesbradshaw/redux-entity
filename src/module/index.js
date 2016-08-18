import * as Rx from 'rxjs'

// ------------------------------------
// Constants
// ------------------------------------
const getModule = ({
  name, 
  getJoinId, 
  getJoinSingleId, 
  getLoadPath, 
  getLoadDefaults,
  getLoadHasChanged = ()=>true, 
  getLoadSingleHasChanged = ()=>true, 
  getSinglePath, 
  getPostPath,
  getUploadPostPath,
  getPutPath,
  getUploadPutPath,
  getDeletePath,
  postConvert,
  signalRRetry=10000
}) => {
  const ENTITIES_UPDATE_PUT = 'react-dealerweb/ENTITIES_UPDATE_PUT:' + name
  const ENTITIES_UPDATE_POST = 'react-dealerweb/ENTITIES_UPDATE_POST:' + name
  const ENTITIES_UPDATE_DELETE = 'react-dealerweb/ENTITIES_UPDATE_DELETE:' + name

  const ENTITIES_LOAD = 'react-dealerweb/ENTITIES_LOAD:' + name
  const ENTITIES_LOAD_PROGRESS = 'react-dealerweb/ENTITIES_LOAD_PROGRESS:' + name
  const ENTITIES_LOAD_SUCCESS = 'react-dealerweb/ENTITIES_LOAD_SUCCESS:' + name
  const ENTITIES_LOAD_FAIL = 'react-dealerweb/ENTITIES_LOAD_FAIL:' + name
  const ENTITIES_LOAD_FAIL_CANCEL = 'react-dealerweb/ENTITIES_LOAD_FAIL_CANCEL:' + name

  const ENTITIES_LOAD_MORE = 'react-dealerweb/ENTITIES_LOAD_MORE:' + name
  const ENTITIES_LOAD_MORE_PROGRESS = 'react-dealerweb/ENTITIES_LOAD_MORE_PROGRESS:' + name
  const ENTITIES_LOAD_MORE_SUCCESS = 'react-dealerweb/ENTITIES_LOAD_MORE_SUCCESS:' + name
  const ENTITIES_LOAD_MORE_FAIL = 'react-dealerweb/ENTITIES_LOAD_MORE_FAIL:' + name

  const ENTITY_UPDATE_PUT = 'react-dealerweb/ENTITY_UPDATE_PUT:' + name
  const ENTITY_UPDATE_DELETE = 'react-dealerweb/ENTITY_UPDATE_DELETE:' + name

  const ENTITY_LOAD = 'react-dealerweb/ENTITY_LOAD:' + name
  const ENTITY_LOAD_PROGRESS = 'react-dealerweb/ENTITY_LOAD_PROGRESS:' + name
  const ENTITY_LOAD_SUCCESS = 'react-dealerweb/ENTITY_LOAD_SUCCESS:' + name
  const ENTITY_LOAD_FAIL = 'react-dealerweb/ENTITY_LOAD_FAIL:' + name
  const ENTITY_LOAD_FAIL_CANCEL = 'react-dealerweb/ENTITY_LOAD_FAIL_CANCEL:' + name
  

  const ENTITIES_INIT = 'react-dealerweb/ENTITIES_INIT:' + name

  const ENTITIES_EDIT_START = 'react-dealerweb/ENTITIES_EDIT_START:' + name
  const ENTITIES_EDIT_STOP = 'react-dealerweb/ENTITIES_EDIT_STOP:' + name

  const ENTITIES_SAVE = 'react-dealerweb/ENTITIES_SAVE:' + name
  const ENTITIES_SAVE_PROGRESS = 'react-dealerweb/ENTITIES_SAVE_PROGRESS:' + name
  const ENTITIES_SAVE_SUCCESS = 'react-dealerweb/ENTITIES_SAVE_SUCCESS:' + name
  const ENTITIES_SAVE_FAIL = 'react-dealerweb/ENTITIES_SAVE_FAIL:' + name
  const ENTITIES_SAVE_FAIL_CANCEL = 'react-dealerweb/ENTITIES_SAVE_FAIL_CANCEL:' + name


  const ENTITIES_UPLOAD = 'react-dealerweb/ENTITIES_UPLOAD:' + name
  const ENTITIES_UPLOAD_PROGRESS = 'react-dealerweb/ENTITIES_UPLOAD_PROGRESS:' + name
  const ENTITIES_UPLOAD_SUCCESS = 'react-dealerweb/ENTITIES_UPLOAD_SUCCESS:' + name
  const ENTITIES_UPLOAD_FAIL = 'react-dealerweb/ENTITIES_UPLOAD_FAIL:' + name
  const ENTITIES_UPLOAD_FAIL_CANCEL = 'react-dealerweb/ENTITIES_UPLOAD_FAIL_CANCEL:' + name


  const ENTITIES_ADD = 'react-dealerweb/ENTITIES_ADD:' + name
  const ENTITIES_ADD_SUCCESS = 'react-dealerweb/ENTITIES_ADD_SUCCESS:' + name

  const ENTITIES_DELETE = 'react-dealerweb/ENTITIES_DELETE:' + name
  const ENTITIES_DELETE_SUCCESS = 'react-dealerweb/ENTITIES_DELETE_SUCCESS:' + name
  


  const join = (joinConfig = {}) => ({signalR, apiClient}) =>
    Rx.Observable.of(1).switchMap(x=> 
      signalR()
        .switchMap(subscriber => 
          Rx.Observable.of(1).switchMap(x=> 
            subscriber.join(getJoinId(joinConfig)).switchMap(messages => 
              Rx.Observable.of(messages.map(message => {
                if (message.message && message.message.method === 'put') {
                  return {type: ENTITIES_UPDATE_PUT, payload: message.message.value}
                }
                if (message.message && message.message.method === 'post') {
                  return {type: ENTITIES_UPDATE_POST, payload: message.message.value}
                }
                if (message.message && message.message.method === 'delete') {
                  return {type: ENTITIES_UPDATE_DELETE, id: message.message.id}
                }
                return {}
              }))
            )
          ).retryWhen(errors=>errors.delay(signalRRetry))
      )
    ).retryWhen(errors=>errors.delay(signalRRetry))

  const joinSingle = (id) => ({signalR, apiClient}) => 
    Rx.Observable.of(1).switchMap(x=>
      signalR()
        .flatMap(subscriber => 
          Rx.Observable.of(1).flatMap(x=>
            subscriber.join(getJoinSingleId(id)).flatMap(messages=>
              Rx.Observable.of(messages.map(message=>{
                if(message.message && message.message.method==='put'){
                  return {type: ENTITY_UPDATE_PUT, payload: message.message.value}
                }
                if(message.message && message.message.method==='delete'){
                  return {type: ENTITY_UPDATE_DELETE, id: message.message.id}
                }
                return {}
              }))
            )
          ).retryWhen(errors=>errors.delay(signalRRetry))
      )  
    ).retryWhen(errors=>errors.delay(signalRRetry))


  // ------------------------------------
  // Actions
  // -----------------------------
  const replayer = (changes) => {
    const subject = new Rx.ReplaySubject(100 /* buffer size */)
    const subscription = changes.subscribe(x => {
      subject.next(x)
    })
    return Rx.Observable.create(obs => {
      subject.subscribe(x=> obs.next(x))
      return () => subscription.unsubscribe()
    })
  }
  const load = (loadConfig={}) => 
    ({signalR, apiClient}) => {
      const _loadConfig={
        ...loadConfig, 
        isDeleted: loadConfig.isDeleted && loadConfig.isDeleted!='false'
      }
      const loadDefaults = getLoadDefaults(_loadConfig)
      return (actions, {getState}) => {
        if(getLoadHasChanged({loadDefaults, getState})) {
          return join(_loadConfig)({signalR, apiClient})
            .switchMap(changes => {
              const observedMessages = replayer(changes)
              const path = getLoadPath(loadDefaults)
              return apiClient.get(path)
                .map(result => (
                  result.result 
                  ? {
                      type: ENTITIES_LOAD_SUCCESS, 
                      payload: result.result
                    }
                  : {
                      type: ENTITIES_LOAD_PROGRESS, 
                      payload: result.progress
                    }
                ))
                .concat(observedMessages)
                .catch(error => Rx.Observable.of({
                  type: ENTITIES_LOAD_FAIL, 
                  payload: error
                }))
            })
            .startWith({
              type: ENTITIES_LOAD, 
              payload: loadDefaults
            })
            .takeUntil(
              Rx.Observable
                .empty()
                .delay(0)
                .concat(
                  actions.ofType(ENTITIES_LOAD)
                )
            )
        } else {
          return Rx.Observable.empty()
        }
      }
    }

  const loadErrorCancel = () => ({ type: ENTITIES_LOAD_FAIL_CANCEL})
  
  const loadMore = (loadConfig) => 
    {
    return ({apiClient}) =>   
      (actions, {getState}) => 
        apiClient.get(getLoadPath(getLoadDefaults(loadConfig)))
          .map(result => (
            result.result
            ? {
              type: ENTITIES_LOAD_MORE_SUCCESS, 
              payload: result.result
            }
            : {
                type: ENTITIES_LOAD_MORE_PROGRESS, 
                payload: result.progress
              }
          ))
          .catch(error => Rx.Observable.of({
            type: ENTITIES_LOAD_MORE_FAIL, 
            payload: error
          }))
          .startWith({
            type: ENTITIES_LOAD_MORE
          })            
    }

  const loadSingle = (id) => ({signalR, apiClient}) => 
    (actions, {getState, dispatch}) => {
      if(getLoadSingleHasChanged({id, getState})) {
        return joinSingle(id)({signalR, apiClient})
          .flatMap(changes => 
            apiClient.get(getSinglePath(id))
              .map(result => (
                result.result
                ? {
                  type: ENTITY_LOAD_SUCCESS, 
                  payload: result.result
                }
                : {
                  type: ENTITY_LOAD_PROGRESS, 
                  payload: {
                    id,
                    progress: result.progress
                  }                  
                }
              ))
              .concat(replayer(changes))
              .catch(error => Rx.Observable.of({type: ENTITY_LOAD_FAIL, payload: error}))
          )
          .startWith({type: ENTITY_LOAD, payload: id})
          // miss a beat to allow for route changes...
          .takeUntil(
            Rx.Observable
              .empty()
              .delay(0)
              .concat(
                actions.ofType(ENTITY_LOAD)
              )
          )
      } else {
        return Rx.Observable.empty()
      }
    } 
  const singleLoadErrorCancel = () => ({ type: ENTITY_LOAD_FAIL_CANCEL})

  const add = ({parentId, id= 'add'}) => ({ 
    type: ENTITIES_ADD, 
    parentId: parentId,
    id
  })
  function editStart(id) {
    return { type: ENTITIES_EDIT_START, id }
  }

  function editStop(id) {
    return { type: ENTITIES_EDIT_STOP, id }
  }
  const saveErrorCancel = (id) => ({ 
    type: ENTITIES_SAVE_FAIL_CANCEL, 
    id 
  })
  const uploadErrorCancel = (id, uploadType) => ({ 
    type: ENTITIES_UPLOAD_FAIL_CANCEL, 
    payload: {
      id,
      uploadType
    } 
  })
  
  const save = ({
    values, 
    files, 
    keepEditing
  })=> ({apiClient}) => {
    if(!values.isNew) {
       const putPath = getPutPath(values)
      return (actions, {getState}) =>
        apiClient.put(putPath, {
            data: values
          }, files)
        .flatMap(result=>Rx.Observable.of(
          result.result
          ? {
            type: ENTITIES_SAVE_SUCCESS, 
            id: values.Id, 
            keepEditing
          }
          : {
            type: ENTITIES_SAVE_PROGRESS, 
            payload: {
              id: values.Id, 
              progress: result.progress
            }
          }
        ))
        .catch(error => Rx.Observable.of({
          type: ENTITIES_SAVE_FAIL, 
          id: values.Id, 
          error: error
        }))  
        .startWith({type: ENTITIES_SAVE, values})
    } else {
      const postPath = getPostPath(values)
      return (actions, {getState}) =>
        apiClient.post(postPath , {
            data: postConvert(values)
          }, files)
        .flatMap(result=>Rx.Observable.of(
          result.result
          ? {
            type: ENTITIES_ADD_SUCCESS,
            id: values.Id
          }
          : {
            type: ENTITIES_SAVE_PROGRESS, 
            payload: {
              id: values.Id, 
              progress: result.progress
            }
          }
        ))
        .catch(error => Rx.Observable.of({
          type: ENTITIES_SAVE_FAIL, 
          id: values.Id, 
          error: error
        }))
        .startWith({type: ENTITIES_SAVE, values})
    }
  }


const upload = ({
    uploadType='default',
    values, 
    files
  })=> ({apiClient}) => {
    if(!values.isNew) {
      const putPath = getUploadPutPath(values, uploadType)
      return (actions, {getState}) =>
        apiClient.put(putPath, {
            data: values
          }, files)
        .flatMap(result=>Rx.Observable.of(
          result.result
          ? {
            type: ENTITIES_UPLOAD_SUCCESS,
            payload: {
              uploadType,
              values
            } 
          }
          : {
            type: ENTITIES_UPLOAD_PROGRESS, 
            payload: {
              values,
              uploadType, 
              files,
              progress: result.progress
            }
          }
        ))
        .catch(error => Rx.Observable.of({
          type: ENTITIES_UPLOAD_FAIL,
          payload: {
            values,
            uploadType,
            error,
            files
          } 
        }))  
        .startWith({
          type: ENTITIES_UPLOAD, 
          payload: {
            uploadType,
            values,
            files
          } 
        })
    } else {
      const postPath = getUploadPostPath(values, uploadType)
      return (actions, {getState}) =>
        apiClient.post(postPath , {
            data: postConvert({...values, Id: 0})
          }, files)
        .flatMap(result=>Rx.Observable.of(
          result.result
          ? {
            type: ENTITIES_UPLOAD_SUCCESS,
            payload: {
              uploadType,
              values,
              files
            } 
          }
          : {
            type: ENTITIES_UPLOAD_PROGRESS, 
            payload: {
              uploadType,
              values, 
              progress: result.progress,
              files
            }
          }
        ))
        .catch(error => Rx.Observable.of({
          type: ENTITIES_UPLOAD_FAIL, 
          payload: {
            uploadType,
            values, 
            error,
            files
          }
        }))
        .startWith({
          type: ENTITIES_UPLOAD, 
          payload: {
            uploadType,
            values, 
            files
          }  
      })
    }
  }



  const remove = (id) => ({apiClient}) => {
    const deletePath = getDeletePath(id)
    return (actions, {getState}) =>
      apiClient.del(deletePath)
      .flatMap(result => Rx.Observable.of(
        result.result
        ? {
          type: ENTITIES_DELETE_SUCCESS, id
        }
        : {
          type: ENTITIES_SAVE_PROGRESS, 
          payload: {
            id, 
            progress: result.progress
          }
        }
      ))
      .catch(error => Rx.Observable.of({
        type: ENTITIES_SAVE_FAIL, 
        id, 
        error: error
      }))
      .startWith({type: ENTITIES_DELETE, id})
  }

  // orders and filters data according to state
  const orderData = (values, state) => {
    if(state.loadOrder) {
      const back = state.loadOrder[0] === '-'
      const field = back ? state.loadOrder.substring(1) : state.loadOrder
      const deleted = state.loadDeleted 
      const ret = values
        .map(value=>value)
        .filter(value => (value.IsDeleted && deleted) || (!value.IsDeleted && !deleted)) 
        .sort((a,b) =>{
          const aa = a[field] && a[field].toLowerCase ? a[field].toLowerCase() : a[field]
          const bb = b[field] && b[field].toLowerCase ? b[field].toLowerCase() : b[field]
          
          if (aa === bb) {
            return 0
          }
          if (aa < bb) {
            return back ? 1 : -1
          }
          return back ? -1 : 1
        })
      return ret
    } else {
      return values
    }
    
  }
  // ------------------------------------
  // Action Handlers
  // ------------------------------------
  const ACTION_HANDLERS = {
    [ENTITIES_LOAD]: (state, action) => ({
      ...state,
      data: null,
      loadInitial: null,
      error: null, 
      loading: true, 
      loadOrder: action.payload.order || 'Name',  
      loadDeleted: action.payload.isDeleted || false,
      loadDefaults: action.payload
    }),
    [ENTITIES_LOAD_SUCCESS]: (state, action) => ({ 
      ...state,  
      data: action.payload, 
      loading: false,
      loadingProgress: null
    }),
    [ENTITIES_LOAD_FAIL]: (state, action) => ({
      ...state, 
      error: action.payload, 
      loading: false,
      loadingProgress: null
    }),
    [ENTITIES_LOAD_PROGRESS]: (state, action) => ({
      ...state, 
      loadingProgress: action.payload
    }),
    [ENTITIES_LOAD_FAIL_CANCEL]: (state, action) => ({
      ...state, 
      error: null,
      loadDefaults:null
    }),
    [ENTITIES_LOAD_MORE]: (state, action) => ({
      ...state, 
      error: null, 
      loadingMore: true
    }),
    [ENTITIES_LOAD_MORE_PROGRESS]: (state, action) => ({
      ...state, 
      error: null, 
      loadingMoreProgress: action.payload
    }),
    [ENTITIES_LOAD_MORE_SUCCESS]: (state, action) => {
      return ({ 
        ...state,  
        data: {...state.data, Values: state.data.Values.concat(action.payload.Values)}, 
        loadingMore: false,
        loadingMoreProgress: null
      })
    },
    [ENTITIES_LOAD_MORE_FAIL]: (state, action) => ({
      ...state, 
      error: action.payload, 
      loadingMore: false,
      loadingMoreProgress: null
    }),

    [ENTITY_LOAD]: (state, action) => ({
      ...state,
      singleError: null, 
      singleLoading: true,
      singleLoad: action.payload,
      singleData: null
    }),
    [ENTITY_LOAD_SUCCESS]: (state, action) => ({
      ...state,  
      singleData: action.payload, 
      singleLoading: false
    }),
    [ENTITY_LOAD_FAIL]: (state, action) => ({
      ...state, 
      singleError: action.payload, 
      singleLoading: false
    }),
    [ENTITY_LOAD_FAIL_CANCEL]: (state, action) => ({
      ...state, 
      singleError: null,
      singleLoad: null
    }),
    [ENTITIES_EDIT_START]: (state, action) => ({
      ...state, 
      editing: {
        ...state.editing, 
        [action.id]: true
      }
    }),
    [ENTITIES_EDIT_STOP]: (state, action) => ({
      ...state,
      data: {
        ...state.data,
        Values: state.data && state.data.Values 
          ? state.data.Values.filter(value => !value.isNew || value.Id != action.id) 
          : []
      },
      editing: {
        ...state.editing, 
        [action.id]: false
      }
    }),
    
    [ENTITIES_SAVE]: (state, action) => ({
      ...state, 
      saveError: {
        ...state.saveError, 
        [action.values.Id]: null
      }, 
      saving: {
        ...state.saving, 
        [action.values.Id]: action.values
      }
    }),
    [ENTITIES_SAVE_PROGRESS]: (state, action) => ({
      ...state, 
      saveProgress: {
        ...state.saveProgress, 
        [action.payload.id]: action.payload.progress
      }
    }),
    
    [ENTITIES_SAVE_SUCCESS]: (state, action) => ({
      ...state, 
      editing: {
        ...state.editing, 
        [action.id]: (action.keepEditing ? state.editing[action.id] : false)
      },
      saveProgress: {
        ...state.saveProgress, 
        [action.id]: null
      }, 
      saving: {
        ...state.saving, 
        [action.id]: false
      }
    }),
    [ENTITIES_SAVE_FAIL]: (state, action) => ({
      ...state, 
      saving: {
        ...state.saving, 
        [action.id]: false
      }, 
      saveProgress: {
        ...state.saveProgress, 
        [action.id]: null
      },
      saveError: {
        ...state.saveError, 
        [action.id]: action.error
      }
    }),
    [ENTITIES_SAVE_FAIL_CANCEL]: (state, action) => {
      return ({
        ...state, 
        saveError: {
          ...state.saveError, 
          [action.id]: null
        }
      })
    },
    [ENTITIES_UPDATE_PUT]: (state, action) => {
      const deleted = state.loadDeleted 
      //total count changes with deletion
      const totalCountChange = deleted && action.payload.IsDeleted 
        ? 1
        : (!deleted && action.payload.IsDeleted ? -1 : 0) 
      if(state.data && state.data.Values) {
        const found = state.data.Values.find(state => state.Id === action.payload.Id)
        const replace = {
          ...found, 
          ...action.payload
        }
        if(state.data.Values.indexOf(found) > -1) {
          state.data.Values.splice(state.data.Values.indexOf(found), 1, replace)
        } else {
          state.data.Values.push(replace)
        }
      }      
      return {
        ...state,
        singleData: state.singleData && action.payload.Id === state.singleData.Id ? action.payload : state.singleData,  
        data: {
          ...state.data,
          TotalCount: state.data && state.data.TotalCount + totalCountChange, 
          Values: state.data && state.data.Values ? orderData(state.data.Values, state) : []
        }
      }
    },
    [ENTITIES_UPDATE_POST]: (state, action) => {
      
      
      const found = state.data.Values.find(state => state.Id === action.payload.Id)
      const deleted = state.loadDeleted 
      const totalCountChange = !deleted && !found ? 1 : 0 
      if (found) {
        const replace = {...action.payload}
        state.data.Values.splice(state.data.Values.indexOf(found), 1, replace)
      } else {
        state.data.Values.push(action.payload)
      }
      return {
        ...state, 
        data: {
          ...state.data, 
          TotalCount: state.data && state.data.TotalCount + totalCountChange, 
          Values: orderData(state.data.Values, state)
        }
      }
    },
    //nb delete guarantees the subscribed data will have lost an entity
    //ie its not for CRUD deletes. CRUD deletes are puts with IsDeleted=true
    [ENTITIES_UPDATE_DELETE]: (state, action) => {
      return {
        ...state, 
        data: {
          ...state.data,
          TotalCount: state.data.TotalCount-1, 
          Values: state.data.Values.filter(state => state.Id !== action.id)
        }
      }
    },
    
    [ENTITY_UPDATE_PUT]: (state, action) => {
      if(state.singleData && state.singleData.Id == action.payload.Id) {
        return {
          ...state, 
          singleData: {
            ...state.singleData, 
            ...action.payload
          }
        }
      }
      return state
    },
    [ENTITY_UPDATE_DELETE]: (state, action) => {
      if(state.singleData && action.id === state.singleData.Id) {
        return {
          ...state, 
          singleData: null 
        }
      }
      return state
    },

    [ENTITIES_DELETE_SUCCESS]: (state, action) => {
      return {
        ...state, 
        deleting: {
          ...state.deleting, 
          [action.id]: false
        },
        saveProgress: {
          [action.id]: null
        },
        data: {
          ...state.data, 
          Values: state.data.Values.filter(state => state.Id !== action.id)
        }
      }
    },
    [ENTITIES_ADD]: (state, action) => {
      return ({
        ...state, 
        editing: {
          ...state.editing, 
          [action.id]: true
        }, 
        data: {
          ...state.data, 
          Values: [{
            Id: action.id, 
            ParentId: action.parentId, 
            isNew: true, 
            Name: ''
          }
          ].concat(state.data.Values)
        }
      })
    },
    [ENTITIES_ADD_SUCCESS]: (state, action) => ({
      ...state, 
      data: {
        ...state.data, 
        Values: state.data.Values.filter(group => group.Id !== 'add')}, 
        saving: {
          ...state.saving, 
          [action.id]: false
        },
        saveProgress: {
          [action.id]: null
        },
        editing: {
          ...state.editing, 
          [action.id]: false
        }
      }),
    [ENTITIES_DELETE]: (state, action) => ({
      ...state, 
      deleting: {
        ...state.deleting, 
        [action.id]: true
      }
    }),
    [ENTITIES_UPLOAD]: (state, action) => ({
      ...state,
      uploading: {
        ...state.uploading,
        [action.payload.values.Id]: {
          ...(state.uploading && state.uploading[action.payload.values.Id]),
          [action.payload.uploadType]: action.payload
        }
      }
    }),
    [ENTITIES_UPLOAD_PROGRESS]: (state, action) => ({
      ...state,
      uploading: {
        ...state.uploading,
        [action.payload.values.Id]: {
          ...(state.uploading && state.uploading[action.payload.values.Id]),
          [action.payload.uploadType]: action.payload
        }
      }
    }),
    [ENTITIES_UPLOAD_SUCCESS]: (state, action) => ({
      ...state,
      ...nullIfNone(state, action.payload.values.Id, 'uploading', action.payload.uploadType)
    }),
    [ENTITIES_UPLOAD_FAIL]: (state, action) => ({
      ...state,
      uploading: {
        ...state.uploading,
        [action.payload.values.Id]: {
          ...(state.uploading && state.uploading[action.payload.values.Id]),
          [action.payload.uploadType]: action.payload
        }
      }
    }),
    [ENTITIES_UPLOAD_FAIL_CANCEL]: (state, action) => ({
      ...state,
      ...nullIfNone(state, action.payload.id, 'uploading', action.payload.uploadType)
    })

  }

  const nullIfNone = (state, id, fieldName, subFieldName) => ({
    [fieldName]: {
      ...state[fieldName],
      ...{[id]: null},
      ...(state[fieldName] 
        && state[fieldName][id] 
        && (Object.keys(state[fieldName][id]).length > 1
          || !state[fieldName][id][subFieldName])
        && {[id]: {
        ...(state[fieldName] && state[fieldName][id]),
        [subFieldName]: null
      }})
    }
  })

  // ------------------------------------
  // Reducer
  // ------------------------------------
  const initialState = {loadOrder: 'Name', loadDeleted: false, loadInitial: true}
  function reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
  }

  return {
    constants: {
      ENTITIES_UPDATE_PUT,
      ENTITIES_UPDATE_POST,
      ENTITIES_UPDATE_DELETE,

      ENTITIES_LOAD,
      ENTITIES_LOAD_PROGRESS,
      ENTITIES_LOAD_SUCCESS,
      ENTITIES_LOAD_FAIL,
      ENTITIES_LOAD_FAIL_CANCEL,
      
      ENTITIES_LOAD_MORE,
      ENTITIES_LOAD_MORE_PROGRESS,
      ENTITIES_LOAD_MORE_SUCCESS,
      ENTITIES_LOAD_MORE_FAIL,

      ENTITY_UPDATE_PUT,
      ENTITY_UPDATE_DELETE,

      ENTITY_LOAD,
      ENTITY_LOAD_PROGRESS,
      ENTITY_LOAD_SUCCESS,
      ENTITY_LOAD_FAIL,
      ENTITY_LOAD_FAIL_CANCEL,
      
      ENTITIES_INIT,

      ENTITIES_EDIT_START,
      ENTITIES_EDIT_STOP,

      ENTITIES_SAVE,
      ENTITIES_SAVE_PROGRESS,
      ENTITIES_SAVE_SUCCESS,
      ENTITIES_SAVE_FAIL,
      ENTITIES_SAVE_FAIL_CANCEL,

      ENTITIES_UPLOAD,
      ENTITIES_UPLOAD_PROGRESS,
      ENTITIES_UPLOAD_SUCCESS,
      ENTITIES_UPLOAD_FAIL,
      ENTITIES_UPLOAD_FAIL_CANCEL,


      ENTITIES_ADD,
      ENTITIES_ADD_SUCCESS,

      ENTITIES_DELETE,
      ENTITIES_DELETE_SUCCESS
    },
    actions: {
      load,
      loadErrorCancel,
      loadMore,
      loadSingle,
      singleLoadErrorCancel,
      add,
      editStart,
      editStop,
      save,
      saveErrorCancel,
      uploadErrorCancel,
      remove,
      upload
    },
    reducer
  }
}

const modules = {}

// get a module from the cache of configured modules
export const entityModule = (name) => {
  return modules[name]
}

// configura a new module
export const configureModule = (config) => modules[config.name] = getModule(config)