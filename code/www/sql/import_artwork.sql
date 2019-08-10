UPDATE image_cache
SET 
    [web_uri]="replacement_parameter_web_uri",
    [base64_image]="replacement_parameter_base64_image"
WHERE
    [web_uri]="replacement_parameter_web_uri"; 
INSERT INTO 
    image_cache (
    [web_uri],
    [base64_image]
    )
SELECT       
    "replacement_parameter_web_uri",
    "replacement_parameter_base64_image"
WHERE (Select Changes() = 0);