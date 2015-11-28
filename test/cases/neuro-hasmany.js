module( 'Neuro hasMany' );

test( 'no initial value', function(assert)
{
  var prefix = 'hasMany_no_initial_';

  var Task = Neuro({
    name: prefix + 'task',
    fields: ['id', 'task_list_id', 'name', 'done'],
    defaults: { done: false },
    belongsTo: {
      list: {
        model: prefix + 'list',
        local: 'task_list_id'
      }
    }
  });

  var TaskList = Neuro({
    name: prefix + 'list',
    fields: ['id', 'name'],
    hasMany: {
      tasks: {
        model: Task,
        foreign: 'task_list_id'
      }
    }
  });

  var l0 = TaskList.create({name: 'l0'});

  deepEqual( l0.tasks.toArray(), [] );
});

test( 'initial value', function(assert)
{
  var prefix = 'hasMany_initial_';

  var Task = Neuro({
    name: prefix + 'task',
    fields: ['id', 'task_list_id', 'name', 'done'],
    defaults: { done: false },
    belongsTo: {
      list: {
        model: prefix + 'list',
        local: 'task_list_id'
      }
    }
  });

  var TaskList = Neuro({
    name: prefix + 'list',
    fields: ['id', 'name'],
    hasMany: {
      tasks: {
        model: Task,
        foreign: 'task_list_id'
      }
    }
  });

  var t0 = Task.create({name: 't0'});
  var t1 = Task.create({name: 't1'});
  var t2 = Task.create({name: 't2'});
  var l0 = TaskList.create({name: 'l0', tasks: [t0, t1, t2]});

  strictEqual( t0.list, l0 );
  strictEqual( l0.tasks.length, 3 );
  strictEqual( l0.tasks[0], t0 );
  strictEqual( l0.tasks[1], t1 );
  strictEqual( l0.tasks[2], t2 );
});

test( 'ninja remove', function(assert)
{
  var prefix = 'hasMany_ninja_remove_';

  var Task = Neuro({
    name: prefix + 'task',
    fields: ['id', 'task_list_id', 'name', 'done'],
    defaults: { done: false },
    belongsTo: {
      list: {
        model: prefix + 'list',
        local: 'task_list_id'
      }
    }
  });

  var TaskList = Neuro({
    name: prefix + 'list',
    fields: ['id', 'name'],
    hasMany: {
      tasks: {
        model: Task,
        foreign: 'task_list_id'
      }
    }
  });

  var t0 = Task.create({name: 't0'});
  var t1 = Task.create({name: 't1'});
  var t2 = Task.create({name: 't2'});
  var l0 = TaskList.create({name: 'l0', tasks: [t0, t1, t2]});

  strictEqual( t0.list, l0 );
  strictEqual( l0.tasks.length, 3 );
  strictEqual( l0.tasks[0], t0 );
  strictEqual( l0.tasks[1], t1 );
  strictEqual( l0.tasks[2], t2 );

  t1.$remove();

  strictEqual( l0.tasks.length, 2 );
  strictEqual( l0.tasks[0], t0 );
  strictEqual( l0.tasks[1], t2 );
});

test( 'ninja save unrelated', function(assert)
{
  var prefix = 'hasMany_ninja_save_unrelated_';

  var Task = Neuro({
    name: prefix + 'task',
    fields: ['id', 'task_list_id', 'name', 'done'],
    defaults: { done: false },
    belongsTo: {
      list: {
        model: prefix + 'list',
        local: 'task_list_id'
      }
    }
  });

  var TaskList = Neuro({
    name: prefix + 'list',
    fields: ['id', 'name'],
    hasMany: {
      tasks: {
        model: Task,
        foreign: 'task_list_id'
      }
    }
  });

  var t0 = Task.create({name: 't0'});
  var t1 = Task.create({name: 't1'});
  var t2 = Task.create({name: 't2'});
  var l0 = TaskList.create({name: 'l0', tasks: [t0, t1, t2]});

  strictEqual( t0.list, l0 );
  strictEqual( l0.tasks.length, 3 );
  strictEqual( l0.tasks[0], t0 );
  strictEqual( l0.tasks[1], t1 );
  strictEqual( l0.tasks[2], t2 );

  t1.task_list_id = 4;
  t1.$save();

  strictEqual( l0.tasks.length, 2 );
  strictEqual( l0.tasks[0], t0 );
  strictEqual( l0.tasks[1], t2 );
});

