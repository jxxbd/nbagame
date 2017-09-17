<template>
	<div class="form">
		<p v-if="boxTitle">{{boxTitle}}</p>
		<ul>
			<li v-for="items in lists" class="items">
				<div v-if="isObj(items)" class="item-box">
					<p class="row-content" v-for="(key,i) in items">
						<span class="col-name">{{i}}</span>
						<span class="col-content" v-for="con in key">
							{{con}}
						</span>
					</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name: 'Form',
		data(){
			return {

			}
		},
		methods: {
			isObj(val){

				return !(val instanceof Array);
			}
		},
		computed: {

		},
		props:['lists','boxTitle']
	}
</script>

<style lang="less" scoped>
	.form{
		ul{
			border-top: 1px solid #ccc;
			li.items{
				border: 1px solid #ccc;
				border-top: none;
				height: 30px;
				line-height: 30px;
				text-align: center;
				span{
					border-right: 1px solid #ccc;
					&:last-child{
						border-right: none;
					}
				}
				.row-content{
					display: flex;
				}
				.col-name{
					width: 100px;
				}
				.col-content{
					flex: 1;
				}
			}
		}
	}
</style>