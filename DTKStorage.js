var DTKGStorage = { //for storing render data. should only be dependent on CanvasGNGin 
	
		GNgin:CanvasGNGin,
		
		GridStorage:{Type:"rGrid",x:32,y:32,ID:"RGS:0",Cells:{}}, //id is for map and templates. consider it as a save/load name
		FloatingStorage:{Type:"rFloating",ID:"RFS:0",Cells:{}},
		//StorageNames:["GridStorage","FloatingStorage"],//this will hold other strage types ames if needed. need to check on how arrays are handle
		
		
		//tests and temp var
		renderData:{type:"Text",left:32,top:32,width:32,height:32,color:"green",strokeColor:"red",style:"Fill",radius:16,sAngle:0,eAngle:Math.PI*2,cClock:false,text:">:3",font:"Arial",size:32,format:"center"},//all needed info for all types
		
		RenderAll: function(){ //not all, just the main untill strage names are set up
			
			this.GNgin.Redraw(this.GridStorage.Cells);
			this.GNgin.Redraw(this.FloatingStorage.Cells);
			//alert("render all worked, but there may or may not be data displayed");
			
		},
		
		ModifyStorage: function(name,storage,object,type){
			switch (type){
				case "add":
					storage.Cells[name]=object;
					break;
				case "delete":
					delete storage.Cells[name];
					break;
				default:
				
			}
			
			
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
				delete DTKGStorage.ImagesLoading[name];
				alert(name + " May be loaded as " + type);
			};
		
		},
		
		Init: function(gObject){
			if (gObject !== undefined)
			{
				CanvasGNGin = gObject;
			}
			return DTKGStorage; //sometimes setting an ref after init the object may be useful
		},
		
	};