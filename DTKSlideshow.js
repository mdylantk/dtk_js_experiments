

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
		},
		{
			Name:"Spigots I",
			Author:"mdylantk",
			Src:"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/0073ab99-ff1d-4f40-a34b-530804cb7edc/daksxti-7aa61e81-aab1-47f1-8d60-5c3e9d61e6b2.png/v1/fill/w_738,h_1083,q_70,strp/spigots_i_by_mdylantk_daksxti-pre.jpg",
			Source:"https://www.deviantart.com/mdylantk/art/spigots-I-639604278",
			Disc:""
		},
		{
			Name:"GEnB IV",
			Author:"mdylantk",
			Src:"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/0073ab99-ff1d-4f40-a34b-530804cb7edc/daj3vj3-aa3025f4-25a5-4e81-a3cc-3e70526b8cc0.png/v1/fill/w_771,h_1036,q_70,strp/genb_iv_by_mdylantk_daj3vj3-pre.jpg",
			Source:"https://www.deviantart.com/mdylantk/art/GEnB-IV-636755295",
			Disc:""
		},
		{
			Name:"Forthteen I",
			Author:"mdylantk",
			Src:"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/0073ab99-ff1d-4f40-a34b-530804cb7edc/daiy1k8-314ec222-66eb-4da3-b5ca-d84517c3893a.png/v1/fill/w_1024,h_775,q_80,strp/forthteen_i_by_mdylantk_daiy1k8-fullview.jpg",
			Source:"https://www.deviantart.com/mdylantk/art/Forthteen-I-636483176",
			Disc:""
		},
		{
			Name:"N/A Husky",
			Author:"mdylantk",
			Src:"https://66.media.tumblr.com/eeeb89962d303e4f145ad095f4165795/tumblr_o546681D1x1qcye5fo1_1280.jpg",
			Source:"https://www.instagram.com/p/BDyDY2ngI26/",
			Disc:""
		},
		{
			Name:"Circles III",
			Author:"mdylantk",
			Src:"https://66.media.tumblr.com/2db68b1d023d8cbd0ee5c5f0a4594430/tumblr_o43pjpKide1qcye5fo1_1280.png",
			Source:"https://www.deviantart.com/mdylantk/art/Circles-III-596852316",
			Disc:""
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
