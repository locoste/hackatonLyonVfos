
$(document).ready(function() {
 
    jQuery.ajax({
        url: "/allCPSControl"
    }).then(function(data) {
        for(k=0; k<data.length; k++){
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
            var j = x.insertCell(9);
			a.innerHTML = data[k].id;
			b.innerHTML = data[k].customer;
			c.innerHTML = data[k].control_type;
			d.innerHTML = data[k].ope;
			e.innerHTML = data[k].mo;
			f.innerHTML = data[k].max_tolerance;
            g.innerHTML = data[k].product;
            h.innerHTML = data[k].control_size;
            i.innerHTML = data[k].measure;
            j.innerHTML = data[k].nb_blob;
		} 
    });
});