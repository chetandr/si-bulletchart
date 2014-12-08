## General Instructions

0. Go through the tutorial on http://shareinsights/
1. Create a dashboard on the ShareInsights sandbox provided to you.
2. Open an ftp client (like FileZilla) and login with your credentials. 
3. Navigate to the folder called widgets. Your widget implementation should be stored here.
4.  Essentially two files need to be created – a file implementing the widget in JavaScript and another file called widget.yaml which defines what properties the widget will have in the flow file.  
5. Every widget needs to implement 4 possible behaviors
 - An `initialize` method which will set up one time state/behaviors. This is an optional method.
 - A `draw` method – which the framework will call with the data to render. Put the rendering logic in this method. Remember that the draw method can be called multiple times and therefore it should be idempotent (For example, nodes should not be appended with every call)
 - When the user interacts with the widget, call `broadcast`(values) with the selected values passed in. The selected values should be a json object with keys (non-nested) or an array of json objects.
 - A `selectDefault` method which selects the default value when the widget is loaded. The `key` is the widget column to use and the `value` is the selected item value for that key. Users can pass in the key and value
6. Use the reference widget as a guide. (ul/ol tags in html.js. This is a simple widget which implements a simple list control for the ShareInsights Platform. [ Will be provided]
7. Work sandbox area will be provided

## Notes:

Before you submit your work packet for review, please create the following dashboards

1. A dashboard which demonstrates that the widget can be used in a multiple layout configurations (span3, span6 and span12) with multiple heights.

2. A dashboard which demonstrates that the widget can be used with other existing SI widgets. Specifically, we want to see the following interactions
 - Use your widget as a filter source for other widgets on the dashboard
 - Load your widget with a pre-selected value

3. Please ensure compatibility on both Firefox and Chrome browser