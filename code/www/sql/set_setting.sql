UPDATE settings
SET 
    value="replacement_parameter_value"
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
    "replacement_parameter_value",
    "replacement_parameter_value_type"
WHERE (Select Changes() = 0);