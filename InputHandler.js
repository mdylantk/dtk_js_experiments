 var InputHandler = {
		RenderStorage:DTKGStorage,
		MouseClick : function(x,y){
			var gPos=RenderStorage.GetGridPosition(RenderStorage.GridStorage,x,y);
			
			//there should be a bind on event for later.
			
			alert(gPos.x + ":" + gPos.y + " :: " + gPos.rX + ":" + gPos.rY);
		},
		
		
		Init:function(CanvasName,StorageObject){
			if (CanvasName !== undefined)
			{
				RenderStorage = DTKGStorage;
				if (StorageObject !== undefined)
				{
					RenderStorage = StorageObject;
				}
				
				this.elem = document.getElementById(CanvasName);
				this.elemLeft = this.elem.offsetLeft;
				this.elemTop = this.elem.offsetTop;
				this.elem.addEventListener('click', function() { 
					InputHandler.MouseX = event.pageX - InputHandler.elemLeft;
					InputHandler.MouseY = event.pageY - InputHandler.elemTop;
					InputHandler.MouseClick(event.pageX - InputHandler.elemLeft,event.pageY - InputHandler.elemTop); }, false);
			}
			else
			{
				alert("InputHandler Init need a canvas element name")
			}
		},
		
		
	
	
	};