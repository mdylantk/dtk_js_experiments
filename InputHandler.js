var InputHandler = {
    RenderStorage: DTKGStorage,


    MouseClick: function (x, y) {
        //alert("clicking " + x + " : " + y);
        var gPos = RenderStorage.GetGridPosition(RenderStorage.GridStorage, x, y);
        //alert("var set " + gPos.x + ":" + gPos.y + " :: " + gPos.rX + ":" + gPos.rY);


        //alert("on click passed");
        
        //this will run through all assign functions
        if (Object.keys(RegisterOnClickEvents).length > 0) {
            //alert("event check pass");
            for (i in RegisterOnClickEvents) {
                //alert("looping events");
                RegisterOnClickEvents[i](x,y);

            }

        }


        
        //alert("on click extra passed");
        InputHandler.GridEditior(x, y); //this is not responding for some reason
        //alert("end");
    },
		
    
    GridEditior: function (x, y) {
        //this is to test to see if the new files work like the original one
        //alert("editor start");
        var tX = Math.round(x / 32) * 32; //test. get the grid value then multiply it by grid size. grid value for strage reason. an offset may be needed to make sure click in object
        var tY = Math.round(y / 32) * 32;

        var dType = {
            type: "Text",
            left: tX,
            top: tY,
            width: 32,
            height: 32,
            color: "green",
            strokeColor: "red",
            style: "fill",
            radius: 16,
            sAngle: 0,
            eAngle: Math.PI * 2,
            cClock: false,
            text: ":3",
            font: "Arial",
            size: 32,
            format: "center"
        };

        dType = { type: InputHandler.RenderStorage.GNgin.drawType, left: tX, top: tY, width: 32, height: 32, color: InputHandler.RenderStorage.GNgin.colorType, strokeColor: InputHandler.RenderStorage.GNgin.strokeColorType, style: InputHandler.RenderStorage.GNgin.styleType, radius: 16, sAngle: 0, eAngle: Math.PI * 2, cClock: false, text: ":3", font: "Arial", size: 32, format: "center" };

        var cellName = "x=" + Math.round(x / 32) + ":y=" + Math.round(y / 32);
        //alert("editor statements start");

        //alert(dType.left + ":" + dType.top);

        //note: the dtype sould be store in an object(actor) instead of by itself
        if (InputHandler.RenderStorage.GStorageLayers.Grid.Cells[cellName] == undefined) //draw it once
        {
            //todo: store object ref and direct it to it render object. check before drow to make sure it is valid. render object may be a ref so animations could be render and such. if so templates may be needes or an array. may be best to have it run a function for rendering and return the render object
            InputHandler.RenderStorage.GStorageLayers.Grid.Cells[cellName] = dType;


        }
        else //temp remove option
        {
            delete InputHandler.RenderStorage.GStorageLayers.Grid.Cells[cellName];
        }

        //temp canvas change
        if (InputHandler.RenderStorage.GStorageLayers.Grid.Canvas !== undefined) {

            InputHandler.RenderStorage.GNgin.ChangeCanvas(InputHandler.RenderStorage.GStorageLayers.Grid.Canvas); //should the canvas be the object name? then the layer data? maybe not. there sould not be tat many layers and if so the main could hold it in parts if needed
            //NOTE: HAVE THIS CHECK CANVAS IN THE LAYER> IF SAME AS INPUT< MAKE CHANGES. it is unlikly input will cange stuff on a diffrent canvas. objects may override this, but that is the objects
        }
        else {
            //will use last set. tis could cause issues if not done right
        }
        //temp end

        InputHandler.RenderStorage.GNgin.Redraw(InputHandler.RenderStorage.GStorageLayers.Grid.Cells);

        //for (x in InputHandler.RenderStorage.GStorageLayers.Grid.Cells) { //testing to see the state of the obect
        //    alert(InputHandler.RenderStorage.GStorageLayers.Grid.Cells[x].left); //seems it neot being saved right

        //}

    },

    OnClick: function (_x, _y) {



        var DebugText = "onclick Running";

        if (InputHandler.RenderStorage.GStorageLayers["OnClickEvent"] !== undefined) {
            DebugText = DebugText + "<br>" + "on click event found";
            OnClickLayer = InputHandler.RenderStorage.GStorageLayers["OnClickEvent"].Cells;
            DebugText = DebugText + "<br>" + "on click event cells found and set";


            for (i in OnClickLayer) {


                if (OnClickLayer[i].OnClick() !== undefined) {
                    DebugText = DebugText + "<br>" + "on click() found";
                    OnClickLayer[i].OnClick();

                }

            }

        }
        else { DebugText = DebugText + "<br>" + "no on click layer" }

        
        document.getElementById("my_box").innerHTML = DebugText;
        return "function seem to ran"


    },






    Init: function (CanvasName, StorageObject) {
        if (CanvasName !== undefined) {
            RenderStorage = DTKGStorage;
            if (StorageObject !== undefined) {
                RenderStorage = StorageObject;
            }

            this.elem = document.getElementById(CanvasName);
            this.elemLeft = this.elem.offsetLeft;
            this.elemTop = this.elem.offsetTop;
            this.elem.addEventListener('click', function () {
                InputHandler.MouseX = event.pageX - InputHandler.elemLeft;
                InputHandler.MouseY = event.pageY - InputHandler.elemTop;
                InputHandler.MouseClick(event.pageX - InputHandler.elemLeft, event.pageY - InputHandler.elemTop);
            }, false);


            RegisterOnClickEvents = { 0: function (x, y) { InputHandler.OnClick(x, y); } }; //needed. it is on click events to run


        }

        else {
            alert("InputHandler Init need a canvas element name")
        }
    },


	
	
	
};