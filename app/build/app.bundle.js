/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(158);

	var _axios = __webpack_require__(163);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log(_axios2.default);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _worldFactory = __webpack_require__(2);

	var _worldFactory2 = _interopRequireDefault(_worldFactory);

	var _globalEvents = __webpack_require__(101);

	var _core = __webpack_require__(88);

	var _WorldStore = __webpack_require__(110);

	var _threejs = __webpack_require__(23);

	var THREE = _interopRequireWildcard(_threejs);

	var _CONSTANTS = __webpack_require__(112);

	var _InfoDefaultInit = __webpack_require__(113);

	var _DrawDefaultInit = __webpack_require__(136);

	__webpack_require__(149);

	var _GroundLayer = __webpack_require__(152);

	var _DrawComponent = __webpack_require__(137);

	var _LayerCollection = __webpack_require__(155);

	var _Layer = __webpack_require__(154);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var world = _worldFactory2.default.generateDefaultWorld(); // init.js
	//import {3dWorld} from './3dworld.js';

	console.log(world);

	//layerCollection
	var layerCollection = new _LayerCollection.LayerCollection();
	world.addToScene(layerCollection.defaultLayer.object);

	//groundLayer
	var groundLayer = new _GroundLayer.GroundLayer();
	groundLayer.resetWorld(world);
	groundLayer.add(new _GroundLayer.Ground(500, 'images/textures/ground_1.jpg'));
	layerCollection.addLayer(groundLayer);

	//buildingLayer-component for drawpan don't add building to view .
	var buildingGroup = layerCollection.newLayer('建筑').object;
	buildingGroup.name = 'buildingGroup';
	layerCollection.setSelectedLayer(layerCollection.getLayerByName('建筑'));

	world.addToScene(groundLayer, buildingGroup);
	world.moveToLngLat({ lng: 114.35120420404286, lat: 30.530716753548138 });
	_WorldStore.BuildingStore.on(_CONSTANTS.BUILDING_CONSTS.ADD, function (building) {
	    var selectedLayer = layerCollection.getSelectedLayer();
	    selectedLayer.add(building);
	    building.userData.layer = selectedLayer;
	});
	_WorldStore.BuildingStore.on(_CONSTANTS.BUILDING_CONSTS.COMMAND, function (command) {
	    command.execute();
	});
	_WorldStore.BuildingStore.on(_CONSTANTS.BUILDING_CONSTS.REMOVE, function (command) {
	    command.execute();
	});

	//drawpan-component
	//drawpan only add data to buildingstore;
	_DrawDefaultInit.drawPanInit.resetWorld(world).resetIntersectObjects([groundLayer.getInstance()]).addTo(window.document.body);
	layerCollection.addLayer(new _Layer.Layer(_DrawDefaultInit.drawPanInit.getDrawGroup(), '绘画'));

	//info-component,any change in buildingstore should reset info
	_InfoDefaultInit.infoInit.resetWorld(world).emptyIntersectObjects([buildingGroup, _DrawDefaultInit.drawPanInit.getDrawGroup(), layerCollection.defaultLayer.object]);
	_InfoDefaultInit.layerTab.setLayers(layerCollection);
	_InfoDefaultInit.infoBuildingInit.setIntersectNames({ 'building': true });
	// infoDrawMeshInit.setIntersectNames({'drawpan_mesh':true,'featurePoints':true,'featureLine':true});
	//when in drawMode should not has info


	//TODO
	world.signal.on(_DrawComponent.DRAWSIGNAL.WILLDRAW, function () {
	    _InfoDefaultInit.infoInit.turnOFFStatus();
	});
	world.signal.on(_DrawComponent.DRAWSIGNAL.DRAWDONE, function () {
	    _InfoDefaultInit.infoInit.turnONStatus();
	});
	__webpack_require__(156);

	//emit globalEvents such as 'resize,rerender' 
	_core.DomEvent.addEventListener(window, 'resize', function (e) {
	    _globalEvents.globalEvent.emit('windowResize', e);
	});
	(function render() {
	    requestAnimationFrame(render);
	    _globalEvents.globalEvent.emit('requestAmimationFrame');
	})();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _threejs = __webpack_require__(23);

	var THREE = _interopRequireWildcard(_threejs);

	var _world3d = __webpack_require__(24);

	var _globalEvents = __webpack_require__(101);

	var _guiControlComponent = __webpack_require__(102);

	var _core = __webpack_require__(88);

	var _WorldStore = __webpack_require__(110);

	var _cameraControl = __webpack_require__(105);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var worldFactory = function () {
		function worldFactory() {
			(0, _classCallCheck3.default)(this, worldFactory);
		}

		(0, _createClass3.default)(worldFactory, null, [{
			key: 'generateDefaultWorld',
			value: function generateDefaultWorld() {
				if (worldFactory.defaultWorld) return worldFactory.defaultWorld;
				/*scence camera render instance*/
				var canvas = document.getElementById('webgl');
				canvas.height = canvas.parentNode.clientHeight;
				canvas.width = canvas.parentNode.clientWidth;
				var renderer = new THREE.WebGLRenderer({ canvas: canvas });
				renderer.shadowMapEnabled = true;
				// scene instance
				var scene = new THREE.Scene();
				scene.background = new THREE.Color(0x9999ff);
				//camera instance
				var camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 40000000);
				camera.position.z = 500;
				camera.position.y = 0;

				/*create world*/
				var world = new _world3d.World3d(scene, camera, renderer);

				//light instances
				var pointLight = new THREE.PointLight(0xffffff, 1, 0);
				pointLight.position.set(0, 0, 200);
				pointLight.castShadow = true;
				var pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
				var amLight = new THREE.AmbientLight(0xffffff, 0.8);

				//gui-control
				var guiControl = new _guiControlComponent.GuiControl();
				//console.log(guiControl);
				guiControl.addLightControl(pointLight).addStatsMonitor("Stats-output");
				new _core.Draggable(_core.DomUtil.getById("Stats-output"));
				//new Draggable(guiControl.gui.domElement.parentNode);

				//orbit-control
				// var orbit=new THREE.OrbitControls(world.camera, world.renderer.domElement);
				var orbit = new _cameraControl.cameraControl(world.camera, world.renderer.domElement);
				world.addToScene(pointLight, pointLightHelper, amLight);

				//re-render world
				_globalEvents.globalEvent.on('requestAmimationFrame', function () {
					world.render();
				});
				//re-size world
				_globalEvents.globalEvent.on('windowResize', function (e) {
					var canvas = world.renderer.domElement;
					// console.log(canvas);
					// clientWidth clientHeight
					canvas.height = canvas.parentNode.clientHeight;
					canvas.width = canvas.parentNode.clientWidth;
					world.camera.aspect = canvas.width / canvas.height;
					world.camera.updateProjectionMatrix();
					world.renderer.setSize(canvas.width, canvas.height);
				});
				worldFactory.worlds.push(world);
				worldFactory.defaultWorld = world;
				return world;
			}
		}]);
		return worldFactory;
	}(); // worldFactory.js


	exports.default = worldFactory;

	worldFactory.worlds = [];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(5);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	var $Object = __webpack_require__(10).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(18), 'Object', {defineProperty: __webpack_require__(14).f});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , core      = __webpack_require__(10)
	  , ctx       = __webpack_require__(11)
	  , hide      = __webpack_require__(13)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 9 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(12);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(14)
	  , createDesc = __webpack_require__(22);
	module.exports = __webpack_require__(18) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(15)
	  , IE8_DOM_DEFINE = __webpack_require__(17)
	  , toPrimitive    = __webpack_require__(21)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(18) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(18) && !__webpack_require__(19)(function(){
	  return Object.defineProperty(__webpack_require__(20)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(19)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16)
	  , document = __webpack_require__(9).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(16);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = THREE;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.World3d = undefined;

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _MercatorProjection = __webpack_require__(25);

	var _core = __webpack_require__(88);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 3dworld.js
	// date 2016/11/26
	/**
	 * @class then container of the world;
	 */
	var World3d = exports.World3d = function () {
		function World3d(scene, camera, render) {
			(0, _classCallCheck3.default)(this, World3d);

			this.scene = scene;
			this.camera = camera;
			this.renderer = render;
			//communite between world's components
			this.signal = new _core.EventEmitter();
			this.projection = new _MercatorProjection.MercatorProjection();
		}

		(0, _createClass3.default)(World3d, [{
			key: 'render',
			value: function render() {
				this.renderer.render(this.scene, this.camera);
				return this;
			}
		}, {
			key: 'moveToLngLat',
			value: function moveToLngLat(lngLat) {
				var point = this.projection.lngLatToPoint(lngLat);
				var vec3 = new THREE.Vector3(point.x, point.y, 500);
				this.moveToPoint(vec3);
			}
		}, {
			key: 'moveToPoint',
			value: function moveToPoint(point) {
				this.camera.position.copy(point);
				this.camera.lookAt(new THREE.Vector3(point.x, point.y, 0));
				this.camera.updateMatrixWorld(true);
				this.signal.emit('CAMERACHANGE');
			}
		}, {
			key: 'addToScene',
			value: function addToScene(obj) {

				for (var i = 0; i < arguments.length; i++) {
					// console.log(arguments[i]);
					this.scene.add(arguments[i].getInstance ? arguments[i].getInstance() : arguments[i]);
				}
				return this;
			}
		}]);
		return World3d;
	}();

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.BaiDuMercator = exports.MercatorProjection = undefined;

	var _possibleConstructorReturn2 = __webpack_require__(26);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// MercatorProjection.js
	var MercatorProjection = exports.MercatorProjection = function () {
		function MercatorProjection(name) {
			(0, _classCallCheck3.default)(this, MercatorProjection);

			this.name = name;
		}

		(0, _createClass3.default)(MercatorProjection, [{
			key: 'pointToLngLat',
			value: function pointToLngLat(point) {
				var x = point.x + 33554432;
				var y = 33554432 - point.y;
				var lat = 360 * Math.atan(Math.exp((1 - y / Math.pow(2, 25)) * Math.PI)) / Math.PI - 90;
				var lng = x * 360 / Math.pow(2, 26) - 180;
				return {
					lat: lat,
					lng: lng
				};
			}
		}, {
			key: 'lngLatToPoint',
			value: function lngLatToPoint(lngLat) {
				var lat = lngLat.lat;
				var lng = lngLat.lng;
				var x = (lng + 180) * Math.pow(2, 26) / 360;
				var y = (1 - Math.log(Math.tan((lat + 90) * Math.PI / 360)) / Math.PI) * Math.pow(2, 25);
				return {
					x: x - 33554432,
					y: 33554432 - y
				};
			}
		}]);
		return MercatorProjection;
	}();

	var BaiDuMercator = exports.BaiDuMercator = function (_MercatorProjection) {
		(0, _inherits3.default)(BaiDuMercator, _MercatorProjection);

		function BaiDuMercator() {
			(0, _classCallCheck3.default)(this, BaiDuMercator);

			var _this = (0, _possibleConstructorReturn3.default)(this, (BaiDuMercator.__proto__ || Object.getPrototypeOf(BaiDuMercator)).call(this, 'BaiDuMercatorProjection'));

			_this.R = 6378137;
			return _this;
		}

		(0, _createClass3.default)(BaiDuMercator, [{
			key: 'pointToLngLat',
			value: function pointToLngLat(point) {
				var x = point.x;
				var y = point.y;
				var lat = Math.atan(Math.pow(Math.E, y / this.R)) * 360 / Math.PI - 90;
				var lng = x / (Math.PI * this.R) * 180;
				return {
					lat: lat,
					lng: lng
				};
			}
		}]);
		return BaiDuMercator;
	}(MercatorProjection);

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(27);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(28);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(64);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(29), __esModule: true };

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(30);
	__webpack_require__(59);
	module.exports = __webpack_require__(63).f('iterator');

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(31)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(34)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(32)
	  , defined   = __webpack_require__(33);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(35)
	  , $export        = __webpack_require__(8)
	  , redefine       = __webpack_require__(36)
	  , hide           = __webpack_require__(13)
	  , has            = __webpack_require__(37)
	  , Iterators      = __webpack_require__(38)
	  , $iterCreate    = __webpack_require__(39)
	  , setToStringTag = __webpack_require__(55)
	  , getPrototypeOf = __webpack_require__(57)
	  , ITERATOR       = __webpack_require__(56)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(13);

/***/ },
/* 37 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(40)
	  , descriptor     = __webpack_require__(22)
	  , setToStringTag = __webpack_require__(55)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(13)(IteratorPrototype, __webpack_require__(56)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(15)
	  , dPs         = __webpack_require__(41)
	  , enumBugKeys = __webpack_require__(53)
	  , IE_PROTO    = __webpack_require__(50)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(20)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(54).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(14)
	  , anObject = __webpack_require__(15)
	  , getKeys  = __webpack_require__(42);

	module.exports = __webpack_require__(18) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(43)
	  , enumBugKeys = __webpack_require__(53);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(37)
	  , toIObject    = __webpack_require__(44)
	  , arrayIndexOf = __webpack_require__(47)(false)
	  , IE_PROTO     = __webpack_require__(50)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(45)
	  , defined = __webpack_require__(33);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(46);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(44)
	  , toLength  = __webpack_require__(48)
	  , toIndex   = __webpack_require__(49);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(32)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(32)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(51)('keys')
	  , uid    = __webpack_require__(52);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(9)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9).document && document.documentElement;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(14).f
	  , has = __webpack_require__(37)
	  , TAG = __webpack_require__(56)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(51)('wks')
	  , uid        = __webpack_require__(52)
	  , Symbol     = __webpack_require__(9).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(37)
	  , toObject    = __webpack_require__(58)
	  , IE_PROTO    = __webpack_require__(50)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(33);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(60);
	var global        = __webpack_require__(9)
	  , hide          = __webpack_require__(13)
	  , Iterators     = __webpack_require__(38)
	  , TO_STRING_TAG = __webpack_require__(56)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(61)
	  , step             = __webpack_require__(62)
	  , Iterators        = __webpack_require__(38)
	  , toIObject        = __webpack_require__(44);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(34)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(56);

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(66);
	__webpack_require__(77);
	__webpack_require__(78);
	__webpack_require__(79);
	module.exports = __webpack_require__(10).Symbol;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(9)
	  , has            = __webpack_require__(37)
	  , DESCRIPTORS    = __webpack_require__(18)
	  , $export        = __webpack_require__(8)
	  , redefine       = __webpack_require__(36)
	  , META           = __webpack_require__(67).KEY
	  , $fails         = __webpack_require__(19)
	  , shared         = __webpack_require__(51)
	  , setToStringTag = __webpack_require__(55)
	  , uid            = __webpack_require__(52)
	  , wks            = __webpack_require__(56)
	  , wksExt         = __webpack_require__(63)
	  , wksDefine      = __webpack_require__(68)
	  , keyOf          = __webpack_require__(69)
	  , enumKeys       = __webpack_require__(70)
	  , isArray        = __webpack_require__(73)
	  , anObject       = __webpack_require__(15)
	  , toIObject      = __webpack_require__(44)
	  , toPrimitive    = __webpack_require__(21)
	  , createDesc     = __webpack_require__(22)
	  , _create        = __webpack_require__(40)
	  , gOPNExt        = __webpack_require__(74)
	  , $GOPD          = __webpack_require__(76)
	  , $DP            = __webpack_require__(14)
	  , $keys          = __webpack_require__(42)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(75).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(72).f  = $propertyIsEnumerable;
	  __webpack_require__(71).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(35)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(13)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(52)('meta')
	  , isObject = __webpack_require__(16)
	  , has      = __webpack_require__(37)
	  , setDesc  = __webpack_require__(14).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(19)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(9)
	  , core           = __webpack_require__(10)
	  , LIBRARY        = __webpack_require__(35)
	  , wksExt         = __webpack_require__(63)
	  , defineProperty = __webpack_require__(14).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(42)
	  , toIObject = __webpack_require__(44);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(42)
	  , gOPS    = __webpack_require__(71)
	  , pIE     = __webpack_require__(72);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 71 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 72 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(46);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(44)
	  , gOPN      = __webpack_require__(75).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(43)
	  , hiddenKeys = __webpack_require__(53).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(72)
	  , createDesc     = __webpack_require__(22)
	  , toIObject      = __webpack_require__(44)
	  , toPrimitive    = __webpack_require__(21)
	  , has            = __webpack_require__(37)
	  , IE8_DOM_DEFINE = __webpack_require__(17)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(18) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 77 */
/***/ function(module, exports) {

	

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68)('asyncIterator');

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68)('observable');

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(81);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(85);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(27);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(82), __esModule: true };

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(83);
	module.exports = __webpack_require__(10).Object.setPrototypeOf;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(8);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(84).set});

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(16)
	  , anObject = __webpack_require__(15);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(11)(Function.call, __webpack_require__(76).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(87);
	var $Object = __webpack_require__(10).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(40)});

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	      value: true
	});
	exports.Dispatcher = exports.Draggable = exports.Promise = exports.assign = exports.EventEmitter = exports.Util = exports.DomUtil = exports.DomEvent = exports.Browser = undefined;

	var _Browser = __webpack_require__(89);

	var _Browser2 = _interopRequireDefault(_Browser);

	var _DomEvent = __webpack_require__(90);

	var _DomEvent2 = _interopRequireDefault(_DomEvent);

	var _DomUtil = __webpack_require__(92);

	var _DomUtil2 = _interopRequireDefault(_DomUtil);

	var _Util = __webpack_require__(91);

	var _Util2 = _interopRequireDefault(_Util);

	var _EventEmitter = __webpack_require__(93);

	var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

	var _objectAssign = __webpack_require__(94);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _es6Promise = __webpack_require__(95);

	var Promise = _interopRequireWildcard(_es6Promise);

	var _draggabel = __webpack_require__(99);

	var _Dispatcher = __webpack_require__(100);

	var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Browser = _Browser2.default;
	exports.DomEvent = _DomEvent2.default;
	exports.DomUtil = _DomUtil2.default;
	exports.Util = _Util2.default;
	exports.EventEmitter = _EventEmitter2.default;
	exports.assign = _objectAssign2.default;
	exports.Promise = Promise;
	exports.Draggable = _draggabel.Draggable;
	exports.Dispatcher = _Dispatcher2.default; // core.js
	/**
	 * @author wk
	 * @description core operation 
	 */

