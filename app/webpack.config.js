var webpack = require("webpack");
module.exports = {
     entry: {
     	//map
     	app:'./entry.js',
     	//welcome
     	welcome:'./welcome_entry.js',
     	//user
     	user:'./user_entry.js',
     },
     output: {
         path: './build',
         filename: '[name].bundle.js'
     },
	module: {
		loaders: [
		  {
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel',
			query: {
                    presets: ["es2015"],
                    plugins:["transform-flow-strip-types",["transform-runtime",{"polyfill": false}]],
					// comments:false,
                },
		  },
		  { 
		   test: require.resolve("./scripts/plugin/stats.js"),  
		   loader: "exports?Stats"
		  },
		  { 
		   test: require.resolve("./scripts/plugin/dat.gui.js"),  
		   loader: "exports?dat"
		  },
		  {
		  	test: /\.less$/,
		    loader: "style!css!less"
		  },
		  { 
		  	test: /\.css$/,
		  	loader: 'style-loader!css-loader' 
		  },
		]
		
	},
	resolve: {
      extensions:['', '.js', '.json'],	     
	},
	 externals: {
        "threejs": "THREE"
    },
	plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ]
 };
