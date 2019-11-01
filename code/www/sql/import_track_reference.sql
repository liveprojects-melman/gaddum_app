-- we use the update statement to ensure that we import the latest
-- data for a provider's track.
UPDATE track_references
SET 
    [web_uri]=?1,
    [player_uri]=?2,
    [thumbnail_uri]=?3
WHERE
    [track_id] = ?4 AND
    [provider_id] = ?5;
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
    ?6,     
    ?1,
    ?2,
    ?3,
    ?4,
    ?5
WHERE (Select Changes() = 0);