/***/ },
/* 89 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
			value: true
	});
	// Browser.js
	/**
	 * @description test brower property
	 * @{@link https://github.com/Leaflet/Leaflet/blob/master/src/core/Browser.js}
	 */
	var ua = navigator.userAgent.toLowerCase(),
	    doc = document.documentElement,
	    ie = 'ActiveXObject' in window,
	    webkit = ua.indexOf('webkit') !== -1,
	    phantomjs = ua.indexOf('phantom') !== -1,
	    android23 = ua.search('android [23]') !== -1,
	    chrome = ua.indexOf('chrome') !== -1,
	    gecko = ua.indexOf('gecko') !== -1 && !webkit && !window.opera && !ie,
	    win = navigator.platform.indexOf('Win') === 0,
	    mobile = typeof orientation !== 'undefined' || ua.indexOf('mobile') !== -1,
	    msPointer = !window.PointerEvent && window.MSPointerEvent,
	    pointer = window.PointerEvent || msPointer,
	    ie3d = ie && 'transition' in doc.style,
	    webkit3d = 'WebKitCSSMatrix' in window && 'm11' in new window.WebKitCSSMatrix() && !android23,
	    gecko3d = 'MozPerspective' in doc.style,
	    opera12 = 'OTransition' in doc.style;

	var touch = !window.L_NO_TOUCH && (pointer || 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);

	var Browser = {

			// @property ie: Boolean
			// `true` for all Internet Explorer versions (not Edge).
			ie: ie,

			// @property ielt9: Boolean
			// `true` for Internet Explorer versions less than 9.
			ielt9: ie && !document.addEventListener,

			// @property edge: Boolean
			// `true` for the Edge web browser.
			edge: 'msLaunchUri' in navigator && !('documentMode' in document),

			// @property webkit: Boolean
			// `true` for webkit-based browsers like Chrome and Safari (including mobile versions).
			webkit: webkit,

			// @property gecko: Boolean
			// `true` for gecko-based browsers like Firefox.
			gecko: gecko,

			// @property android: Boolean
			// `true` for any browser running on an Android platform.
			android: ua.indexOf('android') !== -1,

			// @property android23: Boolean
			// `true` for browsers running on Android 2 or Android 3.
			android23: android23,

			// @property chrome: Boolean
			// `true` for the Chrome browser.
			chrome: chrome,

			// @property safari: Boolean
			// `true` for the Safari browser.
			safari: !chrome && ua.indexOf('safari') !== -1,

			// @property win: Boolean
			// `true` when the browser is running in a Windows platform
			win: win,

			// @property ie3d: Boolean
			// `true` for all Internet Explorer versions supporting CSS transforms.
			ie3d: ie3d,

			// @property webkit3d: Boolean
			// `true` for webkit-based browsers supporting CSS transforms.
			webkit3d: webkit3d,

			// @property gecko3d: Boolean
			// `true` for gecko-based browsers supporting CSS transforms.
			gecko3d: gecko3d,

			// @property opera12: Boolean
			// `true` for the Opera browser supporting CSS transforms (version 12 or later).
			opera12: opera12,

			// @property any3d: Boolean
			// `true` for all browsers supporting CSS transforms.
			any3d: !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantomjs,

			// @property mobile: Boolean
			// `true` for all browsers running in a mobile device.
			mobile: mobile,

			// @property mobileWebkit: Boolean
			// `true` for all webkit-based browsers in a mobile device.
			mobileWebkit: mobile && webkit,

			// @property mobileWebkit3d: Boolean
			// `true` for all webkit-based browsers in a mobile device supporting CSS transforms.
			mobileWebkit3d: mobile && webkit3d,

			// @property mobileOpera: Boolean
			// `true` for the Opera browser in a mobile device.
			mobileOpera: mobile && window.opera,

			// @property mobileGecko: Boolean
			// `true` for gecko-based browsers running in a mobile device.
			mobileGecko: mobile && gecko,

			// @property touch: Boolean
			// `true` for all browsers supporting [touch events](https://developer.mozilla.org/docs/Web/API/Touch_events).
			touch: !!touch,

			// @property msPointer: Boolean
			// `true` for browsers implementing the Microsoft touch events model (notably IE10).
			msPointer: !!msPointer,

			// @property pointer: Boolean
			// `true` for all browsers supporting [pointer events](https://msdn.microsoft.com/en-us/library/dn433244%28v=vs.85%29.aspx).
			pointer: !!pointer,

			// @property retina: Boolean
			// `true` for browsers on a high-resolution "retina" screen.
			retina: (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1
	};

	exports.default = Browser;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Util = __webpack_require__(91);

	var _Util2 = _interopRequireDefault(_Util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DomEvent = {
		/**
	  * [addEventListener add even listener to dom]
	  * @param {Element}   obj        [Element]
	  * @param {string}   type       [event type such as 'click']
	  * @param {Function} fn         [function to fire]
	  * @param {boolean}   useCapture [description]
	  * @return {object} [DomEvent obj]
	  */
		addEventListener: function addEventListener(obj, type, fn, useCapture) {
			if ('addEventListener' in obj) {
				obj.addEventListener(type, fn, useCapture || false);
			} else if ('attachEvent' in obj) {
				obj.attachEvent('on' + type, fn);
			}
			return this;
		},

		/**
	  * [removeEventListener remove the listener]
	  */
		removeEventListener: function removeEventListener(obj, type, fn, useCapture) {
			if ('removeEventListener' in obj) {
				obj.removeEventListener(type, fn, useCapture || false);
			} else if ('detachEvent' in obj) {
				obj.detachEvent(type, fn);
			}
			return this;
		},

		/**
	  * [stopPropagation ]
	  * @param  {[Event]} e [the event]
	  * @return {[Object]}   [description]
	  */
		stopPropagation: function stopPropagation(e) {
			e = e || window.event;
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
			return this;
		},

		/**
	  * [preventDefault description]
	  * @param  {[type]} e [description]
	  * @return {[type]}   [description]
	  */
		preventDefault: function preventDefault(e) {
			e = e || window.event;
			if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
			return this;
		},

		/**
	  * [stop preventDefault add stopPropagation]
	  * @param  {[Event]} e [event]
	  * @return {[object]}   [this]
	  */
		stop: function stop(e) {
			e = e || window.event;
			this.preventDefault(e).stopPropagation(e);
			return this;
		}

	};

	//shorcut
	// DomEvent.js
	/**
	 * @author wk
	 * @description dom event operation
	 * @{@link 'https://github.com/Leaflet/Leaflet/blob/master/src/dom/DomEvent.js'}
	 */
	(function () {
		DomEvent.on = DomEvent.addEventListener;
		DomEvent.off = DomEvent.removeEventListener;
	})();

	exports.default = DomEvent;

/***/ },
/* 91 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// Util.js
	/**
	 * @description useful tools that always use
	 * @{@link 'https://github.com/Leaflet/Leaflet/blob/master/src/core/Util.js'} 
	 */
	var Util = {

		// @function extend(dest: Object, src?: Object): Object
		// Merges the properties of the `src` object (or multiple objects) into `dest` object and returns the latter. 
		extend: function extend(dest) {
			var i, j, len, src;

			for (j = 1, len = arguments.length; j < len; j++) {
				src = arguments[j];
				for (i in src) {
					dest[i] = src[i];
				}
			}
			return dest;
		},

		// @function create(proto: Object, properties?: Object): Object
		// Compatibility polyfill for [Object.create](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
		create: Object.create || function () {
			function F() {}
			return function (proto) {
				F.prototype = proto;
				return new F();
			};
		}(),

		// @function bind(fn: Function, …): Function
		// Returns a new function bound to the arguments passed, like [Function.prototype.bind](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
		bind: function bind(fn, obj) {
			var slice = Array.prototype.slice;

			if (fn.bind) {
				return fn.bind.apply(fn, slice.call(arguments, 1));
			}

			var args = slice.call(arguments, 2);

			return function () {
				return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
			};
		},

		// @function stamp(obj: Object): Number
		// Returns the unique ID of an object, assiging it one if it doesn't have it.
		stamp: function stamp(obj) {
			/*eslint-disable */
			obj._unique_id = obj._unique_id || ++this.lastId;
			return obj._unique_id;
			/*eslint-enable */
		},

		// @property lastId: Number
		// Last unique ID used by [`stamp()`](#util-stamp)
		lastId: 0,

		// @function throttle(fn: Function, time: Number, context: Object): Function
		// Returns a function which executes function `fn` with the given scope `context`
		// (so that the `this` keyword refers to `context` inside `fn`'s code). The function
		// `fn` will be called no more than one time per given amount of `time`. The arguments
		// received by the bound function will be any arguments passed when binding the
		// function, followed by any arguments passed when invoking the bound function.
		throttle: function throttle(fn, time, context) {
			var lock, args, wrapperFn, later;

			later = function later() {
				// reset lock and call if queued
				lock = false;
				if (args) {
					wrapperFn.apply(context, args);
					args = false;
				}
			};

			wrapperFn = function wrapperFn() {
				if (lock) {
					// called too soon, queue to call later
					args = arguments;
				} else {
					// call and lock until later
					fn.apply(context, arguments);
					setTimeout(later, time);
					lock = true;
				}
			};

			return wrapperFn;
		},

		// @function wrapNum(num: Number, range: Number[], includeMax?: Boolean): Number
		// Returns the number `num` modulo `range` in such a way so it lies within
		// `range[0]` and `range[1]`. The returned value will be always smaller than
		// `range[1]` unless `includeMax` is set to `true`.
		wrapNum: function wrapNum(x, range, includeMax) {
			var max = range[1],
			    min = range[0],
			    d = max - min;
			return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
		},

		// @function falseFn(): Function
		// Returns a function which always returns `false`.
		falseFn: function falseFn() {
			return false;
		},

		// @function formatNum(num: Number, digits?: Number): Number
		// Returns the number `num` rounded to `digits` decimals, or to 5 decimals by default.
		formatNum: function formatNum(num, digits) {
			var pow = Math.pow(10, digits || 5);
			return Math.round(num * pow) / pow;
		},

		// @function trim(str: String): String
		// Compatibility polyfill for [String.prototype.trim](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
		trim: function trim(str) {
			return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
		},

		// @function splitWords(str: String): String[]
		// Trims and splits the string on whitespace and returns the array of parts.
		splitWords: function splitWords(str) {
			return this.trim(str).split(/\s+/);
		},

		// @function getParamString(obj: Object, existingUrl?: String, uppercase?: Boolean): String
		// Converts an object into a parameter URL string, e.g. `{a: "foo", b: "bar"}`
		// translates to `'?a=foo&b=bar'`. If `existingUrl` is set, the parameters will
		// be appended at the end. If `uppercase` is `true`, the parameter names will
		// be uppercased (e.g. `'?A=foo&B=bar'`)
		getParamString: function getParamString(obj, existingUrl, uppercase) {
			var params = [];
			for (var i in obj) {
				params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
			}
			return (!existingUrl || existingUrl.indexOf('?') === -1 ? '?' : '&') + params.join('&');
		},

		// @function template(str: String, data: Object): String
		// Simple templating facility, accepts a template string of the form `'Hello {a}, {b}'`
		// and a data object like `{a: 'foo', b: 'bar'}`, returns evaluated string
		// `('Hello foo, bar')`. You can also specify functions instead of strings for
		// data values — they will be evaluated passing `data` as an argument.
		template: function template(str, data) {
			return str.replace(this.templateRe, function (str, key) {
				var value = data[key];

				if (value === undefined) {
					throw new Error('No value provided for variable ' + str);
				} else if (typeof value === 'function') {
					value = value(data);
				}
				return value;
			});
		},

		templateRe: /\{ *([\w_\-]+) *\}/g,

		// @function isArray(obj): Boolean
		// Compatibility polyfill for [Array.isArray](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
		isArray: Array.isArray || function (obj) {
			return Object.prototype.toString.call(obj) === '[object Array]';
		},

		// @function indexOf(array: Array, el: Object): Number
		// Compatibility polyfill for [Array.prototype.indexOf](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
		indexOf: function indexOf(array, el) {
			for (var i = 0; i < array.length; i++) {
				if (array[i] === el) {
					return i;
				}
			}
			return -1;
		},

		/**
	  * [storeData write data in localstorage]
	  * @param  {[string]} key    [name of data]
	  * @param  {[string|object]} object [the data to store]
	  * @return {[type]}        [data be stringfied]
	  */
		storeData: function storeData(key, object) {
			var value = '';
			if (_objUtil.isObject(object)) {
				value = JSON.stringify(object);
			} else {
				value = object;
			}
			localStorage.setItem(key, value);
			return value;
		},

		/**
	  * [getData get data from localstorage]
	  * @param  {[string]} key [the key of data]
	  * @return {[string|object]}     [data you want]
	  */
		getData: function getData(key) {
			var value = localStorage.getItem(key);
			try {
				var obj = JSON.parse(value);
				return obj;
			} catch (e) {
				return value;
			}
		},

		/**
	  * [guid generate a unique string of 16 chars]
	  * @return {[string]} [the unique sting]
	  */
		guid: function guid() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = Math.random() * 16 | 0,
				    v = c == 'x' ? r : r & 0x3 | 0x8;
				return v.toString(16).replace('-', '');
			});
		},

		/**
	  * [getFingerprint get the unique string of the device]
	  * @return {[string]} [the unique string]
	  */
		getFingerprint: function getFingerprint() {
			if (!this.getData('guid')) {
				this.storeData('guid', this.guid());
			}
			return this.getData('guid');
		},

		/**
	  * 
	  */
		emptyArray: function emptyArray(ary) {
			ary.splice(0, ary.length);
		},

		forEach: function forEach(ary, fn) {
			for (var i = 0; i < ary.length; i++) {
				var result = fn(ary[i], i, ary);
				if (result === true) {
					return result;
				}
			}
		},

		removeByValue: function removeByValue(ary, value) {
			for (var i = 0; i < ary.length; i++) {
				if (ary[i] === value) {
					ary.splice(i, 1);
					break;
				}
			}
		},

		log: function log(msg) {
			console.log(msg);
		}
	};

	exports.default = Util;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Util = __webpack_require__(91);

	var _Util2 = _interopRequireDefault(_Util);

	var _Browser = __webpack_require__(89);

	var _Browser2 = _interopRequireDefault(_Browser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// DomUtil.js
	/**
	 * @description dom operation tool
	 * @{@link 'https://github.com/Leaflet/Leaflet/blob/master/src/dom/DomUtil.js'} 
	 */
	var DomUtil = {

		// @function get(id: String|HTMLElement): HTMLElement
		// Returns an element given its DOM id, or returns the element itself
		// if it was passed directly.
		getById: function getById(id) {
			return typeof id === 'string' ? document.getElementById(id) : id;
		},

		// @function getStyle(el: HTMLElement, styleAttrib: String): String
		// Returns the value for a certain style attribute on an element,
		// including computed values or values set through CSS.
		getStyle: function getStyle(el, style) {

			var value = el.style[style] || el.currentStyle && el.currentStyle[style];

			if ((!value || value === 'auto') && document.defaultView) {
				var css = document.defaultView.getComputedStyle(el, null);
				value = css ? css[style] : null;
			}

			return value === 'auto' ? null : value;
		},
		setStyle: function setStyle(el, style, array) {
			el.style[style] = array;
		},

		// @function create(tagName: String, className?: String, container?: HTMLElement): HTMLElement
		// Creates an HTML element with `tagName`, sets its class to `className`, and optionally appends it to `container` element.
		create: function create(tagName, className, container) {

			var el = document.createElement(tagName);
			el.className = className || '';

			if (container) {
				container.appendChild(el);
			}

			return el;
		},
		createElement: function createElement(tagName, className, innerHtml) {
			var el = document.createElement(tagName);
			el.className = className || '';
			el.innerHTML = innerHtml || '';
			return el;
		},

		/**
	  * [appendChild append childElement to father Element]
	  * @param  {[element]} fatherEle [description]
	  * @param  {[Element]} childEle  [description]
	  * @return {[childEle]}           [description]
	  */
		appendChild: function appendChild(fatherEle, childEle) {
			if (childEle instanceof Array) {
				_Util2.default.forEach(childEle, function (child) {
					fatherEle.appendChild(child);
				});
			} else {
				fatherEle.appendChild(childEle);
			}
		},
		// @function remove(el: HTMLElement)
		// Removes `el` from its parent element
		remove: function remove(el) {
			var parent = el.parentNode;
			if (parent) {
				parent.removeChild(el);
			}
		},

		// @function empty(el: HTMLElement)
		// Removes all of `el`'s children elements from `el`
		empty: function empty(el) {
			while (el.firstChild) {
				el.removeChild(el.firstChild);
			}
		},

		emptyParent: function emptyParent(el) {
			var parent = el.parentNode;
			if (parent) {
				this.empty(parent);
			}
		},

		// @function toFront(el: HTMLElement)
		// Makes `el` the last children of its parent, so it renders in front of the other children.
		toFront: function toFront(el) {
			el.parentNode.appendChild(el);
		},

		// @function toBack(el: HTMLElement)
		// Makes `el` the first children of its parent, so it renders back from the other children.
		toBack: function toBack(el) {
			var parent = el.parentNode;
			parent.insertBefore(el, parent.firstChild);
		},

		// @function hasClass(el: HTMLElement, name: String): Boolean
		// Returns `true` if the element's class attribute contains `name`.
		hasClass: function hasClass(el, name) {
			if (el.classList !== undefined) {
				return el.classList.contains(name);
			}
			var className = this.getClass(el);
			return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
		},

		// @function addClass(el: HTMLElement, name: String)
		// Adds `name` to the element's class attribute.
		addClass: function addClass(el, name) {
			if (el.classList !== undefined) {
				var classes = _Util2.default.splitWords(name);
				for (var i = 0, len = classes.length; i < len; i++) {
					el.classList.add(classes[i]);
				}
			} else if (!this.hasClass(el, name)) {
				var className = this.getClass(el);
				this.setClass(el, (className ? className + ' ' : '') + name);
			}
		},

		// @function removeClass(el: HTMLElement, name: String)
		// Removes `name` from the element's class attribute.
		removeClass: function removeClass(el, name) {
			if (el.classList !== undefined) {
				el.classList.remove(name);
			} else {
				this.setClass(el, _Util2.default.trim((' ' + this.getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
			}
		},

		toggleClass: function toggleClass(el, name) {
			if (this.hasClass(el, name)) {
				this.removeClass(el, name);
			} else {
				this.addClass(el, name);
			}
		},

		// @function setClass(el: HTMLElement, name: String)
		// Sets the element's class.
		setClass: function setClass(el, name) {
			if (el.className.baseVal === undefined) {
				el.className = name;
			} else {
				// in case of SVG element
				el.className.baseVal = name;
			}
		},
		//get mouseposition relative to dom
		getMousePosition: function getMousePosition(el, event) {
			var rect = el.getBoundingClientRect();
			return {
				left: event.clientX - rect.left,
				top: event.clientY - rect.top
			};
			// var top = document.documentElement.clientTop;

			// var left= document.documentElement.clientLeft;
		},

		// @function getClass(el: HTMLElement): String
		// Returns the element's class.
		getClass: function getClass(el) {
			return el.className.baseVal === undefined ? el.className : el.className.baseVal;
		},

		// @function setOpacity(el: HTMLElement, opacity: Number)
		// Set the opacity of an element (including old IE support).
		// `opacity` must be a number from `0` to `1`.
		setOpacity: function setOpacity(el, value) {

			if ('opacity' in el.style) {
				el.style.opacity = value;
			} else if ('filter' in el.style) {
				this._setOpacityIE(el, value);
			}
		},

		_setOpacityIE: function _setOpacityIE(el, value) {
			var filter = false,
			    filterName = 'DXImageTransform.Microsoft.Alpha';

			// filters collection throws an error if we try to retrieve a filter that doesn't exist
			try {
				filter = el.filters.item(filterName);
			} catch (e) {
				// don't set opacity to 1 if we haven't already set an opacity,
				// it isn't needed and breaks transparent pngs.
				if (value === 1) {
					return;
				}
			}

			value = Math.round(value * 100);

			if (filter) {
				filter.Enabled = value !== 100;
				filter.Opacity = value;
			} else {
				el.style.filter += ' progid:' + filterName + '(opacity=' + value + ')';
			}
		},

		// @function testProp(props: String[]): String|false
		// Goes through the array of style names and returns the first name
		// that is a valid style name for an element. If no such name is found,
		// it returns false. Useful for vendor-prefixed styles like `transform`.
		testProp: function testProp(props) {

			var style = document.documentElement.style;

			for (var i = 0; i < props.length; i++) {
				if (props[i] in style) {
					return props[i];
				}
			}
			return false;
		},

		// @function setTransform(el: HTMLElement, offset: Point, scale?: Number)
		// Resets the 3D CSS transform of `el` so it is translated by `offset` pixels
		// and optionally scaled by `scale`. Does not have an effect if the
		// browser doesn't support 3D CSS transforms.
		setTransform: function setTransform(el, offset, scale) {
			var pos = offset || { x: 0, y: 0 };

			el.style[this.TRANSFORM] = (_Browser2.default.ie3d ? 'translate(' + pos.x + 'px,' + pos.y + 'px)' : 'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') + (scale ? ' scale(' + scale + ')' : '');
		},

		// @function setPosition(el: HTMLElement, position: Point)
		// Sets the position of `el` to coordinates specified by `position`,
		// using CSS translate or top/left positioning depending on the browser
		// (used by Leaflet internally to position its layers).
		setPosition: function setPosition(el, point) {
			// (HTMLElement, Point[, Boolean])

			/*eslint-disable */
			el._corejs_pos = point;
			/*eslint-enable */

			if (_Browser2.default.any3d) {
				this.setTransform(el, point);
			} else {
				el.style.left = point.x + 'px';
				el.style.top = point.y + 'px';
			}
		},

		// @function getPosition(el: HTMLElement): Point
		// Returns the coordinates of an element previously positioned with setPosition.
		getPosition: function getPosition(el) {
			// this method is only used for elements previously positioned using setPosition,
			// so it's safe to cache the position for performance

			return el._corejs_pos || { x: 0, y: 0 };
		}
	};
	(function () {
		/**
	  * [TRANSFORM  get prefixed tranform]
	  * @type {string}
	  */
		DomUtil.TRANSFORM = DomUtil.testProp(['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform']);
	})();
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	var UI = {};

	UI.Element = function (dom) {

		this.dom = dom;
	};

	UI.Element.prototype = {

		add: function add() {

			for (var i = 0; i < arguments.length; i++) {

				var argument = arguments[i];

				if (argument instanceof UI.Element) {

					this.dom.appendChild(argument.dom);
				} else {

					console.error('UI.Element:', argument, 'is not an instance of UI.Element.');
				}
			}

			return this;
		},

		remove: function remove() {

			for (var i = 0; i < arguments.length; i++) {

				var argument = arguments[i];

				if (argument instanceof UI.Element) {

					this.dom.removeChild(argument.dom);
				} else {

					console.error('UI.Element:', argument, 'is not an instance of UI.Element.');
				}
			}

			return this;
		},

		clear: function clear() {

			while (this.dom.children.length) {

				this.dom.removeChild(this.dom.lastChild);
			}
		},

		setId: function setId(id) {

			this.dom.id = id;

			return this;
		},

		setClass: function setClass(name) {

			this.dom.className = name;

			return this;
		},

		setStyle: function setStyle(style, array) {

			for (var i = 0; i < array.length; i++) {

				this.dom.style[style] = array[i];
			}

			return this;
		},

		setDisabled: function setDisabled(value) {

			this.dom.disabled = value;

			return this;
		},

		setTextContent: function setTextContent(value) {

			this.dom.textContent = value;

			return this;
		}

	};

	// properties

	var properties = ['position', 'left', 'top', 'right', 'bottom', 'width', 'height', 'border', 'borderLeft', 'borderTop', 'borderRight', 'borderBottom', 'borderColor', 'display', 'overflow', 'margin', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'padding', 'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom', 'color', 'background', 'backgroundColor', 'opacity', 'fontSize', 'fontWeight', 'textAlign', 'textDecoration', 'textTransform', 'cursor', 'zIndex'];

	properties.forEach(function (property) {

		var method = 'set' + property.substr(0, 1).toUpperCase() + property.substr(1, property.length);

		UI.Element.prototype[method] = function () {

			this.setStyle(property, arguments);

			return this;
		};
	});

	// events

	var events = ['KeyUp', 'KeyDown', 'MouseOver', 'MouseOut', 'Click', 'DblClick', 'Change'];

	events.forEach(function (event) {

		var method = 'on' + event;

		UI.Element.prototype[method] = function (callback) {

			this.dom.addEventListener(event.toLowerCase(), _Util2.default.bind(callback, this), false);

			return this;
		};
	});

	// Span

	UI.Span = function () {

		UI.Element.call(this);

		this.dom = document.createElement('span');

		return this;
	};

	UI.Span.prototype = Object.create(UI.Element.prototype);
	UI.Span.prototype.constructor = UI.Span;

	// Div

	UI.Div = function () {

		UI.Element.call(this);

		this.dom = document.createElement('div');

		return this;
	};

	UI.Div.prototype = Object.create(UI.Element.prototype);
	UI.Div.prototype.constructor = UI.Div;

	// Row

	UI.Row = function () {

		UI.Element.call(this);

		var dom = document.createElement('div');
		dom.className = 'Row';

		this.dom = dom;

		return this;
	};

	UI.Row.prototype = Object.create(UI.Element.prototype);
	UI.Row.prototype.constructor = UI.Row;

	// Panel

	UI.Panel = function () {

		UI.Element.call(this);

		var dom = document.createElement('div');
		dom.className = 'Panel';

		this.dom = dom;

		return this;
	};

	UI.Panel.prototype = Object.create(UI.Element.prototype);
	UI.Panel.prototype.constructor = UI.Panel;

	// Collapsible Panel

	UI.CollapsiblePanel = function () {

		UI.Panel.call(this);

		this.setClass('Panel Collapsible');

		var scope = this;

		this.static = new UI.Panel();
		this.static.setClass('Static');
		this.static.onClick(function () {

			scope.toggle();
		});
		this.dom.appendChild(this.static.dom);

		this.contents = new UI.Panel();
		this.contents.setClass('Content');
		this.dom.appendChild(this.contents.dom);

		var button = new UI.Panel();
		button.setClass('Button');
		this.static.add(button);

		this.isCollapsed = false;

		return this;
	};

	UI.CollapsiblePanel.prototype = Object.create(UI.Panel.prototype);
	UI.CollapsiblePanel.prototype.constructor = UI.CollapsiblePanel;

	UI.CollapsiblePanel.prototype.addStatic = function () {

		this.static.add.apply(this.static, arguments);
		return this;
	};

	UI.CollapsiblePanel.prototype.removeStatic = function () {

		this.static.remove.apply(this.static, arguments);
		return this;
	};

	UI.CollapsiblePanel.prototype.clearStatic = function () {

		this.static.clear();
		return this;
	};

	UI.CollapsiblePanel.prototype.add = function () {

		this.contents.add.apply(this.contents, arguments);
		return this;
	};

	UI.CollapsiblePanel.prototype.remove = function () {

		this.contents.remove.apply(this.contents, arguments);
		return this;
	};

	UI.CollapsiblePanel.prototype.clear = function () {

		this.contents.clear();
		return this;
	};

	UI.CollapsiblePanel.prototype.toggle = function () {

		this.setCollapsed(!this.isCollapsed);
	};

	UI.CollapsiblePanel.prototype.collapse = function () {

		this.setCollapsed(true);
	};

	UI.CollapsiblePanel.prototype.expand = function () {

		this.setCollapsed(false);
	};

	UI.CollapsiblePanel.prototype.setCollapsed = function (boolean) {

		if (boolean) {

			this.dom.classList.add('collapsed');
		} else {

			this.dom.classList.remove('collapsed');
		}

		this.isCollapsed = boolean;

		if (this.onCollapsedChangeCallback !== undefined) {

			this.onCollapsedChangeCallback(boolean);
		}
	};

	UI.CollapsiblePanel.prototype.onCollapsedChange = function (callback) {

		this.onCollapsedChangeCallback = callback;
	};

	// Text

	UI.Text = function (text) {

		UI.Element.call(this);

		var dom = document.createElement('span');
		dom.className = 'Text';
		dom.style.cursor = 'default';
		dom.style.display = 'inline-block';
		dom.style.verticalAlign = 'middle';

		this.dom = dom;
		this.setValue(text);

		return this;
	};

	UI.Text.prototype = Object.create(UI.Element.prototype);
	UI.Text.prototype.constructor = UI.Text;

	UI.Text.prototype.getValue = function () {

		return this.dom.textContent;
	};

	UI.Text.prototype.setValue = function (value) {

		if (value !== undefined) {

			this.dom.textContent = value;
		}

		return this;
	};

	// Input

	UI.Input = function (text) {

		UI.Element.call(this);

		var scope = this;

		var dom = document.createElement('input');
		dom.className = 'Input';
		dom.style.padding = '2px';
		dom.style.border = '1px solid transparent';

		dom.addEventListener('keydown', function (event) {

			event.stopPropagation();
		}, false);

		this.dom = dom;
		this.setValue(text);

		return this;
	};

	UI.Input.prototype = Object.create(UI.Element.prototype);
	UI.Input.prototype.constructor = UI.Input;

	UI.Input.prototype.getValue = function () {

		return this.dom.value;
	};

	UI.Input.prototype.setValue = function (value) {

		this.dom.value = value;

		return this;
	};

	// TextArea

	UI.TextArea = function () {

		UI.Element.call(this);

		var scope = this;

		var dom = document.createElement('textarea');
		dom.className = 'TextArea';
		dom.style.padding = '2px';
		dom.spellcheck = false;

		dom.addEventListener('keydown', function (event) {

			event.stopPropagation();

			if (event.keyCode === 9) {

				event.preventDefault();

				var cursor = dom.selectionStart;

				dom.value = dom.value.substring(0, cursor) + '\t' + dom.value.substring(cursor);
				dom.selectionStart = cursor + 1;
				dom.selectionEnd = dom.selectionStart;
			}
		}, false);

		this.dom = dom;

		return this;
	};

	UI.TextArea.prototype = Object.create(UI.Element.prototype);
	UI.TextArea.prototype.constructor = UI.TextArea;

	UI.TextArea.prototype.getValue = function () {

		return this.dom.value;
	};

	UI.TextArea.prototype.setValue = function (value) {

		this.dom.value = value;

		return this;
	};

	// Select

	UI.Select = function () {

		UI.Element.call(this);

		var scope = this;

		var dom = document.createElement('select');
		dom.className = 'Select';
		dom.style.padding = '2px';

		this.dom = dom;

		return this;
	};

	UI.Select.prototype = Object.create(UI.Element.prototype);
	UI.Select.prototype.constructor = UI.Select;

	UI.Select.prototype.setMultiple = function (boolean) {

		this.dom.multiple = boolean;

		return this;
	};

	UI.Select.prototype.setOptions = function (options) {

		var selected = this.dom.value;

		while (this.dom.children.length > 0) {

			this.dom.removeChild(this.dom.firstChild);
		}

		for (var key in options) {

			var option = document.createElement('option');
			option.value = key;
			option.innerHTML = options[key];
			this.dom.appendChild(option);
		}

		this.dom.value = selected;

		return this;
	};

	UI.Select.prototype.getValue = function () {

		return this.dom.value;
	};

	UI.Select.prototype.setValue = function (value) {

		value = String(value);

		if (this.dom.value !== value) {

			this.dom.value = value;
		}

		return this;
	};

	// Checkbox

	UI.Checkbox = function (boolean) {

		UI.Element.call(this);

		var scope = this;

		var dom = document.createElement('input');
		dom.className = 'Checkbox';
		dom.type = 'checkbox';

		this.dom = dom;
		this.setValue(boolean);

		return this;
	};

	UI.Checkbox.prototype = Object.create(UI.Element.prototype);
	UI.Checkbox.prototype.constructor = UI.Checkbox;

	UI.Checkbox.prototype.getValue = function () {

		return this.dom.checked;
	};

	UI.Checkbox.prototype.setValue = function (value) {

		if (value !== undefined) {

			this.dom.checked = value;
		}

		return this;
	};

	// Color

	UI.Color = function () {

		UI.Element.call(this);

		var scope = this;

		var dom = document.createElement('input');
		dom.className = 'Color';
		dom.style.width = '64px';
		dom.style.height = '17px';
		dom.style.border = '0px';
		dom.style.padding = '2px';
		dom.style.backgroundColor = 'transparent';

		try {

			dom.type = 'color';
			dom.value = '#ffffff';
		} catch (exception) {}

		this.dom = dom;

		return this;
	};

	UI.Color.prototype = Object.create(UI.Element.prototype);
	UI.Color.prototype.constructor = UI.Color;

	UI.Color.prototype.getValue = function () {

		return this.dom.value;
	};

	UI.Color.prototype.getHexValue = function () {

		return parseInt(this.dom.value.substr(1), 16);
	};

	UI.Color.prototype.setValue = function (value) {

		this.dom.value = value;

		return this;
	};

	UI.Color.prototype.setHexValue = function (hex) {

		this.dom.value = '#' + ('000000' + hex.toString(16)).slice(-6);

		return this;
	};

	// Number

	UI.Number = function (number) {

		UI.Element.call(this);

		var scope = this;

		var dom = document.createElement('input');
		dom.className = 'Number';
		dom.value = '0.00';

		dom.addEventListener('keydown', function (event) {

			event.stopPropagation();

			if (event.keyCode === 13) dom.blur();
		}, false);

		this.value = 0;

		this.min = -Infinity;
		this.max = Infinity;

		this.precision = 2;
		this.step = 1;
		this.unit = '';

		this.dom = dom;

		this.setValue(number);

		var changeEvent = document.createEvent('HTMLEvents');
		changeEvent.initEvent('change', true, true);

		var distance = 0;
		var onMouseDownValue = 0;

		var pointer = [0, 0];
		var prevPointer = [0, 0];

		function onMouseDown(event) {

			event.preventDefault();

			distance = 0;

			onMouseDownValue = scope.value;

			prevPointer = [event.clientX, event.clientY];

			document.addEventListener('mousemove', onMouseMove, false);
			document.addEventListener('mouseup', onMouseUp, false);
		}

		function onMouseMove(event) {

			var currentValue = scope.value;

			pointer = [event.clientX, event.clientY];

			distance += pointer[0] - prevPointer[0] - (pointer[1] - prevPointer[1]);

			var value = onMouseDownValue + distance / (event.shiftKey ? 5 : 50) * scope.step;
			value = Math.min(scope.max, Math.max(scope.min, value));

			if (currentValue !== value) {

				scope.setValue(value);
				dom.dispatchEvent(changeEvent);
			}

			prevPointer = [event.clientX, event.clientY];
		}

		function onMouseUp(event) {

			document.removeEventListener('mousemove', onMouseMove, false);
			document.removeEventListener('mouseup', onMouseUp, false);

			if (Math.abs(distance) < 2) {

				dom.focus();
				dom.select();
			}
		}

		function onChange(event) {

			scope.setValue(dom.value);
		}

		function onFocus(event) {

			dom.style.backgroundColor = '';
			dom.style.cursor = '';
		}

		function onBlur(event) {

			dom.style.backgroundColor = 'transparent';
			dom.style.cursor = 'col-resize';
		}

		onBlur();

		dom.addEventListener('mousedown', onMouseDown, false);
		dom.addEventListener('change', onChange, false);
		dom.addEventListener('focus', onFocus, false);
		dom.addEventListener('blur', onBlur, false);

		return this;
	};

	UI.Number.prototype = Object.create(UI.Element.prototype);
	UI.Number.prototype.constructor = UI.Number;

	UI.Number.prototype.getValue = function () {

		return this.value;
	};

	UI.Number.prototype.setValue = function (value) {

		if (value !== undefined) {

			value = parseFloat(value);

			if (value < this.min) value = this.min;
			if (value > this.max) value = this.max;

			this.value = value;
			this.dom.value = value.toFixed(this.precision) + ' ' + this.unit;
		}

		return this;
	};

	UI.Number.prototype.setPrecision = function (precision) {

		this.precision = precision;

		return this;
	};

	UI.Number.prototype.setStep = function (step) {

		this.step = step;

		return this;
	};

	UI.Number.prototype.setRange = function (min, max) {

		this.min = min;
		this.max = max;

		return this;
	};

	UI.Number.prototype.setUnit = function (unit) {

		this.unit = unit;

		return this;
	};

	// Integer

	UI.Integer = function (number) {

		UI.Element.call(this);

		var scope = this;

		var dom = document.createElement('input');
		dom.className = 'Number';
		dom.value = '0';

		dom.addEventListener('keydown', function (event) {

			event.stopPropagation();
		}, false);

		this.value = 0;

		this.min = -Infinity;
		this.max = Infinity;

		this.step = 1;

		this.dom = dom;

		this.setValue(number);

		var changeEvent = document.createEvent('HTMLEvents');
		changeEvent.initEvent('change', true, true);

		var distance = 0;
		var onMouseDownValue = 0;

		var pointer = [0, 0];
		var prevPointer = [0, 0];

		function onMouseDown(event) {

			event.preventDefault();

			distance = 0;

			onMouseDownValue = scope.value;

			prevPointer = [event.clientX, event.clientY];

			document.addEventListener('mousemove', onMouseMove, false);
			document.addEventListener('mouseup', onMouseUp, false);
		}

		function onMouseMove(event) {

			var currentValue = scope.value;

			pointer = [event.clientX, event.clientY];

			distance += pointer[0] - prevPointer[0] - (pointer[1] - prevPointer[1]);

			var value = onMouseDownValue + distance / (event.shiftKey ? 5 : 50) * scope.step;
			value = Math.min(scope.max, Math.max(scope.min, value)) | 0;

			if (currentValue !== value) {

				scope.setValue(value);
				dom.dispatchEvent(changeEvent);
			}

			prevPointer = [event.clientX, event.clientY];
		}

		function onMouseUp(event) {

			document.removeEventListener('mousemove', onMouseMove, false);
			document.removeEventListener('mouseup', onMouseUp, false);

			if (Math.abs(distance) < 2) {

				dom.focus();
				dom.select();
			}
		}

		function onChange(event) {

			scope.setValue(dom.value);
		}

		function onFocus(event) {

			dom.style.backgroundColor = '';
			dom.style.cursor = '';
		}

		function onBlur(event) {

			dom.style.backgroundColor = 'transparent';
			dom.style.cursor = 'col-resize';
		}

		onBlur();

		dom.addEventListener('mousedown', onMouseDown, false);
		dom.addEventListener('change', onChange, false);
		dom.addEventListener('focus', onFocus, false);
		dom.addEventListener('blur', onBlur, false);

		return this;
	};

	UI.Integer.prototype = Object.create(UI.Element.prototype);
	UI.Integer.prototype.constructor = UI.Integer;

	UI.Integer.prototype.getValue = function () {

		return this.value;
	};

	UI.Integer.prototype.setValue = function (value) {

		if (value !== undefined) {

			value = parseInt(value);

			this.value = value;
			this.dom.value = value;
		}

		return this;
	};

	UI.Number.prototype.setStep = function (step) {

		this.step = step;

		return this;
	};

	UI.Integer.prototype.setRange = function (min, max) {

		this.min = min;
		this.max = max;

		return this;
	};

	// Break

	UI.Break = function () {

		UI.Element.call(this);

		var dom = document.createElement('br');
		dom.className = 'Break';

		this.dom = dom;

		return this;
	};

	UI.Break.prototype = Object.create(UI.Element.prototype);
	UI.Break.prototype.constructor = UI.Break;

	// HorizontalRule

	UI.HorizontalRule = function () {

		UI.Element.call(this);

		var dom = document.createElement('hr');
		dom.className = 'HorizontalRule';

		this.dom = dom;

		return this;
	};

	UI.HorizontalRule.prototype = Object.create(UI.Element.prototype);
	UI.HorizontalRule.prototype.constructor = UI.HorizontalRule;

	// Button

	UI.Button = function (value) {

		UI.Element.call(this);

		var dom = document.createElement('button');
		dom.className = 'Button';

		this.dom = dom;
		this.dom.textContent = value;

		return this;
	};

	UI.Button.prototype = Object.create(UI.Element.prototype);
	UI.Button.prototype.constructor = UI.Button;

	UI.Button.prototype.setLabel = function (value) {

		this.dom.textContent = value;

		return this;
	};

	// Modal

	UI.Modal = function (value) {

		var scope = this;

		var dom = document.createElement('div');

		dom.style.position = 'absolute';
		dom.style.width = '100%';
		dom.style.height = '100%';
		dom.style.backgroundColor = 'rgba(0,0,0,0.5)';
		dom.style.display = 'none';
		dom.style.alignItems = 'center';
		dom.style.justifyContent = 'center';
		dom.addEventListener('click', function (event) {

			scope.hide();
		});

		this.dom = dom;

		this.container = new UI.Panel();
		this.container.dom.style.width = '200px';
		this.container.dom.style.padding = '20px';
		this.container.dom.style.backgroundColor = '#ffffff';
		this.container.dom.style.boxShadow = '0px 5px 10px rgba(0,0,0,0.5)';

		this.add(this.container);

		return this;
	};

	UI.Modal.prototype = Object.create(UI.Element.prototype);
	UI.Modal.prototype.constructor = UI.Modal;

	UI.Modal.prototype.show = function (content) {

		this.container.clear();
		this.container.add(content);

		this.dom.style.display = 'flex';

		return this;
	};

	UI.Modal.prototype.hide = function () {

		this.dom.style.display = 'none';

		return this;
	};
	DomUtil.UI = UI;
	exports.default = DomUtil;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(27);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// EventEmitter.js inner module of nodejs
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Softwsare without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
		this._events = this._events || {};
		this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function (n) {
		if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
		this._maxListeners = n;
		return this;
	};

	EventEmitter.prototype.emit = function (type) {
		var er, handler, len, args, i, listeners;

		if (!this._events) this._events = {};

		// If there is no 'error' event listener then throw.
		if (type === 'error') {
			if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
				er = arguments[1];
				if (er instanceof Error) {
					throw er; // Unhandled 'error' event
				} else {
					// At least give some kind of context to the user
					var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
					err.context = er;
					throw err;
				}
			}
		}

		handler = this._events[type];

		if (isUndefined(handler)) return false;

		if (isFunction(handler)) {
			switch (arguments.length) {
				// fast cases
				case 1:
					handler.call(this);
					break;
				case 2:
					handler.call(this, arguments[1]);
					break;
				case 3:
					handler.call(this, arguments[1], arguments[2]);
					break;
				// slower
				default:
					args = Array.prototype.slice.call(arguments, 1);
					handler.apply(this, args);
			}
		} else if (isObject(handler)) {
			args = Array.prototype.slice.call(arguments, 1);
			listeners = handler.slice();
			len = listeners.length;
			for (i = 0; i < len; i++) {
				listeners[i].apply(this, args);
			}
		}

		return true;
	};

	EventEmitter.prototype.addListener = function (type, listener) {
		var m;

		if (!isFunction(listener)) throw TypeError('listener must be a function');

		if (!this._events) this._events = {};

		// To avoid recursion in the case that type === "newListener"! Before
		// adding it to the listeners, first emit "newListener".
		if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

		if (!this._events[type])
			// Optimize the case of one listener. Don't need the extra array object.
			this._events[type] = listener;else if (isObject(this._events[type]))
			// If we've already got an array, just append.
			this._events[type].push(listener);else
			// Adding the second element, need to change to array.
			this._events[type] = [this._events[type], listener];

		// Check for listener leak
		if (isObject(this._events[type]) && !this._events[type].warned) {
			if (!isUndefined(this._maxListeners)) {
				m = this._maxListeners;
			} else {
				m = EventEmitter.defaultMaxListeners;
			}

			if (m && m > 0 && this._events[type].length > m) {
				this._events[type].warned = true;
				console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
				if (typeof console.trace === 'function') {
					// not supported in IE 10
					console.trace();
				}
			}
		}

		return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function (type, listener) {
		if (!isFunction(listener)) throw TypeError('listener must be a function');

		var fired = false;

		function g() {
			this.removeListener(type, g);

			if (!fired) {
				fired = true;
				listener.apply(this, arguments);
			}
		}

		g.listener = listener;
		this.on(type, g);

		return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function (type, listener) {
		var list, position, length, i;

		if (!isFunction(listener)) throw TypeError('listener must be a function');

		if (!this._events || !this._events[type]) return this;

		list = this._events[type];
		length = list.length;
		position = -1;

		if (list === listener || isFunction(list.listener) && list.listener === listener) {
			delete this._events[type];
			if (this._events.removeListener) this.emit('removeListener', type, listener);
		} else if (isObject(list)) {
			for (i = length; i-- > 0;) {
				if (list[i] === listener || list[i].listener && list[i].listener === listener) {
					position = i;
					break;
				}
			}

			if (position < 0) return this;

			if (list.length === 1) {
				list.length = 0;
				delete this._events[type];
			} else {
				list.splice(position, 1);
			}

			if (this._events.removeListener) this.emit('removeListener', type, listener);
		}

		return this;
	};

	EventEmitter.prototype.removeAllListeners = function (type) {
		var key, listeners;

		if (!this._events) return this;

		// not listening for removeListener, no need to emit
		if (!this._events.removeListener) {
			if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
			return this;
		}

		// emit removeListener for all listeners on all events
		if (arguments.length === 0) {
			for (key in this._events) {
				if (key === 'removeListener') continue;
				this.removeAllListeners(key);
			}
			this.removeAllListeners('removeListener');
			this._events = {};
			return this;
		}

		listeners = this._events[type];

		if (isFunction(listeners)) {
			this.removeListener(type, listeners);
		} else if (listeners) {
			// LIFO order
			while (listeners.length) {
				this.removeListener(type, listeners[listeners.length - 1]);
			}
		}
		delete this._events[type];

		return this;
	};

	EventEmitter.prototype.listeners = function (type) {
		var ret;
		if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
		return ret;
	};

	EventEmitter.prototype.listenerCount = function (type) {
		if (this._events) {
			var evlistener = this._events[type];

			if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
		}
		return 0;
	};

	EventEmitter.listenerCount = function (emitter, type) {
		return emitter.listenerCount(type);
	};

	function isFunction(arg) {
		return typeof arg === 'function';
	}

	function isNumber(arg) {
		return typeof arg === 'number';
	}

	function isObject(arg) {
		return (typeof arg === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg)) === 'object' && arg !== null;
	}

	function isUndefined(arg) {
		return arg === void 0;
	}

/***/ },
/* 94 */
/***/ function(module, exports) {

	/**
	 * @description from 'https://github.com/sindresorhus/object-assign'
	 */
	'use strict';
	/* eslint-disable no-unused-vars */

	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _es6Promise = __webpack_require__(96);

	Object.keys(_es6Promise).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _es6Promise[key];
	    }
	  });
	});

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   4.0.5
	 */

	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.ES6Promise = factory());
	}(this, (function () { 'use strict';

	function objectOrFunction(x) {
	  return typeof x === 'function' || typeof x === 'object' && x !== null;
	}

	function isFunction(x) {
	  return typeof x === 'function';
	}

	var _isArray = undefined;
	if (!Array.isArray) {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	} else {
	  _isArray = Array.isArray;
	}

	var isArray = _isArray;

	var len = 0;
	var vertxNext = undefined;
	var customSchedulerFn = undefined;

	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};

	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}

	function setAsap(asapFn) {
	  asap = asapFn;
	}

	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}

	// vertx
	function useVertxTimer() {
	  if (typeof vertxNext !== 'undefined') {
	    return function () {
	      vertxNext(flush);
	    };
	  }

	  return useSetTimeout();
	}

	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });

	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}

	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}

	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}

	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];

	    callback(arg);

	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }

	  len = 0;
	}

	function attemptVertx() {
	  try {
	    var r = require;
	    var vertx = __webpack_require__(98);
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}

	var scheduleFlush = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}

	function then(onFulfillment, onRejection) {
	  var _arguments = arguments;

	  var parent = this;

	  var child = new this.constructor(noop);

	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }

	  var _state = parent._state;

	  if (_state) {
	    (function () {
	      var callback = _arguments[_state - 1];
	      asap(function () {
	        return invokeCallback(_state, child, callback, parent._result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }

	  return child;
	}

	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.resolve(1);

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve(object) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }

	  var promise = new Constructor(noop);
	  _resolve(promise, object);
	  return promise;
	}

	var PROMISE_ID = Math.random().toString(36).substring(16);

	function noop() {}

	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;

	var GET_THEN_ERROR = new ErrorObject();

	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}

	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}

	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}

	function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}

	function handleForeignThenable(promise, thenable, then) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        _resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;

	      _reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));

	    if (!sealed && error) {
	      sealed = true;
	      _reject(promise, error);
	    }
	  }, promise);
	}

	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    _reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return _resolve(promise, value);
	    }, function (reason) {
	      return _reject(promise, reason);
	    });
	  }
	}

	function handleMaybeThenable(promise, maybeThenable, then$$) {
	  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$ === GET_THEN_ERROR) {
	      _reject(promise, GET_THEN_ERROR.error);
	    } else if (then$$ === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$)) {
	      handleForeignThenable(promise, maybeThenable, then$$);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}

	function _resolve(promise, value) {
	  if (promise === value) {
	    _reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}

	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }

	  publish(promise);
	}

	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }

	  promise._result = value;
	  promise._state = FULFILLED;

	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}

	function _reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;

	  asap(publishRejection, promise);
	}

	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;

	  parent._onerror = null;

	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;

	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}

	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;

	  if (subscribers.length === 0) {
	    return;
	  }

	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;

	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];

	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }

	  promise._subscribers.length = 0;
	}

	function ErrorObject() {
	  this.error = null;
	}

	var TRY_CATCH_ERROR = new ErrorObject();

	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}

	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;

	  if (hasCallback) {
	    value = tryCatch(callback, detail);

	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value = null;
	    } else {
	      succeeded = true;
	    }

	    if (promise === value) {
	      _reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }

	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      _resolve(promise, value);
	    } else if (failed) {
	      _reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      _reject(promise, value);
	    }
	}

	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      _resolve(promise, value);
	    }, function rejectPromise(reason) {
	      _reject(promise, reason);
	    });
	  } catch (e) {
	    _reject(promise, e);
	  }
	}

	var id = 0;
	function nextId() {
	  return id++;
	}

	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}

	function Enumerator(Constructor, input) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop);

	  if (!this.promise[PROMISE_ID]) {
	    makePromise(this.promise);
	  }

	  if (isArray(input)) {
	    this._input = input;
	    this.length = input.length;
	    this._remaining = input.length;

	    this._result = new Array(this.length);

	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate();
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    _reject(this.promise, validationError());
	  }
	}

	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	};

	Enumerator.prototype._enumerate = function () {
	  var length = this.length;
	  var _input = this._input;

	  for (var i = 0; this._state === PENDING && i < length; i++) {
	    this._eachEntry(_input[i], i);
	  }
	};

	Enumerator.prototype._eachEntry = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$ = c.resolve;

	  if (resolve$$ === resolve) {
	    var _then = getThen(entry);

	    if (_then === then && entry._state !== PENDING) {
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof _then !== 'function') {
	      this._remaining--;
	      this._result[i] = entry;
	    } else if (c === Promise) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, _then);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve$$) {
	        return resolve$$(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve$$(entry), i);
	  }
	};

	Enumerator.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;

	  if (promise._state === PENDING) {
	    this._remaining--;

	    if (state === REJECTED) {
	      _reject(promise, value);
	    } else {
	      this._result[i] = value;
	    }
	  }

	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};

	Enumerator.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;

	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};

	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```

	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```

	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}

	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.

	  Example:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```

	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```

	  An example real-world use case is implementing timeouts:

	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```

	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}

	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  _reject(promise, reason);
	  return promise;
	}

	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}

	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}

	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.

	  Terminology
	  -----------

	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.

	  A promise can be in one of three states: pending, fulfilled, or rejected.

	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.

	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.


	  Basic Usage:
	  ------------

	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);

	    // on failure
	    reject(reason);
	  });

	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Advanced Usage:
	  ---------------

	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.

	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();

	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();

	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }

	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Unlike callbacks, promises are great composable primitives.

	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON

	    return values;
	  });
	  ```

	  @class Promise
	  @param {function} resolver
	  Useful for tooling.
	  @constructor
	*/
	function Promise(resolver) {
	  this[PROMISE_ID] = nextId();
	  this._result = this._state = undefined;
	  this._subscribers = [];

	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	  }
	}

	Promise.all = all;
	Promise.race = race;
	Promise.resolve = resolve;
	Promise.reject = reject;
	Promise._setScheduler = setScheduler;
	Promise._setAsap = setAsap;
	Promise._asap = asap;

	Promise.prototype = {
	  constructor: Promise,

	  /**
	    The primary way of interacting with a promise is through its `then` method,
	    which registers callbacks to receive either a promise's eventual value or the
	    reason why the promise cannot be fulfilled.
	  
	    ```js
	    findUser().then(function(user){
	      // user is available
	    }, function(reason){
	      // user is unavailable, and you are given the reason why
	    });
	    ```
	  
	    Chaining
	    --------
	  
	    The return value of `then` is itself a promise.  This second, 'downstream'
	    promise is resolved with the return value of the first promise's fulfillment
	    or rejection handler, or rejected if the handler throws an exception.
	  
	    ```js
	    findUser().then(function (user) {
	      return user.name;
	    }, function (reason) {
	      return 'default name';
	    }).then(function (userName) {
	      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	      // will be `'default name'`
	    });
	  
	    findUser().then(function (user) {
	      throw new Error('Found user, but still unhappy');
	    }, function (reason) {
	      throw new Error('`findUser` rejected and we're unhappy');
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	    });
	    ```
	    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	  
	    ```js
	    findUser().then(function (user) {
	      throw new PedagogicalException('Upstream error');
	    }).then(function (value) {
	      // never reached
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // The `PedgagocialException` is propagated all the way down to here
	    });
	    ```
	  
	    Assimilation
	    ------------
	  
	    Sometimes the value you want to propagate to a downstream promise can only be
	    retrieved asynchronously. This can be achieved by returning a promise in the
	    fulfillment or rejection handler. The downstream promise will then be pending
	    until the returned promise is settled. This is called *assimilation*.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // The user's comments are now available
	    });
	    ```
	  
	    If the assimliated promise rejects, then the downstream promise will also reject.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // If `findCommentsByAuthor` fulfills, we'll have the value here
	    }, function (reason) {
	      // If `findCommentsByAuthor` rejects, we'll have the reason here
	    });
	    ```
	  
	    Simple Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let result;
	  
	    try {
	      result = findResult();
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	    findResult(function(result, err){
	      if (err) {
	        // failure
	      } else {
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findResult().then(function(result){
	      // success
	    }, function(reason){
	      // failure
	    });
	    ```
	  
	    Advanced Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let author, books;
	  
	    try {
	      author = findAuthor();
	      books  = findBooksByAuthor(author);
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	  
	    function foundBooks(books) {
	  
	    }
	  
	    function failure(reason) {
	  
	    }
	  
	    findAuthor(function(author, err){
	      if (err) {
	        failure(err);
	        // failure
	      } else {
	        try {
	          findBoooksByAuthor(author, function(books, err) {
	            if (err) {
	              failure(err);
	            } else {
	              try {
	                foundBooks(books);
	              } catch(reason) {
	                failure(reason);
	              }
	            }
	          });
	        } catch(error) {
	          failure(err);
	        }
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findAuthor().
	      then(findBooksByAuthor).
	      then(function(books){
	        // found books
	    }).catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method then
	    @param {Function} onFulfilled
	    @param {Function} onRejected
	    Useful for tooling.
	    @return {Promise}
	  */
	  then: then,

	  /**
	    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	    as the catch block of a try/catch statement.
	  
	    ```js
	    function findAuthor(){
	      throw new Error('couldn't find that author');
	    }
	  
	    // synchronous
	    try {
	      findAuthor();
	    } catch(reason) {
	      // something went wrong
	    }
	  
	    // async with promises
	    findAuthor().catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method catch
	    @param {Function} onRejection
	    Useful for tooling.
	    @return {Promise}
	  */
	  'catch': function _catch(onRejection) {
	    return this.then(null, onRejection);
	  }
	};

	function polyfill() {
	    var local = undefined;

	    if (typeof global !== 'undefined') {
	        local = global;
	    } else if (typeof self !== 'undefined') {
	        local = self;
	    } else {
	        try {
	            local = Function('return this')();
	        } catch (e) {
	            throw new Error('polyfill failed because global object is unavailable in this environment');
	        }
	    }

	    var P = local.Promise;

	    if (P) {
	        var promiseToString = null;
	        try {
	            promiseToString = Object.prototype.toString.call(P.resolve());
	        } catch (e) {
	            // silently ignored
	        }

	        if (promiseToString === '[object Promise]' && !P.cast) {
	            return;
	        }
	    }

	    local.Promise = Promise;
	}

	// Strange compat..
	Promise.polyfill = polyfill;
	Promise.Promise = Promise;

	return Promise;

	})));
	//# sourceMappingURL=es6-promise.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97), (function() { return this; }())))

