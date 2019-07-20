UPDATE settings
SET 
    value="replacement_parameter_value"
WHERE
    id="replacement_parameter_id";
INSERT INTO 
    settings (
    id,
    [value],
    [type]
    )
SELECT   
    "replacement_parameter_id",
    "replacement_parameter_value",
    "replacement_parameter_type"
WHERE (Select Changes() = 0);