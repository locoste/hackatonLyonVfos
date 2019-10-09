
$(document).ready(function() {

        jQuery.ajax({
            url: "/"
        }).then(function(data) {
        	console.log(data)
           jQuery('#textareaId').val(JSON.stringify(data));
           
        });


    jQuery.ajax({
    	url:"/allProject"
    }).then(function(projects){
    	jQuery.ajax({
    		url:"/allDecisions"
    	}).then(function(decisions){
    		var tab = [];
    		var curmonth = project[0].creation_date.getMonth()+1;
    		var curyear = project[0].creation_date.getYear();
    		var compt=0;
    		var comptRefuse=0;
    		var comptAccept=0;
    		var comptStandBy=0;
    		for(i=0;i<project.length;i++){
    			if(project[i].creation_date.getYear()!=curyear || project[i].creation_date.getMonth()+1!=curmonth){
    				tab.push([curyear+'-'+curmonth, comptRefuse/compt, comptAccept/compt, comptStandBy/compt]);
    				compt=0;
    				comptRefuse=0;
    				comptAccept=0;
    				comptStandBy=0;
    				curmonth = project[i].creation_date.getMonth()+1;
    				curyear = project[i].creation_date.getYear();
    			}
    			for(j=0; j<decisions.length; j++){
    				if(project[i].decision==decision[j].decision_id){
    					compt++;
    					switch(decision[j].Final_decision){
    						case 2:
    							comptAccept++;
    							break;
    						case 1:
    							comptStandBy++;
    							break;
    						case 0:
    							comptRefuse++;
    							break;
    						case null:
    							comptRefuse++;
    					}
    				}
    			}
    		}
    		for(k=0; k<tab.length; k++){
    			var x = document.getElementById(myTable).insertRow(document.getElementById(myTable).length-1);
    			var a = x.insertCell(0);
    			var b = x.insertCell(1);
    			var c = x.insertCell(2);
    			var d = x.insertCell(3);
    			a.innerHTML = tab[k][0];
    			b.innerHTML = tab[k][1];
    			c.innerHTML = tab[k][2];
    			d.innerHTML = tab[k][3];
    		}
    	})
    })

    $("#myButtonId").on('click', function() {
 
        jQuery.ajax({
            url: "/test"
        }).then(function(data) {
           jQuery('#textareaId').val(JSON.stringify(data));
           
        });
    });
 });