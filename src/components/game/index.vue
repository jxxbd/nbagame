<template>
	<div class="game">
		<div class="game-function">
			<h3>教练模式</h3>			
			<PausePage @changePauseStatu="fnPause" :gameStartFlag="gameStartFlag" :sectionEnd="sectionEnd" @changeSecendStatu="fnSecend"></PausePage>
		</div>
		<div class="game-info">
			<h3>现场</h3>
			<!-- 比赛用时 -->
			<TimeGo>
				<RoundTime slot="roundtime"></RoundTime>
			</TimeGo>
			<!-- 实时战况 -->
			<Situation></Situation>
			<!-- 比赛信息 -->
			<!-- <FormEle :lists="formLists" boxTitle="比赛信息" class="text-center"></FormEle> -->
		</div>
		<!-- 球场表现 -->
		<div class="game-box">
			<h3>球场表现</h3>
			<Scene :playerRight="playerRight" :offensiveTeam="offensiveTeam"></Scene>
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
	import RoundTime from './roundTime.vue'
	import PausePage from './pause.vue'
	import Scene from './scene.vue'


	const allRoundTime = 12;
	export default {
		name: 'Game',
		data(){
			return {
				offensiveTeam: '',
				defensiveTeam: '',
				playerRight: '',
				gameStartFlag: false,
				pauseState: 'false',
				sectionEnd: false,
				originData: {
					home: {
						teamName: '马刺',
						players: {
							c: {
								name: '加索尔',
								ability: 81,
								offVal: 88,
								denVal: 67,
								rebVal: 94
							},
							pf: {
								name: '阿尔德里奇',
								ability: 88,
								offVal: 88,
								denVal: 88,
								rebVal: 96
							},
							sf: {
								name: '伦纳德',
								ability: 93,
								offVal: 90,
								denVal: 99,
								rebVal: 88
							},
							sg: {
								name: '吉诺比利',
								ability: 78,
								offVal: 80,
								denVal: 74,
								rebVal: 70
							},
							pg: {
								name: '帕克',
								ability: 85,
								offVal: 88,
								denVal: 67,
								rebVal: 65
							}
						}
					},
					away: {
						teamName: '勇士',
						players: {
							c: {
								name: '帕楚利亚',
								ability: 69,
								offVal: 60,
								denVal: 79,
								rebVal: 80
							},
							pf: {
								name: '格林',
								ability: 88,
								offVal: 80,
								denVal: 94,
								rebVal: 89
							},
							sf: {
								name: '杜兰特',
								ability: 94,
								offVal: 97,
								denVal: 85,
								rebVal: 88
							},
							sg: {
								name: '汤普森',
								ability: 84,
								offVal: 82,
								denVal: 90,
								rebVal: 76
							},
							pg: {
								name: '库里',
								ability: 93,
								offVal: 96,
								denVal: 80,
								rebVal: 70
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
				gameResultList:[],
				playerActions: {
					passA: this.passAFn,
					shootA: this.goal
				}
			}
		},
		created(){
			this.$http.post('http://15.2.23.63:8080/api/getPlayerInfo',{
				hometeam: '',
				awayteam: ''
			})
			.then(response=>{
				console.log(response)
			})
			.catch(error=>{
				console.log(error);
			})
		},
		components:{
			FormEle,
			TimeGo,
			Situation,
			RoundTime,
			PausePage,
			Scene
		},
		methods: {
			// game start
			gameStart(){

				this.pauseState = 'false';

				this.$store.commit({
					type: 'reGameTime'
				})

				this.$store.commit({
					type: 'updateGameInfo',
					gameInfo: {infomation: `第${this.$store.state.gameRounds.currentRound}节比赛开始`, team: this.offensiveTeam}
				})

				!this.gameStartFlag && this.fightBall();
				this.gameStartFlag && this.offensive();
				this.gameStartFlag = true;
				this.timeGo();
			},
			// game continue
			gameContinue(){
				this.$store.commit({
					type: 'updateGameInfo',
					gameInfo: {infomation: `比赛继续`, team: this.offensiveTeam}
				})
				this.timeGo();
				this.offensive();
			},
			// fightBall
			fightBall(){

				let ranData = Math.random();
				let homePlayerValue = this.getAbility({team:'home', playerPos:'c'});
				let awayPlayerValue = this.getAbility({team:'away', playerPos: 'c'});
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
				// 争球后发起首轮进攻
				this.offensive();
			},
			// 进攻
			offensive(posNow){

				if(this.pauseState === 'true'){
					return;
				}
				setTimeout(()=>{

					let pos = posNow || this.ballIsIn(this.offensiveTeam, 'ability');
					this.playerRight = pos;
					this.playerRightName = this._global.getPlayerNameByPos.call(this, this.offensiveTeam, pos);

					// 得到下一步的行动
					let actionName = this.nextAction(pos);

					// 执行下一步动作
					this.playerActions[actionName](pos);

					// 更新实时得分记录
					this.$store.commit({
						type: 'updateGameInfo',
						gameInfo: {infomation: `the ball is in ${this.playerRightName} \`s hands`, team: this.offensiveTeam}
					});
				}, 2000);
			},
			// pass
			passAFn(pos){
				// who pass the ball
				let playerRightNamOld = this._global.getPlayerNameByPos.call(this, this.offensiveTeam, pos);
				// who can get the ball
				let posNow = this.ballIsIn(this.offensiveTeam, 'ability');
				this.playerRightName = this._global.getPlayerNameByPos.call(this, this.offensiveTeam, posNow);

				if( playerRightNamOld !== this.playerRightName ){

					console.log(`${playerRightNamOld} pass the ball to ${this.playerRightName}`);
				}

				this.offensive(posNow);
			},
			// who has the ball
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
			// the next action is ?
			nextAction(){

				// action -> pass || shoot || inHand
				let actionName = '';

				// 获取时间比例
				let timeRat = this.$store.state.gameRounds.roundTime / allRoundTime;
				let passRat = 0;
				let ran = Math.random();

				if( timeRat < this._global.timeRat1 ) {

					passRat = this._global.passProba5;
				} else if ( timeRat < this._global.timeRat2 ) {

					passRat = this._global.passProba4;
				} else if ( timeRat < this._global.timeRat3 ) {
					
					passRat = this._global.passProba3;
				} else if ( timeRat < this._global.timeRat4 ) {
					
					passRat = this._global.passProba2;
				} else if ( timeRat < this._global.timeRat5 ) {
					
					passRat = this._global.passProba1;
				} else {
					// round time over
					passRat = 0;
				}

				return getAction.call(this, ran, passRat);

				function getAction(ran, rat){

					if ( ran < rat ) {

						return 'passA';
					} else {

						return 'shootA';
					}
				}
			},
			// who can get the rebound
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
			// the ball would in ?
			goal(){
				let rnData = Math.random();
				let offensiveVal = this.getAbility({playerPos: this.playerRight, ability: 'offVal'});
				let denfensiveVal = this.getAbility({team: this.defensiveTeam, playerPos: this.playerRight, ability: 'denVal'});

				let res = (offensiveVal - denfensiveVal/2)/100;
				if( rnData < res ){  // 进球
					this.scoreFn();
					console.log(`球进了,球权转到${this.defensiveTeam}`);
					this.changeBallRight(this.defensiveTeam);
					this.offensive();
				}else{  // 打铁
					let playerName = this.originData[this.offensiveTeam].players[this.playerRight].name;
					console.log( `${playerName} 打铁了` );
					this.reboundAction();
				}
			},
			// goal
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
				this.$store.commit({
					type: 'updateGameScore',
					gameScoreParmas: {
						team: this.offensiveTeam,
						score: 2
					}
				})
			},
			// change the right
			changeBallRight(team){
				this.defensiveTeam = team;  
				if( this.defensiveTeam === 'away' ){
					// away
					this.offensiveTeam = 'away';
					this.defensiveTeam = 'home';
				}else{
					// home
					this.offensiveTeam = 'home';
					this.defensiveTeam = 'away';
				}
				// 回合计时重新开始
				this.$store.commit({
					type: 'updateGameRoundsRoundTime',
					flag: 'over'
				});
			},
			// public: get ability of the player
			getAbility({team=this.offensiveTeam, ability='ability', playerPos} = parmas){

				return this.originData[team].players[playerPos][ability]
			},
			// time begin going
			timeGo(){

				this.timeGoTimer = setInterval(()=>{
					this.$store.commit({type: 'timeGo'});
					if( this.$store.state.gameTime.currentTime <= 0 ) {
						// 节次时间结束
						this.fnPause('true');
						this.sectionEnd = true;
					};
					this.$store.commit({
						type: 'updateGameRoundsRoundTime',
						flag: ''
					});
				}, 1000)
			},
			// about the porbablity
			fnProbablity({ability,team} = parmas){

				let ran = Math.random();
				let player = '';
				let hsum = hc[ability] + hpf[ability] + hsf[ability] + hsg[ability] + hpg[ability];
				let asum = ac[ability] + apf[ability] + asf[ability] + asg[ability] + apg[ability];
				let { home: {hplayers: {hc, hpf, hsf, hsg, hpg}}, away: {aplayers: {ac, apf, asf, asg, apg}}} = this.originData;
				if( team === 'home' ) {
					let cpro  = hc[ability]  / hsum;
					let pfpro = hpf[ability] / hsum +  cpro;
					let sfpro = hsf[ability] / hsum + pfpro;
					let sgpro = hsg[ability] / hsum + sfpro;
					let pgpro = hpg[ability] / hsum + sgpro;
				} else {
					let cpro  = ac[ability]  / asum;
					let pfpro = apf[ability] / asum +  cpro;
					let sfpro = asf[ability] / asum + pfpro;
					let sgpro = asg[ability] / asum + sfpro;
					let pgpro = apg[ability] / asum + sgpro;
				}
				if ( ran < cpro ) {
					player = 'c';
				} else if ( ran < pfpro ) {
					player = 'pf';
				} else if ( ran < sfpro ) {
					player = 'sf';
				} else if ( ran < sgpro ) {
					player = 'sg';
				} else if ( ran < pgpro ) {
					player = 'pg';
				}
				return player;
			},
			// pause
			fnPause(opt){

				this.pauseState = opt;
				if( opt === 'true' ){
					clearInterval(this.timeGoTimer);
				}else{
					this.gameContinue();	
				}
			},
			// change the state of section-end
			fnSecend(){

				this.sectionEnd = false;

				this.$store.commit({

					type: 'updateCurrentRound'
				});

				this.gameStart();
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
</style>