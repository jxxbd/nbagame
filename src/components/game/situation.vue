<template>
	<div class="situation-wrap">
		<div class="situation box-center">
			<p class="white-default text-center">实时战况</p>
			<ul class="info-box">
				<li v-for="(info,index) in infoLists" class="info-item text-center font12" :class="{'home': info.team === 'home', 'away': info.team !== 'home' }">
					{{info.infomation}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Situation',
		data(){
			return {
			}
		},
		computed: {
			infoLists(){
				let list = this.$store.state.gameInfoRealTime.infoList.map(item=>{
					return item.gameInfo;
				});
				return list;
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("../../../global/less/public.less");
	@import url("../../../global/less/variables.less");
	.situation-wrap{
		width: 100%;
		background: @white-danger;
	}
	.situation{
		width: 500px;
		background: rgba(0,0,0,0.4);
		.info-box{
			.border(1px,@red-info,solid,none,none,none);
			max-height: 400px;
			overflow-y: scroll;
		}
		.info-item{
			.border(1px,@red-info,none);
			opacity: 0.8;
		}
		.home{
			background-color: @blue-info;
		}
		.away{
			background-color: @red-info;
		}
	}
</style>