var bodyParser  		= require("body-parser"),
	express 			= require("express"),
	app 				= express(),
	ejsLint 			= require('ejs-lint'),
	request				= require("request");



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req, res){
	res.render("search");
})

app.get("/result", function(req, res){
	var query = req.query.search;
	console.log(query);
	var url = "http://omdbapi.com/?s=" + query + "&apikey=74cc1864";
	request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            console.log(data);
            console.log(data.Response);
            // if the Response is "True", pass it to the view
            if (data.Response === "True") {
                res.render("result", {data: data});
            // if not, pass null to the view, which will be handled by ejs to say no movies found
            } else {
                res.render("result", {data: null});
            }
        }
    });
});


app.listen(3000, () =>{
	console.log("The Yelp Camp server has started");
});
