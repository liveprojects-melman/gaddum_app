UPDATE playlists
SET 
    [name]=?1
WHERE
    id=?2;
INSERT INTO 
    playlists (
    id,
    [name]
    )
SELECT   
    ?2,
    ?1
WHERE (Select Changes() = 0);
