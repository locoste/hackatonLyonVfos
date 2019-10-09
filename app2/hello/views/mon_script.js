
$(document).ready(function() {

    
    $("#myButtonId").on('click', function() {
 
        jQuery.ajax({
            url: "/test"
        }).then(function(data) {
           jQuery('#textareaId').val(JSON.stringify(data));
           
        });
      
    });

    jQuery.ajax({
            url: "/findAllOrder"
        }).then(function(data) {
           for(k=0; k<data.length; k++){
    			var x = document.getElementById(myTable).insertRow(document.getElementById(myTable).length-1);
    			var a = x.insertCell(0);
    			var b = x.insertCell(1);
    			var c = x.insertCell(2);
    			var d = x.insertCell(3);
    			var e = x.insertCell(4);
    			var f = x.insertCell(5);
    			a.innerHTML = tab[k].groupe;
    			b.innerHTML = tab[k].product;
    			c.innerHTML = tab[k].manufacturer;
    			d.innerHTML = tab[k].delivery_date;
    			e.innerHTML = tab[k].of;
    			f.innerHTML = '<button><a href="DisplayProduct.html?'+tab[k].groupe+'">Project Detail</a></button>'
    		}
        });
 
  
 
 });

/*
<td type="hidden">{{x.groupe}}</td>
                    <td>{{x.product}}</td>
                    <td>{{x.manufacturer}}</td>
                    <td>{{x.quantity}}</td>
                    <td>{{x.delivery_date}}</td>
                    <td>{{x.of}}</td>
                    <td><button><a ng-href="DisplayProject.html?{{x.groupe}}">Project Detail</a></button></td>*/