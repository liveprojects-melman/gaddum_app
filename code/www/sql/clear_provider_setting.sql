UPDATE music_provider_settings
SET 
    [value]=null
WHERE
    [provider]="replacement_parameter_provider_id" AND
    [id]="replacement_parameter_setting_id"