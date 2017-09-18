<template>
	<div class="game">
		<div class="game-function">
			{{reboundValHome}}
			{{reboundValAway}}
			<h3>比赛功能</h3>			
			<input type="button" value="暂停">
			<input type="button" value="换人">
			<input type="button" value="战术">
			<!-- 暂停,换人等 -->
		</div>
		<div class="game-info">
			<h3>现场</h3>
			<!-- 比赛用时 -->
			<TimeGo></TimeGo>
			<!-- 实时战况 -->
			<Situation></Situation>
			<!-- 比赛信息 -->
			<!-- <FormEle :lists="formLists" boxTitle="比赛信息" class="text-center"></FormEle> -->
		</div>
		<div class="game-box">
			<h3>球场表现</h3>
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
			<div class="btn game-start" :class="{'game-start-flag': gameStartFlag}" @click="gameStart">开始比赛</div>
		</div>
		<div class="game-statistics">
			<h3>赛后统计</h3>
			<!-- 球员实时比赛数据 -->
		</div>
	</div>
</template>

<script>
	import FormEle from '../base/form.vue'
	import TimeGo from './timeGo.vue'
	import Situation from './situation.vue'

	export default {
		name: 'Game',
		data(){
			return {
				offensiveTeam: '',
				defensiveTeam: '',
				playerRight: '',
				gameStartFlag: false,
				originData: {
					home: {
						teamName: '马刺',
						players: {
							c: {
								name: '加索尔',
								ability: '81',
								offVal: '88',
								denVal: '67',
								rebVal: '94'
							},
							pf: {
								name: '阿尔德里奇',
								ability: '88',
								offVal: '88',
								denVal: '88',
								rebVal: '96'
							},
							sf: {
								name: '伦纳德',
								ability: '93',
								offVal: '90',
								denVal: '99',
								rebVal: '88'
							},
							sg: {
								name: '吉诺比利',
								ability: '84',
								offVal: '80',
								denVal: '74',
								rebVal: '70'
							},
							pg: {
								name: '帕克',
								ability: '85',
								offVal: '88',
								denVal: '67',
								rebVal: '65'
							}
						}
					},
					away: {
						teamName: '勇士',
						players: {
							c: {
								name: '帕楚利亚',
								ability: '69',
								offVal: '60',
								denVal: '79',
								rebVal: '80'
							},
							pf: {
								name: '格林',
								ability: '88',
								offVal: '80',
								denVal: '94',
								rebVal: '89'
							},
							sf: {
								name: '杜兰特',
								ability: '94',
								offVal: '97',
								denVal: '85',
								rebVal: '88'
							},
							sg: {
								name: '汤普森',
								ability: '84',
								offVal: '82',
								denVal: '90',
								rebVal: '76'
							},
							pg: {
								name: '库里',
								ability: '93',
								offVal: '96',
								denVal: '80',
								rebVal: '70'
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
			FormEle,
			TimeGo,
			Situation
		},
		methods: {
			gameStart(){
				this.$store.commit({
					type: 'updateGameInfo',
					gameInfo: {infomation: `第${this.$store.state.gameRounds.currentRound}节比赛开始`, team: this.offensiveTeam}
				})
				!this.gameStartFlag && this.fightBall();
				this.gameStartFlag = true;
				this.timeGo();
			},
			// 争球
			fightBall(){
				// 争球
				let ranData = Math.random();
				let homePlayerValue = this.getAbility({team:'home',ability:'ability', playerPos:'c'});
				let awayPlayerValue = this.getAbility({team:'away',ability:'ability', playerPos: 'c'});
				let criticalVal = homePlayerValue/(parseInt(homePlayerValue)+parseInt(awayPlayerValue));
				if( ranData > criticalVal ){
					// away
					this.offensiveTeam = 'away';
					this.defensiveTeam = 'home';
				}else{
					// home
					this.offensiveTeam = 'home';
					this.defensiveTeam = 'away';
				};
				let teamName = this.originData[this.offensiveTeam].teamName;
				// 更新争球信息
				this.$store.commit({
					type: 'updateGameInfo',
					gameInfo: {infomation: `${teamName}队获得球权`, team: this.offensiveTeam}
				})
				this.offensive();
			},
			// 进攻
			offensive(){

				setTimeout(()=>{

					let pos = this.ballIsIn(this.offensiveTeam, 'ability');
					this.playerRight = pos;
					// this.playerRightName = this.originData[this.offensiveTeam].players[pos].name;
					this.playerRightName = this._global.getPlayerNameByPos.call(this, this.offensiveTeam, pos);
					this.goal();
					// 更新实时得分记录
					this.$store.commit({
						type: 'updateGameInfo',
						gameInfo: {infomation: `the ball is in ${this.playerRightName} \`s hands`, team: this.offensiveTeam}
					})
				}, 2000);
			},
			// 计算球在哪个球员手上
			ballIsIn(team,abt){

				let player = '';
				let rnData = Math.random();
				let cVal = this.getAbility({team : team, ability: abt, playerPos: 'c'});
				let pfVal = this.getAbility({team: team, ability: abt, playerPos: 'pf'});
				let sfVal = this.getAbility({team: team, ability: abt, playerPos: 'sf'});
				let sgVal = this.getAbility({team: team, ability: abt, playerPos: 'sg'});
				let pgVal = this.getAbility({team: team, ability: abt, playerPos: 'pg'});
				let sum = parseInt(cVal) + parseInt(pfVal) + parseInt(sfVal) + parseInt(sgVal) + parseInt(pgVal);

				let cCritical = cVal/sum;
				let pfCritical = pfVal/sum + cCritical;
				let sfCritical = sfVal/sum + pfCritical;
				let sgCritical = sgVal/sum + sfCritical;
				let pgCritical = pgVal/sum;

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
			// 计算该球员下一步的行动 action
			reboundAction(){
				// 计算进攻/防守的篮板球获得概率
				let offRebRat = this['reboundVal' + this._global.firstWordToUpper(this.offensiveTeam)] * this._global.reboundRatioOff;
				let defRebRat = this['reboundVal' + this._global.firstWordToUpper(this.defensiveTeam)] * this._global.reboundRatioDef;

				let ratio = offRebRat / (defRebRat + offRebRat);  // 进攻篮板获得比例
				let ran = Math.random();

				let team = ran < ratio ? this.offensiveTeam : this.defensiveTeam;
				let pos = this.ballIsIn(team, 'rebVal');
				let player = this._global.getPlayerNameByPos.call(this, team, pos);
				console.log( `${player} 获得了篮板球`, team );

				// 交换球权
				this.changeBallRight(team);

				// 进攻
				this.offensive();
			},
			// 计算篮板球概率
			rebound(){

			},
			// 计算进球概率
			goal(){
				let rnData = Math.random();
				let offensiveVal = this.getAbility({team: this.offensiveTeam, playerPos: this.playerRight, ability: 'offVal'});
				let denfensiveVal = this.getAbility({team: this.defensiveTeam, playerPos: this.playerRight, ability: 'denVal'});

				let res = (offensiveVal - denfensiveVal/2)/100;
				if( rnData < res ){  // 进球
					// console.log('done');
					this.scoreFn();
					this.changeBallRight(this.defensiveTeam);
					this.offensive();
				}else{  // 打铁
					let playerName = this.originData[this.offensiveTeam].players[this.playerRight].name;
					console.log( `${playerName} 打铁了` );
					this.reboundAction();
				}
			},
			// 得分
			scoreFn(){
				let player = this.originData[this.offensiveTeam].players[this.playerRight].name;
				console.log( `${player} 得到两分` );
				this.$store.commit({
					type: 'updateGameInfo',
					gameInfo: {
						infomation: `${player} 得到两分`,
						team: this.offensiveTeam
					}
				});
				// 更新得分
				if( this.offensiveTeam === 'home' ){
					this.$store.commit({
						type: 'updateGameScore',
						gameScoreParmas: {
							team: 'home',
							score: 2
						}
					})
				}else{
					this.$store.commit({
						type: 'updateGameScore',
						gameScoreParmas: {
							team: 'away',
							score: 2
						}
					})
				}
			},
			// 当前球权所属球队
			changeBallRight(team){
				this.offensiveTeam = team;  
				if( this.defensiveTeam === 'home' ){
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
			},
			// 计时开始
			timeGo(){

				this.timeGoTimer = setInterval(()=>{
					this.$store.commit({type: 'timeGo'});
					if( this.$store.state.gameTime.currentTime <= 0 ) {
						clearInterval( this.timeGoTimer );
					}
				}, 1000)
			}
		},
		computed: {
			reboundValHome(){
				let players = this.originData.home.players;
				return (players.c.rebVal * this._global.reboundRatioC +  players.pf.rebVal * this._global.reboundRatioPF + players.sf.rebVal * this._global.reboundRatioSF + players.sg.rebVal * this._global.reboundRatioSG + players.pg.rebVal * this._global.reboundRatioPG).toFixed(2);
			},
			reboundValAway(){
				let players = this.originData.away.players;
				return (players.c.rebVal * this._global.reboundRatioC +  players.pf.rebVal * this._global.reboundRatioPF + players.sf.rebVal * this._global.reboundRatioSF + players.sg.rebVal * this._global.reboundRatioSG + players.pg.rebVal * this._global.reboundRatioPG).toFixed(2);
			}
		}
	}
</script>

<style scoped lang="less" scoped>
	@import url("../../../global/less/variables.less");
	@import url("../../../global/less/public.less");
	.game-info{
		.box{
			height: 90px;
			overflow-y: scroll;
			.border(1px,@white-warning);
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
			background-color: @red-default;
			color: @white-default;
			text-align: center;
			border-radius: 100%;
			cursor: pointer;
		}
		.btn.game-start-flag{
			background-color: @white-normal;
			color: @white-info;
			cursor: wait;
		}
	}
	.game-scene{	
		display: flex;
		.game-team{
			flex: 1;
			height: 400px;
			.border(1px,@white-less);
			text-align: center;
			line-height: 400px;
		}
	}
	.player{
		height: 50px;
		width: 50px;
		border-radius: 100%;
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