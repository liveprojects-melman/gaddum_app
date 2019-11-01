UPDATE music_provider_settings
SET 
    [value]=?1
WHERE
    [provider]=?2 AND
    [id]=?3
