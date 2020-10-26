$(function() {
	const $mnu = $('header > div > nav > .gnb > li > a');
	const arrTopVal = [];
	let nowIdx = 0;

	// 제일 위로 올라가기
	const goTopFn = function() {
		$('html, body').stop().animate(
			{
				scrollTop: 0
			},
			'easeInOutCubic'
		);
	};

	goTopFn(); //시작하자마자 맨처음으로 이동


	$('.visual_txt>h1').delay(400).fadeIn(600);
	$('.visual_txt>p').delay(800).fadeIn(600);

	//마우스아이콘 움직이기
	const iconFn = function() {
		$('.visual-btn')
			.animate({
				bottom: '30px'
			})
			.animate({
				bottom: '50px'
			});
	};
	iconFn();
	setInterval(iconFn, 1200);

	// about으로 이동
	$('.visual-btn').on('click', function(evt) {
		$('html,body').animate({
			scrollTop: arrTopVal[0]
		});
		evt.preventDefault();
	});

	// articled의 top 값을 가져오는 함수
	const TopVal = function(){
		for (let i = 0; i < $mnu.length; i++) {
			arrTopVal[i] = $('article').eq(i).offset().top;
		}
	}
	TopVal();
	// 반응형에서 top 값이 달라지기 때문에 resize를 통해 함수 호출
	$(window).on('resize',function(){
		TopVal();
	});

	//로고 이벤트 등록
	$('h1>a').on('click', function(evt) {
		goTopFn();
		evt.preventDefault();
	});

	// 모바일 메뉴 구현
	$('.menu-btn').on('click', function(evt) {
		$('header nav').stop().toggle();
		$('header nav').removeClass('mobile-hidden');
		evt.preventDefault();
	});

	//메뉴 이벤트 등록
	$mnu.on('click', function(evt) {
		nowIdx = $mnu.index(this);
		$('html, body').stop().animate(
			{
				scrollTop: arrTopVal[nowIdx] - 60
			}
			,'easeInOutCubic'
		);
		$('header nav').addClass('mobile-hidden');
		evt.preventDefault();
	});

	$('.top-btn').on('click',function(evt){
		goTopFn();
		evt.preventDefault();
	});

	//스크롤 이벤트의 주체는 항상 window
	$(window).on('scroll', function() {
		//현재 스크롤탑 값
		let scrollTop = $(this).scrollTop();

		//각 article의 top값과 비교
		for (let i = 0; i < $mnu.length; i++) {
			if (scrollTop >= arrTopVal[i] - 60 - 300) {
				$('header').addClass('h-fixed');
				$('header+section').css({
					// marginTop: 69
					paddingTop: 69
				});

				$('.top-btn').show();
				$mnu.eq(i).parent().addClass('on').siblings().removeClass('on');
			} else if (scrollTop < arrTopVal[0] - 60) {
				$('header').removeClass('h-fixed');
				$('header+section').css({
					// marginTop: 0
					paddingTop: 0
				});
				$mnu.eq(i).parent().removeClass('on');
				$('.top-btn').hide();
			} 

			// 스크롤 위치마다 효과
			if(scrollTop>=arrTopVal[0] - 600){
				$('.about_tit>h2').fadeIn(700);
				$('.about_tit>p').fadeIn(700);
				$('.about_container>.left').delay(600).animate({
					'opacity':"1"
				},1500);
				$('.profile').delay(900).animate({
					'opacity':"1"
				},1500);
				$('.hash-tag>p').delay(2000).animate({
					'opacity':"1"
				},1000);
				$('.hash-tag>.about_me').delay(2200).animate({
					'opacity':"1"
				},1000);
			}
			if(scrollTop>=arrTopVal[1] - 600){
				$('.skill_tit>h2').fadeIn(700);
				$('.skill_tit>p').fadeIn(700);

			}

			if(scrollTop>=arrTopVal[3] - 600){
				$('.uiux-tit>h2').fadeIn(700);
				$('.uiux-tit>p').fadeIn(700);
			}
			if(scrollTop>=arrTopVal[4] - 600){
				$('.contact_tit>h2').fadeIn(700);
				$('.contact_tit>p').fadeIn(700);
				$('.email-form').delay(600).fadeIn(700);
			}
		}
	});
	// contact의 이메일 보내기 후 알림메시지
	$('.close>span').on('click', function() {
		$('.thankyou_message').hide();
	});

	$('.skill-show>ul>li>a').on('click',function(evt){
		$(this).parent().find('ol').slideToggle();
		evt.preventDefault();
	});

	$('footer>a').on('click',function(evt){
		goTopFn();
		evt.preventDefault();
	});


});
