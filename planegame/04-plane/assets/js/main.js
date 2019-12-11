var stage = document.querySelector(".stage");
var buttonStart = document.querySelector(".stage .game-start button.start");
var scenceGame = document.querySelector(".stage .game");
var contentGame = document.querySelector(".stage .game .content");
var ranking = document.querySelector(".game .ranking");
var resurgence = document.querySelector(".game .resurgence");
var restart = document.querySelector(".game .restart");
var dead = document.querySelector(".game .dead");
// var scenceGame = document.querySelector('.stage .game-start button.start')

//
var typeOurPlane = {
	path: "our-plane.gif",
	boom: "our-plane-boom.gif",
	w: 66,
	h: 80,
	blood: 3,
	delay: 30
};
var typeOurBullet = {
	path: "our-bullet.png",
	w: 6,
	h: 14,
	speed: -5,
	blood: 1
};
var typeEnemyPlaneS = {
	path: "enemy-plane-s.png",
	boom: "enemy-plane-s-boom.gif",
	w: 34,
	h: 24,
	speed: 4,
	blood: 1,
	delay: 10
};
var typeEnemyPlaneM = {
	path: "enemy-plane-m.png",
	hit: "enemy-plane-m-hit.png",
	boom: "enemy-plane-m-boom.gif",
	w: 46,
	h: 60,
	speed: 3,
	blood: 3,
	delay: 30
};
var typeEnemyPlaneL = {
	path: "enemy-plane-l.png",
	hit: "enemy-plane-l-hit.png",
	boom: "enemy-plane-l-boom.gif",
	w: 110,
	h: 164,
	speed: 2,
	blood: 5,
	delay: 50
};

//

// 所有元素构造器 型号对象 (图片&尺寸)  位置x y
// w宽度 h高度 s速度 xy坐标点
function Element(type, x, y) {
	this.path = type.path;
	this.x = x;
	this.y = y;
	this.w = type.w;
	this.h = type.h;
	this.s = type.speed;
	this.bullets = [];
	this.b = type.blood;
	this.blood = type.blood;
	this.hit = type.hit;
	this.boom = type.boom;
	this.d = type.delay;
	this.delay = type.delay;
	this.die = false;
}

// 根据 元素自身的位置信息 更新视图
Element.prototype.updataView = function() {
	this.node.style.left = this.x - this.w / 2 + "px";
	this.node.style.top = this.y - this.h / 2 + "px";
	// 修正偏移 点中心点
};

// 创建节点 画出某个元素
Element.prototype.draw = function() {
	this.node = document.createElement("img");
	this.node.src = game.srcPath + this.path;
	contentGame.appendChild(this.node);

	this.updataView();
};

// 移动元素 更新位置 更新视图
Element.prototype.move = function() {
	this.y += this.s;
	this.updataView();
};

// 创建 我方飞机 子弹 的方法
// var b1 = new Element(typeOurBullet, ourPlane.x, ourPlane.y);
Element.prototype.createBullet = function() {
	game.players.forEach(function(player, index, players) {
		// 如果当前玩家有buff加持
		if (player.buff === true) {
			var left = new Element(typeOurBullet, player.x - 20, player.y);
			var right = new Element(typeOurBullet, player.x + 20, player.y);
			left.draw();
			right.draw();
			player.bullets.push(left, right);
		} else {
			var newBullet = new Element(typeOurBullet, player.x, player.y);
			newBullet.draw();
			player.bullets.push(newBullet);
		}
	});
};

// 移动所有子弹的位置
Element.prototype.moveAllBullets = function() {
	this.bullets.forEach(function(bullet, index, bullets) {
		// console.log(this); forEach this指向window

		// 移动当前遍历的子弹
		bullet.move();
		// 判断当前遍历的子弹 是否超出
		if (bullet.checkTopOver()) {
			// 如果超出就删除dom节点
			contentGame.removeChild(bullet.node);
			// 还需要删除 数组里面的项
			bullets.splice(index, 1);
		}
	});
};

// 判断元素是否超出画布 返回布尔值
Element.prototype.checkTopOver = function() {
	if (this.y < -this.h / 2) {
		return true;
	}
};
// 判断元素是否超出画布 返回布尔值
Element.prototype.checkBottomOver = function() {
	if (this.y > game.scenceH + this.h / 2) {
		return true;
	}
};

