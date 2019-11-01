UPDATE image_cache
SET 
    [web_uri]=?1,
    [base64_image]=?2
WHERE
    [web_uri]=?1; 
INSERT INTO 
    image_cache (
    [web_uri],
    [base64_image]
    )
SELECT       
    ?1,
    ?2
WHERE (Select Changes() = 0);