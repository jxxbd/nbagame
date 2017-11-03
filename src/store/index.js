import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const oneRoundTime = 12;
const store = new Vuex.Store({

	state: {

		gameTime: {  // 比赛时间
			currentTime: 1*10 // -> s
		},
		gameRounds: {  // 比赛回合
			defaultRounds: 4,
			currentRound: 1,
			roundTime: oneRoundTime
		},
		gameInfoRealTime: {  // 比赛实时详情
			infoList: []
		},
		gameScore: {
			homeScore: 0,
			awayScore: 0
		},
		pauseTimes: 7  // 可用的暂停次数
	},


	mutations: {
		timeGo(state){
			state.gameTime.currentTime--;
		},
		reGameTime(state){
			state.gameTime.currentTime = 1*10;
		},
		updateGameInfo(state, gameInfo){
			state.gameInfoRealTime.infoList.unshift(gameInfo);
		},
		updateGameScore(state, gameScoreParmas){
			let team = gameScoreParmas.gameScoreParmas.team;
			let score = gameScoreParmas.gameScoreParmas.score;
			if(team === 'home'){
				state.gameScore.homeScore += score;
			}else if(team === 'away'){
				state.gameScore.awayScore += score;
			}
		},
		updateGameRoundsRoundTime(state, data) {
			let {flag} = data;
			if( flag === 'over' ) {
				state.gameRounds.roundTime = oneRoundTime;
			} else {
				state.gameRounds.roundTime -= 1;
			}
		},
		updatePauseTime(state){
			state.pauseTimes--;
		},
		updateCurrentRound(state){
			state.gameRounds.currentRound ++;
		}
	},
	actions: {

	}
})

export default store
