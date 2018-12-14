

	
	CanvasGNGin.Init("DTKMenu");
	//alert("meow1");
    //DTKGStorage.Init(CanvasGNGin);
	//todo move the grid storage stuff to  dtkstrage. init a function in gngin on mouse click or similar function may be needed
	DTKGStorage.FloatingStorage.Cells["a"] = Object.assign({}, DTKGStorage.renderData);  //ref? copy?
	DTKGStorage.FloatingStorage.Cells["b"] = Object.create(DTKGStorage.renderData); //should be it own object
	DTKGStorage.FloatingStorage.Cells["b"].left = 64;
	DTKGStorage.FloatingStorage.Cells["b"].top = 64;
	DTKGStorage.RenderAll();
	DTKGStorage.LoadImage("testImage","https://78.media.tumblr.com/7e6a705d3c5c1f79e3947eb4e20558bb/tumblr_mgaihyVLKq1qcye5fo1_540.jpg","FullImage");
	DTKGStorage.LoadImage("testImage2","https://78.media.tumblr.com/7e6a705d3c5c1f79e3947eb4e20558bb/tumblr_mgaihyVLKq1qcye5fo1_540.jpg","SpriteSheet"); //this is a test and should be a diffrent image later
    InputHandler.Init("DTKMain", DTKGStorage);
	//below var for image test
	var canvas  = document.getElementById("bCanvas");
    var context = canvas.getContext('2d');

    
	
	var TempSpite = {type:"sprite",x:2,y:2,w:32,h:32,Img:DTKGStorage.Images.testImage2.Img}; //test for handling sprite location. not sure if the direct cor should be store or the position on grid. the type chould have a function to process it.
	//above is a simple version of what the rander call for and this need reprocessing as with d cell
	
	var isEditor = false;
	
	function ButtonType(type)
	{
		CanvasGNGin.drawType = type;
		StatusUpdate();
	}
	function ButtonStyle(type)
	{
		CanvasGNGin.styleType = type;
		StatusUpdate();
	}
	
	function Editor()
	{
		if (isEditor == false)
		{
			isEditor = true;
		}
		else
		{
			isEditor = false;
		}
		StatusUpdate();
	}
	
	function StatusUpdate()
	{
		document.getElementById("eStatus").innerHTML = "Editor: " + isEditor + "<br> Draw Type: <font color='" + CanvasGNGin.colorType + "'>" + CanvasGNGin.drawType + "</font><br> Style Type: <font color='" + CanvasGNGin.strokeColorType + "'>"  + CanvasGNGin.styleType + "</font>";
	}
	
	function ColorTest()
	{
		
		CanvasGNGin.colorType = document.querySelector("#color").value;
		StatusUpdate();
	}
	function StrokeColorTest()
	{
		
		CanvasGNGin.strokeColorType = document.querySelector("#strokeColor").value;
		StatusUpdate();
	}
	
	function ButtonTest() //just testing the image srawing abilities before setting up a fucntion
	{
		Img=DTKGStorage.Images.testImage2.Img;
		//context.fillStyle = "red";
		//context.fill();
		//context.drawImage(Img,0,0,Img.width,Img.height,0,0,Img.width,Img.height);
		context.drawImage(TempSpite.Img,0,0,TempSpite.Img.width,TempSpite.Img.height,0,0,TempSpite.Img.width,TempSpite.Img.height);
		//DTKGStorage.FloatingStorage.Cells["c"] = {img:Img,type:"Image",left:64,top:64,width:64,height:64,clipLeft:0,clipTop:0,clipWidth:Img.width,clipHeight:Img.height};
		DTKGStorage.FloatingStorage.Cells["c"] = {img:Img,type:"Image",left:64,top:64,width:32,height:32,clipLeft:0,clipTop:256,clipWidth:32,clipHeight:32};
		DTKGStorage.FloatingStorage.Cells["d"] = {img:TempSpite.Img,type:"Image",left:32,top:32,width:32,height:32,clipLeft:TempSpite.x*TempSpite.w,clipTop:TempSpite.y*TempSpite.h,clipWidth:TempSpite.w,clipHeight:TempSpite.h};
		//context.closePath();
		//(type,img,0,0,img.width,img.height,0,0,32,32)
		DTKGStorage.RenderAll();
		
		//todo: images are not being added yet by the new input handler
		
	}
	
	StatusUpdate();

