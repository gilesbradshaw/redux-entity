import { configureModule, entityModule } from 'module'

require('co-mocha')

require('./rxjs-to-async-iterator')

const Rx = require('rxjs')


describe('(Redux Module) Nodes', () => {
  let testModule
  let getJoinId,
    getJoinSingleId,
    getLoadDefaults,
    getLoadPath,
    getLoadHasChanged,
    getLoadSingleHasChanged,
    getSinglePath,
    getPostPath,
    getUploadPostPath,
    getPutPath,
    getUploadPutPath,
    getDeletePath,
    postConvert
  beforeEach(() => {
    getJoinId = sinon.stub()
    getJoinSingleId = sinon.stub()
    getLoadDefaults = sinon.stub()
    getLoadPath = sinon.stub()
    getLoadHasChanged = sinon.stub()
    getLoadSingleHasChanged = sinon.stub()
    getSinglePath = sinon.stub()
    getPostPath = sinon.stub()
    getUploadPostPath = sinon.stub()
    getPutPath = sinon.stub()
    getUploadPutPath = sinon.stub()
    getDeletePath = sinon.stub()
    postConvert = sinon.stub()

    configureModule({
      name: 'TESTMODULE',
      getJoinId,
      getJoinSingleId,
      getLoadDefaults,
      getLoadPath,
      getLoadHasChanged,
      getLoadSingleHasChanged,
      getSinglePath,
      getPostPath,
      getUploadPostPath,
      getPutPath,
      getUploadPutPath,
      getDeletePath,
      postConvert,
      signalRRetry: 5
    })
    testModule = entityModule('TESTMODULE')

  })

  it('Should export constants.', () => {
    const {
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


        ENTITIES_UPLOAD,
        ENTITIES_UPLOAD_PROGRESS,
        ENTITIES_UPLOAD_SUCCESS,
        ENTITIES_UPLOAD_FAIL,


        ENTITIES_ADD,
        ENTITIES_ADD_SUCCESS,

        ENTITIES_DELETE,
        ENTITIES_DELETE_SUCCESS,
        ENTITIES_DELETE_FAIL
      }
    } = testModule

    expect(ENTITIES_UPDATE_PUT.toString()).to.equal('react-dealerweb/ENTITIES_UPDATE_PUT:TESTMODULE')
    expect(ENTITIES_UPDATE_POST).to.equal('react-dealerweb/ENTITIES_UPDATE_POST:TESTMODULE')
    expect(ENTITIES_UPDATE_DELETE).to.equal('react-dealerweb/ENTITIES_UPDATE_DELETE:TESTMODULE')

    expect(ENTITIES_LOAD).to.equal('react-dealerweb/ENTITIES_LOAD:TESTMODULE')
    expect(ENTITIES_LOAD_PROGRESS).to.equal('react-dealerweb/ENTITIES_LOAD_PROGRESS:TESTMODULE')
    expect(ENTITIES_LOAD_SUCCESS).to.equal('react-dealerweb/ENTITIES_LOAD_SUCCESS:TESTMODULE')
    expect(ENTITIES_LOAD_FAIL).to.equal('react-dealerweb/ENTITIES_LOAD_FAIL:TESTMODULE')
    expect(ENTITIES_LOAD_FAIL_CANCEL).to.equal('react-dealerweb/ENTITIES_LOAD_FAIL_CANCEL:TESTMODULE')

    expect(ENTITIES_LOAD_MORE).to.equal('react-dealerweb/ENTITIES_LOAD_MORE:TESTMODULE')
    expect(ENTITIES_LOAD_MORE_PROGRESS).to.equal('react-dealerweb/ENTITIES_LOAD_MORE_PROGRESS:TESTMODULE')
    expect(ENTITIES_LOAD_MORE_SUCCESS).to.equal('react-dealerweb/ENTITIES_LOAD_MORE_SUCCESS:TESTMODULE')
    expect(ENTITIES_LOAD_MORE_FAIL).to.equal('react-dealerweb/ENTITIES_LOAD_MORE_FAIL:TESTMODULE')

    expect(ENTITY_UPDATE_PUT).to.equal('react-dealerweb/ENTITY_UPDATE_PUT:TESTMODULE')
    expect(ENTITY_UPDATE_DELETE).to.equal('react-dealerweb/ENTITY_UPDATE_DELETE:TESTMODULE')

    expect(ENTITY_LOAD).to.equal('react-dealerweb/ENTITY_LOAD:TESTMODULE')
    expect(ENTITY_LOAD_PROGRESS).to.equal('react-dealerweb/ENTITY_LOAD_PROGRESS:TESTMODULE')
    expect(ENTITY_LOAD_SUCCESS).to.equal('react-dealerweb/ENTITY_LOAD_SUCCESS:TESTMODULE')
    expect(ENTITY_LOAD_FAIL).to.equal('react-dealerweb/ENTITY_LOAD_FAIL:TESTMODULE')
    expect(ENTITY_LOAD_FAIL_CANCEL).to.equal('react-dealerweb/ENTITY_LOAD_FAIL_CANCEL:TESTMODULE')
    expect(ENTITIES_INIT).to.equal('react-dealerweb/ENTITIES_INIT:TESTMODULE')

    expect(ENTITIES_EDIT_START).to.equal('react-dealerweb/ENTITIES_EDIT_START:TESTMODULE')
    expect(ENTITIES_EDIT_STOP).to.equal('react-dealerweb/ENTITIES_EDIT_STOP:TESTMODULE')

    expect(ENTITIES_SAVE).to.equal('react-dealerweb/ENTITIES_SAVE:TESTMODULE')
    expect(ENTITIES_SAVE_PROGRESS).to.equal('react-dealerweb/ENTITIES_SAVE_PROGRESS:TESTMODULE')
    expect(ENTITIES_SAVE_SUCCESS).to.equal('react-dealerweb/ENTITIES_SAVE_SUCCESS:TESTMODULE')
    expect(ENTITIES_SAVE_FAIL).to.equal('react-dealerweb/ENTITIES_SAVE_FAIL:TESTMODULE')

    expect(ENTITIES_UPLOAD).to.equal('react-dealerweb/ENTITIES_UPLOAD:TESTMODULE')
    expect(ENTITIES_UPLOAD_PROGRESS).to.equal('react-dealerweb/ENTITIES_UPLOAD_PROGRESS:TESTMODULE')
    expect(ENTITIES_UPLOAD_SUCCESS).to.equal('react-dealerweb/ENTITIES_UPLOAD_SUCCESS:TESTMODULE')
    expect(ENTITIES_UPLOAD_FAIL).to.equal('react-dealerweb/ENTITIES_UPLOAD_FAIL:TESTMODULE')


    expect(ENTITIES_ADD).to.equal('react-dealerweb/ENTITIES_ADD:TESTMODULE')
    expect(ENTITIES_ADD_SUCCESS).to.equal('react-dealerweb/ENTITIES_ADD_SUCCESS:TESTMODULE')

    expect(ENTITIES_DELETE).to.equal('react-dealerweb/ENTITIES_DELETE:TESTMODULE')
    expect(ENTITIES_DELETE_SUCCESS).to.equal('react-dealerweb/ENTITIES_DELETE_SUCCESS:TESTMODULE')
  })

  describe('(Reducer)', () => {
    let reducer

    beforeEach(() => reducer = testModule.reducer)

    it('Should be a function.', () => {
      expect(reducer).to.be.a('function')
    })

    it('Should initialize with an initial state.', () => {
      expect(reducer(undefined, {})).to.eql({ loadOrder: 'Name', loadDeleted: false, loadInitial: true })
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = reducer(undefined, {})
      let initial = { giles: 'giles' }
      state = reducer(initial, { type: '@@@@@@@' })
      expect(state).to.eql(initial)
    })
  })
  describe('types', () => {

    let reducer

    beforeEach(() => {
      reducer = testModule.reducer
    })
    describe('ENTITIES_EDIT', ()=> {
      describe('type: ENTITIES_EDIT_START', () => {

        let editStart, ENTITIES_EDIT_START

        beforeEach(() => {
          ENTITIES_EDIT_START = testModule.constants.ENTITIES_EDIT_START
          editStart = testModule.actions.editStart
        })

        it('editStart returns ENTITIES_EDIT_START type', () => {
          expect(editStart('testme')).to.eql({ type: ENTITIES_EDIT_START, id: 'testme' })
        })
        it('reducing editStart should set id to editing', () => {
          expect(reducer({}, editStart('testMe'))).to.eql({ editing: { testMe: true } })
        })
      })
      describe('type: ENTITIES_EDIT_STOP', () => {
        let editStop, ENTITIES_EDIT_STOP

        beforeEach(() => {
          ENTITIES_EDIT_STOP = testModule.constants.ENTITIES_EDIT_STOP
          editStop = testModule.actions.editStop
        })

        it('editStop returns ENTITIES_EDIT_STOP type', () => {
          expect(editStop('testme2')).to.eql({ type: ENTITIES_EDIT_STOP, id: 'testme2' })
        })
        it('reducing editStop should reset id from editing', () => {
          expect(
            reducer({
              editing: {
                testMe: true,
                testMe2: true
              }
            },
              editStop('testMe'))
          ).to.eql({
            data: {
              Values: []
            },
            editing: {
              testMe: false,
              testMe2: true
            }
          })
        })
        it('reducing editStop should remove id if it is new', () => {
          expect(
            reducer({
              data: {
                Values: [
                  {
                    Id: 'testMe',
                    isNew: true
                  },
                  {
                    Id: 'testMe2',
                    isNew: true
                  }
                ]
              },
              editing: {
                testMe: true,
                testMe2: true
              }
            },
              editStop('testMe'))
          ).to.eql({
            data: {
              Values: [
                {
                  Id: 'testMe2',
                  isNew: true
                }
              ]
            },
            editing: {
              testMe: false,
              testMe2: true
            }
          })
        })
        it('reducing editStop should remove id if it is new', () => {
          expect(
            reducer({
              data: {
                Values: [
                  {
                    Id: 'testMe',
                    isNew: false
                  },
                  {
                    Id: 'testMe2',
                    isNew: true
                  }
                ]
              },
              editing: {
                testMe: true,
                testMe2: true
              }
            },
              editStop('testMe'))
          ).to.eql({
            data: {
              Values: [
                {
                  Id: 'testMe',
                  isNew: false
                },
                {
                  Id: 'testMe2',
                  isNew: true
                }
              ]
            },
            editing: {
              testMe: false,
              testMe2: true
            }
          })
        })
      })
    })
    describe('ENTITIES_LOAD', ()=> {
      describe('type: ENTITIES_LOAD', () => {
        let ENTITIES_LOAD

        beforeEach(() => {
          ENTITIES_LOAD = testModule.constants.ENTITIES_LOAD
        })

        it('Should be reduced with type ENTITIES_LOAD. deleted false', () => {
          const res = reducer({
            giles: 'test',
            loadInitial: true
          },
            {
              type: ENTITIES_LOAD,
              payload: 'loadDefaults'
            })
          expect(res).to.eql({
            giles: 'test',
            error: null,
            loading: true,
            loadDeleted: false,
            loadOrder: 'Name',
            loadInitial: null,
            data: null,
            loadDefaults: 'loadDefaults'
          })
        })
        it('Should be reduced with type ENTITIES_LOAD. deleted true', () => {
          const res = reducer({
            giles: 'test',
            loadInitial: true
          },
            {
              type: ENTITIES_LOAD,
              payload: {
                isDeleted: true
              }
            })

          expect(res).to.eql({
            giles: 'test',
            error: null,
            loading: true,
            loadDeleted: true,
            loadOrder: 'Name',
            loadInitial: null,
            data: null,
            loadDefaults: {
              isDeleted: true
            }
          })
        })
        it('Should be reduced with type ENTITIES_LOAD. order', () => {
          const res = reducer({
            giles: 'test',
            loadInitial: true
          }, {
              type: ENTITIES_LOAD,
              payload: {
                order: 'orderMe'
              }
            })
          expect(res).to.eql({
            giles: 'test',
            error: null,
            loading: true,
            loadDeleted: false,
            loadOrder: 'orderMe',
            loadInitial: null,
            data: null,
            loadDefaults: {
              order: 'orderMe'
            }
          })
        })
      })
      describe('type: ENTITIES_LOAD_PROGRESS', () => {

        let ENTITIES_LOAD_PROGRESS

        beforeEach(() => {
          ENTITIES_LOAD_PROGRESS = testModule.constants.ENTITIES_LOAD_PROGRESS
        })

        it('Should be reduced with type ENTITIES_LOAD_PROGRESS.', () => {
          const res = reducer({
            giles: 'test'
          }, {
              type: ENTITIES_LOAD_PROGRESS,
              payload: 'progress'
            })
          expect(res).to.eql({
            giles: 'test',
            loadingProgress: 'progress'
          })
        })
      })
      describe('type: ENTITIES_LOAD_FAIL', () => {

        let ENTITIES_LOAD_FAIL

        beforeEach(() => {
          ENTITIES_LOAD_FAIL = testModule.constants.ENTITIES_LOAD_FAIL
        })

        it('Should be reduced with type ENTITIES_LOAD_FAIL.', () => {
          const res = reducer({
            giles: 'test'
          }, {
              type: ENTITIES_LOAD_FAIL,
              payload: 'error'
            })
          expect(res).to.eql({
            giles: 'test',
            error: 'error',
            loading: false,
            loadingProgress: null
          })
        })
      })
      describe('type: ENTITIES_LOAD_FAIL_CANCEL', () => {

        let ENTITIES_LOAD_FAIL_CANCEL

        beforeEach(() => {
          ENTITIES_LOAD_FAIL_CANCEL = testModule.constants.ENTITIES_LOAD_FAIL_CANCEL
        })

        it('Should be reduced with type ENTITIES_LOAD_FAIL_CANCEL.', () => {
          const res = reducer({
            giles: 'test',
            error: 'error'
          }, {
              type: ENTITIES_LOAD_FAIL_CANCEL
            })
          expect(res).to.eql({
            giles: 'test',
            error: null,
            loadDefaults: null
          })
        })
      })
      describe('type: ENTITIES_LOAD_SUCCESS', () => {

        let ENTITIES_LOAD_SUCCESS

        beforeEach(() => {
          ENTITIES_LOAD_SUCCESS = testModule.constants.ENTITIES_LOAD_SUCCESS
        })

        it('Should be reduced with type ENTITIES_LOAD_SUCCESS.', () => {
          const res = reducer({
            giles: 'test'
          }, {
              type: ENTITIES_LOAD_SUCCESS,
              payload: 'data'
            })
          expect(res).to.eql({
            giles: 'test',
            data: 'data',
            loading: false,
            loadingProgress: null
          })
        })
      })
    })
    describe('ENTITIES_LOAD_MORE', ()=> {
      describe('type: ENTITIES_LOAD_MORE', () => {

        let ENTITIES_LOAD_MORE

        beforeEach(() => {
          ENTITIES_LOAD_MORE = testModule.constants.ENTITIES_LOAD_MORE
        })

        it('Should be reduced with type ENTITIES_LOAD_MORE.', () => {
          const res = reducer({
            giles: 'test'
          }, {
              type: ENTITIES_LOAD_MORE,
              payload: {}
            })
          expect(res).to.eql({
            giles: 'test',
            error: null,
            loadingMore: true
          })
        })
      })

      describe('type: ENTITIES_LOAD_MORE_PROGRESS', () => {

        let ENTITIES_LOAD_MORE_PROGRESS

        beforeEach(() => {
          ENTITIES_LOAD_MORE_PROGRESS = testModule.constants.ENTITIES_LOAD_MORE_PROGRESS
        })

        it('Should be reduced with type ENTITIES_LOAD_MORE_PROGRESS.', () => {
          const res = reducer({
            giles: 'test'
          }, {
              type: ENTITIES_LOAD_MORE_PROGRESS,
              payload: 'progress'
            })
          expect(res).to.eql({
            giles: 'test',
            error: null,
            loadingMoreProgress: 'progress'
          })
        })
      })


      describe('type: ENTITIES_LOAD_MORE_FAIL', () => {

        let ENTITIES_LOAD_MORE_FAIL

        beforeEach(() => {
          ENTITIES_LOAD_MORE_FAIL = testModule.constants.ENTITIES_LOAD_MORE_FAIL
        })

        it('Should be reduced with type ENTITIES_LOAD_MORE_FAIL.', () => {
          const res = reducer({
            giles: 'test'
          }, {
              type: ENTITIES_LOAD_MORE_FAIL,
              payload: 'error'
            })
          expect(res).to.eql({
            giles: 'test',
            error: 'error',
            loadingMore: false,
            loadingMoreProgress: null
          })
        })
      })
      describe('type: ENTITIES_LOAD_MORE_SUCCESS', () => {

        let ENTITIES_LOAD_MORE_SUCCESS

        beforeEach(() => {
          ENTITIES_LOAD_MORE_SUCCESS = testModule.constants.ENTITIES_LOAD_MORE_SUCCESS
        })

        it('Should be reduced with type ENTITIES_LOAD_SUCCESS.', () => {
          const res = reducer({
            giles: 'test',
            data: {
              Values: ['a', 'b', 'c']
            }
          }, {
              type: ENTITIES_LOAD_MORE_SUCCESS,
              payload: {
                Values: ['d', 'e', 'f']
              }
            })
          expect(res).to.eql({
            giles: 'test', data:
            {
              Values: ['a', 'b', 'c', 'd', 'e', 'f']
            },
            loadingMore: false,
            loadingMoreProgress: null
          })
        })
      })
    })
    describe('ENTITY_LOAD', ()=> {
      describe('type: ENTITY_LOAD', () => {

        let ENTITY_LOAD

        beforeEach(() => {
          ENTITY_LOAD = testModule.constants.ENTITY_LOAD
        })

        it('Should be reduced with type ENTITY_LOAD.', () => {
          const res = reducer({
            giles: 'test'
          }, {
              type: ENTITY_LOAD,
              payload: 'testId'
            })
          expect(res).to.eql({
            giles: 'test',
            singleError: null,
            singleLoading: true,
            singleLoad: 'testId',
            singleData: null
          })
        })
      })

      describe('type: ENTITY_LOAD_FAIL', () => {

        let ENTITY_LOAD_FAIL

        beforeEach(() => {
          ENTITY_LOAD_FAIL = testModule.constants.ENTITY_LOAD_FAIL
        })

        it('Should be reduced with type ENTITY_LOAD_FAIL.', () => {
          const res = reducer({
            giles: 'test'
          }, {
              type: ENTITY_LOAD_FAIL,
              payload: 'error'
            })
          expect(res).to.eql({
            giles: 'test',
            singleError: 'error',
            singleLoading: false
          })
        })
      })
      describe('type: ENTITY_LOAD_SUCCESS', () => {

        let ENTITY_LOAD_SUCCESS

        beforeEach(() => {
          ENTITY_LOAD_SUCCESS = testModule.constants.ENTITY_LOAD_SUCCESS
        })

        it('Should be reduced with type ENTITY_LOAD_SUCCESS.', () => {
          const res = reducer({
            giles: 'test'
          }, {
              type: ENTITY_LOAD_SUCCESS,
              payload: 'data'
            })
          expect(res).to.eql({
            giles: 'test',
            singleData: 'data',
            singleLoading: false
          })
        })
      })

      describe('type: ENTITY_LOAD_FAIL_CANCEL', () => {

        let ENTITY_LOAD_FAIL_CANCEL

        beforeEach(() => {
          ENTITY_LOAD_FAIL_CANCEL = testModule.constants.ENTITY_LOAD_FAIL_CANCEL
        })

        it('Should be reduced with type ENTITY_LOAD_FAIL_CANCEL.', () => {
          const res = reducer({
            giles: 'test',
            singleError: 'error',
            singleLoad: 'testId'
          }, {
              type: ENTITY_LOAD_FAIL_CANCEL
            })
          expect(res).to.eql({
            giles: 'test',
            singleError: null,
            singleLoad: null
          })
        })
      })
    })
    describe('ENTITIES_UPLOAD', ()=> {

      describe('type: ENTITIES_UPLOAD', () => {

        let ENTITIES_UPLOAD

        beforeEach(() => {
          ENTITIES_UPLOAD = testModule.constants.ENTITIES_UPLOAD
        })

        it('Should be reduced with type ENTITIES_UPLOAD.', () => {
          const res = reducer({
            giles: 'test',
            uploading: {
              giles: true,
              testMe: {
                uploadExistingTest: 'test'
              }
            }
          }, {
              type: ENTITIES_UPLOAD,
              payload: {
                uploadType: 'uploadType',
                values: {
                  Id: 'testMe'
                },
                files: 'files'
              }
            })
          const expected = {
            giles: 'test',
            uploading: {
              testMe: {
                uploadExistingTest: 'test',
                uploadType: {
                  uploadType: 'uploadType',
                  values: {
                    Id: 'testMe'
                  },
                  files: 'files'
                }
              },
              giles: true
            }
          }          
          
          expect(res).to.eql(expected)
        })
      })
      describe('type: ENTITIES_UPLOAD_SUCCESS', () => {

        let ENTITIES_UPLOAD_SUCCESS

        beforeEach(() => {
          ENTITIES_UPLOAD_SUCCESS = testModule.constants.ENTITIES_UPLOAD_SUCCESS
        })

        it('Should be reduced with type ENTITIES_UPLOAD_SUCCESS.', () => {
          const res = reducer({
            giles: 'test',
            uploading: {
              testMe: {
                uploadType: true,
                otherUploadType: true
              },
              giles: true
            }
          }, {
              type: ENTITIES_UPLOAD_SUCCESS,
              payload: {
                uploadType: 'uploadType',
                values: {
                  Id: 'testMe'
                }
              }
            })
          const expected = {
            giles: 'test',
            uploading: {
              testMe: {
                uploadType: null,
                otherUploadType: true
              },
              giles: true
            }
          }
          expect(res).to.eql(expected)
        })
        it('Should be reduced with type ENTITIES_UPLOAD_SUCCESS nulled if no more.', () => {
          const res = reducer({
            giles: 'test',
            uploading: {
              testMe: {
                uploadType: true
              },
              giles: true
            }
          }, {
              type: ENTITIES_UPLOAD_SUCCESS,
              payload: {
                uploadType: 'uploadType',
                values: {
                  Id: 'testMe'
                }
              }
            })
          const expected = {
            giles: 'test',
            uploading: {
              testMe: null,
              giles: true
            }
          }
          expect(res).to.eql(expected)
        })
      })
        
      
      describe('type: ENTITIES_UPLOAD_PROGRESS', () => {

        let ENTITIES_UPLOAD_PROGRESS

        beforeEach(() => {
          ENTITIES_UPLOAD_PROGRESS = testModule.constants.ENTITIES_UPLOAD_PROGRESS
        })

        it('Should be reduced with type ENTITIES_UPLOAD_PROGRESS.', () => {
          const res = reducer({
            giles: 'test',
            uploading: {
              testMe: 'testme',
              giles: {
                existingType: 'test'
              }
              
            }
          }, {
              type: ENTITIES_UPLOAD_PROGRESS,
              payload: {
                values: {
                  Id: 'giles'
                },
                uploadType: 'uploadType',
                progress: 'progress'
              }
            })
          const expected ={
            giles: 'test',
            uploading: {
              testMe: 'testme',
              giles: {
                existingType: 'test',
                uploadType: {
                  values: {
                    Id: 'giles'
                  },
                  uploadType: 'uploadType',
                  progress: 'progress'
                }
              }
            }
          }
          expect(res).to.eql(expected)
        })
      })

      describe('type: ENTITIES_UPLOAD_FAIL', () => {

        let ENTITIES_UPLOAD_FAIL

        beforeEach(() => {
          ENTITIES_UPLOAD_FAIL = testModule.constants.ENTITIES_UPLOAD_FAIL
        })

        it('Should be reduced with type ENTITIES_UPLOAD_FAIL.', () => {
          const res = reducer({
            giles: 'test',
            uploading: {
              testMe: {
                uploadType: true,
                otherUploadType: true
              }
            }
          }, {
              type: ENTITIES_UPLOAD_FAIL,
              payload: {
                values: {
                  Id: 'testMe'
                },
                uploadType: 'uploadType',
                error: 'damn2'
              }
            })
          const expected = {
            giles: 'test',
            uploading: {
              testMe: {
                uploadType: {
                  values: {
                    Id: 'testMe'
                  },
                  uploadType: 'uploadType',
                  error: 'damn2'
                },
                otherUploadType: true
              }
            }
          }
          expect(res).to.eql(expected)
        })
      })
      describe('type: ENTITIES_UPLOAD_FAIL_CANCEL', () => {

        let ENTITIES_UPLOAD_FAIL_CANCEL

        beforeEach(() => {
          ENTITIES_UPLOAD_FAIL_CANCEL = testModule.constants.ENTITIES_UPLOAD_FAIL_CANCEL
        })

        it('Should be reduced with type ENTITIES_UPLOAD_FAIL_CANCEL.', () => {
          const res = reducer({
            giles: 'test',
            uploading: {
              giles: 'damn',
              [99]: {
                testError: true,
                testError2: true
              }
            }
          }, {
              type: ENTITIES_UPLOAD_FAIL_CANCEL,
              payload: {
                id: 99,
                uploadType: 'testError'
              }
              
            })
          expect(res).to.eql({
            giles: 'test',
            uploading: {
              giles: 'damn',
              [99]: {
                testError: null,
                testError2: true
              }
            }
          })
        })
        it('Should be reduced with type ENTITIES_UPLOAD_FAIL_CANCEL. nulled if no more', () => {
          const res = reducer({
            giles: 'test',
            uploading: {
              giles: 'damn',
              [99]: {
                testError: true
              }
            }
          }, {
              type: ENTITIES_UPLOAD_FAIL_CANCEL,
              payload: {
                id: 99,
                uploadType: 'testError'
              }
              
            })
          expect(res).to.eql({
            giles: 'test',
            uploading: {
              giles: 'damn',
              [99]: null
            }
          })
        })
      })

    })
    
    describe('ENITIES_SAVE', ()=> {

      describe('type: ENTITIES_SAVE', () => {

        let ENTITIES_SAVE

        beforeEach(() => {
          ENTITIES_SAVE = testModule.constants.ENTITIES_SAVE
        })

        it('Should be reduced with type ENTITIES_SAVE.', () => {
          const res = reducer({
            giles: 'test',
            saving: {
              giles: true
            }
          }, {
              type: ENTITIES_SAVE,
              values: {
                Id: 'testMe'
              }
            })
          expect(res).to.eql({
            giles: 'test',
            saveError: {
              testMe: null
            },
            saving: {
              testMe: {
                Id: 'testMe'
              },
              giles: true
            }
          })
        })
      })

      describe('type: ENTITIES_SAVE_SUCCESS', () => {

        let ENTITIES_SAVE_SUCCESS

        beforeEach(() => {
          ENTITIES_SAVE_SUCCESS = testModule.constants.ENTITIES_SAVE_SUCCESS
        })

        it('Should be reduced with type ENTITIES_SAVE_SUCCESS.', () => {
          const res = reducer({
            giles: 'test',
            saving: {
              testMe: true,
              giles: true
            },
            saveProgress: {
              testMe: 'testme',
              giles: 'progress'
            }
          }, {
              type: ENTITIES_SAVE_SUCCESS,
              id: 'testMe'
            })
            
          expect(res).to.eql({
            giles: 'test',
            saving: {
              testMe: false,
              giles: true
            },
            saveProgress: {
              testMe: null,
              giles: 'progress'
            },
            editing: {
              testMe: false
            }
          })
        })
        describe('type: ENTITIES_SAVE_PROGRESS', () => {

          let ENTITIES_SAVE_PROGRESS

          beforeEach(() => {
            ENTITIES_SAVE_PROGRESS = testModule.constants.ENTITIES_SAVE_PROGRESS
          })

          it('Should be reduced with type ENTITIES_SAVE_PROGRESS.', () => {
            const res = reducer({
              giles: 'test',
              saveProgress: {
                testMe: 'testme'
              }
            }, {
                type: ENTITIES_SAVE_PROGRESS,
                payload: {
                  id: 'giles',
                  progress: 'progress'
                }
              })
            expect(res).to.eql({
              giles: 'test',
              saveProgress: {
                testMe: 'testme',
                giles: 'progress'
              }
            })
          })
        })

        it('Should be reduced with type ENTITIES_SAVE_SUCCESS. keepEditing', () => {
          const res = reducer({
            giles: 'test',
            saving: {
              testMe: true,
              giles: true
            },
            saveProgress: {
              testMe: 'testme',
              giles: 'progress'
            },
            editing: {
              testMe: 'keep me'
            }
          }, {
              type: ENTITIES_SAVE_SUCCESS,
              id: 'testMe',
              keepEditing: true
            })

          expect(res).to.eql({
            giles: 'test',
            saving: {
              testMe: false,
              giles: true
            },
            saveProgress: {
              testMe: null,
              giles: 'progress'
            },
            editing: {
              testMe: 'keep me'
            }
          })
        })
      })

      describe('type: ENTITIES_SAVE_FAIL', () => {

        let ENTITIES_SAVE_FAIL

        beforeEach(() => {
          ENTITIES_SAVE_FAIL = testModule.constants.ENTITIES_SAVE_FAIL
        })

        it('Should be reduced with type ENTITIES_SAVE_FAIL.', () => {
          const res = reducer({
            giles: 'test',
            saving: {
              testMe: true
            },
            saveProgress: {
              testMe: 'progress'
            },
            saveError: {
              giles: 'damn'
            }
          }, {
              type: ENTITIES_SAVE_FAIL,
              id: 'testMe',
              error: 'damn2'
            })
          expect(res).to.eql({
            giles: 'test',
            saving: {
              testMe: false
            },
            saveProgress: {
              testMe: null
            },
            saveError: {
              giles: 'damn',
              testMe: 'damn2'
            }
          })
        })
      })

      describe('type: ENTITIES_SAVE_FAIL_CANCEL', () => {

        let ENTITIES_SAVE_FAIL_CANCEL

        beforeEach(() => {
          ENTITIES_SAVE_FAIL_CANCEL = testModule.constants.ENTITIES_SAVE_FAIL_CANCEL
        })

        it('Should be reduced with type ENTITIES_SAVE_FAIL_CANCEL.', () => {
          const res = reducer({
            giles: 'test',
            saveError: {
              giles: 'damn',
              [99]: true
            }
          }, {
              type: ENTITIES_SAVE_FAIL_CANCEL,
              id: 99
            })
          expect(res).to.eql({
            giles: 'test',
            saveError: {
              giles: 'damn',
              [99]: null
            }
          })
        })
      })
    })
    describe('ENTITIES_UPDATE', ()=> {
      describe('type: ENTITIES_UPDATE_PUT', () => {

        let ENTITIES_UPDATE_PUT

        beforeEach(() => {
          ENTITIES_UPDATE_PUT = testModule.constants.ENTITIES_UPDATE_PUT
        })

        it('reduced with type "ENTITIES_UPDATE_PUT".', () => {
          const state = {
            giles: 'test',
            loadOrder: 'Whatever',
            data: {
              TotalCount: 10,
              Values: [
                {
                  Id: 'testId',
                  Prop: 'prop',
                  Name: 'giles'
                }
              ]
            }
          }
          const res = reducer(state, {
            type: ENTITIES_UPDATE_PUT,
            payload: {
              Id: 'testId',
              Name: 'fred',
              Prop1: 'prop1'
            }
          })
          expect(res).to.eql({
            giles: 'test',
            loadOrder: 'Whatever',
            data: {
              TotalCount: 10,
              Values: [
                {
                  'Id': 'testId',
                  'Name': 'fred',
                  Prop: 'prop',
                  Prop1: 'prop1'
                }
              ]
            },
            singleData: undefined
          })
        })
        it('reduced with type "ENTITIES_UPDATE_PUT with no data".', () => {
          const state = {
            giles: 'test',
            loadOrder: 'Whatever',
          }
          const res = reducer(state, {
            type: ENTITIES_UPDATE_PUT,
            payload: {
              Id: 'testId',
              Name: 'fred',
              Prop1: 'prop1'
            }
          })
          expect(res).to.eql({
            giles: 'test',
            loadOrder: 'Whatever',
            data: {
              TotalCount: undefined,
              Values: []
            },
            singleData: undefined
          })
        })
        it('reduced with type "ENTITIES_UPDATE_PUT with singledata".', () => {
          const state = {
            giles: 'test',
            loadOrder: 'Whatever',
            singleData: {
              Id: 'testId',
              Name: 'fredy',
              Prop1: 'prop1y'
            }
          }
          const res = reducer(state, {
            type: ENTITIES_UPDATE_PUT,
            payload: {
              Id: 'testId',
              Name: 'fred',
              Prop1: 'prop1'
            }
          })
          expect(res).to.eql({
            giles: 'test',
            loadOrder: 'Whatever',
            data: {
              TotalCount: undefined,
              Values: []
            },
            singleData: {
              Id: 'testId',
              Name: 'fred',
              Prop1: 'prop1'
            }
          })
        })

        it('reduced with type "ENTITIES_UPDATE_PUT" deleted.', () => {
          const state = {
            giles: 'test',
            loadOrder: 'Whatever',
            loadDeleted: false,
            data: {
              TotalCount: 101,
              Values: [{
                Id: 'testId',
                Prop: 'prop',
                Name: 'giles'
              }]
            }
          }
          const res = reducer(state, {
            type: ENTITIES_UPDATE_PUT,
            payload: {
              Id: 'testId',
              IsDeleted: true
            }
          })
          expect(res).to.eql({
            giles: 'test',
            loadOrder: 'Whatever',
            loadDeleted: false,
            data: {
              TotalCount: 100,
              Values: []
            },
            singleData: undefined
          })
        })
        it('reduced with type "ENTITIES_UPDATE_PUT" deleted and deleted required default order.', () => {
          const state = {
            giles: 'test',
            loadDeleted: true,
            loadOrder: 'Id',
            data: {
              TotalCount: 11,
              Values: [{
                Id: 'testId',
                IsDeleted: true,
                Prop: 'prop',
                Name: 'giles'
              }]
            }
          }
          const res = reducer(
            state,
            {
              type: ENTITIES_UPDATE_PUT,
              payload: {
                Id: 'testId2',
                IsDeleted: true
              }
            }
          )
          expect(res).to.eql({
            'giles': 'test',
            loadDeleted: true,
            loadOrder: 'Id',
            'data': {
              TotalCount: 12,
              Values: [{
                Id: 'testId',
                IsDeleted: true,
                Prop: 'prop',
                Name: 'giles'
              },
                {
                  Id: 'testId2',
                  IsDeleted: true
                }]
            },
            singleData: undefined
          })
        })
        it('reduced with type "ENTITIES_UPDATE_PUT" deleted and deleted required reverse order.', () => {
          const state = {
            giles: 'test',
            loadDeleted: true,
            loadOrder: '-Id',
            data: {
              TotalCount: 11,
              Values: [{
                Id: 'testId',
                IsDeleted: true,
                Prop: 'prop',
                Name: 'giles'
              }]
            }
          }
          const res = reducer(state, {
            type: ENTITIES_UPDATE_PUT,
            payload: {
              Id: 'testId2',
              IsDeleted: true
            }
          })
          expect(res).to.eql({
            'giles': 'test',
            loadDeleted: true,
            loadOrder: '-Id',
            'data': {
              TotalCount: 12,
              Values: [{
                Id: 'testId2',
                IsDeleted: true
              },
                {
                  Id: 'testId',
                  IsDeleted: true,
                  Prop: 'prop',
                  Name: 'giles'
                }]
            },
            singleData: undefined
          })
        })
      })
      describe('type: ENTITIES_UPDATE_POST', () => {

        let ENTITIES_UPDATE_POST

        beforeEach(() => {
          ENTITIES_UPDATE_POST = testModule.constants.ENTITIES_UPDATE_POST
        })

        it('reduced with type "ENTITIES_UPDATE_POST". adding new default order (Name)', () => {
          const state = {
            giles: 'test',
            loadOrder: 'Name',
            data: {
              TotalCount: 12,
              Values: [{
                Id: 'testId',
                Name: 'giles',
                Prop: 'prop'
              }]
            }
          }
          const res = reducer(state, {
            type: ENTITIES_UPDATE_POST,
            payload: {
              Id: 'testId1',
              Prop1: 'prop1',
              Name: 'fred2'
            }
          })
          expect(res).to.eql({
            'giles': 'test',
            loadOrder: 'Name',
            'data': {
              TotalCount: 13,
              Values: [{
                'Id': 'testId1',
                'Prop1': 'prop1',
                'Name': 'fred2'
              },
                {
                  'Id': 'testId',
                  'Name': 'giles',
                  Prop: 'prop'
                }]
            }
          })
        })

        it('reduced with type "ENTITIES_UPDATE_POST". adding new reverse order (-Name)', () => {
          const state = {
            giles: 'test',
            loadOrder: '-Name',
            data: {
              TotalCount: 12,
              Values: [{
                Id: 'testId',
                Name: 'giles',
                Prop: 'prop'
              }]
            }
          }
          const res = reducer(state, {
            type: ENTITIES_UPDATE_POST,
            payload: {
              Id: 'testId1',
              Prop1: 'prop1',
              Name: 'fred2'
            }
          })
          expect(res).to.eql({
            'giles': 'test',
            loadOrder: '-Name',
            'data': {
              TotalCount: 13,
              Values: [{
                'Id': 'testId',
                'Name': 'giles',
                Prop: 'prop'
              },
                {
                  'Id': 'testId1',
                  'Prop1': 'prop1',
                  'Name': 'fred2'
                }]
            }
          })

          it('reduced with type "ENTITIES_UPDATE_POST". posting existing', () => {
            const state = {
              giles: 'test',
              loadOrder: 'Whatever',
              data: {
                Values: [{
                  Id: 'testId',
                  Name: 'giles',
                  Prop: 'prop'
                }]
              }
            }
            const res = reducer(state, {
              type: ENTITIES_UPDATE_POST,
              payload: {
                Id: 'testId',
                Prop1: 'prop1',
                Name: 'fred2'
              }
            })
            expect(res).to.eql({
              'giles': 'test',
              loadOrder: 'Whatever',
              'data': {
                Values: [{
                  'Id': 'testId',
                  'Prop1': 'prop1',
                  'Name': 'fred2'
                }]
              }
            })
          })
        })
      })
      describe('type: ENTITIES_UPDATE_DELETE', () => {
        let ENTITIES_UPDATE_DELETE

        beforeEach(() => {
          ENTITIES_UPDATE_DELETE = testModule.constants.ENTITIES_UPDATE_DELETE
        })

        it('reduced with type "ENTITIES_UPDATE_DELETE".', () => {
          const state = {
            giles: 'test',
            data: {
              TotalCount: 2,
              Values: [
                {
                  Id: 'testId'
                }, {
                  Id: 'testId1'
                }
              ]
            }
          }
          const res = reducer(state, { type: ENTITIES_UPDATE_DELETE, id: 'testId' })
          expect(res).to.eql({
            'giles': 'test',
            'data': {
              TotalCount: 1,
              Values: [
                {
                  'Id': 'testId1'
                }
              ]
            }
          })
        })
      })
    })
    describe('ENTITY_UPDATE', ()=> {
      describe('type: ENTITY_UPDATE_PUT', () => {

        let ENTITY_UPDATE_PUT

        beforeEach(() => {
          ENTITY_UPDATE_PUT = testModule.constants.ENTITY_UPDATE_PUT
        })

        it('reduced with type "ENTITY_UPDATE_PUT".', () => {
          const state = {
            giles: 'test',
            singleData: {
              Id: 'testId',
              Prop: 'prop',
              Name: 'giles'
            }
          }
          const res = reducer(state, {
            type: ENTITY_UPDATE_PUT,
            payload: {
              Id: 'testId',
              Name: 'fred',
              Prop1: 'prop1'
            }
          })
          expect(res).to.eql({
            'giles': 'test',
            'singleData': {
              'Id': 'testId',
              'Name': 'fred',
              Prop: 'prop',
              Prop1: 'prop1'
            }
          })
        })
      })
      describe('type: ENTITY_UPDATE_DELETE', () => {

        let ENTITY_UPDATE_DELETE

        beforeEach(() => {
          ENTITY_UPDATE_DELETE = testModule.constants.ENTITY_UPDATE_DELETE
        })

        it('reduced with type "ENTITY_UPDATE_DELETE".', () => {
          const state = {
            giles: 'test',
            singleData: {
              Id: 'testId'
            }
          }
          const res = reducer(state, {
            type: ENTITY_UPDATE_DELETE,
            id: 'testId'
          })
          expect(res).to.eql({
            'giles': 'test',
            'singleData': null
          })
        })
      })
      describe('ENTITIES_DELETE', ()=> {
        describe('type: ENTITIES_DELETE_SUCCESS', () => {

          let ENTITIES_DELETE_SUCCESS

          beforeEach(() => {
            ENTITIES_DELETE_SUCCESS = testModule.constants.ENTITIES_DELETE_SUCCESS
          })

          it('reduced with type "ENTITIES_DELETE_SUCCESS".', () => {
            const state = {
              giles: 'test',
              saveProgress: {
                testId: 'progress'
              },
              data: {
                Values: [{
                  Id: 'testId'
                }, {
                    Id: 'testId1'
                  }]
              }
            }
            const res = reducer(state, {
              type: ENTITIES_DELETE_SUCCESS,
              id: 'testId'
            })
            expect(res).to.eql({
              'giles': 'test',
              saveProgress: {
                testId: null
              },
              deleting: {
                testId: false
              },
              'data': {
                Values: [{
                  'Id': 'testId1'
                }]
              }
            })
          })
        })
      })
      

      describe('type: ENTITIES_DELETE', () => {

        let ENTITIES_DELETE

        beforeEach(() => {
          ENTITIES_DELETE = testModule.constants.ENTITIES_DELETE
        })

        it('reduced with type "ENTITIES_DELETE".', () => {
          const state = {
            giles: 'test'
          }
          const res = reducer(state, {
            type: ENTITIES_DELETE,
            id: 'testId'
          })
          expect(res).to.eql({
            'giles': 'test',
            'deleting': {
              'testId': true
            }
          })
        })
      })
    })
    describe('ENTITIES_ADD', ()=> {
      describe('type: ENTITIES_ADD', () => {

        let add, ENTITIES_ADD

        beforeEach(() => {
          ENTITIES_ADD = testModule.constants.ENTITIES_ADD
          add = testModule.actions.add
        })

        it('add returns nodes add default id', () => {
          expect(add({parentId: 'pid'})).to.eql({
            type: ENTITIES_ADD,
            id: 'add',
            parentId: 'pid'
          })
        })
        it('add returns nodes add id', () => {
          expect(add({parentId: 'pid', id: -1})).to.eql({
            type: ENTITIES_ADD,
            id: -1,
            parentId: 'pid'
          })
        })
        
        it('reduced with type "ENTITIES_ADD". ', () => {
          const state = {
            giles: 'test',
            data: {
              Values: [{
                Id: 'testId',
                Name: 'giles',
                Prop: 'prop'
              }]
            }
          }
          const res = reducer(state, {
            type: ENTITIES_ADD,
            parentId: 'pid',
            id: 'add'
          })
          expect(res).to.eql({
            'giles': 'test',
            editing: {
              add: true
            },
            'data': {
              Values: [{
                Id: 'add',
                ParentId: 'pid',
                Name: '',
                isNew: true
              }, {
                  Id: 'testId',
                  Name: 'giles',
                  Prop: 'prop'
                }]
            }
          })
        })
      })

      describe('type: ENTITIES_ADD_SUCCESS', () => {

        let ENTITIES_ADD_SUCCESS

        beforeEach(() => {
          ENTITIES_ADD_SUCCESS = testModule.constants.ENTITIES_ADD_SUCCESS
        })

        it('reduced with type "ENTITIES_ADD_SUCCESS". ', () => {
          const state = {
            giles: 'test',
            data: {
              Values: [{
                Id: 'add',
                Name: 'giles',
                Prop: 'prop'
              }, {
                  Id: 'testId',
                  Name: 'giles',
                  Prop: 'prop'
                }]
            }
          }
          const res = reducer(state, { type: ENTITIES_ADD_SUCCESS, id: 'add' })
          
          expect(res).to.eql({
            'giles': 'test',
            editing: {
              add: false
            },
            saving: {
              add: false
            },
            saveProgress: {
              add: null
            },
            'data': {
              Values: [{
                Id: 'testId',
                Name: 'giles',
                Prop: 'prop'
              }
              ]
            }
          })
        })
      })
    })
  })
  describe('(Async Action Creators) Nodes', () => {
    let _globalState
    let _dispatchSpy
    let _getStateSpy
    let reducer
    const actions = {
      ofType: () => Rx.Observable.never()
    }

    beforeEach(() => {

      reducer = testModule.reducer

      _globalState = {
        nodes: reducer(undefined, {})
      }

      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
        nodes: reducer(_globalState.nodes, action)
        }
      })
  _getStateSpy = sinon.spy(() => {
    return _globalState
  })
})

