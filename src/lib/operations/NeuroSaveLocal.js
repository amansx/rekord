function NeuroSaveLocal(model)
{
  this.reset( model );
}

extend( new NeuroOperation( false, 'NeuroSaveLocal' ), NeuroSaveLocal,
{

  run: function(db, model)
  {
    // If the model is deleted, return immediately!
    if ( model.$deleted )
    {
      Neuro.debug( Neuro.Events.SAVE_LOCAL_DELETED, this, model );

      return this.finish();
    }

    // Fill the key if need be
    var key = model.$key();
    var encoded = model.$toJSON( false );

    // If this model doesn't have a local copy yet - create it.
    if ( !model.$local ) 
    {
      model.$local = encoded;
    } 
    else 
    {
      // Copy to the local copy
      transfer( encoded, model.$local );
    }

    db.store.put( key, model.$local, this.success(), this.failure() );
  },

  onSuccess: function(key, encoded, previousValue)
  {
    var db = this.db;
    var model = this.model;

    Neuro.debug( Neuro.Events.SAVE_LOCAL, this, model );

    this.tryNext( NeuroSaveRemote );

    if ( db.cachePending )
    {
      db.store.remove( model.$key() );
    }
  },

  onFailure: function(e)
  {
    var model = this.model;

    Neuro.debug( Neuro.Events.SAVE_LOCAL_ERROR, this, model, e );

    this.tryNext( NeuroSaveRemote );
  }

});
