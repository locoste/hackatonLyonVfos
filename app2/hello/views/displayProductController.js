
$(document).ready(function() {

    
    $("#myButtonId").on('click', function() {
 
        jQuery.ajax({
            url: "/test"
        }).then(function(data) {
           jQuery('#textareaId').val(JSON.stringify(data));
           
        });
      
    });

    jQuery.ajax({
            url: "/getProductInformation"
        }).then(function(dataProduct) {
            document.getElementById(product).value = dataProduct[0].product;
            document.getElementById(quantity).value = dataProduct[0].quantity;
            document.getElementById(manufacturer).value = dataProduct[0].manufacturer;
            document.getElementById(delivery_date).value = dataProduct[0].delivery_date;
           jQuery.ajax({
                url: "/getProductSequence"
            }).then(function(dataSequence) {
                for(k=0; k<dataSequence.length; k++){
        			var x = document.getElementById(myTable).insertRow(document.getElementById(myTable).length-1);
        			var a = x.insertCell(0);
        			var b = x.insertCell(1);
        			var c = x.insertCell(2);
        			var d = x.insertCell(3);
        			var e = x.insertCell(4);
        			var f = x.insertCell(5);
                    var g = x.insertCell(6);
                    var h = x.insertCell(7);
                    var i = x.insertCell(8);
        			a.innerHTML = tab[k].product_id;
        			b.innerHTML = tab[k].product;
        			c.innerHTML = tab[k].manufacturer;
        			d.innerHTML = tab[k].begin_data;
        			e.innerHTML = tab[k].end_date;
        			f.innerHTML = tab[k].quantity;
                    g.innerHTML = tab[k].of;
                    h.innerHTML = tab[k].delivery_date;
                    i.innerHTML = tab[k].pere;
        		}
            });
 
  
 
 });