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

		$.each( $( '.to-fade-up' ), function() {
			$this = $( this );
			if ( $this.isInViewport() ) {
				$this.removeClass( 'to-fade-up' )
				$this.addClass( 'fade-up' )
			}
		})

	}

    classToggler();
    elementEntranceFade();

    $(window).on('scroll', function() {
        // zoom scroll
        var scrollTop = $(this).scrollTop();
        var zoomFactor = 1 + (scrollTop / 10000); // Adjust the divisor to control zoom speed
        $.each( $( '.video-zoomable' ), function() {
            $( this ).css('transform', 'scale(' + zoomFactor + ')');
        })
    });
})