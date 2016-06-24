import { configureModule, entityModule } from 'modules/entity'

require('co-mocha')

require('./rxjs-to-async-iterator')

const Rx = require('rxjs')


/// to do - entities save error


    
describe('(Redux Module) Nodes', () => {
  let testModule
  let getJoinId,
    getJoinSingleId,
    getLoadDefaults,
    getLoadPath,
    getSinglePath,
    getPostPath,
    getPutPath,
    getDeletePath,
    postConvert
  beforeEach(()=>{
    getJoinId = sinon.stub()
    getJoinSingleId = sinon.stub()
    getLoadDefaults = sinon.stub()
    getLoadPath = sinon.stub()
    getSinglePath = sinon.stub()
    getPostPath = sinon.stub()
    getPutPath = sinon.stub()
    getDeletePath = sinon.stub()
    postConvert = sinon.stub()

    configureModule({
      name: 'TESTMODULE',
      getJoinId,
      getJoinSingleId,
      getLoadDefaults,
      getLoadPath,
      getSinglePath,
      getPostPath,
      getPutPath,
      getDeletePath,
      postConvert
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
        ENTITIES_LOAD_SUCCESS,
        ENTITIES_LOAD_FAIL,
        ENTITIES_LOAD_FAIL_CANCEL,

        ENTITIES_LOAD_MORE,
        ENTITIES_LOAD_MORE_SUCCESS,
        ENTITIES_LOAD_MORE_FAIL,

        ENTITY_UPDATE_PUT,
        ENTITY_UPDATE_DELETE,

        ENTITY_LOAD,
        ENTITY_LOAD_SUCCESS,
        ENTITY_LOAD_FAIL,
        ENTITY_LOAD_FAIL_CANCEL,
        ENTITY_RESET,

        ENTITIES_RESET,
        ENTITIES_INIT,

        ENTITIES_EDIT_START,
        ENTITIES_EDIT_STOP,

        ENTITIES_SAVE,
        ENTITIES_SAVE_SUCCESS,
        ENTITIES_SAVE_FAIL,

        ENTITIES_ADD,
        ENTITIES_ADD_SUCCESS,

        ENTITIES_DELETE,
        ENTITIES_DELETE_SUCCESS,
        ENTITIES_DELETE_FAIL
      }
    } = testModule

    expect(ENTITIES_UPDATE_PUT).to.equal('react-dealerweb/ENTITIES_UPDATE_PUT:TESTMODULE')
    expect(ENTITIES_UPDATE_POST).to.equal('react-dealerweb/ENTITIES_UPDATE_POST:TESTMODULE')
    expect(ENTITIES_UPDATE_DELETE).to.equal('react-dealerweb/ENTITIES_UPDATE_DELETE:TESTMODULE')

    expect(ENTITIES_LOAD).to.equal('react-dealerweb/ENTITIES_LOAD:TESTMODULE')
    expect(ENTITIES_LOAD_SUCCESS).to.equal('react-dealerweb/ENTITIES_LOAD_SUCCESS:TESTMODULE')
    expect(ENTITIES_LOAD_FAIL).to.equal('react-dealerweb/ENTITIES_LOAD_FAIL:TESTMODULE')
    expect(ENTITIES_LOAD_FAIL_CANCEL).to.equal('react-dealerweb/ENTITIES_LOAD_FAIL_CANCEL:TESTMODULE')
    expect(ENTITIES_RESET).to.equal('react-dealerweb/ENTITIES_RESET:TESTMODULE')

    expect(ENTITIES_LOAD_MORE).to.equal('react-dealerweb/ENTITIES_LOAD_MORE:TESTMODULE')
    expect(ENTITIES_LOAD_MORE_SUCCESS).to.equal('react-dealerweb/ENTITIES_LOAD_MORE_SUCCESS:TESTMODULE')
    expect(ENTITIES_LOAD_MORE_FAIL).to.equal('react-dealerweb/ENTITIES_LOAD_MORE_FAIL:TESTMODULE')

    expect(ENTITY_UPDATE_PUT).to.equal('react-dealerweb/ENTITY_UPDATE_PUT:TESTMODULE')
    expect(ENTITY_UPDATE_DELETE).to.equal('react-dealerweb/ENTITY_UPDATE_DELETE:TESTMODULE')

    expect(ENTITY_LOAD).to.equal('react-dealerweb/ENTITY_LOAD:TESTMODULE')
    expect(ENTITY_LOAD_SUCCESS).to.equal('react-dealerweb/ENTITY_LOAD_SUCCESS:TESTMODULE')
    expect(ENTITY_LOAD_FAIL).to.equal('react-dealerweb/ENTITY_LOAD_FAIL:TESTMODULE')
    expect(ENTITY_LOAD_FAIL_CANCEL).to.equal('react-dealerweb/ENTITY_LOAD_FAIL_CANCEL:TESTMODULE')
    expect(ENTITY_RESET).to.equal('react-dealerweb/ENTITY_RESET:TESTMODULE')
    expect(ENTITIES_INIT).to.equal('react-dealerweb/ENTITIES_INIT:TESTMODULE')

    expect(ENTITIES_EDIT_START).to.equal('react-dealerweb/ENTITIES_EDIT_START:TESTMODULE')
    expect(ENTITIES_EDIT_STOP).to.equal('react-dealerweb/ENTITIES_EDIT_STOP:TESTMODULE')

    expect(ENTITIES_SAVE).to.equal('react-dealerweb/ENTITIES_SAVE:TESTMODULE')
    expect(ENTITIES_SAVE_SUCCESS).to.equal('react-dealerweb/ENTITIES_SAVE_SUCCESS:TESTMODULE')
    expect(ENTITIES_SAVE_FAIL).to.equal('react-dealerweb/ENTITIES_SAVE_FAIL:TESTMODULE')

    expect(ENTITIES_ADD).to.equal('react-dealerweb/ENTITIES_ADD:TESTMODULE')
    expect(ENTITIES_ADD_SUCCESS).to.equal('react-dealerweb/ENTITIES_ADD_SUCCESS:TESTMODULE')

    expect(ENTITIES_DELETE).to.equal('react-dealerweb/ENTITIES_DELETE:TESTMODULE')
    expect(ENTITIES_DELETE_SUCCESS).to.equal('react-dealerweb/ENTITIES_DELETE_SUCCESS:TESTMODULE')
    expect(ENTITIES_DELETE_FAIL).to.equal('react-dealerweb/ENTITIES_DELETE_FAIL:TESTMODULE')
  })
  
  describe('(Reducer)', () => {
    let reducer
    
    beforeEach(() => reducer = testModule.reducer)
    
    it('Should be a function.', () => {
      expect(reducer).to.be.a('function')
    })

    it('Should initialize with an initial state.', () => {
      expect(reducer(undefined, {})).to.eql({loadOrder: 'Name', loadDeleted: 'false'})
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = reducer(undefined, {})
      let initial = {giles: 'giles'}
      state = reducer(initial, {type: '@@@@@@@'})
      expect(state).to.eql(initial)     
    })
  })
  describe('types', () => {
    
    let reducer 
    
    beforeEach(() => {
      reducer = testModule.reducer
    })
    
    describe('type: ENTITIES_RESET', () => {
      let reset, ENTITIES_RESET
    
      beforeEach(() => {
        ENTITIES_RESET = testModule.constants.ENTITIES_RESET
        reset = testModule.actions.reset  
      })
        
      it('reset returns RESET type', () => {
        expect(reset()).to.eql({type: ENTITIES_RESET})
      })
      it('Should be reduced with type ENTITIES_RESET.', () => {
        const res = reducer({giles: 'test'}, {type: ENTITIES_RESET})
        expect(res).to.eql({giles: 'test'})
      })
    }) 
    describe('type: ENTITIES_EDIT_START', () => {
      
      let editStart, ENTITIES_EDIT_START
    
      beforeEach(() => {
        ENTITIES_EDIT_START = testModule.constants.ENTITIES_EDIT_START
        editStart = testModule.actions.editStart 
      })
    
      it('editStart returns ENTITIES_EDIT_START type', () => {
        expect(editStart('testme')).to.eql({type: ENTITIES_EDIT_START, id: 'testme'})
      })
      it('reducing editStart should set id to editing', () => {
        expect(reducer({}, editStart('testMe'))).to.eql({editing: {testMe: true}})
      })
    })
    describe('type: ENTITIES_EDIT_STOP', () => {
      let editStop, ENTITIES_EDIT_STOP
    
      beforeEach(() => {
        ENTITIES_EDIT_STOP = testModule.constants.ENTITIES_EDIT_STOP
        editStop = testModule.actions.editStop
      })
    
      it('editStop returns ENTITIES_EDIT_STOP type', () => {
        expect(editStop('testme2')).to.eql({type: ENTITIES_EDIT_STOP, id: 'testme2'})
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
            data : {
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
          data : {
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
            data : {
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
          data : {
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
    
    describe('type: ENTITIES_LOAD', () => {
      let ENTITIES_LOAD
    
      beforeEach(() => {
        ENTITIES_LOAD = testModule.constants.ENTITIES_LOAD
      })
    
      it('Should be reduced with type ENTITIES_LOAD. deleted false', () => {
        const res = reducer({
          giles: 'test'
        }, 
        {
          type: ENTITIES_LOAD, 
          payload: {}
        })
        expect(res).to.eql({
          giles: 'test', 
          error: null, 
          loading: true, 
          loadDeleted: 'false', 
          loadOrder: 'Name'
        })
      })
       it('Should be reduced with type ENTITIES_LOAD. deleted true', () => {
        const res = reducer({
          giles: 'test'
        }, 
        {
          type: ENTITIES_LOAD, 
          payload: {
            isDeleted: 'true'
          }
        })
        expect(res).to.eql({
          giles: 'test', 
          error: null, 
          loading: true, 
          loadDeleted: 'true', 
          loadOrder: 'Name'
        })
      })
      it('Should be reduced with type ENTITIES_LOAD. order', () => {
        const res = reducer({
          giles: 'test'
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
          loadDeleted: 'false', 
          loadOrder: 'orderMe'
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
          loading: false
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
          error: null
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
          loading: false
        })
      })
    })

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
          loadingMore: false
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
          loadingMore: false
        })
      })
    })
    
    describe('type: ENTITY_LOAD', () => {

     let ENTITY_LOAD
    
      beforeEach(() => {
        ENTITY_LOAD = testModule.constants.ENTITY_LOAD
      })

      it('Should be reduced with type ENTITY_LOAD.', () => {
        const res = reducer({
          giles: 'test'
        }, {
          type: ENTITY_LOAD
        })
        expect(res).to.eql({
          giles: 'test', 
          singleError: null, 
          singleLoading: true
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
          singleError: 'error'
        }, {
          type: ENTITY_LOAD_FAIL_CANCEL
        })
        expect(res).to.eql({
          giles: 'test', 
          singleError: null
        })
      })
    })
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
          editing: {
            testMe: false
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
            TotalCount:10,
            Values: [
              {
                Id:'testId',
                Prop:'prop',
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
            TotalCount:10,
            Values: [
              {
                'Id':'testId',
                'Name':'fred',
                Prop:'prop',
                Prop1:'prop1'
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
          loadDeleted: 'false',
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
          loadDeleted: 'false',
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
          loadDeleted: 'true', 
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
          loadDeleted: 'true', 
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
          loadDeleted: 'true', 
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
          loadDeleted: 'true', 
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
          data:{
            TotalCount: 12,
            Values:[{
              Id:'testId', 
              Name: 'giles', 
              Prop:'prop'
            }]
          }
        }
        const res = reducer(state, {
          type: ENTITIES_UPDATE_POST, 
          payload: {
            Id:'testId1', 
            Prop1:'prop1', 
            Name: 'fred2'
          }
        })
        expect(res).to.eql({
          'giles':'test',
          loadOrder: 'Name',          
          'data': {
            TotalCount: 13,
            Values: [{
              'Id':'testId1', 
              'Prop1':'prop1', 
              'Name':'fred2'
            },
            {
              'Id':'testId',
              'Name':'giles', 
              Prop:'prop'
            }]
          }
        })
      })
    
      it('reduced with type "ENTITIES_UPDATE_POST". adding new reverse order (-Name)', () => {
        const state = {
          giles: 'test',
          loadOrder: '-Name',          
          data:{
            TotalCount: 12,
            Values:[{
              Id:'testId', 
              Name: 'giles', 
              Prop:'prop'
            }]
          }
        }
        const res = reducer(state, {
          type: ENTITIES_UPDATE_POST, 
          payload: {
            Id:'testId1', 
            Prop1:'prop1', 
            Name: 'fred2'
          }
        })
        expect(res).to.eql({
          'giles':'test',
          loadOrder: '-Name',
          'data': {
            TotalCount: 13,
            Values: [{
              'Id':'testId',
              'Name':'giles', 
              Prop:'prop'
            }, 
            {
              'Id':'testId1', 
              'Prop1':'prop1', 
              'Name':'fred2'
            }]
          }
        })
        
        it('reduced with type "ENTITIES_UPDATE_POST". posting existing', () => {
          const state = {
            giles: 'test', 
            loadOrder: 'Whatever', 
            data:{
              Values:[{
                Id:'testId', 
                Name: 'giles', 
                Prop:'prop'
              }]
            }
          }
          const res = reducer(state, {
            type: ENTITIES_UPDATE_POST, 
            payload: {
              Id:'testId', 
              Prop1:'prop1', 
              Name: 'fred2'
            }
          })
          expect(res).to.eql({
            'giles':'test', 
            loadOrder: 'Whatever', 
            'data':{
              Values:[{
                'Id':'testId', 
                'Prop1':'prop1', 
                'Name':'fred2'
              }]
            }
          })
        })       
      })
    })
    describe('type: ENTITIES_UPDATE_DELETE', () => {
      return   
      let ENTITIES_UPDATE_DELETE
    
      beforeEach(() => {
        ENTITIES_UPDATE_DELETE = testModule.constants.ENTITIES_UPDATE_DELETE
      })

      it('reduced with type "ENTITIES_UPDATE_DELETE".', () => {
        const state = {
          giles: 'test', 
          data:{
            TotalCount:2,
            Values:[
              {
                Id:'testId'
              },{
                Id:'testId1'
              }
            ]
          }
        }
        const res = reducer(state, {type:ENTITIES_UPDATE_DELETE, id: 'testId'})
        expect(res).to.eql({
          'giles':'test', 
          deleting: {
            testId: false
          }, 'data': {
            TotalCount: 1, 
            Values:[
              {
                'Id':'testId1'
              }
            ]
          }
        })
      })    
    })

    describe('type: ENTITY_UPDATE_PUT', () => {  
           
      let ENTITY_UPDATE_PUT
    
      beforeEach(() => {
        ENTITY_UPDATE_PUT = testModule.constants.ENTITY_UPDATE_PUT
      })

      it('reduced with type "ENTITY_UPDATE_PUT".', () => {
        const state = {
          giles: 'test', 
          singleData:{
            Id: 'testId', 
            Prop:'prop', 
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
          'giles':'test',
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
          type:ENTITY_UPDATE_DELETE, 
          id: 'testId'
        })
        expect(res).to.eql({
          'giles':'test',  
          'singleData': null
        })
      })    
    })
    
    describe('type: ENTITIES_DELETE_SUCCESS', () => {

      let ENTITIES_DELETE_SUCCESS
    
      beforeEach(() => {
        ENTITIES_DELETE_SUCCESS = testModule.constants.ENTITIES_DELETE_SUCCESS
      })
      
      it('reduced with type "ENTITIES_DELETE_SUCCESS".', () => {
        const state = {
          giles: 'test', 
          data: {
            Values: [{
              Id:'testId'
            }, {
              Id:'testId1'
            }]
          }
        }
        const res = reducer(state, {
          type: ENTITIES_DELETE_SUCCESS, 
          id: 'testId'
        })
        expect(res).to.eql({
          'giles': 'test', 
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
          'giles':'test',
          'deleting': {
            'testId':true
          }
        })
      })    
    })
    
    
    describe('type: ENTITIES_ADD', () => {
      
      let add, ENTITIES_ADD
    
      beforeEach(() => {
        ENTITIES_ADD = testModule.constants.ENTITIES_ADD
        add = testModule.actions.add
      })
      
      it('add returns nodes add', () => {
        expect(add('pid')).to.eql({
          type: ENTITIES_ADD, 
          parentId:'pid'
        })
      }) 
      it('reduced with type "ENTITIES_ADD". ', () => {
        const state = {
          giles: 'test', 
          data:{
            Values: [{
              Id:'testId', 
              Name: 'giles', 
              Prop:'prop'
            }]
          }
        }
        const res = reducer(state, {
          type: ENTITIES_ADD, 
          parentId: 'pid'
        })
        expect(res).to.eql({
          'giles': 'test', 
          editing: {
            add: true
          }, 
          'data': {
            Values: [{
              Id:'add', 
              ParentId: 'pid', 
              Name: '', 
              isNew: true
            }, {
              Id:'testId', 
              Name: 'giles', 
              Prop:'prop'
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
              Id:'add', 
              Name: 'giles', 
              Prop:'prop'
            }, {
              Id: 'testId', 
              Name: 'giles', 
              Prop:'prop'
            }]
          }
        }
        const res = reducer(state, {type: ENTITIES_ADD_SUCCESS})
        expect(res).to.eql({
          'giles': 'test', 
          editing: {
            add: false
          }, 
          saving: {
            add: false
          },  
          'data': {
            Values: [{
              Id:'testId', 
              Name: 'giles', 
              Prop:'prop'
            } 
          ]}
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
      ofType: ()=> Rx.Observable.never()
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
      
      beforeEach(()=>{
        load = testModule.actions.load
      })
      it('Should be exported as a function.', () => {
        expect(load).to.be.a('function')
      })

      it('Should return a function.', () => {
        expect(load({})).to.be.a('function')
      })
      describe('Operation', ()=> {
        
        let ENTITIES_LOAD, 
        ENTITIES_LOAD_SUCCESS,
        ENTITIES_LOAD_FAIL,
        ENTITIES_UPDATE_PUT,
        ENTITIES_UPDATE_POST,
        ENTITIES_UPDATE_DELETE,
        joinMessages,
        joinSpy,
        signalR,
        apiClient
        
        beforeEach(()=> {
          ENTITIES_LOAD = testModule.constants.ENTITIES_LOAD
          ENTITIES_LOAD_SUCCESS = testModule.constants.ENTITIES_LOAD_SUCCESS
          ENTITIES_LOAD_FAIL = testModule.constants.ENTITIES_LOAD_FAIL
          ENTITIES_UPDATE_PUT = testModule.constants.ENTITIES_UPDATE_PUT
          ENTITIES_UPDATE_POST = testModule.constants.ENTITIES_UPDATE_POST
          ENTITIES_UPDATE_DELETE = testModule.constants.ENTITIES_UPDATE_DELETE
          joinMessages = new Rx.Subject()
          joinSpy = sinon.spy(()=> Rx.Observable.of(joinMessages))
          signalR = Promise.resolve({
            join: joinSpy
          })
          
          apiClient = {
            get: sinon.spy(()=> {
              return Promise.resolve('giles')
            })
          }
        })
        
        it('join signalR and call api', function *(){
          getLoadDefaults.returns({ default: 'testGetDefaults'})
          getJoinId.returns('test join Id')
          const iter = load('testLoadConfig')({signalR, apiClient})(actions, {
            dispatch: _dispatchSpy, 
            getState: _getStateSpy
          }).toAsyncIterator()
          expect(getLoadDefaults.getCall(0).args[0]).to.equal('testLoadConfig')
          
          getLoadPath.returns('testLoadPath')
          expect(yield iter.nextValue()).to.eql({
            type: ENTITIES_LOAD,
            payload: {
              default: 'testGetDefaults'
            }
          }) 
          
          expect(yield iter.nextValue())
            .to.eql({
              type: ENTITIES_LOAD_SUCCESS,
              'payload': 'giles'
            })
          
          expect(apiClient.get.getCall(0).args[0]).to.equal('testLoadPath')
             
          expect(getJoinId.getCall(0).args[0]).to.equal('testLoadConfig')    
          expect(joinSpy.getCall(0).args[0]).to.equal('test join Id')
            
             
          iter.unsubscribe()
        })
        
        it('Should return an observable that operates with put post and delete events.', function *() {
            
          const iter = load({})({signalR, apiClient})(actions, {
            dispatch: _dispatchSpy, 
            getState: _getStateSpy
          }).toAsyncIterator()
          
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
            payload:'putValue'
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


        it('Should play all notifications since api called.', function *() {
          
          const signalR = Promise.resolve({
            join: ()=> Rx.Observable.of(Rx.Observable.of(
              {message: {method: 'post', value: 'postValue'}},
              {message: {method: 'put', value: 'putValue'}},
              {message: {method: 'delete', id: 'deleteValue'}}
            )),
            
          })
          
          const apiClient = {
            get: sinon.spy(()=> {
              return new Promise((resolve)=>setTimeout(()=>resolve('giles'),100))
            })
          }
          const iter = load({})({signalR, apiClient})(actions, {
            dispatch: _dispatchSpy, 
            getState: _getStateSpy
          }).toAsyncIterator()
          
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
        
        it('Should return an observable that operates on signalR fail.', function *() {
          const signalR = Promise.reject()
          
          const apiClient = {
            get: sinon.spy(()=> {
              return Promise.resolve('giles')
            })
          }
          const iter = load({})({signalR, apiClient})(actions, {
            dispatch: _dispatchSpy, 
            getState: _getStateSpy
          }).toAsyncIterator()
          
          
          yield iter.nextValue()
          yield iter.nextValue()
          expect(yield iter.nextValue()).to.eql({
            type: testModule.constants.ENTITIES_RESET
          })
          iter.unsubscribe()
        })
        it('Should return an observable that operates on fail.', function *() {
          const joinMessages = new Rx.Subject()
          const signalR = Promise.resolve({
            join: ()=> Rx.Observable.of(joinMessages),
            
          })
            
          const apiClient = {
            get: sinon.spy(()=> Promise.reject('giles'))
          }
          const iter = load({})({signalR, apiClient})(actions, {
            dispatch: _dispatchSpy, 
            getState: _getStateSpy
          }).toAsyncIterator()
          
          yield iter.nextValue()
          
          expect(yield iter.nextValue()).to.eql({'type': ENTITIES_LOAD_FAIL,'payload': 'giles'})
          
          yield iter.shouldComplete()
          
          iter.unsubscribe()
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
       describe('Operation', ()=> {
        
        let ENTITIES_LOAD_MORE, 
        ENTITIES_LOAD_MORE_SUCCESS,
        ENTITIES_LOAD_MORE_FAIL,
        apiClient
        
        beforeEach(()=> {
          ENTITIES_LOAD_MORE = testModule.constants.ENTITIES_LOAD_MORE
          ENTITIES_LOAD_MORE_SUCCESS = testModule.constants.ENTITIES_LOAD_MORE_SUCCESS
          ENTITIES_LOAD_MORE_FAIL = testModule.constants.ENTITIES_LOAD_MORE_FAIL
          
          apiClient = {
            get: sinon.spy(()=> {
              return Promise.resolve('giles')
            })
          }
        }) 
        
        it('should call api', function *(){
          getLoadDefaults.returns({ default: 'testGetDefaults'})
          getLoadPath.returns('testLoadPath')
          
          const iter = loadMore('testLoadConfig')({apiClient})(actions, {
            dispatch: _dispatchSpy, 
            getState: _getStateSpy
          }).toAsyncIterator()
          expect(getLoadDefaults.getCall(0).args[0]).to.equal('testLoadConfig')
          
          expect(yield iter.nextValue()).to.eql({
            type: ENTITIES_LOAD_MORE
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

      it('Should return an observable that operates.', function *() {
        const joinMessages = new Rx.Subject()
        
        const signalR = Promise.resolve({
          join: ()=> Rx.Observable.of(joinMessages),
          
        })
        
        const apiClient = {
          get: sinon.spy(()=> {
            return Promise.resolve('giles')
          })
        }

        getJoinSingleId.returns('test me')
        getSinglePath.returns('test me 2')

        const iter = loadSingle('id')({signalR, apiClient})(actions, {
          dispatch: _dispatchSpy, 
          getState: _getStateSpy
        }).toAsyncIterator()
        
        
        expect(yield iter.nextValue()).to.eql({
          'type': testModule.constants.ENTITY_LOAD
        })
        
        
        expect(yield iter.nextValue()).to.eql({
          'type': testModule.constants.ENTITY_LOAD_SUCCESS,
          'payload': 'giles'
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
          'payload':'putValue'
        })
        
        expect(yield iter.nextValue()).to.eql({
          'type': testModule.constants.ENTITY_UPDATE_DELETE,
          'id':'deleteValue'
        })
        
        iter.unsubscribe()
      })
      it('Should join correct SignalR group', function *() {
        const joinMessages = new Rx.Subject()
        const joinResult = {
          join: sinon.spy(()=> Rx.Observable.of(joinMessages)),
          
        }
        const signalR = Promise.resolve(joinResult)
        getJoinSingleId.returns('test me')
        const apiClient = {
          get: ()=> {
            return Promise.resolve('giles')
          }
        }
        const iter = loadSingle('testid')({signalR, apiClient})(actions, {
          dispatch: _dispatchSpy, 
          getState: _getStateSpy
        }).toAsyncIterator()
        yield iter.nextValue()
        yield iter.nextValue()
        expect(getJoinSingleId.getCall(0).args[0]).to.equal('testid')
        expect(joinResult.join.getCall(0).args[0]).to.equal('test me')

        
        iter.unsubscribe()
      })
      it('Should play all notifications since api called.', function *() {
        return
        const signalR = Promise.resolve({
          join: ()=> Rx.Observable.of(Rx.Observable.of(
            {message: {method: 'post', value: 'postValue'}},
            {message: {method: 'put', value: 'putValue'}},
            {message: {method: 'delete', id: 'deleteValue'}}
          )),
          
        })
        
        const apiClient = {
          get: sinon.spy(()=> {
            return new Promise((resolve)=>setTimeout(()=>resolve('giles'),100))
          })
        }
        const iter = load({})({signalR, apiClient})(actions, {
          dispatch: _dispatchSpy, 
          getState: _getStateSpy
        }).toAsyncIterator()
        
        
        expect(yield iter.nextValue()).to.eql({'type': ENTITIES_LOAD, payload: {isDeleted: false}})
        expect(yield iter.nextValue()).to.eql({'type': ENTITIES_LOAD_SUCCESS,'payload': 'giles'})
        
        expect(apiClient.get.getCall(0).args[0]).to.equal('nodes?order=Name&isDeleted=false')
        
        expect(yield iter.nextValue()).to.eql({'type': ENTITIES_UPDATE_POST,'payload':'postValue'})
        
        expect(yield iter.nextValue()).to.eql({'type': ENTITIES_UPDATE_PUT,'payload':'putValue'})
        expect(yield iter.nextValue()).to.eql({'type': ENTITIES_UPDATE_DELETE,'id':'deleteValue'})
        
        
        iter.unsubscribe()
      })
      
      it('Should return an observable that operates on signalR fail.', function *() {
        return
        const signalR = Promise.reject()
        
        const apiClient = {
          get: sinon.spy(()=> {
            return Promise.resolve('giles')
          })
        }
        const iter = load({})({signalR, apiClient})(actions, {
          dispatch: _dispatchSpy, 
          getState: _getStateSpy
        }).toAsyncIterator()
        
        
        expect(yield iter.nextValue()).to.eql({'type': ENTITIES_LOAD, payload: {isDeleted: false}})
        expect(yield iter.nextValue()).to.eql({'type': ENTITIES_LOAD_SUCCESS,'payload': 'giles'})
        expect(apiClient.get.getCall(0).args[0]).to.equal('nodes?order=Name&isDeleted=false')
        expect(yield iter.nextValue()).to.eql({'type': ENTITIES_RESET})
        iter.unsubscribe()
      })
      it('Should return an observable that operates on fail.', function *() {
        return
        const joinMessages = new Rx.Subject()
        const signalR = Promise.resolve({
          join: ()=> Rx.Observable.of(joinMessages),
          
        })
          
        const apiClient = {
          get: sinon.spy(()=> Promise.reject('giles'))
        }
        const iter = load({})({signalR, apiClient})(actions, {
          dispatch: _dispatchSpy, 
          getState: _getStateSpy
        }).toAsyncIterator()
        
        expect(yield iter.nextValue()).to.eql({'type': ENTITIES_LOAD, payload: {isDeleted: false}})
        
        expect(yield iter.nextValue()).to.eql({'type': ENTITIES_LOAD_FAIL,'payload': 'giles'})
        
        yield iter.shouldComplete()
         
        iter.unsubscribe()
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
        expect(save()).to.be.a('function')
      })

      it('Should return an observable that operates when put.', function *() {
        
        const apiClient = {
          put: sinon.spy(()=> Promise.resolve('editied data'))
        }
        getPutPath.returns('test put path')
        const iter = save({Id: 'testId'})({apiClient})(undefined, {
          dispatch: _dispatchSpy, 
          getState: _getStateSpy
        }).toAsyncIterator()
        
        expect(getPutPath.getCall(0).args[0]).to.eql({Id: 'testId'})
        expect(apiClient.put.getCall(0).args[0]).to.equal('test put path')
        
        expect(apiClient.put.getCall(0).args[1]).to.eql({data: {Id: 'testId'}})
        expect(yield iter.nextValue()).to.eql({
          type: testModule.constants.ENTITIES_SAVE, 
          values: {
            Id: 'testId'
          }
        })
        //expect(yield iter.nextValue()).to.eql({
        //  type: testModule.constants.ENTITIES_UPDATE_PUT, 
        //  payload: 'editied data'
        //})
                
        expect(yield iter.nextValue()).to.eql({
          type: testModule.constants.ENTITIES_SAVE_SUCCESS,
          id: 'testId'
        })
                
        yield iter.shouldComplete()
        
        iter.unsubscribe()
      })
      it('Should return an observable that operates when post.', function *() {
        const apiClient = {
          post: sinon.spy(()=> Promise.resolve('posted data'))
        }
        postConvert.returns('post converted')
        getPostPath.returns('post path')
        const iter = save({Id: 'testId', isNew: true})({apiClient})(undefined, {
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
        expect(apiClient.post.getCall(0).args[1]).to.eql({data: 'post converted'})
        
        expect(yield iter.nextValue()).to.eql({
          type: testModule.constants.ENTITIES_SAVE, 
          values: {
            Id: 'testId', 
            isNew: true
          }
        })
        
        //expect(yield iter.nextValue()).to.eql({
        //  type: testModule.constants.ENTITIES_UPDATE_POST, 
        //  payload: 'posted data'
        //})

        expect(yield iter.nextValue()).to.eql({
          type: testModule.constants.ENTITIES_ADD_SUCCESS
        })
                
        yield iter.shouldComplete()
        
        iter.unsubscribe()
          
          // Will throw if error or complete are produced.
        // expect(yield iter.nextValue()).to.equal(45)  
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

      beforeEach(()=>{
        remove= testModule.actions.remove
      })

      it('Should be exported as a function.', () => {
        expect(remove).to.be.a('function')
      })

      it('Should return a function.', () => {
        expect(remove()).to.be.a('function')
      })

      it('Should return an observable that operates.', function *() {
        
        const apiClient = {
          del: sinon.spy(()=> Promise.resolve())
        }
        getDeletePath.returns('test delete path')
        const iter = remove('testId')({apiClient})(undefined, {
          dispatch: _dispatchSpy, 
          getState: _getStateSpy
        }).toAsyncIterator()
        
        expect(getDeletePath.getCall(0).args[0]).to.equal('testId')
        expect(apiClient.del.getCall(0).args[0]).to.equal('test delete path')
        
        expect(yield iter.nextValue()).to.eql({
          'type': testModule.constants.ENTITIES_DELETE, 
          'id': 'testId'
        })
        
        
        expect(yield iter.nextValue()).to.eql({
          'type': testModule.constants.ENTITIES_DELETE_SUCCESS, 
          'id':'testId'
        })
        
        
        yield iter.shouldComplete()
        
        iter.unsubscribe()
      })
    })
  })
})
  