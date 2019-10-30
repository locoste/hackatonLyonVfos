
$(document).ready(function() {
    var data = [];
    jQuery.ajax({
            url: "/getProductInformation/"+getProject()
        }).then(function(dataProduct) {
            console.log(dataProduct.request)
            document.getElementById('product').value = dataProduct.request[0].product;
            document.getElementById('quantity').value = dataProduct.request[0].quantity;
            document.getElementById('manufacturer').value = dataProduct.request[0].manufacturer;
            document.getElementById('delivery_date').value = dataProduct.request[0].delivery_date;
            if(dataProduct.request[0].manufacturer=='APR'){
                document.getElementById('delivery_date').value = formatDate(new Date(dataProduct.request[0].delivery_date));
            }
           jQuery.ajax({
                url: "/getProductSequence/"+getProject()
            }).then(function(dataSequence) {
                console.log(dataSequence.request)
                var curDate;
                var colorBack;
                for(i=0;i<dataSequence.request.length; i++){
                    curDate=dataSequence.request[i].delivery_date;
                    colorBack='Tomato'
                    if(dataSequence.request[i].manufacturer=='APR'){
                        if(dataSequence.request[i].delivery_date!='null'){
                            curDate=formatDate(new Date(curDate));
                        }
                        colorBack='DeepSkyBlue'
                    }
                    data.push({id:dataSequence.request[i].id, color:colorBack, text_1:dataSequence.request[i].product, text_2: dataSequence.request[i].manufacturer,text_3:dataSequence.request[i].quantity, text_4: dataSequence.request[i].of, text_5:curDate, father: dataSequence.request[i].pere})
                }
                console.log('data')
                console.log(JSON.stringify(data))

                var myTree = Treeviz.create({
                  htmlId: "tree",
                    idKey: "id",
                    hasFlatData: true,
                    relationnalField: "father",
                    nodeWidth:120,
                    hasPan:true,
                    hasZoom: false,
                    nodeHeight:80,
                    mainAxisNodeSpacing:2,
                    renderNode: function(node) { 
                    return result = "<div style='cursor:pointer;float:left;width:200px;display:flex;flex-direction:column;justify-content:center;align-items:center;margin:1px;background-color:"
                            +node.data.color+
                          ";border-radius:5px;'><div><strong>"
                      +node.data.text_1+" ("+node.data.text_2+
                      ")</strong></div><div>Qty: "
                      +node.data.text_3+", MO: "+node.data.text_4+
                      "</div><div>Delivery Date: "+node.data.text_5+"</div></div>";
                    },
                    linkWidth : (nodeData)=> 5,
                    linkShape:"curve",
                    linkColor : (nodeData) => "#B0BEC5" ,
                    onNodeClick : (nodeData) => console.log(nodeData)
                });

                myTree.refresh(data);
                console.log(myTree)
            });
        });
 
    function getProject()
    {
      var str = window.location.search;
      str = str.substr(1);
      return str;
    }

    function formatDate(date){
        var month = date.getMonth()+1;
        var day = date.getDate();
        if(month<10){
            month="0"+month
        }
        if(day<10){
            day="0"+day
        }
        return day+"/"+month+"/"+date.getFullYear();
    }
 
 });