describe('(Action Creator) load', () => {

  let load

  beforeEach(() => {
    load = testModule.actions.load
  })
  it('Should be exported as a function.', () => {
    expect(load).to.be.a('function')
  })

  it('Should return a function.', () => {
    expect(load({})).to.be.a('function')
  })
  describe('Operation', () => {

    let ENTITIES_LOAD,
      ENTITIES_LOAD_SUCCESS,
      ENTITIES_LOAD_PROGRESS,
      ENTITIES_LOAD_FAIL,
      ENTITIES_UPDATE_PUT,
      ENTITIES_UPDATE_POST,
      ENTITIES_UPDATE_DELETE,
      joinMessages,
      joinSpy,
      signalR,
      apiClient

    beforeEach(() => {
      ENTITIES_LOAD = testModule.constants.ENTITIES_LOAD
      ENTITIES_LOAD_SUCCESS = testModule.constants.ENTITIES_LOAD_SUCCESS
      ENTITIES_LOAD_PROGRESS = testModule.constants.ENTITIES_LOAD_PROGRESS
      ENTITIES_LOAD_FAIL = testModule.constants.ENTITIES_LOAD_FAIL
      ENTITIES_UPDATE_PUT = testModule.constants.ENTITIES_UPDATE_PUT
      ENTITIES_UPDATE_POST = testModule.constants.ENTITIES_UPDATE_POST
      ENTITIES_UPDATE_DELETE = testModule.constants.ENTITIES_UPDATE_DELETE
      joinMessages = new Rx.Subject()
      joinSpy = sinon.spy(() => Rx.Observable.of(joinMessages))
      signalR = () => Rx.Observable.of({ join: joinSpy })

      apiClient = {
        get: sinon.spy(() => Rx.Observable.from([
          { progress: 'progress' },
          { result: 'giles' }
        ]))
      }
    })
    describe('getLoadHasChanged.returns(true)', () => {
      beforeEach(() => {
        getLoadHasChanged.returns(true)
      })
      it('join signalR and call api', function* () {
        getLoadDefaults.returns({ default: 'testGetDefaults' })
        getJoinId.returns('test join Id')

        const iter = load({ giles: 'giles' })({ signalR, apiClient })(actions, {
          dispatch: _dispatchSpy,
          getState: _getStateSpy
        }).toAsyncIterator()
        expect(getLoadDefaults.getCall(0).args[0]).to.eql({ giles: 'giles', isDeleted: undefined })

        getLoadPath.returns('testLoadPath')
        expect(yield iter.nextValue()).to.eql({
          type: ENTITIES_LOAD,
          payload: {
            default: 'testGetDefaults'
          }
        })
        expect(yield iter.nextValue())
          .to.eql({
            type: ENTITIES_LOAD_PROGRESS,
            'payload': 'progress'
          })
        expect(yield iter.nextValue())
          .to.eql({
            type: ENTITIES_LOAD_SUCCESS,
            'payload': 'giles'
          })

        expect(apiClient.get.getCall(0).args[0]).to.equal('testLoadPath')
        expect(getJoinId.getCall(0).args[0]).to.eql({ giles: 'giles', isDeleted: undefined })
        expect(joinSpy.getCall(0).args[0]).to.equal('test join Id')


        iter.unsubscribe()
      })

      it('Should return an observable that operates with put post and delete events.', function* () {

        const iter = load({})({ signalR, apiClient })(actions, {
          dispatch: _dispatchSpy,
          getState: _getStateSpy
        }).toAsyncIterator()

        yield iter.nextValue()
        yield iter.nextValue()
        yield iter.nextValue()

        joinMessages.next({
          message: {
            method: 'put',
            value: 'putValue'
          }
        })
        joinMessages.next({
          message: {
            method: 'post',
            value: 'postValue'
          }
        })
        joinMessages.next({
          message: {
            method: 'delete',
            id: 'deleteValue'
          }
        })

        expect(yield iter.nextValue()).to.eql({
          type: ENTITIES_UPDATE_PUT,
          payload: 'putValue'
        })
        expect(yield iter.nextValue()).to.eql({
          type: ENTITIES_UPDATE_POST,
          payload: 'postValue'
        })
        expect(yield iter.nextValue()).to.eql({
          type: ENTITIES_UPDATE_DELETE,
          id: 'deleteValue'
        })

        iter.unsubscribe()
      })


      it('Should play all notifications since api called.', function* () {

        const signalR = () => Rx.Observable.of({
          join: () => Rx.Observable.of(Rx.Observable.of(
            { message: { method: 'post', value: 'postValue' } },
            { message: { method: 'put', value: 'putValue' } },
            { message: { method: 'delete', id: 'deleteValue' } }
          ))
        })

        const apiClient = {
          get: sinon.spy(() => Rx.Observable.from([
            { progress: 'progress' },
            { result: 'giles' }
          ]).delay(100))
        }
        const iter = load({})({ signalR, apiClient })(actions, {
          dispatch: _dispatchSpy,
          getState: _getStateSpy
        }).toAsyncIterator()

        yield iter.nextValue()
        yield iter.nextValue()
        yield iter.nextValue()

        //yield iter.nextValue()
        const v1 = yield iter.nextValue()
        const v2 = yield iter.nextValue()
        const v3 = yield iter.nextValue()

        expect(v1).to.eql({
          type: ENTITIES_UPDATE_POST,
          payload: 'postValue'
        })

        expect(v2).to.eql({
          type: ENTITIES_UPDATE_PUT,
          payload: 'putValue'
        })
        expect(v3).to.eql({
          type: ENTITIES_UPDATE_DELETE,
          id: 'deleteValue'
        })


        iter.unsubscribe()
      })

      it('Should pass an async test.', function* (done) {

        setTimeout(done, 100)
      })

      it('Should return an observable that retries on signalR fail.', function* (done) {
        const signalR = sinon.spy(() => Rx.Observable.throw())
        const iter = load({})({ signalR })(actions, {
          dispatch: _dispatchSpy,
          getState: _getStateSpy
        }).toAsyncIterator()

        yield iter.nextValue()

        setTimeout(function () {
          expect(signalR.callCount).to.equal(2)
          iter.unsubscribe()
          setTimeout(function () {
            expect(signalR.callCount).to.equal(2)
            done()
          }, 10)
        }, 7)
        yield iter.nextValue()
      })
      it('Should return an observable that retries on signalR join fail.', function* (done) {
        const join = sinon.spy(() => Rx.Observable.throw())
        const signalR = sinon.spy(() => Rx.Observable.of({ join }))
        const iter = load({})({ signalR })(actions, {
          dispatch: _dispatchSpy,
          getState: _getStateSpy
        }).toAsyncIterator()
        yield iter.nextValue()
        setTimeout(function () {
          expect(signalR.callCount).to.equal(1)
          expect(join.callCount).to.equal(2)
          iter.unsubscribe()
          setTimeout(function () {
            expect(signalR.callCount).to.equal(1)
            expect(join.callCount).to.equal(2)
            done()
          }, 10)
        }, 7)
        yield iter.nextValue()
      })
      it('Should return an observable that operates on fail.', function* () {
        const joinMessages = new Rx.Subject()
        const signalR = () => Rx.Observable.of({
          join: () => Rx.Observable.of(joinMessages),

        })

        const apiClient = {
          get: sinon.spy(() => Rx.Observable.throw('giles'))
        }
        const iter = load({})({ signalR, apiClient })(actions, {
          dispatch: _dispatchSpy,
          getState: _getStateSpy
        }).toAsyncIterator()

        yield iter.nextValue()

        expect(yield iter.nextValue()).to.eql({ 'type': ENTITIES_LOAD_FAIL, 'payload': 'giles' })

        yield iter.shouldComplete()

        iter.unsubscribe()
      })
    })
    describe('getLoadHasChanged.returns(true)', () => {
      beforeEach(() => {
        getLoadHasChanged.returns(false)
      })
      it('completes', function* () {
        getLoadDefaults.returns({ default: 'testGetDefaults' })
        getJoinId.returns('test join Id')

        const iter = load({ giles: 'giles' })({ signalR, apiClient })(actions, {
          dispatch: _dispatchSpy,
          getState: _getStateSpy
        }).toAsyncIterator()
        expect(getLoadDefaults.getCall(0).args[0]).to.eql({ giles: 'giles', isDeleted: undefined })
        yield iter.shouldComplete()
      })
    })
  })
})

