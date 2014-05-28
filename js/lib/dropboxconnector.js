var DropBoxConnector = (function(){

	function create(options){
		var dbc = {};
		dbc.consumerKey = options.consumerKey;
		dbc.consumerSecret = options.consumerSecret;
		dbc.baseDirectory = options.baseDirectory || "";
		dbc.dropbox = DropBox.create({ consumerKey : dbc.consumerKey, consumerSecret : dbc.consumerSecret });
		
		//external
		dbc.save = authAndAction.bind(dbc, "save");
		dbc.load = authAndAction.bind(dbc, "load");
		dbc.metadata = authAndAction.bind(dbc, "metadata");
		
		//inner
		dbc.auth = actions.auth.bind(dbc);

		return dbc;
	}
	
	function authAndAction(action){
		var args = Array.prototype.slice.call(arguments, 1);
		if(!this.dropbox.oauth.hasAuth()){
			this.auth(function(){
				actions[action].apply(this, args);
			});
		}else{
			actions[action].apply(this, args);
		}
	}
	
	var actions = {
		save : function(name, file, callback){
			var self = this;
			name = self.baseDirectory + name;
			self.dropbox.files.put("dropbox", name, file, callback);
		},
		load : function(name, callback){
			var self = this;
			name = self.baseDirectory + name;
			self.dropbox.files.get("dropbox", name, callback);
		},
		auth : function(callback){
			var self = this;
			self.dropbox.oauth.requestToken(function(){
				self.dropbox.oauth.authorize(function(){
					self.dropbox.oauth.accessToken(callback);
				});
			});
		},
		metadata : function(path, callback){
			var self = this;
			path = self.baseDirectory + path;
			self.dropbox.metadata("dropbox", path, callback);
		}
	};

	return {
		create : create
	};

})();