// 判断两个元素是否碰撞 返回布尔值
Element.prototype.checkCrash = function(other) {
	if (this.blood > 0) {
		// 如果飞机已经死亡 不要挡子弹
		var hCrash = Math.abs(this.x - other.x) < (this.w + other.w) / 2;
		var vCrash = Math.abs(this.y - other.y) < (this.h + other.h) / 2;

		return hCrash && vCrash ? true : false;
	}
};

// 游戏配置

function Game() {
	this.framesFade = 0;
	this.gameBgPosY = 0;
	this.srcPath = "./assets/images/";
	this.scenceW = window.innerWidth;
	this.scenceH = window.innerHeight;
	this.enemys = [];
	this.players = [];
	this.bulletThick = 10;
	this.enemyThick = 30;
}
Game.prototype.moveAllEnemys = function() {
	this.enemys.forEach(function(enemy, index, enemys) {
		enemy.move();
		// 判断当前遍历的敌机 是否超出
		if (enemy.checkBottomOver()) {
			// 如果超出就删除dom节点
			contentGame.removeChild(enemy.node);
			// 还需要删除 数组里面的项
			enemys.splice(index, 1);
		}
	});
};
// 游戏背景更新
Game.prototype.bgUpdate = function() {
	this.gameBgPosY++;
	scenceGame.style.backgroundPositionY = this.gameBgPosY + "px";
};

//
Game.prototype.createEnemy = function(type) {
	var randomNum = Math.floor(Math.random() * this.scenceW);
	var newEnemy = new Element(type, randomNum, -type.h / 2);
	this.enemys.push(newEnemy);
	newEnemy.draw();
};
Game.prototype.createPlayer = function() {
	var newPlayer = new Element(typeOurPlane, game.scenceW / 2, game.scenceH - typeOurPlane.h / 2);
	newPlayer.score = 0;
	this.players.push(newPlayer);
	// console.log(newPlayer);
	newPlayer.draw();
	// 显示玩家分数
	document.querySelector(".game .score .player1").style.display = "block";
};
Game.prototype.moveAllBullets = function() {
	this.players.forEach(function(player) {
		player.bullets.forEach(function(bullet, index, bullets) {
			bullet.move();

			// 判断当前遍历的子弹 是否超出
			if (bullet.checkTopOver()) {
				// 如果超出就删除dom节点
				contentGame.removeChild(bullet.node);
				// 还需要删除 数组里面的项
				bullets.splice(index, 1);
			}
		});
	});
};

// 遍历所有敌机 和 我方 子弹 检测碰撞
Game.prototype.checkAllCrash = function() {
	game.enemys.forEach(function(enemy, ie, enemys) {
		game.players.forEach(function(player, ip, players) {
			// 玩家的子弹 与敌机
			player.bullets.forEach(function(bullet, ib, bullets) {
				if (enemy.checkCrash(bullet)) {
					// console.log('撞上了');
					enemy.blood--;
					bullet.blood--;
				}
			});
			// 敌机 与我方飞机

			if (enemy.checkCrash(player) && !player.die) {
				// console.log('撞上了');
				enemy.blood = 0;
				player.blood--;
				// 标记死亡
				player.die = true;
				// 爆炸
				player.node.src = game.srcPath + player.boom;
			}
		});
	});
};

// 遍历所有敌机 和 我方 子弹 检测血条
Game.prototype.checkAllBlood = function() {
	game.enemys.forEach(function(enemy, ie, enemys) {
		if (enemy.blood < enemy.b && enemy.blood > 0) {
			// 挨打
			// enemy.node.style.background = "blue";
			enemy.node.src = game.srcPath + enemy.hit;
		} else if (enemy.blood <= 0 && !enemy.die) {
			// 标记死亡
			enemy.die = true;
			// 爆炸
			// enemy.node.style.background = "red";
			enemy.node.src = game.srcPath + enemy.boom;
		}
	});
	game.players.forEach(function(player, ip) {
		// 所有子弹
		player.bullets.forEach(function(bullet, index, bullets) {
			if (bullet.blood <= 0) {
				// 子弹死亡
				contentGame.removeChild(bullet.node);
				bullets.splice(index, 1);

				// 加分
				player.score++;
				document.querySelectorAll(".game .score span")[ip].innerText = player.score;
				// console.log(player.score);
			}
		});
	});
};
// 清理所有已经死亡的飞机
Game.prototype.clearAllDead = function() {
	game.enemys.forEach(function(enemy, index, enemys) {
		// 检测飞机死亡状态 ，延迟 清理已死亡飞机
		if (enemy.die) {
			// 飞机死亡
			if (enemy.delay > 0) {
				// 刚换了爆炸图 gif延时还没到
				enemy.delay--;
			} else {
				// 已经炸完了 清DOM 删数组
				contentGame.removeChild(enemy.node);
				enemys.splice(index, 1);
			}
		}
	});
	game.players.forEach(function(player, ip, players) {
		// 玩家

		if (player.die) {
			// 玩家死亡

			if (player.blood > 0) {
				// 如果还有生命
				if (player.delay > 0) {
					// 刚死
					player.delay--;
				} else {
					// 爆炸显示完成 复活
					player.node.src = game.srcPath + player.path;
					player.die = false;
					player.delay = player.d;
				}
			} else {
				// 死了 没生命值了
				game.gameOver();
			}
		}
	});
};

