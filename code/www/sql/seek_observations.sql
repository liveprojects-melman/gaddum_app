-- priority search of behaviour observations
-- most important:  
-- mood, location and timeslot coincide on tracks which are suitable for mood. 
-- then: mood, location and suitability
-- then: mood, timeslot and suitability
-- then: mood and suitability
-- joins with generic tracks so we get comprehensive output

with 
priorities as (
WITH T(priority) AS (
VALUES (1),(2),(3),(4),(5)
)
SELECT * FROM T
), 
m_l_t_s as
(
select 
t1.*
,t2.priority
,(
(replacement_parameter_location_lat - t1.location_lat) * (replacement_parameter_location_lat - t1.location_lat) 
+
(replacement_parameter_location_lon - t1.location_lon) * (replacement_parameter_location_lat - t1.location_lon)) 
as dist
from observations t1 join priorities t2 on
t2.priority = 1 
AND 
t1.mood_id = 'replacement_parameter_mood_id' 
AND t1.mood_suitable = 'true'
AND t1.timeslot = replacement_parameter_timeslot
AND t1.location_code = 'replacement_parameter_location_code' -- filter first on postcode
ORDER BY -- ordering by something related to distance from specified location 
dist ASC, t1.timestamp_ms DESC

LIMIT replacement_parameter_limit
),
m_l_s as
(
select t1.*,t2.priority
,(
(replacement_parameter_location_lat - t1.location_lat) * (replacement_parameter_location_lat - t1.location_lat) 
+
(replacement_parameter_location_lon - t1.location_lon) * (replacement_parameter_location_lat - t1.location_lon)) 
as dist 
from observations t1 join priorities t2 on 
t2.priority = 2 
AND t1.mood_id = 'replacement_parameter_mood_id' 
AND t1.mood_suitable = 'true'
AND NOT t1.timeslot = replacement_parameter_timeslot
AND t1.location_code = 'replacement_parameter_location_code' -- filter first on postcode
ORDER BY -- ordering by something related to distance from specified location
dist ASC, t1.timestamp_ms DESC
LIMIT replacement_parameter_limit
)
,
m_t_s as
(
select t1.*,t2.priority from observations t1 join priorities t2 on 
t2.priority = 3 
AND t1.mood_id = 'replacement_parameter_mood_id' 
AND t1.mood_suitable = 'true'
AND t1.timeslot = replacement_parameter_timeslot
AND NOT t1.location_code = 'replacement_parameter_location_code' 
ORDER BY t1.timestamp_ms DESC
LIMIT replacement_parameter_limit
)
,
m_s as
(
select t1.*,t2.priority from observations t1 join priorities t2 on 
t2.priority = 4 
AND t1.mood_id = 'replacement_parameter_mood_id' 
AND t1.mood_suitable = 'true'
AND NOT t1.timeslot = replacement_parameter_timeslot 
AND NOT t1.location_code = 'replacement_parameter_location_code'
ORDER BY t1.timestamp_ms DESC
LIMIT replacement_parameter_limit
)
,
t_s as
(
select 
t1.*
,t2.priority
from observations t1 join priorities t2 on
t2.priority = 5 
AND t1.mood_suitable = 'true'
AND t1.timeslot = replacement_parameter_timeslot
ORDER BY t1.timestamp_ms DESC
LIMIT replacement_parameter_limit
),
collation as
(
select t1.timestamp_ms, t1.mood_id, t1.timeslot, t1.location_lat, t1.location_lon, t1.location_code, t1.track_percent, t1.num_repeats, t1.mood_suitable, t1.track, t1.priority from m_l_t_s t1
UNION ALL
select t1.timestamp_ms, t1.mood_id, t1.timeslot, t1.location_lat, t1.location_lon, t1.location_code, t1.track_percent, t1.num_repeats, t1.mood_suitable, t1.track, t1.priority  from m_l_s t1
UNION ALL
select t1.timestamp_ms, t1.mood_id, t1.timeslot, t1.location_lat, t1.location_lon, t1.location_code, t1.track_percent, t1.num_repeats, t1.mood_suitable, t1.track, t1.priority  from m_t_s t1
UNION ALL
select t1.timestamp_ms, t1.mood_id, t1.timeslot, t1.location_lat, t1.location_lon, t1.location_code, t1.track_percent, t1.num_repeats, t1.mood_suitable, t1.track, t1.priority  from m_s t1
UNION ALL
select t1.timestamp_ms, t1.mood_id, t1.timeslot, t1.location_lat, t1.location_lon, t1.location_code, t1.track_percent, t1.num_repeats, t1.mood_suitable, t1.track, t1.priority  from t_s t1
)
select * from collation;




