class PostIt extends MultiDialingNPC
{
	constructor(owningState)
	{
		let text = ["<center><big>-- Pour entrer vous devez résoudre un problème mathématique que seul les non-zombies peuvent résoudre --<br/>PS : Si vous êtes idiot vous risquer de ne pas pouvoir le résoudre (peut-être qu'on prof pourra vous y aider)</big></center>"];
		
		super(owningState, text, "", "assets/entities/npc/postit/postit.png", Layers.getLayer("background").getWidth()*0.145, Layers.getLayer("background").getHeight()*0.15, Layers.getLayer("background").getWidth()*0.005, Layers.getLayer("background").getWidth()*0.005);
		
		super.range = Game.getGameWidth()*0.1;
		
		this.dialogLevel = 0;
	}
	
    interact()
	{
	    super.interact();
	    
	    if(this.dialogLevel == 1 && this.dialingText == "")
	    {
	    	this.destructor();
			this.getState().postit = null;
			
			Layers.getLayer("collision").setImage("assets/layers/collision_3a.png");
            Layers.getLayer("background").setImage("assets/layers/background_3a.png");
            
           questTracker.setQuest("Parler à Micloch Malnor");
	    }
		if(this.dialogLevel == 0 && player.isFollowedBy("Jhon Annides"))
		{
			this.dialingText = "<center><big>Jhon Annides : C'est ça le problème que vous voulez que je résolve ce soit une insulte à mon intellect mais bon puisqu'il le faut, mais c'est vraiment écraser un oeuf avec un marteau-pilon.</big><center>";
			this.texts = ["<center><big>Jhon Annides : Voilà c'est ouvert. Finalement je l'aime bien ce M. Malnor...</big></center>", ""];
			
			this.dialogLevel++;
		}
    }
}
