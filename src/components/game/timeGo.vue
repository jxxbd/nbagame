<template>
	<div class="game-timeGo red-warning text-center font32">
		<span class="minutes time-item">{{minutesTime}}</span>
		:
		<span class="second time-item">{{secondsTime}}</span>
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
				return this.timeGoGameTime % 60
			},
			secondsTime(){
				return Math.floor(this.timeGoGameTime / 60) < 10 ? ( '0' + Math.floor(this.timeGoGameTime / 60) ) : ( '' + Math.floor(this.timeGoGameTime / 60) );
			}
		},
		props: ['timeGoGameTime'],
		methods: {

		}
	}
</script>

<style lang="less">
	@import url("../../../global/less/variables.less");
	@import url("../../../global/less/public.less");
	.game-timeGo{
		height: 50px;
		.border(1px,@white-info);
		.time-item{

		}
	}
</style>