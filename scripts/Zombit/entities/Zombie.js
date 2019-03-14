class Zombie extends TexturedEntity
{
	constructor(owningState)
	{
		super(owningState, 0, 0, player.getWidth(), player.getWidth() * 1.214285714, "assets/entities/zombie/right/zombie_right_walk.gif");

		let startX, startY;
		let xPercent, yPercent;
		let lay = Layers.getLayer("spawn");

		do
		{
			startX = Math.floor(Math.random() * Math.floor(lay.getWidth()));
			startY = Math.floor(Math.random() * Math.floor(lay.getHeight()));
			
			xPercent = startX / lay.getWidth();
			yPercent = startY / lay.getHeight();
		} while(lay.getPixel(xPercent * bgWidth, yPercent * bgHeight)[3] == 0);

		this.setX(startX - (this.getWidth() / 2));
		this.setY(startY - this.getHeight());

		this.isDying = false;

		this.speedX = 4;
		this.speedY = 4;

		this.targetX = 0;
		this.targetY = 0;
	}

	deathAnimation(target = this, endAction)
	{
		if(target.getAngle() <= -90)
		{
			endAction(target);
		}
		else
		{
			target.rotate(target.angle - 30);
			setTimeout(target.deathAnimation, 50, target, endAction);
		}
	}

	death()
	{
		if(!this.isDying)
		{
			this.isDying = true;

			this.deathAnimation(this, function(t){
				t.destructor();
				zombies.splice(zombies.indexOf(t), 1)[0];
			});
		}
	}

	update()
	{
		this.targetX = player.getX();
		this.targetY = player.getY();


		let goX = (this.targetX < this.getX() ? -this.speedX : this.speedX);
		let goY = (this.targetY < this.getY() ? -this.speedY : this.speedY);

		let layer = Layers.getLayer("collision");
		let xPercent1 = (this.getX() + goX) / layer.layer.width;
		let xPercent2 = (this.getX() + goX + this.getWidth()) / layer.layer.width;
		let yPercent = (this.getY() + goY + this.getHeight()) / layer.layer.height;

		if(goX < 0)
		{
			this.setSprite("assets/entities/zombie/left/zombie_left_walk.gif");
		}
		else
		{
			this.setSprite("assets/entities/zombie/right/zombie_right_walk.gif");
		}

		if(!this.collideWithLayer("collision", xPercent1 * bgWidth , yPercent * bgHeight) && !this.collideWithLayer("collision", xPercent2 * bgWidth , yPercent * bgHeight))
		{
			this.move(goX, goY);
		}

		if(this.collideWithEntity(player))
		{
			player.hit();
		}
	}
}