describe('(Action Creator) loadMore', () => {
  let loadMore

  beforeEach(() => {
    loadMore = testModule.actions.loadMore
  })

  it('Should be exported as a function.', () => {
    expect(loadMore).to.be.a('function')
  })

  it('Should return a function.', () => {
    expect(loadMore({})).to.be.a('function')
  })
  describe('Operation', () => {

    let ENTITIES_LOAD_MORE,
      ENTITIES_LOAD_MORE_SUCCESS,
      ENTITIES_LOAD_MORE_PROGRESS,
      ENTITIES_LOAD_MORE_FAIL,
      apiClient

    beforeEach(() => {
      ENTITIES_LOAD_MORE = testModule.constants.ENTITIES_LOAD_MORE
      ENTITIES_LOAD_MORE_SUCCESS = testModule.constants.ENTITIES_LOAD_MORE_SUCCESS
      ENTITIES_LOAD_MORE_PROGRESS = testModule.constants.ENTITIES_LOAD_MORE_PROGRESS
      ENTITIES_LOAD_MORE_FAIL = testModule.constants.ENTITIES_LOAD_MORE_FAIL

      apiClient = {
        get: sinon.spy(() => Rx.Observable.from([
          { progress: 'progress' },
          { result: 'giles' }
        ]))
      }
    })

    it('should call api', function* () {
      getLoadDefaults.returns({ default: 'testGetDefaults' })
      getLoadPath.returns('testLoadPath')

      const iter = loadMore('testLoadConfig')({ apiClient })(actions, {
        dispatch: _dispatchSpy,
        getState: _getStateSpy
      }).toAsyncIterator()
      expect(getLoadDefaults.getCall(0).args[0]).to.equal('testLoadConfig')

      expect(yield iter.nextValue()).to.eql({
        type: ENTITIES_LOAD_MORE
      })
      expect(yield iter.nextValue()).to.eql({
        type: ENTITIES_LOAD_MORE_PROGRESS,
        'payload': 'progress'
      })
      expect(yield iter.nextValue())
        .to.eql({
          type: ENTITIES_LOAD_MORE_SUCCESS,
          'payload': 'giles'
        })

      expect(apiClient.get.getCall(0).args[0]).to.equal('testLoadPath')

      iter.unsubscribe()
    })
  })
})

