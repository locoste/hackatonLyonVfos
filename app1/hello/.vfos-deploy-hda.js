// require modules
const fs = require('fs');
const archiver = require('archiver');
const request = require('request');

// create a file to stream archive data to.
const output = fs.createWriteStream('h2oGeneratedModels.zip');
const archive = archiver('zip');

//vfOS vApp path
var dirname = "logic/datamodels/";
var deployerURL = 'http://195.201.144.6.nip.io/hdadeployer/uploadModels'; //url: 'http://localhost:8090/hdadeployer/uploadModels',

//Does the ML models directory exist?
fs.stat(dirname, function(err) {
    if (!err) {
        //console.log('file or directory exists');
		call_DeployerAPI(dirname,deployerURL);
    }
    else if (err.code === 'ENOENT') {
        console.log('The directory '+ dirname +' does not exist');
    }
});



// function to upload ML models to the Deployer 
function call_DeployerAPI(dirname,deployerURL) {  
	fs.readdir( dirname, function(err, files) {
		if (err) {
		   // some sort of error
		   throw err;
		   console.log(err);
		} else if (!files.length) {
		   // directory appears to be empty
		   console.log("The directory "+ dirname +" appears to be empty");
	   } else {
		   archive.on('error', function (err) {
				throw err;
				console.log(err);
			});

			// listen for all archive data to be written
			// 'close' event is fired only when a file descriptor is involved
			output.on('close', function() {

				const requestOptions = {
					method: 'post',
					url: deployerURL,
					formData: {
						uploadedFiles: {
							value: fs.createReadStream('h2oGeneratedModels.zip'),
							options: {
								filename: 'h2oGeneratedModels.zip'
							}//options
						}//uploadedFiles
					}//formData
				};//requestOptions
				
				request(requestOptions, function (err, response) {
					console.log(err || response.body);
				}); 

			});//output.on
			archive.pipe(output);
			//archive.glob(dirname+'**');
			archive.glob( '**', { cwd: dirname }, { prefix: ''} );
			archive.finalize();
			console.log('The Files have been zipped');
	   }//else
	});//fs.readdir
}//function



