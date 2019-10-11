
$(document).ready(function() {
 
    jQuery.ajax({
        url: "/allCPSControl"
    }).then(function(data) {
        for(k=0; k<data.length; k++){
            var tr = document.createElement('tr');
            document.getElementById('myTable').appendChild(tr);

            var td = document.createElement('td');
            tr.appendChild(td);
            td.appendChild(document.createTextNode(data[k].id));
            
            var td1 = document.createElement('td');
            tr.appendChild(td1);
            td1.appendChild(document.createTextNode(data[k].customer));

            var td2 = document.createElement('td');
            tr.appendChild(td2);
            td2.appendChild(document.createTextNode(data[k].control_type));

            var td3 = document.createElement('td');
            tr.appendChild(td3);
            td3.appendChild(document.createTextNode(data[k].ope));

            var td4 = document.createElement('td');
            tr.appendChild(td4);
            td4.appendChild(document.createTextNode(data[k].mo));

            var td5 = document.createElement('td');
            tr.appendChild(td5);
            td5.appendChild(document.createTextNode(data[k].max_tolerance));

            var td6 = document.createElement('td');
            tr.appendChild(td6);
            td6.appendChild(document.createTextNode(data[k].product));

            var td7 = document.createElement('td');
            tr.appendChild(td7);
            td7.appendChild(document.createTextNode(data[k].control_size));

            var td8 = document.createElement('td');
            tr.appendChild(td8);
            td8.appendChild(document.createTextNode(data[k].measure));

            var td9 = document.createElement('td');
            tr.appendChild(td9);
            td9.appendChild(document.createTextNode(data[k].nb_blob));
		} 
    });
});