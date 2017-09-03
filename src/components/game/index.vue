<template>
	<div class="game">
		<div class="game-function">
			<h3>比赛功能</h3>			
			<input type="button" value="暂停">
			<input type="button" value="换人">
			<input type="button" value="战术">
			<!-- 暂停,换人等 -->
		</div>
		<div class="game-info">
			<h3>比赛信息</h3>
			<!-- 比分,球员信息,球队信息 -->
			<!-- 比分 -->
			<div class="box">
				<FormEle :lists="formLists"></FormEle>
			</div>
		</div>
		<div class="game-box">
			<h3>比赛现场</h3>
			<div class="game-scene">
				<div class="game-team game-home">
					<span class="player player-c" :class="{'bg-green-default': (playerRight === 'c' && offensiveTeam === 'home'), 'bg-blue-info': playerRight !== 'c'}">C</span>
					<span class="player player-pf" :class="{'bg-green-default': (playerRight==='pf' && offensiveTeam === 'home'), 'bg-blue-info': playerRight !== 'pf'}">PF</span>
					<span class="player player-sf" :class="{'bg-green-default': (playerRight==='sf' && offensiveTeam === 'home'), 'bg-blue-info': playerRight !== 'sf'}">SF</span>
					<span class="player player-sg" :class="{'bg-green-default': (playerRight==='sg' && offensiveTeam === 'home'), 'bg-blue-info': playerRight !== 'sg'}">SG</span>
					<span class="player player-pg" :class="{'bg-green-default': (playerRight==='pg' && offensiveTeam === 'home'), 'bg-blue-info': playerRight !== 'pg'}">PG</span>
				</div>
				<div class="game-team game-away">
					<span class="player player-c" :class="{'bg-green-default': (playerRight === 'c' && offensiveTeam === 'away'), 'bg-red-info': playerRight !== 'c'}">C</span>
					<span class="player player-pf" :class="{'bg-green-default': (playerRight === 'pf' && offensiveTeam === 'away'), 'bg-red-info': playerRight !== 'pf'}">PF</span>
					<span class="player player-sf" :class="{'bg-green-default': (playerRight === 'sf' && offensiveTeam === 'away'), 'bg-red-info': playerRight !== 'sf'}">SF</span>
					<span class="player player-sg" :class="{'bg-green-default': (playerRight === 'sg' && offensiveTeam === 'away'), 'bg-red-info': playerRight !== 'sg'}">SG</span>
					<span class="player player-pg" :class="{'bg-green-default': (playerRight === 'pg' && offensiveTeam === 'away'), 'bg-red-info': playerRight !== 'pg'}">PG</span>
				</div>
			</div>
			<div class="btn game-start" @click="gameStart">开始比赛</div>
		</div>
		<div class="game-statistics">
			<h3>比赛统计</h3>
			<!-- 球员实时比赛数据 -->
		</div>
	</div>
</template>

