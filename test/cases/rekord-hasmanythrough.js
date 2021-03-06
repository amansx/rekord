module( 'Rekord hasManyThrough' );

test( 'no initial value', function(assert)
{
  var prefix = 'hasManyThrough_no_initial_';

  var test = createUserGroups1( prefix );
  var User = test.User;
  var Group = test.Group;
  var UserGroup = test.UserGroup;

  var u0 = User.create({name: 'u0'});

  deepEqual( u0.groups.toArray(), [] );
});

test( 'initial value', function(assert)
{
  var prefix = 'hasManyThrough_initial_';

  var test = createUserGroups1( prefix );

  seedUserGroups1( test );
});

test( 'ninja remove', function(assert)
{
  var prefix = 'hasManyThrough_ninja_remove_';

  var test = createUserGroups1( prefix );

  seedUserGroups1( test );

  var g0 = test.g0;
  var g1 = test.g1;
  var u0 = test.u0;
  var ug0 = test.ug0;

  ug0.$remove();

  deepEqual( u0.groups.toArray(), [g1] );
  deepEqual( g0.users.toArray(), [] );
});

test( 'ninja save sort', function(assert)
{
  var prefix = 'hasManyThrough_ninja_save_sort_';

  var options = {
    comparator: 'name'
  };

  var test = createUserGroups1( prefix, options, options );

  seedUserGroups1( test );

  var g0 = test.g0;
  var g1 = test.g1;
  var u0 = test.u0;
  var ug0 = test.ug0;

  var expected0 = [g0, g1];

  deepEqual( u0.groups.toArray(), expected0 );

  g1.$save( 'name', 'a' );

  var expected1 = [g1, g0];

  deepEqual( u0.groups.toArray(), expected1 );
});

test( 'ninja save add', function(assert)
{
  var prefix = 'hasManyThrough_ninja_save_add_';

  var test = createUserGroups1( prefix );
  var Group = test.Group;
  var UserGroup = test.UserGroup;

  seedUserGroups1( test );

  var u0 = test.u0;
  var g0 = test.g0;
  var g1 = test.g1;
  var g2 = Group.create({name: 'g2'});

  deepEqual( u0.groups.toArray(), [g0, g1] );

  var ug2 = UserGroup.create({user_id: u0.id, group_id: g2.id});

  deepEqual( u0.groups.toArray(), [g0, g1, g2] );
});

test( 'set', function(assert)
{
  var prefix = 'hasManyThrough_set_';

  var test = createUserGroups1( prefix );
  var Group = test.Group;
  var UserGroup = test.UserGroup;

  seedUserGroups1( test );

  var u0 = test.u0;
  var g0 = test.g0;
  var g1 = test.g1;
  var g2 = Group.create({name: 'g2'});

  u0.groups.set( [g0, g2] );

  deepEqual( u0.groups.toArray(), [g0, g2] );
  strictEqual( u0.userGroups.length, 2 );
});

test( 'relate', function(assert)
{
  var prefix = 'hasManyThrough_relate_';

  var test = createUserGroups1( prefix );
  var User = test.User;
  var Group = test.Group;
  var UserGroup = test.UserGroup;

  var g0 = Group.create({name: 'g0'});
  var g1 = Group.create({name: 'g1'});
  var g2 = Group.create({name: 'g2'});
  var u0 = User.create({name: 'u0'});

  strictEqual( u0.groups.length, 0 );
  strictEqual( u0.userGroups.length, 0 );

  u0.groups.relate( g0.id );

  strictEqual( u0.groups.length, 1 );
  strictEqual( u0.groups[0], g0 );
  strictEqual( u0.userGroups.length, 1 );

  u0.groups.relate( g1 );

  strictEqual( u0.groups.length, 2 );
  strictEqual( u0.groups[1], g1 );
  strictEqual( u0.userGroups.length, 2 );

  u0.groups.relate( [g2] );

  strictEqual( u0.groups.length, 3 );
  strictEqual( u0.groups[2], g2 );
  strictEqual( u0.userGroups.length, 3 );
});

