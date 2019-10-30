
$(document).ready(function() {

    var tabAccept = [];
    var tabStandBy = [];
    var tabRefuse = [];
    var tabAcceptCompt = [];
    var tabStandByCompt = [];
    var tabRefuseCompt = [];

    var ctx = document.getElementById('projectStat').getContext('2d');
    var chart = new Chart(ctx, { 
                type:    'bar',
                data:    {
                    datasets: [
                        {
                        label:"Accept project",
                        backgroundColor: 'green',
                        borderColor: 'green',
                        data:[]
                      },
                      {
                        label:"Stand By project",
                        backgroundColor: 'orange',
                        borderColor: 'orange',
                        data:[]
                      },
                      {
                        label:"Refuse project",
                        backgroundColor: 'red',
                        borderColor: 'red',
                        data:[]
                      }
                    ]
                },
                options: {
                    responsive: true,
                    title:      {
                        display: false,
                        text:    "Chart.js Time Scale"
                    },
                    scales:     {
                        xAxes: [{
                            type:       "time",
                            time:       {
                                unit: 'month',
                                min: '01/01/2019'
                            },
                            scaleLabel: {
                                display:     true,
                                labelString: 'Date'
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display:     true,
                                labelString: '% per month'
                            }
                        }]
                    }
                }
            });




function formatDate(date){
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    if(day<10){
      day='0'+day;
    }
    if(month<10){
      month='0'+month;
    }
    return month+'/01/'+year;
  }

    
    jQuery.ajax({
    	url:"/allProject"
    }).then(function(project){
        //console.log(project)
    	jQuery.ajax({
    		url:"/allDecisions"
    	}).then(function(decision){
            
            var curmonth = new Date(project[0].creation_date).getMonth()+1;
            var curyear = new Date(project[0].creation_date).getYear()+1900;
            var compt=0;
            var comptRefuse=0;
            var comptAccept=0;
            var comptStandBy=0;
            for(i=0;i<project.length;i++){
                if(new Date(project[i].creation_date).getYear()+1900!=curyear || new Date(project[i].creation_date).getMonth()+1!=curmonth){
                    //Pourcentage
                    tabAccept.push({x:formatDate(new Date(project[i].creation_date)), y:comptAccept/compt*100});
                    tabStandBy.push({x:formatDate(new Date(project[i].creation_date)), y:comptStandBy/compt*100});
                    tabRefuse.push({x:formatDate(new Date(project[i].creation_date)), y:comptRefuse/compt*100});

                    //compteur
                    tabAcceptCompt.push({x:formatDate(new Date(project[i].creation_date)), y:comptAccept});
                    tabStandByCompt.push({x:formatDate(new Date(project[i].creation_date)), y:comptStandBy});
                    tabRefuseCompt.push({x:formatDate(new Date(project[i].creation_date)), y:comptRefuse});

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

    	})
    })

document.getElementById("number").onclick=function(){
    console.log('number')
    chart.data.datasets[0].data=tabAcceptCompt;
    chart.data.datasets[1].data=tabStandByCompt;
    chart.data.datasets[2].data=tabRefuseCompt;
    chart.options.scales.yAxes[0].scaleLabel.labelString = 'number per month'
    chart.update()
}
document.getElementById("pourcentage").onclick=function(){
    console.log('pourcentage')
    chart.data.datasets[0].data=tabAccept;
    chart.data.datasets[1].data=tabStandBy;
    chart.data.datasets[2].data=tabRefuse;
    chart.options.scales.yAxes[0].scaleLabel.labelString = '% per month'
    chart.update()
};
});