<script>
	import FormEle from '../base/form.vue'
	export default {
		name: 'Game',
		data(){
			return {
				offensiveTeam: '',
				defensiveTeam: '',
				playerRight: '',
				originData: {
					home: {
						players: {
							pf: {
								name: '加索尔',
								ability: '81',
								offVal: '88',
								denVal: '67'
							},
							sf: {
								name: '阿尔德里奇',
								ability: '88',
								offVal: '88',
								denVal: '88'
							},
							pg: {
								name: '伦纳德',
								ability: '93',
								offVal: '90',
								denVal: '99'
							},
							sg: {
								name: '吉诺比利',
								ability: '84',
								offVal: '80',
								denVal: '74'
							},
							c: {
								name: '帕克',
								ability: '85',
								offVal: '88',
								denVal: '67'
							}
						}
					},
					away: {
						players: {
							c: {
								name: '帕楚利亚',
								ability: '69',
								offVal: '60',
								denVal: '79'
							},
							pf: {
								name: '格林',
								ability: '88',
								offVal: '80',
								denVal: '94'
							},
							sf: {
								name: '杜兰特',
								ability: '94',
								offVal: '97',
								denVal: '85'
							},
							sg: {
								name: '汤普森',
								ability: '84',
								offVal: '82',
								denVal: '90'
							},
							pg: {
								name: '库里',
								ability: '93',
								offVal: '96',
								denVal: '80'
							},
						}
					}
				},
				formLists:[
					{item: ['HOME', 'AWAY']},
					{score: [0, 0]},
					{pos: ['name', 'ability', 'score', 'reb', 'stl', 'block', 'ast', 'time']},
					{'C': ['jse', '81', '15', '8', '0', '1', '1', '21']},
					{'PF': ['adlq', '88', '15', '8', '0', '1', '1', '21']},
					{'SF': ['lnd', '93', '15', '8', '0', '1', '1', '21']},
					{'SG': ['mn', '84', '15', '8', '0', '1', '1', '21']},
					{'PG': ['pk', '85', '15', '8', '0', '1', '1', '21']},
				],
				gameResultList:[

				]
			}
		},
		components:{
			FormEle
		},
		methods: {
			gameStart(){
				this.fightBall();
			},
			// 争球
			fightBall(){
				// 争球
				var ranData = Math.random();
				var homePlayerValue = this.getAbility({team:'home',ability:'ability', playerPos:'c'});
				var awayPlayerValue = this.getAbility({team:'away',ability:'ability', playerPos: 'c'});
				// console.log(ranData, homePlayerValue, awayPlayerValue);
				var criticalVal = homePlayerValue/(parseInt(homePlayerValue)+parseInt(awayPlayerValue));
				if( ranData > criticalVal ){
					// away
					this.offensiveTeam = 'away';
					this.defensiveTeam = 'home';
				}else{
					// home
					this.offensiveTeam = 'home';
					this.defensiveTeam = 'away';
				}
				this.offensive();
			},
			// 进攻
			offensive(){
				var _this = this;
				setInterval(function(){

					_this.playerRight = _this.ballIsIn();
					_this.goal();
					// console.log(`the ball is in ${player} \`s hands` );
					_this.changeBallRight();
				},2000)
			},
			// 计算球在哪个球员手上
			ballIsIn(){
				var player = '';
				var rnData = Math.random();
				var cVal = this.getAbility({team:this.offensiveTeam, ability:'ability', playerPos: 'c'});
				var pfVal = this.getAbility({team:this.offensiveTeam, ability:'ability', playerPos: 'pf'});
				var sfVal = this.getAbility({team:this.offensiveTeam, ability:'ability', playerPos: 'sf'});
				var sgVal = this.getAbility({team:this.offensiveTeam, ability:'ability', playerPos: 'sg'});
				var pgVal = this.getAbility({team:this.offensiveTeam, ability:'ability', playerPos: 'pg'});
				var sum = parseInt(cVal) + parseInt(pfVal) + parseInt(sfVal) + parseInt(sgVal) + parseInt(pgVal);

				var cCritical = cVal/sum;
				var pfCritical = pfVal/sum + cCritical;
				var sfCritical = sfVal/sum + pfCritical;
				var sgCritical = sgVal/sum + sfCritical;
				var pgCritical = pgVal/sum;

				if(rnData < cCritical){
					player = 'c';
				}else if(rnData < pfCritical){

					player = 'pf';
				}else if(rnData < sfCritical){
					player = 'sf';
					
				}else if(rnData < sgCritical){
					player = 'sg';
					
				}else{
					player = 'pg';
					
				}
				return player;
			},
			// 计算进球概率
			goal(){
				var rnData = Math.random();
				var offensiveVal = this.getAbility({team: this.offensiveTeam, playerPos: this.playerRight, ability: 'offVal'});
				var denfensiveVal = this.getAbility({team: this.defensiveTeam, playerPos: this.playerRight, ability: 'denVal'});

				var res = (offensiveVal - denfensiveVal/2)/100;
				console.log(`进球概率 ${res}`);
				if( rnData < res ){
					// console.log('done');
					this.scoreFn();
				}else{
					var playerName = this.originData[this.offensiveTeam].players[this.playerRight].name;
					console.log( `${playerName} has lost` );
				}
			},
			// 得分
			scoreFn(){
				var player = this.originData[this.offensiveTeam].players[this.playerRight].name;
				console.log( `${player} has get 2` );
				if( this.offensiveTeam === 'home' ){
					var iNow = 0;
				}else{
					var iNow = 1;
				}
				this.formLists[1].score[iNow] += 2;
				console.log( this.formLists[1].score[iNow] )
			},
			// 交换球权
			changeBallRight(){
				if( this.offensiveTeam === 'home' ){
					// away
					this.offensiveTeam = 'away';
					this.defensiveTeam = 'home';
				}else{
					// home
					this.offensiveTeam = 'home';
					this.defensiveTeam = 'away';
				}
			},
			// 获取能力值
			getAbility(parmas){
				return this.originData[parmas.team].players[parmas.playerPos][parmas.ability]
			}
		}
	}
</script>

<style scoped lang="less">
	.game-info{
		height: 120px;
		.box{
			height: 90px;
			overflow-y: scroll;
			border: 1px solid #ccc;
		}
	}
	.game-box{
		position: relative;
		.btn.game-start{
			position: absolute;
			height: 40px;
			width: 40px;
			left: 50%;
			top: 50%;
			padding: 10px;
			margin: -30px 0 0 -30px;
			background-color: red;
			color: #fff;
			text-align: center;
			border-radius: 100%;
		}
	}
	.game-scene{
		display: flex;
		.game-team{
			flex: 1;
			height: 400px;
			border: 1px solid #666;
			text-align: center;
			line-height: 400px;
		}
	}
	.player{
		height: 50px;
		width: 50px;
		border-radius: 100%;
		border: 1px solid #ccc;
		display: inline-block;
		line-height: 50px;
		position: absolute;
	}
	.game-home{
		position: relative;
		.player-c{
			left: 100px;
			top: 100px;
		}
		.player-pf{
			left: 100px;
			top: 200px;
		}
		.player-sf{
			left: 300px;
			top: 50px;
		}
		.player-sg{
			left: 300px;
			top: 300px;
		}
		.player-pg{
			left: 350px;
			top: 200px;
		}
	}
	.game-away{
		position: relative;
		.player-c{
			right: 100px;
			top: 100px;
		}
		.player-pf{
			right: 100px;
			top: 200px;
		}
		.player-sf{
			right: 300px;
			top: 50px;
		}
		.player-sg{
			right: 300px;
			top: 300px;
		}
		.player-pg{
			right: 350px;
			top: 200px;
		}
	}
</style>