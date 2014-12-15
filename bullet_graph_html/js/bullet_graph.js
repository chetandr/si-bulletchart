var bulletGraph = function(userOptions){
    this.svgNS="http://www.w3.org/2000/svg";
    this.options = {
                title : 'Sample Bullet Chart',
                subTitle : 'Sample Bullet Chart',
                target : 'bulletChart',
                orientation : 'left',
                ranges : [300,600,1000],
                rangeColor : ['#CCCCCC','#DDDDDD','#EEEEEE'],
                rangeWidth : .6,
                rangeHeight : .1,
                scale : {'start':0,'end':1000,'distance':100},
                measures : [650,900],
                marker : [750],
                
                style : {
                    range : {color:'#000'},
                    marker :'',
                    width : '100%',
                    height : '100%',
                    fontSize : '14',
                    compareHeight : 50,
                    scaleLength : 10,
                    scaleStrokeColor : '#000',
                    scaleStrokeWidth : 1,
                    markerStrokeColor : '#f00',
                    markerStrokeWidth : 2,                    
                    measureColors : ['#4682B4','#B1DCFE']
                }

            };
    // override the default values
    for(k in userOptions){
        if(this.options[k] != undefined)
            this.options[k] = userOptions[k]
    }
    this.target = document.getElementById(this.options.target);
    this.options.style.width = this.target?this.target.offsetWidth : '600';
    this.options.style.height = this.target?this.target.offsetHeight : '200';
    

};
bulletGraph.prototype.SVG=function(w,h){    
    var svg=document.createElementNS(this.svgNS,"svg");
     svg.setAttribute('width',w);
     svg.setAttribute('height',h);     
     return svg;
}
bulletGraph.prototype.draw = function(){
    this.initViewport().addlabel().renderRanges().renderScale().renderMeasure().renderMarker();
}
// function create the viewport
bulletGraph.prototype.initViewport = function(){
    this.target  = document.getElementById(this.options.target);
    if(this.target == undefined) this.target = document.body;
    this.viewport = this.SVG(this.options.style.width,this.options.style.height);
    this.target.appendChild(this.viewport);
    return this;
}
// add the label
bulletGraph.prototype.addlabel = function(){
        this.label = this.options.title;
        this.labelAttr = {};
        var newText = document.createElementNS(this.svgNS,"text");
        // calculate the x n y coordinates
        switch(this.options.orientation) {
            case 'left' :
            case 'right' :
            case 'up' :
            case 'down' :
            default:
                this.labelAttr.x = 10;
                this.labelAttr.y =  (this.options.style.height/2) - this.options.style.fontSize;
        }
        newText.setAttributeNS(null,"x",this.labelAttr.x);     
        newText.setAttributeNS(null,"y",this.labelAttr.y); 
        newText.setAttributeNS(null,"font-size",this.options.style.fontSize);    
        this.labelNode = document.createTextNode(this.label);    
        newText.appendChild(this.labelNode);
        this.viewport.appendChild(newText);
        this.labelAttr.width = newText.offsetWidth;
        return this;
}
// draw comparative rectangles
bulletGraph.prototype.renderRanges = function(){
    this.comparisionAttrs = [];
    this.compareRects = [];
    var totalRangeWidth = Math.ceil(this.options.style.width * this.options.rangeWidth);   
    
    var numberOfmarkers = (this.options.scale.end - this.options.scale.start) / this.options.scale.distance;
    var widthPerScale = totalRangeWidth / numberOfmarkers;
    this.rangeWidth = totalRangeWidth;
    //console.log('Range Width :'+this.rangeWidth);
    this.widthPerScale = widthPerScale;
    this.numberOfMarkers = numberOfmarkers;
    // for each comparative shades identify the width
    var prevX = parseInt(this.labelAttr.width) + 25,startX = parseInt(this.labelAttr.width) + 25;
    
    console.log(prevX);
    for(k in this.options.ranges) {
        
         switch(this.options.orientation) {
            case 'left' :
            case 'right' :
            case 'up' :
            case 'down' :
            default:
                index = this.comparisionAttrs.length; 
                this.comparisionAttrs[index] = {};
                this.comparisionAttrs[index].startx = prevX;
                this.comparisionAttrs[index].starty = this.labelAttr.y - ((this.options.style.height * .1));
                this.comparisionAttrs[index].height = this.options.style.height * this.options.rangeHeight;
                 noOfScales = (this.options.ranges[index]/this.options.scale.distance); 
                 if(index > 0 ) {
                        noOfScales = ((this.options.ranges[index] - this.options.ranges[index-1])/this.options.scale.distance); 
                 }
                 
                this.comparisionAttrs[index].width = noOfScales * widthPerScale;  
                prevX += noOfScales * widthPerScale;
                break;                
                 
        }
        this.compareRects[index] = document.createElementNS(this.svgNS, 'rect');    
        this.compareRects[index].setAttributeNS(null,'x', this.comparisionAttrs[index].startx);
        this.compareRects[index].setAttributeNS(null,'y', this.comparisionAttrs[index].starty);    
        this.compareRects[index].setAttributeNS(null,'height', this.comparisionAttrs[index].height);
        this.compareRects[index].setAttributeNS(null,'width', this.comparisionAttrs[index].width);
        this.compareRects[index].setAttributeNS(null,'fill', this.options.rangeColor[index]);
        this.viewport.appendChild(this.compareRects[index]);
    }
    return this;
   
}
// draw the scale
bulletGraph.prototype.renderScale = function(){
    var scaleStart = this.comparisionAttrs[0].startx,prevx=0;
    
    this.scale = [];
    this.scale[0] = [];
     for(i=0 ;i<=this.numberOfMarkers;i++){
        this.scale[i] = {x1:0,y1:0};
      //  console.log(this.scaleStart);
        this.scale[i]['x1'] = scaleStart + prevx;
        this.scale[i]['y1'] = scaleStart;
        prevx += this.widthPerScale;
        switch(this.options.orientation) {
            case 'left' :
            case 'right' :
            case 'up' :
            case 'down' :
            default:
                this.scale[i]['x2'] = this.scale[i]['x1'];
                this.scale[i]['y2'] = this.scale[i]['y1'] + this.options.style.scaleLength;
                break;
        }
        this.scale[i].line = document.createElementNS(this.svgNS, 'line');  
        this.scale[i].line.setAttributeNS(null,'x1', this.scale[i].x1);
        this.scale[i].line.setAttributeNS(null,'x2', this.scale[i].x2);
        this.scale[i].line.setAttributeNS(null,'y1', this.scale[i].y1);
        this.scale[i].line.setAttributeNS(null,'y2', this.scale[i].y2);
        this.scale[i].line.setAttributeNS(null,'stroke', this.options.style.scaleStrokeColor);        
        this.scale[i].line.setAttributeNS(null,'stroke-width', this.options.style.scaleStrokeWidth);        

        this.viewport.appendChild(this.scale[i].line);
        
    }
    return this;
}
// draw the marker
bulletGraph.prototype.renderMarker = function(){
    this.marker = {};
    numBlocksForMarker = this.options.marker / this.options.scale.distance;
    startX = this.comparisionAttrs[0].startx + (numBlocksForMarker * this.widthPerScale);
    this.marker.x1 = startX;
    
    this.marker.y1 = this.comparisionAttrs[0].starty;
    this.marker.x2 = startX;
    this.marker.y2 = this.comparisionAttrs[0].starty + this.comparisionAttrs[0].height;
    this.marker.line = document.createElementNS(this.svgNS, 'line');
    this.marker.line.setAttributeNS(null,'x1', this.marker.x1);
    this.marker.line.setAttributeNS(null,'y1', this.marker.y1);
    this.marker.line.setAttributeNS(null,'x2', this.marker.x2);
    this.marker.line.setAttributeNS(null,'y2', this.marker.y2);
    this.marker.line.setAttributeNS(null,'stroke', this.options.style.markerStrokeColor);        
    this.marker.line.setAttributeNS(null,'stroke-width', this.options.style.markerStrokeWidth);
    this.viewport.appendChild(this.marker.line);
    return this;
}
// draw the measure
bulletGraph.prototype.renderMeasure = function(){
    
    this.measure = {};
    var prevX = this.comparisionAttrs[0].startx;
    for(k=0;k<this.options.measures.length;k++) {
        this.measure[k] = {};
        this.measure[k].startX = prevX;
        this.measure[k].height = this.comparisionAttrs[0].height/2;
        this.measure[k].startY = this.comparisionAttrs[0].starty + this.comparisionAttrs[0].height/4;
        
        var measureBlocks = this.options.measures[k] / this.options.scale.distance;
        if(k > 0) measureBlocks = (this.options.measures[k] - this.options.measures[k-1])/ this.options.scale.distance;
        console.log('blocks:'+this.options.scale.distance);
        this.measure[k].width = measureBlocks * this.widthPerScale;
        prevX += measureBlocks * this.widthPerScale;
        this.measure[k].rect = document.createElementNS(this.svgNS, 'rect');    
        this.measure[k].rect.setAttributeNS(null,'x', this.measure[k].startX);
        this.measure[k].rect.setAttributeNS(null,'y', this.measure[k].startY);    
        this.measure[k].rect.setAttributeNS(null,'height', this.measure[k].height);
        this.measure[k].rect.setAttributeNS(null,'width', this.measure[k].width);
        this.measure[k].rect.setAttributeNS(null,'fill', this.options.style.measureColors[k]);
        this.viewport.appendChild(this.measure[k].rect);
    }
    return this;
}
var b = new bulletGraph();
b.draw();
