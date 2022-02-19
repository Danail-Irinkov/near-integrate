<template>
	<a class="near-button"
					:href="route">
		<span>{{ title }}</span>
	</a>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
  },
}
</script>
<style>
.near-button {
	@apply
	/*bg-gray-500 border-2 border-gray-500 hover:bg-black font-bold rounded-full*/
	hover:bg-white py-4 px-10;
	
	font-weight: 600!important;
	box-shadow: unset!important;
	box-sizing: inherit;
	font-family: Inter, Lato, "Lucida Grande", Tahoma, sans-serif;
	cursor: pointer;
	outline: none;
	display: inline-flex;
	/*width: 100% !important;*/
	margin: 24px 24px 0px;
	border: 2px solid;
	/*height: 56px;*/
	border-radius: 30px;
	transition: all 100ms ease 0s;
	font-size: 18px;
	word-break: keep-all;
	color: rgb(0, 114, 206);
	border-color: rgb(240, 240, 241);
	background: rgb(240, 240, 241);
}
</style>