/***/ },
/* 97 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 98 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Draggable = undefined;

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _core = __webpack_require__(88);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * [MOUSESTATS make element can be drag]
	 * @type {Object}
	 */
	var MOUSESTATS = {
		'OFF': 0,
		'CLICKED': 1
	}; // draggabel.js

	var Draggable = exports.Draggable = function () {
		function Draggable(ele) {
			(0, _classCallCheck3.default)(this, Draggable);

			this.element = ele;
			this.element._draggable = true;
			this.element._mousestats = MOUSESTATS.OFF;
			var offsetPosition = { x: 0, y: 0 };
			_core.DomEvent.on(this.element, 'mousedown', function (e) {
				if (this._draggable) {
					this._mousestats = MOUSESTATS.CLICKED;
					offsetPosition.x = e.offsetX;
					offsetPosition.y = e.offsetY;
				}
			});
			_core.DomEvent.on(this.element, 'mousemove', function (e) {
				//avoid bug when e don't move but mousemove will run.such as click
				if (this._mousestats === MOUSESTATS.CLICKED && (e.movementX !== 0 || e.movementY !== 0)) {
					this.style.right = 'auto';
					this.style.bottom = 'auto';
					this.style.left = e.clientX - 20 + 'px';
					this.style.top = e.clientY - 20 + 'px';
				}
			});
			_core.DomEvent.on(this.element, 'mouseup', function (e) {
				this._mousestats = MOUSESTATS.OFF;
			});
		}

		(0, _createClass3.default)(Draggable, [{
			key: 'enable',
			value: function enable() {
				this.element._draggable = true;
			}
		}, {
			key: 'disable',
			value: function disable() {
				this.element._draggable = false;
			}
		}]);
		return Draggable;
	}();

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Dispatcher.js
	/**
	 * @{@link https://facebook.github.io/flux/docs/todo-list.html#content}
	 * @description to achive flux.
	 */
	var Promise = __webpack_require__(95).Promise;
	var assign = __webpack_require__(94);

	var _callbacks = [];
	var _promises = [];

	var Dispatcher = function Dispatcher() {};
	Dispatcher.prototype = assign({}, Dispatcher.prototype, {

	  /**
	   * Register a Store's callback so that it may be invoked by an action.
	   * @param {function} callback The callback to be registered.
	   * @return {number} The index of the callback within the _callbacks array.
	   */
	  register: function register(callback) {
	    _callbacks.push(callback);
	    return _callbacks.length - 1; // index
	  },

	  /**
	   * dispatch
	   * @param  {object} payload The data from the action.
	   */
	  dispatch: function dispatch(payload) {
	    // First create array of promises for callbacks to reference.
	    var resolves = [];
	    var rejects = [];
	    _promises = _callbacks.map(function (_, i) {
	      return new Promise(function (resolve, reject) {
	        resolves[i] = resolve;
	        rejects[i] = reject;
	      });
	    });
	    // Dispatch to callbacks and resolve/reject promises.
	    _callbacks.forEach(function (callback, i) {
	      // Callback can return an obj, to resolve, or a promise, to chain.
	      // See waitFor() for why this might be useful.
	      Promise.resolve(callback(payload)).then(function () {
	        resolves[i](payload);
	      }, function () {
	        rejects[i](new Error('Dispatcher callback unsuccessful'));
	      });
	    });
	    _promises = [];
	  }
	});

	exports.default = Dispatcher;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.globalEvent = undefined;

	var _core = __webpack_require__(88);

	var globalEvent = new _core.EventEmitter(); // globalEvents.js
	// event communicate for diffrent world
	exports.globalEvent = globalEvent;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	exports.GuiControl = undefined;

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _plugin = __webpack_require__(103);

	var plugin = _interopRequireWildcard(_plugin);

	var _globalEvents = __webpack_require__(101);

	var _core = __webpack_require__(88);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class [control for all gui]
	 */
	var GuiControl = exports.GuiControl = function () {
	   function GuiControl() {
	      (0, _classCallCheck3.default)(this, GuiControl);

	      this.gui = new plugin.dat.GUI();
	      this.gui.close();
	   }
	   /**
	    * @description addlightControl
	    */


	   (0, _createClass3.default)(GuiControl, [{
	      key: 'addLightControl',
	      value: function addLightControl(light) {
	         this._lightControlInit = false;
	         if (!this._lightControlInit) {
	            var step = 0;
	            var lightControls = this.lightControls = { lightspeed: 0.0 };
	            this.gui.add(this.lightControls, 'lightspeed', 0, 0.5);
	            _globalEvents.globalEvent.on('requestAmimationFrame', function () {
	               step += lightControls.lightspeed;
	               if (step > 314) {
	                  console.log(step);step -= 314;
	               };
	               light.position.setX(250 * Math.sin(step));
	               light.position.setY(250 * Math.cos(step));
	            });
	            this._lightControlInit = true;
	         }
	         return this;
	      }
	      /**
	       * @description  add Stats monitor
	       */

	   }, {
	      key: 'addStatsMonitor',
	      value: function addStatsMonitor(eleId) {
	         this._statsMonitorInit = false;
	         if (!this._statsMonitorInit) {
	            var ele = _core.DomUtil.getById(eleId);
	            var stats = this.statsMonitor = new plugin.Stats();
	            stats.setMode(0);
	            ele.appendChild(stats.domElement);
	            _globalEvents.globalEvent.on('requestAmimationFrame', function () {
	               stats.update();
	            });
	         }
	         this._statsMonitorInit = true;
	      }
	   }]);
	   return GuiControl;
	}(); // guiControl.js

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.cameraControl = exports.message = exports.Stats = exports.dat = undefined;

	var _message = __webpack_require__(104);

	var _message2 = _interopRequireDefault(_message);

	var _cameraControl = __webpack_require__(105);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(106);
	__webpack_require__(107);
	var dat = exports.dat = __webpack_require__(108);
	var Stats = exports.Stats = __webpack_require__(109);
	exports.message = _message2.default;
	exports.cameraControl = _cameraControl.cameraControl;

