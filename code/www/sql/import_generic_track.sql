-- tracks are added with a uuid. 
-- the update statement disregards a uuid if the track already exists 
-- note: a track of a different duration is a different track :-)
UPDATE tracks
SET 
    [name]=?1,
    [album]=?2,
    [artist]=?3,
    [duration_ms]=?4
WHERE
    [name]=?1 AND
    [album]=?2 AND
    [artist]=?3 AND
    [duration_ms]=?4;
INSERT INTO 
    tracks (
    [id],
    [name],
    [album],
    [artist],
    [duration_ms]
    )
SELECT  
    ?5,     
    ?1,
    ?2,
    ?3,
    ?4
WHERE (Select Changes() = 0);
