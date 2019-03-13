var player;

class GameState extends BasicState
{
	constructor()
	{
		super("game");
		
		this.camera = null;
		this.zombies = new Array();
	}

	init()
	{
		let back = Layers.createLayer("background", "assets/layers/background.png", false, true, 0);
		back.scaleWidth(scale);

		let collision = Layers.createLayer("collision", "assets/layers/collision.png", false, false);
		collision.scaleWidth(scale);

		let foreground = Layers.createLayer("foreground", "assets/layers/foreground.png", false, true, 9999);
		foreground.scaleWidth(scale);

		this.createEntities();

		this.addEventListener("keydown", function(e){
			if(e.key == "Escape")
			{
				States.goToState("pause");
			}
		});

		this.finishInit();
	}

	update()
	{
		this.zombies.forEach(function(elem){
			elem.update();
		});
		player.update();
		this.camera.update();
		
		if(player.isDead())
		{
			States.goToState("death");
		}
	}

	reset()
	{
		player.destructor();
		for(let i = 0; i < this.zombies.length; i++)
		{
			this.zombies[i].destructor();
		}

		this.zombies = new Array();
		this.createEntities();
	}

	createEntities()
	{
		let back = Layers.getLayer("background");
		player = new Player(this, back.layer.width * 0.16, back.layer.height * 0.7, back.layer.width * 0.008, back.layer.width * 0.008 * 1.391304348, "assets/entities/player/idle/right/player_right_idle.gif");

		for(let i = 0; i < 10; i++)
		{
			this.zombies.push(new Zombie(this));
		}

		this.camera = new FixedCamera(player);
	}
}