/***/ },
/* 104 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// message.js
	// show messge on the Dom;
	var message = {};
	message.MESSAGE = {
		'SUCCESS': 'success',
		'INFO': 'info',
		'ERROR': 'error'
	};
	message.POSITION = {};
	message.show = function (msg, type, position) {
		switch (type) {
			case MESSAGE.ERROR:
				message.error(msg, position);
				break;
			case MESSAGE.SUCCESS:
				message.success(msg, position);
				break;
			case MESSAGE.INFO:
				message.info(msg, position);
				break;
			default:
				console.log('unknown type');
		}
	};
	message.error = function (msg, position) {
		window.alert(msg);
	};
	message.info = function (msg, position) {
		console.log('un write');
	};
	message.success = function (msg, position) {
		console.log('un write');
	};
	exports.default = message;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.cameraControl = undefined;

	var _core = __webpack_require__(88);

	var _threejs = __webpack_require__(23);

	var THREE = _interopRequireWildcard(_threejs);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// cameraControl.js
	function cameraControl(object, dom) {
		this.domElement = dom;
		this.camera = object;
		this.tempCamera = this.camera.clone();
		var scope = this;
		var STATE = { 'OFF': 1, 'ROLATE': 2, 'PAN': 3 };
		this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };
		var mouseState = STATE.OFF;
		var quaternion = this.camera.quaternion.clone();
		var rotate = { x: 0, y: 0 };
		this.mouseButtons = { OR: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };
		var mousedownFn = function mousedownFn(event) {
			if (event.button === THREE.MOUSE.LEFT) {
				mouseState = STATE.ROLATE;
			} else if (event.button === THREE.MOUSE.RIGHT) {
				mouseState = STATE.PAN;
			}
		};
		var mousemoveFn = function mousemoveFn(event) {
			if (Math.pow(event.movementX, 2) + Math.pow(event.movementY, 2) < 2) {
				return false;
			}
			if (mouseState === STATE.PAN) {
				pan(event.movementX, event.movementY);
			} else if (mouseState === STATE.ROLATE) {
				var deltX = Math.PI / 2 * event.movementX / scope.domElement.width;
				var deltY = Math.PI / 2 * event.movementY / scope.domElement.height;
				rotate.x += deltX;
				rotate.y += deltY;
				var xquaternion = new THREE.Quaternion();
				xquaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), rotate.y);
				var yquaternion = new THREE.Quaternion();
				yquaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotate.x);
				var requaternion = new THREE.Quaternion();
				scope.camera.quaternion.copy(requaternion.multiply(quaternion).multiply(xquaternion).multiply(yquaternion));
				// scope.camera.rotateX(deltY);
				// scope.camera.rotateY(deltX);
				scope.camera.updateMatrixWorld(true);
			}
		};
		var mouseupFn = function mouseupFn(e) {
			mouseState = STATE.OFF;
		};
		var contextmenuFn = function contextmenuFn(event) {
			_core.DomEvent.preventDefault(event);
		};
		var wheelFn = function wheelFn(event) {
			var position = scope.camera.position;
			if (event.deltaY < 0) {

				position.setZ(position.z / 2);
			} else if (event.deltaY > 0) {

				position.setZ(position.z * 2);
			}
			scope.camera.updateMatrixWorld(true);
		};
		var keydownFn = function keydownFn(event) {
			console.log(event);
			switch (event.keyCode) {
				case scope.keys.UP:
					pan(0, 10);
					console.log('up');
					break;

				case scope.keys.BOTTOM:
					pan(0, -10);
					break;

				case scope.keys.LEFT:
					pan(10, 0);
					break;

				case scope.keys.RIGHT:
					pan(-10, 0);
					break;
			}
		};
		function pan(moveX, moveY) {
			var deltX = scope.camera.position.z * moveX / scope.domElement.width;
			var deltY = scope.camera.position.z * moveY / scope.domElement.height;
			var position = scope.camera.position;
			position.setX(position.x - deltX * 2);
			position.setY(position.y + deltY * 2);
			// scope.camera.translateX(-deltX*2);
			// scope.camera.translateY(deltY*2);
			scope.camera.updateMatrixWorld(true);
		}
		_core.DomEvent.on(this.domElement, 'mousedown', mousedownFn);
		_core.DomEvent.on(this.domElement, 'mousemove', mousemoveFn);
		_core.DomEvent.on(this.domElement, 'mouseup', mouseupFn);
		_core.DomEvent.on(this.domElement, 'contextmenu', contextmenuFn);
		_core.DomEvent.on(this.domElement, 'wheel', wheelFn);
		_core.DomEvent.on(window, 'keydown', keydownFn);
	}
	exports.cameraControl = cameraControl;

/***/ },
/* 106 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @author qiao / https://github.com/qiao
	 * @author mrdoob / http://mrdoob.com
	 * @author alteredq / http://alteredqualia.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author erich666 / http://erichaines.com
	 */

	// This set of controls performs orbiting, dollying (zooming), and panning.
	// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
	//
	//    Orbit - left mouse / touch: one finger move
	//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
	//    Pan - right mouse, or arrow keys / touch: three finter swipe

	THREE.OrbitControls = function (object, domElement) {

	        this.object = object;

	        this.domElement = domElement !== undefined ? domElement : document;

	        // Set to false to disable this control
	        this.enabled = true;

	        // "target" sets the location of focus, where the object orbits around
	        this.target = new THREE.Vector3();

	        // How far you can dolly in and out ( PerspectiveCamera only )
	        this.minDistance = 0;
	        this.maxDistance = Infinity;

	        // How far you can zoom in and out ( OrthographicCamera only )
	        this.minZoom = 0;
	        this.maxZoom = Infinity;

	        // How far you can orbit vertically, upper and lower limits.
	        // Range is 0 to Math.PI radians.
	        this.minPolarAngle = 0; // radians
	        this.maxPolarAngle = Math.PI; // radians

	        // How far you can orbit horizontally, upper and lower limits.
	        // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
	        this.minAzimuthAngle = -Infinity; // radians
	        this.maxAzimuthAngle = Infinity; // radians

	        // Set to true to enable damping (inertia)
	        // If damping is enabled, you must call controls.update() in your animation loop
	        this.enableDamping = false;
	        this.dampingFactor = 0.25;

	        // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
	        // Set to false to disable zooming
	        this.enableZoom = true;
	        this.zoomSpeed = 1.0;

	        // Set to false to disable rotating
	        this.enableRotate = true;
	        this.rotateSpeed = 1.0;

	        // Set to false to disable panning
	        this.enablePan = true;
	        this.keyPanSpeed = 7.0; // pixels moved per arrow key push

	        // Set to true to automatically rotate around the target
	        // If auto-rotate is enabled, you must call controls.update() in your animation loop
	        this.autoRotate = false;
	        this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

	        // Set to false to disable use of the keys
	        this.enableKeys = true;

	        // The four arrow keys
	        this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

	        // Mouse buttons
	        this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

	        // for reset
	        this.target0 = this.target.clone();
	        this.position0 = this.object.position.clone();
	        this.zoom0 = this.object.zoom;

	        //
	        // public methods
	        //

	        this.getPolarAngle = function () {

	                return spherical.phi;
	        };

	        this.getAzimuthalAngle = function () {

	                return spherical.theta;
	        };

	        this.reset = function () {

	                scope.target.copy(scope.target0);
	                scope.object.position.copy(scope.position0);
	                scope.object.zoom = scope.zoom0;

	                scope.object.updateProjectionMatrix();
	                scope.dispatchEvent(changeEvent);

	                scope.update();

	                state = STATE.NONE;
	        };

	        // this method is exposed, but perhaps it would be better if we can make it private...
	        this.update = function () {

	                var offset = new THREE.Vector3();

	                // so camera.up is the orbit axis
	                var quat = new THREE.Quaternion().setFromUnitVectors(object.up, new THREE.Vector3(0, 1, 0));
	                var quatInverse = quat.clone().inverse();

	                var lastPosition = new THREE.Vector3();
	                var lastQuaternion = new THREE.Quaternion();

	                return function update() {

	                        var position = scope.object.position;

	                        offset.copy(position).sub(scope.target);

	                        // rotate offset to "y-axis-is-up" space
	                        offset.applyQuaternion(quat);

	                        // angle from z-axis around y-axis
	                        spherical.setFromVector3(offset);

	                        if (scope.autoRotate && state === STATE.NONE) {

	                                rotateLeft(getAutoRotationAngle());
	                        }

	                        spherical.theta += sphericalDelta.theta;
	                        spherical.phi += sphericalDelta.phi;

	                        // restrict theta to be between desired limits
	                        spherical.theta = Math.max(scope.minAzimuthAngle, Math.min(scope.maxAzimuthAngle, spherical.theta));

	                        // restrict phi to be between desired limits
	                        spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));

	                        spherical.makeSafe();

	                        spherical.radius *= scale;

	                        // restrict radius to be between desired limits
	                        spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, spherical.radius));

	                        // move target to panned location
	                        scope.target.add(panOffset);

	                        offset.setFromSpherical(spherical);

	                        // rotate offset back to "camera-up-vector-is-up" space
	                        offset.applyQuaternion(quatInverse);

	                        position.copy(scope.target).add(offset);

	                        scope.object.lookAt(scope.target);

	                        if (scope.enableDamping === true) {

	                                sphericalDelta.theta *= 1 - scope.dampingFactor;
	                                sphericalDelta.phi *= 1 - scope.dampingFactor;
	                        } else {

	                                sphericalDelta.set(0, 0, 0);
	                        }

	                        scale = 1;
	                        panOffset.set(0, 0, 0);

	                        // update condition is:
	                        // min(camera displacement, camera rotation in radians)^2 > EPS
	                        // using small-angle approximation cos(x/2) = 1 - x^2 / 8

	                        if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {

	                                scope.dispatchEvent(changeEvent);

	                                lastPosition.copy(scope.object.position);
	                                lastQuaternion.copy(scope.object.quaternion);
	                                zoomChanged = false;

	                                return true;
	                        }

	                        return false;
	                };
	        }();

	        this.dispose = function () {

	                scope.domElement.removeEventListener('contextmenu', onContextMenu, false);
	                scope.domElement.removeEventListener('mousedown', onMouseDown, false);
	                scope.domElement.removeEventListener('wheel', onMouseWheel, false);

	                scope.domElement.removeEventListener('touchstart', onTouchStart, false);
	                scope.domElement.removeEventListener('touchend', onTouchEnd, false);
	                scope.domElement.removeEventListener('touchmove', onTouchMove, false);

	                document.removeEventListener('mousemove', onMouseMove, false);
	                document.removeEventListener('mouseup', onMouseUp, false);

	                window.removeEventListener('keydown', onKeyDown, false);

	                //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?
	        };

	        //
	        // internals
	        //

	        var scope = this;

	        var changeEvent = { type: 'change' };
	        var startEvent = { type: 'start' };
	        var endEvent = { type: 'end' };

	        var STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

	        var state = STATE.NONE;

	        var EPS = 0.000001;

	        // current position in spherical coordinates
	        var spherical = new THREE.Spherical();
	        var sphericalDelta = new THREE.Spherical();

	        var scale = 1;
	        var panOffset = new THREE.Vector3();
	        var zoomChanged = false;

	        var rotateStart = new THREE.Vector2();
	        var rotateEnd = new THREE.Vector2();
	        var rotateDelta = new THREE.Vector2();

	        var panStart = new THREE.Vector2();
	        var panEnd = new THREE.Vector2();
	        var panDelta = new THREE.Vector2();

	        var dollyStart = new THREE.Vector2();
	        var dollyEnd = new THREE.Vector2();
	        var dollyDelta = new THREE.Vector2();

	        function getAutoRotationAngle() {

	                return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
	        }

	        function getZoomScale() {

	                return Math.pow(0.95, scope.zoomSpeed);
	        }

	        function rotateLeft(angle) {

	                sphericalDelta.theta -= angle;
	        }

	        function rotateUp(angle) {

	                sphericalDelta.phi -= angle;
	        }

	        var panLeft = function () {

	                var v = new THREE.Vector3();

	                return function panLeft(distance, objectMatrix) {

	                        v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
	                        v.multiplyScalar(-distance);

	                        panOffset.add(v);
	                };
	        }();

	        var panUp = function () {

	                var v = new THREE.Vector3();

	                return function panUp(distance, objectMatrix) {

	                        v.setFromMatrixColumn(objectMatrix, 1); // get Y column of objectMatrix
	                        v.multiplyScalar(distance);

	                        panOffset.add(v);
	                };
	        }();

	        // deltaX and deltaY are in pixels; right and down are positive
	        var pan = function () {

	                var offset = new THREE.Vector3();

	                return function pan(deltaX, deltaY) {

	                        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

	                        if (scope.object instanceof THREE.PerspectiveCamera) {

	                                // perspective
	                                var position = scope.object.position;
	                                offset.copy(position).sub(scope.target);
	                                var targetDistance = offset.length();

	                                // half of the fov is center to top of screen
	                                targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0);

	                                // we actually don't use screenWidth, since perspective camera is fixed to screen height
	                                panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
	                                panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);
	                        } else if (scope.object instanceof THREE.OrthographicCamera) {

	                                // orthographic
	                                panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
	                                panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);
	                        } else {

	                                // camera neither orthographic nor perspective
	                                console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
	                                scope.enablePan = false;
	                        }
	                };
	        }();

	        function dollyIn(dollyScale) {

	                if (scope.object instanceof THREE.PerspectiveCamera) {

	                        scale /= dollyScale;
	                } else if (scope.object instanceof THREE.OrthographicCamera) {

	                        scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom * dollyScale));
	                        scope.object.updateProjectionMatrix();
	                        zoomChanged = true;
	                } else {

	                        console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
	                        scope.enableZoom = false;
	                }
	        }

	        function dollyOut(dollyScale) {

	                if (scope.object instanceof THREE.PerspectiveCamera) {

	                        scale *= dollyScale;
	                } else if (scope.object instanceof THREE.OrthographicCamera) {

	                        scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / dollyScale));
	                        scope.object.updateProjectionMatrix();
	                        zoomChanged = true;
	                } else {

	                        console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
	                        scope.enableZoom = false;
	                }
	        }

	        //
	        // event callbacks - update the object state
	        //

	        function handleMouseDownRotate(event) {

	                //console.log( 'handleMouseDownRotate' );

	                rotateStart.set(event.clientX, event.clientY);
	        }

	        function handleMouseDownDolly(event) {

	                //console.log( 'handleMouseDownDolly' );

	                dollyStart.set(event.clientX, event.clientY);
	        }

	        function handleMouseDownPan(event) {

	                //console.log( 'handleMouseDownPan' );

	                panStart.set(event.clientX, event.clientY);
	        }

	        function handleMouseMoveRotate(event) {

	                //console.log( 'handleMouseMoveRotate' );

	                rotateEnd.set(event.clientX, event.clientY);
	                rotateDelta.subVectors(rotateEnd, rotateStart);

	                var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

	                // rotating across whole screen goes 360 degrees around
	                rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);

	                // rotating up and down along whole screen attempts to go 360, but limited to 180
	                rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);

	                rotateStart.copy(rotateEnd);

	                scope.update();
	        }

	        function handleMouseMoveDolly(event) {

	                //console.log( 'handleMouseMoveDolly' );

	                dollyEnd.set(event.clientX, event.clientY);

	                dollyDelta.subVectors(dollyEnd, dollyStart);

	                if (dollyDelta.y > 0) {

	                        dollyIn(getZoomScale());
	                } else if (dollyDelta.y < 0) {

	                        dollyOut(getZoomScale());
	                }

	                dollyStart.copy(dollyEnd);

	                scope.update();
	        }

	        function handleMouseMovePan(event) {

	                //console.log( 'handleMouseMovePan' );

	                panEnd.set(event.clientX, event.clientY);

	                panDelta.subVectors(panEnd, panStart);

	                pan(panDelta.x, panDelta.y);

	                panStart.copy(panEnd);

	                scope.update();
	        }

	        function handleMouseUp(event) {

	                //console.log( 'handleMouseUp' );

	        }

	        function handleMouseWheel(event) {

	                //console.log( 'handleMouseWheel' );

	                if (event.deltaY < 0) {

	                        dollyOut(getZoomScale());
	                } else if (event.deltaY > 0) {

	                        dollyIn(getZoomScale());
	                }

	                scope.update();
	        }

	        function handleKeyDown(event) {

	                //console.log( 'handleKeyDown' );

	                switch (event.keyCode) {

	                        case scope.keys.UP:
	                                pan(0, scope.keyPanSpeed);
	                                scope.update();
	                                break;

	                        case scope.keys.BOTTOM:
	                                pan(0, -scope.keyPanSpeed);
	                                scope.update();
	                                break;

	                        case scope.keys.LEFT:
	                                pan(scope.keyPanSpeed, 0);
	                                scope.update();
	                                break;

	                        case scope.keys.RIGHT:
	                                pan(-scope.keyPanSpeed, 0);
	                                scope.update();
	                                break;

	                }
	        }

	        function handleTouchStartRotate(event) {

	                //console.log( 'handleTouchStartRotate' );

	                rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
	        }

	        function handleTouchStartDolly(event) {

	                //console.log( 'handleTouchStartDolly' );

	                var dx = event.touches[0].pageX - event.touches[1].pageX;
	                var dy = event.touches[0].pageY - event.touches[1].pageY;

	                var distance = Math.sqrt(dx * dx + dy * dy);

	                dollyStart.set(0, distance);
	        }

	        function handleTouchStartPan(event) {

	                //console.log( 'handleTouchStartPan' );

	                panStart.set(event.touches[0].pageX, event.touches[0].pageY);
	        }

	        function handleTouchMoveRotate(event) {

	                //console.log( 'handleTouchMoveRotate' );

	                rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
	                rotateDelta.subVectors(rotateEnd, rotateStart);

	                var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

	                // rotating across whole screen goes 360 degrees around
	                rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);

	                // rotating up and down along whole screen attempts to go 360, but limited to 180
	                rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);

	                rotateStart.copy(rotateEnd);

	                scope.update();
	        }

	        function handleTouchMoveDolly(event) {

	                //console.log( 'handleTouchMoveDolly' );

	                var dx = event.touches[0].pageX - event.touches[1].pageX;
	                var dy = event.touches[0].pageY - event.touches[1].pageY;

	                var distance = Math.sqrt(dx * dx + dy * dy);

	                dollyEnd.set(0, distance);

	                dollyDelta.subVectors(dollyEnd, dollyStart);

	                if (dollyDelta.y > 0) {

	                        dollyOut(getZoomScale());
	                } else if (dollyDelta.y < 0) {

	                        dollyIn(getZoomScale());
	                }

	                dollyStart.copy(dollyEnd);

	                scope.update();
	        }

	        function handleTouchMovePan(event) {

	                //console.log( 'handleTouchMovePan' );

	                panEnd.set(event.touches[0].pageX, event.touches[0].pageY);

	                panDelta.subVectors(panEnd, panStart);

	                pan(panDelta.x, panDelta.y);

	                panStart.copy(panEnd);

	                scope.update();
	        }

	        function handleTouchEnd(event) {}

	        //console.log( 'handleTouchEnd' );

	        //
	        // event handlers - FSM: listen for events and reset state
	        //

	        function onMouseDown(event) {

	                if (scope.enabled === false) return;

	                event.preventDefault();

	                if (event.button === scope.mouseButtons.ORBIT) {

	                        if (scope.enableRotate === false) return;

	                        handleMouseDownRotate(event);

	                        state = STATE.ROTATE;
	                } else if (event.button === scope.mouseButtons.ZOOM) {

	                        if (scope.enableZoom === false) return;

	                        handleMouseDownDolly(event);

	                        state = STATE.DOLLY;
	                } else if (event.button === scope.mouseButtons.PAN) {

	                        if (scope.enablePan === false) return;

	                        handleMouseDownPan(event);

	                        state = STATE.PAN;
	                }

	                if (state !== STATE.NONE) {

	                        document.addEventListener('mousemove', onMouseMove, false);
	                        document.addEventListener('mouseup', onMouseUp, false);

	                        scope.dispatchEvent(startEvent);
	                }
	        }

	        function onMouseMove(event) {

	                if (scope.enabled === false) return;

	                event.preventDefault();

	                if (state === STATE.ROTATE) {

	                        if (scope.enableRotate === false) return;

	                        handleMouseMoveRotate(event);
	                } else if (state === STATE.DOLLY) {

	                        if (scope.enableZoom === false) return;

	                        handleMouseMoveDolly(event);
	                } else if (state === STATE.PAN) {

	                        if (scope.enablePan === false) return;

	                        handleMouseMovePan(event);
	                }
	        }

	        function onMouseUp(event) {

	                if (scope.enabled === false) return;

	                handleMouseUp(event);

	                document.removeEventListener('mousemove', onMouseMove, false);
	                document.removeEventListener('mouseup', onMouseUp, false);

	                scope.dispatchEvent(endEvent);

	                state = STATE.NONE;
	        }

	        function onMouseWheel(event) {

	                if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE && state !== STATE.ROTATE) return;

	                event.preventDefault();
	                event.stopPropagation();

	                handleMouseWheel(event);

	                scope.dispatchEvent(startEvent); // not sure why these are here...
	                scope.dispatchEvent(endEvent);
	        }

	        function onKeyDown(event) {

	                if (scope.enabled === false || scope.enableKeys === false || scope.enablePan === false) return;
	                //console.log('keydown')
	                handleKeyDown(event);
	        }

	        function onTouchStart(event) {

	                if (scope.enabled === false) return;

	                switch (event.touches.length) {

	                        case 1:
	                                // one-fingered touch: rotate

	                                if (scope.enableRotate === false) return;

	                                handleTouchStartRotate(event);

	                                state = STATE.TOUCH_ROTATE;

	                                break;

	                        case 2:
	                                // two-fingered touch: dolly

	                                if (scope.enableZoom === false) return;

	                                handleTouchStartDolly(event);

	                                state = STATE.TOUCH_DOLLY;

	                                break;

	                        case 3:
	                                // three-fingered touch: pan

	                                if (scope.enablePan === false) return;

	                                handleTouchStartPan(event);

	                                state = STATE.TOUCH_PAN;

	                                break;

	                        default:

	                                state = STATE.NONE;

	                }

	                if (state !== STATE.NONE) {

	                        scope.dispatchEvent(startEvent);
	                }
	        }

	        function onTouchMove(event) {

	                if (scope.enabled === false) return;

	                event.preventDefault();
	                event.stopPropagation();

	                switch (event.touches.length) {

	                        case 1:
	                                // one-fingered touch: rotate

	                                if (scope.enableRotate === false) return;
	                                if (state !== STATE.TOUCH_ROTATE) return; // is this needed?...

	                                handleTouchMoveRotate(event);

	                                break;

	                        case 2:
	                                // two-fingered touch: dolly

	                                if (scope.enableZoom === false) return;
	                                if (state !== STATE.TOUCH_DOLLY) return; // is this needed?...

	                                handleTouchMoveDolly(event);

	                                break;

	                        case 3:
	                                // three-fingered touch: pan

	                                if (scope.enablePan === false) return;
	                                if (state !== STATE.TOUCH_PAN) return; // is this needed?...

	                                handleTouchMovePan(event);

	                                break;

	                        default:

	                                state = STATE.NONE;

	                }
	        }

	        function onTouchEnd(event) {

	                if (scope.enabled === false) return;

	                handleTouchEnd(event);

	                scope.dispatchEvent(endEvent);

	                state = STATE.NONE;
	        }

	        function onContextMenu(event) {

	                event.preventDefault();
	        }

	        //

	        scope.domElement.addEventListener('contextmenu', onContextMenu, false);

	        scope.domElement.addEventListener('mousedown', onMouseDown, false);
	        scope.domElement.addEventListener('wheel', onMouseWheel, false);

	        scope.domElement.addEventListener('touchstart', onTouchStart, false);
	        scope.domElement.addEventListener('touchend', onTouchEnd, false);
	        scope.domElement.addEventListener('touchmove', onTouchMove, false);

	        window.addEventListener('keydown', onKeyDown, false);

	        // force an update at start

	        this.update();
	};

	THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);
	THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;

	Object.defineProperties(THREE.OrbitControls.prototype, {

	        center: {

	                get: function get() {

	                        console.warn('THREE.OrbitControls: .center has been renamed to .target');
	                        return this.target;
	                }

	        },

	        // backward compatibility

	        noZoom: {

	                get: function get() {

	                        console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
	                        return !this.enableZoom;
	                },

	                set: function set(value) {

	                        console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
	                        this.enableZoom = !value;
	                }

	        },

	        noRotate: {

	                get: function get() {

	                        console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
	                        return !this.enableRotate;
	                },

	                set: function set(value) {

	                        console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
	                        this.enableRotate = !value;
	                }

	        },

	        noPan: {

	                get: function get() {

	                        console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
	                        return !this.enablePan;
	                },

	                set: function set(value) {

	                        console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
	                        this.enablePan = !value;
	                }

	        },

	        noKeys: {

	                get: function get() {

	                        console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
	                        return !this.enableKeys;
	                },

	                set: function set(value) {

	                        console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
	                        this.enableKeys = !value;
	                }

	        },

	        staticMoving: {

	                get: function get() {

	                        console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
	                        return !this.enableDamping;
	                },

	                set: function set(value) {

	                        console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
	                        this.enableDamping = !value;
	                }

	        },

	        dynamicDampingFactor: {

	                get: function get() {

	                        console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
	                        return this.dampingFactor;
	                },

	                set: function set(value) {

	                        console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
	                        this.dampingFactor = value;
	                }

	        }

	});

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _threejs = __webpack_require__(23);

	var THREE = _interopRequireWildcard(_threejs);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// bug when in long distance racaster have low precision
	THREE.Raycaster.prototype.setFromCameraHP = function (coords, camera) {
			if (camera && camera.isPerspectiveCamera) {
					var tempCamera = camera.clone();
					tempCamera.position.set(0, 0, 0);
					tempCamera.updateMatrixWorld(true);
					this.ray.direction.set(coords.x, coords.y, 0.5).unproject(tempCamera).normalize();
					this.ray.origin.setFromMatrixPosition(camera.matrixWorld);
			} else if (camera && camera.isOrthographicCamera) {

					this.ray.origin.set(coords.x, coords.y, (camera.near + camera.far) / (camera.near - camera.far)).unproject(camera); // set origin in plane of camera
					this.ray.direction.set(0, 0, -1).transformDirection(camera.matrixWorld);
			} else {

					console.error('THREE.Raycaster: Unsupported camera type.');
			}
	}; // RaycasterPolyfill.js

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof2 = __webpack_require__(27);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var dat = dat || {};dat.gui = dat.gui || {};dat.utils = dat.utils || {};dat.controllers = dat.controllers || {};dat.dom = dat.dom || {};dat.color = dat.color || {};dat.utils.css = function () {
	    return { load: function load(e, a) {
	            a = a || document;var b = a.createElement("link");b.type = "text/css";b.rel = "stylesheet";b.href = e;a.getElementsByTagName("head")[0].appendChild(b);
	        }, inject: function inject(e, a) {
	            a = a || document;var b = document.createElement("style");b.type = "text/css";b.innerHTML = e;a.getElementsByTagName("head")[0].appendChild(b);
	        } };
	}();
	dat.utils.common = function () {
	    var e = Array.prototype.forEach,
	        a = Array.prototype.slice;return { BREAK: {}, extend: function extend(b) {
	            this.each(a.call(arguments, 1), function (a) {
	                for (var f in a) {
	                    this.isUndefined(a[f]) || (b[f] = a[f]);
	                }
	            }, this);return b;
	        }, defaults: function defaults(b) {
	            this.each(a.call(arguments, 1), function (a) {
	                for (var f in a) {
	                    this.isUndefined(b[f]) && (b[f] = a[f]);
	                }
	            }, this);return b;
	        }, compose: function compose() {
	            var b = a.call(arguments);return function () {
	                for (var d = a.call(arguments), f = b.length - 1; 0 <= f; f--) {
	                    d = [b[f].apply(this, d)];
	                }return d[0];
	            };
	        },
	        each: function each(a, d, f) {
	            if (e && a.forEach === e) a.forEach(d, f);else if (a.length === a.length + 0) for (var c = 0, p = a.length; c < p && !(c in a && d.call(f, a[c], c) === this.BREAK); c++) {} else for (c in a) {
	                if (d.call(f, a[c], c) === this.BREAK) break;
	            }
	        }, defer: function defer(a) {
	            setTimeout(a, 0);
	        }, toArray: function toArray(b) {
	            return b.toArray ? b.toArray() : a.call(b);
	        }, isUndefined: function isUndefined(a) {
	            return void 0 === a;
	        }, isNull: function isNull(a) {
	            return null === a;
	        }, isNaN: function isNaN(a) {
	            return a !== a;
	        }, isArray: Array.isArray || function (a) {
	            return a.constructor === Array;
	        }, isObject: function isObject(a) {
	            return a === Object(a);
	        }, isNumber: function isNumber(a) {
	            return a === a + 0;
	        }, isString: function isString(a) {
	            return a === a + "";
	        }, isBoolean: function isBoolean(a) {
	            return !1 === a || !0 === a;
	        }, isFunction: function isFunction(a) {
	            return "[object Function]" === Object.prototype.toString.call(a);
	        } };
	}();
	dat.controllers.Controller = function (e) {
	    var a = function a(_a, d) {
	        this.initialValue = _a[d];this.domElement = document.createElement("div");this.object = _a;this.property = d;this.__onFinishChange = this.__onChange = void 0;
	    };e.extend(a.prototype, { onChange: function onChange(a) {
	            this.__onChange = a;return this;
	        }, onFinishChange: function onFinishChange(a) {
	            this.__onFinishChange = a;return this;
	        }, setValue: function setValue(a) {
	            this.object[this.property] = a;this.__onChange && this.__onChange.call(this, a);this.updateDisplay();return this;
	        }, getValue: function getValue() {
	            return this.object[this.property];
	        },
	        updateDisplay: function updateDisplay() {
	            return this;
	        }, isModified: function isModified() {
	            return this.initialValue !== this.getValue();
	        } });return a;
	}(dat.utils.common);
	dat.dom.dom = function (e) {
	    function a(c) {
	        if ("0" === c || e.isUndefined(c)) return 0;c = c.match(d);return e.isNull(c) ? 0 : parseFloat(c[1]);
	    }var b = {};e.each({ HTMLEvents: ["change"], MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"], KeyboardEvents: ["keydown"] }, function (c, a) {
	        e.each(c, function (c) {
	            b[c] = a;
	        });
	    });var d = /(\d+(\.\d+)?)px/,
	        f = { makeSelectable: function makeSelectable(c, a) {
	            void 0 !== c && void 0 !== c.style && (c.onselectstart = a ? function () {
	                return !1;
	            } : function () {}, c.style.MozUserSelect = a ? "auto" : "none", c.style.KhtmlUserSelect = a ? "auto" : "none", c.unselectable = a ? "on" : "off");
	        }, makeFullscreen: function makeFullscreen(c, a, d) {
	            e.isUndefined(a) && (a = !0);e.isUndefined(d) && (d = !0);c.style.position = "absolute";a && (c.style.left = 0, c.style.right = 0);d && (c.style.top = 0, c.style.bottom = 0);
	        }, fakeEvent: function fakeEvent(c, a, d, f) {
	            d = d || {};var q = b[a];if (!q) throw Error("Event type " + a + " not supported.");var n = document.createEvent(q);switch (q) {case "MouseEvents":
	                    n.initMouseEvent(a, d.bubbles || !1, d.cancelable || !0, window, d.clickCount || 1, 0, 0, d.x || d.clientX || 0, d.y || d.clientY || 0, !1, !1, !1, !1, 0, null);break;case "KeyboardEvents":
	                    q = n.initKeyboardEvent || n.initKeyEvent;e.defaults(d, { cancelable: !0, ctrlKey: !1, altKey: !1, shiftKey: !1, metaKey: !1, keyCode: void 0, charCode: void 0 });q(a, d.bubbles || !1, d.cancelable, window, d.ctrlKey, d.altKey, d.shiftKey, d.metaKey, d.keyCode, d.charCode);break;default:
	                    n.initEvent(a, d.bubbles || !1, d.cancelable || !0);}e.defaults(n, f);c.dispatchEvent(n);
	        }, bind: function bind(c, a, d, b) {
	            c.addEventListener ? c.addEventListener(a, d, b || !1) : c.attachEvent && c.attachEvent("on" + a, d);return f;
	        },
	        unbind: function unbind(c, a, d, b) {
	            c.removeEventListener ? c.removeEventListener(a, d, b || !1) : c.detachEvent && c.detachEvent("on" + a, d);return f;
	        }, addClass: function addClass(a, d) {
	            if (void 0 === a.className) a.className = d;else if (a.className !== d) {
	                var b = a.className.split(/ +/);-1 == b.indexOf(d) && (b.push(d), a.className = b.join(" ").replace(/^\s+/, "").replace(/\s+$/, ""));
	            }return f;
	        }, removeClass: function removeClass(a, d) {
	            if (d) {
	                if (void 0 !== a.className) if (a.className === d) a.removeAttribute("class");else {
	                    var b = a.className.split(/ +/),
	                        e = b.indexOf(d);-1 != e && (b.splice(e, 1), a.className = b.join(" "));
	                }
	            } else a.className = void 0;return f;
	        }, hasClass: function hasClass(a, d) {
	            return RegExp("(?:^|\\s+)" + d + "(?:\\s+|$)").test(a.className) || !1;
	        }, getWidth: function getWidth(c) {
	            c = getComputedStyle(c);return a(c["border-left-width"]) + a(c["border-right-width"]) + a(c["padding-left"]) + a(c["padding-right"]) + a(c.width);
	        }, getHeight: function getHeight(c) {
	            c = getComputedStyle(c);return a(c["border-top-width"]) + a(c["border-bottom-width"]) + a(c["padding-top"]) + a(c["padding-bottom"]) + a(c.height);
	        }, getOffset: function getOffset(a) {
	            var d = { left: 0, top: 0 };if (a.offsetParent) {
	                do {
	                    d.left += a.offsetLeft, d.top += a.offsetTop;
	                } while (a = a.offsetParent);
	            }return d;
	        }, isActive: function isActive(a) {
	            return a === document.activeElement && (a.type || a.href);
	        } };return f;
	}(dat.utils.common);
	dat.controllers.OptionController = function (e, a, b) {
	    var d = function d(f, c, e) {
	        d.superclass.call(this, f, c);var k = this;this.__select = document.createElement("select");if (b.isArray(e)) {
	            var l = {};b.each(e, function (a) {
	                l[a] = a;
	            });e = l;
	        }b.each(e, function (a, c) {
	            var d = document.createElement("option");d.innerHTML = c;d.setAttribute("value", a);k.__select.appendChild(d);
	        });this.updateDisplay();a.bind(this.__select, "change", function () {
	            k.setValue(this.options[this.selectedIndex].value);
	        });this.domElement.appendChild(this.__select);
	    };
	    d.superclass = e;b.extend(d.prototype, e.prototype, { setValue: function setValue(a) {
	            a = d.superclass.prototype.setValue.call(this, a);this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());return a;
	        }, updateDisplay: function updateDisplay() {
	            this.__select.value = this.getValue();return d.superclass.prototype.updateDisplay.call(this);
	        } });return d;
	}(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
	dat.controllers.NumberController = function (e, a) {
	    var b = function b(d, f, c) {
	        b.superclass.call(this, d, f);c = c || {};this.__min = c.min;this.__max = c.max;this.__step = c.step;a.isUndefined(this.__step) ? this.__impliedStep = 0 == this.initialValue ? 1 : Math.pow(10, Math.floor(Math.log(this.initialValue) / Math.LN10)) / 10 : this.__impliedStep = this.__step;d = this.__impliedStep;d = d.toString();d = -1 < d.indexOf(".") ? d.length - d.indexOf(".") - 1 : 0;this.__precision = d;
	    };b.superclass = e;a.extend(b.prototype, e.prototype, { setValue: function setValue(a) {
	            void 0 !== this.__min && a < this.__min ? a = this.__min : void 0 !== this.__max && a > this.__max && (a = this.__max);void 0 !== this.__step && 0 != a % this.__step && (a = Math.round(a / this.__step) * this.__step);return b.superclass.prototype.setValue.call(this, a);
	        }, min: function min(a) {
	            this.__min = a;return this;
	        }, max: function max(a) {
	            this.__max = a;return this;
	        }, step: function step(a) {
	            this.__step = a;return this;
	        } });return b;
	}(dat.controllers.Controller, dat.utils.common);
	dat.controllers.NumberControllerBox = function (e, a, b) {
	    var d = function d(f, c, e) {
	        function k() {
	            var a = parseFloat(n.__input.value);b.isNaN(a) || n.setValue(a);
	        }function l(a) {
	            var c = r - a.clientY;n.setValue(n.getValue() + c * n.__impliedStep);r = a.clientY;
	        }function q() {
	            a.unbind(window, "mousemove", l);a.unbind(window, "mouseup", q);
	        }this.__truncationSuspended = !1;d.superclass.call(this, f, c, e);var n = this,
	            r;this.__input = document.createElement("input");this.__input.setAttribute("type", "text");a.bind(this.__input, "change", k);a.bind(this.__input, "blur", function () {
	            k();n.__onFinishChange && n.__onFinishChange.call(n, n.getValue());
	        });a.bind(this.__input, "mousedown", function (c) {
	            a.bind(window, "mousemove", l);a.bind(window, "mouseup", q);r = c.clientY;
	        });a.bind(this.__input, "keydown", function (a) {
	            13 === a.keyCode && (n.__truncationSuspended = !0, this.blur(), n.__truncationSuspended = !1);
	        });this.updateDisplay();this.domElement.appendChild(this.__input);
	    };d.superclass = e;b.extend(d.prototype, e.prototype, { updateDisplay: function updateDisplay() {
	            var a = this.__input,
	                c;if (this.__truncationSuspended) c = this.getValue();else {
	                c = this.getValue();var b = Math.pow(10, this.__precision);c = Math.round(c * b) / b;
	            }a.value = c;return d.superclass.prototype.updateDisplay.call(this);
	        } });return d;
	}(dat.controllers.NumberController, dat.dom.dom, dat.utils.common);
	dat.controllers.NumberControllerSlider = function (e, a, b, d, f) {
	    function c(a, c, d, b, f) {
	        return b + (a - c) / (d - c) * (f - b);
	    }var p = function p(d, b, f, e, r) {
	        function y(d) {
	            d.preventDefault();var b = a.getOffset(h.__background),
	                f = a.getWidth(h.__background);h.setValue(c(d.clientX, b.left, b.left + f, h.__min, h.__max));return !1;
	        }function g() {
	            a.unbind(window, "mousemove", y);a.unbind(window, "mouseup", g);h.__onFinishChange && h.__onFinishChange.call(h, h.getValue());
	        }p.superclass.call(this, d, b, { min: f, max: e, step: r });var h = this;this.__background = document.createElement("div");this.__foreground = document.createElement("div");a.bind(this.__background, "mousedown", function (c) {
	            a.bind(window, "mousemove", y);a.bind(window, "mouseup", g);y(c);
	        });a.addClass(this.__background, "slider");a.addClass(this.__foreground, "slider-fg");this.updateDisplay();this.__background.appendChild(this.__foreground);this.domElement.appendChild(this.__background);
	    };p.superclass = e;p.useDefaultStyles = function () {
	        b.inject(f);
	    };d.extend(p.prototype, e.prototype, { updateDisplay: function updateDisplay() {
	            var a = (this.getValue() - this.__min) / (this.__max - this.__min);this.__foreground.style.width = 100 * a + "%";return p.superclass.prototype.updateDisplay.call(this);
	        } });return p;
	}(dat.controllers.NumberController, dat.dom.dom, dat.utils.css, dat.utils.common, "/**\n * dat-gui JavaScript Controller Library\n * http://code.google.com/p/dat-gui\n *\n * Copyright 2011 Data Arts Team, Google Creative Lab\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n */\n\n.slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}");
	dat.controllers.FunctionController = function (e, a, b) {
	    var d = function d(b, c, e) {
	        d.superclass.call(this, b, c);var k = this;this.__button = document.createElement("div");this.__button.innerHTML = void 0 === e ? "Fire" : e;a.bind(this.__button, "click", function (a) {
	            a.preventDefault();k.fire();return !1;
	        });a.addClass(this.__button, "button");this.domElement.appendChild(this.__button);
	    };d.superclass = e;b.extend(d.prototype, e.prototype, { fire: function fire() {
	            this.__onChange && this.__onChange.call(this);this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());this.getValue().call(this.object);
	        } });return d;
	}(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
	dat.controllers.BooleanController = function (e, a, b) {
	    var d = function d(b, c) {
	        d.superclass.call(this, b, c);var e = this;this.__prev = this.getValue();this.__checkbox = document.createElement("input");this.__checkbox.setAttribute("type", "checkbox");a.bind(this.__checkbox, "change", function () {
	            e.setValue(!e.__prev);
	        }, !1);this.domElement.appendChild(this.__checkbox);this.updateDisplay();
	    };d.superclass = e;b.extend(d.prototype, e.prototype, { setValue: function setValue(a) {
	            a = d.superclass.prototype.setValue.call(this, a);this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());this.__prev = this.getValue();return a;
	        }, updateDisplay: function updateDisplay() {
	            !0 === this.getValue() ? (this.__checkbox.setAttribute("checked", "checked"), this.__checkbox.checked = !0) : this.__checkbox.checked = !1;return d.superclass.prototype.updateDisplay.call(this);
	        } });return d;
	}(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
	dat.color.toString = function (e) {
	    return function (a) {
	        if (1 == a.a || e.isUndefined(a.a)) {
	            for (a = a.hex.toString(16); 6 > a.length;) {
	                a = "0" + a;
	            }return "#" + a;
	        }return "rgba(" + Math.round(a.r) + "," + Math.round(a.g) + "," + Math.round(a.b) + "," + a.a + ")";
	    };
	}(dat.utils.common);
	dat.color.interpret = function (e, a) {
	    var b,
	        d,
	        f = [{ litmus: a.isString, conversions: { THREE_CHAR_HEX: { read: function read(a) {
	                    a = a.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return null === a ? !1 : { space: "HEX", hex: parseInt("0x" + a[1].toString() + a[1].toString() + a[2].toString() + a[2].toString() + a[3].toString() + a[3].toString()) };
	                }, write: e }, SIX_CHAR_HEX: { read: function read(a) {
	                    a = a.match(/^#([A-F0-9]{6})$/i);return null === a ? !1 : { space: "HEX", hex: parseInt("0x" + a[1].toString()) };
	                }, write: e }, CSS_RGB: { read: function read(a) {
	                    a = a.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
	                    return null === a ? !1 : { space: "RGB", r: parseFloat(a[1]), g: parseFloat(a[2]), b: parseFloat(a[3]) };
	                }, write: e }, CSS_RGBA: { read: function read(a) {
	                    a = a.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);return null === a ? !1 : { space: "RGB", r: parseFloat(a[1]), g: parseFloat(a[2]), b: parseFloat(a[3]), a: parseFloat(a[4]) };
	                }, write: e } } }, { litmus: a.isNumber, conversions: { HEX: { read: function read(a) {
	                    return { space: "HEX", hex: a, conversionName: "HEX" };
	                }, write: function write(a) {
	                    return a.hex;
	                } } } }, { litmus: a.isArray, conversions: { RGB_ARRAY: { read: function read(a) {
	                    return 3 != a.length ? !1 : { space: "RGB", r: a[0], g: a[1], b: a[2] };
	                }, write: function write(a) {
	                    return [a.r, a.g, a.b];
	                } }, RGBA_ARRAY: { read: function read(a) {
	                    return 4 != a.length ? !1 : { space: "RGB", r: a[0], g: a[1], b: a[2], a: a[3] };
	                }, write: function write(a) {
	                    return [a.r, a.g, a.b, a.a];
	                } } } }, { litmus: a.isObject, conversions: { RGBA_OBJ: { read: function read(c) {
	                    return a.isNumber(c.r) && a.isNumber(c.g) && a.isNumber(c.b) && a.isNumber(c.a) ? { space: "RGB", r: c.r, g: c.g, b: c.b, a: c.a } : !1;
	                }, write: function write(a) {
	                    return { r: a.r, g: a.g, b: a.b, a: a.a };
	                } }, RGB_OBJ: { read: function read(c) {
	                    return a.isNumber(c.r) && a.isNumber(c.g) && a.isNumber(c.b) ? { space: "RGB", r: c.r, g: c.g, b: c.b } : !1;
	                }, write: function write(a) {
	                    return { r: a.r, g: a.g, b: a.b };
	                } }, HSVA_OBJ: { read: function read(c) {
	                    return a.isNumber(c.h) && a.isNumber(c.s) && a.isNumber(c.v) && a.isNumber(c.a) ? { space: "HSV", h: c.h, s: c.s, v: c.v, a: c.a } : !1;
	                }, write: function write(a) {
	                    return { h: a.h, s: a.s, v: a.v, a: a.a };
	                } }, HSV_OBJ: { read: function read(d) {
	                    return a.isNumber(d.h) && a.isNumber(d.s) && a.isNumber(d.v) ? { space: "HSV", h: d.h, s: d.s, v: d.v } : !1;
	                }, write: function write(a) {
	                    return { h: a.h, s: a.s, v: a.v };
	                } } } }];return function () {
	        d = !1;
	        var c = 1 < arguments.length ? a.toArray(arguments) : arguments[0];a.each(f, function (e) {
	            if (e.litmus(c)) return a.each(e.conversions, function (e, f) {
	                b = e.read(c);if (!1 === d && !1 !== b) return d = b, b.conversionName = f, b.conversion = e, a.BREAK;
	            }), a.BREAK;
	        });return d;
	    };
	}(dat.color.toString, dat.utils.common);
	dat.GUI = dat.gui.GUI = function (e, a, b, d, f, c, p, k, l, q, n, r, y, g, h) {
	    function t(a, c, b, e) {
	        if (void 0 === c[b]) throw Error("Object " + c + ' has no property "' + b + '"');e.color ? c = new n(c, b) : (c = [c, b].concat(e.factoryArgs), c = d.apply(a, c));e.before instanceof f && (e.before = e.before.__li);v(a, c);g.addClass(c.domElement, "c");b = document.createElement("span");g.addClass(b, "property-name");b.innerHTML = c.property;var q = document.createElement("div");q.appendChild(b);q.appendChild(c.domElement);e = u(a, q, e.before);g.addClass(e, m.CLASS_CONTROLLER_ROW);
	        g.addClass(e, (0, _typeof3.default)(c.getValue()));s(a, e, c);a.__controllers.push(c);return c;
	    }function u(a, d, c) {
	        var b = document.createElement("li");d && b.appendChild(d);c ? a.__ul.insertBefore(b, params.before) : a.__ul.appendChild(b);a.onResize();return b;
	    }function s(a, d, b) {
	        b.__li = d;b.__gui = a;h.extend(b, { options: function options(d) {
	                if (1 < arguments.length) return b.remove(), t(a, b.object, b.property, { before: b.__li.nextElementSibling, factoryArgs: [h.toArray(arguments)] });if (h.isArray(d) || h.isObject(d)) return b.remove(), t(a, b.object, b.property, { before: b.__li.nextElementSibling, factoryArgs: [d] });
	            }, name: function name(a) {
	                b.__li.firstElementChild.firstElementChild.innerHTML = a;return b;
	            }, listen: function listen() {
	                b.__gui.listen(b);return b;
	            }, remove: function remove() {
	                b.__gui.remove(b);return b;
	            } });if (b instanceof l) {
	            var e = new k(b.object, b.property, { min: b.__min, max: b.__max, step: b.__step });h.each(["updateDisplay", "onChange", "onFinishChange"], function (a) {
	                var d = b[a],
	                    J = e[a];b[a] = e[a] = function () {
	                    var a = Array.prototype.slice.call(arguments);d.apply(b, a);return J.apply(e, a);
	                };
	            });
	            g.addClass(d, "has-slider");b.domElement.insertBefore(e.domElement, b.domElement.firstElementChild);
	        } else if (b instanceof k) {
	            var f = function f(d) {
	                return h.isNumber(b.__min) && h.isNumber(b.__max) ? (b.remove(), t(a, b.object, b.property, { before: b.__li.nextElementSibling, factoryArgs: [b.__min, b.__max, b.__step] })) : d;
	            };b.min = h.compose(f, b.min);b.max = h.compose(f, b.max);
	        } else b instanceof c ? (g.bind(d, "click", function () {
	            g.fakeEvent(b.__checkbox, "click");
	        }), g.bind(b.__checkbox, "click", function (a) {
	            a.stopPropagation();
	        })) : b instanceof p ? (g.bind(d, "click", function () {
	            g.fakeEvent(b.__button, "click");
	        }), g.bind(d, "mouseover", function () {
	            g.addClass(b.__button, "hover");
	        }), g.bind(d, "mouseout", function () {
	            g.removeClass(b.__button, "hover");
	        })) : b instanceof n && (g.addClass(d, "color"), b.updateDisplay = h.compose(function (a) {
	            d.style.borderLeftColor = b.__color.toString();return a;
	        }, b.updateDisplay), b.updateDisplay());b.setValue = h.compose(function (d) {
	            a.getRoot().__preset_select && b.isModified() && D(a.getRoot(), !0);return d;
	        }, b.setValue);
	    }function v(a, d) {
	        var b = a.getRoot(),
	            c = b.__rememberedObjects.indexOf(d.object);if (-1 != c) {
	            var e = b.__rememberedObjectIndecesToControllers[c];void 0 === e && (e = {}, b.__rememberedObjectIndecesToControllers[c] = e);e[d.property] = d;if (b.load && b.load.remembered) {
	                b = b.load.remembered;if (b[a.preset]) b = b[a.preset];else if (b[z]) b = b[z];else return;b[c] && void 0 !== b[c][d.property] && (c = b[c][d.property], d.initialValue = c, d.setValue(c));
	            }
	        }
	    }function K(a) {
	        var b = a.__save_row = document.createElement("li");g.addClass(a.domElement, "has-save");a.__ul.insertBefore(b, a.__ul.firstChild);g.addClass(b, "save-row");var d = document.createElement("span");d.innerHTML = "&nbsp;";g.addClass(d, "button gears");var c = document.createElement("span");c.innerHTML = "Save";g.addClass(c, "button");g.addClass(c, "save");var e = document.createElement("span");e.innerHTML = "New";g.addClass(e, "button");g.addClass(e, "save-as");var f = document.createElement("span");f.innerHTML = "Revert";g.addClass(f, "button");g.addClass(f, "revert");var q = a.__preset_select = document.createElement("select");a.load && a.load.remembered ? h.each(a.load.remembered, function (b, d) {
	            E(a, d, d == a.preset);
	        }) : E(a, z, !1);g.bind(q, "change", function () {
	            for (var b = 0; b < a.__preset_select.length; b++) {
	                a.__preset_select[b].innerHTML = a.__preset_select[b].value;
	            }a.preset = this.value;
	        });b.appendChild(q);b.appendChild(d);b.appendChild(c);b.appendChild(e);b.appendChild(f);if (w) {
	            var b = document.getElementById("dg-save-locally"),
	                n = document.getElementById("dg-local-explain");b.style.display = "block";b = document.getElementById("dg-local-storage");"true" === localStorage.getItem(document.location.href + ".isLocal") && b.setAttribute("checked", "checked");var k = function k() {
	                n.style.display = a.useLocalStorage ? "block" : "none";
	            };k();g.bind(b, "change", function () {
	                a.useLocalStorage = !a.useLocalStorage;k();
	            });
	        }var r = document.getElementById("dg-new-constructor");g.bind(r, "keydown", function (a) {
	            !a.metaKey || 67 !== a.which && 67 != a.keyCode || A.hide();
	        });g.bind(d, "click", function () {
	            r.innerHTML = JSON.stringify(a.getSaveObject(), void 0, 2);A.show();r.focus();r.select();
	        });g.bind(c, "click", function () {
	            a.save();
	        });g.bind(e, "click", function () {
	            var b = prompt("Enter a new preset name.");b && a.saveAs(b);
	        });g.bind(f, "click", function () {
	            a.revert();
	        });
	    }function L(a) {
	        function b(f) {
	            f.preventDefault();e = f.clientX;g.addClass(a.__closeButton, m.CLASS_DRAG);g.bind(window, "mousemove", d);g.bind(window, "mouseup", c);return !1;
	        }function d(b) {
	            b.preventDefault();a.width += e - b.clientX;a.onResize();e = b.clientX;return !1;
	        }function c() {
	            g.removeClass(a.__closeButton, m.CLASS_DRAG);g.unbind(window, "mousemove", d);g.unbind(window, "mouseup", c);
	        }a.__resize_handle = document.createElement("div");h.extend(a.__resize_handle.style, { width: "6px", marginLeft: "-3px", height: "200px", cursor: "ew-resize", position: "absolute" });var e;g.bind(a.__resize_handle, "mousedown", b);g.bind(a.__closeButton, "mousedown", b);a.domElement.insertBefore(a.__resize_handle, a.domElement.firstElementChild);
	    }function F(a, b) {
	        a.domElement.style.width = b + "px";a.__save_row && a.autoPlace && (a.__save_row.style.width = b + "px");a.__closeButton && (a.__closeButton.style.width = b + "px");
	    }
	    function B(a, b) {
	        var d = {};h.each(a.__rememberedObjects, function (c, e) {
	            var f = {};h.each(a.__rememberedObjectIndecesToControllers[e], function (a, d) {
	                f[d] = b ? a.initialValue : a.getValue();
	            });d[e] = f;
	        });return d;
	    }function E(a, b, d) {
	        var c = document.createElement("option");c.innerHTML = b;c.value = b;a.__preset_select.appendChild(c);d && (a.__preset_select.selectedIndex = a.__preset_select.length - 1);
	    }function D(a, b) {
	        var d = a.__preset_select[a.__preset_select.selectedIndex];d.innerHTML = b ? d.value + "*" : d.value;
	    }function G(a) {
	        0 != a.length && r(function () {
	            G(a);
	        });h.each(a, function (a) {
	            a.updateDisplay();
	        });
	    }e.inject(b);var z = "Default",
	        w;try {
	        w = "localStorage" in window && null !== window.localStorage;
	    } catch (M) {
	        w = !1;
	    }var A,
	        H = !0,
	        x,
	        C = !1,
	        I = [],
	        m = function m(a) {
	        function b() {
	            localStorage.setItem(document.location.href + ".gui", JSON.stringify(c.getSaveObject()));
	        }function d() {
	            var a = c.getRoot();a.width += 1;h.defer(function () {
	                a.width -= 1;
	            });
	        }var c = this;this.domElement = document.createElement("div");this.__ul = document.createElement("ul");this.domElement.appendChild(this.__ul);
	        g.addClass(this.domElement, "dg");this.__folders = {};this.__controllers = [];this.__rememberedObjects = [];this.__rememberedObjectIndecesToControllers = [];this.__listening = [];a = a || {};a = h.defaults(a, { autoPlace: !0, width: m.DEFAULT_WIDTH });a = h.defaults(a, { resizable: a.autoPlace, hideable: a.autoPlace });h.isUndefined(a.load) ? a.load = { preset: z } : a.preset && (a.load.preset = a.preset);h.isUndefined(a.parent) && a.hideable && I.push(this);a.resizable = h.isUndefined(a.parent) && a.resizable;a.autoPlace && h.isUndefined(a.scrollable) && (a.scrollable = !0);var e = w && "true" === localStorage.getItem(document.location.href + ".isLocal");Object.defineProperties(this, { parent: { get: function get() {
	                    return a.parent;
	                } }, scrollable: { get: function get() {
	                    return a.scrollable;
	                } }, autoPlace: { get: function get() {
	                    return a.autoPlace;
	                } }, preset: { get: function get() {
	                    return c.parent ? c.getRoot().preset : a.load.preset;
	                }, set: function set(b) {
	                    c.parent ? c.getRoot().preset = b : a.load.preset = b;for (b = 0; b < this.__preset_select.length; b++) {
	                        this.__preset_select[b].value == this.preset && (this.__preset_select.selectedIndex = b);
	                    }c.revert();
	                } }, width: { get: function get() {
	                    return a.width;
	                }, set: function set(b) {
	                    a.width = b;F(c, b);
	                } }, name: { get: function get() {
	                    return a.name;
	                }, set: function set(b) {
	                    a.name = b;q && (q.innerHTML = a.name);
	                } }, closed: { get: function get() {
	                    return a.closed;
	                }, set: function set(b) {
	                    a.closed = b;a.closed ? g.addClass(c.__ul, m.CLASS_CLOSED) : g.removeClass(c.__ul, m.CLASS_CLOSED);this.onResize();c.__closeButton && (c.__closeButton.innerHTML = b ? m.TEXT_OPEN : m.TEXT_CLOSED);
	                } }, load: { get: function get() {
	                    return a.load;
	                } }, useLocalStorage: { get: function get() {
	                    return e;
	                }, set: function set(a) {
	                    w && ((e = a) ? g.bind(window, "unload", b) : g.unbind(window, "unload", b), localStorage.setItem(document.location.href + ".isLocal", a));
	                } } });if (h.isUndefined(a.parent)) {
	            a.closed = !1;g.addClass(this.domElement, m.CLASS_MAIN);g.makeSelectable(this.domElement, !1);if (w && e) {
	                c.useLocalStorage = !0;var f = localStorage.getItem(document.location.href + ".gui");f && (a.load = JSON.parse(f));
	            }this.__closeButton = document.createElement("div");this.__closeButton.innerHTML = m.TEXT_CLOSED;g.addClass(this.__closeButton, m.CLASS_CLOSE_BUTTON);this.domElement.appendChild(this.__closeButton);
	            g.bind(this.__closeButton, "click", function () {
	                c.closed = !c.closed;
	            });
	        } else {
	            void 0 === a.closed && (a.closed = !0);var q = document.createTextNode(a.name);g.addClass(q, "controller-name");f = u(c, q);g.addClass(this.__ul, m.CLASS_CLOSED);g.addClass(f, "title");g.bind(f, "click", function (a) {
	                a.preventDefault();c.closed = !c.closed;return !1;
	            });a.closed || (this.closed = !1);
	        }a.autoPlace && (h.isUndefined(a.parent) && (H && (x = document.createElement("div"), g.addClass(x, "dg"), g.addClass(x, m.CLASS_AUTO_PLACE_CONTAINER), document.body.appendChild(x), H = !1), x.appendChild(this.domElement), g.addClass(this.domElement, m.CLASS_AUTO_PLACE)), this.parent || F(c, a.width));g.bind(window, "resize", function () {
	            c.onResize();
	        });g.bind(this.__ul, "webkitTransitionEnd", function () {
	            c.onResize();
	        });g.bind(this.__ul, "transitionend", function () {
	            c.onResize();
	        });g.bind(this.__ul, "oTransitionEnd", function () {
	            c.onResize();
	        });this.onResize();a.resizable && L(this);c.getRoot();a.parent || d();
	    };m.toggleHide = function () {
	        C = !C;h.each(I, function (a) {
	            a.domElement.style.zIndex = C ? -999 : 999;a.domElement.style.opacity = C ? 0 : 1;
	        });
	    };m.CLASS_AUTO_PLACE = "a";m.CLASS_AUTO_PLACE_CONTAINER = "ac";m.CLASS_MAIN = "main";m.CLASS_CONTROLLER_ROW = "cr";m.CLASS_TOO_TALL = "taller-than-window";m.CLASS_CLOSED = "closed";m.CLASS_CLOSE_BUTTON = "close-button";m.CLASS_DRAG = "drag";m.DEFAULT_WIDTH = 245;m.TEXT_CLOSED = "Close Controls";m.TEXT_OPEN = "Open Controls";g.bind(window, "keydown", function (a) {
	        "text" === document.activeElement.type || 72 !== a.which && 72 != a.keyCode || m.toggleHide();
	    }, !1);h.extend(m.prototype, { add: function add(a, b) {
	            return t(this, a, b, { factoryArgs: Array.prototype.slice.call(arguments, 2) });
	        }, addColor: function addColor(a, b) {
	            return t(this, a, b, { color: !0 });
	        }, remove: function remove(a) {
	            this.__ul.removeChild(a.__li);this.__controllers.slice(this.__controllers.indexOf(a), 1);var b = this;h.defer(function () {
	                b.onResize();
	            });
	        }, destroy: function destroy() {
	            this.autoPlace && x.removeChild(this.domElement);
	        }, addFolder: function addFolder(a) {
	            if (void 0 !== this.__folders[a]) throw Error('You already have a folder in this GUI by the name "' + a + '"');var b = { name: a, parent: this };b.autoPlace = this.autoPlace;this.load && this.load.folders && this.load.folders[a] && (b.closed = this.load.folders[a].closed, b.load = this.load.folders[a]);b = new m(b);this.__folders[a] = b;a = u(this, b.domElement);g.addClass(a, "folder");return b;
	        }, open: function open() {
	            this.closed = !1;
	        }, close: function close() {
	            this.closed = !0;
	        }, onResize: function onResize() {
	            var a = this.getRoot();if (a.scrollable) {
	                var b = g.getOffset(a.__ul).top,
	                    d = 0;h.each(a.__ul.childNodes, function (b) {
	                    a.autoPlace && b === a.__save_row || (d += g.getHeight(b));
	                });window.innerHeight - b - 20 < d ? (g.addClass(a.domElement, m.CLASS_TOO_TALL), a.__ul.style.height = window.innerHeight - b - 20 + "px") : (g.removeClass(a.domElement, m.CLASS_TOO_TALL), a.__ul.style.height = "auto");
	            }a.__resize_handle && h.defer(function () {
	                a.__resize_handle.style.height = a.__ul.offsetHeight + "px";
	            });a.__closeButton && (a.__closeButton.style.width = a.width + "px");
	        }, remember: function remember() {
	            h.isUndefined(A) && (A = new y(), A.domElement.innerHTML = a);if (this.parent) throw Error("You can only call remember on a top level GUI.");var b = this;h.each(Array.prototype.slice.call(arguments), function (a) {
	                0 == b.__rememberedObjects.length && K(b);-1 == b.__rememberedObjects.indexOf(a) && b.__rememberedObjects.push(a);
	            });this.autoPlace && F(this, this.width);
	        }, getRoot: function getRoot() {
	            for (var a = this; a.parent;) {
	                a = a.parent;
	            }return a;
	        }, getSaveObject: function getSaveObject() {
	            var a = this.load;a.closed = this.closed;0 < this.__rememberedObjects.length && (a.preset = this.preset, a.remembered || (a.remembered = {}), a.remembered[this.preset] = B(this));a.folders = {};h.each(this.__folders, function (b, d) {
	                a.folders[d] = b.getSaveObject();
	            });return a;
	        }, save: function save() {
	            this.load.remembered || (this.load.remembered = {});this.load.remembered[this.preset] = B(this);D(this, !1);
	        }, saveAs: function saveAs(a) {
	            this.load.remembered || (this.load.remembered = {}, this.load.remembered[z] = B(this, !0));this.load.remembered[a] = B(this);this.preset = a;E(this, a, !0);
	        }, revert: function revert(a) {
	            h.each(this.__controllers, function (b) {
	                this.getRoot().load.remembered ? v(a || this.getRoot(), b) : b.setValue(b.initialValue);
	            }, this);h.each(this.__folders, function (a) {
	                a.revert(a);
	            });a || D(this.getRoot(), !1);
	        }, listen: function listen(a) {
	            var b = 0 == this.__listening.length;this.__listening.push(a);
	            b && G(this.__listening);
	        } });return m;
	}(dat.utils.css, '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>', ".dg {\n  /** Clear list styles */\n  /* Auto-place container */\n  /* Auto-placed GUI's */\n  /* Line items that don't contain folders. */\n  /** Folder names */\n  /** Hides closed items */\n  /** Controller row */\n  /** Name-half (left) */\n  /** Controller-half (right) */\n  /** Controller placement */\n  /** Shorter number boxes when slider is present. */\n  /** Ensure the entire boolean and function row shows a hand */ }\n  .dg ul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    clear: both; }\n  .dg.ac {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 0;\n    z-index: 0; }\n  .dg:not(.ac) .main {\n    /** Exclude mains in ac so that we don't hide close button */\n    overflow: hidden; }\n  .dg.main {\n    -webkit-transition: opacity 0.1s linear;\n    -o-transition: opacity 0.1s linear;\n    -moz-transition: opacity 0.1s linear;\n    transition: opacity 0.1s linear; }\n    .dg.main.taller-than-window {\n      overflow-y: auto; }\n      .dg.main.taller-than-window .close-button {\n        opacity: 1;\n        /* TODO, these are style notes */\n        margin-top: -1px;\n        border-top: 1px solid #2c2c2c; }\n    .dg.main ul.closed .close-button {\n      opacity: 1 !important; }\n    .dg.main:hover .close-button,\n    .dg.main .close-button.drag {\n      opacity: 1; }\n    .dg.main .close-button {\n      /*opacity: 0;*/\n      -webkit-transition: opacity 0.1s linear;\n      -o-transition: opacity 0.1s linear;\n      -moz-transition: opacity 0.1s linear;\n      transition: opacity 0.1s linear;\n      border: 0;\n      position: absolute;\n      line-height: 19px;\n      height: 20px;\n      /* TODO, these are style notes */\n      cursor: pointer;\n      text-align: center;\n      background-color: #000; }\n      .dg.main .close-button:hover {\n        background-color: #111; }\n  .dg.a {\n    float: right;\n    margin-right: 15px;\n    overflow-x: hidden; }\n    .dg.a.has-save > ul {\n      margin-top: 27px; }\n      .dg.a.has-save > ul.closed {\n        margin-top: 0; }\n    .dg.a .save-row {\n      position: fixed;\n      top: 0;\n      z-index: 1002; }\n  .dg li {\n    -webkit-transition: height 0.1s ease-out;\n    -o-transition: height 0.1s ease-out;\n    -moz-transition: height 0.1s ease-out;\n    transition: height 0.1s ease-out; }\n  .dg li:not(.folder) {\n    cursor: auto;\n    height: 27px;\n    line-height: 27px;\n    overflow: hidden;\n    padding: 0 4px 0 5px; }\n  .dg li.folder {\n    padding: 0;\n    border-left: 4px solid rgba(0, 0, 0, 0); }\n  .dg li.title {\n    cursor: pointer;\n    margin-left: -4px; }\n  .dg .closed li:not(.title),\n  .dg .closed ul li,\n  .dg .closed ul li > * {\n    height: 0;\n    overflow: hidden;\n    border: 0; }\n  .dg .cr {\n    clear: both;\n    padding-left: 3px;\n    height: 27px; }\n  .dg .property-name {\n    cursor: default;\n    float: left;\n    clear: left;\n    width: 40%;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .dg .c {\n    float: left;\n    width: 60%; }\n  .dg .c input[type=text] {\n    border: 0;\n    margin-top: 4px;\n    padding: 3px;\n    width: 100%;\n    float: right; }\n  .dg .has-slider input[type=text] {\n    width: 30%;\n    /*display: none;*/\n    margin-left: 0; }\n  .dg .slider {\n    float: left;\n    width: 66%;\n    margin-left: -5px;\n    margin-right: 0;\n    height: 19px;\n    margin-top: 4px; }\n  .dg .slider-fg {\n    height: 100%; }\n  .dg .c input[type=checkbox] {\n    margin-top: 9px; }\n  .dg .c select {\n    margin-top: 5px; }\n  .dg .cr.function,\n  .dg .cr.function .property-name,\n  .dg .cr.function *,\n  .dg .cr.boolean,\n  .dg .cr.boolean * {\n    cursor: pointer; }\n  .dg .selector {\n    display: none;\n    position: absolute;\n    margin-left: -9px;\n    margin-top: 23px;\n    z-index: 10; }\n  .dg .c:hover .selector,\n  .dg .selector.drag {\n    display: block; }\n  .dg li.save-row {\n    padding: 0; }\n    .dg li.save-row .button {\n      display: inline-block;\n      padding: 0px 6px; }\n  .dg.dialogue {\n    background-color: #222;\n    width: 460px;\n    padding: 15px;\n    font-size: 13px;\n    line-height: 15px; }\n\n/* TODO Separate style and structure */\n#dg-new-constructor {\n  padding: 10px;\n  color: #222;\n  font-family: Monaco, monospace;\n  font-size: 10px;\n  border: 0;\n  resize: none;\n  box-shadow: inset 1px 1px 1px #888;\n  word-wrap: break-word;\n  margin: 12px 0;\n  display: block;\n  width: 440px;\n  overflow-y: scroll;\n  height: 100px;\n  position: relative; }\n\n#dg-local-explain {\n  display: none;\n  font-size: 11px;\n  line-height: 17px;\n  border-radius: 3px;\n  background-color: #333;\n  padding: 8px;\n  margin-top: 10px; }\n  #dg-local-explain code {\n    font-size: 10px; }\n\n#dat-gui-save-locally {\n  display: none; }\n\n/** Main type */\n.dg {\n  color: #eee;\n  font: 11px 'Lucida Grande', sans-serif;\n  text-shadow: 0 -1px 0 #111;\n  /** Auto place */\n  /* Controller row, <li> */\n  /** Controllers */ }\n  .dg.main {\n    /** Scrollbar */ }\n    .dg.main::-webkit-scrollbar {\n      width: 5px;\n      background: #1a1a1a; }\n    .dg.main::-webkit-scrollbar-corner {\n      height: 0;\n      display: none; }\n    .dg.main::-webkit-scrollbar-thumb {\n      border-radius: 5px;\n      background: #676767; }\n  .dg li:not(.folder) {\n    background: #1a1a1a;\n    border-bottom: 1px solid #2c2c2c; }\n  .dg li.save-row {\n    line-height: 25px;\n    background: #dad5cb;\n    border: 0; }\n    .dg li.save-row select {\n      margin-left: 5px;\n      width: 108px; }\n    .dg li.save-row .button {\n      margin-left: 5px;\n      margin-top: 1px;\n      border-radius: 2px;\n      font-size: 9px;\n      line-height: 7px;\n      padding: 4px 4px 5px 4px;\n      background: #c5bdad;\n      color: #fff;\n      text-shadow: 0 1px 0 #b0a58f;\n      box-shadow: 0 -1px 0 #b0a58f;\n      cursor: pointer; }\n      .dg li.save-row .button.gears {\n        background: #c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;\n        height: 7px;\n        width: 8px; }\n      .dg li.save-row .button:hover {\n        background-color: #bab19e;\n        box-shadow: 0 -1px 0 #b0a58f; }\n  .dg li.folder {\n    border-bottom: 0; }\n  .dg li.title {\n    padding-left: 16px;\n    background: black url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;\n    cursor: pointer;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.2); }\n  .dg .closed li.title {\n    background-image: url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==); }\n  .dg .cr.boolean {\n    border-left: 3px solid #806787; }\n  .dg .cr.function {\n    border-left: 3px solid #e61d5f; }\n  .dg .cr.number {\n    border-left: 3px solid #2fa1d6; }\n    .dg .cr.number input[type=text] {\n      color: #2fa1d6; }\n  .dg .cr.string {\n    border-left: 3px solid #1ed36f; }\n    .dg .cr.string input[type=text] {\n      color: #1ed36f; }\n  .dg .cr.function:hover, .dg .cr.boolean:hover {\n    background: #111; }\n  .dg .c input[type=text] {\n    background: #303030;\n    outline: none; }\n    .dg .c input[type=text]:hover {\n      background: #3c3c3c; }\n    .dg .c input[type=text]:focus {\n      background: #494949;\n      color: #fff; }\n  .dg .c .slider {\n    background: #303030;\n    cursor: ew-resize; }\n  .dg .c .slider-fg {\n    background: #2fa1d6; }\n  .dg .c .slider:hover {\n    background: #3c3c3c; }\n    .dg .c .slider:hover .slider-fg {\n      background: #44abda; }\n", dat.controllers.factory = function (e, a, b, d, f, c, p) {
	    return function (k, l, q, n) {
	        var r = k[l];if (p.isArray(q) || p.isObject(q)) return new e(k, l, q);if (p.isNumber(r)) return p.isNumber(q) && p.isNumber(n) ? new b(k, l, q, n) : new a(k, l, { min: q, max: n });if (p.isString(r)) return new d(k, l);if (p.isFunction(r)) return new f(k, l, "");if (p.isBoolean(r)) return new c(k, l);
	    };
	}(dat.controllers.OptionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.StringController = function (e, a, b) {
	    var d = function d(b, c) {
	        function e() {
	            k.setValue(k.__input.value);
	        }d.superclass.call(this, b, c);var k = this;this.__input = document.createElement("input");this.__input.setAttribute("type", "text");a.bind(this.__input, "keyup", e);a.bind(this.__input, "change", e);a.bind(this.__input, "blur", function () {
	            k.__onFinishChange && k.__onFinishChange.call(k, k.getValue());
	        });a.bind(this.__input, "keydown", function (a) {
	            13 === a.keyCode && this.blur();
	        });this.updateDisplay();this.domElement.appendChild(this.__input);
	    };d.superclass = e;b.extend(d.prototype, e.prototype, { updateDisplay: function updateDisplay() {
	            a.isActive(this.__input) || (this.__input.value = this.getValue());return d.superclass.prototype.updateDisplay.call(this);
	        } });return d;
	}(dat.controllers.Controller, dat.dom.dom, dat.utils.common), dat.controllers.FunctionController, dat.controllers.BooleanController, dat.utils.common), dat.controllers.Controller, dat.controllers.BooleanController, dat.controllers.FunctionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.OptionController, dat.controllers.ColorController = function (e, a, b, d, f) {
	    function c(a, b, d, c) {
	        a.style.background = "";f.each(l, function (e) {
	            a.style.cssText += "background: " + e + "linear-gradient(" + b + ", " + d + " 0%, " + c + " 100%); ";
	        });
	    }function p(a) {
	        a.style.background = "";a.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);";a.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
	        a.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";a.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";a.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
	    }var k = function k(e, n) {
	        function r(b) {
	            t(b);a.bind(window, "mousemove", t);a.bind(window, "mouseup", l);
	        }function l() {
	            a.unbind(window, "mousemove", t);a.unbind(window, "mouseup", l);
	        }function g() {
	            var a = d(this.value);!1 !== a ? (s.__color.__state = a, s.setValue(s.__color.toOriginal())) : this.value = s.__color.toString();
	        }function h() {
	            a.unbind(window, "mousemove", u);a.unbind(window, "mouseup", h);
	        }function t(b) {
	            b.preventDefault();var d = a.getWidth(s.__saturation_field),
	                c = a.getOffset(s.__saturation_field),
	                e = (b.clientX - c.left + document.body.scrollLeft) / d;b = 1 - (b.clientY - c.top + document.body.scrollTop) / d;1 < b ? b = 1 : 0 > b && (b = 0);1 < e ? e = 1 : 0 > e && (e = 0);s.__color.v = b;s.__color.s = e;s.setValue(s.__color.toOriginal());return !1;
	        }function u(b) {
	            b.preventDefault();var d = a.getHeight(s.__hue_field),
	                c = a.getOffset(s.__hue_field);b = 1 - (b.clientY - c.top + document.body.scrollTop) / d;1 < b ? b = 1 : 0 > b && (b = 0);s.__color.h = 360 * b;s.setValue(s.__color.toOriginal());return !1;
	        }k.superclass.call(this, e, n);this.__color = new b(this.getValue());this.__temp = new b(0);var s = this;this.domElement = document.createElement("div");a.makeSelectable(this.domElement, !1);
	        this.__selector = document.createElement("div");this.__selector.className = "selector";this.__saturation_field = document.createElement("div");this.__saturation_field.className = "saturation-field";this.__field_knob = document.createElement("div");this.__field_knob.className = "field-knob";this.__field_knob_border = "2px solid ";this.__hue_knob = document.createElement("div");this.__hue_knob.className = "hue-knob";this.__hue_field = document.createElement("div");this.__hue_field.className = "hue-field";this.__input = document.createElement("input");
	        this.__input.type = "text";this.__input_textShadow = "0 1px 1px ";a.bind(this.__input, "keydown", function (a) {
	            13 === a.keyCode && g.call(this);
	        });a.bind(this.__input, "blur", g);a.bind(this.__selector, "mousedown", function (b) {
	            a.addClass(this, "drag").bind(window, "mouseup", function (b) {
	                a.removeClass(s.__selector, "drag");
	            });
	        });var v = document.createElement("div");f.extend(this.__selector.style, { width: "122px", height: "102px", padding: "3px", backgroundColor: "#222", boxShadow: "0px 1px 3px rgba(0,0,0,0.3)" });f.extend(this.__field_knob.style, { position: "absolute", width: "12px", height: "12px", border: this.__field_knob_border + (0.5 > this.__color.v ? "#fff" : "#000"), boxShadow: "0px 1px 3px rgba(0,0,0,0.5)", borderRadius: "12px", zIndex: 1 });f.extend(this.__hue_knob.style, { position: "absolute", width: "15px", height: "2px", borderRight: "4px solid #fff", zIndex: 1 });f.extend(this.__saturation_field.style, { width: "100px", height: "100px", border: "1px solid #555", marginRight: "3px", display: "inline-block", cursor: "pointer" });f.extend(v.style, { width: "100%", height: "100%",
	            background: "none" });c(v, "top", "rgba(0,0,0,0)", "#000");f.extend(this.__hue_field.style, { width: "15px", height: "100px", display: "inline-block", border: "1px solid #555", cursor: "ns-resize" });p(this.__hue_field);f.extend(this.__input.style, { outline: "none", textAlign: "center", color: "#fff", border: 0, fontWeight: "bold", textShadow: this.__input_textShadow + "rgba(0,0,0,0.7)" });a.bind(this.__saturation_field, "mousedown", r);a.bind(this.__field_knob, "mousedown", r);a.bind(this.__hue_field, "mousedown", function (b) {
	            u(b);a.bind(window, "mousemove", u);a.bind(window, "mouseup", h);
	        });this.__saturation_field.appendChild(v);this.__selector.appendChild(this.__field_knob);this.__selector.appendChild(this.__saturation_field);this.__selector.appendChild(this.__hue_field);this.__hue_field.appendChild(this.__hue_knob);this.domElement.appendChild(this.__input);this.domElement.appendChild(this.__selector);this.updateDisplay();
	    };k.superclass = e;f.extend(k.prototype, e.prototype, { updateDisplay: function updateDisplay() {
	            var a = d(this.getValue());if (!1 !== a) {
	                var e = !1;
	                f.each(b.COMPONENTS, function (b) {
	                    if (!f.isUndefined(a[b]) && !f.isUndefined(this.__color.__state[b]) && a[b] !== this.__color.__state[b]) return e = !0, {};
	                }, this);e && f.extend(this.__color.__state, a);
	            }f.extend(this.__temp.__state, this.__color.__state);this.__temp.a = 1;var k = 0.5 > this.__color.v || 0.5 < this.__color.s ? 255 : 0,
	                l = 255 - k;f.extend(this.__field_knob.style, { marginLeft: 100 * this.__color.s - 7 + "px", marginTop: 100 * (1 - this.__color.v) - 7 + "px", backgroundColor: this.__temp.toString(), border: this.__field_knob_border + "rgb(" + k + "," + k + "," + k + ")" });this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + "px";this.__temp.s = 1;this.__temp.v = 1;c(this.__saturation_field, "left", "#fff", this.__temp.toString());f.extend(this.__input.style, { backgroundColor: this.__input.value = this.__color.toString(), color: "rgb(" + k + "," + k + "," + k + ")", textShadow: this.__input_textShadow + "rgba(" + l + "," + l + "," + l + ",.7)" });
	        } });var l = ["-moz-", "-o-", "-webkit-", "-ms-", ""];return k;
	}(dat.controllers.Controller, dat.dom.dom, dat.color.Color = function (e, a, b, d) {
	    function f(a, b, d) {
	        Object.defineProperty(a, b, { get: function get() {
	                if ("RGB" === this.__state.space) return this.__state[b];p(this, b, d);return this.__state[b];
	            }, set: function set(a) {
	                "RGB" !== this.__state.space && (p(this, b, d), this.__state.space = "RGB");this.__state[b] = a;
	            } });
	    }function c(a, b) {
	        Object.defineProperty(a, b, { get: function get() {
	                if ("HSV" === this.__state.space) return this.__state[b];k(this);return this.__state[b];
	            }, set: function set(a) {
	                "HSV" !== this.__state.space && (k(this), this.__state.space = "HSV");this.__state[b] = a;
	            } });
	    }function p(b, c, e) {
	        if ("HEX" === b.__state.space) b.__state[c] = a.component_from_hex(b.__state.hex, e);else if ("HSV" === b.__state.space) d.extend(b.__state, a.hsv_to_rgb(b.__state.h, b.__state.s, b.__state.v));else throw "Corrupted color state";
	    }function k(b) {
	        var c = a.rgb_to_hsv(b.r, b.g, b.b);d.extend(b.__state, { s: c.s, v: c.v });d.isNaN(c.h) ? d.isUndefined(b.__state.h) && (b.__state.h = 0) : b.__state.h = c.h;
	    }var l = function l() {
	        this.__state = e.apply(this, arguments);if (!1 === this.__state) throw "Failed to interpret color arguments";this.__state.a = this.__state.a || 1;
	    };l.COMPONENTS = "r g b h s v hex a".split(" ");d.extend(l.prototype, { toString: function toString() {
	            return b(this);
	        }, toOriginal: function toOriginal() {
	            return this.__state.conversion.write(this);
	        } });f(l.prototype, "r", 2);f(l.prototype, "g", 1);f(l.prototype, "b", 0);c(l.prototype, "h");c(l.prototype, "s");c(l.prototype, "v");Object.defineProperty(l.prototype, "a", { get: function get() {
	            return this.__state.a;
	        }, set: function set(a) {
	            this.__state.a = a;
	        } });Object.defineProperty(l.prototype, "hex", { get: function get() {
	            "HEX" !== !this.__state.space && (this.__state.hex = a.rgb_to_hex(this.r, this.g, this.b));return this.__state.hex;
	        }, set: function set(a) {
	            this.__state.space = "HEX";this.__state.hex = a;
	        } });return l;
	}(dat.color.interpret, dat.color.math = function () {
	    var e;return { hsv_to_rgb: function hsv_to_rgb(a, b, d) {
	            var e = a / 60 - Math.floor(a / 60),
	                c = d * (1 - b),
	                p = d * (1 - e * b);b = d * (1 - (1 - e) * b);a = [[d, b, c], [p, d, c], [c, d, b], [c, p, d], [b, c, d], [d, c, p]][Math.floor(a / 60) % 6];return { r: 255 * a[0], g: 255 * a[1], b: 255 * a[2] };
	        }, rgb_to_hsv: function rgb_to_hsv(a, b, d) {
	            var e = Math.min(a, b, d),
	                c = Math.max(a, b, d),
	                e = c - e;if (0 == c) return { h: NaN, s: 0, v: 0 };
	            a = (a == c ? (b - d) / e : b == c ? 2 + (d - a) / e : 4 + (a - b) / e) / 6;0 > a && (a += 1);return { h: 360 * a, s: e / c, v: c / 255 };
	        }, rgb_to_hex: function rgb_to_hex(a, b, d) {
	            a = this.hex_with_component(0, 2, a);a = this.hex_with_component(a, 1, b);return a = this.hex_with_component(a, 0, d);
	        }, component_from_hex: function component_from_hex(a, b) {
	            return a >> 8 * b & 255;
	        }, hex_with_component: function hex_with_component(a, b, d) {
	            return d << (e = 8 * b) | a & ~(255 << e);
	        } };
	}(), dat.color.toString, dat.utils.common), dat.color.interpret, dat.utils.common), dat.utils.requestAnimationFrame = function () {
	    return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e, a) {
	        window.setTimeout(e, 1E3 / 60);
	    };
	}(), dat.dom.CenteredDiv = function (e, a) {
	    var b = function b() {
	        this.backgroundElement = document.createElement("div");a.extend(this.backgroundElement.style, { backgroundColor: "rgba(0,0,0,0.8)", top: 0, left: 0, display: "none", zIndex: "1000", opacity: 0, WebkitTransition: "opacity 0.2s linear" });e.makeFullscreen(this.backgroundElement);this.backgroundElement.style.position = "fixed";this.domElement = document.createElement("div");a.extend(this.domElement.style, { position: "fixed", display: "none", zIndex: "1001", opacity: 0, WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear" });document.body.appendChild(this.backgroundElement);document.body.appendChild(this.domElement);var b = this;e.bind(this.backgroundElement, "click", function () {
	            b.hide();
	        });
	    };b.prototype.show = function () {
	        var b = this;this.backgroundElement.style.display = "block";this.domElement.style.display = "block";this.domElement.style.opacity = 0;this.domElement.style.webkitTransform = "scale(1.1)";this.layout();a.defer(function () {
	            b.backgroundElement.style.opacity = 1;b.domElement.style.opacity = 1;b.domElement.style.webkitTransform = "scale(1)";
	        });
	    };b.prototype.hide = function () {
	        var a = this,
	            b = function b() {
	            a.domElement.style.display = "none";a.backgroundElement.style.display = "none";e.unbind(a.domElement, "webkitTransitionEnd", b);e.unbind(a.domElement, "transitionend", b);e.unbind(a.domElement, "oTransitionEnd", b);
	        };e.bind(this.domElement, "webkitTransitionEnd", b);e.bind(this.domElement, "transitionend", b);e.bind(this.domElement, "oTransitionEnd", b);this.backgroundElement.style.opacity = 0;this.domElement.style.opacity = 0;this.domElement.style.webkitTransform = "scale(1.1)";
	    };b.prototype.layout = function () {
	        this.domElement.style.left = window.innerWidth / 2 - e.getWidth(this.domElement) / 2 + "px";this.domElement.style.top = window.innerHeight / 2 - e.getHeight(this.domElement) / 2 + "px";
	    };return b;
	}(dat.dom.dom, dat.utils.common), dat.dom.dom, dat.utils.common);

	/*** EXPORTS FROM exports-loader ***/
	module.exports = dat;