describe('(Action Creator) loadSingle', () => {
  let loadSingle
  beforeEach(() => {
    loadSingle = testModule.actions.loadSingle
  })
  it('Should be exported as a function.', () => {
    expect(loadSingle).to.be.a('function')
  })

  it('Should return a function.', () => {
    expect(loadSingle()).to.be.a('function')
  })
  describe('getLoadSingleHasChanged false', () => {

    beforeEach(() => {
      getLoadSingleHasChanged.returns(false)
    })

    it('Should return an empty observable', function* () {

      const iter = loadSingle('id')({ signalR: null, apiClient: null })(actions, {
        dispatch: _dispatchSpy,
        getState: _getStateSpy
      }).toAsyncIterator()

      yield iter.shouldComplete()

      iter.unsubscribe()

    })
  })
  describe('getLoadSingleHasChanged true', () => {

    beforeEach(() => {
      getLoadSingleHasChanged.returns(true)
    })

    it('Should return an observable that operates.', function* () {
      const joinMessages = new Rx.Subject()

      const signalR = () => Rx.Observable.of({
        join: () => Rx.Observable.of(joinMessages),

      })

      const apiClient = {
        get: sinon.spy(() => Rx.Observable.from([
          { progress: 'progress' },
          { result: 'giles' }
        ]))
      }

      getJoinSingleId.returns('test me')
      getSinglePath.returns('test me 2')

      const iter = loadSingle('id')({ signalR, apiClient })(actions, {
        dispatch: _dispatchSpy,
        getState: _getStateSpy
      }).toAsyncIterator()


      expect(yield iter.nextValue()).to.eql({
        type: testModule.constants.ENTITY_LOAD,
        payload: 'id'
      })

      expect(yield iter.nextValue())
        .to.eql({
          type: testModule.constants.ENTITY_LOAD_PROGRESS,
          payload: {
            id: 'id',
            progress: 'progress'
          }  
        })

      expect(yield iter.nextValue()).to.eql({
        type: testModule.constants.ENTITY_LOAD_SUCCESS,
        payload: 'giles'
      })

      expect(apiClient.get.getCall(0).args[0]).to.equal('test me 2')
      expect(getSinglePath.getCall(0).args[0]).to.equal('id')
      joinMessages.next({
        message: {
          method: 'put',
          value: 'putValue'
        }
      })
      joinMessages.next({
        message: {
          method: 'delete',
          id: 'deleteValue'
        }
      })

      expect(yield iter.nextValue()).to.eql({
        'type': testModule.constants.ENTITY_UPDATE_PUT,
        'payload': 'putValue'
      })

      expect(yield iter.nextValue()).to.eql({
        'type': testModule.constants.ENTITY_UPDATE_DELETE,
        'id': 'deleteValue'
      })

      iter.unsubscribe()
    })
    it('Should return an observable that retries on signalR fail.', function* (done) {
      const signalR = sinon.spy(() => {
        return Rx.Observable.throw()
      })
      const iter = loadSingle('testId')({ signalR })(actions, {
        dispatch: _dispatchSpy,
        getState: _getStateSpy
      }).toAsyncIterator()

      yield iter.nextValue()

      setTimeout(function () {
        expect(signalR.callCount).to.equal(2)
        iter.unsubscribe()
        setTimeout(function () {
          expect(signalR.callCount).to.equal(2)
          done()
        }, 10)
      }, 7)
      yield iter.nextValue()
    })
    it('Should return an observable that retries on signalR join fail.', function* (done) {
      const join = sinon.spy(() => Rx.Observable.throw())
      const signalR = sinon.spy(() => Rx.Observable.of({ join }))
      const iter = loadSingle('testId')({ signalR })(actions, {
        dispatch: _dispatchSpy,
        getState: _getStateSpy
      }).toAsyncIterator()
      yield iter.nextValue()
      setTimeout(function () {
        expect(signalR.callCount).to.equal(1)
        expect(join.callCount).to.equal(2)
        iter.unsubscribe()
        setTimeout(function () {
          expect(signalR.callCount).to.equal(1)
          expect(join.callCount).to.equal(2)
          done()
        }, 10)
      }, 7)
      yield iter.nextValue()
    })

    it('Should join correct SignalR group', function* () {
      const joinMessages = new Rx.Subject()
      const joinResult = {
        join: sinon.spy(() => Rx.Observable.of(joinMessages)),

      }
      const signalR = () => Rx.Observable.of(joinResult)
      getJoinSingleId.returns('test me')
      const apiClient = {
        get: () => Rx.Observable.from([
          { progress: 'progress' },
          { result: 'giles' }
        ])
      }
      const iter = loadSingle('testid')({ signalR, apiClient })(actions, {
        dispatch: _dispatchSpy,
        getState: _getStateSpy
      }).toAsyncIterator()
      yield iter.nextValue()
      yield iter.nextValue()
      expect(getJoinSingleId.getCall(0).args[0]).to.equal('testid')
      expect(joinResult.join.getCall(0).args[0]).to.equal('test me')


      iter.unsubscribe()
    })
    it('Should play all notifications since api called.', function* () {
      const signalR = () => Rx.Observable.of({
        join: () => Rx.Observable.of(Rx.Observable.of(
          { message: { method: 'put', value: 'putValue' } },
          { message: { method: 'delete', id: 'deleteValue' } }
        )),

      })

      const apiClient = {
        get: sinon.spy(() => Rx.Observable.from([
          { progress: 'progress' },
          { result: 'giles' }
        ]).delay(100))
      }
      getSinglePath.returns('testPath')
      const iter = loadSingle('testId')({ signalR, apiClient })(actions, {
        dispatch: _dispatchSpy,
        getState: _getStateSpy
      }).toAsyncIterator()

      yield iter.nextValue()
      yield iter.nextValue()
      yield iter.nextValue()

      expect(yield iter.nextValue()).to.eql({ 'type': testModule.constants.ENTITY_UPDATE_PUT, 'payload': 'putValue' })
      expect(yield iter.nextValue()).to.eql({ 'type': testModule.constants.ENTITY_UPDATE_DELETE, 'id': 'deleteValue' })


      iter.unsubscribe()
    })
  })
})

