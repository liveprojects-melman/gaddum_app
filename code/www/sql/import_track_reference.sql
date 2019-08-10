-- we use the update statement to ensure that we import the latest
-- data for a provider's track.
UPDATE track_references
SET 
    [web_uri]="replacement_parameter_web_uri",
    [player_uri]="replacement_parameter_player_uri",
    [thumbnail_uri]="replacement_parameter_thumbnail_uri",
WHERE
    [track_id] = "replacement_parameter_track_id" AND
    [provider_id] = "replacement_parameter_provider_id";
INSERT INTO 
    track_references (
    [id],
    [web_uri],
    [player_uri],
    [thumbnail_uri],
    [track_id],
    [provider_id]
    )
SELECT  
    "replacement_parameter_id",     
    "replacement_parameter_web_uri",
    "replacement_parameter_player_uri",
    "replacement_parameter_thumbnail_uri",
    "replacement_parameter_track_id",
    "replacement_parameter_provider_id"
WHERE (Select Changes() = 0);