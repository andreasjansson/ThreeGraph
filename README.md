ThreeGraph
==========

ThreeGraph is an interactive web application for exploring connected networks by means of a 3D graph. An example graph is at <http://rockstars.jansson.me.uk>. Scroll to the bottom of this page for more info about this graph.

You pan the camera by moving the mouse while pressing the mouse button. You can zoom to nodes by left-clicking them. In the example graph, you go to the associated Wikipedia page by right clicking a node.


Usage
-----

Using ThreeGraph is ~~dead easy~~ not very difficult. If I have time I'll look into some sort of build tool that can compile all the js files into one, but for now you need to include all of them:

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
    <script type="text/javascript" src="js/ThreeGraph.js"></script>
    <script type="text/javascript" src="js/Vector2d.js"></script>
    <script type="text/javascript" src="js/Vector3d.js"></script>
    <script type="text/javascript" src="js/View.js"></script>
    <script type="text/javascript" src="js/Controller.js"></script>
    <script type="text/javascript" src="js/Graph.js"></script>
    <script type="text/javascript" src="js/GraphNode.js"></script>
    <script type="text/javascript" src="js/Edge.js"></script>
    <script type="text/javascript" src="js/Reader.js"></script>
    <script type="text/javascript" src="js/DefaultConfig.js"></script>
    <script type="text/javascript" src="js/contrib.js"></script>
    <script type="text/javascript" src="js/three.js/build/Three.js"></script>
    <script type="text/javascript" src="js/GraphCamera.js"></script>
    <script type="text/javascript" src="js/MyDOMRenderer.js"></script>
    <script type="text/javascript" src="js/LineDOMMaterial.js"></script>
		<script type="text/javascript" src="js/three.js/examples/fonts/optimer_regular.typeface.js"></script>
    <link rel="stylesheet" type="text/css" href="css/style.css" />

ThreeGraph needs a `<div>` with `id="canvas"` to add itself to. (You can change the ID in the configuration.)

Once you've added all the scripts, the stylesheet and the canvas div, you can get it all started. This is fortunately the easy bit (provided you've got the configuration set up correctly, see below):

    $(function() {
      Config = DefaultConfig;
      window.threeGraph = new ThreeGraph();
    });


Configuration
-------------

ThreeGraph is pretty much a configuration-driven application in that all the variables that affect the run-time behaviour are defined in a single Config object.

DefaultConfig.js contains the default configuration. If nothing else, this serves as a blueprint for the configuration options that are available. The best use of this file is to "extend" the default configuration and change whatever parameters you need (especially the data file locations). Example usage:

    <script type="text/javascript" src="js/DefaultConfig.js"></script>
    <script type="text/javascript">
      $(function() {
        Config = DefaultConfig;
        Config.viewableDistance = 3;
        Config.data.indicesURL = "indicesFile.json";
        ...


Data format
-----------

In the configuration you need to specify the location of three JSON files:

 * An index file
 * An adjacency list file
 * A layout file

In the adjacency list and layout files all graph nodes are referred to by index, and those indices are specified in the index file. The following is an extract from an index file:

    {"1":"Nirvana_(band)",
     "2":"Fecal_Matter_(band)",
     "3":"Foo_Fighters",
     "4":"Red_Hot_Chili_Peppers",
     "5":"Melvins",
     ...

The adjacency list file defines the relationships between graph nodes. An example:

    {"1":[2,3,4],
     "2":[1,5],
     "3":[1,6,7],
     "4":[1,8,9,10,11,12,13,14,15,16],
     "5":[2,17,18,19,20,21,22,23],
     ...

Finally, the layout file specifies the {X, Y, Z} positions of the individual graph nodes, in the following format:

    {"1":{"x":395,"y":-1027,"z":-1153},
     "2":{"x":518,"y":-1109,"z":-1144},
     "3":{"x":461,"y":-1371,"z":-1339},
     "4":{"x":278,"y":-635,"z":-948},
     "5":{"x":578,"y":-1069,"z":-1001},
     ...


About the example graph
-----------------------

The example graph is a network graph of bands on Wikipedia, connected by the *Associated Acts* field in the *Background Information* box on the band page.

Generating the graph was quite a time-consuming operation. First I wrote a [crawler](https://github.com/andreasjansson/rockstar-graph) that does breadth-first traversal of bands and artists on Wikipedia. I started the crawl with [Nirvana](http://en.wikipedia.org/wiki/Nirvana_(band\)) and continued until I had discovered all bands connected to Nirvana. That took a while.

Then I turned the data into adjacency lists and imported it into R, where I used the 3D flavour of the Fruchterman-Reingold algorithm from the [igraph](http://igraph.sourceforge.net/) package to generate the graph layout. That also took its time.

Finally I massaged the data a bit more to turn it into the format described above.