describe('(Action Creator) save', () => {
  let save
  beforeEach(() => {
    save = testModule.actions.save
  })

  it('Should be exported as a function.', () => {
    expect(save).to.be.a('function')
  })

  it('Should return a function.', () => {
    expect(save({})).to.be.a('function')
  })

  it('Should return an observable that operates when put.', function* () {

    const apiClient = {
      put: sinon.spy(() => Rx.Observable.from([
        { progress: 'progress' },
        { result: 'giles' }
      ]))
    }
    getPutPath.returns('test put path')
    const iter = save({
      values: {
        Id: 'testId'
      },
      files: 'files'

    })({ apiClient })(undefined, {
      dispatch: _dispatchSpy,
      getState: _getStateSpy
    }).toAsyncIterator()
    expect(getPutPath.getCall(0).args[0]).to.eql({ Id: 'testId' })
    expect(apiClient.put.getCall(0).args[0]).to.equal('test put path')
    expect(apiClient.put.getCall(0).args[1]).to.eql({ data: { Id: 'testId' } })
    expect(apiClient.put.getCall(0).args[2]).to.equal('files')

    expect(yield iter.nextValue()).to.eql({
      type: testModule.constants.ENTITIES_SAVE,
      values: {
        Id: 'testId'
      }
    })
    expect(yield iter.nextValue())
      .to.eql({
       type: testModule.constants.ENTITIES_SAVE_PROGRESS,
       payload: {
         id: 'testId',
         progress: 'progress'
       }
      })

    expect(yield iter.nextValue()).to.eql({
      type: testModule.constants.ENTITIES_SAVE_SUCCESS,
      id: 'testId',
      keepEditing: undefined
    })

    yield iter.shouldComplete()

    iter.unsubscribe()
  })
  it('Should return an observable that operates when put. keepEditing = true', function* () {

    const apiClient = {
      put: sinon.spy(() => Rx.Observable.from([
        { progress: 'progress' },
        { result: 'giles' }
      ]))
    }
    getPutPath.returns('test put path')
    const iter = save({
      values: {
        Id: 'testId'
      },
      keepEditing: true
    })({ apiClient })(undefined, {
      dispatch: _dispatchSpy,
      getState: _getStateSpy
    }).toAsyncIterator()

    expect(getPutPath.getCall(0).args[0]).to.eql({ Id: 'testId' })
    expect(apiClient.put.getCall(0).args[0]).to.equal('test put path')

    expect(apiClient.put.getCall(0).args[1]).to.eql({ data: { Id: 'testId' } })
    expect(yield iter.nextValue()).to.eql({
      type: testModule.constants.ENTITIES_SAVE,
      values: {
        Id: 'testId'
      }
    })
    expect(yield iter.nextValue())
      .to.eql({
       type: testModule.constants.ENTITIES_SAVE_PROGRESS,
       payload: {
         id: 'testId',
         progress: 'progress'
       }
      })
    expect(yield iter.nextValue()).to.eql({
      type: testModule.constants.ENTITIES_SAVE_SUCCESS,
      id: 'testId',
      keepEditing: true
    })

    yield iter.shouldComplete()

    iter.unsubscribe()
  })
  it('Should return an observable that operates when post.', function* () {
    const apiClient = {
      post: sinon.spy(() => Rx.Observable.from([
        { progress: 'progress' },
        { result: 'giles' }
      ]))
    }
    postConvert.returns('post converted')
    getPostPath.returns('post path')
    const iter = save({
      values: {
        Id: 'testId',
        isNew: true
      },
      files: 'files'
    })({ apiClient })(undefined, {
      dispatch: _dispatchSpy,
      getState: _getStateSpy
    }).toAsyncIterator()

    expect(postConvert.getCall(0).args[0]).to.eql({
      Id: 'testId',
      isNew: true
    })
    expect(getPostPath.getCall(0).args[0]).to.eql({
      Id: 'testId',
      isNew: true
    })

    expect(apiClient.post.getCall(0).args[0]).to.equal('post path')
    expect(apiClient.post.getCall(0).args[1]).to.eql({ data: 'post converted' })
    expect(apiClient.post.getCall(0).args[2]).to.eql('files')
    expect(yield iter.nextValue()).to.eql({
      type: testModule.constants.ENTITIES_SAVE,
      values: {
        Id: 'testId',
        isNew: true
        }
      })
    
    
    expect(yield iter.nextValue())
      .to.eql({
       type: testModule.constants.ENTITIES_SAVE_PROGRESS,
       payload: {
         id: 'testId',
         progress: 'progress'
       }
      })
    
    expect(yield iter.nextValue()).to.eql({
      type: testModule.constants.ENTITIES_ADD_SUCCESS,
      id: 'testId'
    })

    yield iter.shouldComplete()

    iter.unsubscribe()

    // Will throw if error or complete are produced.
    // expect(yield iter.nextValue()).to.equal(45)  
  })
})