test( 'unrelate', function(assert)
{
  var prefix = 'hasManyThrough_unrelate_';

  var test = createUserGroups1( prefix );
  var User = test.User;
  var Group = test.Group;
  var UserGroup = test.UserGroup;

  var g0 = Group.create({name: 'g0'});
  var g1 = Group.create({name: 'g1'});
  var g2 = Group.create({name: 'g2'});
  var u0 = User.create({name: 'u0', groups: [g0, g1, g2]});

  strictEqual( u0.groups.length, 3 );
  strictEqual( u0.userGroups.length, 3 );

  u0.groups.unrelate( g0.id );

  deepEqual( u0.groups.toArray(), [g2, g1] );
  strictEqual( u0.userGroups.length, 2 );

  u0.groups.unrelate( g2 );

  deepEqual( u0.groups.toArray(), [g1] );
  strictEqual( u0.userGroups.length, 1 );

  u0.groups.unrelate();

  strictEqual( u0.groups.length, 0 );
  strictEqual( u0.userGroups.length, 0 );
});

test( 'isRelated', function(assert)
{
  var prefix = 'hasManyThrough_isRelated_';

  var test = createUserGroups1( prefix );
  var User = test.User;
  var Group = test.Group;
  var UserGroup = test.UserGroup;

  var g0 = Group.create({name: 'g0'});
  var g1 = Group.create({name: 'g1'});
  var g2 = Group.create({name: 'g2'});
  var u0 = User.create({name: 'u0', groups: [g0, g1, g2]});

  ok( u0.groups.isRelated( g0.id ) );
  ok( u0.groups.isRelated( g1 ) );
  ok( u0.groups.isRelated( [g2] ) );
  ok( u0.groups.isRelated( [g0.id] ) );

  g1.$remove();

  notOk( u0.groups.isRelated( g1 ) );
});

test( 'get', function(assert)
{
  var prefix = 'hasManyThrough_get_';

  var test = createUserGroups1( prefix );
  var User = test.User;
  var Group = test.Group;
  var UserGroup = test.UserGroup;

  var g0 = Group.create({name: 'g0'});
  var g1 = Group.create({name: 'g1'});
  var g2 = Group.create({name: 'g2'});
  var u0 = User.create({name: 'u0', groups: [g0, g1, g2]});

  var expected = [g0, g1, g2];

  deepEqual( u0.$get( 'groups').toArray(), expected );
  strictEqual( u0.$get( 'groups' ), u0.groups );
});

test( 'encode', function(assert)
{
  var prefix = 'hasManyThrough_encode_';

  var userOptions = {
    save: Rekord.Save.Model,
    store: Rekord.Store.Model
  };

  var test = createUserGroups1( prefix, userOptions );
  var User = test.User;
  var Group = test.Group;
  var UserGroup = test.UserGroup;

  var g0 = Group.create({name: 'g0'});
  var g1 = Group.create({name: 'g1'});
  var u0 = User.create({name: 'u0', groups: [g0, g1]});

  var saving0 = u0.$toJSON( true );
  var storing0 = u0.$toJSON( false );

  deepEqual( saving0, {
    id: u0.id, name: u0.name,
    groups: [ g0.$saved, g1.$saved ]
  });

  deepEqual( storing0, {
    id: u0.id, name: u0.name,
    groups: [ g0.$local, g1.$local ]
  });

  u0.groups.unrelate();

  var saving1 = u0.$toJSON( true );
  var storing1 = u0.$toJSON( false );

  deepEqual( saving1, {
    id: u0.id, name: u0.name,
    groups: []
  });

  deepEqual( storing1, {
    id: u0.id, name: u0.name,
    groups: []
  });
});

test( 'auto save parent', function(assert)
{
  var prefix = 'hasManyThrough_auto_save_parent_';

  var userOptions = {
    save: Rekord.Save.Model
  };

  var test = createUserGroups1( prefix, userOptions );
  var User = test.User;
  var Group = test.Group;
  var UserGroup = test.UserGroup;

  var remote = User.Database.rest;

  var g0 = Group.create({name: 'g0'});
  var g1 = Group.create({name: 'g1'});
  var u0 = User.create({name: 'u0', groups: [g0, g1]});

  deepEqual( remote.lastRecord, {
    id: u0.id, name: u0.name,
    groups: [
      {id: g0.id, name: 'g0'},
      {id: g1.id, name: 'g1'}
    ]
  });

  g0.$save( 'name', 'g0a' );

  deepEqual( remote.lastRecord, {
    groups: [
      {id: g0.id, name: 'g0a'},
      {id: g1.id, name: 'g1'}
    ]
  });
});

test( 'test ninja through remove', function(assert)
{
  var prefix = 'hasManyThrough_ninja_through_remove_';

  var test = createUserGroups1( prefix );
  var User = test.User;
  var Group = test.Group;
  var UserGroup = test.UserGroup;

  seedUserGroups1( test );

  var u0 = test.u0;
  var g0 = test.g0;
  var g1 = test.g1;
  var ug0 = test.ug0;
  var ug1 = test.ug1;

  deepEqual( u0.groups.toArray(), [g0, g1] );

  ug0.$remove();

  deepEqual( u0.groups.toArray(), [g1] );
});

