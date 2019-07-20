SELECT t2.*, t1.type
  FROM settings t1
       INNER JOIN
       user_settings t2 ON t1.id = t2.id;