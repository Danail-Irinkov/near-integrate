<template>
	<transition name="expand"
							@after-enter="afterEnter"
							@enter="enter"
							@leave="leave"
							appear>
		<slot></slot>
	</transition>
</template>
<script>
export default {
	name: 'TransitionExpand',
	methods: {
		afterEnter(element) {
			// eslint-disable-next-line no-param-reassign
			element.style.height = 'auto';
		},
		enter(element) {
			// console.log('transition enter')
			// const { width } = getComputedStyle(element);
			/* eslint-disable no-param-reassign */
			// element.style.width = width;
			element.style.position = 'absolute';
			element.style.visibility = 'hidden';
			element.style.height = 'auto';
			/* eslint-enable */
			const { height } = getComputedStyle(element);
			/* eslint-disable no-param-reassign */
			// element.style.width = null;
			element.style.position = null;
			element.style.visibility = null;
			element.style.height = 0;
			/* eslint-enable */
			// Force repaint to make sure the
			// animation is triggered correctly.
			// eslint-disable-next-line no-unused-expressions
			getComputedStyle(element).height;
			setTimeout(() => {
				// eslint-disable-next-line no-param-reassign
				element.style.height = height;
			});
		},
		leave(element) {
			const { height } = getComputedStyle(element);
			// eslint-disable-next-line no-param-reassign
			element.style.height = height;
			// Force repaint to make sure the
			// animation is triggered correctly.
			// eslint-disable-next-line no-unused-expressions
			getComputedStyle(element).height;
			setTimeout(() => {
				// eslint-disable-next-line no-param-reassign
				element.style.height = 0;
			});
		},
	},
};
</script>

<style scoped>
  * {
		/*transition-duration: 1s;*/
    will-change: height;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
</style>

<style>
  .expand-enter-active,
  .expand-leave-active {
    transition: height 250ms ease-in;
    overflow: hidden;
  }
  .expand-enter,
  .expand-leave-to {
    /*transition: height 350ms ease-in;*/
    height: 0;
  }
</style>
