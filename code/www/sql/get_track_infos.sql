SELECT 
t1.name,
t1.album,
t1.artist,
t1.duration_s,
t2.web_uri,
t2.thumbnail_uri,
t2.player_uri
FROM tracks t1 
JOIN track_references t2 
ON(
t1.name = 'replacement_parameter_name' and 
t1.album='replacement_parameter_album' and 
t1.artist = 'replacement_parameter_artist' and
t1.duration_s = 'replacement_parameter_duration_s'
OR 
t1.id = 'replacement_parameter_id' 
)
AND
t1.id = t2.track_id 
AND 
t2.provider_id = 'replacement_parameter_provider_id'; 