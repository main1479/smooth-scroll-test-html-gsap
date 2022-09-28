import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MouseFollower from 'mouse-follower';
import Scrollbar from 'smooth-scrollbar';
import posts from './appData';
// Styles
import './styles/main.scss';
import 'mouse-follower/src/scss/index.scss';

// Registering GSAP's plugins
gsap.registerPlugin(Flip, ScrollTrigger);
MouseFollower.registerGSAP(gsap);

let bodyScrollBar = Scrollbar.init(document.querySelector('.pageWrapper'), {
	damping: 0.1,
	delegateTo: document,
});
ScrollTrigger.scrollerProxy('.scroller', {
	scrollTop(value) {
		if (arguments.length) {
			bodyScrollBar.scrollTop = value;
		}
		return bodyScrollBar.scrollTop;
	},
});
bodyScrollBar.addListener(ScrollTrigger.update);

const cursor = new MouseFollower({
	container: '.pageWrapper',
	speed: 0.5,
});

const el = document.querySelector('header');

el.addEventListener('mouseenter', () => {
	cursor.setText('Scroll Down!');
});

el.addEventListener('mouseleave', () => {
	cursor.removeText();
});

// Inserting markup
const imageWrapper = document.querySelector('.images');
//prettier-ignore
const markups = posts.map(post=> `
<div class="images__wrapper">
  <figure>
    <div class="reveal"></div>
    <img
      src="${post.image}"
      alt="${post.title}"
    />
  </figure>
</div>
`).join('')
imageWrapper.innerHTML = '';
imageWrapper.insertAdjacentHTML('afterbegin', markups);

// Gsap
const images = gsap.utils.toArray('.images__wrapper');

// gsap.to(imageWrapper, {
// 	ease: 'none',
// 	width: images.length * 100 + '%',
// });
// gsap.to(images, {
// 	xPercent: -100 * (images.length - 1),
// 	ease: 'none',
// 	scrollTrigger: {
// 		start: 'top top',
// 		trigger: imageWrapper,
// 		scroller: '.scroller',
// 		pin: true,
// 		scrub: 0.5,
// 		// snap: 1 / (images.length - 1),
// 		end: () => `+=${imageWrapper.offsetWidth}`,
// 	},
// });

images.forEach((image) => {
	const img = image.querySelector('img');
	const reveal = image.querySelector('.reveal');
	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: img,
			scroller: '.scroller',
			start: 'top top+=200',
		},
	});
	tl.to(reveal, {
		duration: 1.4,
		width: '0%',
		ease: 'Power2.easeInOut',
	}).to(
		img,

		{
			duration: 1.4,
			scale: 1,
			ease: 'Power2.easeInOut',
			delay: -1.4,
		}
	);
});