test( 'ninja save sort', function(assert)
{
  var prefix = 'hasMany_ninja_save_sort_';

  var Task = Neuro({
    name: prefix + 'task',
    fields: ['id', 'task_list_id', 'name', 'done', 'created_at'],
    defaults: { done: false, created_at: Date.now },
    belongsTo: {
      list: {
        model: prefix + 'list',
        local: 'task_list_id'
      }
    }
  });

  var TaskList = Neuro({
    name: prefix + 'list',
    fields: ['id', 'name'],
    hasMany: {
      tasks: {
        model: Task,
        foreign: 'task_list_id',
        comparator: ['-done', 'created_at']
      }
    }
  });

  var t0 = Task.create({name: 't0', created_at: 1});
  var t1 = Task.create({name: 't1', created_at: 2});
  var t2 = Task.create({name: 't2', created_at: 3});
  var l0 = TaskList.create({name: 'l0', tasks: [t0, t1, t2]});

  strictEqual( t0.list, l0 );
  strictEqual( l0.tasks.length, 3 );
  strictEqual( l0.tasks[0], t0 );
  strictEqual( l0.tasks[1], t1 );
  strictEqual( l0.tasks[2], t2 );

  t1.done = true;
  t1.$save();

  strictEqual( l0.tasks.length, 3 );
  strictEqual( l0.tasks[0], t0 );
  strictEqual( l0.tasks[1], t2 );
  strictEqual( l0.tasks[2], t1 );
});

test( 'ninja save add', function(assert)
{
  var prefix = 'hasMany_ninja_save_add_';

  var Task = Neuro({
    name: prefix + 'task',
    fields: ['id', 'task_list_id', 'name', 'done', 'created_at'],
    defaults: { done: false, created_at: Date.now },
    belongsTo: {
      list: {
        model: prefix + 'list',
        local: 'task_list_id'
      }
    }
  });

  var TaskList = Neuro({
    name: prefix + 'list',
    fields: ['id', 'name'],
    hasMany: {
      tasks: {
        model: Task,
        foreign: 'task_list_id'
      }
    }
  });

  var t0 = Task.create({name: 't0'});
  var t1 = Task.create({name: 't1'});
  var t2 = Task.create({name: 't2'});
  var l0 = TaskList.create({name: 'l0', tasks: [t0, t1, t2]});

  strictEqual( t0.list, l0 );
  strictEqual( l0.tasks.length, 3 );
  strictEqual( l0.tasks[0], t0 );
  strictEqual( l0.tasks[1], t1 );
  strictEqual( l0.tasks[2], t2 );

  var t3 = Task.create({name: 't3', task_list_id: l0.id});
  
  strictEqual( l0.tasks.length, 4 );
  strictEqual( l0.tasks[0], t0 );
  strictEqual( l0.tasks[1], t1 );
  strictEqual( l0.tasks[2], t2 );
  strictEqual( l0.tasks[3], t3 );
});

test( 'set', function(assert)
{
  var prefix = 'hasMany_set_';

  var Task = Neuro({
    name: prefix + 'task',
    fields: ['id', 'task_list_id', 'name'],
    belongsTo: {
      list: {
        model: prefix + 'list',
        local: 'task_list_id'
      }
    }
  });

  var TaskList = Neuro({
    name: prefix + 'list',
    fields: ['id', 'name'],
    hasMany: {
      tasks: {
        model: Task,
        foreign: 'task_list_id'
      }
    }
  });

  var t0 = Task.create({name: 't0'});
  var t1 = Task.create({name: 't1'});
  var t2 = Task.create({name: 't2'});
  var l0 = TaskList.create({name: 'l0', tasks: [t0, t1]});

  strictEqual( t0.list, l0 );
  strictEqual( t1.list, l0 );
  strictEqual( t2.list, void 0 );
  strictEqual( l0.tasks.length, 2 );
  strictEqual( l0.tasks[0], t0 );
  strictEqual( l0.tasks[1], t1 );

  notOk( t0.$isDeleted() );
  notOk( t1.$isDeleted() );
  notOk( t2.$isDeleted() );
  
  l0.$set( 'tasks', [t2, t1] );

  ok( t0.$isDeleted() );
  notOk( t1.$isDeleted() );
  notOk( t2.$isDeleted() );

  strictEqual( t0.list, null );
  strictEqual( t1.list, l0 );
  strictEqual( t2.list, l0 );
});

