<template>
<div id="app">
	<transition>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</transition>
</div>
</template>

<script>
export default {
	name: 'app'
}
</script>

<style>
@import url("./assets/css/bootstrap.min.css");
@import url("//at.alicdn.com/t/font_1473431_7mn0dxqrv6t.css");
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
</style>