test( 'boot', function(assert)
{
  var prefix = 'hasManyThrough_boot_';

  var test = createUserGroups1( prefix );
  var User = test.User;
  var Group = test.Group;
  var UserGroup = test.UserGroup;

  var u0 = User.boot({
    id: 1, name: 'u0',
    groups: [
      {id: 2, name: 'g2'},
      {id: 3, name: 'g3'}
    ]
  });

  var g2 = Group.get( 2 );
  var g3 = Group.get( 3 );
  var ug2 = UserGroup.get( [1, 2] );
  var ug3 = UserGroup.get( [1, 3] );

  ok( g2 );
  ok( g3 );
  ok( ug2 );
  ok( ug3 );
  ok( u0.$isSaved() );
  notOk( u0.$hasChanges() );
  ok( g2.$isSaved() );
  notOk( g2.$hasChanges() );
  ok( g3.$isSaved() );
  notOk( g3.$hasChanges() );
  ok( ug2.$isSaved() );
  notOk( ug2.$hasChanges() );
  ok( ug3.$isSaved() );
  notOk( ug3.$hasChanges() );

  deepEqual( u0.groups.toArray(), [g2, g3], 'has both groups' );

  deepEqual( g2.users.toArray(), [u0] );
  deepEqual( g3.users.toArray(), [u0] );
  deepEqual( u0.userGroups.toArray(), [ug2, ug3] );
  deepEqual( g2.userGroups.toArray(), [ug2] );
  deepEqual( g3.userGroups.toArray(), [ug3] );
  strictEqual( ug2.group, g2 );
  strictEqual( ug2.user, u0 );
  strictEqual( ug3.group, g3 );
  strictEqual( ug3.user, u0 );
  strictEqual( ug2.group_id, 2 );
  strictEqual( ug2.user_id, 1 );
  strictEqual( ug3.group_id, 3 );
  strictEqual( ug3.user_id, 1 );

  u0.groups.unrelate( g2 );

  deepEqual( u0.groups.toArray(), [g3], 'unrelate successful' );

  ok( ug2.$isDeleted() );

  deepEqual( g2.users.toArray(), [] );
  deepEqual( g3.users.toArray(), [u0] );
  deepEqual( u0.userGroups.toArray(), [ug3] );
  deepEqual( g2.userGroups.toArray(), [] );
  deepEqual( g3.userGroups.toArray(), [ug3] );
  strictEqual( ug2.group, null );
  strictEqual( ug2.user, null );
  strictEqual( ug3.group, g3 );
  strictEqual( ug3.user, u0 );
  strictEqual( ug2.group_id, 2 );
  strictEqual( ug2.user_id, 1 );
  strictEqual( ug3.group_id, 3 );
  strictEqual( ug3.user_id, 1 );
});

test( 'wait until dependents are saved', function(assert)
{
  var timer = assert.timer();
  var prefix = 'hasManyThrough_wait_dependents_';

  var UserGroup = Rekord({
    name: prefix + 'user_group',
    key: ['user_id', 'group_id']
  });

  var Group = Rekord({
    name: prefix + 'group',
    fields: ['name']
  });

  var User = Rekord({
    name: prefix + 'user',
    fields: ['name'],
    hasManyThrough: {
      groups: {
        model: Group,
        through: UserGroup,
        local: 'user_id',
        foreign: 'group_id'
      }
    }
  });

  var urest = User.Database.rest;
  var ugrest = UserGroup.Database.rest;

  var g0 = new Group({name: 'g0'});
  var g1 = new Group({name: 'g1'});
  var g2 = new Group({name: 'g2'});
  var u0 = new User({name: 'u0', groups: [g0, g1, g2]});

  var ug0 = UserGroup.get( [u0.id, g0.id] );
  var ug1 = UserGroup.get( [u0.id, g1.id] );
  var ug2 = UserGroup.get( [u0.id, g2.id] );

  ok( ug0.$isSynced() );
  ok( ug1.$isSynced() );
  ok( ug2.$isSynced() );
  notOk( ug0.$isSaved() );
  notOk( ug1.$isSaved() );
  notOk( ug2.$isSaved() );
  notOk( u0.$isSaved() );

  urest.delay = 2;
  ugrest.delay = 2;

  User.Database.rest.returnValue = {id: u0.id, groups: []};

  u0.$save();

  notOk( ug0.$isSynced() );
  notOk( ug1.$isSynced() );
  notOk( ug2.$isSynced() );

  notOk( ug0.$isSaved(), 'group 0 not saved since user not saved' );
  notOk( ug1.$isSaved(), 'group 1 not saved since user not saved' );
  notOk( ug2.$isSaved(), 'group 1 not saved since user not saved' );
  notOk( u0.$isSaved(), 'user not saved' );

  wait( 1, function()
  {
    notOk( ug0.$isSaved(), 'group 0 not saved since user not saved (2)' );
    notOk( ug1.$isSaved(), 'group 1 not saved since user not saved (2)' );
    notOk( ug2.$isSaved(), 'group 1 not saved since user not saved (2)' );
    notOk( u0.$isSaved(), 'user not saved (2)' );
  });

  wait( 3, function()
  {
    notOk( ug0.$isSaved(), 'group 0 not saved since user not saved (3)' );
    notOk( ug1.$isSaved(), 'group 1 not saved since user not saved (3)' );
    notOk( ug2.$isSaved(), 'group 2 not saved since user not saved (3)' );
    ok( u0.$isSaved(), 'user saved' );
  });

  wait( 5, function()
  {
    ok( ug0.$isSaved(), 'group 0 saved' );
    ok( ug1.$isSaved(), 'group 1 saved' );
    ok( ug2.$isSaved(), 'group 2 saved' );
    ok( u0.$isSaved(), 'user saved' );

    deepEqual( u0.groups.toArray(), [g0, g1, g2] );
  });

  timer.run();
});

