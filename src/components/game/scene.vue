<template>
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
</template>

<script>
	export default {
		name: 'Scene',
		props: ['playerRight','offensiveTeam']
	}
</script>

<style lang="less" scoped>
	
	@import url("../../../global/less/variables.less");
	@import url("../../../global/less/public.less");
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