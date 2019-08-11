SELECT * FROM track_references t1 
WHERE  
t1.track_id = 'replacement_parameter_track_id' and
t1.provider_id = 'replacement_parameter_provider_id'
or 
t1.id = 'replacement_parameter_id';