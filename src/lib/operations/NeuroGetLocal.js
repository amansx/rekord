function NeuroGetLocal(model, cascade)
{
  this.reset( model, cascade );
}

extend( NeuroOperation, NeuroGetLocal,
{

  interrupts: false,

  type: 'NeuroGetLocal',

  run: function(db, model)
  {
    if ( model.$isDeleted() )
    {
      this.finish();
    }
    else if ( db.cache === Neuro.Cache.All )
    {
      db.store.get( model.$key(), this.success(), this.failure() );
    }
    else if ( this.cascade )
    {
      Neuro.debug( Neuro.Debugs.GET_LOCAL_SKIPPED, model );

      this.insertNext( NeuroGetRemote ); 
      this.finish();
    }
  },

  onSuccess: function(key, encoded)
  {
    var model = this.model;

    if ( isObject( encoded ) )
    {
      model.$set( encoded );
    }

    Neuro.debug( Neuro.Debugs.GET_LOCAL, model, encoded );

    if ( this.cascade && !model.$isDeleted() )
    {
      this.insertNext( NeuroGetRemote );
    }
  },

  onFailure: function(e)
  {
    var model = this.model;

    Neuro.debug( Neuro.Debugs.GET_LOCAL, model, e );

    if ( this.cascade && !model.$isDeleted()  )
    {
      this.insertNext( NeuroGetRemote );
    }
  }

});