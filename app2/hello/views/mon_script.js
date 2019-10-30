
$(document).ready(function() {

    jQuery.ajax({
            url: "/findAllOrder"
        }).then(function(data) {
            console.log(data.request)
           for(k=0; k<data.request.length; k++){
                var tr = document.createElement('tr');
                document.getElementById('myTable').appendChild(tr);
                
                var td1 = document.createElement('td');
                tr.appendChild(td1);
                td1.appendChild(document.createTextNode(data.request[k].groupe));

                var td2 = document.createElement('td');
                tr.appendChild(td2);
                td2.appendChild(document.createTextNode(data.request[k].product));

                var td3 = document.createElement('td');
                tr.appendChild(td3);
                td3.appendChild(document.createTextNode(data.request[k].manufacturer));

                var td4 = document.createElement('td');
                tr.appendChild(td4);
                td4.appendChild(document.createTextNode(data.request[k].delivery_date));

                var td5 = document.createElement('td');
                tr.appendChild(td5);
                td5.appendChild(document.createTextNode(data.request[k].of));

                var td6 = document.createElement('td');
                td6.innerHTML='<a href="DisplayProduct.html?'+data.request[k].groupe+'"><button>Product Sequence</button></a>'
                tr.appendChild(td6);
    		}
        });
  
});