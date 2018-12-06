

var DTKSlideshow = {

	ImageData:[
		{
			Name:"Leaf and Deck I",
			Author:"mdylantk",
			Src:"https://66.media.tumblr.com/tumblr_mbnimtFjTW1qcye5fo1_1280.jpg",
			Source:"https://www.deviantart.com/mdylantk/art/Leaf-and-Deck-I-331608139",
			Disc:"Random"
		},
		{
			Name:"Night Reading III",
			Author:"mdylantk",
			Src:"https://66.media.tumblr.com/c0b5418068bfb30906a0d860ec5bc414/tumblr_mgaig6lN9H1qcye5fo1_1280.jpg",
			Source:"https://www.deviantart.com/mdylantk/art/Night-Reading-III-340970745",
			Disc:"Black and White version"
		}
	],
	Elements: {
		Canvas:"DTKMain",
		TextFeild:"DTKImageText",
		PauseButtonText:"DTKpause",
		Play: "*",
		Pause:"II",
		TimeInv:10000,
		BG:"Black",
		TextColor:"Gray"
	},
	
	Ticking : false,
	IsRandom : false,
	CurrentImage: 0,
	ImageText: "",
	
	LoadImage: function(data) {
		var Img = new Image();
		Img.src = data.Src;
		Img.onload=function()
		{	
			DTKSlideshow.ChangeImage(Img);
			var linkName = "[*]";
			var linkSource = data.Src;
			var linkDisc = "";
			var linkAuthor = "";
			if (data.Name) {
				linkName = data.Name; 	
			}
			if(data.Source){
				linkSource = data.Source;
			}
			if(data.Disc){
				linkDisc = data.Disc;
			}
			if(data.Author){
				linkAuthor = data.Author;
			}
			
			DTKSlideshow.ImageText = '<font color="'+ DTKSlideshow.Elements.TextColor+ '"><a href="'+linkSource+'">'+linkName+'</a> by '+linkAuthor+'<br>'+linkDisc+'</font>';	
			document.getElementById(DTKSlideshow.Elements.TextFeild).innerHTML = DTKSlideshow.ImageText;	
		};
	},
	
	CycleImageData: function(isInverted,isRandom) {
		var list = this.ImageData;
		var length = list.length;
		var index = this.CurrentImage;
		if (isInverted) {
			index = index -1;
		}
		else {
			index = index +1;
		}
		if (isRandom){
			index = Math.floor((Math.random() * length));
			if (index == DTKSlideshow.CurrentImage) {
				index = index +1;
			}
		}
		if (index > length -1) {
			index = 0;
		}
		else if  (index < 0) {
			index = length -1;
		}
		if (list[index]) {
			this.LoadImage(list[index]);
			this.CurrentImage = index;
		}		
	},	
	ButtonType: function(text){
		switch(text) {
			case "Next":
				this.CycleImageData(false);
				break;
			case "Previous":
				this.CycleImageData(true);
				break;
			case "Pause":
				this.TimerTrigger();
				break;
			default:
		}
	},	
	TimerTrigger: function(){
		if (this.Ticking == false) {
			this.Timer = setInterval(DTKSlideshow.TimerEvent, DTKSlideshow.Elements.TimeInv);
			this.Ticking = true;
			document.getElementById(DTKSlideshow.Elements.PauseButtonText).innerHTML = DTKSlideshow.Elements.Pause;
		}
		else {
			clearInterval(DTKSlideshow.Timer);
			this.Ticking = false;		
			document.getElementById(DTKSlideshow.Elements.PauseButtonText).innerHTML = DTKSlideshow.Elements.Play;
		}
	},
	TimerEvent: function(){
		DTKSlideshow.CycleImageData(false,DTKSlideshow.IsRandom);

	},
	ChangeImage: function(img){ 	
		var ch = DTKSlideshow.Canvas.height;
		var cw = DTKSlideshow.Canvas.width;
		var imageAspectRatio = img.width / img.height;
		var canvasAspectRatio = cw / ch;
		var renderableHeight = 1;
		var renderableWidth = 1;
		var xStart = 0;
		var yStart = 0;
		if(imageAspectRatio < canvasAspectRatio) {
			renderableHeight = ch;
			renderableWidth = img.width * (renderableHeight / img.height);
			xStart = (cw - renderableWidth) / 2;
			yStart = 0;
		}
		else if(imageAspectRatio > canvasAspectRatio) {
			renderableWidth = cw
			renderableHeight = img.height * (renderableWidth / img.width);
			xStart = 0;
			yStart = (ch - renderableHeight) / 2;
		}
		else {
			renderableHeight = ch;
			renderableWidth = cw;
			xStart = 0;
			yStart = 0;
		}
		this.Ctx.clearRect(0, 0, DTKSlideshow.Canvas.width, DTKSlideshow.Canvas.height);
		this.Ctx.beginPath();
		this.Ctx.rect(0, 0, DTKSlideshow.Canvas.width, DTKSlideshow.Canvas.height);
		this.Ctx.fillStyle = DTKSlideshow.Elements.BG;
		this.Ctx.drawImage(img, xStart, yStart, renderableWidth, renderableHeight);	
		this.Ctx.closePath();
		
	},	
	Init: function(canvas,active,random) {
		DTKSlideshow.Elements.Canvas = canvas;
		this.Canvas = document.getElementById(DTKSlideshow.Elements.Canvas);
		this.Ctx = this.Canvas.getContext("2d");
		this.CanvasX = this.Canvas.width/2;
        this.CanvasY = this.Canvas.height - 30;
		this.IsRandom = random;
		if (active == true) {
			this.TimerTrigger();
		}	
		DTKSlideshow.CycleImageData(false,DTKSlideshow.IsRandom);	
	},
};
//DTKSlideshow.Init("DTKMain",true,true);