test( 'clone', function(assert)
{
  var prefix = 'hasManyThrough_clone_';

  var test = createUserGroups1( prefix );
  var User = test.User;
  var Group = test.Group;
  var UserGroup = test.UserGroup;

  var u0 = new User({
    name: 'u0',
    groups: [
      {name: 'g0'},
      {name: 'g1'}
    ]
  });
  var g0 = u0.groups[0];
  var g1 = u0.groups[1];
  var ug0 = u0.userGroups[0];
  var ug1 = u0.userGroups[1];

  strictEqual( u0.groups.length, 2 );
  isInstance( g0, Group );
  isInstance( g1, Group );
  strictEqual( u0.userGroups.length, 2 );
  isInstance( ug0, UserGroup );
  isInstance( ug1, UserGroup );
  strictEqual( ug0.user, u0 );
  strictEqual( ug1.user, u0 );
  strictEqual( ug0.group, g0 );
  strictEqual( ug1.group, g1 );

  var u1 = u0.$clone( {groups:{}} );
  var u1g0 = u1.userGroups[0];
  var u1g1 = u1.userGroups[1];

  strictEqual( u1.groups.length, 2 );
  strictEqual( u1.groups[0], g0 );
  strictEqual( u1.groups[1], g1 );
  strictEqual( u1.userGroups.length, 2 );
  isInstance( u1g0, UserGroup );
  isInstance( u1g1, UserGroup );
  strictEqual( u1g0.user, u1 );
  strictEqual( u1g1.user, u1 );
  strictEqual( u1g0.group, g0 );
  strictEqual( u1g1.group, g1 );
});

test( 'sync', function(assert)
{
  var prefix = 'hasManyThrough_sync_';

  var options = {
    listenForRelated: false,
    comparator: 'name'
  };
  var test = createUserGroups2( prefix, options, options );
  var User = test.User;
  var Group = test.Group;
  var UserGroup = test.UserGroup;

  var u0 = User.create({id: 1, name: 'u0'});
  var g0 = Group.create({id: 2, name: 'g0'});
  var g1 = Group.create({id: 3, name: 'g1'});
  var g2 = Group.create({id: 4, name: 'g2'});
  var ug00 = UserGroup.create({user_id: 1, group_id: 2});
  var ug01 = UserGroup.create({user_id: 1, group_id: 3});

  strictEqual( u0.groups.length, 0 );

  u0.groups.sync();

  strictEqual( u0.groups.length, 2 );
  strictEqual( u0.groups[0], g0 );
  strictEqual( u0.groups[1], g1 );

  var ug02 = UserGroup.create({user_id: 1, group_id: 4});

  strictEqual( u0.groups.length, 2 );
  strictEqual( u0.groups[0], g0 );
  strictEqual( u0.groups[1], g1 );

  u0.groups.sync();

  strictEqual( u0.groups.length, 3 );
  strictEqual( u0.groups[0], g0 );
  strictEqual( u0.groups[1], g1 );
  strictEqual( u0.groups[2], g2 );
});
