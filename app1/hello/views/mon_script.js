
$(document).ready(function() {

    jQuery.ajax({
    	url:"/allProject"
    }).then(function(project){
        console.log(project)
    	jQuery.ajax({
    		url:"/allDecisions"
    	}).then(function(decision){
            console.log(decision)
    		var tab = [];
            console.log(project[0].creation_date)
    		var curmonth = new Date(project[0].creation_date).getMonth()+1;
    		var curyear = new Date(project[0].creation_date).getYear()+1900;
    		var compt=0;
    		var comptRefuse=0;
    		var comptAccept=0;
    		var comptStandBy=0;
    		for(i=0;i<project.length;i++){
    			if(new Date(project[i].creation_date).getYear()+1900!=curyear || new Date(project[i].creation_date).getMonth()+1!=curmonth){
    				tab.push([curyear+'-'+curmonth, comptRefuse/compt, comptAccept/compt, comptStandBy/compt]);
    				compt=0;
    				comptRefuse=0;
    				comptAccept=0;
    				comptStandBy=0;
    				curmonth = new Date(project[i].creation_date).getMonth()+1;
    				curyear = new Date(project[i].creation_date).getYear()+1900;
    			}
    			for(j=0; j<decision.length; j++){
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
            console.log(tab)
    		for(k=0; k<tab.length; k++){
                var tr = document.createElement('tr');
                document.getElementById('myTable').appendChild(tr);
                
                var td1 = document.createElement('td');
                tr.appendChild(td1);
                td1.appendChild(document.createTextNode(tab[k][0]));

                var td2 = document.createElement('td');
                tr.appendChild(td2);
                td2.appendChild(document.createTextNode(tab[k][1]));

                var td3 = document.createElement('td');
                tr.appendChild(td3);
                td3.appendChild(document.createTextNode(tab[k][2]));

                var td4 = document.createElement('td');
                tr.appendChild(td4);
                td4.appendChild(document.createTextNode(tab[k][3]));
    		}
    	})
    })
});