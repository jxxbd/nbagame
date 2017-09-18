export default {
	reboundRatioC  : 0.32,
	reboundRatioPF : 0.28,
	reboundRatioSF : 0.20,
	reboundRatioSG : 0.12,
	reboundRatioPG : 0.08,
	reboundRatioDef: 0.35,  // 进攻篮板率
	reboundRatioOff: 0.65,	// 防守篮板率


	//方法
	// 首字母转大写
	firstWordToUpper(val){
		return val.toLowerCase().charAt(0).toUpperCase() + val.toLowerCase().substring(1);
	},
	// 根据球员位置获取球员姓名
	getPlayerNameByPos(team,pos){
		return this.originData[team].players[pos].name;
	}
}