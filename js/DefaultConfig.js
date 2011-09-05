DefaultConfig = {};

DefaultConfig.fadeTime = 250; // ms
DefaultConfig.moveTime = 2000; // ms
DefaultConfig.frameRate = 10; // fps
DefaultConfig.viewableDistance = 1;
DefaultConfig.canvasID = "canvas";

DefaultConfig.data = {};
DefaultConfig.data.indicesURL = "data/indices.json";
DefaultConfig.data.adjlistURL = "data/adjlist.json";
DefaultConfig.data.layoutURL = "data/layout.json";

DefaultConfig.camera = {};
DefaultConfig.camera.fov = 60;
DefaultConfig.camera.near = 1;
DefaultConfig.camera.far = 1000;
DefaultConfig.camera.lookSpeed = 3;
DefaultConfig.camera.initialRotation = 100;
DefaultConfig.camera.autoClearInterval = 10; // frames

DefaultConfig.graphNode = {};
DefaultConfig.graphNode.size = 15;
DefaultConfig.graphNode.height = 1;
DefaultConfig.graphNode.curveSegments = 1;
DefaultConfig.graphNode.font = "optimer";
