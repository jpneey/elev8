$( document ).ready( function() {
	
    $.fn.isInViewport = function( offset = 0 ) {
		var elementTop = $(this).offset().top + offset;
		var elementBottom = elementTop + $(this).outerHeight();
		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();
		return elementBottom > viewportTop && elementTop < viewportBottom;
	};

    const classToggler = () => {
        $( document ).on( 'click', '.class-toggler', function() {

            var $this = $( this );

            var c = $this.attr( 'data-class' ) 
            var t = $this.attr( 'data-target' )
            
            $( t ).toggleClass( c )

        })
    }

    const elementEntranceFade = () => {
		$.each( $('.lazy'), function () {
			if ($(this).isInViewport()) {
				var $el = $( this )
				var src = $el.data('src') || false
				var is_bg = $el.attr( 'data-bg' )
				$el.addClass( 'loading' )
				if ( src ) {
					if ( is_bg ) {
						$el.css({ 'background-image' : 'url(' + src + ')' })
					} else {
						$el.attr('src', src)
					}
					$el.addClass('loaded').removeClass( 'lazy' ).removeClass( 'loading' )
				} else {
					$el.addClass('loaded').removeClass( 'lazy' )
				}
			}
		})

		$.each( $( '.to-fade' ), function() {
			var $this = $( this );

			if ( $this.isInViewport() ) {
				
				var delay = $this.attr( 'data-delay' ) || 0

				$this.removeClass( 'to-fade' )
				$this.addClass( 'fade-up' )

				if ( delay ) {
					$this.css({ 'transition-delay' : delay + 'ms' })
				}
				$this.addClass( 'fade-up' )
			}
		})

	}

    classToggler();
    elementEntranceFade();

    $(window).on('scroll', function() {
        // zoom scroll
        var scrollTop = $(this).scrollTop();
        var zoomFactor = 1 + (scrollTop / 8000); // Adjust the divisor to control zoom speed
        $.each( $( '.video-zoomable' ), function() {
            $( this ).css('transform', 'scale(' + zoomFactor + ')');
        })

		elementEntranceFade()
    });

	$('.ripple-video-zoomable').ripples({
		resolution: 100,
		dropRadius: 20,
		perturbance: 0.1,
	})

	var swiper = new Swiper(".how-we-work.swiper", {
		slidesPerView: 'auto',
		spaceBetween: 30,
		grabCursor: true,
		pagination: {
			el: ".progress",
			type: "progressbar",
		},
		
        breakpoints: {
			768: {
				slidesPerView: 3,
				spaceBetween: 40,
			},
		}
	});
})