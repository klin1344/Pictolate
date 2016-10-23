

var express = require('express');
var app = express();
app.use(express.static("static"));
//var message;

app.get("/process", function(req,res){
	const RapidAPI = require('rapidapi-connect');
	const rapid = new RapidAPI('hacktx api use', '37de3fce-d2b0-4cac-bb4e-b1d76f41787e');

	rapid.call('MicrosoftComputerVision', 'analyzeImage', { 
		'image': req.param("input"),
		'details': '',
		'visualFeatures': 'Tags, Description',
		'subscriptionKey': '5d3a25366a51463f98739376ac28ab84'
	 
		}).on('success', (payload)=>{
			//var tag = JSON.parse(payload).tags[0].name;
			console.log(payload);
			//message = JSON.parse(payload).tags[0].name + ". " + JSON.parse(payload).tags[1].name  + ". " +  JSON.parse(payload).description.captions[0].text 
			rapid.call('GoogleTranslate', 'translate', { 
				'string': JSON.parse(payload).tags[0].name + ". " + JSON.parse(payload).tags[1].name  + ". " +  JSON.parse(payload).description.captions[0].text ,
				'sourceLanguage': 'en',
				'targetLanguage': 'fr',
				'apiKey': 'AIzaSyCdSrPgLT9Ip8OEP_yYetMBAaCaGTwylN0'
			 
				}).on('success', (payload)=>{
					 res.send(payload);
				}).on('error', (payload)=>{
					 res.send(payload);

			})

		}).on('error', (payload)=>{
			res.send(payload);
	});
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');


});