test( 'relate', function(assert)
{
  var prefix = 'hasMany_relate_';

  var Task = Neuro({
    name: prefix + 'task',
    fields: ['id', 'task_list_id', 'name'],
    belongsTo: {
      list: {
        model: prefix + 'list',
        local: 'task_list_id'
      }
    }
  });

  var TaskList = Neuro({
    name: prefix + 'list',
    fields: ['id', 'name'],
    hasMany: {
      tasks: {
        model: Task,
        foreign: 'task_list_id'
      }
    }
  });

  var t0 = Task.create({name: 't0'});
  var t1 = Task.create({name: 't1'});
  var t2 = Task.create({name: 't2'});
  var l0 = TaskList.create({name: 'l0'});

  strictEqual( l0.tasks.length, 0 );
  
  l0.tasks.relate( t0.id );

  strictEqual( l0.tasks.length, 1 );
  strictEqual( l0.tasks[0], t0 );

  l0.tasks.relate( t1 );

  strictEqual( l0.tasks.length, 2 );
  strictEqual( l0.tasks[0], t0 );
  strictEqual( l0.tasks[1], t1 );

  l0.tasks.relate( [t2] );

  strictEqual( l0.tasks.length, 3 );
  strictEqual( l0.tasks[0], t0 );
  strictEqual( l0.tasks[1], t1 );
  strictEqual( l0.tasks[2], t2 );
});

test( 'unrelate', function(assert)
{
  var prefix = 'hasMany_unrelate_';
  var index = 0;
  var nextIndex = function() {
    return index++;
  };

  var Task = Neuro({
    name: prefix + 'task',
    fields: ['id', 'task_list_id', 'name', 'index'],
    defaults: { index: nextIndex },
    belongsTo: {
      list: {
        model: prefix + 'list',
        local: 'task_list_id'
      }
    }
  });

  var TaskList = Neuro({
    name: prefix + 'list',
    fields: ['id', 'name'],
    hasMany: {
      tasks: {
        model: Task,
        foreign: 'task_list_id',
        comparator: 'index'
      }
    }
  });

  var t0 = Task.create({name: 't0'});
  var t1 = Task.create({name: 't1'});
  var t2 = Task.create({name: 't2'});
  var l0 = TaskList.create({name: 'l0', tasks: [t0, t1, t2]});

  strictEqual( l0.tasks.length, 3 );
  
  l0.tasks.unrelate( t0.id );

  strictEqual( l0.tasks.length, 2 );
  strictEqual( l0.tasks[0], t1 );
  strictEqual( l0.tasks[1], t2 );

  l0.tasks.unrelate( t1 );

  strictEqual( l0.tasks.length, 1 );
  strictEqual( l0.tasks[0], t2 );

  l0.tasks.unrelate();

  strictEqual( l0.tasks.length, 0 );
});

test( 'isRelated', function(assert)
{
  var prefix = 'hasMany_isRelated_';
  
  var Task = Neuro({
    name: prefix + 'task',
    fields: ['id', 'task_list_id', 'name'],
    belongsTo: {
      list: {
        model: prefix + 'list',
        local: 'task_list_id'
      }
    }
  });

  var TaskList = Neuro({
    name: prefix + 'list',
    fields: ['id', 'name'],
    hasMany: {
      tasks: {
        model: Task,
        foreign: 'task_list_id'
      }
    }
  });

  var t0 = Task.create({name: 't0'});
  var t1 = Task.create({name: 't1'});
  var t2 = Task.create({name: 't2'});
  var l0 = TaskList.create({name: 'l0', tasks: [t0, t1, t2]});

  strictEqual( l0.tasks.length, 3 );
  ok( l0.tasks.isRelated( t0.id ) );
  ok( l0.tasks.isRelated( t1.id ) );
  ok( l0.tasks.isRelated( t2.id ) );

  l0.tasks.unrelate( t1.id );

  strictEqual( l0.tasks.length, 2 );
  ok( l0.tasks.isRelated( t0.id ) );
  notOk( l0.tasks.isRelated( t1.id ) );
  ok( l0.tasks.isRelated( t2.id ) );
});

