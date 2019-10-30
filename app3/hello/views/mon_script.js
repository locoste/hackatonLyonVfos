angular.module("Project", []).controller('DisplayProject', function($scope, $http) {

    var final = [];
    var customerTab = [];
    var controlTab = [];
    var opeTab = [];
    var moTab = [];
    var toleranceTab = [];
    var measureTab = [];
    var tabValue;

    var ctx = document.getElementById('cpsStat').getContext('2d');
    var chart = new Chart(ctx, { 
        type:    'bar',
        data:    {
            datasets: [
                {
                    label:"Accept project",
                    backgroundColor: 'green',
                    borderColor: 'green',
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
                yAxes: [{
                    scaleLabel: {
                        display:     true,
                        labelString: '% per month'
                    }
                }]
            }
        }
    });
 
    $http.get("http://localhost:4201/allCPSControl").then(function(data) {
        tabValue = data.data.request;
        $scope.cps=data.data.request;
        for(i=0; i<data.data.request.length; i++){
            if(!customerTab.includes(data.data.request[i].customer)){
                customerTab.push(data.data.request[i].customer);
            }
        }
        $scope.customer=customerTab;

        for(i=0; i<data.data.request.length; i++){
            if(!controlTab.includes(data.data.request[i].control_type)){
                controlTab.push(data.data.request[i].control_type);
            }
        }
        $scope.control_type=controlTab;

        for(i=0; i<data.data.request.length; i++){
            if(!opeTab.includes(data.data.request[i].ope)){
                opeTab.push(data.data.request[i].ope);
            }
        }
        $scope.operation=opeTab;

        for(i=0; i<data.data.request.length; i++){
            if(!moTab.includes(data.data.request[i].mo)){
                moTab.push(data.data.request[i].mo);
            }
        }
        $scope.mo=moTab;

        for(i=0; i<data.data.request.length; i++){
            if(!toleranceTab.includes(data.data.request[i].max_tolerance)){
                toleranceTab.push(data.data.request[i].max_tolerance);
            }
        }
        $scope.tolerance=toleranceTab;

        for(i=0; i<data.data.request.length; i++){
            if(!measureTab.includes(data.data.request[i].measure)){
                measureTab.push(data.data.request[i].measure);
            }
        }
        $scope.measure=measureTab;

        chart.data.labels = moTab;
    });
    

    $scope.changeChart = function(type){
        var tabMoy = [];
        var tabUp = [];
        var tabEq = [];
        var tabUnder = [];
        var tabTolerance = [];
        var value;

        switch(type){
            case 'customer':
                value=customerTab[document.getElementById("customer").selectedIndex];
                document.getElementById("control_type").selectedIndex=-1;
                document.getElementById("operation").selectedIndex=-1;
                document.getElementById("Measure").selectedIndex=-1;
                document.getElementById("Tolerance").selectedIndex=-1;
                break;
            case 'control_type':
                value=controlTab[document.getElementById("control_type").selectedIndex];
                document.getElementById("customer").selectedIndex=-1;
                document.getElementById("operation").selectedIndex=-1;
                document.getElementById("Measure").selectedIndex=-1;
                document.getElementById("Tolerance").selectedIndex=-1;
                break;
            case 'operation':
                value=opeTab[document.getElementById("operation").selectedIndex];
                document.getElementById("customer").selectedIndex=-1;
                document.getElementById("control_type").selectedIndex=-1;
                document.getElementById("Measure").selectedIndex=-1;
                document.getElementById("Tolerance").selectedIndex=-1;
                break;
            case 'Measure':
                value=measureTab[document.getElementById("Measure").selectedIndex];
                document.getElementById("customer").selectedIndex=-1;
                document.getElementById("control_type").selectedIndex=-1;
                document.getElementById("operation").selectedIndex=-1;
                document.getElementById("Tolerance").selectedIndex=-1;
                break;
            case 'Tolerance':
                value=toleranceTab[document.getElementById("Tolerance").selectedIndex];
                document.getElementById("customer").selectedIndex=-1;
                document.getElementById("control_type").selectedIndex=-1;
                document.getElementById("operation").selectedIndex=-1;
                document.getElementById("Measure").selectedIndex=-1;
                break;
        }

        console.log(value)

        var curMO = tabValue[0].mo;
        var moy = 0;
        var up = 0;
        var equal = 0;
        var under = 0;
        var sum = 0;
        var compt=0;
        for(j=0; j<tabValue.length; j++){
            if(tabValue[j].mo!=curMO){
                tabMoy.push(sum/compt);
                tabUp.push(up);
                tabEq.push(equal);
                tabUnder.push(under);
                tabTolerance.push(tabValue[j-1].max_tolerance)
                moy = 0;
                up = 0;
                equal = 0;
                under = 0;
                sum = 0;
                compt=0;
                curMO = tabValue[j].mo
            }
            if(value==tabValue[j].customer || value==tabValue[j].control_type || value==tabValue[j].ope || value==tabValue[j].measure || value==tabValue[j].max_tolerance){
                switch(true){
                    case tabValue[j].nb_blob>tabValue[j].max_tolerance:
                        up++;
                        break;
                    case tabValue[j].nb_blob<tabValue[j].max_tolerance:
                        under++;
                        break;
                    case tabValue[j].nb_blob==tabValue[j].max_tolerance:
                        equal++;
                        break;
                }
                compt++;
                sum+=tabValue[j].nb_blob;
            }
        }
        tabMoy.push(sum/compt);
        tabUp.push(up);
        tabEq.push(equal);
        tabUnder.push(under);
        tabTolerance.push(tabValue[tabValue.length-1].max_tolerance)
        chart.data.datasets[0]={label: 'Blob Number Average', backgroundColor: 'Blue', borderColor: 'DarkBlue', data:tabMoy};
        chart.data.datasets[1]={label: 'Blob Number Upper Tolerance', backgroundColor: 'Crimson', borderColor: 'Red', data:tabUp};
        chart.data.datasets[2]={label: 'Blob Number Equal Tolerance', backgroundColor: 'Orange', borderColor: 'DarkOrange', data:tabEq};
        chart.data.datasets[3]={label: 'Blob Number Under Tolerance', backgroundColor: 'Green', borderColor: 'DarkGreen', data:tabUnder};
        chart.data.datasets[4]={label: 'Tolerance', borderColor: 'Black', data:tabTolerance, type: 'line'};
        chart.update();
    }

})