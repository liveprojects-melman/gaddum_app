SELECT * FROM tracks t1 
WHERE  
t1.name = "replacement_parameter_name" and 
t1.album = "replacement_parameter_album" and 
t1.artist = "replacement_parameter_artist" and
t1.duration_ms = "replacement_parameter_duration_ms"
or 
t1.id = "replacement_parameter_id" ;