/***/ },
/* 109 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */
	var Stats = function Stats() {

		var startTime = Date.now(),
		    prevTime = startTime;
		var ms = 0,
		    msMin = Infinity,
		    msMax = 0;
		var fps = 0,
		    fpsMin = Infinity,
		    fpsMax = 0;
		var frames = 0,
		    mode = 0;

		var container = document.createElement('div');
		container.id = 'stats';
		container.addEventListener('mousedown', function (event) {
			event.preventDefault();setMode(++mode % 2);
		}, false);
		container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';

		var fpsDiv = document.createElement('div');
		fpsDiv.id = 'fps';
		fpsDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#002';
		container.appendChild(fpsDiv);

		var fpsText = document.createElement('div');
		fpsText.id = 'fpsText';
		fpsText.style.cssText = 'color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
		fpsText.innerHTML = 'FPS';
		fpsDiv.appendChild(fpsText);

		var fpsGraph = document.createElement('div');
		fpsGraph.id = 'fpsGraph';
		fpsGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0ff';
		fpsDiv.appendChild(fpsGraph);

		while (fpsGraph.children.length < 74) {

			var bar = document.createElement('span');
			bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#113';
			fpsGraph.appendChild(bar);
		}

		var msDiv = document.createElement('div');
		msDiv.id = 'ms';
		msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;display:none';
		container.appendChild(msDiv);

		var msText = document.createElement('div');
		msText.id = 'msText';
		msText.style.cssText = 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
		msText.innerHTML = 'MS';
		msDiv.appendChild(msText);

		var msGraph = document.createElement('div');
		msGraph.id = 'msGraph';
		msGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0f0';
		msDiv.appendChild(msGraph);

		while (msGraph.children.length < 74) {

			var bar = document.createElement('span');
			bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#131';
			msGraph.appendChild(bar);
		}

		var setMode = function setMode(value) {

			mode = value;

			switch (mode) {

				case 0:
					fpsDiv.style.display = 'block';
					msDiv.style.display = 'none';
					break;
				case 1:
					fpsDiv.style.display = 'none';
					msDiv.style.display = 'block';
					break;
			}
		};

		var updateGraph = function updateGraph(dom, value) {

			var child = dom.appendChild(dom.firstChild);
			child.style.height = value + 'px';
		};

		return {

			REVISION: 11,

			domElement: container,

			setMode: setMode,

			begin: function begin() {

				startTime = Date.now();
			},

			end: function end() {

				var time = Date.now();

				ms = time - startTime;
				msMin = Math.min(msMin, ms);
				msMax = Math.max(msMax, ms);

				msText.textContent = ms + ' MS (' + msMin + '-' + msMax + ')';
				updateGraph(msGraph, Math.min(30, 30 - ms / 200 * 30));

				frames++;

				if (time > prevTime + 1000) {

					fps = Math.round(frames * 1000 / (time - prevTime));
					fpsMin = Math.min(fpsMin, fps);
					fpsMax = Math.max(fpsMax, fps);

					fpsText.textContent = fps + ' FPS (' + fpsMin + '-' + fpsMax + ')';
					updateGraph(fpsGraph, Math.min(30, 30 - fps / 100 * 30));

					prevTime = time;
					frames = 0;
				}

				return time;
			},

			update: function update() {

				startTime = this.end();
			}

		};
	};

	/*** EXPORTS FROM exports-loader ***/
	module.exports = Stats;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BuildingStore = undefined;

	var _AppDispatcher = __webpack_require__(111);

	var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

	var _core = __webpack_require__(88);

	var _CONSTANTS = __webpack_require__(112);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _buildings = {
	  'VERSION': '0.0.1'
	}; // collection of building items

	/**
	 * add a building item
	 * @param {string} text The content of the TODO
	 */
	// WorldStore.js
	// var AppDispatcher = require('../components/AppDispatcher');
	// var EventEmitter = require('events').EventEmitter;
	// var TodoConstants = require('../constants/TodoConstants');
	// var assign = require('object-assign');
	function create(building) {
	  //id identify building
	  building.userData.id = building.userData.id || building.uuid;
	  _buildings[building.userData.id] = {
	    dirty: true,
	    mesh: building
	  };
	  return true;
	}
	function modify(building) {
	  var id = building.userData.id;
	  if (_buildings[id]) {
	    _buildings[id].dirty = true;
	    return true;
	  } else {
	    return false;
	  }
	}

	/**
	 * Delete a TODO item.
	 * @param {string} id
	 */
	function remove(building) {
	  var id = building.userData.id;
	  if (_buildings[id]) {
	    _buildings[id].dirty = true;
	    _buildings[id].remove = true;
	    _buildings[id].mesh = null;
	    return true;
	  }
	}

	var BuildingStore = (0, _core.assign)({}, _core.EventEmitter.prototype, {

	  /**
	   * Get the entire collection of TODOs.
	   * @return {object}
	   */
	  getAll: function getAll() {
	    var buildings = [];
	    for (var key in _buildings) {
	      key !== 'VERSION' && buildings.push(_buildings[key].mesh);
	    }
	    return buildings;
	  },
	  dispatcherIndex: _AppDispatcher2.default.register(function (payload) {
	    var action = payload.action;
	    var building;
	    switch (action.actionType) {
	      case _CONSTANTS.BUILDING_CONSTS.ADD:
	        building = action.message;
	        if (building && create(building)) {
	          console.log('create Building');
	          BuildingStore.emit(_CONSTANTS.BUILDING_CONSTS.ADD, building);
	          BuildingStore.emit(_CONSTANTS.BUILDING_CONSTS.CHANGE);
	        }
	        break;
	      case _CONSTANTS.BUILDING_CONSTS.COMMAND:
	        var command = action.message;
	        if (command && modify(command.object)) {
	          console.log(command.name);
	          BuildingStore.emit(_CONSTANTS.BUILDING_CONSTS.COMMAND, command);
	        }
	        break;
	      case _CONSTANTS.BUILDING_CONSTS.REMOVE:
	        var command = action.message;
	        if (command && remove(command.object)) {
	          console.log(command.name);
	          BuildingStore.emit(_CONSTANTS.BUILDING_CONSTS.REMOVE, command);
	        }
	    }
	    return true; // No errors. Needed by promise in Dispatcher.
	  })

	});

	exports.BuildingStore = BuildingStore;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _core = __webpack_require__(88);

	var AppDispatcher = (0, _core.assign)({}, _core.Dispatcher.prototype, {

	  /**
	   * A bridge function between the views and the dispatcher, marking the action
	   * as a view action.  Another variant here could be handleServerAction.
	   * @param  {object} action The data coming from the view.
	   */
	  handleViewAction: function handleViewAction(action) {
	    this.dispatch({
	      source: 'VIEW_ACTION',
	      action: action
	    });
	  }

	}); // AppDispatcher.js
	/**
	 * @description the only dispatcher
	 */
	exports.default = AppDispatcher;