test( 'get', function(assert)
{
  var prefix = 'hasMany_get_';
  
  var Task = Neuro({
    name: prefix + 'task',
    fields: ['id', 'task_list_id', 'name'],
    belongsTo: {
      list: {
        model: prefix + 'list',
        local: 'task_list_id'
      }
    }
  });

  var TaskList = Neuro({
    name: prefix + 'list',
    fields: ['id', 'name'],
    hasMany: {
      tasks: {
        model: Task,
        foreign: 'task_list_id'
      }
    }
  });

  var t0 = Task.create({name: 't0'});
  var t1 = Task.create({name: 't1'});
  var t2 = Task.create({name: 't2'});
  var l0 = TaskList.create({name: 'l0', tasks: [t0, t1, t2]});

  var expected = [t0, t1, t2];

  deepEqual( l0.$get( 'tasks').toArray(), expected );
  strictEqual( l0.$get( 'tasks' ), l0.tasks );
});

test( 'encode', function(assert)
{
  var prefix = 'hasMany_encode_';
  
  var Task = Neuro({
    name: prefix + 'task',
    fields: ['id', 'task_list_id', 'name'],
    belongsTo: {
      list: {
        model: prefix + 'list',
        local: 'task_list_id'
      }
    }
  });

  var TaskList = Neuro({
    name: prefix + 'list',
    fields: ['id', 'name'],
    hasMany: {
      tasks: {
        model: Task,
        foreign: 'task_list_id',
        save: Neuro.Save.Model,
        store: Neuro.Store.Model
      }
    }
  });

  var t0 = Task.create({name: 't0'});
  var l0 = TaskList.create({name: 'l0', tasks: [t0]});

  var saving0 = l0.$toJSON( true );
  var storing0 = l0.$toJSON( false );

  deepEqual( saving0, {
    id: l0.id, name: l0.name, 
    tasks: [
      {id: t0.id, name: t0.name, task_list_id: l0.id}
    ]
  });

  deepEqual( storing0, {
    id: l0.id, name: l0.name, 
    tasks: [
      {id: t0.id, name: t0.name, task_list_id: l0.id,
        $saved: {id: t0.id, name: t0.name, task_list_id: l0.id}, $status: 0
      }
    ]
  });

  l0.tasks.unrelate();

  var saving1 = l0.$toJSON( true );
  var storing1 = l0.$toJSON( false );

  deepEqual( saving1, {
    id: l0.id, name: l0.name, 
    tasks: []
  });

  deepEqual( storing1, {
    id: l0.id, name: l0.name, 
    tasks: []
  });
});

test( 'auto save parent', function(assert)
{
  var prefix = 'hasMany_auto_save_parent_';
  
  var Task = Neuro({
    name: prefix + 'task',
    fields: ['id', 'task_list_id', 'name'],
    belongsTo: {
      list: {
        model: prefix + 'list',
        local: 'task_list_id'
      }
    }
  });

  var TaskList = Neuro({
    name: prefix + 'list',
    fields: ['id', 'name'],
    hasMany: {
      tasks: {
        model: Task,
        foreign: 'task_list_id',
        save: Neuro.Save.Model
      }
    }
  });

  var remote = TaskList.Database.rest;

  var t0 = Task.create({name: 't0'});
  var l0 = TaskList.create({name: 'l0', tasks: [t0]});

  deepEqual( remote.lastRecord, {
    tasks: [
      {id: t0.id, name: 't0', task_list_id: l0.id}
    ]
  });

  t0.$save( 'name', 't0a' );

  deepEqual( remote.lastRecord, {
    tasks: [
      {id: t0.id, name: 't0a', task_list_id: l0.id}
    ]
  });
});
