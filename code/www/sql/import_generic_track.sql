-- tracks are added with a uuid. 
-- the update statement disregards a uuid if the track already exists 
-- note: a track of a different duration is a different track :-)
UPDATE tracks
SET 
    [name]="replacement_parameter_name",
    [album]="replacement_parameter_album",
    [artist]="replacement_parameter_artist",
    [duration_s]="replacement_parameter_duration_s"
WHERE
    [name]="replacement_parameter_name" AND
    [album]="replacement_parameter_album" AND
    [artist]="replacement_parameter_artist" AND
    [duration]="replacement_parameter_duration_s";
INSERT INTO 
    tracks (
    [id],
    [name],
    [album],
    [artist],
    [duration_s]
    )
SELECT  
    "replacement_parameter_id",     
    "replacement_parameter_name",
    "replacement_parameter_album",
    "replacement_parameter_artist",
    "replacement_parameter_duration_s"
WHERE (Select Changes() = 0);
