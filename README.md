# DealerWeb React UI

A web and mobile application for managing and responding to enquiries.

This application is based on [React redux starter kit](https://github.com/davezuko/react-redux-starter-kit)

It implements a [redux store](https://github.com/reactjs/redux)

The server side api is [here](https://github.com/gilesbradshaw/dealerweb-react)

## To develop

    git clone https://github.com/gilesbradshaw/dealerweb-react-ui.git
    npm install
    npm run dev
    
## To Test

    npm run test:dev


## Typical structure

A hierarchy of nodes (groups, franchises and dealers)

* Groups
  * Group Managers
* Franchises
  * Franchise Managers
* Dealers
  * Dealer Manager
  * Sales Executives
* Enquiries
  
* Users

## General structure

A generic tree structure is implemented alowing above typical structure - and more.

* Nodes
  * Managers
    * Add Manager to child node (has to be accepted)
    * Disable Manager from child node
    * Add/Disable Child Node
    * Add Responders (has to be accepted)
    * Disable responder
    * Add Enquiry to responder (has to be accepted)
    * Remove Enquiry from responder
    * Escalate Enquiry
    * Assign Enquiry to Child Node
  * Responders
    * Handle Enquiry
    * Take unasigned enquiry
    * Escalate Enquiry
    * Assign Enquiry to Child Node
  * Enquiries
  * Templates
  * Child Nodes
  
  
## Example structure
  
* Node: Group0
  * Creator: Giles
  * Managers
    * Manager: Giles
  * Node: Franchise0.0
    * Creator: Giles
    * Managers 
      * Manager: Giles
    * Node: Dealer0.0.0
      * Creator: Giles
      * Managers 
        * Manager: Bill
        * Manager: Cedric
      * Responders
        * Responder: Cedric
          * Enquiries
            * Enquiry: Miscellaneous Enquiry
        * Responder: Arthur
      * Enquiries
        * Enquiry: Miscellaneous Enquiry (being  handed by cedric)
        * Enquiry: Unallocated Enquiry
      * Node: BrochureEnquiryType
        * Creator: Cedric
        * Managers: 
          * Manager: Cedric
        * Responders
          * Responder: Fred
          * Responder: Bert
        * Enquiries
          * Enquiry: Brochure Enquiry 1
          * Enquiry: Brochure Enquiry 2  
        * Templates
          * Template: BrochureTemplate
          * Template: BespokeBrochureTemplate
      * Node: TestDriveEnquiryType
        * Creator: Cedric
        * Managers: 
          * Manager: Cedric
        * Responders
          * Responder: Giles
          * Enquiries
          * Enquiry: Test drive Enquiry 1
          * Enquiry: Test drive Enquiry 2
        * Templates
          * Template: TestDriveTemplate

## Enquiry handling

An enquiry is directed at a node.

A node can allocate an enquiry to a child node or its parent (by rules or by a node responder/ manager).

A node responder may take ownership of an unowned enqury (ceded autmoatically).

A node manager may allocate an enquiry.
 
Enquiries have a history of node membership responder ownership.

## Entities

* Node
  * 0-1 Parent
  * * Managers
  * * Responders
  * * Enquiries
  * * Templates
  * * Child Nodes
  * Disabled
  
* Enquiry
  * 1 Node Parent
  * * NodeHistory
  * 0-1 Responder
  * * ResponderHistory
  * 0-1 Template
  * Template Data
  * State
    
* Template
  * 1 Node Parent
  * Enquiries

* Account
  * * Logins (twitter &c)
  * * Managers
  * * Responders
  
* Manager
  * 1 Node
  * 1 Account
  * Accepted
  * Disabled

* Responder
  * 1 Node
  * 1 Account
  * * Enquiries
  * Accepted
  * Disabled

 
## User stories

### 1 As a guest

* 1.1 I want to _register as an account_ so that I can _participate in the app_.
* 1.2 I want to _block the app_ so I can _not receive any emails if I don't want to_.
* 1.3 I want to _unblock the app_ so I can _receive any emails if I want to_.

### 2 As an invited account

* 2.1 I want to _Accept invitation and register_ so that I can _participate in the app_.
* 2.2 I want to _Ignore invitation_ so that I can _not be a member of the app if I don't want to_.

### 3 As an account

* 3.1 I want to _Modify details_ so that I can _manage my profile and change password_.
* 3.2 I want to _Disable my account_ so that I can _leave current roles and stop getting notifications &c_.

### 4 As a _Manager_

* 4.1 I want to _Add a node managed by me to the children of a *node* I manage_ so I can _structure my organisation_.
* 4.2 I want to _Disable my own managership (resign)_ so I can _stop participating in the app as a manager of a node_.
* 4.3 I want to _Invite a Manager to a child of a *node* I manage (accepted via email/login)_ so I can _add managers to my orgnanisation_.
* 4.4 I want to _Disable a Manager of a child of a node that I manage (sack)_ so I can _remove managers of my organisation_.
* 4.5 I want to _Invite a responder to a node I manage_ so I can _enable people to respond to enquiries_.
* 4.6 I want to _Disable a responder from a node I manage_ so I can _stop people respoding to enquiries_.
* 4.7 I want to _Escalate enquiries to parent_ so I can _allow others to process enquiries not appropriate for my node_.
* 4.8 I want to _Allocate enquiry to child node_ so I can _allow appropriate people to process an enquiry_.
* 4.9 I want to _Add enquiry to responder_ so I can _prompt someone to deal with an enquiry_.
* 4.10 I want to _Remove an enquiry from a responder_ so I can _allow someone else to respond to an enquiry_.
* 4.11 I want to _Add a template to node I manage_ so I can _allow an enquiry to be responded by preset email_.
* 4.12 I want to _Remove a template to node I manage_ so I can _disallow an enquiry to be responded by a preset email_.
* 4.13 I want to _Add a new enquiry to a node_ so I can _initiate response_.
* 4.14 I want to _delete an enquiry_ so I can _decide not to act on it_.
* 4.15 I want to _delete a child node_ so I can _structure my organisation_.
* 4.16 I want to _add a new root node_ so I can _create an organisation_.
* 4.17 I want to _edit a template_ so I can _configure the content of an email response_

### 5 As an invited _Manager_ 

* 5.1 I want to _Accept invitation_ so I can _participate in the app in invited role_.
* 5.2 Ignore request I want to _ignore invitation_ so I can _not participate in the invited role_.

### 6 As a responder

* 6.1 I want to _Allocate an unallocated Enquiry to myself_ so I can _process the enquiry_
* 6.2 I want to _Disable my own respondership (resign)_ so I can _stop particiapting in the app as a responder for a role_.
* 6.3 I want to _Respond to an enquiry with a template_ so I can _do my job_
* 6.4 I want to _Allocate enquiry to a child node_ so I can _allow appropriate people to process an enquiry_
* 6.5 I want to _Add a new enquiry to a node_ so I can _initiate response_
* 6.6 I want to _Un allocate an enquiry frommyself_ so I can _prompt someone else to deal with it_

### 7 As a invited _Responder_

* 7.1 I want to _Accept invitation_ so I can _participate in the app in invited role_.
* 7.2 I want to _ignore invitation_ so I can _not participate in the invited role_.

## Creating a structure

Jennifer registers creating an account *Jennifer*
*Jennifer* creates *node 1* with one manager - *Jennifer*
*Jennifer* creates *node 2* as a child of *node 1*
*Jennifer* adds an account *Bill* and invites him as a requested manager of *node2*
Bill accepts account *Bill*
*Bill* accepts managership of *node 2*

### At this point..

* node 1
  * Managers
    * Jennifer
  * Nodes
    * node 2
      * Managers
        * Jennifer
        * Bill

* Jennifer can add nodes to/from *node 1*
* Jennifer can add and disable templates and responders to/from *node 1*
* Jennifer can Sack Bill from *node 2*
* Jennifer can resign from *node 2*
* Jennifer and Bill can add nodes to/from *node 2*
* Jennifer and Bill can add and disable templates and responders to/from *node 2*

### so...

Bill adds 3 enquiryType nodes to *node 2* these are *enquirytype 1*, *enquirytype 2* and *enquirytype 3*
Bill adds temaples to the enquiry types
Bill adds responders *Ann* *Julia* and *George*

### At this point

* node 1
  * Managers
    * Jennifer
  * Nodes
    * node 2
      * Managers
        * Jennifer
        * Bill
      * Nodes
        * enquiry type 1
          * Managers
            * Bill
          * Templates
            * template 1
          * Responders
            * Ann
            * Julia
            * George
        * enquiry type 2
          * Managers
            * Bill
          * Templates
            * template 2
            * template 2.1
          * Responders
            * Ann
            * Julia
            * George
       * enquiry type 3
          * Managers
            * Bill
          * Templates
            * template 3
          * Responders
            * Ann
            * Julia
            * George
            
            
??? moving nodes...
??? deleting nodes

## Api

### Node

#### GET /nodes

*?isDeleted=true|false


* GET /nodes/:id
* PUT /nodes/:id
* DELETE /nodes/:id

* GET /nodes/:id/nodes List
* POST /nodes/:id/nodes

### Responder

* GET /responders List
* GET /nodes/:id/responders List
* POST /nodes/:id/responders

* GET /responders/:id
* PUT /responders/:id
* DELETE /responders/:id

### Manager

* GET /managers  List
* GET /deleted-managers  List

* GET /nodes/:id/managers List
* POST /nodes/:id/managers

* GET /managers/:id
* PUT /managers/:id
* DELETE /managers/:id

### Template

* GET /nodes/:id/templates List
* POST /nodes/:id/templates

* GET /templates/:id
* PUT /templates/:id
* DELETE /templates/:id

### Enquiry

* GET /nodes/:id/enquiries List
* POST /nodes/:id/enquiries

* GET /enquiries LIST
* GET /enquiries/:id
* PUT /enquiries/:id
* DELETE /enquiries/:id

* GET /responders/:id/enquiries
* POST /responders/:id/enquiries
* DELETE /responders/:id/enquiries/:enquiryId

* GET /templates/:id/enquiries ?? history
* POST /templates/:id/enquiries

## Notifications

## Enquiries

* Added to node
* Removed from node
* changed
* added to responder
* removed from responder

## Nodes

* Added to node 
* removed from node (disabled)

## Responders

* Added to node
* Removed from node
* added to account
* removed from account

## Managers

* Added to node
* Removed from node
* added to account
* removed from account

# Templates

* Added to node
* Changed
* Removed from node

## Pages

### Enquiries

* List of enquiries I can respond to
  * GET /enquiries

#### Enquiry

* View enquiry
  * GET /enquiries/:id
* response if allowed 6.3
  * PUT /enquiries/:id
* escalation to parent 4.7
  * POST /nodes/:id/enquiries
* allocation to responder 4.9 6.1
  * POST /responders/:id/enquiries
* remove enquiry from responder 4.10 6.6
  * DELETE /responders/:id/enquiries/:enquiryId
* allocation to child node 4.8 6.4
  * GET /nodes/:id/nodes
  * POST /nodes/:id/enquiries


### Nodes

* List of nodes I am a manager or responder for
  * GET /nodes
* Add a new (root) node 4.16
  * POST /managed

#### Node

* View of a node I am a manager or responder for
  * GET /nodes/:id

##### Node Parent

(must be able to see full ancestry)

##### Node Enquiries

* Add enquiry 4.13 6.5
  * POST /nodes/:id/enquiries
* List Enquiries
  * GET /nodes/:id/enquiries
* Delete Enquiry 4.14
  * DELETE /enquiries/:id

##### Node Managers

* Add Manager (invite) 4.3
  * POST /nodes/:id/managers
* Delete (disable) Manager 4.4 4.2
  * DELETE /managers/:id
* List Managers
  * GET /nodes/:id/managers

###### Manager

* accept my invited managership 5.1
  * PUT /managers/:id
* ignore my invited managership 5.2
  * PUT /managers/:id

##### Node Responders

* List Responders
  * GET /nodes/:id/responders
* Add Responder (invite) 4.5
  * POST /nodes/:id/responders
* Delete Responder (disable) 4.6 6.2
  * DELETE /responders/:id

###### Responder 

* accept my invited respondership 7.1
  * PUT /responders/:id
* ignore my invited respondership 7.2
  * PUT /responders/:id

##### Node Templates

* Add Template 4.11
  * POST /nodes/:id/templates
* List Templates
  * GET /nodes/:id/templates
* Delete Template 4.12
  * DELETE /templates/:id
  
###### Node template

* View Template
  * GET /templates/:id
* Edit Template 4.17
  * PUT /templates/:id

##### Node Children

* Add Node 4.1
  * POST /nodes/:id/nodes
* List Nodes
  * GET /nodes/:id/nodes
* Delete Node 4.15
  * DELETE /nodes/:id

### Responder

* List enquiries
  * GET /responders/:id/enquiries
* Add enquiry 4.9
  * POST /responders/:id/enquiries
* Remove enquiry 4.10 6.6
  * DELETE /responders/:id/enquiries/:enquiryId

### Account

* Register 1.1 2.1
* Change password 3.1
* Add social login 3.1
* Disable 3.2
* Block app 1.2


## Not yet thought about..

unblocking ...

rules for enquiry allocation

notifications + security of notifications

moving enquiries around more elegantly

what happens when node disabled (existing enquiries managers responders)

history of

* node
  * ? parentage
  * states
* responder
  * states
  * enquiries
* manager
  * states
* enquiry
  * parents
  * states
  * data
  * responders
* template
  * enquiries

