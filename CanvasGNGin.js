
var CanvasGNGin = { //js canvas base functions

    drawType: "Text", //temp var for changing styles
    styleType: "Fill",
    colorType: "green",
    strokeColorType: "red",

    Draw: function (type, drawType) {
        var ReturnObject = { Type: "ReturnObject", Message: "Draw start", DrawType: drawType } //DrawTypes is being pass again just incase it changes or a diffrent object calls it.
        switch (type) { //this is not needed here. it should have it's own function to handle active objects
            case "Grid": //check too see if it is stored. if it is, return what is stored (later maybe other things). if not, then continue with the draw while adding this to the cell either here or in the the other switch
                //drawType.saveType 
                break;
            case "Clear":
                this.Ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height); //compress way to do a quick clear
                ReturnObject.Message = "Canvas Cleared";
                break;
            case "End":
                this.Ctx.beginPath(); //in times where lots need to be draw of a similar type. mostly to reduce how many times this is called without ref all the time
                ReturnObject.Message = "Canvas Draw Path Open";
                break;
            case "Start":
                this.Ctx.closePath(); //in times where lots need to be draw of a similar type. mostly to reduce how many times this is called without ref all the time
                ReturnObject.Message = "Canvas Draw Path Close";
                break;
            default:
                if (type == "FullDraw") {
                    this.Ctx.beginPath();
                }

                switch (drawType.type) {
                    case "Rect":
                        ReturnObject.Message = "Rect start";
                        if (drawType.left !== undefined && drawType.top !== undefined && drawType.width !== undefined && drawType.height !== undefined) {
                            this.Ctx.rect(drawType.left - drawType.width / 2, drawType.top - drawType.height / 2, drawType.width, drawType.height);

                            switch (drawType.style) {
                                case "Fill":

                                    this.Ctx.fillStyle = drawType.color;
                                    this.Ctx.fill();
                                    break;
                                case "Stroke":

                                    this.Ctx.strokeStyle = drawType.strokeColor;
                                    this.Ctx.stroke();
                                    break;
                                default:

                                    this.Ctx.fillStyle = drawType.color;
                                    this.Ctx.fill();
                            }
                            ReturnObject.Message = "Rect Drawed"
                        }
                        else {
                            ReturnObject.Message = "Invalid Rect Type"
                        }

                        break;
                    case "Arc":
                        ReturnObject.Message = "Arc start";
                        if (drawType.left !== undefined && drawType.top !== undefined && drawType.radius !== undefined && drawType.sAngle !== undefined && drawType.eAngle !== undefined && drawType.cClock !== undefined) {
                            this.Ctx.arc(drawType.left, drawType.top, drawType.radius, drawType.sAngle, drawType.eAngle, drawType.cClock);

                            switch (drawType.style) {
                                case "Fill":

                                    this.Ctx.fillStyle = drawType.color;
                                    this.Ctx.fill();
                                    break;
                                case "Stroke":

                                    this.Ctx.strokeStyle = drawType.strokeColor;
                                    this.Ctx.stroke();
                                    break;
                                default:

                                    this.Ctx.fillStyle = drawType.color;
                                    this.Ctx.fill();
                            }
                            ReturnObject.Message = "Arc Drawed"
                        }
                        else {
                            ReturnObject.Message = "Invalid Arc Type"
                        }

                        break;
                    case "Text":
                        ReturnString = "Text start";
                        if (drawType.left !== undefined && drawType.top !== undefined && drawType.font !== undefined && drawType.text !== undefined && drawType.size !== undefined) {
                            var coords = { x: drawType.left, y: drawType.top }
                            switch (drawType.format) { //for if it need to be centered or not. rect and arc still need a similar system
                                case undefined:

                                    break;
                                case "center":
                                    coords.x = drawType.left - drawType.size / 2;
                                    coords.y = drawType.top + drawType.size / 2;
                                    break;
                                default:

                            }
                            this.Ctx.font = drawType.size + "px " + drawType.font;
                            switch (drawType.style) {
                                case "Fill":

                                    this.Ctx.fillStyle = drawType.color;
                                    this.Ctx.fillText(drawType.text, coords.x, coords.y);
                                    this.Ctx.fill();
                                    break;
                                case "Stroke":

                                    this.Ctx.strokeStyle = drawType.strokeColor;
                                    this.Ctx.strokeText(drawType.text, coords.x, coords.y);
                                    this.Ctx.stroke();
                                    break;
                                default:

                                    this.Ctx.fillStyle = drawType.color;
                                    this.Ctx.fillText(drawType.text, coords.x, coords.y);
                                    this.Ctx.fill();
                            }
                            ReturnObject.Message = "Text Drawed"
                        }
                        else {
                            ReturnObject.Message = "Invalid Text Type";
                        }

                        break;

                    case "Image":
                        ReturnString = "Image start";
                        if (drawType.left !== undefined && drawType.top !== undefined && drawType.img !== undefined && drawType.height !== undefined && drawType.width !== undefined) {
                            if (drawType.clipLeft !== undefined && drawType.clipTop !== undefined && drawType.clipHeight !== undefined && drawType.clipWidth !== undefined) {

                                this.Ctx.drawImage(drawType.img, drawType.clipLeft, drawType.clipTop, drawType.clipWidth, drawType.clipHeight, drawType.left, drawType.top, drawType.width, drawType.height);
                                ReturnString = "Clip Image requested";

                            }
                            else {

                                this.Ctx.drawImage(drawType.img, drawType.left, drawType.top, drawType.width, drawType.height);
                                ReturnString = "Full Image requested";
                            }

                        }
                        break;


                    default:
                        ReturnObject.Message = "Invalid drawType"
                }

                if (type == "FullDraw") {
                    this.Ctx.closePath();
                }


        }


        return ReturnObject;
    },



    Redraw: function (renders) { //draw all var in object. var type should be correct render type
        this.Ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
        var x;
        var error = {}; //this is not effecient in debugging failed draws. it just a temp option
        for (x in renders) {
            error = this.Draw("FullDraw", renders[x]);

        }

    },

    ChangeCanvas: function (CanvasName) {

        this.Name = CanvasName;
        this.Canvas = document.getElementById(this.Name);
        this.Ctx = this.Canvas.getContext("2d");
        this.CanvasX = this.Canvas.width / 2;
        this.CanvasY = this.Canvas.height - 30;

    },
		
	Init : function(CanvasName) { //set the canvas data from a element name
        this.Name = CanvasName;
		this.Canvas = document.getElementById(this.Name);
		this.Ctx = this.Canvas.getContext("2d");
		this.CanvasX = this.Canvas.width/2;
        this.CanvasY = this.Canvas.height - 30;
            

			
			//grids and such
            this.mainGrid = { type: "grid", x: 32, y: 32, cells: {} };


			
	},
		
};