describe('(Action Creator) upload', () => {
  let upload
  beforeEach(() => {
    upload = testModule.actions.upload
  })

  it('Should be exported as a function.', () => {
    expect(upload).to.be.a('function')
  })
  it('Should return a function.', () => {
    expect(upload({})).to.be.a('function')
  })
  
  it('Should return an observable that operates when put.', function* () {

    const apiClient = {
      put: sinon.spy(() => Rx.Observable.from([
        { progress: 'progress' },
        { result: 'giles' }
      ]))
    }
    getUploadPutPath.returns('test put path')
    const iter = upload({
      uploadType: 'uploadType',
      values: {
        Id: 'testId'
      },
      files: 'files'

    })({ apiClient })(undefined, {
      dispatch: _dispatchSpy,
      getState: _getStateSpy
    }).toAsyncIterator()
    expect(getUploadPutPath.getCall(0).args[0]).to.eql({ Id: 'testId' })
    expect(getUploadPutPath.getCall(0).args[1]).to.eql('uploadType')
    expect(apiClient.put.getCall(0).args[0]).to.equal('test put path')
    expect(apiClient.put.getCall(0).args[1]).to.eql({ data: { Id: 'testId' } })
    expect(apiClient.put.getCall(0).args[2]).to.equal('files')
    expect(yield iter.nextValue()).to.eql({
      type: testModule.constants.ENTITIES_UPLOAD,
      payload: {
        uploadType: 'uploadType',
        values: {
          Id: 'testId'
        },
        files: 'files'
      }
    })
    expect(yield iter.nextValue())
      .to.eql({
        type: testModule.constants.ENTITIES_UPLOAD_PROGRESS,
        payload: {
          values: {
            Id: 'testId'
          },
          uploadType: 'uploadType',
          files: 'files',
          progress: 'progress'
        }
      })
    expect(yield iter.nextValue()).to.eql({
      type: testModule.constants.ENTITIES_UPLOAD_SUCCESS,
      payload: {
        uploadType: 'uploadType',
        values: {
          Id: 'testId'
        }
      }
    })

    yield iter.shouldComplete()

    iter.unsubscribe()
  })
  it('Should return an observable that operates when post.', function* () {
    const apiClient = {
      post: sinon.spy(() => Rx.Observable.from([
        { progress: 'progress' },
        { result: 'giles' }
      ]))
    }
    postConvert.returns('post converted')
    getUploadPostPath.returns('post path')
    const iter = upload({
      uploadType: 'uploadType',
      values: {
        Id: 'testId',
        isNew: true
      },
      files: 'files'
    })({ apiClient })(undefined, {
      dispatch: _dispatchSpy,
      getState: _getStateSpy
    }).toAsyncIterator()

    expect(postConvert.getCall(0).args[0]).to.eql({
      Id: 0,
      isNew: true
    })
    expect(getUploadPostPath.getCall(0).args[0]).to.eql({
      Id: 'testId',
      isNew: true
    })
    expect(getUploadPostPath.getCall(0).args[1]).to.eql('uploadType')

    expect(apiClient.post.getCall(0).args[0]).to.equal('post path')
    expect(apiClient.post.getCall(0).args[1]).to.eql({ data: 'post converted' })
    expect(apiClient.post.getCall(0).args[2]).to.eql('files')
    expect(yield iter.nextValue()).to.eql({
      type: testModule.constants.ENTITIES_UPLOAD,
      payload: {
        uploadType: 'uploadType',
        values: {
          Id: 'testId',
          isNew: true
        },
        files: 'files'
      }
    })
    expect(yield iter.nextValue())
      .to.eql({
        type: testModule.constants.ENTITIES_UPLOAD_PROGRESS,
        payload: {
          values: {
            Id: 'testId',
            isNew: true
          },
          uploadType: 'uploadType',
          progress: 'progress',
          files: 'files'
        }
      })
    expect(yield iter.nextValue()).to.eql({
      type: testModule.constants.ENTITIES_UPLOAD_SUCCESS,
      payload: {
        uploadType: 'uploadType',
        values: {
          Id: 'testId',
          isNew: true
        },
        files: 'files'
      }
    })

    yield iter.shouldComplete()

    iter.unsubscribe()

    // Will throw if error or complete are produced.
    // expect(yield iter.nextValue()).to.equal(45)  
  })
})