// 游戏开始
Game.prototype.start = function() {
	// 创建定时器
	// 游戏主逻辑
	this.setIntervalId = window.setInterval(function() {
		// 每一帧都更新一下 帧数
		game.framesFade++;
		// 每一帧都更新一下游戏背景
		game.bgUpdate();
		// 每一帧都更新一下所有子弹的位置
		game.moveAllBullets();
		// 每一帧都更新一下所有敌方飞机的位置
		game.moveAllEnemys();

		// 检测所有碰撞
		game.checkAllCrash();
		// 检测血条 标记死亡
		game.checkAllBlood();
		// 清理死亡
		game.clearAllDead();

		// 判断帧数 如果是 ？ 的倍数 就生成子弹
		if (game.framesFade % game.bulletThick === 0) {
			game.players.forEach(function(player) {
				if (!player.die) {
					player.createBullet();
				}
			});
		}
		// 判断帧数 如果是 ？ 的倍数 就生成一个敌方飞机
		if (game.framesFade % game.enemyThick === 0) {
			// 80% 小飞机  15% 中飞机 5% 大飞机
			var randomNum = Math.floor(Math.random() * 100);
			if (randomNum < 5) {
				game.createEnemy(typeEnemyPlaneL);
			} else if (randomNum < 20) {
				game.createEnemy(typeEnemyPlaneM);
			} else {
				game.createEnemy(typeEnemyPlaneS);
			}
		}
	}, 30);
	this.state = 1;
	ranking.style.marginTop = -ranking.offsetHeight + "px";
	dead.style.bottom = -dead.offsetHeight + "px";
};

Game.prototype.gameOver = function() {
	this.pause();
	// 显示充值界面
	dead.style.bottom = "100px";
};

// 游戏暂停
Game.prototype.pause = function() {
	clearInterval(this.setIntervalId);
	this.state = 0;
	document.querySelector(".ranking").style.marginTop = "100px";
};

var game;
buttonStart.onclick = function() {
	// 切换到游戏场景
	stage.style.marginLeft = "-100%";

	// 实例化游戏对象
	game = new Game();
	// 创建玩家
	game.createPlayer();
	// 游戏开始
	game.start();
};

// 手指拖动的时候 更新我方飞机位置
scenceGame.ontouchmove = function(event) {
	// console.log(event.touches[0].pageX, event.touches[0].pageY);
	game.players[0].x = event.touches[0].pageX;
	game.players[0].y = event.touches[0].pageY;

	// 我方飞机移动  根据自身对象的xy重设定位
	game.players.forEach(function(player) {
		player.updataView();
	});
};

// 点击游戏场景 暂停开始游戏
scenceGame.ontouchstart = function(start) {
	var startX = start.touches[0].clientX;
	var startY = start.touches[0].clientY;
	document.body.ontouchend = function(end) {
		var endX = end.changedTouches[0].clientX;
		var endY = end.changedTouches[0].clientY;
		if (startX === endX && startY === endY) {
			// console.log('xxx');
			if (game.state === 0) {
				game.start();
			} else {
				game.pause();
			}
		}
	};
};

// 重新开始
restart.onclick = function() {
	window.location.reload();
};

resurgence.onclick = function() {
	// 充值买命
	game.players.forEach(function(player, index, players) {
		players[index].blood = 3;
	});
	dead.style.bottom = -dead.offsetHeight + "px";
};

// 加buff
document.querySelectorAll(".score span")[0].ontouchend = function(event) {
	// console.log('xxx');
	event.stopPropagation();
	
	game.players[0].buff = true;
	setTimeout(function() {
		game.players[0].buff = false;
	}, 10000);
};
