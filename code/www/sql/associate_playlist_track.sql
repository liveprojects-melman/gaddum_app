INSERT INTO 
    playlists_to_tracks (
    [id],
    [playlist_id],
    [track_id],
    [order]
    )
SELECT       
    "replacement_parameter_id",
    "replacement_parameter_playlist_id",
    "replacement_parameter_track_id",
    "replacement_parameter_order"