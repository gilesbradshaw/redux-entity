# redux-entity

A redux module allowing CRUD with real time updates

## Install

````
npm i redux-entity
````

## Clone

````
git clone https://github.com/gilesbradshaw/redux-entity.git
cd redux-entity
npm install
````

## Test

````
npm run test
````

## Lint

````
npm run lint
````

## Lint and fix

````
npm run lint:fix
````

## Build

````
npm run build
````

## Configuring a module

````
import { configureModule} from 'redux-entity'

// we configure named redux modules

const getJoinId = ({parentId}) => parentId ? `Enquiries;parentId:${parentId}` : 'Enquiries'
const getJoinSingleId = (id) => `Enquiry;id:${id}`
const getLoadDefaults = (loadConfig) => {
  const {isDeleted = false, order = 'Name', offset = 0} = loadConfig
  return {...loadConfig, isDeleted, order, offset}
}
const getLoadPath = (loadConfig) => {
  const {parentId, isDeleted, order, offset} = loadConfig
  return  parentId 
    ? `nodes/${parentId}/enquiries?totalCount=true&order=${order}&isDeleted=${isDeleted}&offset=${offset}&limit=20` 
    : `enquiries?totalCount=true&order=${order}&isDeleted=${isDeleted}&offset=${offset}&limit=20`
}
const getSinglePath = (id) => `enquiries/${id}`
const getPostPath = (values) => values.ParentId ? `nodes/${values.ParentId}/enquiries` : '/enquiries'
const getPutPath = (values) => `enquiries/${values.Id}`
const getDeletePath = (id) => `enquiries/${id}`
const postConvert = (values) => values

const commonConfig = {
  getJoinId,
  getJoinSingleId,
  getLoadDefaults,
  getLoadPath,
  getSinglePath,
  getPostPath,
  getPutPath,
  getDeletePath,
  postConvert
} 

configureModule({
  name: 'ENQUIRY',
  ...commonConfig
})
````

## Getting a configured module

````
import { entityModule } from 'redux-entity'

const module = entityModule('ENQUIRIES')
````
    