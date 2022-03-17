<template>
	<a class="near-button"
					:href="route"
					:target="isTargetBlank">
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
	computed: {
		isTargetBlank() {
			return this.route.indexOf('http') === 0 ? '_blank' : '_self'
		}
	}
}
</script>
<style>
.near-button {
	@apply
	/*bg-gray-500 border-2 border-gray-500 hover:bg-black font-bold rounded-full*/
	hover:bg-white py-4 px-10;
	text-decoration: none!important;
	font-weight: 600!important;
	box-shadow: unset!important;
	box-sizing: inherit;
	font-family: Inter, Lato, "Lucida Grande", Tahoma, sans-serif;
	cursor: pointer;
	outline: none;
	display: inline-flex;
	margin: 24px 24px 0px;
	padding: 12px 36px;
	border: 2px solid;
	border-radius: 30px;
	transition: all 100ms ease 0s;
	font-size: 18px;
	word-break: keep-all;
	color: #111827;
	border-color: rgb(240, 240, 241);
	background: rgb(240, 240, 241);
}
</style>
