<template>
	<div class="pause_page">
		<input type="button" value="暂停" @click="handlePause()" v-show="!sta_pause && !sectionEnd" :class="{'forbid': !pauseAble}" />
		<span v-show="sta_pause || sectionEnd" @click="handlePause()">{{pause_time}}</span>
		<input type="button" value="换人" :class="{'forbid': !pauseAble}">
		<input type="button" value="战术" :class="{'forbid': !pauseAble}">
	</div>
</template>

<script>
	const default_pause_time = 4;  // pause time
	const default_secend_time = 5;  // section end time
	export default {
		name: 'PausePage',
		data(){
			return {
				sta_pause: false,
				pause_time: default_pause_time,
				flag: 'pause',
				pauseAble: false
			}
		},
		props: ['gameStartFlag', 'sectionEnd'],
		created(){

			this.pauseAble = this.gameStartFlag;
		},
		methods: {

			handlePause(){

				if( !this.pauseAble ){
					return ;
				}

				clearInterval(this.pause_timer);

				this.sta_pause = !this.sta_pause;

				this.$emit('changePauseStatu', this.sta_pause.toString());

				if( this.sta_pause ){

					this.flag = 'pause';
					this.fntimeGo(default_pause_time);
				}
			},

			// time go
			fntimeGo(time){

				this.pause_time = time;

				this.pause_timer = setInterval(()=>{

					if( this.pause_time <= 0 ){

						if( this.flag === 'pause' ){

							this.fnpauseEnd();
						} else if ( this.flag === 'sectionend' ){

							this.fnsectionendEnd();
						}
					}else{

						this.pause_time--;
					}
				}, 1000)
			},

			// game pause end
			fnpauseEnd(){

				this.sta_pause = false;
				clearInterval(this.pause_timer);
				this.$emit('changePauseStatu', this.sta_pause.toString());
			},

			// section-end time go end
			fnsectionendEnd(){

				this.sta_pause = false;

				clearInterval(this.pause_timer);

				// 需要改变 sectionEnd 的状态 为false
				this.$emit('changeSecendStatu');
			},

			// section-end and time go
			fnsectionend(){

				let currentRound = this.$store.state.gameRounds.currentRound;
				let defaultRounds = this.$store.state.gameRounds.defaultRounds;
				if( currentRound >= defaultRounds ){
					
					console.log('game over');
					return;					
				}
				
				this.flag = 'sectionend';

				this.fntimeGo(default_secend_time);
			}
		},
		watch: {

			// the current section has over
			sectionEnd(){

				if( this.sectionEnd ){  // end the current section

					this.fnsectionend();
				}
			},
			gameStartFlag(){

				this.pauseAble = this.gameStartFlag;
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("../../../global/less/variables.less");
	.pause_page{
		input{
			color: @white-default;
			height: 50px;
			width: 50px;
			border-radius: 100%;
			background-color: @red-normal;
			cursor: pointer;
		}
		span{
			text-align: center;
			line-height: 50px;
			display: inline-block;
			color: @white-info;
			height: 50px;
			width: 50px;
			border-radius: 100%;
			background-color: @white-warning;
			cursor: pointer;
		}
		.forbid{
			cursor: default;
			background-color: @white-less;
		}
	}
</style>