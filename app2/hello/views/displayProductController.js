
$(document).ready(function() {

    jQuery.ajax({
            url: "/getProductInformation/"+getProject()
        }).then(function(dataProduct) {
            document.getElementById('product').value = dataProduct[0].product;
            document.getElementById('quantity').value = dataProduct[0].quantity;
            document.getElementById('manufacturer').value = dataProduct[0].manufacturer;
            document.getElementById('delivery_date').value = dataProduct[0].delivery_date;
           jQuery.ajax({
                url: "/getProductSequence/"+getProject()
            }).then(function(dataSequence) {
                for(k=0; k<dataSequence.length; k++){
                    var tr = document.createElement('tr');
                    document.getElementById('myTable').appendChild(tr);

                    var td = document.createElement('td');
                    tr.appendChild(td);
                    td.appendChild(document.createTextNode(dataSequence[k].id));
                    
                    var td1 = document.createElement('td');
                    tr.appendChild(td1);
                    td1.appendChild(document.createTextNode(dataSequence[k].product_id));

                    var td2 = document.createElement('td');
                    tr.appendChild(td2);
                    td2.appendChild(document.createTextNode(dataSequence[k].product));

                    var td3 = document.createElement('td');
                    tr.appendChild(td3);
                    td3.appendChild(document.createTextNode(dataSequence[k].manufacturer));

                    var td4 = document.createElement('td');
                    tr.appendChild(td4);
                    td4.appendChild(document.createTextNode(dataSequence[k].begin_date));

                    var td5 = document.createElement('td');
                    tr.appendChild(td5);
                    td5.appendChild(document.createTextNode(dataSequence[k].end_date));

                    var td6 = document.createElement('td');
                    tr.appendChild(td6);
                    td6.appendChild(document.createTextNode(dataSequence[k].quantity));

                    var td7 = document.createElement('td');
                    tr.appendChild(td7);
                    td7.appendChild(document.createTextNode(dataSequence[k].of));

                    var td8 = document.createElement('td');
                    tr.appendChild(td8);
                    td8.appendChild(document.createTextNode(dataSequence[k].delivery_date));

                    var td9 = document.createElement('td');
                    tr.appendChild(td9);
                    td9.appendChild(document.createTextNode(dataSequence[k].pere));
        		}
            });
        });
 
    function getProject()
    {
      var str = window.location.search;
      str = str.substr(1);
      return str;
    }
 
 });