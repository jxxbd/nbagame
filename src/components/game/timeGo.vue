<template>
	<div class="game-timeGo red-warning text-center">
		<div class="game-home-score game-score flex-box blue-info">
			主场：
			<span class="score-box">{{homeScore}}</span>
		</div>
		<div class="game-time font32 flex-box">
			<span class="rounds">{{currentRound}}</span>
			<span class="minutes time-item">{{minutesTime}}</span>
			:
			<span class="second time-item">{{secondsTime}}</span>
		</div>
		<div class="game-away-score game-score flex-box red-info">
			客场：
			<span class="score-box">{{away}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TimeGo',
		data(){
			return {
			}
		},
		computed: {
			minutesTime(){
				return Math.floor(this.$store.state.gameTime.currentTime / 60);
			},
			secondsTime(){
				return this.$store.state.gameTime.currentTime % 60 < 10 ? ( '0' + this.$store.state.gameTime.currentTime % 60 ) : ( '' + this.$store.state.gameTime.currentTime % 60 );
			},
			currentRound(){
				let result = '';
				let currentRound = this.$store.state.gameRounds.currentRound;
				switch( currentRound ){
					case 1:
						result = '一';
						break;
					case 2:
						result = '二';
						break;
					case 3:
						result = '三';
						break;
					case 4:
						result = '四';
						break;
				}
				return `第${result}节`;
			},
			homeScore(){
				return this.$store.state.gameScore.homeScore;
			},
			away(){
				return this.$store.state.gameScore.awayScore;
			}
		}
	}
</script>

<style lang="less">
	@import url("../../../global/less/variables.less");
	@import url("../../../global/less/public.less");
	.game-timeGo{
		height: 50px;
		line-height: 50px;
		display: flex;
		.border(1px,@white-info);
		.time-item{

		}
		.flex-box{
			flex: 1;
		}
	}
</style>