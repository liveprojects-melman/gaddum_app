SELECT
*
FROM
tracks t1
WHERE
NOT EXISTS (
SELECT *
FROM
tracks t2
INNER JOIN
observations t3
ON
t2.id = t3.track
)
LIMIT replacement_parameter_limit; 