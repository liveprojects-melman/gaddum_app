select count(*)
  FROM settings t1
       INNER JOIN
       user_settings t2 ON t1.id = t2.id and t1.value is null;