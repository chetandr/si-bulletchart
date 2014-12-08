SET io.sort.mb 10;
REGISTER /home/shareinsights/reshma/customtask/*.jar;
movies  = LOAD '/home/shareinsights/reshma/customtask/movies_data.csv' using PigStorage(',') as (id,movie_name,year, rating,duration);
result = FOREACH movies GENERATE movie_name as movie_name, in.co.psl.si.udf.CustomTaskUDF('WordCount',movie_name,'T') AS word_count;
dump result;