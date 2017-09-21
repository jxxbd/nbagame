import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({

	state: {

		gameTime: {  // 比赛时间
			currentTime: 1*10 // -> s
		},
		gameRounds: {  // 比赛回合
			defaultRounds: 4,
			currentRound: 1,
			roundTime: 24
		},
		gameInfoRealTime: {  // 比赛实时详情
			infoList: []
		},
		gameScore: {
			homeScore: 0,
			awayScore: 0
		}
	},
	mutations: {
		timeGo(state){
			state.gameTime.currentTime--;
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
		updateGameRoundsRoundTime(state, flag) {
			if( flag === 'over' ) {
				state.gameRounds.roundTime = 24;
			} else {
				state.gameRounds.roundTime -= 1;
			}
		}
	},
	actions: {

	}
})

export default store
