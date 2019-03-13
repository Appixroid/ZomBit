class HomeState extends BasicState
{
	constructor()
	{
		super("home");
		
		this.logo = null;
		this.playButton = null;
		this.exitButton = null;
	}

	init()
	{
		let back = Layers.createLayer("background", "assets/layers/home.png", true, true, -1);

		this.logo = new TexturedEntity(this, Game.getGameWidth() * 0.165, 0, Game.getGameWidth() * 0.66, Game.getGameWidth() * 0.66 * 0.18718663, "assets/zombit.png");

		this.playButton = new Button("assets/entities/button/play/play_button_released.png", "assets/entities/button/play/play_button_pressed.png", this, null, Game.getGameWidth() * 0.33, Game.getGameHeight() * 0.33, Game.getGameWidth() * 0.33, Game.getGameWidth() * 0.33 * 0.18718663);
		this.playButton.action = function(){
			States.goToState("game");
			States.resetState("game");
		};

		this.exitButton = new Button("assets/entities/button/quit/quit_button_released.png", "assets/entities/button/quit/quit_button_pressed.png", this, null, Game.getGameWidth() * 0.33, Game.getGameHeight() * 0.66, Game.getGameWidth() * 0.33, Game.getGameWidth() * 0.33 * 0.18718663);

		this.finishInit();
	}

	update()
	{

	}
}
