export default {
	reboundRatioC  : 0.32,
	reboundRatioPF : 0.28,
	reboundRatioSF : 0.20,
	reboundRatioSG : 0.12,
	reboundRatioPG : 0.08,
	reboundRatioDef: 0.35,
	reboundRatioOff: 0.65,

	// 各阶段的传球概率
	passProba1: 0.9,
	passProba2: 0.75,
	passProba3: 0.6,
	passProba4: 0.3,
	passProba5: 0.1,

	// 阶段时间比例
	timeRat1: 0.2,
	timeRat1: 0.4,
	timeRat1: 0.6,
	timeRat1: 0.8,
	timeRat1: 1,

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