describe('(Action Creator) uploadErrorCancel', () => {

  let uploadErrorCancel, ENTITIES_UPLOAD_FAIL_CANCEL

  beforeEach(() => {
    uploadErrorCancel = testModule.actions.uploadErrorCancel
    ENTITIES_UPLOAD_FAIL_CANCEL = testModule.constants.ENTITIES_UPLOAD_FAIL_CANCEL
  })

  it('Should be exported as a function.', () => {
    expect(uploadErrorCancel).to.be.a('function')
  })

  it('Should return correct action.', () => {
    expect(uploadErrorCancel('testid', 'uploadType')).to.be.eql({
      type: ENTITIES_UPLOAD_FAIL_CANCEL,
      payload: {
        id: 'testid',
        uploadType: 'uploadType'
      }
    })
  })
})



describe('(Action Creator) saveErrorCancel', () => {

  let saveErrorCancel, ENTITIES_SAVE_FAIL_CANCEL

  beforeEach(() => {
    saveErrorCancel = testModule.actions.saveErrorCancel
    ENTITIES_SAVE_FAIL_CANCEL = testModule.constants.ENTITIES_SAVE_FAIL_CANCEL
  })

  it('Should be exported as a function.', () => {
    expect(saveErrorCancel).to.be.a('function')
  })

  it('Should return correct action.', () => {
    expect(saveErrorCancel('testid')).to.be.eql({
      type: ENTITIES_SAVE_FAIL_CANCEL,
      id: 'testid'
    })
  })
})

