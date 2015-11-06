
Neuro.debug = function(event, source)  /*, data.. */
{
  // up to the user
};

Neuro.Events = {

  CREATION: 0,                // options

  REST: 1,                    // options

  REMOTE_UPDATE: 2,           // encoded, NeuroModel
  REMOTE_CREATE: 3,           // encoded, NeuroModel
  REMOTE_REMOVE: 4,           // NeuroModel
  REMOTE_LOAD: 5,             // encoded[]
  REMOTE_LOAD_OFFLINE: 6,     // 
  REMOTE_LOAD_ERROR: 7,       // status
  REMOTE_LOAD_REMOVE: 8,      // key
  REMOTE_LOAD_RESUME: 22,     // 

  LOCAL_LOAD: 9,              // encoded[]
  LOCAL_RESUME_DELETE: 10,    // NeuroModel
  LOCAL_RESUME_SAVE: 11,      // NeuroModel
  LOCAL_LOAD_SAVED: 12,       // NeuroModel

  REALTIME_SAVE: 13,          // encoded, key
  REALTIME_REMOVE: 14,        // key

  SAVE_VALUES: 15,            // encoded, NeuroModel
  SAVE_PUBLISH: 16,           // encoded, NeuroModel
  SAVE_CONFLICT: 17,          // encoded, NeuroModel
  SAVE_UPDATE_FAIL: 18,       // NeuroModel
  SAVE_ERROR: 19,             // NeuroModel, status
  SAVE_OFFLINE: 20,           // NeuroModel
  SAVE_RESUME: 21,            // NeuroModel
  SAVE_REMOTE: 25,            // NeuroModel
  SAVE_DELETED: 40,           // NeuroModel

  SAVE_OLD_REVISION: 48,      // NeuroModel, encoded

  SAVE_LOCAL: 23,             // NeuroModel
  SAVE_LOCAL_ERROR: 24,       // NeuroModel, error
  SAVE_LOCAL_DELETED: 38,     // NeuroModel
  SAVE_LOCAL_BLOCKED: 39,     // NeuroModel

  SAVE_REMOTE_DELETED: 41,    // NeuroModel, [encoded]
  SAVE_REMOTE_BLOCKED: 42,    // NeuroModel

  REMOVE_PUBLISH: 26,         // key, NeuroModel
  REMOVE_LOCAL: 27,           // key, NeuroModel
  REMOVE_MISSING: 28,         // key, NeuroModel
  REMOVE_ERROR: 29,           // status, key, NeuroModel
  REMOVE_OFFLINE: 30,         // NeuroModel
  REMOVE_RESUME: 31,          // NeuroModel
  REMOVE_REMOTE: 32,          // NeuroModel
  REMOVE_CANCEL_SAVE: 47,     // NeuroModel

  REMOVE_LOCAL: 33,           // NeuroModel
  REMOVE_LOCAL_ERROR: 34,     // NeuroModel, error
  REMOVE_LOCAL_BLOCKED: 44,   // NeuroModel
  REMOVE_LOCAL_NONE: 45,      // NeuroModel
  REMOVE_LOCAL_UNSAVED: 46,   // NeuroModel

  REMOVE_REMOTE_BLOCKED: 43,  // NeuroModel

  ONLINE: 35,                 //
  OFFLINE: 36,                //

  PUBSUB_CREATED: 37,         // PubSub

  HASONE_INIT: 53,            // NeuroHasOne
  HASONE_NINJA_REMOVE: 49,    // NeuroModel, relation
  HASONE_NINJA_SAVE: 50,      // NeuroModel, relation
  HASONE_INITIAL_PULLED: 51,  // NeuroModel, initial
  HASONE_INITIAL: 52,         // NeuroModel, initial
  HASONE_CLEAR_MODEL: 54,     // relation
  HASONE_SET_MODEL: 55,       // relation
  HASONE_PRESAVE: 56,         // NeuroModel, relation
  HASONE_POSTREMOVE: 57,      // NeuroModel, relation
  HASONE_CLEAR_KEY: 58,       // NeuroModel, local
  HASONE_UPDATE_KEY: 59,      // NeuroModel, local, NeuroModel, foreign
  HASONE_LOADED: 60,          // NeuroModel, relation, [NeuroModel]

  BELONGSTO_INIT: 61,          // NeuroHasOne
  BELONGSTO_NINJA_REMOVE: 62,  // NeuroModel, relation
  BELONGSTO_NINJA_SAVE: 63,    // NeuroModel, relation
  BELONGSTO_INITIAL_PULLED: 64,// NeuroModel, initial
  BELONGSTO_INITIAL: 65,       // NeuroModel, initial
  BELONGSTO_CLEAR_MODEL: 66,   // relation
  BELONGSTO_SET_MODEL: 67,     // relation
  BELONGSTO_PRESAVE: 68,       // NeuroModel, relation
  BELONGSTO_POSTREMOVE: 69,    // NeuroModel, relation
  BELONGSTO_CLEAR_KEY: 70,     // NeuroModel, local
  BELONGSTO_UPDATE_KEY: 71,    // NeuroModel, local, NeuroModel, foreign
  BELONGSTO_LOADED: 71         // NeuroModel, relation, [NeuroModel]

};