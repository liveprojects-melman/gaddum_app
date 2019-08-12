UPDATE playlists
SET 
    [name]="replacement_parameter_name"
WHERE
    id="replacement_parameter_id";
INSERT INTO 
    playlists (
    id,
    [name]
    )
SELECT   
    "replacement_parameter_id",
    "replacement_parameter_name"
WHERE (Select Changes() = 0);
