<!-- 回合计时 -->
<template>
	<div class="roundTime">
		<span class="seconds font24 red-default">{{time}}</span>
	</div>
</template>

<script>
	export default {
		name: 'RoundTime',
		computed: {
			time(){
				return this.$store.state.gameRounds.roundTime;
			}
		}
	}
</script>

<style lang="less" scoped>
	.roundTime{
		.seconds{

		}
	}
</style>