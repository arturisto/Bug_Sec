
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Replace the uri string with your MongoDB deployment's connection string.
const uri = 'mongodb+srv://arturisto:qvGHWZqSpn4rjyY@cluster0.h5bcb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const dbName = 'usersDb'

const client = new MongoClient(uri);

async function connect () {
    await client.connect();
    const db = client.db(dbName);
    return db.collection('users');
}

async function getOne() {
    try {
        const collection = await connect();
        const query = { email: 'jeanne.brunet@example.com' };
        const user = await collection.findOne(query);
        client.close();
        return user;
        }
    catch(error) {
        console.log(error)
        return false;
    } 
}

async function getData(page, itemsPerPage, searchValue=null, sort=null) {
    try {
        const collection = await connect();
        let filter = null;
        if (searchValue) {
            filter = {
                '$or': [
                {
                    'name.first': new RegExp(searchValue, 'i')
                }, {
                    'name.last': new RegExp(searchValue, 'i')
                }, {
                    'email': new RegExp(searchValue, 'i')
                }, {
                    'location.city': new RegExp(searchValue, 'i')
                }, {
                    'location.state': new RegExp(searchValue, 'i')
                }, {
                    'location.country': new RegExp(searchValue, 'i')
                }, {
                    'registered.date': new RegExp(searchValue, 'i')
                }, {
                    'permissions': new RegExp(searchValue, 'i')
                }
                ]
            };
        };
        let mongoSort = null;
        if(sort?.columnToSort) {
            switch (sort.columnToSort){
                case 'email':
                    if(sort.direction) {
                        mongoSort={'email': 1}
                    } else {
                        mongoSort={'email': -1}
                    }
                    break;
                case 'location':
                    if(sort.direction) {
                        mongoSort={'location.city': 1}
                    } else {
                        mongoSort={'location.city': -1}
                    }
                    break;
                case 'joined':
                    if(sort.direction) {
                        mongoSort={'registered.date': 1}
                    } else {
                        mongoSort={'registered.date': -1}
                    }
                    break;
                default: break;
            }
        }
        const data = await collection.find(filter, {skip: (page-1)*itemsPerPage, limit: itemsPerPage}).sort(mongoSort).toArray();
        client.close();
        return data;
        }
    catch(error) {
        console.log(error)
        return false;
    }
}

async function getCount(searchValue=null) {
    try {
        const collection = await connect();
        let filter = null;
        if (searchValue) {
            filter = {
                '$or': [
                {
                    'name.first': new RegExp(searchValue, 'i')
                }, {
                    'name.last': new RegExp(searchValue, 'i')
                }, {
                    'email': new RegExp(searchValue, 'i')
                }, {
                    'location.city': new RegExp(searchValue, 'i')
                }, {
                    'location.state': new RegExp(searchValue, 'i')
                }, {
                    'location.country': new RegExp(searchValue, 'i')
                }, {
                    'registered.date': new RegExp(searchValue, 'i')
                }, {
                    'permissions': new RegExp(searchValue, 'i')
                }
                ]
            };
        };
        const data = await collection.count(filter);
        client.close();
        return data;
        }
    catch(error) {
        console.log(error)
        return false;
    }
}

async function insert(item) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const collection = db.collection('users');
        const formattedItem = {name: 
                                {
                                    first: item.firstName, 
                                    last: item.lastName
                                },
                                    email: item.email,
                                    location:{
                                        city: item.location,
                                },
                                    permissions: item.permissions,
                                    registered: {
                                        date: new Date()
                                }
                            };
        console.log(formattedItem);
        const response = await collection.insertOne(formattedItem);
        console.log(response);
        client.close();
        return true;
    }
    catch(error) {
        console.log(error)
        return false;
    }
}
  
async function update(item) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const collection = db.collection('users');
        filter= {_id: body.id}
        const formattedItem = { name: 
                                {
                                    first: item.firstName, 
                                    last: item.lastName
                                },
                                email: item.email,
                                location:{
                                    city: item.location,
                                    },
                                permissions: item.permissions,
                            };
        console.log(formattedItem);
        const response = await collection.updateOne(filter, formattedItem);
        console.log(response);
        client.close();
        return true;
    }
    catch(error) {
        console.log(error)
        return false;
    }
}

async function deleteDocument(item) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const collection = db.collection('users');
        filter= {_id: new ObjectID(item.id)}
        console.log(filter)
        const response = await collection.deleteOne(filter);
        console.log(response);
        client.close();
        return true;
    }
    catch(error) {
        console.log(error)
        return false;
    }
}
  

module.exports = { getOne, insert, getData, update, deleteDocument, getCount }
