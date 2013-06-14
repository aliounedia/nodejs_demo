var express = require("express")
var request = require('request');
var nunjucks = require('nunjucks')
var path     = require('path')
var app = express();
//app configuration 
app.configure(function(){
    app.set('port','8080');
    app.set('author', 'Alioune Dia')
    app.set('views', __dirname + '/templates');
    app.set('version', '1.0')
    app.use(express.static(path.join(__dirname, 
	    'statics')));
    app.set("catalogue_url", 
"https://raw.github.com/aliounedia/ansd_mobile_app/master/json/ansd_package_entity_get_tojson.json")
})
var env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader('templates'));

env.express(app);

//show datasets
app.get('/datasets', function(req, res) {
    console.log("query :"  + req.query);
    res.render('all.html', 
		{datasets: ds.datas });
});
//datasets class
var DataSet = function(){
    this.datas = {};
};
DataSet.prototype.load = function(json_data){
    for(id  in json_data){
        //datas catalogue
        this.datas[id] = JSON.parse(
        JSON.stringify(json_data[id]))
    }
};
//dataset instance
ds = new DataSet()
request(app.get("catalogue_url"), function(err, res, body){
    if (err){
        console.log(err);
    }
    else { 
        ds.load(JSON.parse(body));
        console.log("this datas" + ds.datas.lenght);
        for( id in ds.datas){
            var data_set = ds.datas[id]
        }
        app.listen(app.get('port'), function() {
            console.log("Listening on " + app.get('port'));
  	});
    }
});

	
