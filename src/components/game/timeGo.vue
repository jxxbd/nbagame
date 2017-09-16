<template>
	<div class="game-timeGo red-warning text-center font32">
		<span class="minutes time-item">{{gameMinutes}}</span>
		:
		<span class="second time-item">{{gameSeconds}}</span>
	</div>
</template>

<script>
	export default {
		name: 'TimeGo',
		data(){
			return {
				gameMinutes: '12',
				gameSeconds: '00'
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