/***/ },
/* 112 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// constants.js
	/**
	 * @author  wk
	 * @date 2016/11/28
	 * @description public constants
	 */
	var BUILDING_CONSTS = exports.BUILDING_CONSTS = {
		ADD: 'BUILDING_ADD',
		REMOVE: 'BUILDING_REMOVE',
		MODIFY: 'BUILDING_MODIFY',
		CHANGE: 'BUILDING_CHANGE',
		COMMAND: 'BUILDING_COMMAND'
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.objectTab = exports.layerTab = exports.infoBuildingInit = exports.infoInit = undefined;

	var _InfoComponent = __webpack_require__(114);

	var _InfoComponent2 = _interopRequireDefault(_InfoComponent);

	var _core = __webpack_require__(88);

	var _InfoLayerComponent = __webpack_require__(115);

	var _InfoLayerComponent2 = _interopRequireDefault(_InfoLayerComponent);

	var _InfoObjectComponent = __webpack_require__(121);

	var _InfoObjectComponent2 = _interopRequireDefault(_InfoObjectComponent);

	var _InfoMaterialComponent = __webpack_require__(131);

	var _InfoMaterialComponent2 = _interopRequireDefault(_InfoMaterialComponent);

	var _InfoObjectBuildingComponent = __webpack_require__(132);

	var _InfoObjectBuildingComponent2 = _interopRequireDefault(_InfoObjectBuildingComponent);

	var _WorldAction = __webpack_require__(133);

	var _commands = __webpack_require__(122);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// InfoDefaultInit.js
	var lang = {
		'LAYER': '图层',
		'OBJECT': '物体',
		'MATERIAL': '材质'
	};
	__webpack_require__(134);
	var infoEle = _core.DomUtil.getById("info-pan");
	var infoInit = new _InfoComponent2.default(infoEle);
	var layerTab = new _InfoLayerComponent2.default();
	var objectTab = new _InfoObjectComponent2.default();
	objectTab.signal.on('update', function (command) {
		console.log(command);
		_WorldAction.BuildingAction.command(command);
	});
	objectTab.signal.on('remove', function (command) {
		_WorldAction.BuildingAction.remove(command);
	});
	layerTab.signal.on('clear', function (layer) {
		var group = layer.object;
		//BUG if remove is not run,group.children will always have.
		while (group.children[0]) {
			_WorldAction.BuildingAction.remove(new _commands.RemoveObjectCommand(group.children[0]));
		}
	});
	layerTab.signal.on('visibleall', function (layer) {
		visibleAllMesh(layer.object);
	});
	//make mesh and it's children visible=true;
	function visibleAllMesh(mesh) {
		if (mesh.visible !== undefined && !mesh.visible) {
			_WorldAction.BuildingAction.command(new _commands.SetValueCommand(mesh, 'visible', true));
		}
		for (var i = 0; i < mesh.children.length; i++) {
			visibleAllMesh(mesh.children[i]);
		}
	}

	var materialTab = new _InfoMaterialComponent2.default();
	infoInit.addChild(layerTab).addChild(objectTab).addChild(materialTab);
	var infoBuildingInit = new _InfoObjectBuildingComponent2.default();
	objectTab.addChild(infoBuildingInit);

	//buildDom		
	var tab = _core.DomUtil.create('div', 'info-tab', infoInit.element);
	var layerTabItem = _core.DomUtil.create('span', 'tab-item', tab);
	var objectTabItem = _core.DomUtil.create('span', 'tab-item', tab);
	var materialTabItem = _core.DomUtil.create('span', 'tab-item', tab);
	layerTabItem.innerHTML = lang.LAYER;
	objectTabItem.innerHTML = lang.OBJECT;
	materialTabItem.innerHTML = lang.MATERIAL;
	var clickFn = function clickFn(event) {
		select(event.target.textContent);
	};

	_core.DomEvent.on(layerTabItem, 'click', clickFn);
	_core.DomEvent.on(objectTabItem, 'click', clickFn);
	_core.DomEvent.on(materialTabItem, 'click', clickFn);
	_core.DomUtil.appendChild(infoInit.element, [layerTab.element, objectTab.element, materialTab.element]);
	var select = function select(section) {
		_core.DomUtil.removeClass(layerTabItem, 'selected');
		_core.DomUtil.removeClass(objectTabItem, 'selected');
		_core.DomUtil.removeClass(materialTabItem, 'selected');
		_core.DomUtil.setStyle(layerTab.element, 'display', 'none');
		_core.DomUtil.setStyle(objectTab.element, 'display', 'none');
		_core.DomUtil.setStyle(materialTab.element, 'display', 'none');
		switch (section) {
			case lang.LAYER:
				_core.DomUtil.addClass(layerTabItem, 'selected');
				_core.DomUtil.setStyle(layerTab.element, 'display', 'block');
				break;
			case lang.OBJECT:
				_core.DomUtil.addClass(objectTabItem, 'selected');
				_core.DomUtil.setStyle(objectTab.element, 'display', 'block');
				break;
			case lang.MATERIAL:
				_core.DomUtil.addClass(materialTabItem, 'selected');
				_core.DomUtil.setStyle(materialTab.element, 'display', 'block');
				break;
		}
	};
	select(lang.LAYER);
	exports.infoInit = infoInit;
	exports.infoBuildingInit = infoBuildingInit;
	exports.layerTab = layerTab;
	exports.objectTab = objectTab;

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _core = __webpack_require__(88);

	var _threejs = __webpack_require__(23);

	var THREE = _interopRequireWildcard(_threejs);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Info.component.js
	var INFOSTATUS = {
		'ON': "ON",
		'OFF': "OFF"
	};
	//TODO rebuild

	var Info = function () {
		function Info(element, world, intersectObjects) {
			(0, _classCallCheck3.default)(this, Info);

			this.element = element;
			//build element
			this.children = [];
			this._intersectObjects = intersectObjects || [];
			this._raycaster = new THREE.Raycaster();
			this.turnONStatus();
			world && this.resetWorld(world);
		}

		(0, _createClass3.default)(Info, [{
			key: 'turnONStatus',
			value: function turnONStatus() {
				this.infoStatus = INFOSTATUS.ON;
				return this;
			}
		}, {
			key: 'turnOFFStatus',
			value: function turnOFFStatus() {
				this.infoStatus = INFOSTATUS.OFF;
				return this;
			}
		}, {
			key: 'addChild',
			value: function addChild(child) {
				this.children.push(child);
				return this;
			}
		}, {
			key: 'removeChild',
			value: function removeChild(child) {
				_core.Util.removeByValue(this.children, child);
				return this;
			}
		}, {
			key: 'resetWorld',
			value: function resetWorld(world) {
				this._world = world;
				var canvas = this._world.renderer.domElement;
				var raycaster = this._raycaster;
				var camera = this._world.camera;
				var clickFn = function clickFn(event) {
					if (this.infoStatus !== INFOSTATUS.OFF) {
						console.log('IN select mode');
						var mouse = new THREE.Vector2(0, 0);
						var mousePosition = _core.DomUtil.getMousePosition(canvas, event);
						mouse.x = mousePosition.left / canvas.width * 2 - 1;
						mouse.y = -(mousePosition.top / canvas.height) * 2 + 1;
						raycaster.setFromCameraHP(mouse, camera);
						// bug when in long distance racaster have low precision
						// var tempCamera=camera.clone();
						// tempCamera.position.set(0,0,0);
						// tempCamera.updateMatrixWorld(true);
						// raycaster.setFromCamera(mouse, tempCamera);
						// raycaster.ray.origin.copy(camera.position);
						var intersects = raycaster.intersectObjects(this._intersectObjects, true);
						console.log(intersects);
						this.refresh(intersects);
					}
				};
				_core.DomEvent.on(canvas, 'click', _core.Util.bind(clickFn, this));
				return this;
			}
		}, {
			key: 'refresh',
			value: function refresh(intersects) {
				if (this._world) {
					//for other component communicate
					this._world.signal.emit('SELECT', intersects);
				}
				_core.Util.forEach(this.children, function (child) {
					// child.execute(intersects);
					child.refresh && child.refresh(intersects);
				});
			}
		}, {
			key: 'emptyIntersectObjects',
			value: function emptyIntersectObjects(ary) {
				_core.Util.emptyArray(this._intersectObjects);
				if (ary) {
					for (var i = 0; i < ary.length; i++) {
						this.addIntersectObject(ary[i]);
					}
				}
				return this;
			}
		}, {
			key: 'addIntersectObject',
			value: function addIntersectObject(intersectObject) {
				this._intersectObjects.push(intersectObject);
				return this;
			}
		}]);
		return Info;
	}();

	exports.default = Info;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _core = __webpack_require__(88);

	var _modalTool = __webpack_require__(116);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// InfoScene.component.js
	var UI = _core.DomUtil.UI;

	var InfoLayer = function () {
		function InfoLayer(layerCollection) {
			(0, _classCallCheck3.default)(this, InfoLayer);

			this.signal = new _core.EventEmitter();
			this.element = _core.DomUtil.createElement('div', 'info-layer', 'this is layer');
			layerCollection && this.setLayers(layerCollection);
		}

		(0, _createClass3.default)(InfoLayer, [{
			key: 'setLayers',
			value: function setLayers(layerCollection) {
				_core.DomUtil.empty(this.element);
				var panel = new UI.Panel().setClass('layer-pan');
				var layers = layerCollection.getLayers();
				var rowCollection = [];
				var signal = this.signal;
				for (var i = 0; i < layers.length; i++) {
					var layer = layers[i];
					if (layer.name) {
						var row = new UI.Row().setClass('layer-item');
						rowCollection.push(row);
						row.add(new UI.Text(layer.name).setWidth('90px'));
						var trashButton = new UI.Span().setClass('iconfont icon-trash').setStyle('float', ['right']);
						var eyeButton = new UI.Span().setClass('iconfont icon-eye').setStyle('float', ['right']);
						var bulbButton = new UI.Span().setClass('iconfont icon-bulb').setStyle('float', ['right']);
						row.add(trashButton, bulbButton, eyeButton);
						panel.add(row);
						//delete
						var trashClick = function (layer, trashButton) {
							return function () {
								if (!layer.clearable) {
									alert('不可清除！');
									return false;
								}
								_modalTool.confirmModal.show({
									content: '确认清除此图层？(删除后不可复原！)',
									callback: function callback(flag) {
										if (flag) {
											// layer.clear();
											signal.emit('clear', layer);
										}
									}
								});
								_core.DomEvent.stop();
							};
						}(layer, trashButton);
						//visible
						var eyeClick = function (layer, eyeButton) {
							return function () {
								layer.toggleVisible() ? _core.DomUtil.removeClass(eyeButton.dom, 'unselected') : _core.DomUtil.addClass(eyeButton.dom, 'unselected');
								signal.emit('toogleVisible', layer);
								_core.DomEvent.stop();
							};
						}(layer, eyeButton);
						//visibleall
						var bulbClick = function (layer, bulbButton) {
							return function () {
								// layer.visibleAllChild();
								signal.emit('visibleall', layer);
								_core.DomEvent.stop();
							};
						}(layer, bulbButton);
						var rowClick = function (layer, row) {
							return function () {
								if (layer.selectable) {
									_core.Util.forEach(rowCollection, function (row) {
										_core.DomUtil.removeClass(row.dom, 'selected');
									});
									layerCollection.setSelectedLayer(layer);
									_core.DomUtil.addClass(row.dom, 'selected');
									signal.emit('selectLayer', layerCollection.getSelectedLayer());
								}
							};
						}(layer, row);
						trashButton.onClick(trashClick);
						bulbButton.onClick(bulbClick);
						eyeButton.onClick(eyeClick);
						row.onClick(rowClick);
					}
				}
				_core.DomUtil.appendChild(this.element, panel.dom);
			}
		}]);
		return InfoLayer;
	}();

	exports.default = InfoLayer;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.confirmModal = undefined;

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _core = __webpack_require__(88);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(117); // modal.js

	var UI = _core.DomUtil.UI;

	var ConfirmModal = function () {
		function ConfirmModal() {
			(0, _classCallCheck3.default)(this, ConfirmModal);

			this.modal = new UI.Modal();
			this.modal.setPosition('fixed').setClass('modal');
			this.modal.container.setWidth('300px');
			_core.DomUtil.appendChild(document.body, this.modal.dom);
			this.confirm = new UI.Div().setClass('confirm-modal');

			this.confirmHeader = new UI.Div().setClass('confirm-header');
			this.confirmBody = new UI.Div().setClass('confirm-body');
			this.confirmFooter = new UI.Div().setClass('confirm-footer');
			this.headerText = new _core.DomUtil.create('h2', 'header', this.confirmHeader.dom);
			this.bodyText = new _core.DomUtil.create('p', 'body', this.confirmBody.dom);
			var scope = this;
			var cancelButton = new UI.Button('取消').setClass('button-cancel').onClick(function () {
				scope.confirmFn(false);
			});
			var confirmButton = new UI.Button('确认').setClass('button-confirm').onClick(function () {
				scope.confirmFn(true);
			});
			this.confirmFooter.add(cancelButton, confirmButton);
		}

		(0, _createClass3.default)(ConfirmModal, [{
			key: 'show',
			value: function show(opts) {
				this.confirm.clear();
				if (opts.header) {
					this.headerText.innerHTML = opts.header;
					this.confirm.add(this.confirmHeader);
				}
				if (opts.content) {
					this.bodyText.innerHTML = opts.content;
					this.confirm.add(this.confirmBody);
				}
				this.confirm.add(this.confirmFooter);
				this.confirmFn = opts.callback || _core.Util.falseFn;
				this.modal.show(this.confirm);
			}
		}]);
		return ConfirmModal;
	}();

	var confirmModal = new ConfirmModal();

	exports.confirmModal = confirmModal;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(118);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(120)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./confirmModal.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./confirmModal.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(119)();
	// imports


	// module
	exports.push([module.id, ".confirm-body {\n  margin-bottom: 20px;\n}\n.confirm-footer {\n  overflow: hidden;\n}\n.button-cancel,\n.button-confirm {\n  float: right;\n  font-size: 15px;\n  color: #444;\n  margin-left: 10px;\n  cursor: pointer;\n}\n", ""]);

	// exports


/***/ },
/* 119 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _core = __webpack_require__(88);

	var _threejs = __webpack_require__(23);

	var THREE = _interopRequireWildcard(_threejs);

	var _modalTool = __webpack_require__(116);

	var _commands = __webpack_require__(122);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var UI = _core.DomUtil.UI; // InfoObject.component.js

	var lang = {
		'NAME': '名字',
		'POSITION': '位置',
		'ROTATION': '旋转',
		'SCALE': '比例',
		'VISIBLE': '可见',
		'DEL': '删除',
		'CONFIRM_DEL_OBJ': '确认删除此物体?'
	};

	var InfoObject = function () {
		function InfoObject() {
			(0, _classCallCheck3.default)(this, InfoObject);

			this.element = _core.DomUtil.createElement('div', 'info-object');
			this.children = [];
			this.commonEle = this._initDom();
			//for objectChild communicate
			this.signal = new _core.EventEmitter();
			var scope = this;
			this.signal.on('updateUI', function () {
				scope.updateUI(scope.selectedObject);
			});
			this.signal.on('refresh', function (intersects) {
				scope.refresh(intersects);
			});
		}

		(0, _createClass3.default)(InfoObject, [{
			key: 'addChild',
			value: function addChild(child) {
				child.containerEle = this.element;
				child.fatherComponent = this;
				this.children.push(child);
				return this;
			}
		}, {
			key: 'removeChild',
			value: function removeChild(child) {
				child.containerEle = null;
				child.fatherComponent = null;
				_core.Util.removeByValue(this.children, child);
				return this;
			}
		}, {
			key: '_initDom',
			value: function _initDom() {
				var commonInfo = new UI.Panel().setClass('info-commonObject');
				//name
				var objectTypeRow = new UI.Row();
				var objectType = new UI.Text();
				objectTypeRow.add(new UI.Text(lang.NAME).setWidth('90px'));
				objectTypeRow.add(objectType);
				var objectDelete = new UI.Button(lang.DEL).setClass('btn btn-danger').setPosition('absolute').setRight('10px').onClick(deleteObject);
				objectTypeRow.add(objectDelete);
				commonInfo.add(objectTypeRow);

				// position
				var objectPositionRow = new UI.Row();
				var objectPositionX = new UI.Number().setWidth('50px').onChange(update);
				var objectPositionY = new UI.Number().setWidth('50px').onChange(update);
				var objectPositionZ = new UI.Number().setWidth('50px').onChange(update);
				objectPositionRow.add(new UI.Text(lang.POSITION).setWidth('90px'));
				objectPositionRow.add(objectPositionX, objectPositionY, objectPositionZ);

				commonInfo.add(objectPositionRow);

				//rotation
				var objectRotationRow = new UI.Row();
				var objectRotationX = new UI.Number().setStep(10).setUnit('°').setWidth('50px').onChange(update);
				var objectRotationY = new UI.Number().setStep(10).setUnit('°').setWidth('50px').onChange(update);
				var objectRotationZ = new UI.Number().setStep(10).setUnit('°').setWidth('50px').onChange(update);

				objectRotationRow.add(new UI.Text(lang.ROTATION).setWidth('90px'));
				objectRotationRow.add(objectRotationX, objectRotationY, objectRotationZ);

				commonInfo.add(objectRotationRow);
				// scale

				var objectScaleRow = new UI.Row();
				var objectScale = new UI.Number(1).setRange(0.01, Infinity).setWidth('50px').onChange(update);

				objectScaleRow.add(new UI.Text(lang.SCALE).setWidth('90px'));
				objectScaleRow.add(objectScale);
				commonInfo.add(objectScaleRow);

				var objectVisibleRow = new UI.Row();
				var objectVisible = new UI.Checkbox().onChange(update);

				objectVisibleRow.add(new UI.Text(lang.VISIBLE).setWidth('90px'));
				objectVisibleRow.add(objectVisible);

				commonInfo.add(objectVisibleRow);

				var scope = this;
				function update() {
					var object = scope.selectedObject;
					//console.log(object)
					if (object != null) {
						var newPosition = new THREE.Vector3(objectPositionX.getValue(), objectPositionY.getValue(), objectPositionZ.getValue());
						if (object.position.distanceTo(newPosition) >= 0.01) {
							scope.signal.emit('update', new _commands.SetPositionCommand(object, newPosition));
						}
						var newRotation = new THREE.Euler(objectRotationX.getValue() * THREE.Math.DEG2RAD, objectRotationY.getValue() * THREE.Math.DEG2RAD, objectRotationZ.getValue() * THREE.Math.DEG2RAD);
						if (object.rotation.toVector3().distanceTo(newRotation.toVector3()) >= 0.01) {
							scope.signal.emit('update', new _commands.SetRotationCommand(object, newRotation));
						}
						var newScale = new THREE.Vector3(objectScale.getValue(), objectScale.getValue(), objectScale.getValue());
						if (object.scale.distanceTo(newScale) >= 0.01) {
							scope.signal.emit('update', new _commands.SetScaleCommand(object, newScale));
						}
						if (object.visible !== objectVisible.getValue()) {
							scope.signal.emit('update', new _commands.SetValueCommand(object, 'visible', objectVisible.getValue()));
						}
					}
				}
				this.updateUI = function (object) {
					if (object) {
						_core.Util.log('updateUI in InfoObject.component.js');
						objectType.setValue(object.type);

						objectPositionX.setValue(object.position.x);
						objectPositionY.setValue(object.position.y);
						objectPositionZ.setValue(object.position.z);

						objectRotationX.setValue(object.rotation.x * THREE.Math.RAD2DEG);
						objectRotationY.setValue(object.rotation.y * THREE.Math.RAD2DEG);
						objectRotationZ.setValue(object.rotation.z * THREE.Math.RAD2DEG);

						objectScale.setValue(object.scale.x);

						objectVisible.setValue(object.visible);
					}
				};
				function deleteObject() {
					_modalTool.confirmModal.show({
						content: lang.CONFIRM_DEL_OBJ,
						callback: function callback(flag) {
							if (scope.selectedObject && flag) {
								scope.signal.emit('remove', new _commands.RemoveObjectCommand(scope.selectedObject, scope.signal));
							}
						}
					});
				}

				return commonInfo.dom;
			}
		}, {
			key: 'refresh',
			value: function refresh(intersects) {
				var intersect = intersects[0];
				//if intersect===undefinded
				if (!intersect) {
					_core.DomUtil.empty(this.element);
					this.selectedObject = null;
				}
				if (intersect && intersect.object !== this.selectedObject) {
					this.selectedObject = intersect.object;
					this.updateUI(this.selectedObject);
					_core.DomUtil.appendChild(this.element, this.commonEle);
				}
				_core.Util.forEach(this.children, function (child) {
					child.execute(intersects);
				});
			}
		}]);
		return InfoObject;
	}();

	exports.default = InfoObject;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SetBuildingHeightCommand = exports.RemoveObjectCommand = exports.SetValueCommand = exports.SetRotationCommand = exports.SetScaleCommand = exports.SetPositionCommand = undefined;

	var _SetPositionCommand = __webpack_require__(123);

	var _SetPositionCommand2 = _interopRequireDefault(_SetPositionCommand);

	var _SetScaleCommand = __webpack_require__(125);

	var _SetScaleCommand2 = _interopRequireDefault(_SetScaleCommand);

	var _SetRotationCommand = __webpack_require__(126);

	var _SetRotationCommand2 = _interopRequireDefault(_SetRotationCommand);

	var _SetValueCommand = __webpack_require__(127);

	var _SetValueCommand2 = _interopRequireDefault(_SetValueCommand);

	var _RemoveObjectCommand = __webpack_require__(128);

	var _RemoveObjectCommand2 = _interopRequireDefault(_RemoveObjectCommand);

	var _SetBuildingHeightCommand = __webpack_require__(129);

	var _SetBuildingHeightCommand2 = _interopRequireDefault(_SetBuildingHeightCommand);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// commands.js
	exports.SetPositionCommand = _SetPositionCommand2.default;
	exports.SetScaleCommand = _SetScaleCommand2.default;
	exports.SetRotationCommand = _SetRotationCommand2.default;
	exports.SetValueCommand = _SetValueCommand2.default;
	exports.RemoveObjectCommand = _RemoveObjectCommand2.default;
	exports.SetBuildingHeightCommand = _SetBuildingHeightCommand2.default;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(26);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Command2 = __webpack_require__(124);

	var _Command3 = _interopRequireDefault(_Command2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SetPositionCommand = function (_Command) {
		(0, _inherits3.default)(SetPositionCommand, _Command);

		function SetPositionCommand(object, newPosition) {
			(0, _classCallCheck3.default)(this, SetPositionCommand);

			var _this = (0, _possibleConstructorReturn3.default)(this, (SetPositionCommand.__proto__ || Object.getPrototypeOf(SetPositionCommand)).call(this, 'setPosition'));

			_this.object = object;
			if (object !== undefined && newPosition !== undefined) {
				_this.newPosition = newPosition;
				_this.oldPosition = _this.object.position;
			}

			return _this;
		}

		(0, _createClass3.default)(SetPositionCommand, [{
			key: 'execute',
			value: function execute() {
				if (this.object) {
					this.object.position.copy(this.newPosition);
					this.object.updateMatrixWorld(true);
				}
			}
		}]);
		return SetPositionCommand;
	}(_Command3.default); // SetPositionCommand.js


	exports.default = SetPositionCommand;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Command.js
	var Command = function Command(name) {
		(0, _classCallCheck3.default)(this, Command);

		this.name = name;
	};

	exports.default = Command;

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(26);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Command2 = __webpack_require__(124);

	var _Command3 = _interopRequireDefault(_Command2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SetScaleCommand = function (_Command) {
		(0, _inherits3.default)(SetScaleCommand, _Command);

		function SetScaleCommand(object, newScale) {
			(0, _classCallCheck3.default)(this, SetScaleCommand);

			var _this = (0, _possibleConstructorReturn3.default)(this, (SetScaleCommand.__proto__ || Object.getPrototypeOf(SetScaleCommand)).call(this, 'setScale'));

			_this.object = object;
			if (object !== undefined && newScale !== undefined) {
				_this.oldScale = object.scale;
				_this.newScale = newScale;
			}
			return _this;
		}

		(0, _createClass3.default)(SetScaleCommand, [{
			key: 'execute',
			value: function execute() {
				if (this.object) {
					this.object.scale.copy(this.newScale);
					this.object.updateMatrixWorld(true);
				}
			}
		}]);
		return SetScaleCommand;
	}(_Command3.default); // SetScaleComand.js


	exports.default = SetScaleCommand;

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(26);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Command2 = __webpack_require__(124);

	var _Command3 = _interopRequireDefault(_Command2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SetRotationCommand = function (_Command) {
		(0, _inherits3.default)(SetRotationCommand, _Command);

		function SetRotationCommand(object, newRotation) {
			(0, _classCallCheck3.default)(this, SetRotationCommand);

			var _this = (0, _possibleConstructorReturn3.default)(this, (SetRotationCommand.__proto__ || Object.getPrototypeOf(SetRotationCommand)).call(this, 'set rotation'));

			_this.object = object;
			if (_this.object !== undefined && newRotation !== undefined) {
				_this.oldRotation = _this.object.rotation;
				_this.newRotation = newRotation;
			}
			return _this;
		}

		(0, _createClass3.default)(SetRotationCommand, [{
			key: 'execute',
			value: function execute() {
				this.object.rotation.copy(this.newRotation);
				this.object.updateMatrixWorld(true);
			}
		}]);
		return SetRotationCommand;
	}(_Command3.default); // SetRotationCommand.js


	exports.default = SetRotationCommand;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(26);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Command2 = __webpack_require__(124);

	var _Command3 = _interopRequireDefault(_Command2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SetValueCommand = function (_Command) {
		(0, _inherits3.default)(SetValueCommand, _Command);

		function SetValueCommand(object, attributeName, newValue) {
			(0, _classCallCheck3.default)(this, SetValueCommand);

			var _this = (0, _possibleConstructorReturn3.default)(this, (SetValueCommand.__proto__ || Object.getPrototypeOf(SetValueCommand)).call(this, 'set value' + attributeName));

			_this.object = object;
			if (_this.object !== undefined && attributeName !== undefined && newValue !== undefined) {
				_this.attributeName = attributeName;
				_this.oldValue = _this.object[attributeName];
				_this.newValue = newValue;
			}
			return _this;
		}

		(0, _createClass3.default)(SetValueCommand, [{
			key: 'execute',
			value: function execute() {
				this.object[this.attributeName] = this.newValue;
			}
		}]);
		return SetValueCommand;
	}(_Command3.default); // SetValueCommand.js


	exports.default = SetValueCommand;

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(26);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Command2 = __webpack_require__(124);

	var _Command3 = _interopRequireDefault(_Command2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var RemoveObjectCommand = function (_Command) {
		(0, _inherits3.default)(RemoveObjectCommand, _Command);

		function RemoveObjectCommand(object, signal) {
			(0, _classCallCheck3.default)(this, RemoveObjectCommand);

			var _this = (0, _possibleConstructorReturn3.default)(this, (RemoveObjectCommand.__proto__ || Object.getPrototypeOf(RemoveObjectCommand)).call(this, 'remove object'));

			_this.parent = object.parent;
			_this.object = object;
			_this.signal = signal;
			return _this;
		}

		(0, _createClass3.default)(RemoveObjectCommand, [{
			key: 'execute',
			value: function execute() {
				this.parent.remove(this.object);
				if (this.signal) {
					this.signal.emit('refresh', []);
				}
			}
		}]);
		return RemoveObjectCommand;
	}(_Command3.default); // RemoveObjectCommand.js


	exports.default = RemoveObjectCommand;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(26);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Command2 = __webpack_require__(124);

	var _Command3 = _interopRequireDefault(_Command2);

	var _buildingTool = __webpack_require__(130);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// SetBuildingHeightCommand.js
	var SetBuildingHeightCommand = function (_Command) {
		(0, _inherits3.default)(SetBuildingHeightCommand, _Command);

		function SetBuildingHeightCommand(object, floorNum, floorHeight, signal) {
			(0, _classCallCheck3.default)(this, SetBuildingHeightCommand);

			var _this = (0, _possibleConstructorReturn3.default)(this, (SetBuildingHeightCommand.__proto__ || Object.getPrototypeOf(SetBuildingHeightCommand)).call(this, 'set building height'));

			if (object && floorNum && floorHeight) {
				_this.object = object;
				_this.oldFloorNum = object.userData.floorNum;
				_this.oldFloorHeight = object.userData.floorHeight;
				_this.newFloorNum = floorNum;
				_this.newFloorHeight = floorHeight;
				_this.signal = signal;
			}
			return _this;
		}

		(0, _createClass3.default)(SetBuildingHeightCommand, [{
			key: 'execute',
			value: function execute() {
				(0, _buildingTool.modifyBuildingHeight)(this.object, this.newFloorHeight, this.newFloorNum);
				if (this.signal) {
					this.signal.emit('updateUI');
				}
			}
		}]);
		return SetBuildingHeightCommand;
	}(_Command3.default);

	exports.default = SetBuildingHeightCommand;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.modifyBuildingHeight = exports.createBuilding = undefined;

	var _threejs = __webpack_require__(23);

	var THREE = _interopRequireWildcard(_threejs);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var createBuilding = function createBuilding(shape) {
		var extrudeSettings = {
			steps: 1,
			amount: 10,
			bevelEnabled: false
		};
		var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
		var position = geometry.center().negate();
		var material1 = new THREE.MeshLambertMaterial({ color: 0xD0715E });
		var texture = new THREE.TextureLoader().load("images/textures/brick_diffuse.jpg");
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		var material2 = new THREE.MeshLambertMaterial({ map: texture });
		var buildingMesh = new THREE.Mesh(geometry, new THREE.MultiMaterial([material1, material2]));
		buildingMesh.name = 'building';
		buildingMesh.castShadow = true;
		buildingMesh.receiveShadow = true;
		buildingMesh.position.copy(position);
		buildingMesh.userData.floorHeight = 10;
		buildingMesh.userData.floorNum = 1;
		resetBuildingFaceUV(geometry, 1, 1);
		return buildingMesh;
	}; // buildingTool.js


	var modifyBuildingHeight = function modifyBuildingHeight(mesh, floorHeight, floorNum) {
		var vertices = mesh.geometry.vertices;
		var baseZ = vertices[0].z;
		var buildingHeight = floorHeight * floorNum;
		for (var i = vertices.length / 2; i < vertices.length; i++) {
			vertices[i].z = baseZ + buildingHeight;
		}
		mesh.userData.floorHeight = floorHeight;
		mesh.userData.floorNum = floorNum;
		var position = mesh.geometry.center().negate();
		mesh.position.add(position);
		resetBuildingFaceUV(mesh.geometry, floorNum, 1);
		mesh.geometry.verticesNeedUpdate = true;
	};

	var resetBuildingFaceUV = function resetBuildingFaceUV(geometry, repeatY, repeatX) {
		var verticesNum = geometry.vertices.length;
		var faceVertexUvs = geometry.faceVertexUvs[0];
		var topbottomtriangleNum = verticesNum - 4;
		var odd = true;
		for (var i = topbottomtriangleNum; i < faceVertexUvs.length; i++) {
			var faceUv = faceVertexUvs[i];
			if (odd) {
				faceUv[0].set(0, 0);
				faceUv[1].set(1, 0);
				faceUv[2].set(0, 1 * repeatY);
			} else {
				faceUv[0].set(1, 0);
				faceUv[1].set(1, 1 * repeatY);
				faceUv[2].set(0, 1 * repeatY);
			}
			odd = !odd;
		}
		geometry.uvsNeedUpdate = true;
	};

	exports.createBuilding = createBuilding;
	exports.modifyBuildingHeight = modifyBuildingHeight;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _core = __webpack_require__(88);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var UI = _core.DomUtil.UI; // InfoMaterial.component.js

	var InfoMaterial = function () {
		function InfoMaterial() {
			(0, _classCallCheck3.default)(this, InfoMaterial);

			this.element = _core.DomUtil.createElement('div', 'info-material', 'this is material');
			this.children = [];
		}

		(0, _createClass3.default)(InfoMaterial, [{
			key: 'addChild',
			value: function addChild(child) {
				child.containerEle = this.element;
				this.children.push(child);
				return this;
			}
		}, {
			key: 'removeChild',
			value: function removeChild(child) {
				child.containerEle = null;
				_core.Util.removeByValue(this.children, child);
				return this;
			}
		}, {
			key: 'refresh',
			value: function refresh(intersects) {
				_core.Util.forEach(this.children, function (child) {
					child.execute(intersects);
				});
			}
		}]);
		return InfoMaterial;
	}();

	exports.default = InfoMaterial;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _core = __webpack_require__(88);

	var _threejs = __webpack_require__(23);

	var THREE = _interopRequireWildcard(_threejs);

	var _commands = __webpack_require__(122);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var UI = _core.DomUtil.UI; // InfoObject.building.component.js

	var lang = {
		'FLOORHEIGHT': '层高',
		'FLOORNUM': '层数'
	};

	var infoBuilding = function () {
		function infoBuilding(intersectNames) {
			(0, _classCallCheck3.default)(this, infoBuilding);

			this._intersectNames = intersectNames || {};
			this.element = _core.DomUtil.createElement('div', 'info-building');
			this._initDom();
		}

		(0, _createClass3.default)(infoBuilding, [{
			key: '_initDom',
			value: function _initDom() {
				//height
				var objectHeightRow = new UI.Row();
				var objectHeight = new UI.Number().setStep(10).setUnit('m').setWidth('50px').onChange(update);
				objectHeight.min = 0.1;
				objectHeightRow.add(new UI.Text(lang.FLOORHEIGHT).setWidth('90px'));
				objectHeightRow.add(objectHeight);

				_core.DomUtil.appendChild(this.element, objectHeightRow.dom);

				var objectFloorRow = new UI.Row();
				var objectFloor = new UI.Integer(1).setWidth('100px').onChange(update);
				objectFloor.min = 1;
				objectFloorRow.add(new UI.Text(lang.FLOORNUM).setWidth('90px'));
				objectFloorRow.add(objectFloor);

				_core.DomUtil.appendChild(this.element, objectFloorRow.dom);

				var scope = this;
				function update() {
					var object = scope.selectedObject;
					if (object != null) {
						var floorHeight = objectHeight.getValue();
						var floorNum = objectFloor.getValue();
						if (Math.abs(object.userData.floorHeight - floorHeight) >= 0.01 || Math.abs(object.userData.floorNum - floorNum)) {
							// modifyBuildingHeight(object,floorHeight,floorNum);
							if (scope.fatherComponent) {
								scope.fatherComponent.signal.emit('update', new _commands.SetBuildingHeightCommand(object, floorNum, floorHeight, scope.fatherComponent.signal));
							}
						}
					}
				}
				this.updateUI = function (object) {
					_core.Util.log('updateUI in infoObject.building.component');
					objectHeight.setValue(object.userData.floorHeight || 10);
					objectFloor.setValue(object.userData.floorNum || 1);
				};
			}
		}, {
			key: 'setIntersectNames',
			value: function setIntersectNames(intersectNames) {
				this._intersectNames = intersectNames;
				return this;
			}
		}, {
			key: 'execute',
			value: function execute(intersects) {
				var intersect = intersects[0];
				this.unoutlineBuilding();
				if (intersect && this._intersectNames[intersect.object.name]) {
					this.selectedObject = intersect.object;
					this.updateUI(this.selectedObject);
					this.outlineBuilding(this.selectedObject);
					_core.DomUtil.appendChild(this.containerEle, this.element);
				}
			}
		}, {
			key: 'unoutlineBuilding',
			value: function unoutlineBuilding() {
				if (this.selectedObject) {
					_core.Util.emptyArray(this.selectedObject.children);
					this.selectedObject = null;
				}
			}
		}, {
			key: 'outlineBuilding',
			value: function outlineBuilding(mesh) {
				var outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.BackSide });
				var outlineMesh = new THREE.Mesh(mesh.geometry, outlineMaterial);
				outlineMesh.name = 'building-outline';
				outlineMesh.scale.multiplyScalar(1.05);
				mesh.add(outlineMesh);
			}
		}]);
		return infoBuilding;
	}();

	exports.default = infoBuilding;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.BuildingAction = undefined;

	var _AppDispatcher = __webpack_require__(111);

	var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

	var _CONSTANTS = __webpack_require__(112);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * [BuildingAction ]
	 * @type {Object}
	 * @description messagetype:{actionType:string,message}
	 */
	// WorldAction.js
	var BuildingAction = {
		add: function add(building) {
			_AppDispatcher2.default.handleViewAction({ actionType: _CONSTANTS.BUILDING_CONSTS.ADD, message: building });
		},
		remove: function remove(building) {
			_AppDispatcher2.default.handleViewAction({ actionType: _CONSTANTS.BUILDING_CONSTS.REMOVE, message: building });
		},
		modify: function modify(building) {
			_AppDispatcher2.default.handleViewAction({ actionType: _CONSTANTS.BUILDING_CONSTS.MODIFY, message: building });
		},
		command: function command(building) {
			_AppDispatcher2.default.handleViewAction({ actionType: _CONSTANTS.BUILDING_CONSTS.COMMAND, message: building });
		}
	};
	exports.BuildingAction = BuildingAction;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(135);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(120)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./info.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./info.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(119)();
	// imports


	// module
	exports.push([module.id, ".info-tab {\n  background-color: #ddd;\n  border-top: 1px solid #ccc;\n  font-size: 16px;\n}\n.tab-item {\n  padding: 10px;\n  display: inline-block;\n  cursor: pointer;\n  color: #aaa;\n  border-right: 1px solid #ccc;\n}\n.tab-item.selected {\n  color: #888;\n  background-color: #eee;\n}\n.info-object {\n  padding: 10px;\n  font-size: 15px;\n}\n.info-layer {\n  padding: 20px 10px;\n}\n.layer-pan {\n  color: #444;\n  background: #fff;\n  padding: 0;\n  width: 100%;\n  height: 300px;\n  font-size: 12px;\n  cursor: default;\n  overflow: auto;\n  outline: none;\n}\n.layer-item {\n  padding: 10px 4px;\n  font-size: 15px;\n  font-weight: bold;\n}\n.layer-item .iconfont {\n  font-weight: normal;\n  color: #444;\n  margin-right: 5px;\n  cursor: pointer;\n  font-size: 16px;\n}\n.layer-item .iconfont.icon-eye {\n  color: #ee9e23;\n}\n.layer-item .iconfont.icon-eye.unselected {\n  color: #444;\n}\n.layer-item .iconfont.icon-bulb:hover {\n  font-size: 20px;\n  color: #e43535;\n}\n.layer-item .iconfont.icon-trash:hover {\n  font-size: 20px;\n  color: #e43535;\n}\n.layer-item:before {\n  content: '\\25A0';\n  font-size: 10px;\n  font-weight: 100;\n  color: #727bab;\n  margin-right: 4px;\n}\n.layer-item.selected {\n  background-color: #ddd;\n}\ninput.Number {\n  color: #0080f0!important;\n  font-size: 12px;\n  border: 0px;\n  padding: 2px;\n  cursor: col-resize;\n}\n.Row {\n  min-height: 20px;\n  margin-bottom: 10px;\n}\n.btn.btn-danger {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d43f3a;\n  border-style: solid;\n  border-radius: 4px;\n  cursor: pointer;\n}\n", ""]);

	// exports


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
				value: true
	});
	exports.drawPanInit = undefined;

	var _DrawComponent = __webpack_require__(137);

	var _DrawComponent2 = _interopRequireDefault(_DrawComponent);

	var _DrawLineComponent = __webpack_require__(139);

	var _DrawLineComponent2 = _interopRequireDefault(_DrawLineComponent);

	var _DrawCloseComponent = __webpack_require__(140);

	var _DrawCloseComponent2 = _interopRequireDefault(_DrawCloseComponent);

	var _DrawExtrudeComponent = __webpack_require__(141);

	var _DrawExtrudeComponent2 = _interopRequireDefault(_DrawExtrudeComponent);

	var _DrawExitComponent = __webpack_require__(142);

	var _DrawExitComponent2 = _interopRequireDefault(_DrawExitComponent);

	var _DrawBackComponent = __webpack_require__(143);

	var _DrawBackComponent2 = _interopRequireDefault(_DrawBackComponent);

	var _DrawClearComponent = __webpack_require__(144);

	var _DrawClearComponent2 = _interopRequireDefault(_DrawClearComponent);

	var _DrawSplineComponent = __webpack_require__(145);

	var _DrawSplineComponent2 = _interopRequireDefault(_DrawSplineComponent);

	var _DrawSelectComponent = __webpack_require__(146);

	var _DrawSelectComponent2 = _interopRequireDefault(_DrawSelectComponent);

	var _core = __webpack_require__(88);

	var _WorldAction = __webpack_require__(133);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(147);
	//data service
	// DrawDefaultInit.js


	var drawPanInit = new _DrawComponent2.default();
	new _core.Draggable(drawPanInit.element);
	drawPanInit.addChild(_DrawLineComponent2.default.defaultInit).addChild(_DrawSplineComponent2.default.defaultInit).addChild(_DrawCloseComponent2.default.defaultInit).addChild(_DrawExtrudeComponent2.default.defaultInit).addChild(_DrawSelectComponent2.default.defaultInit).addChild(_DrawBackComponent2.default.defaultInit).addChild(_DrawClearComponent2.default.defaultInit).addChild(_DrawExitComponent2.default.defaultInit);

	//ADD Data access layer
	_DrawExtrudeComponent2.default.defaultInit.setAfterDrawFunction(function (building) {
				_WorldAction.BuildingAction.add(building);
	});
	exports.drawPanInit = drawPanInit;

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DRAWSIGNAL = exports.DRAWMODE = undefined;

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(26);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _core = __webpack_require__(88);

	var _threejs = __webpack_require__(23);

	var THREE = _interopRequireWildcard(_threejs);

	var _PanComponent = __webpack_require__(138);

	var _PanComponent2 = _interopRequireDefault(_PanComponent);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DRAWMODE = exports.DRAWMODE = {
		'OFF': 0,
		'LINE': 'L',
		'CLOSE': 'C',
		'BACK': 'BACK',
		'EXIT': 'E',
		'EXTRUDE': 'EXTRUDE',
		'CLEAR': 'CLEAR',
		'SPLINE': 'SPLINE',
		'SELECT': 'SELECT'
	}; // Draw.component.js
	var DRAWSIGNAL = exports.DRAWSIGNAL = {
		'WILLDRAW': 'WILLDRAW',
		'DRAWDONE': 'DRAWDONE'
	};
	/**
	 * @class drawpan components,to group child compoent
	 * expose drawshape to child ,everytime child change
	 * shape should call father.updateDrawMesh();
	 * @param array backOperations is a stack store backData;
	 * @param {object} [children] [store the children of this pan.every child 
	 * should have drawMode property as index]
	 * @function reset fuction to over this time draw.
	 * @param {string} [drawMode] [if DrawMode not equal OFF will call child's draw()]
	 */

	var DrawPan = function (_Pan) {
		(0, _inherits3.default)(DrawPan, _Pan);

		function DrawPan(intersectObjects, intersectNames, world) {
			(0, _classCallCheck3.default)(this, DrawPan);

			var _this = (0, _possibleConstructorReturn3.default)(this, (DrawPan.__proto__ || Object.getPrototypeOf(DrawPan)).call(this, _core.DomUtil.createElement('div', 'draw-pan')));

			_this._intersectObjects = intersectObjects || [];
			_this.intersectNames = intersectNames;
			_this._raycaster = new THREE.Raycaster();
			_this.children = {};
			_this.reset();
			world && _this.resetWorld(world);
			return _this;
		}

		(0, _createClass3.default)(DrawPan, [{
			key: 'addChild',
			value: function addChild(child) {
				child.fatherPan = this;
				this.children[child.drawMode] = child;
				_core.DomUtil.appendChild(this.element, child.element);
				return this;
			}
		}, {
			key: 'removeChild',
			value: function removeChild(child) {
				_core.DomUtil.remove(child.element);
				child.fatherPan = null;
				delete this.children[child.drawMode];
				return this;
			}
		}, {
			key: 'removeAllChild',
			value: function removeAllChild() {}
		}, {
			key: 'removeDrawMesh',
			value: function removeDrawMesh() {
				if (this._drawMesh) {
					this.drawMeshGroup.remove(this._drawMesh);
					this.drawMesh = null;
				}
			}
		}, {
			key: 'getDrawGroup',
			value: function getDrawGroup() {
				return this.drawMeshGroup;
			}
		}, {
			key: 'resetWorld',
			value: function resetWorld(world) {
				this._world = world;
				this.drawMeshGroup = new THREE.Group();
				this.drawMeshGroup.name = 'drawpan_mesh';
				this._world.scene.add(this.drawMeshGroup);
				var canvas = this._world.renderer.domElement;
				var raycaster = this._raycaster;
				var camera = this._world.camera;
				//for backoperation
				this.backOperation = [];
				var clickFn = function clickFn(event) {
					if (this.drawMode !== DRAWMODE.OFF) {
						//for other component communicate
						this._world.signal.emit(DRAWSIGNAL.WILLDRAW);
						console.log('IN draw mode');
						var mouse = new THREE.Vector2(0, 0);
						var mousePosition = _core.DomUtil.getMousePosition(canvas, event);
						mouse.x = mousePosition.left / canvas.width * 2 - 1;
						mouse.y = -(mousePosition.top / canvas.height) * 2 + 1;
						raycaster.setFromCameraHP(mouse, camera);
						var intersects = raycaster.intersectObjects(this._intersectObjects, true);
						//console.log(this.children[this.drawMode]);
						this.children[this.drawMode].draw(intersects);
					}
				};
				_core.DomEvent.on(canvas, 'click', _core.Util.bind(clickFn, this));
				return this;
			}
		}, {
			key: 'resetIntersectObjects',
			value: function resetIntersectObjects(intersectObjects) {
				this._intersectObjects = intersectObjects;
				return this;
			}
		}, {
			key: 'updateDrawMesh',
			value: function updateDrawMesh() {
				this._drawMesh && this.drawMeshGroup.remove(this._drawMesh);
				this._drawMesh = drawShape(this.drawShape);
				//console.log('update');
				console.log(this._drawMesh);
				if (this._drawMesh) {
					this._drawMesh.translateZ(0.5);
					this._drawMesh.name = "draw-line";
					this.drawMeshGroup.add(this._drawMesh);
				}
			}
		}, {
			key: 'setStartPoint',
			value: function setStartPoint(ponit3) {
				if (this.drawShape._setStartPoint) {
					return true;
				}
				this.drawShape.moveTo(ponit3.x, ponit3.y);
				this.drawShape._setStartPoint = true;
				return false;
			}
			//@init new draw context

		}, {
			key: 'reset',
			value: function reset() {
				//@ to avoid the bug group will have empty mesh

				this.drawShape = new THREE.Shape();
				this.drawShape._setStartPoint = false;
				this._drawMesh = null;
				this.backOperation = this.backOperation || [];
				_core.Util.emptyArray(this.backOperation);
				//for component conmmunicate
				//this.drawMode=DRAWMODE.OFF;
				//this._world&&this._world.signal.emit("DRAWDONE");
				this.turnOffDrawMode();
			}
		}, {
			key: 'turnOffDrawMode',
			value: function turnOffDrawMode() {
				this.drawMode = DRAWMODE.OFF;
				//for component conmmunicate
				this._world && this._world.signal.emit(DRAWSIGNAL.DRAWDONE);
			}
		}, {
			key: 'addTo',
			value: function addTo(element) {
				_core.DomUtil.appendChild(element, this.element);
			}
		}]);
		return DrawPan;
	}(_PanComponent2.default);

	/**
	 * [drawShap draw the shap in Draw class]
	 * @param  {[type]} shape [description]
	 * @return {[mesh]}       [description]
	 */


	exports.default = DrawPan;
	function drawShape(shape) {
		if (shape._setStartPoint) {
			//when there is no curves in shape return null;
			var drawMesh = new THREE.Mesh();
			var featurePoints = getShapeFeaturePoints(shape);
			var pointGeometry = new THREE.Geometry();
			_core.Util.forEach(featurePoints, function (point) {
				pointGeometry.vertices.push(new THREE.Vector3(point.x, point.y, 0));
			});
			var pointsMesh = new THREE.Points(pointGeometry, new THREE.PointsMaterial({ color: 0x00ff00, size: 5 }));
			pointsMesh.name = 'featurePoints';
			drawMesh.add(pointsMesh);
			// solid line

			if (shape.curves.length > 0) {
				var points = shape.createPointsGeometry();
				var lineMesh = new THREE.Line(points, new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 10 }));
				lineMesh.name = 'featureLine';
				drawMesh.add(lineMesh);
			}
			return drawMesh;
		} else {
			return null;
		}
	}
	function getShapeFeaturePoints(shape) {
		var featurePoints = [];
		if (shape.curves.length === 0) {
			featurePoints.push(shape.currentPoint);
			return featurePoints;
		}
		_core.Util.forEach(shape.curves, function (curve, i) {
			if (curve instanceof THREE.LineCurve) {
				if (i === 0 || !curve.v1.equals(featurePoints[featurePoints.length - 1])) {
					featurePoints.push(curve.v1);
				}
				featurePoints.push(curve.v2);
			}
			if (curve instanceof THREE.SplineCurve) {
				if (i === 0 || !curve.points[0].equals(featurePoints[featurePoints.length - 1])) {
					featurePoints.push(curve.points[0]);
				}
				_core.Util.forEach(curve.points, function (point, i) {
					if (i !== 0) {
						featurePoints.push(point);
					}
				});
			}
		});
		//avoid bug when close a shap ,featuerPoint
		//TODO
		return featurePoints;
	}

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _core = __webpack_require__(88);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class class to init a pan can Drag;
	 */
	var Pan = function () {
		function Pan(ele) {
			(0, _classCallCheck3.default)(this, Pan);

			this.element = ele;
		}

		(0, _createClass3.default)(Pan, [{
			key: 'addChild',
			value: function addChild(childEle) {
				_core.DomUtil.appendElement(this.element, childEle);
			}
		}, {
			key: 'removeChild',
			value: function removeChild(childEle) {
				_core.DomUtil.remove(childEle);
			}
		}]);
		return Pan;
	}(); // DraggabelPan.component.js


	exports.default = Pan;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _core = __webpack_require__(88);

	var _DrawComponent = __webpack_require__(137);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// DrawLine.component.js
	var DrawLine = function () {
		function DrawLine(ele, intersectNames) {
			(0, _classCallCheck3.default)(this, DrawLine);

			this.element = ele;
			this.fatherPan = null;
			this.intersectNames = intersectNames;
			this.drawMode = _DrawComponent.DRAWMODE.LINE;
			var clickFn = function clickFn(e) {
				if (this.fatherPan) {
					console.log('click');
					this.fatherPan.drawMode = this.drawMode;
				}
				// console.log(e);
				_core.DomEvent.stop(e);
			};
			_core.DomEvent.on(this.element, 'click', _core.Util.bind(clickFn, this));
		}

		(0, _createClass3.default)(DrawLine, [{
			key: 'draw',
			value: function draw(intersects) {
				//console.log(intersects);
				var intersectNames = this.intersectNames || this.fatherPan.intersectNames;
				var intersect = intersects[0];
				if (intersect && intersectNames[intersect.object.name]) {
					/**
	     * TODO
	     * shape can only draw 2d,so we ignore z-cordinate
	     * this cause intersect can only be the ground which z-cordinate is 0;
	     * if have time ,should make it support 3d;
	     */
					var intersectPoint = intersect.point;
					//can use command model to write it;			
					if (this.fatherPan.setStartPoint(intersectPoint)) {
						//@for back-operation
						var opts = new THREE.Vector2();
						opts.copy(this.fatherPan.drawShape.currentPoint);
						var point2 = new THREE.Vector2(intersectPoint.x, intersectPoint.y);
						this.fatherPan.drawShape.lineTo(point2.x, point2.y);
						this.fatherPan.updateDrawMesh();
						//@ put into father backoperation stack
						this.putBackOperation(opts);
					} else {
						this.fatherPan.updateDrawMesh();
						this.putBackOperation();
					}
				}
			}
		}, {
			key: 'putBackOperation',
			value: function putBackOperation(opts) {
				if (this.fatherPan.backOperation) {
					this.fatherPan.backOperation.push({ obj: this, opts: opts });
				}
			}
		}, {
			key: 'backDraw',
			value: function backDraw(opts) {
				if (opts) {
					this.fatherPan.drawShape.moveTo(opts.x, opts.y);
					this.fatherPan.drawShape.curves.pop();
				} else {
					this.fatherPan.drawShape._setStartPoint = false;
				}
				this.fatherPan.updateDrawMesh();
			}
		}, {
			key: 'setIntersectNamaes',
			value: function setIntersectNamaes(intersectNames) {
				this.intersectNames = intersectNames;
			}
		}]);
		return DrawLine;
	}();

	exports.default = DrawLine;

	var drawLineEle = _core.DomUtil.createElement("div", "line", "<span>线</span>");
	DrawLine.defaultInit = new DrawLine(drawLineEle, { 'land': true });

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _core = __webpack_require__(88);

	var _DrawComponent = __webpack_require__(137);

	var _plugin = __webpack_require__(103);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DrawClose = function () {
		function DrawClose(ele) {
			(0, _classCallCheck3.default)(this, DrawClose);

			this.element = ele;
			this.fatherPan = null;
			this.drawMode = _DrawComponent.DRAWMODE.CLOSE;
			var clickFn = function clickFn(e) {
				if (this.fatherPan) {
					//@for back-operation
					var opts = new THREE.Vector2();
					opts.copy(this.fatherPan.drawShape.currentPoint);
					var curves = this.fatherPan.drawShape.curves;
					if (curves.length > 0) {
						if (curves.length === 1 && curves[0] instanceof THREE.LineCurve) {
							_plugin.message.error("a line can't close");
						} else {
							this.fatherPan.drawMode = _DrawComponent.DRAWMODE.OFF;
							this.fatherPan.drawShape.closePath();
							this.fatherPan.updateDrawMesh();
							this.putBackOperation(opts);
						}
					} else {
						_plugin.message.error('no curve to close');
					}
				}
				_core.DomEvent.stop(e);
			};
			_core.DomEvent.on(this.element, 'click', _core.Util.bind(clickFn, this));
		}

		(0, _createClass3.default)(DrawClose, [{
			key: 'putBackOperation',
			value: function putBackOperation(opts) {
				if (this.fatherPan.backOperation) {
					this.fatherPan.backOperation.push({ obj: this, opts: opts });
				}
			}
		}, {
			key: 'backDraw',
			value: function backDraw(opts) {
				this.fatherPan.drawShape.moveTo(opts.x, opts.y);
				this.fatherPan.drawShape.curves.pop();
				this.fatherPan.updateDrawMesh();
			}
		}]);
		return DrawClose;
	}(); // DrawClose.component.js


	exports.default = DrawClose;

	var drawCloseEle = _core.DomUtil.createElement("div", "close", "<span>闭合</span>");
	DrawClose.defaultInit = new DrawClose(drawCloseEle);

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _core = __webpack_require__(88);

	var _DrawComponent = __webpack_require__(137);

	var _threejs = __webpack_require__(23);

	var THREE = _interopRequireWildcard(_threejs);

	var _plugin = __webpack_require__(103);

	var _buildingTool = __webpack_require__(130);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DrawExtrude = function () {
		function DrawExtrude(ele) {
			(0, _classCallCheck3.default)(this, DrawExtrude);

			this.element = ele;
			this.fatherPan = null;
			this.drawMode = _DrawComponent.DRAWMODE.EXTRUDE;
			var clickFn = function clickFn(e) {
				if (this.fatherPan) {
					var curves = this.fatherPan.drawShape.curves;
					if (curves.length > 0) {
						if (curves.length === 1 && curves[0] instanceof THREE.LineCurve) {
							_plugin.message.error("a line can't build");
						} else {
							var building = this.draw();
							this.fatherPan.removeDrawMesh();
							this.fatherPan.reset();
							//hock for after draw,use this to save building data
							//can use signal 
							this._afterDraw && this._afterDraw(building);
						}
					} else {
						_plugin.message.error('no curve to build');
					}
				}
				_core.DomEvent.stop(e);
			};
			_core.DomEvent.on(this.element, 'click', _core.Util.bind(clickFn, this));
		}

		(0, _createClass3.default)(DrawExtrude, [{
			key: 'draw',
			value: function draw() {
				var shape = this.fatherPan.drawShape;
				console.log(shape);
				var buildingMesh = (0, _buildingTool.createBuilding)(shape);
				// TODO data-view not view-data
				//this.fatherPan.drawMeshGroup.add(buildingMesh);
				console.log(this.fatherPan._world.scene);
				return buildingMesh;
			}
		}, {
			key: 'setAfterDrawFunction',
			value: function setAfterDrawFunction(fn) {
				this._afterDraw = fn;
			}
		}]);
		return DrawExtrude;
	}(); // DrawExtrude.component.js


	exports.default = DrawExtrude;

	var drawExtrudeEle = _core.DomUtil.createElement("div", "extrude", "<span>建楼</span>");
	DrawExtrude.defaultInit = new DrawExtrude(drawExtrudeEle);

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _core = __webpack_require__(88);

	var _DrawComponent = __webpack_require__(137);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// DrawExit.js
	var DrawExit = function DrawExit(ele) {
		(0, _classCallCheck3.default)(this, DrawExit);

		this.element = ele;
		this.fatherPan = null;
		this.drawMode = _DrawComponent.DRAWMODE.EXIT;
		var clickFn = function clickFn(e) {
			if (this.fatherPan) {
				this.fatherPan.reset();
			}
			_core.DomEvent.stop(e);
		};
		_core.DomEvent.on(this.element, 'click', _core.Util.bind(clickFn, this));
	};

	exports.default = DrawExit;

	var drawExitEle = _core.DomUtil.createElement("div", "exit", "<span>退出</span>");
	DrawExit.defaultInit = new DrawExit(drawExitEle);

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _core = __webpack_require__(88);

	var _DrawComponent = __webpack_require__(137);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// DrawBack.component.js
	var DrawBack = function DrawBack(ele) {
		(0, _classCallCheck3.default)(this, DrawBack);

		this.element = ele;
		this.fatherPan = null;
		this.drawMode = _DrawComponent.DRAWMODE.BACK;
		var clickFn = function clickFn(e) {
			if (this.fatherPan) {
				var backOperation = this.fatherPan.backOperation.pop();
				if (backOperation) {
					backOperation.obj.backDraw(backOperation.opts);
				} else alert('has no operation to back');
			}
			_core.DomEvent.stop(e);
		};
		_core.DomEvent.on(this.element, 'click', _core.Util.bind(clickFn, this));
	};

	exports.default = DrawBack;

	var drawBackEle = _core.DomUtil.createElement("div", "back", "<span>回退</span>");
	DrawBack.defaultInit = new DrawBack(drawBackEle);

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _DrawComponent = __webpack_require__(137);

	var _core = __webpack_require__(88);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class clearcomponent to clear father.drawMesh and father.drawShape father.backOperation
	 */
	// DrawClear.component.js
	var DrawClear = function DrawClear(ele) {
		(0, _classCallCheck3.default)(this, DrawClear);

		this.fatherPan = null;
		this.element = ele;
		this.drawMode = _DrawComponent.DRAWMODE.CLEAR;
		var clickFn = function clickFn(e) {
			if (this.fatherPan) {
				_core.Util.emptyArray(this.fatherPan.backOperation);
				_core.Util.emptyArray(this.fatherPan.drawShape.curves);
				this.fatherPan.drawShape._setStartPoint = false;
				this.fatherPan.updateDrawMesh();
			}
			_core.DomEvent.stop(e);
		};
		_core.DomEvent.on(this.element, 'click', _core.Util.bind(clickFn, this));
	};

	exports.default = DrawClear;

	var drawClearEle = _core.DomUtil.createElement("div", "clear", "<span>清除</span>");
	DrawClear.defaultInit = new DrawClear(drawClearEle);

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _DrawComponent = __webpack_require__(137);

	var _core = __webpack_require__(88);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// DrawSpline.component.js
	var DrawSpline = function () {
		function DrawSpline(ele, intersectNames) {
			(0, _classCallCheck3.default)(this, DrawSpline);

			this.element = ele;
			this.fatherPan = null;
			this.drawMode = _DrawComponent.DRAWMODE.SPLINE;
			this.intersectNames = intersectNames;
			var clickFn = function clickFn(e) {
				if (this.fatherPan) {
					this.fatherPan.drawMode = this.drawMode;
				}
				_core.DomEvent.stop(e);
			};
			_core.DomEvent.on(this.element, 'click', _core.Util.bind(clickFn, this));
		}

		(0, _createClass3.default)(DrawSpline, [{
			key: 'draw',
			value: function draw(intersects) {
				var intersectNames = this.intersectNames || this.fatherPan.intersectNames;
				var intersect = intersects[0];
				if (intersect && intersectNames[intersect.object.name]) {
					var intersectPoint = intersect.point;
					if (this.fatherPan.setStartPoint(intersectPoint)) {
						//@for back-operation
						var opts = new THREE.Vector2();
						opts.copy(this.fatherPan.drawShape.currentPoint);
						var point2 = new THREE.Vector2(intersectPoint.x, intersectPoint.y);
						// this.fatherPan.drawShape.lineTo(point2.x,point2.y);
						var curves = this.fatherPan.drawShape.curves;
						//if have splinecurve jast concat it
						if (curves[curves.length - 1] instanceof THREE.SplineCurve) {
							curves[curves.length - 1].points.push(point2);
							this.fatherPan.drawShape.moveTo(point2.x, point2.y);
						} else {
							this.fatherPan.drawShape.splineThru([point2]);
						}
						this.fatherPan.updateDrawMesh();
						//@ put into father backoperation stack
						this.putBackOperation(opts);
					} else {
						this.fatherPan.updateDrawMesh();
						this.putBackOperation();
					}
				}
			}
		}, {
			key: 'putBackOperation',
			value: function putBackOperation(opts) {
				if (this.fatherPan.backOperation) {
					this.fatherPan.backOperation.push({ obj: this, opts: opts });
				}
			}
		}, {
			key: 'backDraw',
			value: function backDraw(opts) {
				if (opts) {
					var curves = this.fatherPan.drawShape.curves;
					var splineCurve = curves[curves.length - 1];
					this.fatherPan.drawShape.moveTo(opts.x, opts.y);
					splineCurve.points.pop();
					//if there only one point in splitcurve we can remove it;
					if (splineCurve.points.length === 1) {
						curves.pop();
					}
				} else {
					this.fatherPan.drawShape._setStartPoint = false;
				}
				this.fatherPan.updateDrawMesh();
			}
		}, {
			key: 'setIntersectNamaes',
			value: function setIntersectNamaes(intersectNames) {
				this.intersectNames = intersectNames;
			}
		}]);
		return DrawSpline;
	}();

	exports.default = DrawSpline;


	var drawSplineEle = _core.DomUtil.createElement("div", "spline", "<span>样条</span>");
	DrawSpline.defaultInit = new DrawSpline(drawSplineEle, { 'land': true });

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _core = __webpack_require__(88);

	var _DrawComponent = __webpack_require__(137);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// DrawSelect.component.js
	//turn off father's drawMode
	var DrawSelect = function DrawSelect(ele) {
		(0, _classCallCheck3.default)(this, DrawSelect);

		this.element = ele;
		this.drawMode = _DrawComponent.DRAWMODE.SELECT;
		this.fatherPan = null;
		var clickFn = function clickFn(e) {
			if (this.fatherPan) {
				this.fatherPan.turnOffDrawMode();
			}
			_core.DomEvent.stop(e);
		};
		_core.DomEvent.on(this.element, 'click', _core.Util.bind(clickFn, this));
	};

	exports.default = DrawSelect;

	var drawSelectEle = _core.DomUtil.createElement("div", "select", "<span>选择</span>");
	DrawSelect.defaultInit = new DrawSelect(drawSelectEle);

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(148);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(120)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./Draw.component.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./Draw.component.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(119)();
	// imports


	// module
	exports.push([module.id, ".draw-pan {\n  position: absolute;\n  background-color: #5285b6;\n  padding: 20px 0;\n  color: #ffffff;\n  top: 50px;\n  right: 300px;\n  font-weight: blod;\n  font-size: 20px;\n  box-shadow: -1px 2px 3px rgba(0, 0, 0, 0.15);\n}\n.draw-pan div {\n  text-align: center;\n  padding: 5px;\n}\n.draw-pan:hover {\n  cursor: pointer;\n}\n", ""]);

	// exports


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _menuFileComponent = __webpack_require__(150);

	var _menuFileComponent2 = _interopRequireDefault(_menuFileComponent);

	var _core = __webpack_require__(88);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// MenuDefaultInit.js
	var menuEle = document.getElementsByClassName('menu')[0];
	console.log(menuEle);
	//file
	var fileMenu = new _menuFileComponent2.default();
	console.log(fileMenu);
	_core.DomUtil.appendChild(menuEle, fileMenu.element);

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _core = __webpack_require__(88);

	var _menuFileImportComponent = __webpack_require__(151);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// menu.importdata.component.js
	var lang = {
	  "FILE": '文件',
	  'IMPORT': '导入',
	  'BUILDING': '建筑',
	  'GREEN': '绿化',
	  'MODEL': '模型'
	};

	var MenuFile = function MenuFile() {
	  (0, _classCallCheck3.default)(this, MenuFile);

	  this.element = _core.DomUtil.createElement('span', 'menu-bar', lang.FILE);
	  console.log(this.element);
	  var menuFile = _core.DomUtil.create('div', 'menu-file', this.element);
	  var importText = _core.DomUtil.createElement('div', 'item item-text', lang.IMPORT);
	  var importBuilding = new _menuFileImportComponent.ImportItem(lang.BUILDING, _menuFileImportComponent.IMPORTTYPE.BUILDING);
	  var importGreen = new _menuFileImportComponent.ImportItem(lang.GREEN, _menuFileImportComponent.IMPORTTYPE.GREEN);
	  var importModel = new _menuFileImportComponent.ImportItem(lang.MODEL, _menuFileImportComponent.IMPORTTYPE.MODEL);
	  console.log(importBuilding, importGreen, importModel);
	  _core.DomUtil.appendChild(menuFile, [importText, importBuilding.element, importGreen.element, importModel.element]);
	};

	exports.default = MenuFile;

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ImportItem = exports.IMPORTTYPE = undefined;

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _core = __webpack_require__(88);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var IMPORTTYPE = exports.IMPORTTYPE = {
		"BUILDING": 0,
		"GREEN": 1,
		"MODEL": 2
	}; // menuFile.import.component.js

	var ImportItem = exports.ImportItem = function ImportItem(text, type) {
		(0, _classCallCheck3.default)(this, ImportItem);

		this.element = _core.DomUtil.createElement('div', 'item', text);
		_core.DomEvent.on(this.element, 'click', function () {
			console.log(type);
		});
	};

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.GroundLayer = exports.Ground = undefined;

	var _possibleConstructorReturn2 = __webpack_require__(26);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _threejs = __webpack_require__(23);

	var THREE = _interopRequireWildcard(_threejs);

	var _TileLayer2 = __webpack_require__(153);

	var _MercatorProjection = __webpack_require__(25);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class create a  landMesh;
	 */
	var Ground = exports.Ground = function () {
		function Ground(width, textures) {
			(0, _classCallCheck3.default)(this, Ground);

			this.width = width;
			if (textures) {
				var loader = new THREE.TextureLoader();
				this.groundTexture = loader.load(textures);
				this.groundTexture.wrapS = this.groundTexture.wrapT = THREE.RepeatWrapping;
				this.groundTexture.repeat.set(1, 1);
			}
			var geometry = new THREE.PlaneGeometry(2 * width, 2 * width);
			var material = new THREE.MeshLambertMaterial({ map: this.groundTexture });
			this.instance = new THREE.Mesh(geometry, material);
			this.instance.receiveShadow = true;
			this.instance.name = 'land';
			return this;
		}

		(0, _createClass3.default)(Ground, [{
			key: 'getInstance',
			value: function getInstance() {
				return this.instance;
			}
		}]);
		return Ground;
	}(); // ground.js


	var GroundLayer = exports.GroundLayer = function (_TileLayer) {
		(0, _inherits3.default)(GroundLayer, _TileLayer);

		function GroundLayer() {
			var _ret;

			(0, _classCallCheck3.default)(this, GroundLayer);

			var groundGroup = new THREE.Group();
			groundGroup.name = 'ground_group';

			var _this = (0, _possibleConstructorReturn3.default)(this, (GroundLayer.__proto__ || Object.getPrototypeOf(GroundLayer)).call(this, groundGroup, '地面'));

			_this.setSelectable(false).setDeleteable(false).setClearable(false);
			return _ret = _this, (0, _possibleConstructorReturn3.default)(_this, _ret);
		}

		(0, _createClass3.default)(GroundLayer, [{
			key: 'add',
			value: function add(ground) {
				ground.getInstance ? this.object.add(ground.getInstance()) : this.object.add(ground);
			}
		}, {
			key: 'getInstance',
			value: function getInstance() {
				return this.object;
			}
		}]);
		return GroundLayer;
	}(_TileLayer2.TileLayer);

	// export class GroundLayer extends Layer{
	// 	constructor(){
	// 		var groundGroup=new THREE.Group();
	// 		groundGroup.name='ground_group';
	// 		super(groundGroup,'地面');
	// 		this.setSelectable(false).setDeleteable(false).setClearable(false);
	// 		return this;
	// 	}
	// 	add(ground){
	// 		ground.getInstance?this.object.add(ground.getInstance()):this.object.add(ground);
	// 	}
	// 	getInstance(){
	//     	return this.object;
	//     }
	//     getTile(x,y,z)
	//     {

	//     	var loader = new THREE.TextureLoader();
	//     	var url='http://shangetu3.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&udt=20150504&app=webearth2&v=009&udt=20150601';
	//     	//var url='http://online3.map.bdimg.com/tile/?qt=tile&x='+x+'&y='+y+'&z='+z+'&styles=pl&scaler=1&udt=20161216';
	// 		var tileTexture = loader.load(Util.template(url,{x:x,y:y,z:z}));
	// 		tileTexture.wrapS = tileTexture.wrapT = THREE.RepeatWrapping;
	//         tileTexture.repeat.set(1, 1);
	//     	var geometry = new THREE.PlaneGeometry(256*Math.pow(2,18-z),256*Math.pow(2,18-z));
	// 	    var material = new THREE.MeshLambertMaterial({ map:tileTexture});
	// 	    var tile= new THREE.Mesh(geometry, material);
	// 	    tile.receiveShadow = true;
	// 	    tile.name = 'land';
	// 	    tile.userData.id=x+'_'+y+'_'+z;
	// 	    tile.position.set(256*(x+0.5)*Math.pow(2,18-z),256*(y+0.5)*Math.pow(2,18-z),0);
	// 	    return tile;
	//     }
	//     loadTile(world){
	//     	var plane=new THREE.Plane(new THREE.Vector3(0,0,1),0);
	//     	var raycaster = new THREE.Raycaster();
	// 		var mouse = new THREE.Vector2();
	// 		var camera=world.camera;
	// 		var canvas=world.renderer.domElement;
	// 		var mouseState='off';
	// 		var scope=this;
	// 		DomEvent.on(canvas,'mousedown',function(){
	// 			mouseState='down';
	// 		});
	// 		DomEvent.on(canvas,'mousemove',function(e){
	// 			if(mouseState=='down'&&(e.movementX!==0||e.movementY!==0))
	// 			{
	// 				mouseState='move';
	// 			}
	// 		});
	// 		DomEvent.on(canvas,'mouseup',function(){
	// 			if(mouseState=='move')
	// 			{
	// 				refreshTile();
	// 			}
	// 		});
	// 		function refreshTile(){
	// 			mouse.set(1,1);
	// 			raycaster.setFromCamera(mouse,camera);		
	// 			var ray1=raycaster.ray.clone();
	// 			mouse.set(1,-1);
	// 			raycaster.setFromCamera(mouse,camera);
	// 			var ray2=raycaster.ray.clone();
	// 			mouse.set(-1,-1);
	// 			raycaster.setFromCamera(mouse,camera);
	// 			var ray3=raycaster.ray.clone();
	// 			mouse.set(-1,1);
	// 			raycaster.setFromCamera(mouse,camera);
	// 			var ray4=raycaster.ray.clone();
	// 			var point1=ray1.intersectPlane(plane);
	// 			var point2=ray2.intersectPlane(plane);
	// 			var point3=ray3.intersectPlane(plane);
	// 			var point4=ray4.intersectPlane(plane);
	// 			var points=[point1,point2,point3,point4];
	// 			var box=Box2d(points);
	// 			if(box)
	// 			{
	// 				var z=18-Math.log2(Math.max(box.xWidth,box.yWidth)/256)+2;
	// 				z=Math.min(18,Math.floor(z));
	// 				var tileNum={};
	// 				tileNum.xMin=Math.floor(box.xMin/(256*Math.pow(2,18-z)));
	// 				tileNum.yMin=Math.floor(box.yMin/(256*Math.pow(2,18-z)));
	// 				tileNum.xMax=Math.floor(box.xMax/(256*Math.pow(2,18-z)));
	// 				tileNum.yMax=Math.floor(box.yMax/(256*Math.pow(2,18-z)));
	// 				tileNum.xWidth=tileNum.xMax-tileNum.xMin;
	// 				tileNum.yWidth=tileNum.yMax-tileNum.yMin;
	// 				tileNum.z=z;
	// 				console.log(tileNum);
	// 				Util.forEach(scope.object.children,function(child){
	// 					child.userData.old=true;
	// 				});
	// 				for(var x=tileNum.xMin-1;x<=tileNum.xMax+1;x++)
	// 				{
	// 					for(var y=tileNum.yMin-1;y<=tileNum.yMax+1;y++)
	// 					{
	// 						var tile=getByUserDataId(scope.object,x+'_'+y+'_'+z);
	// 						if(tile)
	// 						{
	// 							tile.userData.old=false;
	// 						}
	// 						else{scope.object.add(scope.getTile(x,y,z));}
	// 					}
	// 				}
	// 				var oldChild=[];
	// 				for(var i=0;i<scope.object.children.length;i++){
	// 					var object=scope.object.children[i];
	// 					if(object.userData.old) {oldChild.push(object);}
	// 				}
	// 				Util.forEach(oldChild,function(child){
	// 					scope.object.remove(child);
	// 				})

	// 			}

	// 		}		
	//     }
	// }
	// function Box2d(ary)
	// {
	// 	var boundBox={
	// 		xMin:Infinity,
	// 		yMin:Infinity,
	// 		xMax:-Infinity,
	// 		yMax:-Infinity,
	// 	};

	// 	for(var i=0;i<ary.length;i++)
	// 	{
	// 		//if ary[i]==null||undefined return null;
	// 		if(!ary[i]) return null;
	// 		boundBox.xMin=Math.min(ary[i].x,boundBox.xMin);
	// 		boundBox.yMin=Math.min(ary[i].y,boundBox.yMin);
	// 		boundBox.xMax=Math.max(ary[i].x,boundBox.xMax);
	// 		boundBox.yMax=Math.max(ary[i].y,boundBox.yMax);
	// 	}
	// 	boundBox.xWidth=boundBox.xMax-boundBox.xMin;
	// 	boundBox.yWidth=boundBox.yMax-boundBox.yMin;
	// 	return boundBox;
	// }
	// function getByUserDataId(object,id){
	// 	if(object.userData.id===id)
	// 	{
	// 		return object;
	// 	}
	// 	for(var i=0;i<object.children.length;i++)
	// 	{
	// 		var obj=getByUserDataId(object.children[i],id);
	// 		if(obj){
	// 			return obj
	// 		}
	// 	}
	// 	return null;
	// }

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.TileLayer = undefined;

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(26);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Layer2 = __webpack_require__(154);

	var _core = __webpack_require__(88);

	var _threejs = __webpack_require__(23);

	var THREE = _interopRequireWildcard(_threejs);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TileLayer = exports.TileLayer = function (_Layer) {
		(0, _inherits3.default)(TileLayer, _Layer);

		function TileLayer(object, name, url) {
			(0, _classCallCheck3.default)(this, TileLayer);

			var _this = (0, _possibleConstructorReturn3.default)(this, (TileLayer.__proto__ || Object.getPrototypeOf(TileLayer)).call(this, object, name));

			_this.resetUrl(url);
			_this._plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
			_this._raycaster = new THREE.Raycaster();
			_this._mouse = new THREE.Vector2();
			return _this;
		}

		(0, _createClass3.default)(TileLayer, [{
			key: 'resetUrl',
			value: function resetUrl(url) {
				this.url = url || 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png';
			}
		}, {
			key: 'destoryWorld',
			value: function destoryWorld() {
				if (this._world) {
					_core.DomEvent.off(this._world.renderer.domElement, 'mouseup', this._mouseupFn);
					_core.DomEvent.off(this._world.renderer.domElement, 'mousedown', this._mousedownFn);
					_core.DomEvent.off(this._world.renderer.domElement, 'mousemove', this._mousemoveFn);
					this._world.signal.removeListener('CAMERACHANGE', this._camerachangeFn);
					this._world = null;
				}
			}
		}, {
			key: 'resetWorld',
			value: function resetWorld(world) {
				this.destoryWorld();
				this._world = world;
				var canvas = world.renderer.domElement;
				var mouseState = 'off';
				this._mousedownFn = function () {
					mouseState = 'down';
				};
				this._mousemoveFn = function (e) {
					if (mouseState == 'down' && (Math.abs(e.movementX) > 2 || Math.abs(e.movementY) > 2)) {
						mouseState = 'move';
					}
				};
				this._mouseupFn = _core.Util.bind(function () {
					if (mouseState == 'move') {
						this.refreshTile();
					}
				}, this);
				_core.DomEvent.on(canvas, 'mousedown', this._mousedownFn);
				_core.DomEvent.on(canvas, 'mousemove', this._mousemoveFn);
				_core.DomEvent.on(canvas, 'mouseup', this._mouseupFn);
				this._camerachangeFn = _core.Util.bind(function () {
					this.refreshTile();
				}, this);
				this._world.signal.on('CAMERACHANGE', this._camerachangeFn);
			}
		}, {
			key: 'refreshTile',
			value: function refreshTile() {
				var camera = this._world.camera;
				this._mouse.set(1, 1);
				this._raycaster.setFromCameraHP(this._mouse, camera);
				var ray1 = this._raycaster.ray.clone();
				this._mouse.set(1, -1);
				this._raycaster.setFromCameraHP(this._mouse, camera);
				var ray2 = this._raycaster.ray.clone();
				this._mouse.set(-1, -1);
				this._raycaster.setFromCameraHP(this._mouse, camera);
				var ray3 = this._raycaster.ray.clone();
				this._mouse.set(-1, 1);
				this._raycaster.setFromCameraHP(this._mouse, camera);
				var ray4 = this._raycaster.ray.clone();
				var point1 = ray1.intersectPlane(this._plane);
				var point2 = ray2.intersectPlane(this._plane);
				var point3 = ray3.intersectPlane(this._plane);
				var point4 = ray4.intersectPlane(this._plane);
				var points = [point1, point2, point3, point4];
				var box = Box2d(points);
				this.loadBoxTile(box);
			}
		}, {
			key: 'getTile',
			value: function getTile(x, y, z) {
				var loader = new THREE.TextureLoader();
				//var url='http://online3.map.bdimg.com/tile/?qt=tile&x='+x+'&y='+y+'&z='+z+'&styles=pl&scaler=1&udt=20161216';
				var tileTexture = loader.load(_core.Util.template(this.url, { x: x, y: y, z: z }));
				tileTexture.wrapS = tileTexture.wrapT = THREE.RepeatWrapping;
				tileTexture.repeat.set(1, 1);
				var geometry = new THREE.PlaneGeometry(256 * Math.pow(2, 18 - z), 256 * Math.pow(2, 18 - z));
				var material = new THREE.MeshLambertMaterial({ map: tileTexture });
				var tile = new THREE.Mesh(geometry, material);
				tile.userData.id = x + '_' + y + '_' + z;
				return tile;
			}
			//TMS map Tile

		}, {
			key: 'loadBoxTile',
			value: function loadBoxTile(box) {
				if (box) {
					var z = 18 - Math.log2(Math.max(box.xWidth, box.yWidth) / 256) + 2;
					z = Math.max(0, Math.min(18, Math.floor(z)));
					var tileNum = {};
					tileNum.xMin = Math.floor((33554432 + box.xMin) / (256 * Math.pow(2, 18 - z)));
					tileNum.yMin = Math.floor((33554432 - box.yMax) / (256 * Math.pow(2, 18 - z)));
					tileNum.xMax = Math.floor((33554432 + box.xMax) / (256 * Math.pow(2, 18 - z)));
					tileNum.yMax = Math.floor((33554432 - box.yMin) / (256 * Math.pow(2, 18 - z)));
					tileNum.xWidth = tileNum.xMax - tileNum.xMin;
					tileNum.yWidth = tileNum.yMax - tileNum.yMin;
					tileNum.z = z;
					console.log(tileNum);
					_core.Util.forEach(this.object.children, function (child) {
						child.userData.old = true;
					});
					for (var x = tileNum.xMin - 1; x <= tileNum.xMax + 1; x++) {
						for (var y = tileNum.yMin - 1; y <= tileNum.yMax + 1; y++) {
							var tile = getByUserDataId(this.object, x + '_' + y + '_' + z);
							if (tile) {
								tile.userData.old = false;
							} else {
								if (x >= 0 && y >= 0 && z >= 0 && x < Math.pow(2, z) && y < Math.pow(2, z)) {
									var tile = this.getTile(x, y, z);
									tile.position.set((x + 0.5) * Math.pow(2, 26 - z) - 33554432, 33554432 - (y + 0.5) * Math.pow(2, 26 - z), 0);
									tile.receiveShadow = true;
									tile.name = 'land';
									this.object.add(tile);
								}
							}
						}
					}
					var oldChild = [];
					for (var i = 0; i < this.object.children.length; i++) {
						var object = this.object.children[i];
						if (object.userData.old) {
							oldChild.push(object);
						}
					}
					_core.Util.forEach(oldChild, _core.Util.bind(function (child) {
						this.object.remove(child);
					}, this));
				}
			}
		}]);
		return TileLayer;
	}(_Layer2.Layer); // TileLayer.js


	function Box2d(ary) {
		var boundBox = {
			xMin: Infinity,
			yMin: Infinity,
			xMax: -Infinity,
			yMax: -Infinity
		};

		for (var i = 0; i < ary.length; i++) {
			//if ary[i]==null||undefined return null;
			if (!ary[i]) return null;
			boundBox.xMin = Math.min(ary[i].x, boundBox.xMin);
			boundBox.yMin = Math.min(ary[i].y, boundBox.yMin);
			boundBox.xMax = Math.max(ary[i].x, boundBox.xMax);
			boundBox.yMax = Math.max(ary[i].y, boundBox.yMax);
		}
		boundBox.xWidth = boundBox.xMax - boundBox.xMin;
		boundBox.yWidth = boundBox.yMax - boundBox.yMin;
		return boundBox;
	}
	function getByUserDataId(object, id) {
		if (object.userData.id === id) {
			return object;
		}
		for (var i = 0; i < object.children.length; i++) {
			var obj = getByUserDataId(object.children[i], id);
			if (obj) {
				return obj;
			}
		}
		return null;
	}

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Layer = undefined;

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _core = __webpack_require__(88);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Layer = exports.Layer = function () {
		function Layer(object, name) {
			(0, _classCallCheck3.default)(this, Layer);

			this.object = object;
			this.name = name;
			this.selectable = true;
			this.deleteable = true;
			this.clearable = true;
			this.selected = false;
			return this;
		}

		(0, _createClass3.default)(Layer, [{
			key: 'add',
			value: function add(object) {
				if (this.object) {
					this.object.add(object);
				}
			}
		}, {
			key: 'remove',
			value: function remove(object) {
				if (this.object) {
					this.object.remove(object);
				}
			}
		}, {
			key: 'setSelectable',
			value: function setSelectable(flag) {
				this.selectable = flag;
				return this;
			}
		}, {
			key: 'setDeleteable',
			value: function setDeleteable(flag) {
				this.deleteable = flag;
				return this;
			}
		}, {
			key: 'setClearable',
			value: function setClearable(flag) {
				this.clearable = flag;
				return this;
			}
		}, {
			key: 'clear',
			value: function clear() {
				if (this.object) {
					_core.Util.emptyArray(this.object.children);
					return true;
				}
				return false;
			}
		}, {
			key: 'toggleVisible',
			value: function toggleVisible() {
				if (this.object) {
					this.object.visible = !this.object.visible;
					return this.object.visible;
				}
				return false;
			}
		}]);
		return Layer;
	}(); // Layer.js

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.LayerCollection = undefined;

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _threejs = __webpack_require__(23);

	var THREE = _interopRequireWildcard(_threejs);

	var _Layer = __webpack_require__(154);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// LayerCollection.js
	var LayerCollection = exports.LayerCollection = function () {
		function LayerCollection() {
			(0, _classCallCheck3.default)(this, LayerCollection);

			this.layers = [];
			var defaultObject = new THREE.Group();
			defaultObject.name = 'default';
			this.defaultLayer = new _Layer.Layer(defaultObject, '默认').setDeleteable(false);
			this.layers.push(this.defaultLayer);
		}

		(0, _createClass3.default)(LayerCollection, [{
			key: 'addLayer',
			value: function addLayer(layer) {
				if (this.getLayerByName(layer.name)) {
					return false;
				}
				this.layers.push(layer);
				return true;
			}
		}, {
			key: 'setSelectedLayer',
			value: function setSelectedLayer(layer) {
				var layers = this.getLayers();
				for (var i = 0; i < layers.length; i++) {
					layers[i].selected = false;
					if (layer === layers[i] && layer.selectable) {
						layer.selected = true;
					}
				}
			}
		}, {
			key: 'getSelectedLayer',
			value: function getSelectedLayer() {
				var layers = this.getLayers();
				for (var i = 0; i < layers.length; i++) {
					if (layers[i].selected && layers[i].selectable) {
						return layers[i];
					}
				}
				return this.defaultLayer;
			}
		}, {
			key: 'newLayer',
			value: function newLayer(name) {
				if (this.getLayerByName(name)) {
					return null;
				}
				var object = new THREE.Group();
				object.name = name;
				var layer = new _Layer.Layer(object, name);
				this.layers.push(layer);
				return layer;
			}
		}, {
			key: 'getLayers',
			value: function getLayers() {
				return this.layers;
			}
		}, {
			key: 'getLayerByName',
			value: function getLayerByName(name) {
				for (var i = 0; i < this.layers.length; i++) {
					if (this.layers[i].name === name) {
						return this.layers[i];
					}
				}
				if (name === '' || name === undefined || name === null) {
					return true;
				}
				return null;
			}
		}]);
		return LayerCollection;
	}();

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jsonTool = __webpack_require__(157);

	var _WorldAction = __webpack_require__(133);

	var _buildingTool = __webpack_require__(130);

	var _threejs = __webpack_require__(23);

	var THREE = _interopRequireWildcard(_threejs);

	var _MercatorProjection = __webpack_require__(25);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var building = {
		"type": "FeatureCollection",
		"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },

		"features": [{ "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 113.296907, "SHAPE_Area": 560.081981 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35449009620618, 30.527816391711596], [114.35454723362078, 30.527920339102302], [114.35496014651278, 30.527750244254424], [114.35490300876195, 30.52764629704475], [114.35449009620618, 30.527816391711596]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 175.692390, "SHAPE_Area": 935.927801 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35167851936167, 30.52934461824378], [114.35168277649913, 30.52945646334981], [114.35246841697921, 30.529434054881264], [114.35246415894004, 30.529322208905548], [114.35167851936167, 30.52934461824378]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 209.723965, "SHAPE_Area": 1530.954839 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35436350765501, 30.527770669068982], [114.35358033355041, 30.52800362776345], [114.35361101006966, 30.528110654700189], [114.35397894820605, 30.528005600570179], [114.35401133287196, 30.528117205023598], [114.35443760859286, 30.527982396759761], [114.35436350765501, 30.527770669068982]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 356.050160, "SHAPE_Area": 5235.916358 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35195653471628, 30.528661601526053], [114.35200992763875, 30.528789378842145], [114.35341473897822, 30.528760755068081], [114.35343290319891, 30.528294843035813], [114.35338412660037, 30.528224331955442], [114.35195653471628, 30.528661601526053]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 612.642048, "SHAPE_Area": 4543.175575 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35161295319097, 30.529158125193007], [114.35171661139792, 30.529157845413636], [114.35171856278207, 30.529087197669359], [114.35331078406931, 30.529040885503793], [114.35329625713378, 30.52929294882663], [114.3526390786797, 30.529311912615039], [114.35263738309735, 30.529453203949], [114.35342249711786, 30.529437711437897], [114.35344256797389, 30.528889695272387], [114.35162538862535, 30.528936616334782], [114.35161295319097, 30.529158125193007]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 1383.707127, "SHAPE_Area": 10950.515655 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35432097441618, 30.528462336135455], [114.35442351906387, 30.528459193326], [114.35442576697145, 30.528167068542867], [114.35367319264046, 30.52818200065737], [114.35366885321726, 30.528353846955138], [114.35384415275296, 30.528343347775731], [114.35382886735717, 30.528689923118208], [114.35364195673513, 30.528691862069739], [114.35363606632887, 30.528892352548976], [114.35377995981025, 30.528887665604159], [114.35376462742673, 30.529221353001471], [114.353637264347, 30.529223131157643], [114.35363300262867, 30.529416456978637], [114.3565542923069, 30.52937681284584], [114.35655870369531, 30.529125333434202], [114.35647324478205, 30.529126760644601], [114.356477883205, 30.528886894990944], [114.35657299922556, 30.528887828090415], [114.35657625452318, 30.528646772840812], [114.35583108856314, 30.528652867303919], [114.35582946718047, 30.52881325148849], [114.35636770432981, 30.528807723170928], [114.35635529062468, 30.529221234166858], [114.35525257714997, 30.529234985820469], [114.35525638171693, 30.529144284726094], [114.3550248172284, 30.529148495117809], [114.35502375544152, 30.529235609524353], [114.35388842280233, 30.529255809467237], [114.35390058146976, 30.528883467466247], [114.35440368535825, 30.528874940643096], [114.35440857141083, 30.528701899483902], [114.35396061467637, 30.52871266325814], [114.35397376917838, 30.528310725094521], [114.35432441838196, 30.528303327982162], [114.35432097441618, 30.528462336135455]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 255.429635, "SHAPE_Area": 3407.486886 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35660125770957, 30.529637626439719], [114.35598595393306, 30.529648856015541], [114.35598098972604, 30.529799702349642], [114.35585747325192, 30.529798130192646], [114.35585914383498, 30.529953731878063], [114.35597823137147, 30.529950542653321], [114.35597768932115, 30.53010424080562], [114.35605267983726, 30.530104990229429], [114.35605508413856, 30.530159397900889], [114.35640245500188, 30.530158448140636], [114.35640663919254, 30.530096385066759], [114.35659190297267, 30.530095878145779], [114.35660125770957, 30.529637626439719]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 201.098213, "SHAPE_Area": 1695.520457 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35600817114862, 30.530184685185329], [114.35599940969185, 30.530806416950231], [114.35622822199505, 30.530802211430245], [114.35623010832194, 30.530563546737874], [114.35633624457655, 30.530562063130159], [114.35633571761092, 30.530417675838013], [114.3562461186231, 30.530417920858067], [114.35624663943257, 30.530182839995142], [114.35600817114862, 30.530184685185329]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 189.982528, "SHAPE_Area": 1728.164343 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35397809065849, 30.529672056596823], [114.35397415066188, 30.529801898396482], [114.35403811717447, 30.529803633266184], [114.35403853255976, 30.529918189355207], [114.35410028740415, 30.529918021533177], [114.35409467485805, 30.530194881508013], [114.3543063982294, 30.530192396350017], [114.35431059519229, 30.530133198111908], [114.35436573360325, 30.530133048156021], [114.35437522940975, 30.529711071740429], [114.35436850892906, 30.529682450940065], [114.35432654148924, 30.529665381630274], [114.35397809065849, 30.529672056596823]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 383.244787, "SHAPE_Area": 6053.547421 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35206871956636, 30.529753553439871], [114.35206841837109, 30.529670023746679], [114.35186496962835, 30.529673437251521], [114.35182494839104, 30.530502289981733], [114.35225003710953, 30.530493384942766], [114.35225128364839, 30.530380256759173], [114.35232916753026, 30.530418709375191], [114.35243175566312, 30.53042702363744], [114.35250118436139, 30.530413948679222], [114.35259535644832, 30.530382189970062], [114.35264828913421, 30.530382046709562], [114.35268792140651, 30.530363324481932], [114.35270590544684, 30.530304565235724], [114.35270719180116, 30.53020289347322], [114.35252525670745, 30.530209113680755], [114.35253275240524, 30.529994299396257], [114.35271633554571, 30.529986643215555], [114.35272407911442, 30.529840562038704], [114.35266769880113, 30.529802052352], [114.35259646698374, 30.529773606060516], [114.35247404539956, 30.529769640991876], [114.35234016837059, 30.529800074587499], [114.35233831322759, 30.529744232943642], [114.35206871956636, 30.529753553439871]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 83.535786, "SHAPE_Area": 428.041954 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35133409417783, 30.529925688698849], [114.35130947916655, 30.530133866037605], [114.35150246658485, 30.53013430076464], [114.35152597085545, 30.529924216815505], [114.35133409417783, 30.529925688698849]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 80.276220, "SHAPE_Area": 369.645647 }, "geometry": { "type": "Polygon", "coordinates": [[[114.3512996563834, 30.530328201699973], [114.35156915156016, 30.530329264381706], [114.3515755813112, 30.530200967401846], [114.35130745858606, 30.530198110524609], [114.3512996563834, 30.530328201699973]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 75.443612, "SHAPE_Area": 350.441231 }, "geometry": { "type": "Polygon", "coordinates": [[[114.3513968173631, 30.530628849375166], [114.35138634189835, 30.530782216219066], [114.3516020415536, 30.530773280706988], [114.35161182792669, 30.530619915706961], [114.3513968173631, 30.530628849375166]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 106.975327, "SHAPE_Area": 531.837977 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35139753471199, 30.530329616408473], [114.35137801695609, 30.530489090857195], [114.35126296430936, 30.530598886268375], [114.35126335213678, 30.530610818022371], [114.35133247921425, 30.530667313559029], [114.35154305007585, 30.530494333797982], [114.3515652545146, 30.530329844070913], [114.35139753471199, 30.530329616408473]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 79.989147, "SHAPE_Area": 319.899511 }, "geometry": { "type": "Polygon", "coordinates": [[[114.3513314762548, 30.5308003594441], [114.35125924723847, 30.53105381385075], [114.3513710719883, 30.531077693622258], [114.35144329968874, 30.530824239159479], [114.3513314762548, 30.5308003594441]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 145.242720, "SHAPE_Area": 805.725181 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35120420404286, 30.530716753548138], [114.35094019649326, 30.531207194088626], [114.35112613215195, 30.531239628509361], [114.35129913863607, 30.530743228016281], [114.35120420404286, 30.530716753548138]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 241.023498, "SHAPE_Area": 1334.268095 }, "geometry": { "type": "Polygon", "coordinates": [[[114.3515519011678, 30.531152219454015], [114.35117147447993, 30.531161598991936], [114.35115117404328, 30.531649712279993], [114.35152885085378, 30.53164153358189], [114.3515393755855, 30.531501889918236], [114.35122507982204, 30.531501544206858], [114.35122991474006, 30.531312989534349], [114.35154831652929, 30.531304971469975], [114.3515519011678, 30.531152219454015]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 120.381226, "SHAPE_Area": 574.702488 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35183721704107, 30.530608180853637], [114.35183896261562, 30.53071552081893], [114.35234208377716, 30.530709388603452], [114.35234033764974, 30.530602048649111], [114.35183721704107, 30.530608180853637]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 115.624391, "SHAPE_Area": 610.022466 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35182302157752, 30.530876711223513], [114.35182521621105, 30.531001969465237], [114.35228284979274, 30.530995959395163], [114.3522806545724, 30.530870701165625], [114.35182302157752, 30.530876711223513]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 116.042840, "SHAPE_Area": 622.945787 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35180061062229, 30.531160776673314], [114.35180420606788, 30.531289032141913], [114.35226044952826, 30.531279446689677], [114.3522568534807, 30.531151190336132], [114.35180061062229, 30.531160776673314]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 111.371489, "SHAPE_Area": 539.305874 }, "geometry": { "type": "Polygon", "coordinates": [[[114.3518071628269, 30.53144882118], [114.35181006303226, 30.531561393327216], [114.35226012148352, 30.531552702234848], [114.35225722075968, 30.531440130101526], [114.3518071628269, 30.53144882118]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 6, "SHAPE_Leng": 144.768754, "SHAPE_Area": 806.128305 }, "geometry": { "type": "Polygon", "coordinates": [[[114.3527555074225, 30.530585774037469], [114.35275776535644, 30.530709766560093], [114.35336867599355, 30.530701428920789], [114.35336641728415, 30.530577436414671], [114.3527555074225, 30.530585774037469]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 2, "SHAPE_Leng": 202.684976, "SHAPE_Area": 2539.726082 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35276932733439, 30.530987193334511], [114.35277341281143, 30.531396638961326], [114.35335637269631, 30.531392278265411], [114.35335228477827, 30.530982833577763], [114.35276932733439, 30.530987193334511]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 6, "SHAPE_Leng": 145.520800, "SHAPE_Area": 787.545521 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35366179541549, 30.530579411369768], [114.35366222765639, 30.530698739078819], [114.35428253500596, 30.530697053797763], [114.35428210200696, 30.530577726096695], [114.35366179541549, 30.530579411369768]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 7, "SHAPE_Leng": 154.504199, "SHAPE_Area": 937.288509 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35362962005378, 30.530830091069156], [114.35363078045526, 30.530966059933544], [114.35427865080612, 30.530961913106974], [114.35427748950255, 30.530825944255383], [114.35362962005378, 30.530830091069156]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 7, "SHAPE_Leng": 166.886757, "SHAPE_Area": 1169.697540 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35360584445604, 30.531116546346372], [114.35360717600325, 30.531277335571605], [114.35429088875554, 30.531273091389895], [114.35428955608255, 30.531112302180375], [114.35360584445604, 30.531116546346372]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 7, "SHAPE_Leng": 165.170749, "SHAPE_Area": 1128.870078 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35358977268164, 30.531449440942968], [114.35359091471452, 30.531605379621762], [114.35427129823418, 30.531601643382604], [114.35427015407274, 30.531445704721044], [114.35358977268164, 30.531449440942968]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 6, "SHAPE_Leng": 148.272800, "SHAPE_Area": 873.016949 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35363402880347, 30.531755568570116], [114.35363450857908, 30.531888023196473], [114.35425399718228, 30.531886340235154], [114.35425351656626, 30.53175388561764], [114.35363402880347, 30.531755568570116]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 83.608600, "SHAPE_Area": 282.259458 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35625297469495, 30.531490442077796], [114.35625325336824, 30.531566812465211], [114.35660062923147, 30.531565862137235], [114.35660035028647, 30.531489491752701], [114.35625297469495, 30.531490442077796]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 128.135838, "SHAPE_Area": 414.171887 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35664833436266, 30.532089302398479], [114.35611980126357, 30.532084305051743], [114.35611940222367, 30.532201726312202], [114.3562335539949, 30.532204994347634], [114.35623416189205, 30.532144849745965], [114.35664856452777, 30.532152307711605], [114.35664833436266, 30.532089302398479]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 2, "SHAPE_Leng": 162.073823, "SHAPE_Area": 776.455374 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35367448385446, 30.53204498397427], [114.35366973905013, 30.532257404037999], [114.35374279901313, 30.532257205688445], [114.35374661371948, 30.53216889138422], [114.35405815980886, 30.532170430941573], [114.35405845841193, 30.532252768128821], [114.35417838223783, 30.532251248800133], [114.35417797964091, 30.532140273729723], [114.35411181260285, 30.532140453588131], [114.35411146634654, 30.532044990364444], [114.35367448385446, 30.53204498397427]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 1, "SHAPE_Leng": 97.106555, "SHAPE_Area": 282.784457 }, "geometry": { "type": "Polygon", "coordinates": [[[114.3525045431653, 30.531756074929273], [114.35250364284833, 30.531888534203681], [114.35285789883329, 30.531883995124474], [114.35285767025299, 30.531820750750441], [114.35256406277364, 30.531823932351376], [114.35256381714633, 30.531755914541918], [114.3525045431653, 30.531756074929273]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 1, "SHAPE_Leng": 46.831600, "SHAPE_Area": 121.844636 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35256964556689, 30.531461154445481], [114.35256989981438, 30.531531558974496], [114.35273256032951, 30.531531118692943], [114.35273230596471, 30.531460714165156], [114.35256964556689, 30.531461154445481]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 1, "SHAPE_Leng": 54.599067, "SHAPE_Area": 175.630746 }, "geometry": { "type": "Polygon", "coordinates": [[[114.3525398105995, 30.531597271231], [114.35254173459927, 30.531690893695306], [114.35271799889182, 30.531688179614388], [114.35271607472311, 30.531594557153991], [114.3525398105995, 30.531597271231]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 1, "SHAPE_Leng": 97.782528, "SHAPE_Area": 514.753610 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35285009692294, 30.531489184016863], [114.35284223005858, 30.531791706093841], [114.35300207689157, 30.531794820730511], [114.35300994326064, 30.531492298647919], [114.35285009692294, 30.531489184016863]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 254.478686, "SHAPE_Area": 3176.563317 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35659033708065, 30.532843010389705], [114.35658827420924, 30.532655668760746], [114.35633736328653, 30.53264919505294], [114.35633756363821, 30.532704085892259], [114.35618590370784, 30.532697341295435], [114.35618974649422, 30.533372736381818], [114.35626558081763, 30.53337730250546], [114.35626723375172, 30.53345247574331], [114.35647126925528, 30.533456691103851], [114.35647374755835, 30.533380313196322], [114.35658266251109, 30.533383594344897], [114.35659033708065, 30.532843010389705]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 139.281547, "SHAPE_Area": 707.863625 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35581955516979, 30.532955378625591], [114.3559541032178, 30.532956919755389], [114.35595545986671, 30.532723985303925], [114.35549888970142, 30.532721412790636], [114.35549929294203, 30.532832149704927], [114.35581910285208, 30.532831276653475], [114.35581955516979, 30.532955378625591]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 94.640372, "SHAPE_Area": 424.975288 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35558674847677, 30.533125669347502], [114.35558205794625, 30.533234274256753], [114.35594933708512, 30.533246158437258], [114.35595402616532, 30.533137553521055], [114.35558674847677, 30.533125669347502]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 95.914830, "SHAPE_Area": 421.698222 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35557443286582, 30.533377726704135], [114.35557270272692, 30.533482332101045], [114.35595153556368, 30.533487025422311], [114.35595326529661, 30.533382420023646], [114.35557443286582, 30.533377726704135]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 91.428128, "SHAPE_Area": 269.960486 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35508387967452, 30.533583834380867], [114.35508232426169, 30.533646665954663], [114.35548598065495, 30.533654156872945], [114.35548753685002, 30.5335913252936], [114.35508387967452, 30.533583834380867]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 58.738815, "SHAPE_Area": 181.954820 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35512849393663, 30.533115463661037], [114.35512591757846, 30.53319553828738], [114.35533932992591, 30.533200684198611], [114.35534190610908, 30.533120609569504], [114.35512849393663, 30.533115463661037]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 41.909800, "SHAPE_Area": 109.550144 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35481098268589, 30.533142103918852], [114.35481134178093, 30.533240907257817], [114.35491555551137, 30.533240623398292], [114.35491519631086, 30.53314182006044], [114.35481098268589, 30.533142103918852]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 144.760118, "SHAPE_Area": 664.040755 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35475863546604, 30.532848694711323], [114.35475754142695, 30.532945926186976], [114.35539939402595, 30.532951336160927], [114.35540048742899, 30.532854105587006], [114.35475863546604, 30.532848694711323]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 91.276657, "SHAPE_Area": 426.204826 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35475668807341, 30.532635100394458], [114.35475849593016, 30.53275323184209], [114.35509754486093, 30.532749343241722], [114.35509573659408, 30.532631211801938], [114.35475668807341, 30.532635100394458]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 74.881544, "SHAPE_Area": 320.306993 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35517299560651, 30.532635159506086], [114.35517205115789, 30.532754491818146], [114.35542432588173, 30.532755987616607], [114.35542527002197, 30.532636655305183], [114.35517299560651, 30.532635159506086]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 4, "SHAPE_Leng": 198.323753, "SHAPE_Area": 1360.409940 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35411456663131, 30.532707251585876], [114.35411127164156, 30.532938760709648], [114.35427393775943, 30.532939510943994], [114.35427630951821, 30.532833301820137], [114.35444585968011, 30.532831647283761], [114.35444374371964, 30.533008260908026], [114.35467258729091, 30.533011218226719], [114.35467700374916, 30.532709301751336], [114.35411456663131, 30.532707251585876]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 3, "SHAPE_Leng": 128.900354, "SHAPE_Area": 599.043140 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35335381475468, 30.532675209120377], [114.35335243184805, 30.532776794515645], [114.35390661090817, 30.53278245051111], [114.35390799427685, 30.532680864209727], [114.35335381475468, 30.532675209120377]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 3, "SHAPE_Leng": 53.975200, "SHAPE_Area": 159.401232 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35306300958945, 30.532767642535777], [114.3532532415869, 30.532767126872702], [114.35325295661097, 30.532688369758631], [114.35306272476697, 30.53268888542009], [114.35306300958945, 30.532767642535777]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 2, "SHAPE_Leng": 50.382875, "SHAPE_Area": 149.270810 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35281715813102, 30.532635613604199], [114.35277928570578, 30.532715106364236], [114.35293012583247, 30.53276895691474], [114.35296799815811, 30.532689465014332], [114.35281715813102, 30.532635613604199]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 2, "SHAPE_Leng": 61.116666, "SHAPE_Area": 230.251110 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35257856636603, 30.532681127687081], [114.35270054033988, 30.532741604368454], [114.35278893747551, 30.532608006193261], [114.35266696257357, 30.532547529595352], [114.35257856636603, 30.532681127687081]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 2, "SHAPE_Leng": 53.871665, "SHAPE_Area": 179.983261 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35255718949077, 30.532535439284302], [114.35243777328094, 30.532495543203531], [114.35238280293341, 30.532618840796967], [114.35250221926938, 30.532658736024363], [114.35255718949077, 30.532535439284302]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 2, "SHAPE_Leng": 57.351578, "SHAPE_Area": 204.771278 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35214207492939, 30.532483818260765], [114.35214381994476, 30.532621227861014], [114.35228387147514, 30.532619894001627], [114.35228212522397, 30.532482485309604], [114.35214207492939, 30.532483818260765]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 2, "SHAPE_Leng": 169.775089, "SHAPE_Area": 1712.679106 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35414521134059, 30.533120899502386], [114.35414408586409, 30.533418748825607], [114.35468454576446, 30.533420277776809], [114.35468566959193, 30.533122428461972], [114.35414521134059, 30.533120899502386]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 116.074089, "SHAPE_Area": 675.538504 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35412328414876, 30.533764384592349], [114.35411957228845, 30.533909696199927], [114.35455631835477, 30.533918054381168], [114.35456002852301, 30.533772742769273], [114.35412328414876, 30.533764384592349]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 96.956165, "SHAPE_Area": 364.875570 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35463705892268, 30.533726710609184], [114.3546363149033, 30.533810752718413], [114.35504436650082, 30.533813459559894], [114.35504511017216, 30.533729418353136], [114.35463705892268, 30.533726710609184]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 78.223788, "SHAPE_Area": 366.210382 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35648685719443, 30.533528109895233], [114.35654632930034, 30.533658369872995], [114.35677487682867, 30.533580179700603], [114.35671540446764, 30.533449919827635], [114.35648685719443, 30.533528109895233]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 50.486002, "SHAPE_Area": 125.705338 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35623419181364, 30.533645982126121], [114.35642608959338, 30.533648321172329], [114.3564270913063, 30.53358676294663], [114.35623519260554, 30.533584423903754], [114.35623419181364, 30.533645982126121]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 50.056879, "SHAPE_Area": 123.156276 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35591640359451, 30.533748519798547], [114.35610705041277, 30.533750945716836], [114.35610808044831, 30.533690240724752], [114.35591743479063, 30.533687814804168], [114.35591640359451, 30.533748519798547]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 50.058408, "SHAPE_Area": 121.785618 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35561240651876, 30.533852927723277], [114.35580430226388, 30.533854313354251], [114.35580487680789, 30.533794665871131], [114.35561298222206, 30.533793280237241], [114.35561240651876, 30.533852927723277]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 91.033791, "SHAPE_Area": 311.782786 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35506742954118, 30.53395321936037], [114.35545411355763, 30.533960134234196], [114.35545592178727, 30.533884380568121], [114.35506923703213, 30.533877466602085], [114.35506742954118, 30.53395321936037]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 90.412468, "SHAPE_Area": 314.742542 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35466485056439, 30.534015174164495], [114.35466241250283, 30.534092695686358], [114.35504374437082, 30.534101681141664], [114.35504618212963, 30.534024159615168], [114.35466485056439, 30.534015174164495]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 138.464850, "SHAPE_Area": 519.678367 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35396219628738, 30.534153885128724], [114.35395998486436, 30.534231129103482], [114.35459195012082, 30.534244685326655], [114.35459416104059, 30.534167440443227], [114.35396219628738, 30.534153885128724]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 3, "SHAPE_Leng": 141.504983, "SHAPE_Area": 746.999546 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35335017518021, 30.532947323503066], [114.35334722441117, 30.533046135833551], [114.35391630362658, 30.533054615273588], [114.3539058178518, 30.532899992804669], [114.35363618454086, 30.532900724971689], [114.35363306289369, 30.53295228376399], [114.35335017518021, 30.532947323503066]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 7, "SHAPE_Leng": 136.332801, "SHAPE_Area": 794.704372 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35336021403175, 30.533252779944128], [114.35335853603112, 30.533387415160377], [114.35391326909559, 30.533392592439217], [114.35391494528581, 30.533257956322743], [114.35336021403175, 30.533252779944128]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 146.118980, "SHAPE_Area": 891.177393 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35331004162167, 30.533559115873544], [114.3533075832616, 30.533698698060736], [114.35390754265032, 30.533706616603652], [114.35391000014926, 30.533567033510046], [114.35331004162167, 30.533559115873544]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 121.084051, "SHAPE_Area": 657.574153 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35331337388519, 30.533870318290028], [114.35331248648471, 30.533998266496109], [114.35379552996547, 30.534000774751174], [114.35379641673281, 30.533872826546794], [114.35331337388519, 30.533870318290028]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 109.884087, "SHAPE_Area": 393.670688 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35340888149223, 30.534335862975727], [114.35340734806952, 30.534412264421551], [114.35389151336145, 30.53441954184207], [114.3538930464052, 30.534343140393602], [114.35340888149223, 30.534335862975727]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 116.184991, "SHAPE_Area": 522.410803 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35268797993903, 30.533935158581301], [114.35268638333297, 30.534035471785074], [114.35317578083284, 30.534041306209321], [114.35317737589071, 30.533940992104402], [114.35268797993903, 30.533935158581301]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 126.225203, "SHAPE_Area": 728.924689 }, "geometry": { "type": "Polygon", "coordinates": [[[114.3526985042275, 30.534177369654259], [114.35269724856001, 30.534314651126227], [114.35319628796664, 30.534318072623883], [114.35319754292902, 30.534180790250662], [114.3526985042275, 30.534177369654259]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 110.333507, "SHAPE_Area": 565.776896 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35285239454956, 30.534419191594903], [114.35284967688881, 30.534541994226615], [114.35328256069704, 30.534549174656732], [114.35328527885525, 30.534426372017549], [114.35285239454956, 30.534419191594903]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 114.327696, "SHAPE_Area": 522.940573 }, "geometry": { "type": "Polygon", "coordinates": [[[114.3522550186654, 30.534440855528384], [114.35225318485516, 30.534543997188148], [114.35272962797551, 30.534550344566526], [114.35273146128559, 30.534447203806078], [114.3522550186654, 30.534440855528384]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 111.770732, "SHAPE_Area": 486.917459 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35225365425069, 30.534673790848579], [114.35225347746139, 30.534771207428452], [114.35272328306925, 30.53477184495905], [114.35272345939295, 30.534674429284209], [114.35225365425069, 30.534673790848579]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 113.444275, "SHAPE_Area": 538.620019 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35160070478081, 30.534652643448755], [114.35160050053994, 30.534761424626158], [114.35206589625831, 30.534762077331354], [114.35206609998052, 30.534653296157277], [114.35160070478081, 30.534652643448755]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 131.371914, "SHAPE_Area": 557.448619 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35159123167907, 30.534420914508175], [114.35159158839782, 30.534519957796448], [114.35202305903185, 30.534517599271418], [114.35202328279266, 30.534579650267169], [114.35209496160078, 30.534578263195531], [114.3520944106946, 30.53442552242171], [114.35159123167907, 30.534420914508175]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 115.887600, "SHAPE_Area": 591.538386 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35145390805104, 30.534185012316428], [114.35145433765848, 30.534304340889786], [114.35192027450684, 30.534303083095057], [114.35191984432987, 30.534183754527653], [114.35145390805104, 30.534185012316428]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 121.708600, "SHAPE_Area": 661.035100 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35207698628695, 30.534180944112364], [114.35207744678044, 30.534308625280417], [114.35256406258243, 30.534307309296715], [114.35256360145253, 30.534179628135327], [114.35207698628695, 30.534180944112364]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 113.246154, "SHAPE_Area": 521.495075 }, "geometry": { "type": "Polygon", "coordinates": [[[114.3520579428338, 30.533920522616157], [114.35205761084541, 30.534024947403321], [114.3525270019539, 30.534026064849684], [114.35252733344015, 30.533921640065259], [114.3520579428338, 30.533920522616157]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 155.099118, "SHAPE_Area": 1049.252670 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35134152339724, 30.533822994746242], [114.3513413691942, 30.533980505510964], [114.35196749580187, 30.533980963157401], [114.3519676489979, 30.533823453301835], [114.35134152339724, 30.533822994746242]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 157.960157, "SHAPE_Area": 904.203232 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35210590363593, 30.533630553039075], [114.35210582520378, 30.533755860661298], [114.35278405853013, 30.53375617355227], [114.35278413504967, 30.53363086593928], [114.35210590363593, 30.533630553039075]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 6, "SHAPE_Leng": 137.795400, "SHAPE_Area": 872.471419 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35214348635927, 30.533305260503354], [114.35214403042959, 30.533456091749528], [114.35268771208685, 30.533454621066394], [114.35268716717657, 30.533303789829016], [114.35214348635927, 30.533305260503354]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 6, "SHAPE_Leng": 117.475000, "SHAPE_Area": 622.950349 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35279314208324, 30.533243838028369], [114.35279359487105, 30.533369132489181], [114.35326090577288, 30.533367866201417], [114.35326045238533, 30.5332425717469], [114.35279314208324, 30.533243838028369]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 3, "SHAPE_Leng": 102.658400, "SHAPE_Area": 508.618091 }, "geometry": { "type": "Polygon", "coordinates": [[[114.3531671050565, 30.532969559427514], [114.35291484078986, 30.532970243017662], [114.3529153843197, 30.533120597096293], [114.3532765495608, 30.533119618249088], [114.35327622138132, 30.533028928462691], [114.3531673208965, 30.533029223714607], [114.3531671050565, 30.532969559427514]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 3, "SHAPE_Leng": 112.217489, "SHAPE_Area": 523.370797 }, "geometry": { "type": "Polygon", "coordinates": [[[114.3524274256536, 30.532771088963013], [114.35238218163555, 30.532870216829767], [114.35281142787107, 30.533017023029338], [114.35285667152147, 30.532917895920622], [114.3524274256536, 30.532771088963013]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 2, "SHAPE_Leng": 67.216014, "SHAPE_Area": 273.232619 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35207418246435, 30.532675386505993], [114.35204482476458, 30.532797062365624], [114.35224706650563, 30.532833627441534], [114.35227642396342, 30.5327119515389], [114.35207418246435, 30.532675386505993]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 164.718009, "SHAPE_Area": 1439.802952 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35157686735576, 30.533362549046434], [114.35157417983166, 30.533764697500171], [114.35183196054788, 30.533764001598126], [114.35183588988716, 30.533706712856052], [114.35197236188596, 30.533706344227507], [114.35197017016621, 30.533480816830068], [114.35183783319884, 30.533481174287687], [114.35183740313676, 30.533361845704142], [114.35157686735576, 30.533362549046434]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 204.149809, "SHAPE_Area": 1350.684478 }, "geometry": { "type": "Polygon", "coordinates": [[[114.3560835140255, 30.527991721652239], [114.35643334761946, 30.527987901210359], [114.3564369630521, 30.527845412103407], [114.35599451847668, 30.52785449723326], [114.35593588055315, 30.527877568699626], [114.35590041936327, 30.5279055884488], [114.35589932677598, 30.528286492150507], [114.35592097322656, 30.528325811534661], [114.35596323997252, 30.528349323537274], [114.35600542477501, 30.528350640686448], [114.3559887740274, 30.528320614692916], [114.3560009577167, 30.528259723127498], [114.35604136358036, 30.528226678226229], [114.35608270639005, 30.528223701338028], [114.3560835140255, 30.527991721652239]]] } }, { "type": "Feature", "properties": { "NAME": null, "TYPE": null, "HEIGHT": 0, "SHAPE_Leng": 91.977440, "SHAPE_Area": 542.903195 }, "geometry": { "type": "Polygon", "coordinates": [[[114.35628695465616, 30.528213835057102], [114.35608270639005, 30.528223701338028], [114.35604136358036, 30.528226678226229], [114.3560009577167, 30.528259723127498], [114.3559887740274, 30.528320614692916], [114.35600542477501, 30.528350640686448], [114.35605432262003, 30.528378429952109], [114.35631148554046, 30.528363407406484], [114.35635518649691, 30.528326773286889], [114.35635666501501, 30.52827879810383], [114.35634828524475, 30.528248750436848], [114.35632751194116, 30.528222315872362], [114.35628695465616, 30.528213835057102]]] } }]
	};

	// var buildingsBox=jsonBoundBox(building);
	// loadShape.js
	var projection = new _MercatorProjection.MercatorProjection();
	for (var i = 0; i < building.features.length; i++) {
		var feature = building.features[i];
		var geometry = feature.geometry;
		var properties = feature.properties;
		var coordinates = geometry.coordinates;
		var points = [];
		for (var j = 0; j < coordinates[0].length; j++) {
			var coordinate = coordinates[0][j];
			var p = projection.lngLatToPoint({ lng: coordinate[0], lat: coordinate[1] });
			var point = new THREE.Vector2(p.x + 114.5, p.y - 100);
			// var point=new THREE.Vector2(coordinate[0]-buildingsBox.centerX,coordinate[1]-buildingsBox.centerY);
			points.push(point);
		}
		var shape = new THREE.Shape();
		shape.fromPoints(points);
		_WorldAction.BuildingAction.add((0, _buildingTool.createBuilding)(shape));
	}

/***/ },
/* 157 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// jsonTool.js
	var jsonBoundBox = function jsonBoundBox(geojson) {
		var boundBox = {
			xMin: Infinity,
			yMin: Infinity,
			xMax: -Infinity,
			yMaX: -Infinity,
			centerX: 0,
			centerY: 0,
			xLength: 0,
			yLength: 0
		};
		for (var i = 0; i < geojson.features.length; i++) {
			var feature = geojson.features[i];
			var geometry = feature.geometry;
			var properties = feature.properties;
			var coordinates = geometry.coordinates;
			for (var j = 0; j < coordinates[0].length; j++) {
				var coordinate = coordinates[0][j];
				boundBox.xMin > coordinate[0] && (boundBox.xMin = coordinate[0]);
				boundBox.yMin > coordinate[1] && (boundBox.yMin = coordinate[1]);
				boundBox.xMax < coordinate[0] && (boundBox.xMax = coordinate[0]);
				boundBox.yMaX < coordinate[1] && (boundBox.yMaX = coordinate[1]);
			}
		}
		boundBox.centerX = (boundBox.xMax + boundBox.xMin) / 2;
		boundBox.centerY = (boundBox.yMaX + boundBox.yMin) / 2;
		boundBox.xLength = boundBox.xMax - boundBox.xMin;
		boundBox.yLength = boundBox.yMaX - boundBox.yMin;
		return boundBox;
	};

	exports.jsonBoundBox = jsonBoundBox;

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(159);
	__webpack_require__(161);

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(160);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(120)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./reset.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./reset.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(119)();
	// imports


	// module
	exports.push([module.id, "/*reset.css*/\r\nhtml, body, div, span, applet, object, iframe,\r\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\r\na, abbr, acronym, address, big, cite, code,\r\ndel, dfn, em, img, ins, kbd, q, s, samp,\r\nsmall, strike, strong, sub, sup, tt, var,\r\nb, u, i, center,\r\ndl, dt, dd, ol, ul, li,\r\nfieldset, form, label, legend,\r\ntable, caption, tbody, tfoot, thead, tr, th, td,\r\narticle, aside, canvas, details, embed, \r\nfigure, figcaption, footer, header, hgroup, \r\nmenu, nav, output, ruby, section, summary,\r\ntime, mark, audio, video {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tborder: 0;\r\n\tfont-size: 100%;\r\n\tfont: inherit;\r\n\tvertical-align: baseline;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle, aside, details, figcaption, figure, \r\nfooter, header, hgroup, menu, nav, section {\r\n\tdisplay: block;\r\n}\r\nbody {\r\n\tline-height: 1;\r\n}\r\nol, ul {\r\n\tlist-style: none;\r\n}\r\nblockquote, q {\r\n\tquotes: none;\r\n}\r\nblockquote:before, blockquote:after,\r\nq:before, q:after {\r\n\tcontent: '';\r\n\tcontent: none;\r\n}\r\ntable {\r\n\tborder-collapse: collapse;\r\n\tborder-spacing: 0;\r\n}", ""]);

	// exports


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(162);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(120)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./app.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./app.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(119)();
	// imports


	// module
	exports.push([module.id, "/*\n *@author wk\n *@descript 主样式文件\n */\n/*\n \n  main style\n ------------------------------------------------------\n  */\nbody {\n  background-color: #f0f0f0;\n  margin: 0px;\n  overflow: hidden;\n  user-select: none;\n}\n.wrapper {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  max-width: 1800px;\n  min-width: 768px;\n}\n.header {\n  position: absolute;\n  top: 0;\n  height: 32px;\n  width: 100%;\n}\n.header .menu {\n  height: 100%;\n  background-color: #eee;\n}\n.header .menu .menu-bar {\n  display: inline-block;\n  line-height: 32px;\n  padding: 0 10px;\n  color: #888;\n  font-size: 15px;\n  cursor: pointer;\n}\n.menu-bar .menu-file {\n  position: absolute;\n  display: none;\n  z-index: 10;\n  background: #fff;\n}\n.menu-bar .menu-file .item {\n  padding: 10px;\n}\n.menu-bar:hover .menu-file {\n  display: block;\n}\n.content {\n  overflow: hidden;\n  position: absolute;\n  top: 32px;\n  bottom: 0;\n  width: 100%;\n}\n.content .primary {\n  margin-right: 300px;\n  height: 100%;\n}\n.content .primary .map {\n  height: 100%;\n}\n.content .secondary {\n  width: 300px;\n  height: 100%;\n  position: absolute;\n  right: 0;\n  top: 0;\n  overflow-y: auto;\n  background-color: #eee;\n}\n/*\ncomponent style\n---------------------------------------------------------------\n */\n.obj-info {\n  color: #888;\n}\n#Stats-output {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n}\n", ""]);

	// exports


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(164);

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(165);
	var bind = __webpack_require__(166);
	var Axios = __webpack_require__(167);
	var defaults = __webpack_require__(168);

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance(defaults);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;

	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults, instanceConfig));
	};

	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(185);
	axios.CancelToken = __webpack_require__(186);
	axios.isCancel = __webpack_require__(182);

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(187);

	module.exports = axios;

	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(166);

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ },
/* 166 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(168);
	var utils = __webpack_require__(165);
	var InterceptorManager = __webpack_require__(179);
	var dispatchRequest = __webpack_require__(180);
	var isAbsoluteURL = __webpack_require__(183);
	var combineURLs = __webpack_require__(184);

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	module.exports = Axios;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(165);
	var normalizeHeaderName = __webpack_require__(169);

	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(170);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(170);
	  }
	  return adapter;
	}

	var defaults = {
	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};

	utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
	  defaults.headers[method] = {};
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});

	module.exports = defaults;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97)))

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(165);

	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(165);
	var settle = __webpack_require__(171);
	var buildURL = __webpack_require__(174);
	var parseHeaders = __webpack_require__(175);
	var isURLSameOrigin = __webpack_require__(176);
	var createError = __webpack_require__(172);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(177);

	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;

	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (process.env.NODE_ENV !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }

	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }

	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(178);

	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }

	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        if (request.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }

	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }

	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }

	    if (requestData === undefined) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97)))

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createError = __webpack_require__(172);

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response
	    ));
	  }
	};


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var enhanceError = __webpack_require__(173);

	/**
	 * Create an Error with the specified message, config, error code, and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, response);
	};


/***/ },
/* 173 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.response = response;
	  return error;
	};


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(165);

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }

	      if (!utils.isArray(val)) {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(165);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });

	  return parsed;
	};


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(165);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },
/* 177 */
/***/ function(module, exports) {

	'use strict';

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	module.exports = btoa;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(165);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(165);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(165);
	var transformData = __webpack_require__(181);
	var isCancel = __webpack_require__(182);
	var defaults = __webpack_require__(168);

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(165);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ },
/* 182 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ },
/* 183 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },
/* 184 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ },
/* 185 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}

	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel.prototype.__CANCEL__ = true;

	module.exports = Cancel;


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Cancel = __webpack_require__(185);

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	module.exports = CancelToken;


/***/ },
/* 187 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ }
/******/ ]);