describe('(Action Creator) loadErrorCancel', () => {

  let loadErrorCancel, ENTITIES_LOAD_FAIL_CANCEL

  beforeEach(() => {
    loadErrorCancel = testModule.actions.loadErrorCancel
    ENTITIES_LOAD_FAIL_CANCEL = testModule.constants.ENTITIES_LOAD_FAIL_CANCEL
  })

  it('Should be exported as a function.', () => {
    expect(loadErrorCancel).to.be.a('function')
  })

  it('Should return correct action.', () => {
    expect(loadErrorCancel()).to.be.eql({
      type: ENTITIES_LOAD_FAIL_CANCEL
    })
  })
})

describe('(Action Creator) singleLoadErrorCancel', () => {

  let singleLoadErrorCancel, ENTITY_LOAD_FAIL_CANCEL

  beforeEach(() => {
    singleLoadErrorCancel = testModule.actions.singleLoadErrorCancel
    ENTITY_LOAD_FAIL_CANCEL = testModule.constants.ENTITY_LOAD_FAIL_CANCEL
  })

  it('Should be exported as a function.', () => {
    expect(singleLoadErrorCancel).to.be.a('function')
  })

  it('Should return correct action.', () => {
    expect(singleLoadErrorCancel()).to.be.eql({
      type: ENTITY_LOAD_FAIL_CANCEL
    })
  })
})

describe('(Action Creator) remove', () => {
  let remove

  beforeEach(() => {
    remove = testModule.actions.remove
  })

  it('Should be exported as a function.', () => {
    expect(remove).to.be.a('function')
  })

  it('Should return a function.', () => {
    expect(remove()).to.be.a('function')
  })

  it('Should return an observable that operates.', function* () {

    const apiClient = {
      del: sinon.spy(() => Rx.Observable.from([
        { progress: 'progress' },
        { result: 'giles' }
      ]))
    }
    getDeletePath.returns('test delete path')
    const iter = remove('testId')({ apiClient })(undefined, {
      dispatch: _dispatchSpy,
      getState: _getStateSpy
    }).toAsyncIterator()

    expect(getDeletePath.getCall(0).args[0]).to.equal('testId')
    expect(apiClient.del.getCall(0).args[0]).to.equal('test delete path')

    expect(yield iter.nextValue()).to.eql({
      'type': testModule.constants.ENTITIES_DELETE,
      'id': 'testId'
    })
    expect(yield iter.nextValue())
      .to.eql({
        type: testModule.constants.ENTITIES_SAVE_PROGRESS,
        payload: {
          id: 'testId',
          progress: 'progress'
        }
      })


    expect(yield iter.nextValue()).to.eql({
      'type': testModule.constants.ENTITIES_DELETE_SUCCESS,
      'id': 'testId'
    })


    yield iter.shouldComplete()

    iter.unsubscribe()
  })
})
  })
})
