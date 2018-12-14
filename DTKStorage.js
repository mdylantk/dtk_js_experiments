var DTKGStorage = { //for storing render data. should only be dependent on CanvasGNGin 
	
		GNgin:CanvasGNGin,
		
		GridStorage:{Type:"rGrid",x:32,y:32,ID:"RGS:0",Cells:{}}, //id is for map and templates. consider it as a save/load name
		FloatingStorage:{Type:"rFloating",ID:"RFS:0",Cells:{}},
		//StorageNames:["GridStorage","FloatingStorage"],//this will hold other storage types ames if needed. need to check on how arrays are handle
		
		//test idea. store ref of all objects between groups for diffrent type of render and colision checks. each group will have var to handle how they will be effected. All roup will host all render and hidden(?) objects
    GStorageLayers: { All: { Type: "GStorage", Cells: {}, Canvas: "DTKMain" }, Grid: { Type: "GStorage", Cells: {}, Canvas: "DTKMain" }, Layer0: {}, Canvas: "DTKMain"}, //note: create a function that adds new layers or tings will fail if not done right
		
		//end test idea
		
		
		//tests and temp var
		renderData:{type:"Text",left:32,top:32,width:32,height:32,color:"green",strokeColor:"red",style:"Fill",radius:16,sAngle:0,eAngle:Math.PI*2,cClock:false,text:">:3",font:"Arial",size:32,format:"center"},//all needed info for all types
		
		RenderAll: function(){ //not all, just the main untill strage names are set up
			
			//this.GNgin.Redraw(this.GridStorage.Cells);
            //this.GNgin.Redraw(this.FloatingStorage.Cells); //seem to be working with the new storage type. still need to be tested
            this.GNgin.Redraw(DTKGStorage.GStorageLayers.All.Cells);
			//alert("render all worked, but there may or may not be data displayed");
			
		},
		
		ModifyStorage: function(name,storage,object,type){ //note name should be the ID in the future. also it seem this is currently not being used as with most of this js file
			switch (type){
				case "add":
                    storage.Cells[name] = object;
                    DTKGStorage.GStorageLayers.storage.Cells[name] = object;
                    DTKGStorage.GStorageLayers.All.Cells[name] = object; //make sure it is always loaded

                    DTKGStorage.GStorageLayers["OnClickEvent"].Cells[name] = object; //test

					break;
				case "delete":
                    delete storage.Cells[name];
                    delete DTKGStorage.GStorageLayers.storage.Cells[name];

                    delete DTKGStorage.GStorageLayers["OnClickEvent"].Cells[name]; //test

                    break;
                case "destroy":
                    delete storage.Cells[name];
                    delete DTKGStorage.GStorageLayers.storage.Cells[name];
                    delete DTKGStorage.GStorageLayers.All.Cells[name];//remove it from the all group. current issue is that it won't remove it from other colision group. may need to do a ref check to all when ever an object is being checked. might be faster. another option is have all cell store where the object is also located and run a clean up that way

                    delete DTKGStorage.GStorageLayers["OnClickEvent"].Cells[name]; //test

                    break;
				default:
				
			}	
		},
		
		RegisterGObject: function(object,LayerNames){ //new way to add. use less var. require a correct object and an array of strings for the layer. (note: need a default layer types if no suce layer exist. also if layernames = object, then get var names as layer names and replace the types if vaild
			//not sure if i am going to use this. maybe oneday. modify storage doing an okay job
		},
		
		
		GetGridPosition: function(storage,x,y){
			var gX = -1;
			var gY = -1;
			var returnObject = {x:gX,y:gY,isValid:false};
			
			if (storage.x !== undefined && storage.y !== undefined)
			{
				gX = Math.round(x/storage.x); 
				gY = Math.round(y/storage.y);
				returnObject = {x:gX,rX:gX*storage.x,y:gY,rY:gY*storage.y,isValid:true}; //rx and ry is the real pos rounded so object are place on grid
				
			}

			return returnObject;
		
		},
		
		Images:{},
		ImagesLoading:{}, //this is for a loading screen. when empty, then all images are loaded. if fail to empty itself, then something causing the image not to load. 
		LoadImage: function(name,src,type){

			this.Images[name] = {Scr:src,Type:type};
			
			this.ImagesLoading[name] = Object.assign({}, DTKGStorage.Images[name]);//temp hold this in a loding object. it will be remove if image load

			this.Images[name].Img = new Image();

			this.Images[name].Img.src=src;

			this.Images[name].Img.onload=function()
			{
				DTKGStorage.Images[name].ImgLoaded=true;
				delete DTKGStorage.ImagesLoading[name]; //removing this allow the image preview to load at times it did not. Note to self, review the way the images are being handled
				alert(name + " May be loaded as " + type);
			};
		
		},
		
		Init: function(gObject){
			if (gObject !== undefined)
			{
                this.GNgin = gObject;
            
				//test assigning object
				GStorageLayers.Grid = DTKGStorage.GridStorage; //this passes? must be unable to do this before object init. may be useless now
			}
			return DTKGStorage; //sometimes setting an ref after init the object may be useful
		},
		
	};