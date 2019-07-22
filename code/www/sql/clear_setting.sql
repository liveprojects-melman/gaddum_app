UPDATE settings
SET 
    value=null
WHERE
    id="replacement_parameter_id";
INSERT INTO 
    settings (
    id,
    [value],
    value_type
    )
SELECT   
    "replacement_parameter_id",
    null
    "replacement_parameter_value_type"
WHERE (Select Changes() = 0);
