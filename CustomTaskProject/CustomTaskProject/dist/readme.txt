------------
Introduction
------------

This eclipse project can be used to develop a custom task. It contains following artifacts :
1. readme.txt - To explain process to create and test a custom task.
2. si-custom-task-1.0.jar - Supporting jar file required to build custom task.
3. build.xml - To build jar of your custom task and create distribution for testing.
4. WordCount - Sample custom task for reference.
5. resources - Input data and pig script to test example custom task - 'WordCount'.

---------------------------
Steps to create custom task
---------------------------

1. Your custom task class should implement 'ICustomTask' interface. Write business logic in method 'process'. The class must be kept
   under package 'in.co.psl.si.udf'.
2. Method 'process' is executed for every line in the input data file. Single line is passed as 'inputText' to the method.
3. The output of the custom task is of type list. E.g. If the task is to extract all first_names found in the text,
   then all extracted first_names should be added to the returned list. The returned list is available with given value of 'output' field 
   of the custom task.
   
   Let's consider example below:
	
	  split_YearFromMovies :
	      type : map
	      operator : custom
	      class : YearExtractor
	      transform : blog_content
	      output : first_names
	  
   In this example, 'blog_content' is passed as input to the task. And the returned list from the task is available with name 'first_names'.

----------------------------
How to run example WordCount
----------------------------

1. Run build.xml to create distribution.
2. Copy distribution to linux machine where pig is installed.
3. Run 'test.pig' by running following command:
	 pig -x local -M -b -f test.pig
4. It returns count of all words in a movie name that start with 'a'.
	 
------------------------
Testing your custom task
------------------------

1. Copy required data, jars and out distribution to linux machine.
2. Make changes to test.pig
   - Change jar path and input file path as per your test environment.
   - On line 4, in place of 'WordCount', give name of your class and in place of 'movie_name', give your input field.
   - On the same line 4, replace 'T' with any static text that you want to pass as parameter to a your task.
     E.g. path to a dictionary file. If you don't have anything to pass there, keep it empty.
3. Run pig script.